'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import GratkaDiagram from '@/components/ui/GratkaDiagram';
import ProofMediaGrid from '@/components/ui/ProofMediaGrid';
import { ROUTES } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import { caseMeasurements, screens, videos } from '@/content/proof';
import type { CaseStudy } from '@/lib/case-studies';

interface CaseStudyLayoutProps {
  study: CaseStudy;
  problemBefore: string[];
  problemAfter: string[];
  /** Default: "After — Resolution". Use "Target state" when delivery is still in progress. */
  problemAfterLabel?: string;
  architectureDiagramSvgUrl: string;
  architectureDiagramAlt: string;
  architectureDescription: ReactNode;
  /** Show link to full LOS stack under architecture diagram. Default true. */
  showLosFootnote?: boolean;
  buildModules: {
    title: string;
    detail: string;
    highlight?: boolean;
    number?: string;
    step?: string;
    status?: string;
    statusClass?: string;
  }[];
  buildDescription: ReactNode;
  stack: string[];
  manifestKey: keyof typeof caseMeasurements;
  videoKey?: keyof typeof videos;
  screenKey: keyof typeof screens;
  /** Interactive workflow (or other) — replaces Demo video column when set. */
  workflowSlot?: ReactNode;
  /** Custom screenshot column (e.g. gallery) — replaces default ProofScreenSlot. */
  screenSlot?: ReactNode;
  downloadButtons?: ReactNode;
  children?: ReactNode;
}

export default function CaseStudyLayout({
  study,
  problemBefore,
  problemAfter,
  problemAfterLabel = 'After — Resolution',
  architectureDiagramSvgUrl,
  architectureDiagramAlt,
  architectureDescription,
  buildModules,
  buildDescription,
  stack,
  manifestKey,
  videoKey,
  screenKey,
  workflowSlot,
  screenSlot,
  downloadButtons,
  children,
  showLosFootnote = true,
}: CaseStudyLayoutProps) {
  const measurement = caseMeasurements[manifestKey];
  const screen = screens[screenKey];

  return (
    <>
      <Section padding="large">
        <Link
          href={ROUTES.results}
          className="mb-6 inline-block text-sm text-[var(--qf-text-dim)] hover:text-[var(--qf-accent)]"
        >
          ← All results
        </Link>
        <Eyebrow>
          Case study {study.number} · {study.meta}
        </Eyebrow>
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-4 max-w-3xl">
          {study.title}
        </h1>
        <p className="mb-2 font-mono text-sm text-[var(--qf-accent)]">{study.meta}</p>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)]">
          {study.context}
        </p>
        {study.real ? (
          <p className="mt-4 font-mono text-sm text-[var(--qf-accent)] max-w-[var(--qf-maxw-narrow)]">
            {study.real}
          </p>
        ) : null}

        {downloadButtons ? <div className="mt-8 flex flex-wrap gap-4">{downloadButtons}</div> : null}

        <div className="mt-12 grid gap-[var(--qf-sp-6)] md:grid-cols-2">
          <Card className="border-[var(--qf-warn)] p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-warn)]">
              Before — Problem
            </p>
            <ul className="m-0 list-none space-y-3 p-0">
              {problemBefore.map((item) => (
                <li key={item} className="text-sm text-[var(--qf-text-dim)]">
                  <span className="text-[var(--qf-warn)]">✕</span> {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card className="border-[var(--qf-ok)] p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-ok)]">
              {problemAfterLabel}
            </p>
            <ul className="m-0 list-none space-y-3 p-0">
              {problemAfter.map((item) => (
                <li key={item} className="text-sm text-[var(--qf-text-dim)]">
                  <span className="text-[var(--qf-ok)]">✓</span> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">Architecture</h2>
        <div className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          {architectureDescription}
        </div>
        <div className="overflow-x-auto rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] p-4">
          <GratkaDiagram
            src={architectureDiagramSvgUrl}
            alt={architectureDiagramAlt}
            width={1200}
            height={800}
            priority
            className="h-auto w-full min-w-[700px]"
          />
        </div>
        {showLosFootnote ? (
          <p className="qf-hint mt-4 text-sm">
            This module sits inside the{' '}
            <Link href={ROUTES.founderSystemDiagram} className="text-[var(--qf-accent)] hover:text-[var(--qf-text)]">
              Living Operating System
            </Link>
            {' '}→{' '}
            <Link
              href={`${ROUTES.resultsOwnerEcosystem}#los`}
              className="text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
            >
              see full stack
            </Link>
          </p>
        ) : null}
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">The Build</h2>
        <div className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">{buildDescription}</div>
        <div className="grid gap-[var(--qf-sp-4)]">
          {buildModules.map((item, idx) => (
            <Card
              key={idx}
              className={item.highlight ? 'border-[var(--qf-accent)] bg-[var(--qf-accent-glow)]' : ''}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                <span className="shrink-0 font-mono text-lg font-bold text-[var(--qf-accent)]">
                  {item.step || item.number || String(idx + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  {item.status ? (
                    <p
                      className={`mb-1 font-mono text-[10px] uppercase tracking-wider ${item.statusClass ?? 'text-[var(--qf-text-faint)]'}`}
                    >
                      {item.status}
                    </p>
                  ) : null}
                  <h3 className="mb-1 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">{item.title}</h3>
                  <p className="max-w-none text-sm text-[var(--qf-text-dim)]">{item.detail}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {children ? <div className="mt-8">{children}</div> : null}
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-xl)] font-bold tracking-tight mb-6">Stack</h2>
        <div className="flex flex-wrap gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--qf-border)] bg-[var(--qf-bg)] px-4 py-1.5 font-mono text-sm text-[var(--qf-text-dim)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      <Section padding="large" id="proof">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">Proof</h2>
        <ProofMediaGrid
          screen={screen}
          screenKey={screenKey}
          videoKey={workflowSlot ? undefined : videoKey}
          workflowSlot={workflowSlot}
          screenSlot={screenSlot}
          emptyCtaHref={ROUTES.bookDiscovery}
          emptyCtaLabel="Book a scan"
        />
      </Section>

      <Section background="surface" padding="large">
        <Card className="p-6 md:p-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
            Measurement
          </p>
          <div className="max-w-none text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
            {measurement?.ready && measurement.value ? (
              measurement.value
            ) : (
              <span className="text-[var(--qf-text-dim)] font-normal text-base">
                Process proof in architecture diagrams and downloadable artefacts above.
              </span>
            )}
          </div>
        </Card>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          Could this work for your business?
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          Start with a paid Automation Map. In 60–90 minutes we map your exact setup, score the ROI, and
          recommend whether this is the right first system — before you commit to anything bigger.
        </p>
        <Button href={ROUTES.bookDiscovery} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
      </Section>
    </>
  );
}
