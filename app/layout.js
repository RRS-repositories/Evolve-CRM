import { Fraunces, Familjen_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

/* Self-hosted at build time by next/font: no render-blocking request to
   Google, no layout shift, and the demo's exact three faces. */
/* Fraunces is loaded as a variable font: the demo drives it with
   font-variation-settings:"opsz" 90, and an optical-size axis cannot be
   combined with a fixed weight list. Omitting `weight` ships the full
   400-700 range plus the axis, which is what the design needs. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-familjen",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const SITE = "https://www.evolvecrm.co.uk";
const TITLE =
  "Evolve CRM — The CRM that ran a real business before it became a product";
const DESCRIPTION =
  "Evolve CRM was built inside a high-volume, SRA-regulated claims firm and proven on 108,000+ real cases before it was sold to anyone. CRM, dialler, automations and AI compliance in one platform.";

export const metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: TITLE,
    template: "%s — Evolve CRM",
  },
  description: DESCRIPTION,
  keywords: [
    "CRM for law firms",
    "claims management software",
    "SRA regulated CRM",
    "call centre dialler",
    "legal case management",
    "AI compliance CRM",
    "collections CRM",
  ],
  authors: [{ name: "Evolve CRM" }],
  creator: "Evolve CRM",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE,
    siteName: "Evolve CRM",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/dashboard-real.jpg",
        width: 1600,
        height: 900,
        alt: "The Evolve CRM operations dashboard in live use",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/dashboard-real.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#f6fbf8",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

/* Organisation + product markup, so the page is eligible for rich results
   rather than just being crawlable. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Evolve CRM",
      url: SITE,
      email: "hello@evolvecrm.co.uk",
      telephone: "+44 161 496 0100",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Manchester",
        addressCountry: "GB",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "Evolve CRM",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESCRIPTION,
      url: SITE,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "GBP",
        offerCount: 3,
        url: `${SITE}/pricing`,
      },
      publisher: { "@id": `${SITE}/#organization` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${fraunces.variable} ${familjen.variable} ${spaceMono.variable}`}
      style={{ colorScheme: "light" }}
    >
      {/* Browser extensions inject attributes into <body> between the server
          HTML arriving and React hydrating — ColorZilla adds
          cz-shortcut-listen="true", password managers and Grammarly do
          similar. React then reports a mismatch for markup we never wrote.
          suppressHydrationWarning applies to THIS element's own attributes and
          text only, not its descendants, so genuine mismatches inside the page
          are still reported. */}
      <body suppressHydrationWarning>
        {/* Without JS the reveal animation never fires, which would leave the
            page blank for a reader who has it off. The markup is already
            server-rendered; this just makes it visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">Skip to content</a>
        {/* Nav, footer, sticky bar and the canvas background all live in the
            pages rather than here: the demo gives each page different nav
            links, footer small print and sticky-bar actions, and only the home
            page has the animated background at all. */}
        {children}
      </body>
    </html>
  );
}
