import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { ROUTES } from '@/lib/constants';
import { SCAN_COPY, SCAN_EVIDENCE_LABELS, SCAN_HOURS_RATE_EUR, SCAN_TRACKS } from '@/content/scan';

export const metadata: Metadata = {
  title: 'How we measure hours given back',
  description:
    'Three tracks. Five labels. Ranking only from measured hours. Public counter moves only when the client verifies.',
};

export default function ProofMethodologyPage() {
  return (
    <Section padding="large">
      <div className="qf-scan-method">
      <h1 className="qf-scan-h1">How we measure</h1>
      <p className="qf-sys-lead">{SCAN_COPY.labHook}</p>

      <h2 className="qf-sys-h2">Three tracks</h2>
      <ul className="qf-scan-track-grid">
        {SCAN_TRACKS.map((track) => (
          <li key={track.n} className="qf-approach-card">
            <span className="qf-approach-card-n">{track.n}</span>
            <h3 className="qf-approach-card-title">{track.title}</h3>
            <p className="qf-approach-card-body">Proves: {track.proves}</p>
            <p className="qf-approach-card-body">Never: {track.never}</p>
          </li>
        ))}
      </ul>

      <h2 className="qf-sys-h2">Five labels</h2>
      <table className="qf-scan-label-table">
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Meaning</th>
          </tr>
        </thead>
        <tbody>
          {SCAN_EVIDENCE_LABELS.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="qf-sys-lead">{SCAN_COPY.howWeCalculate}</p>

      <h2 className="qf-sys-h2">When the public counter moves</h2>
      <ol className="qf-scan-publish">
        <li>
          <strong>Baseline.</strong> Hours from the owner export — duration or start–end —
          not from a feeling and not from the website crawl.
        </li>
        <li>
          <strong>Rate.</strong> Hours given back × €{SCAN_HOURS_RATE_EUR}/h unless the scan
          agrees a different rate in writing.
        </li>
        <li>
          <strong>Publish.</strong> The public counter and the client case move only when
          the client verifies. Today: 0.
        </li>
      </ol>
      <h2 className="qf-sys-h2">Edge cases</h2>
      <ul className="qf-scan-edges">
        <li>Client did not confirm → we do not count.</li>
        <li>Scope changed → recount from zero for that client.</li>
        <li>Dispute → the number is held with a note.</li>
      </ul>
      <p className="qf-scan-fineprint">
        Rounding: hours to tens, euro to hundreds — when a number exists. Today: 0.
      </p>
      <Link href={ROUTES.proof} className="qf-btn-ghost">
        Back to proof →
      </Link>
      </div>
    </Section>
  );
}
