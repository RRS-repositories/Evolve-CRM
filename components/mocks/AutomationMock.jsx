const NODES = [
  { left: 18, top: 34, k: "TRIGGER", kc: "trig", t: "Docs requested → 48h no upload" },
  { left: 268, top: 120, k: "CONDITION", kc: "cond", t: "Has mobile number?" },
  { left: 505, top: 44, k: "ACTION · YES", kc: "act", t: "Send WhatsApp reminder" },
  { left: 505, top: 222, k: "ACTION · NO", kc: "act", t: "Email + create agent task" },
];

export default function AutomationMock() {
  return (
    <div className="shot flat" style={{ marginTop: 0 }}>
      <div className="browser">
        <div className="chrome">
          <i /><i /><i />
          <div className="url">app.evolvecrm.co.uk/automations — new document chase</div>
        </div>
        <div style={{ padding: 16, display: "flex", flexDirection: "column", minHeight: 360 }}>
          <div className="flowcanvas">
            <svg className="wire" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 165 62 C 220 62, 220 150, 268 150" />
              <path d="M 408 150 C 460 150, 460 72, 505 72" />
              <path d="M 408 168 C 460 168, 460 250, 505 250" />
            </svg>
            {NODES.map((n) => (
              <div className="node" key={n.t} style={{ left: n.left, top: n.top }}>
                <div className={`nk ${n.kc}`}>{n.k}</div>
                <div className="nt">{n.t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cap">Evolve · Automation studio — a live document-chasing workflow</div>
    </div>
  );
}
