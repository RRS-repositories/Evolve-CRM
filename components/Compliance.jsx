const CARDS = [
  {
    k: "ACHIEVED",
    achieved: true,
    h: "Designed for SRA-regulated firms",
    p: "Built and operated inside an SRA-regulated practice — not adapted for regulation after the fact. Compliance requirements shaped the architecture from day one.",
  },
  {
    k: "ONGOING",
    h: "Keeping pace with AI regulation",
    p: "We track evolving SRA guidance and UK AI and data rules, and ship compliance updates as the landscape changes — your platform keeps up so you don't have to.",
  },
  {
    k: "BUILT IN",
    h: "Human oversight of every AI action",
    p: "AI work is logged, reviewable and reversible — full audit trails, human-in-the-loop controls, and clear boundaries on what AI is permitted to do.",
  },
  {
    k: "PROTECTED",
    h: "Your data, governed properly",
    p: "UK GDPR-aligned data handling, secure UK cloud hosting, role-based access, and full data export whenever you want it. Your client data behaves like it's in a law firm — because it learned there.",
  },
];

export default function Compliance() {
  return (
    <section id="compliance">
      <div className="compband reveal">
        <div className="comphead">
          <div className="shield">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
              <path d="M8.5 12l2.5 2.5 4.5-4.5" />
            </svg>
          </div>
          <div>
            <div className="eyebrow" style={{ marginBottom: 12 }}><span>AI compliance &amp; regulation</span></div>
            <h2>AI compliance isn&rsquo;t our afterthought. <em>It&rsquo;s where we live.</em></h2>
            <p className="complead">
              AI regulation is changing fast — SRA guidance, UK data law, evolving rules on automated
              decision-making. Evolve was built inside a regulated firm, so keeping the platform
              compliant as the rules move isn&rsquo;t a feature we bolted on. It&rsquo;s the condition
              we operate under every day.
            </p>
          </div>
        </div>
        <div className="compgrid">
          {CARDS.map((c) => (
            <div className={`compcard${c.achieved ? " achieved" : ""}`} key={c.h}>
              {c.achieved ? <span className="badge2">{c.k}</span> : <div className="ck">{c.k}</div>}
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="slogan reveal" style={{ maxWidth: 760 }}>
        <div className="s1">Always evolving. <em>It&rsquo;s in the name.</em></div>
        <div className="s2">
          OUR AI, TECHNOLOGY &amp; SYSTEMS NEVER STAND STILL — AND NEITHER DOES OUR COMPLIANCE
        </div>
      </div>
    </section>
  );
}
