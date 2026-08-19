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
    <Section>
      <p className="qf-home-kicker">Systems</p>
      <h1 className="qf-sys-h1">Six systems that give time back.</h1>
      <p className="qf-sys-lead">
        Filter by where the week leaks. Not sure which fits? The scan tells you.
      </p>
      <IntentSystems heading="" showRequirements />
      <p className="qf-sys-lead">
        Not sure which fits?{' '}
        <Link href={ROUTES.bookAScan} className="qf-sys-link">
          Book a scan
        </Link>
        .
      </p>
    </Section>
  );
}
