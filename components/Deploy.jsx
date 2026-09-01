export default function Deploy() {
  return (
    <section id="deploy">
      <div className="eyebrow reveal"><span>How you can have it</span></div>
      <h2 className="reveal d1">Two ways in — managed, or on your own cloud.</h2>
      <div className="cards">
        <div className="dep reveal">
          <div className="k">OPTION A</div>
          <h3>Managed for you</h3>
          <p>We host, monitor and evolve the platform. You get the outcome without the infrastructure.</p>
          <ul>
            <li>Dedicated, isolated environment</li>
            <li>Migration of your existing data handled</li>
            <li>Monitoring, backups and updates included</li>
            <li>Tailoring workshops to fit your workflows</li>
          </ul>
          <a className="btn ghost" href="#cta">Talk through managed</a>
        </div>
        <div className="dep best reveal d1">
          <div className="k">OPTION B · MOST CONTROL</div>
          <h3>On your own infrastructure</h3>
          <p>
            Evolve deployed to cloud infrastructure you own. Total data sovereignty — the option most
            regulated buyers choose.
          </p>
          <ul>
            <li>Runs in your own cloud account</li>
            <li>Your data never lives on someone else&rsquo;s terms</li>
            <li>Full audit and security review welcomed</li>
            <li>Ongoing development &amp; support retainer available</li>
          </ul>
          <a className="btn primary" href="#cta">Talk through self-hosted</a>
        </div>
      </div>
    </section>
  );
}
