import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { EMAIL, ROUTES, SITE_URL } from '@/lib/constants';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import SampleScanLink from '@/components/analytics/SampleScanLink';
import BookScanIntake from '@/components/scan/BookScanIntake';
import {
  SCAN_COPY,
  SCAN_CREDIT_DAYS,
  SCAN_EVIDENCE_LABELS,
} from '@/content/scan';

export const metadata: Metadata = {
  title: `Book an Hours Engine Scan — ${SCAN_COPY.fromPrice}`,
  description:
    'Hours, Both-lanes, or Decision. You send owner files; we measure. Ranking only from measured hours. Credited 30 days.',
  openGraph: {
    title: `Book an Hours Engine Scan — ${SCAN_COPY.fromPrice}`,
    url: `${SITE_URL}/book-a-scan/`,
  },
};

export default function BookAScanPage() {
  return (
    <>
      <AnalyticsPageView event="book_discovery_view" />
      <Section padding="large">
        <h1 className="mb-4 max-w-3xl text-[var(--qf-fs-3xl)] font-bold tracking-tight">
          Book an Hours Engine Scan — {SCAN_COPY.fromPrice}.
        </h1>
        <p className="mb-4 max-w-2xl text-[var(--qf-text-dim)]">
          {SCAN_COPY.clientPicks} You send a website URL and an owner-only export. We
          measure. We do not invent euro from a call.
        </p>
        <p className="mb-8 max-w-2xl border-l-2 border-[var(--qf-accent)] pl-4 text-sm text-[var(--qf-text-dim)]">
          Why paid? So both sides take it seriously. If there is nothing worth automating,
          you stop and keep the document.
        </p>

        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold text-[var(--qf-text)]">What you get</p>
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
          <p className="mt-4 text-sm text-[var(--qf-text-dim)]">{SCAN_COPY.howWeCalculate}</p>
          <p className="mt-4 text-sm">
            <SampleScanLink />
          </p>
          <p className="mt-4 border-l-2 border-[var(--qf-border)] pl-4 text-sm text-[var(--qf-text-faint)]">
            {SCAN_COPY.creditLine} {SCAN_COPY.guarantee}
          </p>
          <p className="mt-3 text-sm text-[var(--qf-text-faint)]">{SCAN_COPY.noExportHonesty}</p>
        </div>

        <BookScanIntake />

        <p className="mt-6 text-sm text-[var(--qf-text-faint)]">
          {EMAIL} · Rotterdam · reply within one working day · credited {SCAN_CREDIT_DAYS} days
        </p>
        <p className="mt-8 text-sm text-[var(--qf-text-faint)]">
          Your details are used only to respond to this enquiry. See the{' '}
          <Link href={ROUTES.legal} className="text-[var(--qf-accent)]">
            privacy &amp; data policy
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
