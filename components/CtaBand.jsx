import Link from "next/link";

export default function CtaBand() {
  return (
    <div className="ctaband reveal">
      <div className="inner">
        <div>
          <h3>Skip the sales deck. See the live platform.</h3>
          <p>30 minutes, real screens, your questions — mapped against how your business actually runs.</p>
        </div>
        <div className="btns">
          <Link className="btn primary" href="/enquire">Enquire now</Link>
          <a className="btn ghost" href="tel:01614960100">Call 0161 496 0100</a>
        </div>
      </div>
    </div>
  );
}
