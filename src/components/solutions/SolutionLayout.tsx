import type { ReactNode } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { ROUTES } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import { screens, pricing, videos } from '@/content/proof';
import ProofMediaGrid from '@/components/ui/ProofMediaGrid';

interface SolutionLayoutProps {
  title: string;
  problem: string;
  systemItems: { title: string; body: string }[];
  effectItems?: { title: string; body: string }[];
  effectBeforeAfter?: { before: string[]; after: string[] };
  screenKey: keyof typeof screens;
  videoKey?: keyof typeof videos;
  caseStudyHref: string;
  priceKey?: keyof typeof pricing;
  priceFrom?: string;
  /** Optional extension block (e.g. INSPIRE) rendered before final CTA */
  children?: ReactNode;
}

export default function SolutionLayout({
  title,
  problem,
  systemItems,
  effectItems,
  effectBeforeAfter,
  screenKey,
  videoKey,
  caseStudyHref,
  priceKey = 'singleSystem',
  priceFrom,
  children,
}: SolutionLayoutProps) {
  const screen = screens[screenKey];
  const priceData = priceKey ? pricing[priceKey] : undefined;
  const rawFrom =
    priceData && 'from' in priceData && priceData.from != null ? String(priceData.from) : null;
  const priceFromTier =
    rawFrom && (rawFrom.includes('–') || rawFrom.includes('/mo'))
      ? rawFrom
      : rawFrom
        ? `from ${rawFrom}`
        : null;
  const priceLabel = priceFrom ?? priceFromTier ?? 'Scoped after Hours Engine Scan';

  return (
    <>
      <Section padding="large">
        <Eyebrow>Solution</Eyebrow>
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-4 max-w-3xl">
          {title}
        </h1>
        <p className="mb-4 font-mono text-xs text-[var(--qf-text-dim)]">{priceLabel}</p>
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <Button
            href={ROUTES.bookDiscovery}
            withArrow
            size="lg"
            analyticsEvent="cta_book_map_click"
            analyticsDetail={{ location: 'solution_hero' }}
          >
            {CTAS.bookAutomationMap}
          </Button>
          <Button href={caseStudyHref} variant="secondary" withArrow>
            See live proof
          </Button>
        </div>

        <div className="mb-12 rounded-[var(--qf-radius)] border-l-4 border-[var(--qf-warn)] bg-[var(--qf-bg-inset)] p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--qf-warn)] mb-2">The Problem</p>
          <p className="text-[var(--qf-fs-lg)] text-[var(--qf-text)] font-semibold">{problem}</p>
        </div>

        <h2 className="text-[var(--qf-fs-xl)] font-bold tracking-tight mb-6">The System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {systemItems.map((item) => (
            <Card key={item.title} className="p-6">
              <h3 className="text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--qf-text-dim)]">{item.body}</p>
            </Card>
          ))}
        </div>

        <h2 className="text-[var(--qf-fs-xl)] font-bold tracking-tight mb-6">The Effect</h2>
        {effectBeforeAfter ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="border-[var(--qf-warn)] p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-warn)]">Before</p>
              <ul className="space-y-3">
                {effectBeforeAfter.before.map((item) => (
                  <li key={item} className="text-sm text-[var(--qf-text-dim)] flex gap-2">
                    <span className="text-[var(--qf-warn)]">✕</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="border-[var(--qf-ok)] p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-ok)]">After</p>
              <ul className="space-y-3">
                {effectBeforeAfter.after.map((item) => (
                  <li key={item} className="text-sm text-[var(--qf-text-dim)] flex gap-2">
                    <span className="text-[var(--qf-ok)]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {effectItems?.map((item) => (
              <Card key={item.title} className="p-6">
                <h3 className="text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--qf-text-dim)]">{item.body}</p>
              </Card>
            ))}
          </div>
        )}

        <h2 className="text-[var(--qf-fs-xl)] font-bold tracking-tight mb-6">Proof</h2>
        <div className="mb-8">
          <ProofMediaGrid
            screen={screen}
            screenKey={screenKey}
            videoKey={videoKey}
            emptyCtaHref={caseStudyHref}
            emptyCtaLabel="View case study"
          />
        </div>
        <div className="mb-16">
          <Button href={caseStudyHref} variant="secondary" withArrow analyticsEvent="case_study_open" analyticsDetail={{ href: caseStudyHref, location: 'solution_detail' }}>
            Read the full case study
          </Button>
        </div>

        {children}

        <Card className="p-8 bg-[var(--qf-bg-raised)] border-[var(--qf-border)] text-center">
          <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-2">Ready to implement?</h2>
          <div className="text-[var(--qf-fs-xl)] font-bold text-[var(--qf-accent)] mb-6">{priceLabel}</div>
          <p className="text-[var(--qf-text-dim)] max-w-xl mx-auto mb-8">
            Start with a paid Hours Engine Scan. You send owner files; we measure leaks.
            Ranking only from measured hours — then we confirm if this system is the right first build.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Button href={ROUTES.bookDiscovery} size="xl" withArrow analyticsEvent="cta_book_map_click" analyticsDetail={{ location: 'solution_detail' }}>
              {CTAS.bookAutomationMap}
            </Button>
            <p className="text-sm text-[var(--qf-text-faint)]">
              See full{' '}
              <a href={ROUTES.pricing} className="underline hover:text-[var(--qf-text)]">
                Pricing
              </a>
            </p>
          </div>
        </Card>
      </Section>
    </>
  );
}
