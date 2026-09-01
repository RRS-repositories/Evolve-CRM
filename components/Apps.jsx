const ICONS = {
  phone: <svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>,
  window: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 21h8"/></svg>,
  people: <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5"/><circle cx="17.5" cy="9.5" r="2.4"/><path d="M15.5 14.5c2.6-.4 4.6 1.2 5 4.5"/></svg>,
  card: <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg>,
  doc: <svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  id: <svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="3.4"/><path d="M5 20c1-3.8 3.6-6 7-6s6 2.2 7 6"/><path d="M17.5 4.5l2 2 3-3.5" transform="translate(-1,0)"/></svg>,
};

const MAIN = [
  { icon: "phone", h: "Branded company apps", p: "Your own app, your logo, your colours — on your clients' home screens, iOS and Android.",
    li: ["Built by our engineers, published for you", "Push notifications that drive action", "Every tap logged to the CRM record"] },
  { icon: "window", h: "Client update portals", p: "Clients see their case status live, upload documents, sign and pay — without ringing your team.",
    li: ["Live case progress, straight from the CRM", <>Secure document upload &amp; e-sign</>, "Payments & plan tracking built in"] },
  { icon: "people", h: "Partner & introducer portals", p: "Give introducers their own secure logins to submit work, track progress and see what's paying.",
    li: ["Submissions land straight in your pipeline", "Role-based access — they see only theirs", "Automatic status updates back to them"] },
];

const TECH = [
  { icon: "card", h: "Open Banking technology", p: "Connect to your customers' banks — with their consent — and let the data do the work.",
    li: ["Credit-acceptance & affordability checks", "Client validation & verification", "Obtain banking information on behalf of clients"] },
  { icon: "doc", h: "OCR document reading", p: "Uploaded documents are read automatically — data extracted straight into the record.",
    li: ["Statements, IDs & letters read on upload", "Key fields captured, no retyping", "Flags what needs a human eye"] },
  { icon: "id", h: "Document & ID uploads", p: "Clients upload documents and identification from any device — securely, in seconds.",
    li: ["Portal, app or one-tap secure link", "ID verification built into onboarding", "Everything filed to the case automatically"] },
];

function Card({ item, className }) {
  return (
    <div className={className}>
      <div className="aic">{ICONS[item.icon]}</div>
      <h3>{item.h}</h3>
      <p>{item.p}</p>
      <ul>{item.li.map((l, i) => <li key={i}>{l}</li>)}</ul>
    </div>
  );
}

export default function Apps() {
  return (
    <section id="apps">
      <div className="eyebrow reveal"><span>Apps &amp; portals</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(30px,4.6vw,62px)" }}>
        Your brand, in your clients&rsquo; pockets.
      </h2>
      <p className="lead reveal d2" style={{ color: "var(--fog)", maxWidth: 660, marginTop: 14, fontSize: 17 }}>
        We don&rsquo;t just run your back office — we build the front doors too. Company apps, online
        portals and client update portals, all wired live to your CRM, built by the same engineers.
      </p>
      <div className="agrid">
        {MAIN.map((m, i) => (
          <Card key={m.h} item={m} className={`acard reveal${i ? ` d${i}` : ""}`} />
        ))}
      </div>
      <div className="wire reveal">ALL WIRED TO THE SAME RECORD — UPDATES FLOW BOTH WAYS, IN REAL TIME</div>
      <div className="vergrid reveal" id="vergrid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 26 }}>
        {TECH.map((t) => <Card key={t.h} item={t} className="acard" />)}
      </div>
      <div className="usedby reveal">
        ALREADY IN USE BY <b>LAW FIRMS</b> · <b>CLAIMS MANAGEMENT COMPANIES</b> ·{" "}
        <b>LEAD GENERATION COMPANIES</b> · <b>INSURANCE COMPANIES</b>
      </div>
    </section>
  );
}
