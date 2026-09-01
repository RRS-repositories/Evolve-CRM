export const FAQS = [
  ["Who actually owns our data?", "You do — contractually and practically. On the self-hosted option, Evolve runs in a cloud account you control and your data never sits on our infrastructure. On the managed option, your environment is isolated, exportable in full at any time, and leaving is a migration, not a hostage negotiation."],
  ["How does pricing work?", "Simple per-user pricing with a 5-user minimum — and everything included at your plan level. No add-on modules, no metered AI, no onboarding fees. Full plans and prices are on the pricing page; volume rates apply from 25 users, and Sovereign deployments are scoped individually."],
  ["How long does it take to go live?", "Faster than an enterprise CRM project, slower than clicking “start free trial” — because we migrate your data and shape the workflows before day one. A typical deployment with migration is measured in weeks, not quarters, and we agree the timeline before any commitment."],
  ["Can it be adapted to how we work?", "That's the point of it. Evolve was rebuilt weekly around one firm's operations for years; adapting it to yours is the same muscle. Statuses, workflows, documents, automations, dashboards — shaped to your process during onboarding, and adaptable after, without a change-request queue."],
  ["What about compliance and security?", "The platform grew up inside an SRA-regulated firm, so audit trails, permission boundaries, MFA, controlled data exports, and point-in-time recovery are architecture, not add-ons. Security review and due diligence are welcomed — bring your IT or compliance people to the demo."],
  ["What happens when we need a feature you don't have?", "You talk to the team that builds the product — not a ticket queue behind ten thousand other customers. If it makes the platform better, it gets built; founding clients directly shape the roadmap."],
];

export default function Faq() {
  return (
    <section id="faq">
      <div className="eyebrow reveal"><span>Straight answers</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(30px,4.6vw,62px)", marginBottom: 50 }}>
        The questions buyers actually ask.
      </h2>
      <div className="reveal d2">
        {FAQS.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
