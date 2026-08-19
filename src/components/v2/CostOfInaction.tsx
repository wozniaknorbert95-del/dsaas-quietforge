import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';
import {
  HOURLY_RATE_CAPTION,
  HOURLY_RATE_EUR,
  type SystemRecord,
} from '@/content/systems-catalog';

export default function CostOfInaction({ system }: { system: SystemRecord }) {
  const { costs, roi } = system;
  const weekly = roi.hoursPerWeek > 0 ? `${roi.hoursPerWeek} h` : '—';
  const monthlyHours =
    roi.hoursPerWeek > 0 ? `${roi.hoursPerWeek * 4} h` : 'see formula';

  return (
    <div>
      <ul className="qf-cost-list">
        {costs.map((fact) => (
          <li key={fact.text} className="qf-cost-item">
            <p>{fact.text}</p>
            <p className="qf-cost-label">{fact.label}</p>
          </li>
        ))}
      </ul>
      <table className="qf-cost-table">
        <caption className="qf-cost-caption">
          {HOURLY_RATE_CAPTION}{' '}
          <Link href={ROUTES.proofMethodology}>How we count hours →</Link>
        </caption>
        <thead>
          <tr>
            <th scope="col">Week</th>
            <th scope="col">Month</th>
            <th scope="col">At €{HOURLY_RATE_EUR}/h</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{weekly}</td>
            <td>{monthlyHours}</td>
            <td>{formatEuro(roi.euroPerMonth)}/mo</td>
          </tr>
        </tbody>
      </table>
      <p className="qf-cost-formula">{roi.formula}</p>
    </div>
  );
}
