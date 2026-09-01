export default function DoneForYou() {
  return (
    <section id="dfy" style={{ paddingTop: 40, paddingBottom: 20 }}>
      <div className="eyebrow reveal"><span>The difference that justifies the price</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(28px,4.2vw,54px)" }}>
        Their AI is DIY. Ours is done for you.
      </h2>
      <div className="dfygrid reveal d2">
        <div className="dfycard theirs">
          <div className="dfyk">HOW THE BIG PLATFORMS DO IT</div>
          <p>
            They hand you an &ldquo;agent builder&rdquo; and wish you luck. You write the prompts,
            wire the workflows, and test it yourself — or hire an agency at £100–150+ an hour to do
            it. Then the AI is metered on top: pay per conversation resolved, per credit, per action.
          </p>
        </div>
        <div className="dfycard ours">
          <div className="dfyk">HOW EVOLVE DOES IT</div>
          <p>
            <b>Our engineers build it for you.</b> Your Conversation AI, your Voice AI, your
            automations and AI assistants — designed, built, tested and launched by the team behind
            the platform, inside your plan&rsquo;s included build hours. And once it&rsquo;s live,
            the AI runs unmetered. No credits, no per-resolution fees, no agency invoice.
          </p>
        </div>
      </div>
    </section>
  );
}
