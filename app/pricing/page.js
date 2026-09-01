import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PricingTop from "@/components/pricing/PricingTop";
import DemoStrip from "@/components/pricing/DemoStrip";
import DoneForYou from "@/components/pricing/DoneForYou";
import Matrix from "@/components/pricing/Matrix";
import PowerUps from "@/components/pricing/PowerUps";
import PricingFaq, { PRICING_FAQS } from "@/components/pricing/PricingFaq";
import PricingCta from "@/components/pricing/PricingCta";
import PricingStickyBar from "@/components/pricing/PricingStickyBar";
import { PLANS } from "@/lib/plans";

const SITE = "https://www.evolvecrm.co.uk";

export const metadata = {
  title: "Pricing — one price per user, everything included",
  description:
    "Evolve CRM pricing: five plans from £29/user/month, minimum 5 users, 14-day free trial. Everything included at your plan level — no add-on modules, no metered AI, no onboarding fees.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: `${SITE}/pricing`,
    title: "Evolve CRM pricing — everything included, per user",
    description:
      "Five plans from £29/user/month with a 14-day free trial. No add-on modules, no metered AI, no onboarding fees.",
  },
};

/* Offers are generated from the same PLANS array the cards render, so the
   structured data cannot advertise a price the page does not show. */
const offersLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Evolve CRM",
  description:
    "CRM, dialler, automations and AI compliance in one platform — built inside an SRA-regulated claims firm.",
  brand: { "@type": "Brand", name: "Evolve CRM" },
  offers: PLANS.filter((p) => p.monthly).map((p) => ({
    "@type": "Offer",
    name: `${p.name} plan`,
    price: p.monthly,
    priceCurrency: "GBP",
    url: `${SITE}/pricing`,
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.monthly,
      priceCurrency: "GBP",
      unitText: "user per month",
    },
  })),
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Reveal />
      <Nav variant="pricing" />

      <main id="main">
        <PricingTop />
        <DemoStrip />
        <DoneForYou />
        <Matrix />
        <PowerUps />
        <PricingFaq />

        <div className="usedby-wrap">
          <div className="usedby reveal">
            ALREADY IN USE BY <b>LAW FIRMS</b> · <b>CLAIMS MANAGEMENT COMPANIES</b> ·{" "}
            <b>LEAD GENERATION COMPANIES</b> · <b>INSURANCE COMPANIES</b>
          </div>
        </div>
      </main>

      <div id="pcta-wrap">
        <PricingCta />
        <Footer variant="pricing" />
      </div>
      <PricingStickyBar />
    </>
  );
}
