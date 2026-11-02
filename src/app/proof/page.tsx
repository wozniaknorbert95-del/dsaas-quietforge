import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { ROUTES } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import {
  FLEXGRAFIK_COMPANY_CASE,
  FLEXGRAFIK_PROOF_FEATURED,
} from '@/content/flexgrafik-company-case';

export const metadata: Metadata = {
  title: 'Proof: hours and money saved, verified by clients',
  description:
    'QuietForge publishes hours and money saved only after a client verifies them. FlexGrafik is the owner-operated reference.',
};

export default function ProofPage() {
  return (
    <Section padding="large">
      <h1 className="mb-4 text-[var(--qf-fs-3xl)] font-bold tracking-tight">
        Proof we publish only when it is verified.
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--qf-text-dim)]">
        Client hours and money saved appear here only after the client verifies them. No
        invented numbers. Methodology is public.{' '}
        <Link href={ROUTES.proofMethodology} className="text-[var(--qf-accent)]">
          How we measure
        </Link>
        .
      </p>

      <article className="qf-fg-featured">
        <p className="qf-fg-chip">{FLEXGRAFIK_COMPANY_CASE.honestyChip}</p>
        <p className="qf-lab-eyebrow">{FLEXGRAFIK_PROOF_FEATURED.eyebrow}</p>
        <h2 className="qf-fg-featured-title">{FLEXGRAFIK_PROOF_FEATURED.title}</h2>
        <p className="qf-fg-featured-body">{FLEXGRAFIK_PROOF_FEATURED.body}</p>
        <Link href={FLEXGRAFIK_PROOF_FEATURED.href} className="qf-btn-fill">
          {FLEXGRAFIK_PROOF_FEATURED.cta} →
        </Link>
      </article>

      <p className="mt-8 text-[var(--qf-text-dim)]">
        See the build laboratory:{' '}
        <Link href={ROUTES.lab} className="text-[var(--qf-accent)]">
          Builder&apos;s Lab
        </Link>
        .
      </p>
      <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-8 inline-flex">
        {CTAS.bookAutomationMap} →
      </Link>
    </Section>
  );
}
