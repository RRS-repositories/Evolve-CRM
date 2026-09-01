"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ROTATING = ["claims firms.", "collections teams.", "sales floors.", "regulated firms."];

const SEED_BARS = [38, 52, 44, 61, 57, 30, 66, 71, 59, 78, 74, 41, 85, 92];
const COOL_BARS = new Set([5, 11]); // the two muted bars in the demo

const SEED_HOPPER = [
  { nm: "Call back — S. Whitfield", cls: "c", pill: "DUE 10M" },
  { nm: "Docs received — review", cls: "g", pill: "READY" },
  { nm: "Offer response — draft", cls: "g", pill: "READY" },
  { nm: "ID check — K. Osei", cls: "n", pill: "QUEUED" },
  { nm: "Payment plan — setup", cls: "n", pill: "QUEUED" },
];

const POOL = [
  ["New lead — web form", "g", "NEW"],
  ["Call back — J. Ahmed", "c", "DUE 5M"],
  ["Docs uploaded — verify", "g", "READY"],
  ["Offer received — review", "g", "READY"],
  ["Welcome pack — send", "n", "QUEUED"],
  ["Payment received — log", "g", "DONE"],
  ["Follow-up — M. Novak", "n", "QUEUED"],
  ["E-sign complete — file", "g", "READY"],
];

/* Deterministic on purpose. toLocaleString depends on the runtime's ICU data,
   so a server without full ICU formats "4806" where the browser formats
   "4,806" — a hydration mismatch that only shows up on some machines. */
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function Hero() {
  const [word, setWord] = useState(0);
  const [kpi, setKpi] = useState({ leads: 312, cases: 4806, calls: 1148 });
  const [rows, setRows] = useState(SEED_HOPPER.map((r) => ({ ...r, fresh: false })));
  const poolIndex = useRef(0);

  /* All three simulations are decoration. Under reduced motion they never
     start, and the hero renders its seeded values — which are the same
     numbers the server sent, so there is no hydration mismatch either way. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotate = setInterval(() => setWord((i) => (i + 1) % ROTATING.length), 2600);

    const tick = setInterval(() => {
      setKpi((k) => {
        const r = Math.random();
        if (r < 0.5) return { ...k, calls: k.calls + 1 + Math.floor(Math.random() * 2) };
        if (r < 0.85) return { ...k, leads: k.leads + 1 };
        return { ...k, cases: k.cases + 1 };
      });
    }, 2400);

    const feed = setInterval(() => {
      const [nm, cls, pill] = POOL[poolIndex.current];
      poolIndex.current = (poolIndex.current + 1) % POOL.length;
      setRows((prev) => [{ nm, cls, pill, fresh: true }, ...prev].slice(0, 5));
    }, 4200);

    return () => {
      clearInterval(rotate);
      clearInterval(tick);
      clearInterval(feed);
    };
  }, []);

  return (
    <section id="hero">
      <div className="kicker reveal">FORGED IN A REGULATED LAW FIRM · NOW AVAILABLE TO YOURS</div>
      <h1 className="reveal d1">
        The CRM that ran <em>108,000 real cases</em> before it became a product.
      </h1>
      <p className="sub reveal d2">
        Every big CRM now says &ldquo;AI agents&rdquo;. Only one was{" "}
        <strong>built inside a high-volume, SRA-regulated claims firm</strong> — under real
        compliance pressure, real call targets, and real clients — then productised. Built for{" "}
        <span className="rot" aria-label="claims firms, collections teams, sales floors, regulated businesses">
          {ROTATING.map((w, i) => (
            <span key={w} className={i === word ? "on" : ""} style={{ position: i === word ? "relative" : "absolute" }}>
              {w}
            </span>
          ))}
        </span>
      </p>
      <div className="ctas reveal d3">
        <Link className="btn primary" href="/pricing">Start 14 Day Free Trial</Link>
        <Link className="btn ghost" href="/enquire">Enquire now</Link>
      </div>
      <div className="riskline reveal d3">
        No card · Full platform · <b>A human replies within one working day</b>
      </div>
      <div className="proofline reveal d3">
        <div><b>108k+</b>cases processed</div>
        <div><b>90k+</b>contacts managed</div>
        <div><b>3</b>continents of agents</div>
        <div><b>100%</b>of calls AI-scored</div>
      </div>

      <div className="shot reveal d3">
        <div className="browser">
          <div className="chrome">
            <i /><i /><i />
            <div className="url">app.evolvecrm.co.uk/dashboard</div>
          </div>
          <div className="ui">
            <div className="side">
              <div className="logo">EVOLVE</div>
              {["Dashboard", "Contacts", "Cases", "Dialler", "Automations", "Documents", "Reports"].map((item, i) => (
                <span key={item} className={`navitem${i === 0 ? " on" : ""}`}>
                  <span className="dot" />
                  {item}
                </span>
              ))}
            </div>
            <div className="main">
              <div className="topbar">
                <h5>Operations overview</h5>
                <div className="live">LIVE</div>
              </div>
              <div className="kpis">
                <div className="kpi"><div className="l">New leads today</div><div className="v">{fmt(kpi.leads)}</div><div className="t">▲ 18% vs yesterday</div></div>
                <div className="kpi"><div className="l">Cases in motion</div><div className="v">{fmt(kpi.cases)}</div><div className="t">▲ 3.2% this week</div></div>
                <div className="kpi"><div className="l">Calls connected</div><div className="v">{fmt(kpi.calls)}</div><div className="t">▲ 9% vs avg</div></div>
                <div className="kpi"><div className="l">SLA breaches</div><div className="v">2</div><div className="t down">▼ down from 11</div></div>
              </div>
              <div className="panes">
                <div className="pane">
                  <h6>Signed cases — last 14 days <span>DAILY</span></h6>
                  <div className="bars">
                    {SEED_BARS.map((h, i) => (
                      <b key={i} className={COOL_BARS.has(i) ? "c" : undefined} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="pane">
                  <h6>Task hopper <span>PRIORITY</span></h6>
                  <div className="rowlist">
                    {rows.map((r, i) => (
                      <div className={`r${r.fresh && i === 0 ? " new" : ""}`} key={`${r.nm}-${i}`}>
                        <span className="nm">{r.nm}</span>
                        <span className={`pill ${r.cls}`}>{r.pill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cap">Evolve · Operations dashboard — live view</div>
      </div>
    </section>
  );
}
