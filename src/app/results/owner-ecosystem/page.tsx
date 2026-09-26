import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import GratkaDiagram from '@/components/ui/GratkaDiagram';
import LivingSystemDiagram from '@/components/diagram/LivingSystemDiagram';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { ROUTES, ARTEFACTS, SITE_URL } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import { GRATKA } from '@/lib/gratka';
import { vcmsFeatureStatus } from '@/content/proof';
import { ECOSYSTEM_REPOS } from '@/content/ecosystem';
import {
  OWNER_FLOW_STEPS,
  JADZIA_ONE_LINER,
  PORTAL_CHAT_DISCLAIMER,
} from '@/content/owner-ecosystem';
import {
  JADZIA_COI,
  JADZIA_COI_ANCHOR,
  JADZIA_COI_CAPABILITIES,
  jadziaCoiCapabilityStatusClass,
  JADZIA_COI_STACK,
} from '@/content/jadzia-coi';
import { READINESS_ROWS } from '@/content/readiness';
import { INVESTOR_SECTION, LIVE_DEMO_LINKS } from '@/content/live-demos';
import StatusBadge from '@/components/ui/StatusBadge';
import { CASE_STUDIES } from '@/lib/case-studies';
import IntentBadges from '@/components/ui/IntentBadges';
import ModulePreviewThumb from '@/components/ui/ModulePreviewThumb';
import VideoSlot from '@/components/ui/VideoSlot';

const CASE_MAP = CASE_STUDIES.map((c) => ({
  case: `${c.number} ${c.title}`,
  maps: c.system,
}));

const VCMS_WHY = [
  {
    title: 'Governance before deploy',
    detail: 'VCMS scans all repos, agent rules and handoffs before changes reach production — not after a client reports a bug.',
  },
  {
    title: 'Conflicts visible early',
    detail: 'SSoT mismatches and duplicate tasks surface in scan reports. Live target: Conflicts 0 on every scan.',
  },
  {
    title: 'Human approval stays separate',
    detail: 'VCMS supervises the codebase; Agent OS runs the build pipeline. Review gates decide what ships — VCMS does not auto-deploy.',
  },
];

