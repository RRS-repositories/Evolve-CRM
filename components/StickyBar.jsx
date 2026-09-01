"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* Mobile-only CTA bar. Appears once the hero has scrolled past, and hides
   again over the final CTA so it never covers the buttons it duplicates. */
export default function StickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const pastHero = scrollY > innerHeight * 0.85;
      const cta = document.getElementById("cta");
      let overCta = false;
      if (cta) {
        const r = cta.getBoundingClientRect();
        overCta = r.top < innerHeight && r.bottom > 0;
      }
      setShow(pastHero && !overCta);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  return (
    <div id="stickybar" className={show ? "show" : ""}>
      <Link className="btn primary" href="/enquire">
        Enquire now
      </Link>
      <a
        className="btn ghost call"
        href="tel:01614960100"
        aria-label="Call Evolve on 0161 496 0100"
      >
        📞
      </a>
    </div>
  );
}
