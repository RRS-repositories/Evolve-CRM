"use client";

import { useMemo, useState } from "react";

const gbp = (n) => "£" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/* The demo's arithmetic, unchanged: three years of licences with hires spread
   evenly across the period and a typical 8%/yr price rise compounding. */
function project(agents, seat, hires) {
  let total = 0;
  let s = seat;
  for (let y = 0; y < 3; y++) {
    const head = agents + (hires * (y + 0.5)) / 3;
    total += head * s * 12;
    s *= 1.08;
  }
  return { total, perHire: seat * 12 * 3 * 1.083 };
}

function Slider({ label, id, min, max, value, onChange }) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="cl">
        <span>{label}</span>
        {/* No `for` here. On <output> it is a DOMTokenList meaning "computed
            from these elements", not a label association — React writes it as
            an attribute the DOM reads back as a different kind of property,
            which breaks hydration. The input carries its own aria-label. */}
        <output>{value}</output>
      </div>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(+e.target.value)}
        style={{ "--fill": `${fill}%` }}
      />
    </div>
  );
}

export default function Maths() {
  const [agents, setAgents] = useState(25);
  const [seat, setSeat] = useState(49);
  const [hires, setHires] = useState(10);

  const { total, perHire } = useMemo(() => project(agents, seat, hires), [agents, seat, hires]);

  return (
    <section id="maths">
      <div className="eyebrow reveal"><span>Do the maths</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(30px,4.6vw,62px)" }}>
        The hidden-cost calculator.
      </h2>
      <p className="lead reveal d2" style={{ color: "var(--fog)", maxWidth: 640, marginTop: 14, fontSize: 17 }}>
        Big-name CRMs advertise the seat price, then add modules, metered AI and yearly rises. Drag
        the sliders and see what a typical vendor really costs your team over 3 years.
      </p>
      <div className="calcwrap reveal d2">
        <div className="calcpanel">
          <Slider label="Your team size (agents)" id="rAgents" min={3} max={200} value={agents} onChange={setAgents} />
          <Slider label="Typical per-seat price (£/user/month)" id="rSeat" min={15} max={150} value={seat} onChange={setSeat} />
          <Slider label="Hires over the next 3 years" id="rHires" min={0} max={100} value={hires} onChange={setHires} />
        </div>
        <div className="calcresult" aria-live="polite">
          <div>
            <div className="rk">Typical vendor licences — next 3 years</div>
            <div className="rv">{gbp(total)}</div>
          </div>
          <div>
            <div className="rk">What each new hire costs in licences alone</div>
            <div className="rv small">{gbp(perHire)} over 3 yrs</div>
          </div>
          <hr />
          <p className="rnote">
            And that&rsquo;s before their add-on modules, metered AI and onboarding fees.{" "}
            <b>Evolve is one per-user price with everything included</b> — the number on the pricing
            page is the number on your invoice.{" "}
            {total > 100000
              ? "See what the same team costs on Evolve — pricing page, no surprises."
              : "Compare it plan-for-plan on our pricing page."}
          </p>
        </div>
      </div>
    </section>
  );
}
