import type { SystemRecord } from '@/content/systems-catalog';

const FOOTNOTE = 'Illustrative composite example — not a real client';

export default function ExampleCompany({
  example,
}: {
  example: SystemRecord['example'];
}) {
  return (
    <div className="qf-example">
      <p className="qf-example-name">{example.name}</p>
      <p className="qf-example-profile">{example.profile}</p>
      <div className="qf-example-cols">
        <div>
          <h3 className="qf-example-h">Without the system</h3>
          <ul className="qf-example-list">
            {example.before.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="qf-example-h">With the system</h3>
          <ul className="qf-example-list">
            {example.withSystem.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <table className="qf-cost-table">
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Before</th>
            <th scope="col">After</th>
          </tr>
        </thead>
        <tbody>
          {example.math.map((row) => (
            <tr key={row.metric}>
              <td>{row.metric}</td>
              <td>{row.before}</td>
              <td>{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="qf-example-foot">{FOOTNOTE}</p>
    </div>
  );
}
