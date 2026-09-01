export default function TrustBar() {
  const marks = [
    <>Born inside an <b>SRA-regulated</b> firm</>,
    <><b>108,000+</b> cases processed in live use</>,
    <>Teams on <b>3 continents</b>, one platform</>,
    <><b>Self-hosted</b> option — your data, your cloud</>,
    <><b>100%</b> of calls AI-scored, not sampled</>,
    <>In use by <b>law firms, claims &amp; insurance</b> companies</>,
  ];
  return (
    <div className="trustbar" aria-label="Trust markers">
      {marks.map((m, i) => (
        <span key={i}>{m}</span>
      ))}
    </div>
  );
}
