"use client";

import { useEffect } from "react";

/* Scroll reveal: elements marked .reveal fade and rise once, the first time
   they enter the viewport.
 *
 * The revealed state is written as `data-revealed`, deliberately NOT as a
 * class. React owns `className` on these elements, so a class added here is
 * destroyed the next time the component re-renders for any reason — which is
 * how clicking the pricing toggle made the toggle and every plan card vanish.
 * React never sets `data-revealed` as a prop, so it is not part of the
 * reconciliation diff and survives.
 *
 * The observer also re-scans after each render, so elements that mount later
 * (or re-mount) still get revealed. */
export default function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealAll = () => {
      document.querySelectorAll(".reveal:not([data-revealed])").forEach((el) => {
        el.dataset.revealed = "true";
      });
    };

    if (reduced) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.dataset.revealed = "true";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    const observe = () => {
      document.querySelectorAll(".reveal:not([data-revealed])").forEach((el) => io.observe(el));
    };
    observe();

    /* Sections can mount after this effect (route change, lazy content), so
       watch for them rather than assuming one pass is enough. */
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
