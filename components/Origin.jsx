import Image from "next/image";

const RECEIPTS = [
  ["Cases processed through the platform", "108,000+"],
  ["Contacts under management", "90,000+"],
  ["Workflow statuses refined in live use", "77"],
  ["Background workers monitored 24/7", "14"],
  ["Calls scored by AI, not sampled", "100%"],
];

export default function Origin() {
  return (
    <section id="origin">
      <div className="split">
        <div>
          <div className="eyebrow reveal"><span>Why Evolve is different</span></div>
          <h2 className="reveal d1">Proof, <em>not promises.</em></h2>
          <p className="reveal d2">
            Evolve was built to run <strong>Fast Action Claims</strong>, a Manchester-based,
            SRA-regulated solicitors&rsquo; operation handling consumer credit claims at serious
            volume — with agent teams across the UK, India and South Africa.
          </p>
          <p className="reveal d2">
            Every feature exists because a real operations team needed it: the dialler workbench
            because agents lost time between calls, the automation engine because humans were doing
            robot work, the client portal because &ldquo;any update?&rdquo; calls were drowning the team.
          </p>
          <p className="reveal d3">
            <strong>When you buy Evolve, you inherit years of operational evolution</strong> — every
            dead end already explored, every bottleneck already solved, on someone else&rsquo;s time
            and money.
          </p>
        </div>
        <div className="receipts reveal d2">
          {RECEIPTS.map(([k, v]) => (
            <div className="rrow" key={k}>
              <span className="k">{k}</span>
              <span className="v">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <figure className="realshot reveal" style={{ margin: "56px 0 0" }}>
        <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(12,42,35,.15)", boxShadow: "0 24px 60px rgba(12,42,35,.16)" }}>
          <Image
            src="/dashboard-real.jpg"
            alt="The actual Evolve operations dashboard: live KPI cards, claim pipeline, lender breakdown chart and unable-to-locate analysis"
            width={1600}
            height={900}
            sizes="(max-width: 1360px) 100vw, 1360px"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
        <figcaption style={{ marginTop: 16, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".18em", color: "var(--fog)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--glow)" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--glow)", animation: "pulse 2s infinite" }} />
            NOT A MOCKUP
          </span>
          <span>
            THE ACTUAL DASHBOARD RUNNING OUR GROUP&rsquo;S OPERATIONS TODAY — LIVE PIPELINE, LENDER
            ANALYSIS &amp; TEAM KPIS ON ONE RECORD
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
