import Link from "next/link";

export default function PricingCta() {
  return (
    <section id="pcta">
      <div className="inner reveal">
        <div>
          <div className="eyebrow"><span>Start here</span></div>
          <h2>Start your <em>14-day free trial</em> — then pick a plan.</h2>
          <p>
            Your trial account is live within one working day: full platform, sample data loaded, and
            a guided walkthrough from the people who built it. Tell us your team size and we&rsquo;ll
            suggest the right plan honestly — even if it&rsquo;s the cheapest one.
          </p>
        </div>
        <div className="ctas">
          <Link className="btn primary" href="/enquire">Start 14 Day Free Trial</Link>
          <Link className="btn ghost" href="/enquire?plan=Sovereign">Scope a Sovereign deployment</Link>
          <a className="btn ghost" href="tel:01614960100">Call 0161 496 0100</a>
          <div className="note">NO CARD · NO AUTO-BILLING · FULL DATA EXPORT IF YOU LEAVE</div>
        </div>
      </div>
    </section>
  );
}
