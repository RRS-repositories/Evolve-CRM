# Evolve CRM — website

A React/Next.js rebuild of the approved static demo (`../index.html`), matching
its palette, typography, animations and responsive behaviour.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production
```

## What's built

Home page, top bar and footer. `/pricing`, `/founder` and `/enquire` are linked
but not yet built — those are the next pieces.

## How it's put together

```
app/
  layout.js      fonts, SEO metadata, JSON-LD, nav + footer chrome
  page.js        the home page — composes the sections below
  globals.css    design tokens (@theme) + the demo's stylesheet, ported
components/      one file per section, plus the shared chrome
components/mocks/ the three product mockups used inside sections
lib/useReveal.js the scroll-reveal observer
public/          the two real screenshots, extracted from the demo's base64
```

### Why the CSS isn't all Tailwind utilities

The palette, type and spacing scale live in Tailwind's `@theme` block, so
utilities like `bg-abyss` and `font-disp` work. But the demo's intricate pieces
— the canvas organism, the WhatsApp mock, the range slider, the dashed wire
animations, the flow-diagram nodes — are kept as authored CSS. Rewriting them as
utility strings would have risked visual drift on a brief that asked for an
exact match, and would read worse. Tailwind does the layout; the ported CSS does
the identity.

### Server-rendered, deliberately

Every section is a React Server Component, so the page ships as real HTML —
that's what makes it crawlable. Only four pieces are client components, because
only they need to be: the hero (rotating word, live KPI counters, task hopper),
the background canvas, the cost calculator, and the sticky mobile bar.

### SEO

- Static prerender — `next build` reports `/` as `○ (Static)`
- Metadata API: title, description, canonical, Open Graph, Twitter card, robots
- JSON-LD: Organization + SoftwareApplication in the layout, FAQPage on the home
  page (built from the same array the FAQ renders, so they cannot drift apart)
- One `<h1>`, sections under `<h2>` — a real heading hierarchy
- Fonts self-hosted via `next/font` (no render-blocking Google request, no CLS)
- Images extracted from base64 to real files, served through `next/image`

### Accessibility notes

Beyond the demo: a skip link, visible focus rings, an `sr-only` caption and
column header on the comparison table, and the decorative mock sidebars are
spans rather than eight dead links per mockup. Reveal animations are disabled
under `prefers-reduced-motion`, and a `<noscript>` rule keeps content visible
with JS off.

## Known gaps, carried over from the demo

- Below 820px the nav links are hidden with no hamburger menu — the demo does
  this too, so it was matched rather than fixed. Worth a decision.
- CTAs point at `tel:` / `mailto:` as in the demo.
