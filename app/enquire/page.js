import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/enquire/EnquiryForm";

const SITE = "https://www.evolvecrm.co.uk";

export const metadata = {
  title: "Enquire — start your 14-day free trial",
  description:
    "Four details and a real person replies within one working day. Start a 14-day free trial of Evolve CRM — full platform, sample data loaded, no card and no obligation.",
  alternates: { canonical: "/enquire" },
  openGraph: {
    type: "website",
    url: `${SITE}/enquire`,
    title: "Enquire about Evolve CRM",
    description:
      "Tell us about your business and a real person replies within one working day. No sales script, no 47-field form.",
  },
  /* An enquiry form is not a page anyone should reach from search — it is the
     end of a journey that starts on the pages that are. Keeping it out of the
     index also keeps it away from form-spam crawlers. */
  robots: { index: false, follow: true },
};

const STEPS = [
  ["01", <><b>You send the form.</b> Takes about 30 seconds.</>],
  ["02", <><b>We call or email back</b> within one working day to understand your operation.</>],
  ["03", <><b>Your 14-day free trial goes live</b> — full platform, sample data loaded, guided walkthrough.</>],
];

export default function EnquirePage() {
  return (
    <div className="page-enquire">
      <Nav variant="enquire" />

      <main id="main">
        <div className="intro">
          <div className="eyebrow"><span>Enquire</span></div>
          <h1>
            Tell us about your business.
            <br />
            <em>We&rsquo;ll take it from there.</em>
          </h1>
          <p>
            Four details and you&rsquo;re in.{" "}
            <strong>A real person replies within one working day</strong> — no sales script, no
            47-field form, no chasing.
          </p>
          <ul className="steps">
            {STEPS.map(([n, text]) => (
              <li key={n}>
                <span className="n">{n}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="trust">
            ALREADY IN USE BY <b>LAW FIRMS</b> · <b>CLAIMS MANAGEMENT</b> · <b>LEAD GENERATION</b> ·{" "}
            <b>INSURANCE</b>
            <br />
            NO CARD · NO AUTO-BILLING · NO OBLIGATION
          </div>
        </div>

        <EnquiryForm />
      </main>

      <Footer variant="enquire" />
    </div>
  );
}
