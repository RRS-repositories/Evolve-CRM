import Link from "next/link";

export default function FounderCta() {
  return (
    <section id="fcta">
      <div className="inner reveal">
        <div>
          <h2>Want it walked through by the people who built it?</h2>
          <p>No sales script — a working session against your own processes, with honest answers on fit.</p>
        </div>
        <div className="btns">
          <Link className="btn primary" href="/enquire">Enquire now</Link>
          <Link className="btn ghost" href="/pricing">View packages</Link>
        </div>
      </div>
    </section>
  );
}
