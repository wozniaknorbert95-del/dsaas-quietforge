import type { Metadata } from 'next';
import Image from 'next/image';
import SolutionLayout from '@/components/solutions/SolutionLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { ROUTES, SITE_URL } from '@/lib/constants';
import { SOLUTION_DETAIL_PRICES } from '@/content/pricing';
import {
  salesFunnelInspireExtension,
  salesFunnelSolutionEffectAfter,
  salesFunnelSolutionEffectBefore,
  salesFunnelSolutionMeta,
  salesFunnelSolutionProblem,
  salesFunnelSolutionSystemItems,
  salesFunnelSolutionTitle,
} from '@/content/sales-funnel-case-study';

export const metadata: Metadata = {
  title: salesFunnelSolutionMeta.title,
  description: salesFunnelSolutionMeta.description,
  openGraph: {
    title: salesFunnelSolutionMeta.openGraphTitle,
    description: salesFunnelSolutionMeta.openGraphDescription,
    url: `${SITE_URL}/solutions/sales-funnel`,
    images: [
      {
        url: '/og/solutions-sales-funnel.svg',
        width: 1200,
        height: 630,
        alt: salesFunnelSolutionMeta.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: salesFunnelSolutionMeta.title,
    description: salesFunnelSolutionMeta.twitterDescription,
    images: ['/og/solutions-sales-funnel.svg'],
  },
};

export default function SalesFunnelPage() {
  const inspire = salesFunnelInspireExtension;

  return (
    <SolutionLayout
      title={salesFunnelSolutionTitle}
      problem={salesFunnelSolutionProblem}
      systemItems={[...salesFunnelSolutionSystemItems]}
      effectBeforeAfter={{
        before: [...salesFunnelSolutionEffectBefore],
        after: [...salesFunnelSolutionEffectAfter],
      }}
      screenKey="wizardCheckout"
      videoKey="wizard"
      caseStudyHref={ROUTES.resultsSalesFunnel}
      priceFrom={SOLUTION_DETAIL_PRICES.salesFunnel}
    >
      <div className="mb-16">
        <Eyebrow>{inspire.eyebrow}</Eyebrow>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <h2 className="text-[var(--qf-fs-xl)] font-bold tracking-tight">{inspire.title}</h2>
          <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-mono font-semibold border border-[var(--qf-warn)] text-[var(--qf-warn)]">
            {inspire.statusBadge}
          </span>
        </div>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          {inspire.lead}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-3xl">
          {inspire.evidence.map((shot) => (
            <figure
              key={shot.src}
              className="rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] overflow-hidden"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={640}
                height={400}
                className="h-auto w-full"
                loading="lazy"
              />
              <figcaption className="px-3 py-2 font-mono text-xs text-[var(--qf-text-faint)]">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)] mb-3">
              Flow
            </p>
            <ol className="space-y-2">
              {inspire.steps.map((step, i) => (
                <li key={step} className="text-sm text-[var(--qf-text)] flex gap-2">
                  <span className="font-mono text-[var(--qf-text-faint)]">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </Card>
          <Card className="p-6 border-[var(--qf-border)]">
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--qf-warn)] mb-3">
              Limitations
            </p>
            <ul className="space-y-2">
              {inspire.limitations.map((item) => (
                <li key={item} className="text-sm text-[var(--qf-text-dim)] flex gap-2">
                  <span className="text-[var(--qf-warn)] shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button href={inspire.demoHref} withArrow variant="secondary">
            {inspire.demoLabel}
          </Button>
          <Button href={ROUTES.bookDiscovery} withArrow>
            Book Automation Map
          </Button>
        </div>
      </div>
    </SolutionLayout>
  );
}
