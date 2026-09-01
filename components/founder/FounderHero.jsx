import Image from "next/image";
import Link from "next/link";

export default function FounderHero() {
  return (
    <section id="fhero">
      <div>
        <div className="eyebrow reveal"><span>The founder</span></div>
        <h1 className="reveal d1">Brad Forbes</h1>
        <div className="role reveal d1">FOUNDER &amp; DIRECTOR · BUILDER OF EVOLVE</div>
        <p className="reveal d2">
          Most software founders start with an idea and go looking for customers. Brad started with
          the customers — <strong>thousands of them</strong> — and built the software because nothing
          on the market could keep up.
        </p>
        <p className="reveal d2">
          Behind Evolve sits a group of Manchester companies — Rowan Rose, Fast Action Claims and
          Beacon Legal Group — handling regulated consumer claims at serious volume. Running that
          operation, Brad hit the wall every scaling operator hits: rented platforms that bent his
          business to their limits, per-seat bills that punished growth, and feature requests that
          vanished into vendor roadmaps.
        </p>
        <p className="reveal d2">
          So he built his own. <strong>Designed it, architected it, and wrote it</strong> — the CRM,
          the dialler, the automations, the AI — then ran his entire firm on it: 108,000+ cases,
          90,000+ contacts, agent teams across three continents. That platform is what you now know
          as Evolve.
        </p>
        <div className="ctas reveal d2">
          <Link className="btn primary" href="/enquire">Enquire now</Link>
          <Link className="btn ghost" href="/pricing">See packages</Link>
        </div>
      </div>
      <div className="portraitwrap reveal d1">
        {/* The full 794x900 portrait, not the 160px avatar the home page's
            quote block uses — that one was being upscaled fivefold here. */}
        <Image
          className="portrait"
          src="/founder-portrait.jpg"
          alt="Brad Forbes, founder of Evolve CRM, black and white portrait"
          width={794}
          height={900}
          sizes="(max-width: 940px) 250px, 360px"
          quality={90}
          priority
        />
        <div className="pcap">BRAD FORBES · MANCHESTER · FOUNDER, EVOLVE CRM</div>
      </div>
    </section>
  );
}
