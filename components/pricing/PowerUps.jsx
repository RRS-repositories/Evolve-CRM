const PU = [
  ["Extra bespoke build hours", "More development time from the team that builds Evolve — bought in blocks of 5, used whenever you like.", "£120", "PER HOUR · BLOCKS OF 5"],
  ["Branded company app", "Your own iOS & Android app, wired live to your CRM — built, published and maintained by our engineers.", "£199", "PER MONTH · BUILD SCOPED WITH YOUR PLAN'S HOURS"],
  ["Custom apps & portals", "Your branded company app, client update portal or partner portal — engineer-built and wired live to your CRM.", "Build hours", "SCOPED & BUILT FROM YOUR PLAN'S ALLOWANCE · £120/HR THEREAFTER"],
  ["Dedicated cloud server", "Your own isolated server and database — no shared infrastructure, ring-fenced performance and data separation.", "£99", "PER MONTH"],
  ["AI Technology Pack", "Conversation AI and AI workflows on your Growth plan without moving up — built and launched by our engineers.", "£199", "PER MONTH · INCLUDED FREE ON SCALE & ABOVE", "(FOR GROWTH)"],
  ["VoIP phone system — pay as you go", "Softphone, numbers and call routing through the CRM. No line rental bundles — pay only for what you use.", "£5", "PER NUMBER / MONTH · MINUTES AT CARRIER COST"],
  ["Extra e-sign sends", "Top up your monthly signature allowance when a big campaign lands.", "£10", "PER 100 SENDS / MONTH"],
  ["Extra email volume", "Top up your monthly sending allowance in 10,000-email blocks.", "£10", "PER 10,000 EMAILS / MONTH"],
  ["Additional brand", "Run another trading style with its own branding, templates and numbers.", "£25", "PER BRAND / MONTH"],
  ["Partner portal licences", "Give introducers and partners their own secure logins to submit and track work.", "£12", "PER PARTNER USER / MONTH"],
  ["Extra training sessions", "Structured team training beyond your included hours, delivered live.", "£95", "PER SESSION · UP TO 10 SEATS"],
];

export default function PowerUps() {
  return (
    <section id="powerups">
      <div className="eyebrow reveal"><span>Power-ups</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(28px,4.2vw,54px)" }}>
        Optional extras — never required.
      </h2>
      <p className="reveal d2" style={{ color: "var(--fog)", maxWidth: 620, marginTop: 14, fontSize: "16.5px" }}>
        Every plan works completely without these. Add them if your operation wants them, drop them
        when it doesn&rsquo;t.
      </p>
      <div className="pugrid reveal d2">
        {PU.map(([h, p, price, note, qualifier]) => (
          <div className="pu" key={h + (qualifier || "")}>
            <h3>
              {h}
              {qualifier && <span className="puq">{qualifier}</span>}
            </h3>
            <p>{p}</p>
            <div className="pup">
              {price}
              <small>{note}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="refuse reveal">
        <div className="rk">THINGS WE REFUSE TO CHARGE FOR</div>
        <p>
          <b>Inbound SMS and WhatsApp replies. AI usage. Onboarding. Data migration. Leaving.</b>{" "}
          We&rsquo;ve been on the other side of vendors who bill £15.99 a month just to receive a text
          reply — that&rsquo;s exactly the kind of pricing Evolve exists to end.
        </p>
      </div>
    </section>
  );
}
