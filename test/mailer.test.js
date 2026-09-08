/* Tests for the enquiry email notifier.
 *
 * All of these run without an SMTP server: the transport is injected, so what
 * is verified is the MESSAGE we build — who it goes to, whose address ends up
 * in Reply-To rather than From, and that a public form cannot inject headers
 * or markup through it.
 *
 * The one thing these cannot prove is that the mailbox credentials work and
 * that Office 365 permits sending as that address. That needs a real mailbox
 * and is the last step before this goes live.
 */

import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  __resetMailerCache,
  __setTransportProvider,
  buildHtml,
  buildSubject,
  buildText,
  emailConfigured,
  sendEnquiryEmail,
} from "../lib/mailer.js";

const ENV_KEYS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "ENQUIRY_EMAIL_TO",
  "ENQUIRY_EMAIL_FROM",
];

let saved;

const ENQUIRY = {
  name: "Sarah Doe",
  business: "Doe & Co",
  email: "sarah@example.com",
  phone: "0161 496 0100",
  team: "10-25",
  plan: "Growth",
  message: "We need help with document chasing.",
  source: "evolve-website",
  submitted: "2026-09-08T10:00:00.000Z",
};

/** Captures what would have been sent, instead of sending it. */
function captureTransport(sent, result = { messageId: "<test@local>" }) {
  __setTransportProvider((options) => {
    sent.options = options;
    return {
      sendMail: async (message) => {
        sent.message = message;
        if (result instanceof Error) throw result;
        return result;
      },
    };
  });
}

beforeEach(() => {
  saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
  for (const k of ENV_KEYS) delete process.env[k];
  process.env.SMTP_USER = "noreply@rowanrose.co.uk";
  process.env.SMTP_PASS = "secret";
  process.env.ENQUIRY_EMAIL_TO = "bf@rowanrose.co.uk";
  __resetMailerCache();
});

afterEach(() => {
  for (const [k, v] of Object.entries(saved)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  __resetMailerCache();
});

test("not configured without a recipient, so an unset deployment skips email", () => {
  delete process.env.ENQUIRY_EMAIL_TO;
  assert.equal(emailConfigured(), false);
});

test("not configured without credentials", () => {
  delete process.env.SMTP_PASS;
  assert.equal(emailConfigured(), false);
});

test("configured once user, pass and recipient are all present", () => {
  assert.equal(emailConfigured(), true);
});

test("sends to the configured recipient", async () => {
  const sent = {};
  captureTransport(sent);
  await sendEnquiryEmail(ENQUIRY);
  assert.deepEqual(sent.message.to, ["bf@rowanrose.co.uk"]);
});

test("a comma-separated list reaches every recipient", async () => {
  process.env.ENQUIRY_EMAIL_TO = "bf@rowanrose.co.uk, ops@rowanrose.co.uk";
  const sent = {};
  captureTransport(sent);
  await sendEnquiryEmail(ENQUIRY);
  assert.deepEqual(sent.message.to, ["bf@rowanrose.co.uk", "ops@rowanrose.co.uk"]);
});

/* The point of the whole From/Reply-To split: a stranger's address in From
   would fail SPF and DMARC for their domain. */
test("the enquirer goes in Reply-To, never in From", async () => {
  const sent = {};
  captureTransport(sent);
  await sendEnquiryEmail(ENQUIRY);
  assert.equal(sent.message.replyTo, "sarah@example.com");
  assert.equal(sent.message.from, "noreply@rowanrose.co.uk");
});

test("From can be overridden for a send-as mailbox", async () => {
  process.env.ENQUIRY_EMAIL_FROM = "enquiries@rowanrose.co.uk";
  const sent = {};
  captureTransport(sent);
  await sendEnquiryEmail(ENQUIRY);
  assert.equal(sent.message.from, "enquiries@rowanrose.co.uk");
});

test("defaults to Office 365 STARTTLS, as the CRM on the same box does", async () => {
  const sent = {};
  captureTransport(sent);
  await sendEnquiryEmail(ENQUIRY);
  assert.equal(sent.options.host, "smtp.office365.com");
  assert.equal(sent.options.port, 587);
  assert.equal(sent.options.secure, false);
});

test("a relay can be pointed elsewhere by environment alone", async () => {
  process.env.SMTP_HOST = "smtp.example.net";
  process.env.SMTP_PORT = "465";
  process.env.SMTP_SECURE = "true";
  const sent = {};
  captureTransport(sent);
  await sendEnquiryEmail(ENQUIRY);
  assert.equal(sent.options.host, "smtp.example.net");
  assert.equal(sent.options.port, 465);
  assert.equal(sent.options.secure, true);
});

test("the subject names the person and their business", () => {
  assert.equal(buildSubject(ENQUIRY), "New enquiry — Sarah Doe, Doe & Co");
});

/* A newline in a header value is how a second Bcc gets added. */
test("a newline in a form field cannot inject a header", () => {
  const subject = buildSubject({ ...ENQUIRY, name: "Sarah\r\nBcc: attacker@evil.test" });
  assert.ok(!subject.includes("\n"), "subject must be one line");
  assert.ok(!subject.includes("\r"), "subject must be one line");
});

/* Same threat sheets.js handles with RAW: stranger-typed text, rendered. */
test("markup in the message is escaped in the HTML part", () => {
  const html = buildHtml({ ...ENQUIRY, message: '<img src=x onerror="alert(1)">' });
  assert.ok(!html.includes("<img"), "raw markup must not survive into the HTML");
  assert.ok(html.includes("&lt;img"), "it should appear escaped instead");
});

test("the plain-text part carries every field", () => {
  const text = buildText(ENQUIRY);
  for (const v of ["Sarah Doe", "Doe & Co", "sarah@example.com", "0161 496 0100", "Growth"]) {
    assert.ok(text.includes(v), `expected ${v} in the text part`);
  }
});

/* The route decides what the visitor sees, so failures must propagate. */
test("a transport failure throws rather than reporting success", async () => {
  const sent = {};
  captureTransport(sent, new Error("535 auth failed"));
  await assert.rejects(() => sendEnquiryEmail(ENQUIRY), /535 auth failed/);
});

test("a missing recipient throws rather than sending nowhere", async () => {
  const sent = {};
  captureTransport(sent);
  delete process.env.ENQUIRY_EMAIL_TO;
  await assert.rejects(() => sendEnquiryEmail(ENQUIRY), /ENQUIRY_EMAIL_TO/);
});
