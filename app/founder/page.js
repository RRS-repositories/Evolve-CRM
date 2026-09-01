import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import FounderHero from "@/components/founder/FounderHero";
import FounderStory from "@/components/founder/FounderStory";
import FounderQuote from "@/components/founder/FounderQuote";
import FounderCta from "@/components/founder/FounderCta";

const SITE = "https://www.evolvecrm.co.uk";

export const metadata = {
  title: "Brad Forbes — the founder",
  description:
    "Brad Forbes built Evolve CRM to run his own SRA-regulated claims firm — 108,000+ cases, 90,000+ contacts, teams on three continents — then productised it.",
  alternates: { canonical: "/founder" },
  openGraph: {
    type: "profile",
    url: `${SITE}/founder`,
    title: "Brad Forbes — founder of Evolve CRM",
    description:
      "He started with the customers, not the idea: the CRM, dialler, automations and AI were built to run a real regulated firm at volume.",
    images: [{ url: "/founder-portrait.jpg", width: 794, height: 900, alt: "Brad Forbes" }],
  },
};

/* Marks the page up as a person profile so the founder is a recognised entity
   linked to the organisation, rather than an unattributed page of prose. */
const personLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Brad Forbes",
    jobTitle: "Founder & Director",
    description:
      "Founder of Evolve CRM. Built the platform to run a high-volume, SRA-regulated claims operation before productising it.",
    image: `${SITE}/founder-portrait.jpg`,
    worksFor: { "@type": "Organization", name: "Evolve CRM", url: SITE },
    address: { "@type": "PostalAddress", addressLocality: "Manchester", addressCountry: "GB" },
  },
};

export default function FounderPage() {
  return (
    <div className="page-founder">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <Reveal />
      <Nav variant="founder" />

      <main id="main">
        <FounderHero />
        <FounderStory />
        <FounderQuote />
        <FounderCta />
      </main>

      <Footer variant="founder" />
    </div>
  );
}
