import Link from "next/link";

export default function DemoStrip() {
  return (
    <div className="demostrip reveal">
      <div className="inner">
        <div>
          <div className="k">EVERY PLAN STARTS THE SAME WAY</div>
          <h3>14-day free trial — the full platform, real data, no card.</h3>
          <p>
            A live environment with sample cases loaded, plus a guided walkthrough from the team that
            built it. If it&rsquo;s not for you, walk away on day 14 with nothing owed.
          </p>
        </div>
        <Link className="btn primary" href="/enquire">Start 14 Day Free Trial</Link>
      </div>
    </div>
  );
}
