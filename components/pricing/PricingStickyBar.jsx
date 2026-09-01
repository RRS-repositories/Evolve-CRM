"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* The pricing page's sticky bar differs from the home page's: it appears
   earlier (0.6 of a viewport rather than 0.85), hides over #pcta rather than
   #cta, and its second button jumps to the comparison table instead of dialling. */
export default function PricingStickyBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const past = scrollY > innerHeight * 0.6;
      const cta = document.getElementById("pcta");
      let over = false;
      if (cta) {
        const r = cta.getBoundingClientRect();
        over = r.top < innerHeight && r.bottom > 0;
      }
      setShow(past && !over);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  return (
    <div id="stickybar" className={show ? "show" : ""}>
      <Link className="btn primary" href="/enquire">Start free trial</Link>
      <a className="btn ghost" href="#matrix" style={{ flex: "0 0 auto" }}>Compare</a>
    </div>
  );
}
