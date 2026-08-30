import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { EMAIL, PRICING, ROUTES, SITE_URL } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import SampleScanLink from '@/components/analytics/SampleScanLink';
import WhatsAppPainPicker from '@/components/analytics/WhatsAppPainPicker';
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

const SCAN_DELIVERABLES = [
  'Your 3 biggest time-and-money leaks, ranked by payback',
  'For each leak: hours lost per week × €40/h — the math is shown, not asserted',
  'A build roadmap: what first, what later, and what NOT to automate',
];

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

        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold text-[var(--qf-text)]">What you get</p>
          <ul className="mt-3 space-y-2">
            {SCAN_DELIVERABLES.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[var(--qf-text-dim)]">
                <span aria-hidden="true" className="text-[var(--qf-accent)]">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <SampleScanLink />
          </p>
          <p className="mt-4 border-l-2 border-[var(--qf-border)] pl-4 text-sm text-[var(--qf-text-faint)]">
            The {formatEuro(PRICING.discovery)} fee is credited toward your first build. If
            there is nothing worth automating, you keep the report and stop there.
          </p>
        </div>

        <div className="qf-book-hero-cta max-w-xl">
          <p className="qf-book-hero-cta-title">Ready to book?</p>
          <p className="qf-book-hero-cta-lead">
            WhatsApp for the payment link, or the form below. I reply within one working
            day.
          </p>
          <div className="qf-book-hero-cta-actions">
            <WhatsAppPainPicker location="book_a_scan" />
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
