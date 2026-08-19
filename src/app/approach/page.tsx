import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'From scan to system in three weeks',
  description:
    'Scan, scope, build, you approve, handover. QuietForge approach for small-business operating systems.',
};

const STEPS = [
  {
    title: 'Scan',
    body: '90 minutes. We map leaks in quotes, orders, inbox and reporting. You keep the written report.',
    you: 'Where you are needed: 60 minutes of honest numbers.',
  },
  {
    title: 'Scope',
    body: 'One system, fixed price, two to four weeks. If it is not worth automating, we stop.',
    you: 'You choose the first leak to close.',
  },
  {
    title: 'Build',
    body: 'AI speed with engineering discipline: review, scans, documentation.',
    you: 'Short check-ins. No surprise live deploys.',
  },
  {
    title: 'You approve',
    body: 'Nothing customer-facing goes live without your click.',
    you: 'You are the gate.',
  },
  {
    title: 'Handover',
    body: 'Repo in your account, docs, optional maintenance.',
    you: 'You own the system.',
  },
];

export default function ApproachPage() {
  return (
    <Section padding="large">
      <h1 className="mb-4 text-[var(--qf-fs-3xl)] font-bold tracking-tight">
        From scan to system in three weeks.
      </h1>
      <ol className="space-y-8">
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <p className="font-mono text-[var(--qf-accent)]">
              {index + 1}. {step.title}
            </p>
            <p className="mt-2 text-[var(--qf-text-dim)]">{step.body}</p>
            <p className="mt-1 text-sm text-[var(--qf-text-faint)]">{step.you}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 max-w-2xl text-[var(--qf-text-dim)]">
        What if it is not worth it? The report can say “don’t automate”. That is a valid
        outcome.
      </p>
      <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-8 inline-flex">
        Book a scan →
      </Link>
    </Section>
  );
}
