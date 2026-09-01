"use client";

import useReveal from "@/lib/useReveal";

/* Runs the scroll-reveal observer for the whole page. It renders nothing, so
   every section above stays a server component and ships as real HTML — which
   is what makes the content crawlable rather than assembled in the browser. */
export default function Reveal() {
  useReveal();
  return null;
}
