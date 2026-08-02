import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import GratkaDiagram from '@/components/ui/GratkaDiagram';
import InspireExtensionBlock from '@/components/solutions/InspireExtensionBlock';
import { ROUTES, SITE_URL } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import { resultsPageHero, resultsPageMeta } from '@/content/results-page';
import { GRATKA } from '@/lib/gratka';
import { CASE_STUDIES } from '@/lib/case-studies';
import FieldReports from '@/components/results/FieldReports';
import SystemMetrics from '@/components/home/SystemMetrics';
import IntentBadges from '@/components/ui/IntentBadges';
import StatusBadge from '@/components/ui/StatusBadge';
import TrackedLink from '@/components/analytics/TrackedLink';

interface CaseGratkaLink {
  label: string;
  href: string;
}

interface CaseExtras {
  diagramSrc: string;
  diagramAlt: string;
  gratkaLinks: CaseGratkaLink[];
}

const CASE_EXTRAS: Partial<Record<string, CaseExtras>> = {
  'inbox-killer': {
    diagramSrc: GRATKA.inboxKillerFlowSvg,
    diagramAlt:
      'Inbox Killer flow diagram: read, classify, sort into lanes, draft reply, human approval gate, then send',
    gratkaLinks: [
      { label: 'Download flow diagram (SVG)', href: GRATKA.inboxKillerFlowSvg },
      { label: 'Download before/after (PDF)', href: GRATKA.inboxKillerBeforeAfterPdf },
    ],
  },
  'agent-orchestrator': {
    diagramSrc: GRATKA.orchestratorArchitectureSvg,
    diagramAlt:
      'Agent OS 2.0 hybrid architecture: VPS control plane, 5-node LangGraph pipeline, local runner and human approval gate',
    gratkaLinks: [
      { label: 'Architecture diagram (SVG)', href: GRATKA.orchestratorArchitectureSvg },
      { label: 'Agent card sample (PDF)', href: GRATKA.orchestratorAgentCardPdf },
      { label: 'Workflow map (PDF)', href: GRATKA.orchestratorWorkflowMapPdf },
    ],
  },
  'sales-funnel': {
    diagramSrc: GRATKA.salesFunnelJourneySvg,
    diagramAlt:
      'Self-service configurator journey: welcome, seven configuration steps, then checkout',
    gratkaLinks: [
      { label: 'Configurator journey (SVG)', href: GRATKA.salesFunnelJourneySvg },
      { label: 'Journey map (PDF)', href: GRATKA.salesFunnelJourneyPdf },
      { label: 'ROI framing sheet (PDF)', href: GRATKA.salesFunnelRoiPdf },
    ],
  },
  'advisory-modernisation': {
    diagramSrc: GRATKA.advisoryDeliveryTimelineSvg,
    diagramAlt:
      'Staged delivery timeline: six phases with sign-off gates for advisory firm modernisation',
    gratkaLinks: [
      { label: 'Scope summary (PDF)', href: GRATKA.advisoryScopeSummaryPdf },
      { label: 'AVG / data layer (PDF)', href: GRATKA.advisoryAvgLayerPdf },
      { label: 'Delivery timeline (SVG)', href: GRATKA.advisoryDeliveryTimelineSvg },
      { label: 'Delivery timeline (PDF)', href: GRATKA.advisoryDeliveryTimelinePdf },
    ],
  },
  'lead-magnet': {
    diagramSrc: GRATKA.leadMagnetFlowSvg,
    diagramAlt:
      'Gamified lead funnel: register gate, play acts, reward tiers, leaderboard season, coupon bridge to self-service wizard',
    gratkaLinks: [
      { label: 'Flow diagram (SVG)', href: GRATKA.leadMagnetFlowSvg },
      { label: 'Play live game', href: 'https://app.flexgrafik.nl/' },
    ],
  },
  'owner-ecosystem': {
    diagramSrc: GRATKA.losArchitectureSvg,
    diagramAlt: 'Living Operating System — six layers, eight repositories, governance-first',
    gratkaLinks: [
      { label: 'Download LOS diagram (SVG)', href: GRATKA.losArchitectureSvg },
      { label: 'Download LOS map (PDF)', href: GRATKA.losArchitecturePdf },
      { label: 'Full LOS map', href: `${ROUTES.resultsOwnerEcosystem}#los` },
    ],
  },
  'jadzia-coi': {
    diagramSrc: GRATKA.jadziaCoiArchitectureSvg,
    diagramAlt:
      'Jadzia COI architecture: central operational brain with wizard, game, portal, WordPress SSH and Telegram HITL',
    gratkaLinks: [
      { label: 'COI architecture diagram (SVG)', href: GRATKA.jadziaCoiArchitectureSvg },
      { label: 'Full case study', href: ROUTES.resultsJadziaCoi },
    ],
  },
};

