import Link from "next/link";

/* The demo ships three footers: a dark band on the home page, a light panel on
   pricing, and a lighter one on the founder page — different backgrounds,
   widths and small print. Link colour comes from the variant's CSS rather than
   inline styles, so it stays legible on whichever ground it sits on. */
const VARIANT_CLASS = {
  home: "footer-dark",
  pricing: "footer-deep",
  founder: "footer-light",
  enquire: "footer-deep",
};

const NOTES = {
  home: ["PROVEN IN LIVE OPERATION", "108,000+ CASES AND COUNTING"],
  pricing: [
    "EVERYTHING-INCLUDED PRICING",
    "PROVEN ON 108,000+ CASES",
    "PRICES EXCLUDE VAT & CARRIAGE",
    "*UNLIMITED SUBJECT TO FAIR USE",
  ],
  founder: ["FOUNDED IN MANCHESTER", "PROVEN ON 108,000+ CASES"],
  enquire: ["14-DAY FREE TRIAL ON EVERY PLAN", "PROVEN ON 108,000+ CASES"],
};

export default function Footer({ variant = "home" }) {
  const notes = NOTES[variant] ?? NOTES.home;

  return (
    <footer className={VARIANT_CLASS[variant] ?? VARIANT_CLASS.home}>
      <div className="row">
        <div>
          <b>EVOLVE CRM — ALWAYS EVOLVING</b>
          <br />
          Built in Manchester · Proven across our group:
          <br />
          Rowan Rose · Fast Action Claims · Beacon Legal Group
          {variant !== "founder" && variant !== "enquire" && (
            <>
              <br />
              <Link href="/founder">Meet the founder</Link>
              {variant === "home" && (
                <>
                  {" · "}
                  <Link href="/pricing">Pricing</Link>
                </>
              )}
            </>
          )}
        </div>
        <div>
          Manchester · United Kingdom
          <br />
          <a href="https://www.evolvecrm.co.uk">www.evolvecrm.co.uk</a>
          <br />
          <a href="tel:01614960100">0161 496 0100</a> ·{" "}
          <a href="mailto:hello@evolvecrm.co.uk">hello@evolvecrm.co.uk</a>
        </div>
        <div>
          {notes.map((n, i) => (
            <span key={n}>
              {n}
              {i < notes.length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
