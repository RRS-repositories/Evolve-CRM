const CHIPS = [
  { name: "Facebook", left: "50%", top: "10%", pulse: true, svg: (
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#1877F2"/><path d="M23.5 18h-3.6v11h-4.4V18h-2.4v-3.8h2.4v-2.5c0-3 1.5-4.7 4.8-4.7h3.2v3.8h-2.1c-1.2 0-1.5.5-1.5 1.6v1.8h3.7L23.5 18z" fill="#fff"/></svg>
  )},
  { name: "Instagram", left: "78%", top: "21%", svg: (
    <svg viewBox="0 0 36 36" aria-hidden="true"><rect x="4" y="4" width="28" height="28" rx="8" fill="none" stroke="#E1306C" strokeWidth="3"/><circle cx="18" cy="18" r="6.5" fill="none" stroke="#E1306C" strokeWidth="3"/><circle cx="26" cy="10" r="2" fill="#E1306C"/></svg>
  )},
  { name: "TikTok", left: "90%", top: "50%", svg: (
    <svg viewBox="0 0 36 36" aria-hidden="true"><path d="M22 5c.6 3.4 2.6 5.4 6 6v4.3c-2.3 0-4.3-.7-6-2v8.9c0 4.9-3.4 8.3-8 8.3-4.3 0-7.5-3-7.5-7.2 0-4.4 3.6-7.5 8.4-7.1v4.4c-2.3-.5-4 .6-4 2.6 0 1.7 1.3 2.9 3 2.9 2 0 3.4-1.4 3.4-4V5H22z" fill="#0b141a"/><path d="M22 5c.6 3.4 2.6 5.4 6 6v2.2c-3-.4-5.2-2-6-4V5z" fill="#25F4EE"/><path d="M14.9 16.2v2.3c-2.3-.5-4 .6-4 2.6 0 1 .4 1.8 1.1 2.3-1.5-.4-2.5-1.6-2.5-3.2 0-2.5 2.4-4.4 5.4-4z" fill="#FE2C55"/></svg>
  )},
  { name: "Google Ads", left: "78%", top: "79%", svg: (
    <svg viewBox="0 0 36 36" aria-hidden="true"><rect x="5" y="16" width="7" height="15" rx="3.5" fill="#FBBC05" transform="rotate(-30 8.5 23.5)"/><rect x="14.5" y="8" width="7" height="23" rx="3.5" fill="#4285F4" transform="rotate(30 18 19.5)"/><circle cx="9" cy="28" r="4" fill="#34A853"/></svg>
  )},
  { name: "WhatsApp", left: "50%", top: "90%", pulse: true, svg: (
    <svg viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#25D366"/><path d="M18 8a9.8 9.8 0 0 0-8.4 14.9L8 28l5.3-1.5A9.9 9.9 0 1 0 18 8zm5.6 13.4c-.3.8-1.5 1.5-2.2 1.5-.6.1-1.3.3-4.3-1s-4.8-4.4-5-4.6c-.2-.3-1.2-1.6-1.2-3s.7-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l1 2.4c.1.2.1.4 0 .6l-.4.7-.6.6c-.2.2-.4.4-.2.8s1 1.7 2.2 2.7c1.5 1.3 2.8 1.7 3.2 1.9.4.2.6.1.8-.1l1.3-1.5c.3-.3.5-.3.8-.2l2.5 1.2c.4.2.6.3.7.5.1.1.1.7-.3 1.8z" fill="#fff"/></svg>
  )},
  { name: "SMS", left: "22%", top: "79%", svg: (
    <svg viewBox="0 0 36 36" aria-hidden="true"><rect x="4" y="7" width="28" height="19" rx="5" fill="#54786c"/><circle cx="12" cy="16.5" r="1.8" fill="#fff"/><circle cx="18" cy="16.5" r="1.8" fill="#fff"/><circle cx="24" cy="16.5" r="1.8" fill="#fff"/><path d="M10 26l-2 5 7-5h-5z" fill="#54786c"/></svg>
  )},
  { name: "Email", left: "10%", top: "50%", svg: (
    <svg viewBox="0 0 36 36" aria-hidden="true"><rect x="4" y="8" width="28" height="20" rx="4" fill="none" stroke="#e05c48" strokeWidth="3"/><path d="M5 10l13 10L31 10" fill="none" stroke="#e05c48" strokeWidth="3" strokeLinecap="round"/></svg>
  )},
  { name: "Calls", left: "22%", top: "21%", svg: (
    <svg viewBox="0 0 36 36" aria-hidden="true"><path d="M10.5 5.5l4.6 4.5c.6.6.7 1.6.1 2.3l-2 2.4c1.2 2.7 3.4 5 6.1 6.2l2.4-2c.7-.6 1.7-.5 2.3.1l4.5 4.6c.6.7.6 1.7-.1 2.3l-2.6 2.4c-1 .9-2.4 1.2-3.7.7C14.9 26.3 9.7 21.1 7 13.9c-.5-1.3-.2-2.7.7-3.7l2.5-2.6c.6-.7 1.7-.7 2.3-.1z" fill="#0b8f66"/></svg>
  )},
];

