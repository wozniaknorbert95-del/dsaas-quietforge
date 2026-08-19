import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';
import {
  HOURLY_RATE_CAPTION,
  HOURLY_RATE_EUR,
  type SystemRecord,
} from '@/content/systems-catalog';

export default function CostOfInaction({ system }: { system: SystemRecord }) {
  const { costs, roi, roiExample } = system;
  const isHours = roi.hoursPerWeek > 0;

  return (
    <div>
      <ul className="qf-cost-list">
        {costs.map((fact) => (
          <li key={fact.text} className="qf-cost-item">
            <p>{fact.text}</p>
            <p className="qf-cost-label" data-label={fact.label}>
              {fact.label}
            </p>
          </li>
        ))}
      </ul>
      <table className="qf-cost-table">
        <caption className="qf-cost-caption">
          {isHours ? HOURLY_RATE_CAPTION : 'Illustrative recovery — not a client result.'}{' '}
          <Link href={ROUTES.proofMethodology}>How we count hours →</Link>
        </caption>
        <thead>
          <tr>
            {isHours ? (
              <>
                <th scope="col">Week</th>
                <th scope="col">Month</th>
                <th scope="col">At €{HOURLY_RATE_EUR}/h</th>
              </>
            ) : (
              <>
                <th scope="col">Illustrative</th>
                <th scope="col">Per month</th>
                <th scope="col">Label</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {isHours ? (
              <>
                <td>{roi.hoursPerWeek} h</td>
                <td>{roi.hoursPerWeek * 4} h</td>
                <td>{formatEuro(roi.euroPerMonth)}/mo</td>
              </>
            ) : (
              <>
                <td>{roi.formula}</td>
                <td>{formatEuro(roi.euroPerMonth)}/mo</td>
                <td>Illustrative example</td>
              </>
            )}
          </tr>
        </tbody>
      </table>
      {isHours ? <p className="qf-cost-formula">{roi.formula}</p> : null}
      <p className="qf-cost-formula">{roiExample}</p>
    </div>
  );
}
