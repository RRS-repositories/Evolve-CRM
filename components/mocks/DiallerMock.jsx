const NAV = ["Dashboard", "Contacts", "Cases", "Dialler", "Automations", "Reports"];
const SCORES = [["Opening", 92], ["Discovery", 84], ["Compliance", 100], ["Rapport", 77]];
const BOARD = [
  ["1 · A. Naidoo", "g", "14 SIGNED"],
  ["2 · T. Morgan", "g", "12 SIGNED"],
  ["3 · R. Kaur", "g", "11 SIGNED"],
  ["4 · D. Coetzee", "n", "9 SIGNED"],
  ["5 · L. Sharma", "n", "8 SIGNED"],
  ["6 · M. Hughes", "n", "7 SIGNED"],
];

export default function DiallerMock() {
  return (
    <div className="shot flat reveal">
      <div className="browser">
        <div className="chrome">
          <i /><i /><i />
          <div className="url">app.evolvecrm.co.uk/dialler — agent workbench</div>
        </div>
        <div className="ui">
          <div className="side">
            <div className="logo">EVOLVE</div>
            {NAV.map((n) => (
              <span key={n} className={`navitem${n === "Dialler" ? " on" : ""}`}>
                <span className="dot" />
                {n}
              </span>
            ))}
          </div>
          <div className="main">
            <div className="topbar">
              <h5>Agent workbench — T. Morgan</h5>
              <div className="live">ON CALL</div>
            </div>
            <div className="panes">
              <div className="pane">
                <h6>Active call <span>RECORDING</span></h6>
                <div className="callcard">
                  <div className="who">
                    <div className="av">JB</div>
                    <div>
                      <div className="n">James Bennett</div>
                      <div className="s">WARM LEAD · 2ND CONTACT</div>
                    </div>
                  </div>
                  <div className="timer">04:37</div>
                  <div className="acts">
                    <span>Mute</span><span>Hold</span><span>Transfer</span><span>Note</span>
                    <span className="end">End call</span>
                  </div>
                </div>
                <h6 style={{ marginTop: 14 }}>Live AI scoring <span>THIS CALL</span></h6>
                <div className="score">
                  {SCORES.map(([lbl, pc]) => (
                    <div className="sr" key={lbl}>
                      <span className="lbl">{lbl}</span>
                      <div className="bar"><i style={{ width: `${pc}%` }} /></div>
                      <span className="pc">{pc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pane">
                <h6>Team leaderboard <span>TODAY</span></h6>
                <div className="rowlist">
                  {BOARD.map(([nm, cls, pill]) => (
                    <div className="r" key={nm}>
                      <span className="nm">{nm}</span>
                      <span className={`pill ${cls}`}>{pill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cap">Evolve · Dialler workbench — live call with real-time AI scoring</div>
    </div>
  );
}
