"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* Below 820px the nav bar has no room for text links, so they move behind a
   toggle. Kept separate from Nav so Nav itself stays a server component. */
export default function NavMenu({ links }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      btnRef.current?.focus();
    };
    /* The panel is a dropdown, not a modal — a tap anywhere else dismisses it. */
    const onPointerDown = (e) => {
      if (!navRef.current?.contains(e.target)) setOpen(false);
    };

    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onPointerDown);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  /* CSS already hides the panel on desktop, but leaving it flagged open would
     spring it back open on the way down to mobile again. */
  useEffect(() => {
    const mq = matchMedia("(min-width:821px)");
    const sync = () => mq.matches && setOpen(false);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const close = () => setOpen(false);

  return (
    <span className="navmenu" ref={navRef}>
      <button
        ref={btnRef}
        type="button"
        className="navtoggle"
        aria-expanded={open}
        aria-controls="navpanel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>
      <div id="navpanel" className={`navpanel${open ? " open" : ""}`}>
        {links.map((l) =>
          l.internal ? (
            <Link href={l.href} key={l.label} onClick={close}>{l.label}</Link>
          ) : (
            <a href={l.href} key={l.label} onClick={close}>{l.label}</a>
          ),
        )}
      </div>
    </span>
  );
}
