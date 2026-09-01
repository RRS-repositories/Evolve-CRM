import { NextResponse } from "next/server";

/* Enquiry handler.
 *
 * The demo posted straight from the browser to a webhook URL written into the
 * page, or fell back to opening a mailto. Both are workable for a static file;
 * neither is right once there is a server:
 *
 *   - A webhook URL in client JS is public. Anyone who views source can post
 *     to it directly, as often as they like. Here it stays in the environment.
 *   - Client-side validation is a courtesy to the user, not a control. Whatever
 *     the browser sends is re-checked below before anything is forwarded.
 *
 * Configure ENQUIRY_WEBHOOK_URL (n8n, Make, Zapier, Formspree…) to capture
 * enquiries. With nothing configured the route reports `delivered: false` and
 * the form falls back to a pre-filled email, exactly as the demo did — so the
 * page is never silently broken in a fresh checkout.
 */

const TO_EMAIL = "hello@evolvecrm.co.uk";
const MAX = { name: 120, business: 160, email: 200, phone: 40, team: 40, plan: 40, message: 4000 };

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const digits = (v) => v.replace(/\D/g, "").length;

function validate(d) {
  const errors = {};
  if (!d.name || d.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!d.business || d.business.trim().length < 2) errors.business = "Please enter your business name.";
  if (!d.email || !isEmail(d.email.trim())) errors.email = "Please enter a valid email address.";
  if (!d.phone || digits(d.phone) < 9) errors.phone = "Please enter a contact number.";
  if (!d.consent) errors.consent = "Please confirm we can contact you.";

  for (const [field, limit] of Object.entries(MAX)) {
    if (typeof d[field] === "string" && d[field].length > limit) {
      errors[field] = `That is longer than we can accept (${limit} characters).`;
    }
  }
  return errors;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  /* Honeypot. A real visitor never sees this field, so anything in it is a bot.
     Answer 200 so the sender learns nothing from the response. */
  if (body.company_website) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const errors = validate(body);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const enquiry = {
    name: String(body.name).trim(),
    business: String(body.business).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone).trim(),
    team: body.team ? String(body.team).trim() : "",
    plan: body.plan ? String(body.plan).trim() : "",
    message: body.message ? String(body.message).trim() : "",
    source: "evolve-website",
    submitted: new Date().toISOString(),
  };

  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) {
    /* Nothing configured. Say so plainly rather than pretending it was sent —
       the form then offers the email fallback. */
    console.warn("[enquire] ENQUIRY_WEBHOOK_URL is not set — enquiry not forwarded.");
    return NextResponse.json({ ok: true, delivered: false, to: TO_EMAIL });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    /* Log for us, stay vague for the caller — the upstream URL and its failure
       mode are not the visitor's business. */
    console.error("[enquire] forwarding failed:", err.message);
    return NextResponse.json(
      { ok: false, error: "We could not send that just now.", to: TO_EMAIL },
      { status: 502 },
    );
  }
}
