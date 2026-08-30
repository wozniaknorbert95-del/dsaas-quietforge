import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import SampleScanLink from '@/components/analytics/SampleScanLink';
import VariantCta from '@/components/pricing/VariantCta';
import { ROUTES, SITE_URL } from '@/lib/constants';
import { CTAS, PUBLIC_OFFER, WEBSITE_ONLY_EXCEPTION } from '@/content/conversion-copy';

export const metadata: Metadata = {
  title: 'Pricing: scan, build variants, care',
  description:
    'Clear prices, fixed scope. Automation Scan €690 credited. Builds: Core €2,500 · Scale €4,500 · Command €7,900. Care from €300/month, cancellable.',
  openGraph: {
    title: 'Pricing: scan, build variants, care | Quietforge',
    description: 'Scan €690 credited. Builds €2,500–€7,900 fixed. Care €300–€1,000/mo, cancellable.',
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
    a: 'Yes. The full scan fee comes off the first implementation if we build, within 30 days.',
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
    q: 'What does “most chosen” mean?',
    a: 'The variant most owners pick at this stage. It is a default to think from, not pressure — the scan locks what you actually need.',
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
          Clear prices, fixed scope
        </p>
        <h1 className="mb-4 max-w-3xl text-[var(--qf-fs-3xl)] font-bold tracking-tight">
          You buy given-back time, not a pile of hours.
        </h1>
        <p className="mb-10 max-w-2xl text-[var(--qf-text-dim)]">
          Scan first. Then a fixed-price build at the depth you choose. Care only if you want it.
        </p>

        <Card variant="accent" className="max-w-2xl p-6">
          <h2 className="text-lg font-semibold">{PUBLIC_OFFER.scanName}</h2>
          <p className="mt-3 text-2xl font-bold">{PUBLIC_OFFER.scanPrice}</p>
          <p className="mt-3 text-sm text-[var(--qf-text-dim)]">{PUBLIC_OFFER.scanNote}</p>
          <p className="mt-2 text-sm text-[var(--qf-text-faint)]">
            Honest guarantee: if the scan finds nothing worth automating, the report says exactly that — and it is yours either way.
          </p>
          <p className="mt-4 text-sm">
            <SampleScanLink />
          </p>
          <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-6 inline-flex justify-center">
            {CTAS.bookAutomationMap} →
          </Link>
        </Card>
      </Section>

      <Section background="surface">
        <h2 className="mb-2 text-[var(--qf-fs-2xl)] font-bold">Build — choose your depth</h2>
        <p className="mb-8 max-w-2xl text-sm text-[var(--qf-text-dim)]">
          All fixed-price. All include independent code review, security scans, tests on your real scenarios, documentation and your repo from day one.
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          {PUBLIC_OFFER.buildVariants.map((variant) => (
            <li key={variant.name}>
              <Card variant={variant.mostChosen ? 'accent' : 'default'} className="flex h-full flex-col p-6">
                <h3 className="font-mono text-sm font-bold tracking-[0.14em]">
                  {variant.name}
                  {variant.mostChosen ? ' · most chosen' : ''}
                </h3>
                <p className="mt-3 text-2xl font-bold">{variant.price}</p>
                <p className="mt-3 text-sm text-[var(--qf-text-dim)]">{variant.what}</p>
                <p className="mt-2 text-sm text-[var(--qf-text-faint)]">Timeline: {variant.timeline}</p>
                <p className="text-sm text-[var(--qf-text-faint)]">Your approval gates: {variant.gates}</p>
                <div className="mt-auto">
                  <VariantCta variant={variant.name} />
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="mb-2 text-[var(--qf-fs-2xl)] font-bold">Care — keep it improving</h2>
        <p className="mb-8 max-w-2xl text-sm text-[var(--qf-text-dim)]">
          For every delivered system. Monthly cancellable, no lock-in. I earn when it works, not when it breaks.
        </p>
        <ul className="grid gap-4 md:grid-cols-3">
          {PUBLIC_OFFER.careVariants.map((variant) => (
            <li key={variant.name}>
              <Card variant={variant.mostChosen ? 'accent' : 'default'} className="flex h-full flex-col p-6">
                <h3 className="font-mono text-sm font-bold tracking-[0.14em]">
                  {variant.name}
                  {variant.mostChosen ? ' · most chosen' : ''}
                </h3>
                <p className="mt-3 text-2xl font-bold">{variant.price}</p>
                <ul className="mt-3 space-y-1 text-sm text-[var(--qf-text-dim)]">
                  {variant.features.map((feature) => (
                    <li key={feature}>— {feature}</li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-[var(--qf-text-faint)]">{PUBLIC_OFFER.paymentTerms}</p>
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
