import Image from "next/image";
import Link from "next/link";

export default function Voices() {
  return (
    <section id="voices">
      <div className="eyebrow reveal"><span>From the operators</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(30px,4.6vw,62px)" }}>
        Built by the people who do the work.
      </h2>
      <div className="grid">
        <div className="quote reveal">
          <div className="mark" aria-hidden="true">&ldquo;</div>
          <blockquote>
            We didn&rsquo;t set out to build a CRM product. We set out to run our firm properly — and
            no software on the market could keep up. Evolve is the result of every bottleneck we hit
            and solved at 108,000-case scale. Now other operators can skip those years of pain.
          </blockquote>
          <div className="who">
            <Image
              src="/founder-brad.jpg"
              alt="Brad Forbes"
              width={48}
              height={48}
              style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", filter: "grayscale(1)", border: "2px solid rgba(11,143,102,.4)" }}
            />
            <div>
              <div className="nm2">Brad Forbes</div>
              <div className="rl">
                Founder, Evolve CRM — built to run our own group first ·{" "}
                <Link href="/founder" style={{ color: "var(--glow)", textDecoration: "none", fontWeight: 600 }}>
                  Meet the founder →
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="founding reveal d1">
          <div className="k">FOUNDING CLIENT PROGRAMME</div>
          <h3>Be one of the first five external firms on Evolve</h3>
          <p>We&rsquo;re onboarding a small first cohort — deliberately. Founding clients get:</p>
          <ul>
            <li>Direct access to the team that builds the platform</li>
            <li>Your workflows shaped into the product, not bolted on</li>
            <li>Founding-client commercial terms, locked in</li>
            <li>Full migration of your existing data, handled</li>
          </ul>
          <Link className="btn primary" href="/pricing">See packages &amp; apply</Link>
        </div>
      </div>
    </section>
  );
}
