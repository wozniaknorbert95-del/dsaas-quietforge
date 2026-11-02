import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import { ROUTES, SITE_URL } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';
import { SCAN_COPY, SCAN_SKUS, scanVatLine } from '@/content/scan';
import { CTAS, PUBLIC_OFFER, WEBSITE_ONLY_EXCEPTION } from '@/content/conversion-copy';

export const metadata: Metadata = {
  title: 'Pricing: scan first, build priced after the scan',
  description:
    'Hours Scan from €149 excl. VAT. The build has no fixed price — it is priced after the scan, from what your company actually needs.',
  openGraph: {
    title: 'Pricing: scan first, build priced after the scan | QuietForge',
    description: 'Hours Scan from €149 excl. VAT. The build is priced after the scan — no fixed price list.',
    url: `${SITE_URL}/pricing/`,
    images: [{ url: '/og/pricing.svg', width: 1200, height: 630, alt: 'Quietforge pricing' }],
  },
};

const DRIVERS = [
  'How many leaks the scan finds worth closing first.',
  'How many systems you want in the first build (one vs two).',
  'Whether inbox, quotes or reporting is the first gate.',
  'Integrations you already own versus ones we must add.',
];

const FAQS = [
  {
    q: 'Is the scan credited?',
    a: 'Yes. The SKU you pay (Hours €149, Both-lanes €290, or Decision €490) comes off the first implementation if we build within 30 days.',
  },
  {
    q: 'Why paid, not a free call?',
    a: 'So both sides take it seriously. You keep the report even if we do not build.',
  },
  {
    q: 'What if it doesn’t work?',
    a: 'You sign off before anything goes live — and the final 50% is invoiced only after the system runs in your production.',
  },
  {
    q: 'Why is there no fixed build price?',
    a: 'Because it depends on the scan result: what your company needs, which stack the system requires and who builds it. You get a quote after the scan, before anything starts.',
  },
  {
    q: 'Must I take maintenance?',
    a: 'No. Monthly and cancellable at month-end. Most people add it once the system is live.',
  },
];

export default function PricingPage() {
  return (
    <>
      <AnalyticsPageView event="pricing_view" />
      <Section padding="large">
        <p className="mb-3 font-mono text-[var(--qf-fs-xs)] uppercase tracking-[0.18em] text-[var(--qf-accent)]">
          Scan first, then a quote
        </p>
        <h1 className="mb-4 max-w-3xl text-[var(--qf-fs-3xl)] font-bold tracking-tight">
          You buy given-back time, not a pile of hours.
        </h1>
        <p className="mb-10 max-w-2xl text-[var(--qf-text-dim)]">
          Scan first. The build has no fixed price — it is priced after the scan. Care only if you want it.
        </p>

        <p className="mb-6 max-w-2xl text-sm text-[var(--qf-text-dim)]">{SCAN_COPY.clientPicks}</p>
        <ul className="qf-scan-sku-grid">
          {SCAN_SKUS.map((sku) => (
            <li key={sku.id}>
              <Card variant={sku.mostChosen ? 'accent' : 'default'} className="flex h-full flex-col p-6">
                <p className="qf-approach-card-n">{sku.eyebrow}</p>
                <h2 className="font-mono text-sm font-bold tracking-[0.14em]">
                  {sku.name}
                </h2>
                <p className="mt-3 text-2xl font-bold">{formatEuro(sku.priceNet)}</p>
                <p className="mt-1 text-sm text-[var(--qf-text-faint)]">{scanVatLine(sku)}</p>
                <p className="mt-3 text-sm text-[var(--qf-text-dim)]">{sku.youMustSend}</p>
                <p className="mt-2 text-sm text-[var(--qf-text-faint)]">{sku.rankingMayInclude}</p>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm text-[var(--qf-text-faint)]">{SCAN_COPY.guarantee}</p>
        <p className="mt-2 max-w-2xl text-sm text-[var(--qf-text-faint)]">{SCAN_COPY.creditLine}</p>
        <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-6 inline-flex justify-center">
          {CTAS.bookAutomationMap} →
        </Link>
      </Section>

      <Section background="surface">
        <h2 className="mb-2 text-[var(--qf-fs-2xl)] font-bold">Build — priced after the scan</h2>
        <p className="mb-4 max-w-2xl text-[var(--qf-text-dim)]">{PUBLIC_OFFER.buildPriceNote}</p>
        <p className="max-w-2xl text-sm text-[var(--qf-text-dim)]">
          Every build includes independent code review, security scans, tests on your real scenarios, documentation and your repo from day one.
        </p>
        <p className="mt-6 max-w-2xl text-sm text-[var(--qf-text-faint)]">{PUBLIC_OFFER.paymentTerms}</p>
      </Section>

      <Section>
        <h2 className="mb-2 text-[var(--qf-fs-2xl)] font-bold">Care — keep it improving</h2>
        <p className="max-w-2xl text-sm text-[var(--qf-text-dim)]">
          Optional for every delivered system: monitoring, fixes and improvements. Scoped and priced together with the build. Monthly cancellable, no lock-in.
        </p>
      </Section>

      <Section background="surface">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">Always included</h2>
        <ul className="max-w-xl space-y-2 text-[var(--qf-text-dim)]">
          {PUBLIC_OFFER.alwaysIncluded.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-[var(--qf-text-faint)]">
          {WEBSITE_ONLY_EXCEPTION}
        </p>
      </Section>

      <Section>
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">What drives the price</h2>
        <ul className="max-w-xl space-y-2 text-[var(--qf-text-dim)]">
          {DRIVERS.map((item) => (
            <li key={item}>— {item}</li>
          ))}
        </ul>
      </Section>

      <Section background="surface">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold">Questions</h2>
        <div className="space-y-3">
          {FAQS.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
        <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-8 inline-flex">
          Book a scan →
        </Link>
      </Section>
    </>
  );
}
