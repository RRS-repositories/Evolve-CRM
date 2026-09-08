import nodemailer from "nodemailer";

/* Emails enquiry notifications to the team.
 * ============================================================================
 * The third delivery target, alongside Sheets and the webhook. Same contract as
 * lib/sheets.js: a `configured` guard so an unconfigured deployment silently
 * skips it, and a send that THROWS on failure — only the route knows whether
 * another target succeeded, so only the route can decide what the visitor sees.
 *
 * Sends through whatever SMTP relay is configured, defaulting to Microsoft 365
 * because that is what the CRM on the same box already uses. Three decisions
 * worth spelling out:
 *
 *  1. `From` is OUR mailbox and the enquirer goes in `Reply-To`.
 *     Putting a stranger's address in `From` is the obvious-looking choice and
 *     the wrong one: the message then fails SPF and DMARC for their domain and
 *     lands in spam, or is rejected outright. Reply-To gives the team one-click
 *     reply without forging anyone's identity.
 *
 *  2. Everything interpolated into a header is flattened to one line.
 *     `name` and `business` reach the Subject. A newline in a header value is
 *     how you inject extra headers — a second Bcc, a different Reply-To.
 *
 *  3. The HTML part escapes every field.
 *     This is stranger-typed text from a public form, the same threat that made
 *     sheets.js write RAW rather than USER_ENTERED. There it was formula
 *     injection; here it is markup injection into whatever mail client opens it.
 *
 * Note: the CRM's transports set `tls: { ciphers: 'SSLv3' }`. That is a legacy
 * workaround, not a thing to copy — it constrains a modern TLS handshake for no
 * benefit. Defaults are correct against Office 365.
 */

const DEFAULTS = { host: "smtp.office365.com", port: 587 };
const TIMEOUTS = { connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000 };

/** Recipients, comma-separated, so adding a second inbox needs no code change. */
function recipients() {
  return (process.env.ENQUIRY_EMAIL_TO || "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
}

/** True when there is enough configuration to attempt a send at all. */
export function emailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && recipients().length);
}

/* Header values must never carry a line break — see (2) above. */
const oneLine = (v) => String(v ?? "").replace(/[\r\n]+/g, " ").trim();

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

const FIELDS = [
  ["Name", "name"],
  ["Business", "business"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Team size", "team"],
  ["Plan", "plan"],
  ["Message", "message"],
  ["Source", "source"],
  ["Submitted", "submitted"],
];

export function buildSubject(enquiry) {
  const who = oneLine(enquiry.name) || "someone";
  const where = oneLine(enquiry.business);
  return `New enquiry — ${who}${where ? `, ${where}` : ""}`.slice(0, 200);
}

/* Plain text alongside HTML: some clients prefer it, and it is the part that
   stays readable if the HTML is stripped by a gateway. */
export function buildText(enquiry) {
  return FIELDS.map(([label, key]) => `${label}: ${enquiry[key] || "—"}`).join("\n");
}

export function buildHtml(enquiry) {
  const rows = FIELDS.map(
    ([label, key]) =>
      `<tr><td style="padding:6px 14px 6px 0;color:#54786c;vertical-align:top">${escapeHtml(label)}</td>` +
      `<td style="padding:6px 0;color:#0c2a23"><strong>${escapeHtml(enquiry[key] || "—")}</strong></td></tr>`,
  ).join("");
  return `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5">
<p style="margin:0 0 14px;color:#0c2a23"><strong>${escapeHtml(buildSubject(enquiry))}</strong></p>
<table cellpadding="0" cellspacing="0">${rows}</table>
</div>`;
}

let cachedTransport = null;
let transportProvider = null;

/** Cached for the process lifetime; nodemailer pools and reconnects itself. */
function getTransport() {
  if (cachedTransport) return cachedTransport;
  const options = {
    host: process.env.SMTP_HOST || DEFAULTS.host,
    port: Number(process.env.SMTP_PORT) || DEFAULTS.port,
    /* false means STARTTLS on 587, which is what Office 365 expects. Set
       SMTP_SECURE=true only for an implicit-TLS relay on 465. */
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    ...TIMEOUTS,
  };
  cachedTransport = transportProvider ? transportProvider(options) : nodemailer.createTransport(options);
  return cachedTransport;
}

/**
 * Sends one enquiry notification. Throws on failure, by design.
 *
 * `From` must be a mailbox the authenticated account may send as, or Office 365
 * rejects with 5.7.60 SendAsDenied — hence defaulting it to SMTP_USER, which is
 * always allowed.
 */
export async function sendEnquiryEmail(enquiry) {
  const to = recipients();
  if (!to.length) throw new Error("ENQUIRY_EMAIL_TO is not set");

  const from = process.env.ENQUIRY_EMAIL_FROM || process.env.SMTP_USER;
  if (!from) throw new Error("Neither ENQUIRY_EMAIL_FROM nor SMTP_USER is set");

  const replyTo = oneLine(enquiry.email);

  const info = await getTransport().sendMail({
    from,
    to,
    ...(replyTo ? { replyTo } : {}),
    subject: buildSubject(enquiry),
    text: buildText(enquiry),
    html: buildHtml(enquiry),
  });
  return info?.messageId || "sent";
}

/** Test seam — the transport is a process-level cache. */
export function __resetMailerCache() {
  cachedTransport = null;
  transportProvider = null;
}

/**
 * Test seam for the transport.
 *
 * Mirrors sheets.js's __setAuthProvider: the message WE build is what is worth
 * asserting, and proving it should not require an SMTP server. Everything up to
 * the handshake still runs for real.
 */
export function __setTransportProvider(fn) {
  transportProvider = fn;
  cachedTransport = null;
}
