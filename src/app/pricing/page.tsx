import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import { ROUTES, SITE_URL } from '@/lib/constants';
import { CTAS, PUBLIC_OFFER, WEBSITE_ONLY_EXCEPTION } from '@/content/conversion-copy';

export const metadata: Metadata = {
  title: 'Pricing: scan, implementation, maintenance',
  description:
    'Clear prices, fixed scope. Automation Scan €690 credited. Implementation from €2,500. Maintenance from €300/month.',
  openGraph: {
    title: 'Pricing: scan, implementation, maintenance | Quietforge',
    description: 'Scan €690 credited. Implementation from €2,500. Maintenance from €300/month.',
    url: `${SITE_URL}/pricing/`,
    images: [{ url: '/og/pricing.svg', width: 1200, height: 630, alt: 'Quietforge pricing' }],
  },
};

const TIERS = [
  {
    name: PUBLIC_OFFER.scanName,
    price: PUBLIC_OFFER.scanPrice,
    note: PUBLIC_OFFER.scanNote,
    href: ROUTES.bookAScan,
    cta: CTAS.bookAutomationMap,
    featured: true,
  },
  {
    name: PUBLIC_OFFER.implementationName,
    price: PUBLIC_OFFER.implementationPrice,
    note: PUBLIC_OFFER.implementationNote,
    href: ROUTES.bookAScan,
    cta: 'Start with the scan',
    featured: false,
  },
  {
    name: PUBLIC_OFFER.maintenanceName,
    price: PUBLIC_OFFER.maintenancePrice,
    note: PUBLIC_OFFER.maintenanceNote,
    href: ROUTES.bookAScan,
    cta: 'Ask at the scan',
    featured: false,
  },
] as const;

const DRIVERS = [
  'How many leaks the scan finds worth closing first.',
  'How many systems you want in the first build (one vs two).',
  'Whether inbox, quotes or reporting is the first gate.',
  'Integrations you already own versus ones we must add.',
];

const FAQS = [
  {
    q: 'Is the scan credited?',
    a: 'Yes. The full scan fee comes off the first implementation if we build.',
  },
  {
    q: 'Why paid, not a free call?',
    a: 'So both sides take it seriously. You keep the report even if we do not build.',
  },
  {
    q: 'Why “from” on implementation?',
    a: 'The scan locks scope. After that the price is fixed. No hourly surprise.',
  },
  {
    q: 'Must I take maintenance?',
    a: 'No. Monthly and cancellable. Most people add it once the system is live.',
  },
];

export default function PricingPage() {
  return (
    <>
      <AnalyticsPageView event="pricing_view" />
      <Section padding="large">
        <p className="mb-3 font-mono text-[var(--qf-fs-xs)] uppercase tracking-[0.18em] text-[var(--qf-accent)]">
          Clear prices, fixed scope
        </p>
        <h1 className="mb-4 max-w-3xl text-[var(--qf-fs-3xl)] font-bold tracking-tight">
          You buy given-back time, not a pile of hours.
        </h1>
        <p className="mb-10 max-w-2xl text-[var(--qf-text-dim)]">
          Scan first. Then a fixed-price system. Maintenance only if you want it.
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => (
            <li key={tier.name}>
              <Card variant={tier.featured ? 'accent' : 'default'} className="flex h-full flex-col">
                <h2 className="text-lg font-semibold">{tier.name}</h2>
                <p className="mt-3 text-2xl font-bold">{tier.price}</p>
                <p className="mt-3 flex-1 text-sm text-[var(--qf-text-dim)]">{tier.note}</p>
                <Link href={tier.href} className="qf-btn-fill mt-6 inline-flex justify-center">
                  {tier.cta} →
                </Link>
              </Card>
            </li>
          ))}
        </ul>
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
