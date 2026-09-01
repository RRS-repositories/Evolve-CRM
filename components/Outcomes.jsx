import DiallerMock from "./mocks/DiallerMock";
import AutomationMock from "./mocks/AutomationMock";
import PortalPhone from "./mocks/PortalPhone";

const WIN = [
  ["Agent dialler workbench", "Calls, tasks and outcomes in one cockpit. Agents stop tab-hopping and start converting — with hoppers feeding them the next best action."],
  ["Smart lead distribution", "Daily pot resets and live round-robin keep leads flowing fairly and fast — no cherry-picking, no lead going cold in a queue."],
  ["Real ad attribution", "Meta, Google and TikTok spend reconciled against signed business — not clicks. Know exactly which pound made you money."],
  ["Leaderboards that drive behaviour", "Live team performance, visible to everyone. Healthy competition without the manager having to manufacture it."],
  ["AI call scoring — every call", "Not a 2% QA sample. Every single call scored, with coaching insights surfaced to team leads automatically."],
  ["Partial lead recovery", "Half-finished forms and dropped enquiries automatically chased and revived instead of quietly dying."],
];

const DELIVER = [
  ["Automation studio", "Visual workflows — triggers, branches, delays, actions — wired directly into your records. Robot work goes to the robots."],
  ["AI assistant, self-hosted", "An AI agent that talks to your customers by name, chases documents and answers questions around the clock — with no per-conversation fees."],
  ["Client self-service portal", "Customers see their own progress, documents and payment plans — including Open Banking flows. Update calls fall off a cliff."],
  ["Document & template engine", "Letters, packs and forms generated from live record data. Consistent, branded, instant."],
  ["Task hoppers & management view", "Work flows to the right person automatically; managers see every queue, blockage and SLA in one screen."],
  ["Omnichannel comms built in", "Email, SMS and WhatsApp from the record itself — every message logged against the customer, forever."],
];

const PROTECT = [
  ["Born under regulation", "Built inside an SRA-regulated firm — audit trails, data discipline and permission boundaries aren't bolted on, they're the foundation."],
  ["MFA & controlled exports", "Every user verified. Data leaves through one logged, reviewed gateway — not a hundred unwatched CSV downloads."],
  ["Your data, actually yours", "Run it on infrastructure you control. No vendor holding your customer base hostage at renewal time."],
  ["AI with a leash", "Machine agents read widely but write narrowly. Automation never gets permissions a junior staff member wouldn't."],
  ["Continuous monitoring", "A fleet of watchdog workers with instant alerts. Problems get flagged to humans before customers ever notice."],
  ["Point-in-time recovery", "Full database snapshots mean the business can be restored to any healthy moment. Sleep-at-night infrastructure."],
];

function Grid({ items }) {
  return (
    <div className="fgrid">
      {items.map(([h, p]) => (
        <div className="f" key={h}>
          <h4>{h}</h4>
          <p>{p}</p>
        </div>
      ))}
    </div>
  );
}

export default function Outcomes() {
  return (
    <section id="outcomes">
      <div className="eyebrow reveal"><span>What the platform does for you</span></div>
      <h2 className="reveal d1">Three outcomes. Everything else is detail.</h2>
      <p className="lead reveal d2">
        Every module in Evolve serves one of three jobs: win more business, deliver it faster, and
        protect it properly.
      </p>

      <div className="outcome reveal">
        <div className="oh"><span className="n">OUTCOME 01</span><h3>Win more business</h3></div>
        <Grid items={WIN} />
        <DiallerMock />
      </div>

      <div className="outcome reveal">
        <div className="oh"><span className="n">OUTCOME 02</span><h3>Deliver it faster</h3></div>
        <Grid items={DELIVER} />
        <div className="duo reveal">
          <AutomationMock />
          <PortalPhone />
        </div>
      </div>

      <div className="outcome reveal">
        <div className="oh"><span className="n">OUTCOME 03</span><h3>Protect it properly</h3></div>
        <Grid items={PROTECT} />
      </div>
    </section>
  );
}
