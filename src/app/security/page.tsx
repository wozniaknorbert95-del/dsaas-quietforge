import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import FaqItem from '@/components/ui/FaqItem';
import { ARTEFACTS, ROUTES, WHATSAPP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Security in documents, not adjectives',
  description:
    'Human review, secret scans, server-side auth, dependency scans, approval gates, client-owned repo. Each gate with evidence you can check.',
  openGraph: {
    title: 'Security in documents, not adjectives | Quietforge',
    description:
      'Ten gates, each with evidence: human review, secret scans, approval gates, your repo from day one.',
    images: [
      {
        url: '/og/trust.svg',
        width: 1200,
        height: 630,
        alt: 'Quietforge — security in documents, not adjectives',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security in documents, not adjectives | Quietforge',
    description:
      'Ten gates, each with evidence: human review, secret scans, approval gates, your repo from day one.',
    images: ['/og/trust.svg'],
  },
};

const GATES = [
  {
    id: 'secrets',
    title: 'Secrets stay out of client code',
    what: 'API keys, tokens and passwords are scanned on every release and never shipped in browser bundles.',
    evidence: 'Gitleaks before deploy.',
  },
  {
    id: 'database',
    title: 'Data access is server-side',
    what: 'The browser never talks to your database directly. Every read and write goes through a server check.',
    evidence: 'No public keys in the browser.',
  },
  {
    id: 'authorization',
    title: 'Auth on the server',
    what: 'Who can see and change what is decided on the server — not hidden in the frontend.',
    evidence: 'You approve who can do what.',
  },
  {
    id: 'dependencies',
    title: 'Dependencies are scanned',
    what: 'Known vulnerabilities in what we ship are checked before a change is released.',
    evidence: 'CVE check before each change.',
  },
  {
    id: 'review',
    title: 'Human code review',
    what: 'An independent programmer reads the diff before anything reaches your production.',
    evidence: 'Independent programmer on every build.',
  },
  {
    id: 'approval-gates',
    title: 'Approval gates',
    what: 'The system proposes. Nothing customer-facing goes live without your click.',
    evidence: 'The system proposes. You click.',
  },
  {
    id: 'logging',
    title: 'Logging',
    what: 'Consequential actions write a trail — who did what, and when.',
    evidence: 'Actions leave a trail.',
  },
  {
    id: 'gdpr',
    title: 'GDPR',
    what: 'Intake data stays in the EU. A data processing agreement is available on request.',
    evidence: 'DPA on request · EU hosting for intake.',
  },
  {
    id: 'backup',
    title: 'Backup and rollback',
    what: 'Before a release there is a snapshot. A change that fails can be reversed.',
    evidence: 'A change that fails can be reversed.',
  },
  {
    id: 'handover',
    title: 'Your repo, day one',
    what: 'Code, documentation and access live in your account from the first commit.',
    evidence: 'Replaceable by design.',
  },
];

const ARTEFACTS_LIST = [
  {
    title: 'Data safety playbook',
    desc: 'What happens to your data: export, clean exit, deletion.',
    href: ARTEFACTS.dataSafetyPlaybook,
    cta: 'Download (PDF)',
  },
  {
    title: 'Handover policy',
    desc: 'What you receive at the end: docs, repo, access, optional care.',
    href: ARTEFACTS.maintenanceHandover,
    cta: 'Download (PDF)',
  },
  {
    title: 'Scan sample',
    desc: 'See what a report looks like before you book the real thing.',
    href: ARTEFACTS.automationMapSample,
    cta: 'Open sample (PDF)',
  },
];

const FAQ = [
  {
    q: 'Is this a penetration test?',
    a: 'No. It is a working checklist with evidence. If you need a certified pentest, we will say so and point you to one.',
  },
  {
    q: 'Where does my data live?',
    a: 'Intake form data is processed on EU hosting. Analytics are anonymous and consent-based. The full policy is on Legal & Privacy.',
  },
  {
    q: 'Who approves what goes live?',
    a: 'You. Nothing customer-facing sends or publishes without your click. The gate is architecture, not a setting you can forget.',
  },
  {
    q: 'What happens if I leave?',
    a: 'Export, clean exit, deletion. The repo is already yours; the data safety playbook documents the exit path.',
  },
  {
    q: 'Do you hold certifications?',
    a: 'We do not claim certifications we do not hold. The gate list on this page is the claim — and each gate has evidence.',
  },
];

export default function SecurityPage() {
  return (
    <>
      <Section>
        <p className="qf-sys-crumb">
          <Link href={ROUTES.home}>Home</Link>
          {' / '}
          Security
        </p>
        <p className="qf-sys-status">
          <span className="qf-sys-badge">How we work</span>
          <span className="qf-sys-intents">trust · gates · your data</span>
        </p>
        <h1 className="qf-sys-h1">Security in documents, not adjectives.</h1>
        <p className="qf-sys-tagline">
          Objections are answered with a gate list. If a gate is missing, we do not claim
          it.
        </p>
        <p className="qf-sys-meta">
          human review · secret scans · approval gates · your repo, day one
        </p>
        <div className="qf-sys-cta-row">
          <Link href={ROUTES.bookAScan} className="qf-btn-fill">
            Book a scan →
          </Link>
          <a
            href={WHATSAPP.url}
            className="qf-btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {WHATSAPP.label}
          </a>
        </div>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">Ten gates. Each one has evidence.</h2>
        <p className="qf-sys-lead">
          Every claim on this page is a process you can check — not an adjective you have
          to take on faith. If we cannot point to the mechanism, the gate is not listed.
        </p>
        <ul className="qf-gate-grid">
          {GATES.map((gate, index) => (
            <li key={gate.id} id={gate.id} className="qf-gate-card">
              <span className="qf-gate-n">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="qf-gate-title">{gate.title}</h3>
              <p className="qf-gate-what">{gate.what}</p>
              <p className="qf-gate-evidence">
                <b>Evidence</b> — {gate.evidence}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">Your data is yours</h2>
        <p className="qf-sys-lead">
          The boundaries are written down before you start — not discovered after a
          problem. Three documents cover the lifecycle.
        </p>
        <ul className="qf-artefact-grid">
          {ARTEFACTS_LIST.map((artefact) => (
            <li key={artefact.title} className="qf-artefact-card">
              <h3 className="qf-artefact-title">{artefact.title}</h3>
              <p className="qf-artefact-desc">{artefact.desc}</p>
              <a
                href={artefact.href}
                className="qf-artefact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {artefact.cta} ↓
              </a>
            </li>
          ))}
        </ul>
        <p className="qf-sys-lead">
          <Link href={ROUTES.legal} className="qf-sys-link">
            Legal &amp; Privacy
          </Link>{' '}
          — company data, privacy policy and the data processing agreement in one place.
        </p>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">Good to know</h2>
        <div className="qf-sys-faq">
          {FAQ.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      <section className="qf-final-cta" aria-labelledby="security-cta-title">
        <div className="qf-final-cta-inner">
          <h2 id="security-cta-title" className="qf-sys-h2">
            Start with the scan
          </h2>
          <p className="qf-final-cta-lead">
            90 minutes. Written report is yours. Then a fixed price — or a clear no.
          </p>
          <div className="qf-sys-cta-row">
            <Link href={ROUTES.bookAScan} className="qf-btn-fill">
              Book a scan →
            </Link>
            <a
              href={WHATSAPP.url}
              className="qf-btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              {WHATSAPP.label}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
