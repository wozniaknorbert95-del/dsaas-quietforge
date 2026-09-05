import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProofScreenImage from '@/components/ui/ProofScreenImage';
import ProofScreenSlot from '@/components/ui/ProofScreenSlot';
import { ROUTES, SITE_URL } from '@/lib/constants';
import { GRATKA } from '@/lib/gratka';
import { getCaseStudyBySlug } from '@/lib/case-studies';
import CaseStudyLayout from '@/components/casestudy/CaseStudyLayout';
import {
  agentOsAfterItems,
  agentOsArchitectureAlt,
  agentOsBeforeItems,
  agentOsCaseMeta,
  agentOsDeliveryPhases,
  agentOsEcosystemIntro,
  agentOsEcosystemModules,
  agentOsModuleStatusClass,
  agentOsOwnerEcosystemBridge,
  agentOsPipelineNodes,
  agentOsStack,
  agentOsSupervisionNote,
  agentOsWorkflowMapIntro,
  AGENT_OS_SLUG,
} from '@/content/agent-os-case-study';
import {
  agentOsFeatureStatus,
  agentOsNarrative,
  agentOsVerifiedMetrics,
  screens,
  type AgentOsClaimLabel,
} from '@/content/proof';

function agentOsStatusClass(status: AgentOsClaimLabel): string {
  if (status === 'LIVE') return 'text-emerald-500';
  if (status === 'LOCAL-ONLY') return 'text-amber-500';
  return 'text-[var(--qf-text-faint)]';
}

