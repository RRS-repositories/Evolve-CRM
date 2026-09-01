"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const TO_EMAIL = "hello@evolvecrm.co.uk";

const TEAM_SIZES = ["5–10 users", "11–25 users", "26–50 users", "51–100 users", "100+ users"];
const PLANS = ["Basic", "Growth", "Scale", "Command", "Sovereign"];

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const digitCount = (v) => v.replace(/\D/g, "").length;

const RULES = {
  name: [(v) => v.trim().length > 1, "Please enter your full name."],
  business: [(v) => v.trim().length > 1, "Please enter your business name."],
  email: [isEmail, "Please enter a valid email address."],
  phone: [(v) => digitCount(v) >= 9, "Please enter a contact number."],
};

/* The fallback used when no webhook is configured — the demo's behaviour,
   kept so a fresh checkout still has a working form rather than a dead button. */
function mailtoHref(d) {
  const lines = [
    "New Evolve CRM enquiry",
    "",
    `Full name: ${d.name}`,
    `Business: ${d.business}`,
    `Email: ${d.email}`,
    `Contact number: ${d.phone}`,
    `Team size: ${d.team || "-"}`,
    `Plan: ${d.plan || "-"}`,
    "",
    d.message || "",
  ].join("\r\n");
  return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
    `Evolve CRM enquiry — ${d.business}`,
  )}&body=${encodeURIComponent(lines)}`;
}

export default function EnquiryForm() {
  const [values, setValues] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    team: "",
    plan: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const [problem, setProblem] = useState("");
  const consentRef = useRef(null);

  /* ?plan=Scale arrives from the pricing page and preselects the dropdown.
     Read in an effect rather than during render: useSearchParams would opt this
     page out of static rendering, and the value is a convenience, not content. */
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("plan");
    if (!requested) return;
    const match = PLANS.find((p) => p.toLowerCase() === requested.toLowerCase());
    if (match) setValues((v) => ({ ...v, plan: match }));
  }, []);

  const set = (field) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    for (const [field, [test, message]] of Object.entries(RULES)) {
      if (!test(values[field])) next[field] = message;
    }
    setErrors(next);
    if (!consent) consentRef.current?.focus();
    return Object.keys(next).length === 0 && consent;
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    setProblem("");

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, consent, company_website: "" }),
      });
      const data = await res.json().catch(() => ({}));

      // The server re-validates; show what it rejected rather than a generic error.
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }
      if (!res.ok) throw new Error(data.error || "send failed");

      /* No webhook configured: hand off to the visitor's mail client rather
         than claiming an enquiry was delivered when it was not. */
      if (data.delivered === false) {
        window.location.href = mailtoHref(values);
      }
      setStatus("done");
    } catch {
      setStatus("idle");
      setProblem(
        `Sorry — that didn't send. Please email ${TO_EMAIL} or call 0161 496 0100.`,
      );
    }
  }

  const textField = (id, label, type, opts = {}) => (
    <div className={`field${errors[id] ? " show-err" : ""}`}>
      <label htmlFor={id}>
        {label} {opts.required && <span className="req">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={values[id]}
        onChange={set(id)}
        className={errors[id] ? "err" : undefined}
        aria-invalid={errors[id] ? "true" : undefined}
        aria-describedby={errors[id] ? `${id}-hint` : undefined}
        {...opts.input}
      />
      <span className="hint" id={`${id}-hint`}>
        {errors[id]}
      </span>
    </div>
  );

  return (
    <div className={`card${status === "done" ? " done" : ""}`}>
      <form onSubmit={onSubmit} noValidate>
        <h2>Start your enquiry</h2>
        <div className="sub">
          Fields marked <span style={{ color: "var(--coral)" }}>*</span> are required.
        </div>

        <div className="grid2">
          {textField("name", "Full name", "text", {
            required: true,
            input: { autoComplete: "name" },
          })}
          {textField("business", "Business name", "text", {
            required: true,
            input: { autoComplete: "organization" },
          })}
        </div>

        <div className="grid2">
          {textField("email", "Email", "email", {
            required: true,
            input: { autoComplete: "email" },
          })}
          {textField("phone", "Contact number", "tel", {
            required: true,
            input: { autoComplete: "tel", inputMode: "tel" },
          })}
        </div>

        <div className="grid2">
          <div className="field">
            <label htmlFor="team">Team size</label>
            <select id="team" name="team" value={values.team} onChange={set("team")}>
              <option value="">Select…</option>
              {TEAM_SIZES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="plan">Plan of interest</label>
            <select id="plan" name="plan" value={values.plan} onChange={set("plan")}>
              <option value="">Not sure yet</option>
              {PLANS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="msg">Anything we should know?</label>
          <textarea
            id="msg"
            name="message"
            value={values.message}
            onChange={set("message")}
            placeholder="Your sector, what you&#39;re using today, what&#39;s not working…"
          />
        </div>

        {/* Honeypot: invisible to sight, keyboard and screen readers, so only a
            bot fills it. The server discards anything that does. */}
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="company_website">Leave this field empty</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <label className="consent">
          <input
            ref={consentRef}
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>
            I&rsquo;m happy for Evolve CRM to contact me about my enquiry. We never share your
            details or add you to lists.
          </span>
        </label>

        <button className="btn primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry →"}
        </button>

        {problem && (
          <div className="form-problem" role="alert">
            {problem}
          </div>
        )}
        <div className="fine">A HUMAN REPLIES WITHIN ONE WORKING DAY</div>
      </form>

      <div className="thanks" role="status">
        <div className="tick" aria-hidden="true">
          ✓
        </div>
        <h2>Thanks — we&rsquo;ve got it.</h2>
        <p>
          One of the team will be in touch within one working day. In the meantime, the pricing page
          has the full plan breakdown.
        </p>
        <Link className="btn ghost" href="/pricing" style={{ width: "auto" }}>
          View packages
        </Link>
      </div>
    </div>
  );
}
