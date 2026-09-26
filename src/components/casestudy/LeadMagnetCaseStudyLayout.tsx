import Link from 'next/link';
import { ReactNode } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import GratkaDiagram from '@/components/ui/GratkaDiagram';
import VideoSlot from '@/components/ui/VideoSlot';
import ProductGallery from '@/components/casestudy/ProductGallery';
import { ROUTES, EXTERNAL } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import { GRATKA } from '@/lib/gratka';
import { leadMagnetGallery } from '@/content/proof';
import type { CaseStudy } from '@/lib/case-studies';
import {
  leadMagnetChallenge,
  leadMagnetExperienceName,
  leadMagnetFlowDiagramAlt,
  leadMagnetHero,
  leadMagnetImplementation,
  leadMagnetInsight,
  leadMagnetOutcomeDisclaimer,
  leadMagnetOutcomeEvents,
  leadMagnetPortfolioTitle,
  leadMagnetRewardLadder,
  leadMagnetRewardLegalDisclaimer,
  leadMagnetSalesOneLiner,
  leadMagnetScopeOfWork,
  leadMagnetSeasonPrize,
  leadMagnetSolution,
  leadMagnetVideoStoryboard,
} from '@/content/lead-magnet-case-study';

interface LeadMagnetCaseStudyLayoutProps {
  study: CaseStudy;
  heroActions: ReactNode;
}

