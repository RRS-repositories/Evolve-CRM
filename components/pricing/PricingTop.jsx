"use client";

import Link from "next/link";
import { useState } from "react";
import { PLANS } from "@/lib/plans";
import { PLAN_ICONS } from "./PlanIcons";

/* The hero and the plan grid are one client component because the billing
   toggle in the hero drives the prices in the grid. They are two <section>s in
   the markup, exactly as the demo has them — this only shares the state. */
export default function PricingTop() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <section id="phero">
        <div className="kicker reveal">SIMPLE PER-USER PRICING · EVERYTHING INCLUDED</div>
        <h1 className="reveal d1">
          One price per user.
          <br />
          <em>Everything included.</em>
        </h1>
        <p className="sub reveal d2">
          Basic is the platform as supplied — cheap and fixed. Every plan above it is{" "}
          <strong>
            tailored to your business, with bespoke build hours and our team building your
            automations for you.
          </strong>{" "}
          Minimum 5 users; every plan starts with a 14-day free trial.
        </p>
        <div className={`billtoggle reveal d2${annual ? " annual" : ""}`}>
          <span className={`opt${annual ? "" : " on"}`}>Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            onClick={() => setAnnual((a) => !a)}
          >
            <i />
          </button>
          <span className={`opt${annual ? " on" : ""}`}>Annual</span>
          <span className="save">SAVE 17%</span>
        </div>
      </section>

      <section id="plans">
        <div className="plangrid">
          {PLANS.map((plan, i) => (
            <article
              className={`plan${plan.popular ? " pop" : ""} reveal${i % 3 ? ` d${i % 3}` : ""}`}
              key={plan.id}
            >
              {plan.popular && <div className="badge">MOST POPULAR</div>}
              <div className="picon">{PLAN_ICONS[plan.icon]}</div>
              <h3>{plan.name}</h3>
              <div className="pfor">{plan.for}</div>

              <div className="price">
                {plan.custom ? (
                  <span className="amt" style={{ fontSize: "clamp(24px,2.2vw,30px)" }}>
                    {plan.custom}
                  </span>
                ) : (
                  <>
                    <span className="cur">£</span>
                    <span className="amt">{annual ? plan.annual : plan.monthly}</span>
                    <span className="per">/user/mo</span>
                  </>
                )}
              </div>
              <div className="pbill">{annual ? plan.billA : plan.billM}</div>
              <div className="users">{plan.users}</div>

              <ul>
                {plan.features.map(([kind, text], k) => (
                  <li className={kind === "hd" ? "hd" : undefined} key={k}>
                    {text}
                  </li>
                ))}
              </ul>

              {plan.allowances && (
                <div className="allow">
                  <div className="ah">Monthly allowances</div>
                  {plan.allowances.map(([k, v]) => (
                    <div key={k}>
                      <span>{k}</span>
                      <b>{v}</b>
                    </div>
                  ))}
                </div>
              )}

              <Link className={`btn ${plan.cta}`} href={`/enquire?plan=${plan.id}`}>
                {plan.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
