import { MATRIX } from "@/lib/matrix";

/* "y" and "n" become the tick and dash the demo uses; a leading ** marks text
   the demo emphasised with <b>. Everything else prints as written. */
function Cell({ value }) {
  if (value === "y") return <span className="yes">✓</span>;
  if (value === "n") return <span className="no">—</span>;
  if (typeof value === "string" && value.startsWith("**")) return <b>{value.slice(2)}</b>;
  return value;
}

export default function Matrix() {
  return (
    <section id="matrix">
      <div className="eyebrow reveal"><span>Every plan, side by side</span></div>
      <h2 className="reveal d1">What&rsquo;s in each plan.</h2>
      <div className="mtx-wrap reveal d2">
        <table className="mtx">
          <caption className="sr-only">Feature comparison across all five Evolve CRM plans</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Basic</th>
              <th scope="col">Growth</th>
              <th scope="col" className="pop2">Scale</th>
              <th scope="col">Command</th>
              <th scope="col">Sovereign</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map((row, i) => {
              if (row[0] === "grp") {
                return (
                  <tr className="grp" key={`grp-${i}`}>
                    <td colSpan={6}>{row[1]}</td>
                  </tr>
                );
              }
              const [label, note, ...cells] = row;
              return (
                <tr key={`${label}-${i}`}>
                  <th scope="row">
                    {label}
                    {note && <small>{note}</small>}
                  </th>
                  {cells.map((c, k) => (
                    <td className={k === 2 ? "pop2" : undefined} key={k}>
                      <Cell value={c} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
