import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { ARTEFACTS, ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Security in documents, not adjectives',
  description:
    'Human review, secret scans, server-side auth, dependency scans, approval gates, client-owned repo.',
};

const MEASURES = [
  { id: 'secrets', title: 'Secrets stay out of client code', evidence: 'Gitleaks before deploy.' },
  { id: 'database', title: 'Data access is server-side', evidence: 'No public keys in the browser.' },
  { id: 'authorization', title: 'Auth on the server', evidence: 'You approve who can do what.' },
  { id: 'dependencies', title: 'Dependencies are scanned', evidence: 'CVE check before each change.' },
  { id: 'review', title: 'Human code review', evidence: 'Independent programmer on every build.' },
  { id: 'approval-gates', title: 'Approval gates', evidence: 'The system proposes. You click.' },
  { id: 'logging', title: 'Logging', evidence: 'Actions leave a trail.' },
  { id: 'gdpr', title: 'GDPR', evidence: 'DPA on request. EU hosting for intake.' },
  { id: 'backup', title: 'Backup and rollback', evidence: 'A change that fails can be reversed.' },
  { id: 'handover', title: 'Your repo, day one', evidence: 'Replaceable by design.' },
];

export default function SecurityPage() {
  return (
    <Section padding="large">
      <h1 className="mb-4 text-[var(--qf-fs-3xl)] font-bold tracking-tight">
        Security in documents, not adjectives.
      </h1>
      <p className="mb-10 max-w-2xl text-[var(--qf-text-dim)]">
        Objections are answered with a gate list. If a gate is missing, we do not claim it.
      </p>
      <ul className="space-y-6">
        {MEASURES.map((item) => (
          <li key={item.id} id={item.id}>
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-[var(--qf-text-dim)]">Evidence: {item.evidence}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[var(--qf-text-dim)]">
        Your data is yours: export, clean exit, deletion.{' '}
        <Link href={ARTEFACTS.dataSafetyPlaybook} className="text-[var(--qf-accent)]">
          Data safety playbook
        </Link>
        .
      </p>
      <Link href={ROUTES.bookAScan} className="qf-btn-fill mt-8 inline-flex">
        See you at the scan? →
      </Link>
    </Section>
  );
}
