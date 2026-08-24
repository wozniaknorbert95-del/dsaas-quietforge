import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants';
import { hoursCounter, hoursValueEuro } from '@/content/hours-counter';
import { REFERENCE_PROGRAM } from '@/content/conversion-copy';

export const metadata: Metadata = {
  title: 'Proof: hours and money saved, counted publicly',
  description:
    'The QuietForge hours counter starts at zero. Numbers move only after a client verifies them.',
};

export default function ProofPage() {
  return (
    <Section padding="large">
      <h1 className="mb-4 text-[var(--qf-fs-3xl)] font-bold tracking-tight">
        We count publicly what we give back.
      </h1>
      <p className="text-[var(--qf-fs-2xl)] font-bold">
        {hoursCounter.hoursConfirmed} hours · €{hoursValueEuro}
      </p>
      <p className="mt-4 max-w-2xl text-[var(--qf-text-dim)]">
        Not a missing widget — an honest start. Methodology is public.{' '}
        <Link href={ROUTES.proofMethodology} className="text-[var(--qf-accent)]">
          How we measure
        </Link>
        .
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {['01', '02', '03'].map((slot) => (
          <li key={slot}>
            <Card>
              <p className="font-mono text-[var(--qf-fs-xs)] text-[var(--qf-accent)]">
                OPEN — BECOME A CASE
              </p>
              <h2 className="mt-2 font-semibold">Case {slot}</h2>
              <p className="mt-2 text-sm text-[var(--qf-text-dim)]">
                Named hours after the client verifies. Until then, empty on purpose.
              </p>
            </Card>
          </li>
        ))}
      </ul>

      <div id="reference" className="mt-14 border-t border-[var(--qf-border)] pt-10">
        <h2 className="text-[var(--qf-fs-2xl)] font-bold tracking-tight">
          {REFERENCE_PROGRAM.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--qf-text-dim)]">{REFERENCE_PROGRAM.lead}</p>
        <p className="mt-6 mb-3 font-mono text-[var(--qf-fs-xs)] uppercase tracking-[0.18em] text-[var(--qf-accent)]">
          In exchange, you agree to
        </p>
        <ul className="max-w-xl space-y-2 text-[var(--qf-text-dim)]">
          {REFERENCE_PROGRAM.terms.map((term) => (
            <li key={term.slice(0, 24)}>— {term}</li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-[var(--qf-text-faint)]">
          {REFERENCE_PROGRAM.closing}
        </p>
        <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-8 inline-flex">
          Apply for a reference spot →
        </Link>
      </div>

      <p className="mt-8 text-[var(--qf-text-dim)]">
        The lab where this started:{' '}
        <Link href={ROUTES.aboutLab} className="text-[var(--qf-accent)]">
          FlexGrafik, paused
        </Link>
        .
      </p>
      <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-8 inline-flex">
        Book a scan →
      </Link>
    </Section>
  );
}
