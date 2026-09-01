import Link from "next/link";

export default function FinalCta() {
  return (
    <section id="cta">
      <div className="eyebrow reveal"><span>Next step</span></div>
      <h2 className="reveal d1">See it running on <em>real work</em> — not a canned demo.</h2>
      <p className="reveal d2">
        Book 30 minutes. We&rsquo;ll walk you through the live platform, map it against your current
        process, and tell you honestly whether it&rsquo;s a fit. If it isn&rsquo;t, we&rsquo;ll say
        so. Founding-client slots are limited to five firms — if you want one, say so when you book.
      </p>
      <div className="ctas reveal d3">
        <Link className="btn primary" href="/enquire">Enquire now</Link>
        <a className="btn ghost" href="mailto:hello@evolvecrm.co.uk?subject=Evolve%20CRM%20founding%20client%20application">
          Apply as a founding client
        </a>
        <a className="btn ghost" href="tel:01614960100">Call 0161 496 0100</a>
      </div>
      <div className="note reveal d3">NO CARD · 14-DAY FREE TRIAL AVAILABLE · A HUMAN REPLIES</div>
    </section>
  );
}
