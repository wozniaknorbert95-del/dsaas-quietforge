import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants';

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
      <p className="text-[var(--qf-fs-2xl)] font-bold">0 hours · €0</p>
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