const WIRES = [[50,10],[78,21],[90,50],[78,79],[50,90],[22,79],[10,50],[22,21]];

const CHAT = [
  ["in", "Hi James 👋 It's Sarah from Fast Action Claims. We're just missing your bank statements to move your claim forward. Want me to send a secure link?", "09:12"],
  ["out", "Yes please", "09:14"],
  ["in", "Done — here's your secure Open Banking link. Takes about 2 minutes and nothing to print or scan 🔒", "09:14"],
  ["out", "Ok done it", "09:19"],
  ["in", "Perfect — statements received and attached to your file ✅ Your case handler has been notified. I'll message you the moment there's an update.", "09:19"],
];

export default function Channels() {
  return (
    <section id="channels">
      <div className="eyebrow reveal"><span>Every channel, one brain</span></div>
      <h2 className="reveal d1" style={{ fontSize: "clamp(30px,4.6vw,62px)" }}>
        Your ads, messages and calls — all wired into one record.
      </h2>
      <p className="lead reveal d2" style={{ color: "var(--fog)", maxWidth: 640, marginTop: 14, fontSize: 17 }}>
        Leads flow in from Facebook, Instagram, TikTok and Google. Conversations flow out over
        WhatsApp, SMS, email and phone — with Sarah, the built-in AI assistant, working the routine
        ones for you.
      </p>

      <div className="duo2">
        <div className="hubwrap reveal" aria-label="Diagram of channels connecting to Evolve: Facebook, Instagram, TikTok, Google Ads, WhatsApp, SMS, email and calls">
          <svg className="wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {WIRES.map(([x, y]) => <line key={`${x}-${y}`} x1="50" y1="50" x2={x} y2={y} />)}
          </svg>
          <div className="hubcore"><span className="hn">Evolve</span><span className="hs">ONE RECORD</span></div>
          {CHIPS.map((c) => (
            <div className={`chip${c.pulse ? " pulse" : ""}`} key={c.name} style={{ left: c.left, top: c.top }}>
              {c.svg}
              <span className="cn">{c.name}</span>
            </div>
          ))}
        </div>

        <div className="reveal d1">
          <div className="waphone">
            <div className="wascreen">
              <div className="wahead">
                <div className="wav">S</div>
                <div>
                  <div className="wn">Sarah <span className="ai">AI ASSISTANT</span></div>
                  <div className="ws">online · replies instantly</div>
                </div>
              </div>
              <div className="wabody">
                {CHAT.map(([dir, text, time], i) => (
                  <div className={`wam ${dir}`} key={i}>
                    {text}
                    <span className="wt">{time}</span>
                  </div>
                ))}
                <div className="watyping" aria-label="Sarah is typing"><i /><i /><i /></div>
              </div>
            </div>
          </div>
          <ul className="chanlist">
            <li>AI bot works WhatsApp &amp; SMS 24/7</li>
            <li>Every message logged to the record</li>
            <li>Ad leads land in the dialler in seconds</li>
            <li>Human handover whenever it matters</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
