// x/y/w are design pixels in the 720x290 space the wires are drawn in. Widths are
// pinned so the artwork never depends on font metrics to stay inside the canvas.
const NODES = [
  { x: 18, y: 34, w: 225, k: "TRIGGER", kc: "trig", t: "Docs requested → 48h no upload" },
  { x: 268, y: 120, w: 155, k: "CONDITION", kc: "cond", t: "Has mobile number?" },
  { x: 505, y: 44, w: 200, k: "ACTION · YES", kc: "act", t: "Send WhatsApp reminder" },
  { x: 505, y: 222, w: 200, k: "ACTION · NO", kc: "act", t: "Email + create agent task" },
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
            <div className="flowstage">
              <svg className="wire" viewBox="0 0 720 290" aria-hidden="true">
                <path d="M 165 62 C 220 62, 220 150, 268 150" />
                <path d="M 408 150 C 460 150, 460 72, 505 72" />
                <path d="M 408 168 C 460 168, 460 250, 505 250" />
              </svg>
              {NODES.map((n) => (
                <div className="node" key={n.t} style={{ "--x": n.x, "--y": n.y, "--w": n.w }}>
                  <div className={`nk ${n.kc}`}>{n.k}</div>
                  <div className="nt">{n.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="cap">Evolve · Automation studio — a live document-chasing workflow</div>
    </div>
  );
}
