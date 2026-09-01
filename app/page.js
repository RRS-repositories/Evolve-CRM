import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Problem from "@/components/Problem";
import Origin from "@/components/Origin";
import CtaBand from "@/components/CtaBand";
import Compliance from "@/components/Compliance";
import Outcomes from "@/components/Outcomes";
import Voices from "@/components/Voices";
import Channels from "@/components/Channels";
import Apps from "@/components/Apps";
import Industries from "@/components/Industries";
import Integrations from "@/components/Integrations";
import Compare from "@/components/Compare";
import Maths from "@/components/Maths";
import Deploy from "@/components/Deploy";
import Faq, { FAQS } from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Reveal from "@/components/Reveal";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import BackgroundField from "@/components/BackgroundField";
import Link from "next/link";

/* The FAQ is marked up for rich results as well as for readers — the same
   copy the page renders, so there is nothing here Google sees that a visitor
   does not. */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Reveal />
      <BackgroundField />
      <Nav />

      <main id="main">
      <Hero />
      <TrustBar />
      <Problem />
      <Origin />
      <CtaBand />
      <Compliance />
      <Outcomes />
      <Voices />
      <Channels />
      <Apps />
      <Industries />
      <Integrations />
      <Compare />

      <div className="ctaband reveal">
        <div className="inner">
          <div>
            <h3>Still comparing? Bring your shortlist to the demo.</h3>
            <p>
              We&rsquo;ll show you side-by-side where Evolve wins — and tell you honestly where a big
              vendor might fit you better.
            </p>
          </div>
          <div className="btns">
            <Link className="btn primary" href="/enquire">Enquire now</Link>
            <a className="btn ghost" href="#faq">Read the FAQ</a>
          </div>
        </div>
      </div>

      <Maths />
      <Deploy />
      <Faq />

      </main>

      <div id="surface-wrap">
        <FinalCta />
      </div>
      <Footer />
      <StickyBar />
    </>
  );
}
