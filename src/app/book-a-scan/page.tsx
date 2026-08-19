import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { EMAIL, PRICING, ROUTES, SITE_URL, WHATSAPP } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import BookDiscoveryForm from '@/app/book-discovery/BookDiscoveryForm';

export const metadata: Metadata = {
  title: `Book the Automation Scan — ${formatEuro(PRICING.discovery)}`,
  description:
    '90 minutes, written report is yours, credited toward implementation. QuietForge Automation Scan.',
  openGraph: {
    title: `Book the Automation Scan — ${formatEuro(PRICING.discovery)}`,
    url: `${SITE_URL}/book-a-scan/`,
  },
};

export default function BookAScanPage() {
  return (
    <>
      <AnalyticsPageView event="book_discovery_view" />
      <Section padding="large">
        <h1 className="mb-4 max-w-3xl text-[var(--qf-fs-3xl)] font-bold tracking-tight">
          The Automation Scan — 90 minutes, {formatEuro(PRICING.discovery)}, and the
          report is yours.
        </h1>
        <p className="mb-4 max-w-2xl text-[var(--qf-text-dim)]">
          We find where the week leaks (quotes, orders, inbox, reporting), write it down,
          and decide whether a system is worth building. Credited toward implementation.
        </p>
        <p className="mb-8 max-w-2xl border-l-2 border-[var(--qf-accent)] pl-4 text-sm text-[var(--qf-text-dim)]">
          Why paid? So both sides take it seriously. If there is nothing worth automating,
          you stop and keep the document.
        </p>
        <div className="qf-book-hero-cta max-w-xl">
          <p className="qf-book-hero-cta-title">Ready to book?</p>
          <p className="qf-book-hero-cta-lead">
            WhatsApp for the payment link, or the form below. I reply within one working
            day.
          </p>
          <div className="qf-book-hero-cta-actions">
            <a
              href={WHATSAPP.bookMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="qf-book-fast-path"
            >
              {WHATSAPP.bookMapLabel} →
            </a>
            <Link
              href="#request-slot"
              className="inline-flex min-h-12 items-center border border-[var(--qf-border)] px-5 text-sm font-semibold"
            >
              Prefer the form ↓
            </Link>
          </div>
        </div>
        <p className="mt-6 text-sm text-[var(--qf-text-faint)]">
          {EMAIL} · Rotterdam · reply within one working day
        </p>
        <div id="request-slot" className="mt-12">
          <BookDiscoveryForm />
        </div>
        <p className="mt-8 text-sm text-[var(--qf-text-faint)]">
          Full consent log and legal pages land in sprint S3. Intake uses the existing
          mailbox. See{' '}
          <Link href={ROUTES.legal} className="text-[var(--qf-accent)]">
            privacy
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
