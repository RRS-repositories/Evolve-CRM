export default function PortalPhone() {
  return (
    <div>
      <div className="phone">
        <div className="screen">
          <div className="ph-head">
            <div className="hi">Hi Sarah 👋</div>
            <div className="sub2">Here&rsquo;s where your case is up to</div>
          </div>
          <div className="prog">
            <div className="pt">Your claim — Stage 4 of 6</div>
            <div className="ps">AWAITING LENDER RESPONSE</div>
            <div className="track2"><i style={{ width: "66%" }} /></div>
          </div>
          <div className="ptask done"><span className="ck">✓</span><span className="tt">ID verified</span></div>
          <div className="ptask done"><span className="ck">✓</span><span className="tt">Bank statements uploaded</span></div>
          <div className="ptask"><span className="ck" /><span className="tt">Review your offer sheet</span></div>
          <div className="chatbub">
            <div className="from">SARAH · AI ASSISTANT</div>
            Good news — your lender has acknowledged the claim. I&rsquo;ll message you the moment they
            respond. Nothing needed from you right now.
          </div>
        </div>
      </div>
      <div className="cap" style={{ justifyContent: "center" }}>
        Client portal — self-service on any device
      </div>
    </div>
  );
}
