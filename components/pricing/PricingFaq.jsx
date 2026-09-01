export const PRICING_FAQS = [
  ["What do the bespoke build hours cover?", "Real engineer time from the team that builds Evolve — not a setup wizard, and not an “agent builder” you're left to figure out. The big platforms make you build your own AI agents or hire an agency separately; with Evolve, our engineers design, build and launch your AI automations, Conversation AI and assistants as part of your plan. We shape your statuses, workflows, documents and dashboards to your process, and on Scale and above we design and build your automations for you. Basic is deliberately different: it's the platform as supplied, fixed, at a price that reflects that. Need more hours later? Buy them in blocks or move up a plan."],
  ["What does the per-user price actually include?", "Everything in your plan's column — genuinely everything. No add-on modules, no metered AI charges, no “premium support” upsell, no onboarding fee. Big-name vendors advertise a low seat price and then charge separately for marketing, AI, service and data tools; some add four-figure mandatory onboarding. With Evolve, the number on this page is the number on your invoice. Minimum 5 users on every plan; volume rates apply from 25 users."],
  ["What does the 14-day free trial include?", "The full platform — not a stripped-down version. We load a sample dataset so you can see real workflows, and a member of the team walks you through it against your own processes. No card, no auto-conversion into a paid plan, no chasing if you decide it's not for you."],
  ["How are calls, SMS and WhatsApp billed?", "Your plan covers the platform and everything in it. Standard network charges for outbound communications — SMS, WhatsApp and call minutes — are billed separately at carrier rates, itemised on your invoice, the same as any phone or messaging service. We estimate these for your volumes in your quote so there are no surprises, and we never add a margin on top."],
  ["Can we change plans or cancel?", "Move up or down a plan at any time; changes apply from your next billing cycle. Monthly plans cancel anytime. Annual plans get two months free and can still be cancelled — you keep access to the end of the paid period, and your data exports in full either way."],
  ["How does Sovereign pricing work?", "Sovereign is scoped to your operation: your cloud, your data volumes, your security requirements, and whatever custom development you need. We quote after a scoping call. Regulated firms usually land here — bring your compliance people."],
];

export default function PricingFaq() {
  return (
    <section id="pfaq">
      <div className="eyebrow reveal"><span>Pricing questions</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(28px,4.2vw,54px)", marginBottom: 44 }}>
        Straight answers on cost.
      </h2>
      <div className="reveal d2">
        {PRICING_FAQS.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
