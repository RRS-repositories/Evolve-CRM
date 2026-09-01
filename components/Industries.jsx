const INDS = [
  { tag: "NATIVE HABITAT", h: "Claims & legal services",
    p: "The environment Evolve was born in. Case-first data model, document packs, deadline discipline and regulator-ready audit trails out of the box.",
    li: ["Claims firms & CMCs", "High-volume consumer law practices", "Complaint & redress operations"] },
  { tag: "STRONG FIT", h: "Debt recovery & collections",
    p: "Portfolio-scale contact management, payment plan tracking, omnichannel chasing and agent workbenches designed for difficult conversations at volume.",
    li: ["Debt recovery agencies", "Credit control teams", "Payment plan servicers"] },
  { tag: "STRONG FIT", h: "Financial & regulated services",
    p: "Compliance-first architecture for businesses where “we lost the audit trail” is not an acceptable sentence.",
    li: ["Brokers & advisory firms", "Insurance operations", "Fintech customer operations"] },
  { tag: "STRONG FIT", h: "High-volume sales & contact centres",
    p: "Dialler-first design, live lead distribution, leaderboards and 100% AI call scoring — the full toolkit for teams that win or lose on the phone.",
    li: ["Outbound sales operations", "Lead generation businesses", "Multi-site & offshore teams"] },
];

export default function Industries() {
  return (
    <section id="industries">
      <div className="eyebrow reveal"><span>Who it&rsquo;s for</span></div>
      <h2 className="reveal d1">Made for high-volume, phone-heavy, regulated work.</h2>
      <p className="lead reveal d2">
        If your operation runs on high-volume caseloads, phone-heavy teams, or regulated workflows —
        Evolve was literally grown in your habitat.
      </p>
      <div className="inds">
        {INDS.map((ind, i) => (
          <div className={`ind reveal${i % 2 ? " d1" : ""}`} key={ind.h}>
            <div className="tag">{ind.tag}</div>
            <h3>{ind.h}</h3>
            <p>{ind.p}</p>
            <ul>{ind.li.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