export const metadata: Metadata = {
  title: 'Owner ecosystem — Living Operating System',
  description:
    'Living Operating System: 8-repo governed stack. Jadzia COI, VCMS supervision, Agent OS execution, wizard commerce — the stack behind Quietforge.',
  openGraph: {
    title: 'Owner ecosystem — Living Operating System',
    description:
      'LOS architecture map · 8 repos · governance-first · honest LIVE/PARTIAL labels — the stack behind Quietforge.',
    url: `${SITE_URL}/results/owner-ecosystem`,
    images: [
      {
        url: '/og/results-owner-ecosystem.svg',
        width: 1200,
        height: 630,
        alt: 'Living Operating System — 8 repos one supervised stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Owner ecosystem — Living Operating System',
    description: 'LOS proof — live stack behind the Conversion Systems Architect.',
    images: ['/og/results-owner-ecosystem.svg'],
  },
};

export default function OwnerEcosystemPage() {
  return (
    <>
      <Section padding="large">
        <Link
          href={ROUTES.results}
          className="mb-6 inline-block text-sm text-[var(--qf-text-dim)] hover:text-[var(--qf-accent)]"
        >
          ← All results
        </Link>
        <Eyebrow>Owner ecosystem · live proof</Eyebrow>
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-4 max-w-3xl">
          The system behind the architect
        </h1>
        <p className="mb-2 font-mono text-sm text-[var(--qf-accent)]">
          8 repos · 1 Living Operating System · process proof
        </p>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)]">
          Before I sell automation to SMB clients, I run it on my own business. This is the same LOS
          architecture as the home page — governance, commerce, AI execution and supervision in one
          supervised stack.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={GRATKA.losArchitectureSvg} target="_blank" rel="noopener noreferrer" variant="secondary">
            LOS diagram (SVG) ↓
          </Button>
          <Button href={GRATKA.losArchitecturePdf} target="_blank" rel="noopener noreferrer" variant="secondary">
            LOS map (PDF) ↓
          </Button>
          <Button href={ROUTES.founderSystemDiagram} variant="ghost">
            Interactive Technical map →
          </Button>
        </div>
      </Section>

      <Section background="surface" padding="large" id="los">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          Living Operating System — full map
        </h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          Interactive architecture — six layers, eight repos, thirteen integration contracts. Click
          nodes for AS-IS proof and TO-BE roadmap. Forward to a developer, partner or accountant.
        </p>
        <LivingSystemDiagram variant="full" defaultView="architecture" />
        <div className="mt-10">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--qf-text-faint)]">
            Download static diagram
          </h3>
          <div className="overflow-x-auto rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] p-4 opacity-90">
            <GratkaDiagram
              src={GRATKA.losArchitectureSvg}
              alt="Living Operating System — six layers and eight repositories"
              width={1200}
              height={720}
              className="h-auto w-full min-w-[480px] max-h-[360px] object-contain object-left"
            />
          </div>
        </div>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          Eight repos at a glance
        </h2>
        <div className="grid gap-[var(--qf-sp-4)] sm:grid-cols-2">
          {ECOSYSTEM_REPOS.map((repo) => (
            <Card
              key={repo.repoKey}
              className={repo.flagship ? 'border-[var(--qf-accent)] bg-[var(--qf-accent-glow)] p-5' : 'p-5'}
            >
              <p className="mb-1 font-mono text-xs uppercase tracking-wider text-[var(--qf-info)]">
                {repo.number} · {repo.role}
              </p>
              {repo.statusNote ? (
                <p className="mb-2 text-xs text-[var(--qf-text-faint)]">{repo.statusNote}</p>
              ) : null}
              <h3 className="mb-2 font-bold text-[var(--qf-text)]">{repo.repoKey}</h3>
              <ModulePreviewThumb screenKey={repo.screenKey} size="sm" />
              <div className="mb-3">
                <IntentBadges intents={[...repo.intents]} />
              </div>
              {repo.repoKey === 'flexgrafik-meta' ? (
                <>
                  <p className="mb-3 text-sm text-[var(--qf-text-dim)]">
                    Method / Hours Engine Scan — the paid first step.
                  </p>
                  <Link
                    href={ARTEFACTS.automationMapSample}
                    download
                    className="text-sm text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
                  >
                    Hours Engine sample ↓
                  </Link>
                </>
              ) : repo.repoKey === 'flex-vcms' ? (
                <Link
                  href={ROUTES.resultsOwnerEcosystemWhyVcms}
                  className="text-sm text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
                >
                  Governance layer proof ↓
                </Link>
              ) : (
                <Link
                  href={repo.proofRoute}
                  className="text-sm text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
                >
                  See proof →
                </Link>
              )}
            </Card>
          ))}
        </div>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          How it flows
        </h2>
        <div className="grid gap-[var(--qf-sp-4)]">
          {OWNER_FLOW_STEPS.map((step) => (
            <Card
              key={step.step}
              className={step.highlight ? 'border-[var(--qf-accent)] bg-[var(--qf-accent-glow)]' : ''}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
                <span className="shrink-0 font-mono text-lg font-bold text-[var(--qf-accent)]">
                  {step.step}
                </span>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-[var(--qf-text)]">{step.title}</h3>
                    <StatusBadge status={step.status} />
                  </div>
                  <p className="max-w-none text-sm text-[var(--qf-text-dim)]">{step.detail}</p>
                  {step.plannedNote ? (
                    <p className="mt-2 text-xs text-[var(--qf-text-faint)]">
                      PLANNED: {step.plannedNote}
                    </p>
                  ) : null}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          Built vs planned
        </h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          Eight repos with honest readiness from production inventory — no revenue or MRR claims.
        </p>
        <div className="overflow-x-auto rounded-[var(--qf-radius)] border border-[var(--qf-border)]">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--qf-border)] bg-[var(--qf-bg-inset)]">
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  Module
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  Readiness
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  Capability
                </th>
                <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {READINESS_ROWS.map((row) => (
                <tr key={row.repoKey} className="border-b border-[var(--qf-border)] last:border-0">
                  <td className="px-4 py-3 font-semibold text-[var(--qf-text)]">{row.module}</td>
                  <td className="px-4 py-3 font-mono text-[var(--qf-text-dim)]">{row.readiness}</td>
                  <td className="px-4 py-3 text-[var(--qf-text-dim)]">{row.capability}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section padding="large" id={JADZIA_COI_ANCHOR} className="scroll-mt-24">
        <Eyebrow>{JADZIA_COI.name}</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-2">
          {JADZIA_COI.fullName}
        </h2>
        <p className="mb-2 font-mono text-sm text-[var(--qf-accent)]">{JADZIA_COI.tagline}</p>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)]">
          {JADZIA_COI.summary}
        </p>
        <div className="mb-8 grid gap-[var(--qf-sp-4)] sm:grid-cols-2 lg:grid-cols-3">
          {JADZIA_COI_CAPABILITIES.map((cap) => (
            <Card key={cap.id} className="p-5">
              <p
                className={`mb-1 font-mono text-[10px] uppercase tracking-wider ${jadziaCoiCapabilityStatusClass(cap.status)}`}
              >
                {cap.status}
              </p>
              <h3 className="mb-2 font-bold text-[var(--qf-text)]">{cap.title}</h3>
              <p className="max-w-none text-sm text-[var(--qf-text-dim)]">{cap.detail}</p>
            </Card>
          ))}
        </div>
        <Card className="p-5">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
            Stack
          </p>
          <ul className="flex flex-wrap gap-2 text-sm text-[var(--qf-text-dim)]">
            <li className="rounded-full border border-[var(--qf-border)] px-3 py-1">
              {JADZIA_COI_STACK.api}
            </li>
            <li className="rounded-full border border-[var(--qf-border)] px-3 py-1">
              {JADZIA_COI_STACK.llm}
            </li>
            <li className="rounded-full border border-[var(--qf-border)] px-3 py-1">
              {JADZIA_COI_STACK.ops}
            </li>
            <li className="rounded-full border border-[var(--qf-border)] px-3 py-1">
              {JADZIA_COI_STACK.data}
            </li>
          </ul>
        </Card>
        <div className="mt-8">
          <Button href={ROUTES.resultsJadziaCoi} withArrow>
            Read full Jadzia COI case study
          </Button>
        </div>
      </Section>

      <Section background="surface" padding="large">
        <Card className="p-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
            Portal chat · product roadmap
          </p>
          <p className="mb-4 max-w-none text-sm text-[var(--qf-text-dim)]">{PORTAL_CHAT_DISCLAIMER}</p>
          <p className="max-w-none text-sm text-[var(--qf-text-dim)]">{JADZIA_ONE_LINER}</p>
        </Card>
      </Section>

      <Section padding="large">
        <Eyebrow>{INVESTOR_SECTION.eyebrow}</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          {INVESTOR_SECTION.title}
        </h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)]">
          {INVESTOR_SECTION.lead}
        </p>
        <div className="grid gap-[var(--qf-sp-4)] sm:grid-cols-2">
          {LIVE_DEMO_LINKS.map((demo) => (
            <Card key={demo.id} className="p-5">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-[var(--qf-text)]">{demo.label}</h3>
                <StatusBadge status={demo.status} />
              </div>
              <p className="mb-3 text-sm text-[var(--qf-text-dim)]">{demo.note}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={demo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
                >
                  Open live demo ↗
                </a>
                {demo.verifyHref ? (
                  <a
                    href={demo.verifyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--qf-text-dim)] hover:text-[var(--qf-accent)]"
                  >
                    Verify API health ↗
                  </a>
                ) : null}
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--qf-text-faint)]">{INVESTOR_SECTION.docsNote}</p>
      </Section>

      <Section padding="large" id="ecosystem-video" className="scroll-mt-24">
        <Eyebrow>Ecosystem tour</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          How the whole stack connects
        </h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)]">
          One business, eight repositories — capture to governance in one supervised pipeline.
          Video plays when the montage ships; explore the map and live demos meanwhile.
        </p>
        <VideoSlot videoKey="ecosystem" />
      </Section>

      <Section background="surface" padding="large" id="why-vcms" className="scroll-mt-24">
        <Eyebrow>Supervision layer</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          Why VCMS matters
        </h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)]">
          VCMS is the governance layer behind this ecosystem — not a CMS panel. It scans content,
          repos and agent rules so your operation does not depend on memory, screenshots or one
          developer&apos;s inbox. The registered product map is eight repos; Quietforge (this site)
          and the INSPIRE Design Agent engine sit as sibling surfaces outside that registry today
          (GAP-V05) — governance honesty, not a missing product.
        </p>
        <div className="mb-8 grid gap-[var(--qf-sp-4)] md:grid-cols-3">
          {VCMS_WHY.map((item) => (
            <Card key={item.title} className="p-5">
              <h3 className="mb-2 font-bold text-[var(--qf-text)]">{item.title}</h3>
              <p className="max-w-none text-sm text-[var(--qf-text-dim)]">{item.detail}</p>
            </Card>
          ))}
        </div>
        <ul className="mb-8 flex flex-wrap gap-2">
          {Object.values(vcmsFeatureStatus).map((f) => (
            <li
              key={f.label}
              className="rounded-full border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-[var(--qf-text-dim)]"
            >
              {f.label}{' '}
              <span
                className={
                  f.status === 'PROVEN'
                    ? 'text-emerald-500'
                    : f.status === 'DEMO'
                      ? 'text-amber-500'
                      : 'text-[var(--qf-text-faint)]'
                }
              >
                {f.status}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href={`${ROUTES.home}#built-vs-planned`}
          className="text-sm text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
        >
          See governance proof on the homepage →
        </Link>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          Maps to case studies
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--qf-border)]">
                <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  Case study
                </th>
                <th className="py-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  Ecosystem layer
                </th>
              </tr>
            </thead>
            <tbody>
              {CASE_MAP.map((row) => (
                <tr key={row.case} className="border-b border-[var(--qf-border)]">
                  <td className="py-3 pr-4 font-semibold text-[var(--qf-text)]">{row.case}</td>
                  <td className="py-3 text-[var(--qf-text-dim)]">{row.maps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-8 flex flex-wrap gap-4 text-sm">
          {CASE_STUDIES.map((c) => (
            <li key={c.slug}>
              <Link href={c.detailHref} className="text-[var(--qf-accent)] hover:text-[var(--qf-text)]">
                Case {c.number} →
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface" padding="large">
        <Card className="p-6 md:p-8">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
            Honest framing
          </p>
          <p className="max-w-none text-[var(--qf-text-dim)]">
            No fabricated MRR or uptime percentages. Module status varies by repo — this map shows
            architecture and process proof, not a promise that every node is flawless. VCMS target:
            conflicts: 0 on every scan.
          </p>
        </Card>
      </Section>

      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          Want this level of structure?
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          You rarely need the full stack on day one. Start with a paid Hours Engine Scan — we measure
          which leaks matter for your business first.
        </p>
        <Button href={ROUTES.bookDiscovery} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
      </Section>
    </>
  );
}