/* ── metadata ── */
export const metadata: Metadata = {
  title: resultsPageMeta.title,
  description: resultsPageMeta.description,
  openGraph: {
    title: resultsPageMeta.title,
    description: resultsPageMeta.openGraphDescription,
    url: `${SITE_URL}/results`,
    images: [
      {
        url: '/og/results.svg',
        width: 1200,
        height: 630,
        alt: resultsPageMeta.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: resultsPageMeta.title,
    description: resultsPageMeta.twitterDescription,
    images: ['/og/results.svg'],
  },
};

/* ── page ── */
export default function ResultsPage() {
  return (
    <>
      <Section padding="large">
        <Eyebrow>{resultsPageHero.eyebrow}</Eyebrow>
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-6 max-w-3xl">
          {resultsPageHero.h1}
        </h1>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)]">
          {resultsPageHero.lead}
        </p>
        <p className="qf-hint mt-4 max-w-[var(--qf-maxw-narrow)]">{resultsPageHero.hint}</p>
      </Section>

      {/* LI-R10: INSPIRE / complex-quote outbound landing — shared SSoT block */}
      <Section background="surface" padding="large" id="design-intake">
        <InspireExtensionBlock
          headingMode="outcome"
          showSolutionLink
          mapAnalyticsLocation="results_inspire"
        />
      </Section>

      <Section padding="large">
        <div className="grid gap-[var(--qf-sp-6)] md:grid-cols-2">
          {CASE_STUDIES.map((c) => {
            const extras = c.slug ? CASE_EXTRAS[c.slug] : undefined;

            return (
              <Card key={c.number} className="flex h-full flex-col p-6 md:p-8">
                <span className="mb-2 block font-mono text-sm text-[var(--qf-info)]">
                  {c.number}
                </span>
                <h2 className="mb-1 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
                  {c.title}
                </h2>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <StatusBadge status={c.status} />
                  <IntentBadges intents={[...c.intents]} />
                </div>
                <p className="mb-3 max-w-none text-sm text-[var(--qf-text-dim)]">
                  <strong className="text-[var(--qf-text)]">Problem:</strong> {c.context}
                </p>
                <p className="mb-3 max-w-none text-sm text-[var(--qf-text-dim)]">
                  <strong className="text-[var(--qf-text)]">System:</strong> {c.system}
                </p>
                <p className="mb-3 max-w-none border-l-2 border-[var(--qf-accent)] pl-3 text-sm text-[var(--qf-text)]">
                  <strong>Effect:</strong> {c.real}
                </p>
                <p className="mb-6 max-w-none font-mono text-xs text-[var(--qf-text-faint)]">
                  Measurement: {c.measurement}
                </p>

                {extras ? (
                  <div className="mb-4 overflow-x-auto rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] p-2">
                    <GratkaDiagram
                      src={extras.diagramSrc}
                      alt={extras.diagramAlt}
                      width={1200}
                      height={720}
                      className="h-auto w-full min-w-[280px]"
                    />
                  </div>
                ) : null}

                {c.slug && c.slug !== 'owner-ecosystem' ? (
                  <p className="qf-hint mb-4 text-xs">
                    Part of the{' '}
                    <Link href={ROUTES.founderSystemDiagram} className="text-[var(--qf-accent)]">
                      Living Operating System
                    </Link>
                  </p>
                ) : null}

                <div className="mt-auto space-y-2 border-t border-[var(--qf-border)] pt-4 text-sm">
                  <TrackedLink
                    href={c.detailHref}
                    event="case_study_open"
                    detail={c.slug ? { slug: c.slug } : { href: c.detailHref }}
                    className="block text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
                  >
                    Read full case study →
                  </TrackedLink>
                  {extras?.gratkaLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      download
                      className="block text-[var(--qf-info)] hover:text-[var(--qf-text)]"
                    >
                      {link.label} ↓
                    </Link>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section padding="large">
        <Eyebrow>How these systems connect</Eyebrow>
        <h2 className="mb-3 text-[var(--qf-fs-xl)] font-bold text-[var(--qf-text)] max-w-3xl">
          One supervised Living Operating System
        </h2>
        <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-sm text-[var(--qf-text-dim)]">
          Every case study above runs inside the same stack — Jadzia COI, VCMS supervision, Agent OS
          execution, wizard commerce and portal trust. Architecture is shared; the business outcome
          differs per client.
        </p>
        <Card className="border-[var(--qf-accent)] p-6 md:p-8">
          <div className="mb-6 overflow-x-auto rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] p-3">
            <GratkaDiagram
              src={GRATKA.losArchitectureSvg}
              alt="Living Operating System — six layers and eight repositories"
              width={1200}
              height={720}
              className="h-auto w-full min-w-[480px]"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`${ROUTES.resultsOwnerEcosystem}#los`}
              className="text-sm font-semibold text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
            >
              Full LOS map →
            </Link>
            <Link
              href={GRATKA.losArchitectureSvg}
              download
              className="text-sm text-[var(--qf-info)] hover:text-[var(--qf-text)]"
            >
              Download LOS diagram (SVG) ↓
            </Link>
          </div>
        </Card>
      </Section>

      <FieldReports />

      <SystemMetrics />

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          Let&apos;s find what&apos;s worth automating in your business.
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          Start with a paid Automation Map. In 60–90 minutes we&apos;ll pinpoint your biggest leaks
          and show you the ROI — before you commit to anything bigger.
        </p>
        <Button href={ROUTES.bookDiscovery} withArrow size="lg" analyticsEvent="cta_book_map_click" analyticsDetail={{ location: 'results_footer' }}>
          {CTAS.bookAutomationMap}
        </Button>
      </Section>
    </>
  );
}
