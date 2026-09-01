import Link from "next/link";

/* The demo ships a different nav per page — home links to its own sections,
   pricing links to plans and the comparison table. Kept as a prop rather than
   route detection so this stays a server component. */
const LINKS = {
  home: [
    { href: "#outcomes", label: "Platform" },
    { href: "#industries", label: "Industries" },
    { href: "/founder", label: "Founder", internal: true },
    { href: "#faq", label: "FAQ" },
  ],
  pricing: [
    { href: "/#outcomes", label: "Platform", internal: true },
    { href: "#plans", label: "Plans" },
    { href: "#matrix", label: "Compare" },
    { href: "/founder", label: "Founder", internal: true },
  ],
  founder: [
    { href: "/#outcomes", label: "Platform", internal: true },
    { href: "/pricing", label: "Pricing", internal: true },
    { href: "/#faq", label: "FAQ", internal: true },
  ],
  enquire: [
    { href: "/#outcomes", label: "Platform", internal: true },
    { href: "/pricing", label: "Pricing", internal: true },
    { href: "/founder", label: "Founder", internal: true },
  ],
};

export default function Nav({ variant = "home" }) {
  const links = LINKS[variant] ?? LINKS.home;
  return (
    <nav>
      <Link className="wordmark" href="/" aria-label="Evolve CRM — home">
        EVOLVE<span>&nbsp;/ CRM</span>
      </Link>
      <div className="links">
        {links.map((l) =>
          l.internal ? (
            <Link href={l.href} key={l.label}>{l.label}</Link>
          ) : (
            <a href={l.href} key={l.label}>{l.label}</a>
          ),
        )}
        {variant === "home" && (
          <Link href="/pricing" className="btn ghost" style={{ padding: "9px 16px", fontSize: "13.5px" }}>
            Pricing
          </Link>
        )}
        {(variant === "founder" || variant === "enquire") && (
          <Link href="/pricing" className="btn ghost">
            Packages
          </Link>
        )}
        {/* The enquiry page IS the call to action — a button back to itself
            would be noise, so the demo drops it there. */}
        {variant !== "enquire" && (
          <Link href="/enquire" className="btn primary">Enquire now</Link>
        )}
      </div>
    </nav>
  );
}
