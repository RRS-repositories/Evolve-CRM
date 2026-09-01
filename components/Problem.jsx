const PAINS = [
  {
    n: "✕ SYMPTOM 01",
    h: "You bend to the software",
    p: "Your process gets contorted to fit someone else's data model. Workarounds pile up. Spreadsheets creep back in around the edges.",
  },
  {
    n: "✕ SYMPTOM 02",
    h: "The bill grows with your team",
    p: "Per-seat pricing punishes growth. Add ten agents, add ten licences, add every “premium” module they gate behind the next tier.",
  },
  {
    n: "✕ SYMPTOM 03",
    h: "Missing features live on a roadmap",
    p: "You raise a ticket. It joins a queue behind ten thousand other customers. Maybe next year. Meanwhile your competitors move.",
  },
];

export default function Problem() {
  return (
    <section id="problem">
      <div className="eyebrow reveal"><span>The problem with your current CRM</span></div>
      <h2 className="reveal d1">Built for everyone. <em>Right for no one.</em></h2>
      <div className="pains">
        {PAINS.map((p, i) => (
          <div className={`pain reveal${i ? ` d${i}` : ""}`} key={p.h}>
            <div className="x">{p.n}</div>
            <h3>{p.h}</h3>
            <p>{p.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
