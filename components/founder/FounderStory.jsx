const MILESTONES = [
  ["THE PROBLEM", "A firm outgrowing its software", "High-volume regulated casework, distributed teams, and rented platforms that couldn't keep pace with any of it."],
  ["THE DECISION", "Build, don't rent", "Full migration off SaaS onto a self-hosted platform Brad designed and built — every contact and case carried across."],
  ["THE PROOF", "Run at scale, daily", "108,000+ cases processed. Teams in the UK, India and South Africa on one system. AI scoring every call, every day."],
  ["THE PRODUCT", "Evolve goes to market", "The platform is productised — and today Evolve runs inside law firms, claims management companies, lead generation companies and insurers, with apps and client portals built on the same record."],
];

const STATS = [
  ["108k+", "Cases run on the platform"],
  ["90k+", "Contacts under management"],
  ["3", "Continents of teams"],
  ["1", "Builder who lived every feature"],
];

export default function FounderStory() {
  return (
    <section id="story">
      <div className="eyebrow reveal"><span>How Evolve was built</span></div>
      <div className="grid">
        <div>
          <h2 className="reveal d1">Built in the business, not for the business.</h2>
          <p className="reveal d2">
            Evolve wasn&rsquo;t designed in workshops or validated with focus groups. Every feature
            was built because Brad&rsquo;s own operation needed it that week — and kept only if the
            team actually used it.
          </p>
          <p className="reveal d2">
            The dialler workbench exists because agents were losing minutes between calls. The
            automation engine exists because humans were doing robot work. The AI assistant exists
            because clients ask questions at 11pm and deserve answers.{" "}
            <strong>The compliance architecture exists because a regulated firm doesn&rsquo;t get to
            improvise.</strong>
          </p>
          <p className="reveal d2">
            That&rsquo;s the difference buyers feel in the demo: this platform has opinions, because
            it has experience. Years of it, at volume, under regulation — paid for on Brad&rsquo;s own
            time and money, so you don&rsquo;t have to pay for it on yours.
          </p>
        </div>
        <ul className="milestones reveal d2">
          {MILESTONES.map(([k, h, p]) => (
            <li key={h}>
              <span className="mk">{k}</span>
              <h3>{h}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="fstats reveal">
        {STATS.map(([n, l]) => (
          <div className="fstat" key={l}>
            <div className="n">{n}</div>
            <div className="l">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