export default function LeadMagnetCaseStudyLayout({
  study,
  heroActions,
}: LeadMagnetCaseStudyLayoutProps) {
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
        <h1 className="mb-4 max-w-3xl text-[var(--qf-fs-3xl)] font-bold leading-[var(--qf-lh-tight)] tracking-tight">
          {leadMagnetPortfolioTitle}
        </h1>
        <p className="mb-3 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-fs-lg)] text-[var(--qf-text)]">
          {leadMagnetHero.audience}
        </p>
        <p className="mb-2 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-fs-lg)] font-semibold text-[var(--qf-text)]">
          {leadMagnetHero.outcome}
        </p>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] font-mono text-xs text-[var(--qf-text-faint)]">
          {leadMagnetHero.supporting}
        </p>
        {heroActions}
      </Section>

      <Section background="surface" padding="large">
        <h2 className="mb-8 text-[var(--qf-fs-2xl)] font-bold tracking-tight">
          Problem · Insight · Solution
        </h2>
        <div className="grid gap-[var(--qf-sp-6)] md:grid-cols-3">
          <Card className="border-[var(--qf-warn)] p-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-warn)]">
              {leadMagnetChallenge.title}
            </p>
            <p className="text-sm text-[var(--qf-text-dim)]">{leadMagnetChallenge.body}</p>
          </Card>
          <Card className="border-[var(--qf-accent)] p-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
              {leadMagnetInsight.title}
            </p>
            <p className="text-sm text-[var(--qf-text-dim)]">{leadMagnetInsight.body}</p>
          </Card>
          <Card className="border-[var(--qf-ok)] p-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-ok)]">
              {leadMagnetSolution.title}
            </p>
            <p className="text-sm text-[var(--qf-text-dim)]">{leadMagnetSolution.body}</p>
          </Card>
        </div>
        <div className="mt-10 overflow-x-auto rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] p-4">
          <GratkaDiagram
            src={GRATKA.leadMagnetFlowSvg}
            alt={leadMagnetFlowDiagramAlt}
            width={1200}
            height={820}
            priority
            className="h-auto w-full min-w-[700px]"
          />
        </div>
        <p className="qf-hint mt-4 text-sm">
          Part of the{' '}
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
      </Section>

      <Section padding="large">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold tracking-tight">Reward ladder</h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          Four progression tiers unlock as players clear each act — discount first, then physical
          purchase bonuses on wizard activation.
        </p>
        <div className="mb-8 grid gap-[var(--qf-sp-4)] md:grid-cols-2">
          {leadMagnetRewardLadder.map((tier) => (
            <Card key={tier.code} className="p-5">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                {tier.level} · {tier.code}
              </p>
              <p className="mb-1 text-sm font-semibold text-[var(--qf-text)]">{tier.label}</p>
              <p className="font-mono text-xs text-[var(--qf-text-faint)]">
                {tier.act} ·{' '}
                {tier.type === 'discount' ? 'discount' : 'purchase bonus on activation'}
              </p>
            </Card>
          ))}
        </div>
        <Card className="mb-4 border-[var(--qf-border)] p-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
            {leadMagnetSeasonPrize.title}
          </p>
          <p className="text-sm text-[var(--qf-text-dim)]">{leadMagnetSeasonPrize.body}</p>
        </Card>
        <p className="max-w-[var(--qf-maxw-narrow)] font-mono text-xs text-[var(--qf-text-faint)]">
          {leadMagnetRewardLegalDisclaimer}
        </p>
      </Section>

      <Section padding="large">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold tracking-tight">Scope of work</h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          {leadMagnetSalesOneLiner}
        </p>
        <div className="grid gap-[var(--qf-sp-6)] md:grid-cols-2">
          {leadMagnetScopeOfWork.map((pillar) => (
            <Card key={pillar.title} className="p-6">
              <h3 className="mb-2 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
                {pillar.title}
              </h3>
              <p className="mb-3 text-sm text-[var(--qf-text-dim)]">{pillar.deliverable}</p>
              {pillar.proof ? (
                <p className="font-mono text-xs text-[var(--qf-accent)]">{pillar.proof}</p>
              ) : null}
            </Card>
          ))}
        </div>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold tracking-tight">Product gallery</h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          Seven screens from production — {leadMagnetExperienceName} on app.flexgrafik.nl. Flow,
          not feature list.
        </p>
        <ProductGallery shots={leadMagnetGallery} />
      </Section>

      <Section padding="large">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold tracking-tight">Walkthrough</h2>
        <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          45-second overview — export from CapCut when ready. Storyboard beats below.
        </p>
        <div className="mb-8 max-w-3xl">
          <VideoSlot
            videoKey="leadMagnet"
            emptyCtaHref={EXTERNAL.leadMagnetGame}
            emptyCtaLabel="Play live experience"
          />
        </div>
        <ul className="m-0 max-w-[var(--qf-maxw-narrow)] list-none space-y-2 p-0">
          {leadMagnetVideoStoryboard.map((beat) => (
            <li key={beat.beat} className="font-mono text-xs text-[var(--qf-text-dim)]">
              <span className="text-[var(--qf-accent)]">{beat.beat}</span> · {beat.duration} ·{' '}
              {beat.shot}
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold tracking-tight">Implementation</h2>
        <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          {leadMagnetImplementation.summary}
        </p>
        <div className="flex flex-wrap gap-3">
          {leadMagnetImplementation.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--qf-border)] bg-[var(--qf-bg)] px-4 py-1.5 font-mono text-sm text-[var(--qf-text-dim)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      <Section padding="large">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold tracking-tight">Outcome</h2>
        <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          Every funnel step is tracked in GA4 and GTM — you can see where players drop and when they
          convert.
        </p>
        <div className="mb-8 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--qf-border)]">
                <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  Event
                </th>
                <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  Funnel step
                </th>
                <th className="py-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  What it tells you
                </th>
              </tr>
            </thead>
            <tbody>
              {leadMagnetOutcomeEvents.map((row) => (
                <tr key={row.event} className="border-b border-[var(--qf-border)]">
                  <td className="py-3 pr-4 font-mono text-[var(--qf-text)]">{row.event}</td>
                  <td className="py-3 pr-4 text-[var(--qf-text-dim)]">{row.funnelStep}</td>
                  <td className="py-3 text-[var(--qf-text-dim)]">{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Card className="p-6">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)] mb-2">
            Measurement
          </p>
          <p className="text-[var(--qf-text-dim)]">{leadMagnetOutcomeDisclaimer}</p>
        </Card>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="mb-4 text-[var(--qf-fs-2xl)] font-bold tracking-tight">
          Could this work for your business?
        </h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-fs-lg)] text-[var(--qf-text-dim)]">
          Start with a paid Hours Engine Scan. You send files; we measure whether a gamified
          lead system is the right first build.
        </p>
        <Button href={ROUTES.bookDiscovery} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
      </Section>
    </>
  );
}
