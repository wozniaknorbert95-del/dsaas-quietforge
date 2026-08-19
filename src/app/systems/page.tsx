import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import IntentSystems from '@/components/v2/IntentSystems';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Six systems that give time back',
  description:
    'Quote and order, inbox triage, lead scout, owner cockpit, publishing gate, build and release — managed systems for small businesses.',
};

export default function SystemsHubPage() {
  return (
    <Section padding="large">
      <h1 className="mb-4 text-[var(--qf-fs-3xl)] font-bold tracking-tight">
        Six systems that give time back.
      </h1>
      <p className="mb-10 max-w-2xl text-[var(--qf-text-dim)]">
        Filter by where the week leaks. Not sure which fits? The scan tells you.
      </p>
      <IntentSystems heading="Choose an intent" showRequirements />
      <p className="mt-10 text-[var(--qf-text-dim)]">
        Not sure which fits?{' '}
        <Link href={ROUTES.bookAScan} className="text-[var(--qf-accent)]">
          Book the scan
        </Link>
        .
      </p>
    </Section>
  );
}
