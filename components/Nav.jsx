import Link from "next/link";

import NavMenu from "./NavMenu";

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

/* The ghost button is a link like any other, so on mobile it joins the panel
   rather than competing with the wordmark and the primary CTA for bar space. */
const GHOST = {
  home: { href: "/pricing", label: "Pricing" },
  founder: { href: "/pricing", label: "Packages" },
  enquire: { href: "/pricing", label: "Packages" },
};

export default function Nav({ variant = "home" }) {
  const links = LINKS[variant] ?? LINKS.home;
  const ghost = GHOST[variant];
  /* founder and enquire already list /pricing, so the ghost would repeat it. */
  const menuLinks =
    ghost && !links.some((l) => l.href === ghost.href)
      ? [...links, { ...ghost, internal: true }]
      : links;
  return (
    <nav>
      {/* First child so the toggle leads the tab order as well as the bar. */}
      <NavMenu links={menuLinks} />
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
        {ghost && (
          <Link href={ghost.href} className="btn ghost">
            {ghost.label}
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
