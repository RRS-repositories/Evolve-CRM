const ROWS = [
  ["Built by", "A software company guessing at your problems", "An operating business that had your problems — and solved them in live use"],
  ["Pricing model", "Low seat price, then add-on modules, metered AI and onboarding fees", "One per-user price with everything included — no add-ons, no meters, no onboarding fee"],
  ["Missing feature?", "A ticket in a queue behind 10,000 customers", "A conversation with the team that builds it — often shipped in days"],
  ["Your data", "Lives in their cloud, on their terms", "Runs on infrastructure you control — exportable, portable, yours"],
  ["AI features", "Metered add-ons, priced per use", "Self-hosted AI agents included — no meter running on every conversation"],
  ["Telephony & QA", "Third-party bolt-ons, sampled QA", "Native dialler workbench with 100% AI call scoring"],
  ["Compliance", "A settings page and a prayer", "Architecture shaped by life inside a regulated firm"],
];

export default function Compare() {
  return (
    <section id="compare">
      <div className="eyebrow reveal"><span>The honest comparison</span></div>
      <h2 className="reveal d1">What you&rsquo;re actually choosing between.</h2>
      <div className="cmp-wrap reveal d2">
        <table className="cmp">
          <caption className="sr-only">Typical SaaS CRM compared with Evolve CRM</caption>
          <thead>
            <tr><th scope="col"><span className="sr-only">Aspect</span></th><th scope="col">Typical SaaS CRM</th><th scope="col">Evolve CRM</th></tr>
          </thead>
          <tbody>
            {ROWS.map(([k, a, b]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{a}</td>
                <td>{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
