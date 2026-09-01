const ITEMS = [
  ["WhatsApp & SMS", "Twilio — two-way, logged to the record"],
  ["Email at scale", "AWS SES — deliverability built in"],
  ["Payments", "WorldPay — plans, tracking, reconciliation"],
  ["Open Banking", "Statement collection in the client portal"],
  ["Meta / Google / TikTok Ads", "Spend reconciled to signed business"],
  ["Telephony", "Native Atlas dialler + call scoring"],
  ["Team chat", "Alerts into Mattermost or Slack"],
  ["Open API", "REST endpoints for anything else"],
];

export default function Integrations() {
  return (
    <section id="integrations">
      <div className="eyebrow reveal"><span>Plays well with your stack</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(30px,4.6vw,62px)" }}>
        Wired into the tools you already use.
      </h2>
      <div className="strip reveal d2">
        {ITEMS.map(([name, detail]) => (
          <div className="intg" key={name}>
            <div className="in">{name}</div>
            <div className="ic">{detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
