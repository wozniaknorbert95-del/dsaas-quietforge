import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LivingSystemDiagram from '@/components/diagram/LivingSystemDiagram';
import { ROUTES } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';

export const metadata: Metadata = {
  title: "Founder's System — Built in Production",
  description:
    'I built Quietforge to run my own business — pipeline, wizard, inbox logic, AI routing and governance. Now I deploy that production-tested architecture for other small businesses.',
};

const PROOF_LINKS = [
  { label: 'See live results', href: ROUTES.results },
  { label: 'See owner ecosystem', href: ROUTES.resultsOwnerEcosystem },
  { label: 'See the Wizard Cash Engine', href: ROUTES.resultsSalesFunnel },
] as const;

export default function FounderPage() {
  const points = [
    {
      title: 'Built for real use, not pitch decks',
      body: "I didn't invent this to sell to you. I built it because I needed it to run my own business. It handles real invoices, real clients, and real leads every day.",
    },
    {
      title: 'Single source of truth',
      body: 'Off-the-shelf tools scatter your data across a dozen tabs. This architecture forces everything into one clean, manageable pipeline.',
    },
    {
      title: 'Scalable without head-count',
      body: "The goal of automation isn't to replace people; it's to decouple your revenue growth from your payroll size.",
    },
  ];

  return (
    <>
      <Section padding="large">
        <Eyebrow>Behind the systems</Eyebrow>
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-6 max-w-3xl">
          The Founder&apos;s System
        </h1>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-2xl mb-12">
          I didn&apos;t build Quietforge to sell websites. I built a system to run my own business — the
          pipeline, wizard, inbox logic, AI routing and governance layer — because scattered tools were
          costing too much time. Quietforge is how I deploy that same architecture for other small
          businesses.
        </p>

        <div className="mb-16 max-w-4xl rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-raised)] p-8">
          <h2 className="text-[var(--qf-fs-xl)] font-bold tracking-tight mb-4">
            How the system became the offer
          </h2>
          <p className="text-[var(--qf-text-dim)] mb-6">
            First, I built the workflow for FLEXGRAFIK: a live print and design business with real leads,
            real orders and real admin. Then I connected the pieces — wizard checkout, inbox
            classification, Jadzia COI, VCMS governance and Agent OS execution — into one supervised
            operating loop. Now I use that production-tested structure as the starting point for client
            systems.
          </p>
          <div className="flex flex-wrap gap-4">
            {PROOF_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[var(--qf-accent)] hover:underline"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section background="surface" padding="large" id="system-diagram" data-founder-section="system-diagram">
        <Eyebrow>System Diagram</Eyebrow>
        <h2 className="text-[var(--qf-fs-xl)] font-bold mb-4">
          Living Operating System — interactive map
        </h2>
        <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
          Six supervised steps from first visit to governed execution — click any step for honest
          LIVE proof. Switch to Technical map for the full architecture.
        </p>
        <LivingSystemDiagram variant="founder" defaultView="story" />
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={ROUTES.bookDiscovery}
            className="text-sm font-semibold text-[var(--qf-accent)] hover:underline"
          >
            {CTAS.bookAutomationMap} →
          </Link>
          <Link
            href={ROUTES.resultsOwnerEcosystem}
            className="text-sm text-[var(--qf-text-dim)] hover:text-[var(--qf-accent)] hover:underline"
          >
            Full owner ecosystem →
          </Link>
        </div>
      </Section>

      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          Why this architecture works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {points.map((point) => (
            <Card key={point.title} className="p-6">
              <h3 className="mb-2 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
                {point.title}
              </h3>
              <p className="text-sm text-[var(--qf-text-dim)]">{point.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section padding="large">
        <div className="max-w-2xl">
          <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
            Stop working for your tools.
          </h2>
          <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] mb-8">
            Let your tools work for you. Start with an Hours Engine Scan and we&apos;ll see if this architecture
            fits your business.
          </p>
          <Button href={ROUTES.bookDiscovery} withArrow size="xl">
            {CTAS.bookAutomationMap}
          </Button>
        </div>
      </Section>
    </>
  );
}
