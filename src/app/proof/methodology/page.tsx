import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'How we measure hours given back',
  description:
    'Baseline from real schedules, monthly hours × €40/h, publish only when the client verifies.',
};

export default function ProofMethodologyPage() {
  return (
    <Section padding="large">
      <h1 className="mb-4 text-[var(--qf-fs-3xl)] font-bold tracking-tight">
        How we measure
      </h1>
      <ol className="max-w-2xl space-y-4 text-[var(--qf-text-dim)]">
        <li>
          <strong className="text-[var(--qf-text)]">Baseline.</strong> Hours from real
          schedules before the system, not from a feeling.
        </li>
        <li>
          <strong className="text-[var(--qf-text)]">Monthly measure.</strong> Hours given
          back × €40/h unless the scan agrees a different rate.
        </li>
        <li>
          <strong className="text-[var(--qf-text)]">Publish.</strong> The public counter
          and the case move only when the client verifies.
        </li>
      </ol>
      <h2 className="mt-10 mb-3 text-xl font-semibold">Edge cases</h2>
      <ul className="max-w-2xl space-y-2 text-[var(--qf-text-dim)]">
        <li>Client did not confirm → we do not count.</li>
        <li>Scope changed → recount from zero for that client.</li>
        <li>Dispute → the number is held with a note.</li>
      </ul>
      <p className="mt-6 text-sm text-[var(--qf-text-faint)]">
        Rounding: hours to tens, euro to hundreds — when a number exists. Today: 0.
      </p>
      <Link href={ROUTES.proof} className="mt-8 inline-block text-[var(--qf-accent)]">
        Back to proof →
      </Link>
    </Section>
  );
}