export const metadata: Metadata = {
  title: agentOsCaseMeta.title,
  description: agentOsCaseMeta.description,
  openGraph: {
    title: agentOsCaseMeta.openGraphTitle,
    description: agentOsCaseMeta.openGraphDescription,
    url: `${SITE_URL}/results/agent-orchestrator`,
    images: [
      {
        url: '/og/results-agent-orchestrator.svg',
        width: 1200,
        height: 630,
        alt: agentOsCaseMeta.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: agentOsCaseMeta.openGraphTitle,
    description: agentOsCaseMeta.twitterDescription,
    images: ['/og/results-agent-orchestrator.svg'],
  },
};

export default function AgentOrchestratorCaseStudyPage() {
  const study = getCaseStudyBySlug(AGENT_OS_SLUG);

  if (!study) {
    return null;
  }

  const downloadButtons = (
    <>
      <Button href={GRATKA.orchestratorArchitectureSvg} target="_blank" rel="noopener noreferrer" variant="secondary">
        Architecture diagram (SVG) ↓
      </Button>
      <Button href={GRATKA.orchestratorAgentCardPdf} target="_blank" rel="noopener noreferrer" variant="secondary">
        Agent card sample (PDF) ↓
      </Button>
      <Button href={GRATKA.orchestratorWorkflowMapPdf} target="_blank" rel="noopener noreferrer" variant="secondary">
        Workflow map (PDF) ↓
      </Button>
      <Button href={agentOsOwnerEcosystemBridge.href} variant="ghost">
        {agentOsOwnerEcosystemBridge.cta}
      </Button>
    </>
  );

  return (
    <CaseStudyLayout
      study={study}
      problemBefore={[...agentOsBeforeItems]}
      problemAfter={[...agentOsAfterItems]}
      architectureDiagramSvgUrl={GRATKA.orchestratorArchitectureSvg}
      architectureDiagramAlt={agentOsArchitectureAlt}
      architectureDescription={
        <>
          <p className="mb-4">{study.system}</p>
          <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)] italic">
            {agentOsNarrative.framing}
          </p>
          <h3 className="mb-4 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
            Three named layers
          </h3>
          <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
            {agentOsEcosystemIntro}
          </p>
          <div className="mb-8 grid gap-[var(--qf-sp-4)] md:grid-cols-3">
            {agentOsEcosystemModules.map((mod) => (
              <Card key={mod.id} className="p-5">
                <p className={`mb-1 font-mono text-[10px] uppercase tracking-wider ${agentOsModuleStatusClass(mod.status)}`}>
                  {mod.status}
                </p>
                <p className="mb-1 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  {mod.layer}
                </p>
                <h4 className="mb-2 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
                  {mod.name}
                </h4>
                <p className="mb-4 max-w-none text-sm text-[var(--qf-text-dim)]">{mod.detail}</p>
                {mod.id !== 'agent-os' ? (
                  <Link href={mod.href} className="text-sm text-[var(--qf-accent)] hover:text-[var(--qf-text)]">
                    {mod.linkLabel}
                  </Link>
                ) : (
                  <span className="text-sm text-[var(--qf-text-faint)]">{mod.linkLabel}</span>
                )}
              </Card>
            ))}
          </div>
          <Card className="qf-panel--spearhead mb-8 p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
              {agentOsOwnerEcosystemBridge.eyebrow}
            </p>
            <p className="mb-3 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
              {agentOsOwnerEcosystemBridge.title}
            </p>
            <p className="mb-4 max-w-[var(--qf-maxw-narrow)] text-sm text-[var(--qf-text-dim)]">
              {agentOsOwnerEcosystemBridge.lead}
            </p>
            <Button href={agentOsOwnerEcosystemBridge.href} variant="primary">
              {agentOsOwnerEcosystemBridge.cta}
            </Button>
          </Card>
          <h3 className="mb-4 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
            Agent OS — LangGraph pipeline
          </h3>
          <div className="mb-4 grid gap-[var(--qf-sp-4)] md:grid-cols-2 lg:grid-cols-3">
            {agentOsPipelineNodes.map((node) => (
              <Card key={node.role} className="p-5">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
                  {node.role}
                </p>
                <p className="max-w-none text-sm text-[var(--qf-text-dim)]">{node.detail}</p>
              </Card>
            ))}
          </div>
          <p className="max-w-[var(--qf-maxw-narrow)] text-sm text-[var(--qf-text-dim)]">
            {agentOsSupervisionNote}
          </p>
        </>
      }
      buildModules={[...agentOsDeliveryPhases]}
      buildDescription={
        <p>
          Five delivery phases — same as{' '}
          <Link href="/#why-it-works" className="text-[var(--qf-accent)]">
            How I work
          </Link>{' '}
          on the home page. Client-facing workflow, separate from the LangGraph pipeline above.
        </p>
      }
      stack={[...agentOsStack]}
      manifestKey="agentOs"
      videoKey="agentOs"
      screenKey="agentCards"
      downloadButtons={downloadButtons}
    >
      {screens.workflowMap.ready && screens.workflowMap.src && (
        <>
          <h2 className="mt-8 text-[var(--qf-fs-xl)] font-bold tracking-tight mb-4">
            Pipeline map
          </h2>
          <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
            {agentOsWorkflowMapIntro}
          </p>
          <Card className="mb-10 max-w-3xl overflow-hidden p-0">
            <div className="aspect-[16/10] w-full overflow-hidden bg-[var(--qf-bg-inset)]">
              <ProofScreenImage
                src={screens.workflowMap.src}
                alt={screens.workflowMap.alt}
                width={960}
                height={600}
              />
            </div>
            <p className="p-4 font-mono text-xs text-[var(--qf-accent)]">
              {screens.workflowMap.caption}
            </p>
          </Card>
        </>
      )}
      <h2 className="mt-8 text-[var(--qf-fs-xl)] font-bold tracking-tight mb-4">
        What is LIVE today
      </h2>
      <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
        Guided implementation demo — not a public SaaS. Hybrid control plane on VPS; code execution stays on a
        supervised local runner.
      </p>
      <ul className="mb-6 flex flex-wrap gap-2">
        {Object.values(agentOsFeatureStatus).map((f) => (
          <li
            key={f.label}
            className="rounded-full border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-[var(--qf-text-dim)]"
          >
            {f.label}{' '}
            <span className={agentOsStatusClass(f.status)}>{f.status}</span>
          </li>
        ))}
      </ul>
      <div className="mb-10 flex flex-wrap gap-3">
        {agentOsVerifiedMetrics.map((m) => (
          <span
            key={m.label}
            className="rounded-full border border-[var(--qf-border)] bg-[var(--qf-bg)] px-4 py-1.5 font-mono text-sm text-[var(--qf-text-dim)]"
          >
            {m.label}: <span className="text-[var(--qf-text)]">{m.value}</span>
          </span>
        ))}
      </div>
      <h2 className="mt-8 text-[var(--qf-fs-xl)] font-bold tracking-tight mb-4">
        Mission Control
      </h2>
      <p className="mb-6 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
        Tasks, queue, history and cost tabs — observability layer for Agent OS. Login required for
        live UI; screenshot from prod smoke.
      </p>
      <div className="mb-6 max-w-3xl">
        <ProofScreenSlot screen={screens.adminDashboard} screenKey="adminDashboard" />
      </div>
      <div className="mb-10 text-sm text-[var(--qf-text-faint)]">
        Mission Control is an access-gated private reference. A sanitized walkthrough is available
        on request; internal hosts and health endpoints are not public proof.
        <span className="ml-2 text-[var(--qf-accent)]">Private reference</span>{' '}
        <Link href={ROUTES.trust} className="text-[var(--qf-accent)] hover:text-[var(--qf-text)]">
          Trust & observability page →
        </Link>
      </div>
      <h2 className="mt-8 text-[var(--qf-fs-xl)] font-bold tracking-tight mb-4">
        Agent cards — sample contracts
      </h2>
      <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
        Each execution agent has a fixed role. No mega-agent, no scope creep — least privilege by
        design.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--qf-border)]">
              <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">Agent</th>
              <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">Scope</th>
              <th className="py-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">Output</th>
            </tr>
          </thead>
          <tbody>
            {agentOsPipelineNodes.map((row) => (
              <tr key={row.role} className="border-b border-[var(--qf-border)]">
                <td className="py-3 pr-4 font-semibold text-[var(--qf-text)]">{row.role}</td>
                <td className="py-3 pr-4 text-[var(--qf-text-dim)]">{row.scope}</td>
                <td className="py-3 text-[var(--qf-text-dim)]">{row.output}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CaseStudyLayout>
  );
}
