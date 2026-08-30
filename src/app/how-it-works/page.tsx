import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import FaqItem from '@/components/ui/FaqItem';
import GratkaDiagram from '@/components/ui/GratkaDiagram';
import Link from 'next/link';
import { ROUTES, PRICING, SITE_URL } from '@/lib/constants';
import { PRICING_MATRIX } from '@/content/pricing';
import { CTAS } from '@/content/conversion-copy';
import { GRATKA } from '@/lib/gratka';

/* ── metadata ── */
export const metadata: Metadata = {
  title: 'How it works — three clear steps',
  description:
    'A calm, transparent process: a paid Automation Map, a productized build with human approval gates, and optional monthly care. Typical scoped builds aim for weeks, not open-ended IT projects. Book an Automation Map.',
  openGraph: {
    title: 'How it works — three clear steps',
    description:
      'A calm, transparent process: a paid Automation Map, a productized build with human approval gates, and optional monthly care.',
    url: `${SITE_URL}/how-it-works`,
    images: [
      {
        url: '/og/how-it-works.svg',
        width: 1200,
        height: 630,
        alt: 'How it works — three clear steps',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How it works — three clear steps',
    description: 'A calm, transparent process with human approval gates at every step.',
    images: ['/og/how-it-works.svg'],
  },
};

/* ── data ── */
const FAQS = [
  {
    question: 'Do I need any technical knowledge?',
    answer: 'No. You bring the business; I bring the system.',
  },
  {
    question: 'What do you need from me?',
    answer: 'A short conversation, access to the relevant tools, and your approval at key points.',
  },
  {
    question: 'What if I only want Step 1?',
    answer: "That's fine — the Automation Map stands on its own, and it's yours to keep.",
  },
];

const TIMELINE = [
  { day: 'Day 0', label: 'Automation Map', note: 'paid, credited' },
  { day: 'Day 1–3', label: 'Scope locked', note: 'fixed quote' },
  { day: 'Day 3–14', label: 'Build, test, refine', note: '' },
  { day: 'Go-live', label: 'Handover + training', note: '' },
  { day: 'Ongoing', label: 'Managed Automation', note: 'optional' },
];

/* ── page ── */
export default function HowItWorksPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════
          § A — HERO
         ═══════════════════════════════════════════════════════════ */}
      <Section padding="large">
        <h1 className="text-[var(--qf-fs-3xl)] font-bold tracking-tight leading-[var(--qf-lh-tight)] mb-6 max-w-3xl">
          Three clear steps. No surprises.
        </h1>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          From first conversation to a supervised system you can operate — transparent timelines,
          human approval gates, and you in control the whole way.
        </p>
        <Button href={ROUTES.bookDiscovery} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
      </Section>

      <Section background="surface" padding="large">
        <Eyebrow>Architecture</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          The system behind the method
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          Every build runs inside the same Living Operating System I operate daily — governance-first,
          human approval gates, eight repos supervised as one stack.
        </p>
        <div className="overflow-x-auto rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)] p-4">
          <GratkaDiagram
            src={GRATKA.losArchitectureSvg}
            alt="Living Operating System — six layers and eight supervised modules"
            width={1200}
            height={720}
            className="h-auto w-full min-w-[320px]"
          />
        </div>
        <p className="qf-hint mt-4 text-sm">
          <Link href={ROUTES.founderSystemDiagram} className="text-[var(--qf-accent)] hover:text-[var(--qf-text)]">
            See interactive Technical map
          </Link>
          {' · '}
          <Link
            href={`${ROUTES.resultsOwnerEcosystem}#los`}
            className="text-[var(--qf-accent)] hover:text-[var(--qf-text)]"
          >
            Owner ecosystem proof
          </Link>
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          § B — STEP 1
         ═══════════════════════════════════════════════════════════ */}
      <Section background="surface" padding="large">
        <Eyebrow>Step 1</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">
          We find what&apos;s actually costing you — the Automation Map.
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-6">
          A focused 60–90 minute working session and a written roadmap. We map your processes —
          sales, enquiries, email, orders — and pinpoint your two or three biggest time-and-money
          leaks, each with a clear ROI.
        </p>
        <ul className="space-y-2 max-w-2xl mb-6">
          {[
            'A written Automation Map you keep.',
            'A recommended first step, with the numbers behind it.',
            `€${PRICING.discovery} — credited toward your project.`,
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[var(--qf-text-dim)]">
              <span className="text-[var(--qf-ok)] mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm text-[var(--qf-text-faint)] italic max-w-2xl">
          Why paid? Because it&apos;s real strategic work — and it means we both start serious.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          § C — STEP 2
         ═══════════════════════════════════════════════════════════ */}
      <Section padding="large">
        <Eyebrow>Step 2</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">
          We build it — fast, because it&apos;s already proven.
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-6">
          Your system is adapted from modules we already built and run for ourselves, not coded from zero.
          Scoped productized builds typically land in days to a few weeks — not open-ended IT projects.
          We configure it to your data, your voice and your tools, test it, and hand it over working.
        </p>
        <ul className="space-y-2 max-w-2xl">
          {[
            'Productized, not experimental.',
            'Fixed price, set after the Map — never billed by the hour.',
            'Built and tested before it touches your customers.',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[var(--qf-text-dim)]">
              <span className="text-[var(--qf-ok)] mt-0.5 shrink-0">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          § D — STEP 3
         ═══════════════════════════════════════════════════════════ */}
      <Section background="surface" padding="large">
        <Eyebrow>Step 3</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">
          We keep it sharp — for as long as it&apos;s useful.
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)] mb-8">
          Software isn&apos;t &quot;set and forget&quot;. With optional Managed Automation, your system stays
          monitored, tuned and improving as your business changes —{' '}
          <span className="text-[var(--qf-text)]">
            {PRICING_MATRIX.managedAutomation.range}, cancel anytime.
          </span>
        </p>
        <Button href={ROUTES.managedAutomation} variant="secondary" withArrow>
          See Managed Automation
        </Button>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          § E — CONTROL BLOCK (HITL)
         ═══════════════════════════════════════════════════════════ */}
      <Section padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">
          You&apos;re in control at every step
        </h2>
        <p className="text-[var(--qf-text-dim)] text-[var(--qf-fs-lg)] max-w-[var(--qf-maxw-narrow)]">
          Human-in-the-loop is built into everything I deliver: nothing sends, publishes or deploys
          without your approval. You always see what&apos;s happening, and why.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          § F — TIMELINE
         ═══════════════════════════════════════════════════════════ */}
      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          What the timeline really looks like
        </h2>
        <div className="flex flex-col gap-4 max-w-3xl">
          {TIMELINE.map((item, i) => (
            <div key={item.day} className="flex items-start gap-4">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-3 h-3 rounded-full bg-[var(--qf-accent)]" />
                {i < TIMELINE.length - 1 && (
                  <div className="w-px h-full bg-[var(--qf-border)] my-1" />
                )}
              </div>
              <div className="pb-6">
                <span className="text-[var(--qf-fs-xs)] uppercase tracking-[0.1em] text-[var(--qf-accent)] font-semibold">
                  {item.day}
                </span>
                <div className="text-[var(--qf-text)] font-semibold mt-0.5">{item.label}</div>
                {item.note && <div className="text-sm text-[var(--qf-text-faint)]">{item.note}</div>}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[var(--qf-text-faint)] text-sm italic max-w-2xl mt-2">
          Many scoped engagements aim for go-live within about two weeks after the Map — timeline
          depends on access, approvals and scope. No six-month black-box projects, no IT department required.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          § F2 — AFTER DELIVERY
         ═══════════════════════════════════════════════════════════ */}
      <Section background="surface" padding="large">
        <Eyebrow>After delivery</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-6">
          What happens next
        </h2>
        <ul className="max-w-2xl space-y-3 text-[var(--qf-text-dim)]">
          <li className="flex gap-3">
            <span className="text-[var(--qf-ok)]">✓</span>
            Ongoing optimization as your business changes — not a one-off handoff and goodbye.
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--qf-ok)]">✓</span>
            Managed Automation tier for monitoring, fixes, and small improvements monthly.
          </li>
          <li className="flex gap-3">
            <span className="text-[var(--qf-ok)]">✓</span>
            Quarterly review of metrics and funnel performance when you want a structured check-in.
          </li>
        </ul>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          § G — FAQ
         ═══════════════════════════════════════════════════════════ */}
      <Section padding="large">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-8">
          Questions, answered.
        </h2>
        <div className="space-y-4 max-w-3xl">
          {FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════
          § H — FINAL CTA
         ═══════════════════════════════════════════════════════════ */}
      <Section background="surface" padding="large">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight mb-4">
          Start with clarity — Step 1 is the Automation Map.
        </h2>
        <Button href={ROUTES.bookDiscovery} withArrow size="lg">
          {CTAS.bookAutomationMap}
        </Button>
      </Section>
    </>
  );
}
