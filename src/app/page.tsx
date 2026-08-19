import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import StickyCta from '@/components/layout/StickyCta';
import IntentSystems from '@/components/v2/IntentSystems';
import { PRICING, ROUTES, WHATSAPP } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';

export const metadata: Metadata = {
  title: 'Systems that give you back your time',
  description:
    'Operating systems for small businesses — quotes, orders, inbox and reports. AI speed, engineering discipline, nothing live without your approval.',
  openGraph: {
    title: 'Systems that give you back your time | Quietforge',
    description:
      'Quotes, orders, inbox, reporting — rebuilt as managed systems. You approve. We measure hours given back.',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Quietforge — systems that give you back your time',
      },
    ],
  },
};

const DISCIPLINE = [
  { title: 'Human code review', href: '/security/#review', evidence: 'External programmer on every build.' },
  { title: 'Secret scans', href: '/security/#secrets', evidence: 'Gitleaks before deploy.' },
  { title: 'Server-side auth', href: '/security/#authorization', evidence: 'No secrets in client code.' },
  { title: 'Dependency scans', href: '/security/#dependencies', evidence: 'CVE check before change.' },
  { title: 'Approval gates', href: '/security/#approval-gates', evidence: 'Agent proposes. You click.' },
  { title: 'Your repo, day one', href: '/security/#handover', evidence: 'Replaceable by design.' },
];

const STEPS = [
  'Scan — 90 minutes, written report is yours.',
  'Scope — one system, fixed price, two to four weeks.',
  'Build — AI speed, human review, scans.',
  'You approve — nothing live without it.',
  'Handover — docs, repo, optional maintenance.',
];

const FAQ = [
  {
    q: 'Is this a website project?',
    a: 'No. I implement a company operating system: quotes, orders, inbox, reports. A brochure site is a different job.',
  },
  {
    q: 'Do you use AI?',
    a: 'Yes, at build speed. Delivery is engineering: review, scans, approval gates, documentation.',
  },
  {
    q: 'Will automation run without me?',
    a: 'No. Nothing customer-facing goes live without your approval.',
  },
  {
    q: 'Where does the code live?',
    a: 'In your repository from day one. I am replaceable by design.',
  },
  {
    q: 'Why is the scan paid?',
    a: 'So both sides take it seriously. €690 is credited toward implementation. You keep the report either way.',
  },
  {
    q: 'Do you have client case studies yet?',
    a: 'The public hours counter starts at zero. Lab examples are labelled examples. Real cases publish only after the client verifies numbers.',
  },
  {
    q: 'Is FlexGrafik the proof?',
    a: 'FlexGrafik is a paused lab, not a market proof. QuietForge sells given-back time, not a catalogue of modules.',
  },
  {
    q: 'What if it is not worth automating?',
    a: 'The scan can conclude “don’t automate”. That is a successful scan.',
  },
];

export default function Home() {
  return (
    <div className="pb-20 lg:pb-0">
      <section data-home-section="hero" className="qf-hero">
        <div className="qf-hero-inner">
          <p className="qf-hero-eyebrow">Business operating systems for SMBs · EU</p>
          <h1 className="qf-hero-headline">Systems that give you back your time.</h1>
          <p className="qf-hero-subline">
            Quotes, orders, inbox and reporting — rebuilt as managed systems. AI speed,
            engineering discipline, nothing live without your approval.
          </p>
          <div className="qf-hero-cta-band">
            <Link href={ROUTES.bookAScan} className="qf-hero-cta-primary">
              <span className="qf-hero-cta-primary-label">
                Book a scan <span aria-hidden="true">→</span>
              </span>
              <span className="qf-hero-cta-primary-meta">
                {formatEuro(PRICING.discovery)} · 90 min · credited
              </span>
            </Link>
            <div className="qf-hero-cta-secondary-row">
              <Link href={ROUTES.systems} className="qf-hero-cta-secondary">
                See the systems
              </Link>
              <a
                href={WHATSAPP.url}
                className="qf-hero-cta-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section data-home-section="counter" background="surface">
        <p className="font-mono text-[var(--qf-fs-xs)] uppercase tracking-[0.18em] text-[var(--qf-accent)]">
          Given back to SMBs
        </p>
        <div className="qf-hours-counter mt-[var(--qf-sp-3)]">
          <p>
            <strong>0</strong> hours
          </p>
          <p>
            <strong>€0</strong>
          </p>
        </div>
        <p className="mt-[var(--qf-sp-4)] max-w-2xl text-[var(--qf-text-dim)]">
          Hours per week × €40/h, only after the client confirms. The counter starts at zero
          on purpose.{' '}
          <Link href={ROUTES.proofMethodology} className="text-[var(--qf-accent)]">
            How we measure
          </Link>
          .
        </p>
      </Section>

      <Section data-home-section="systems">
        <IntentSystems heading="Where does your time leak away?" />
      </Section>

      <Section data-home-section="approach">
        <h2 className="mb-[var(--qf-sp-4)] text-[var(--qf-fs-2xl)] font-bold">
          From scan to system in three weeks.
        </h2>
        <ol className="space-y-3 text-[var(--qf-text-dim)]">
          {STEPS.map((step, index) => (
            <li key={step}>
              <span className="font-mono text-[var(--qf-accent)]">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
        <Link href={ROUTES.approach} className="mt-6 inline-block text-[var(--qf-accent)]">
          Full approach →
        </Link>
      </Section>

      <Section data-home-section="compare" background="surface">
        <h2 className="mb-[var(--qf-sp-4)] text-[var(--qf-fs-2xl)] font-bold">
          Agency, freelancer, QuietForge
        </h2>
        <div className="overflow-x-auto">
          <table className="qf-compare-table">
            <thead>
              <tr>
                <th>Need</th>
                <th>Agency</th>
                <th>Freelancer</th>
                <th>QuietForge</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Time to first system</td>
                <td>Months</td>
                <td>Depends</td>
                <td>Scan, then 2–4 weeks</td>
              </tr>
              <tr>
                <td>Who owns the repo</td>
                <td>Often the agency</td>
                <td>Often nobody</td>
                <td>You, from day one</td>
              </tr>
              <tr>
                <td>Approval before live</td>
                <td>Sometimes</td>
                <td>Rarely</td>
                <td>Always</td>
              </tr>
              <tr>
                <td>ERP rewrite</td>
                <td>Fits</td>
                <td>Risky</td>
                <td>We will say no</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[var(--qf-text-faint)]">
          Need a full ERP rewrite? An agency fits better — we will say so.
        </p>
      </Section>

      <Section data-home-section="discipline">
        <h2 className="mb-[var(--qf-sp-4)] text-[var(--qf-fs-2xl)] font-bold">
          Engineering discipline
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {DISCIPLINE.map((item) => (
            <li key={item.title}>
              <Card>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--qf-text-dim)]">{item.evidence}</p>
                <Link href={item.href} className="mt-3 inline-block text-sm text-[var(--qf-accent)]">
                  Evidence →
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section data-home-section="proof" background="surface">
        <h2 className="mb-[var(--qf-sp-4)] text-[var(--qf-fs-2xl)] font-bold">
          Proof starts at zero
        </h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          Three client slots are open. Until a client verifies hours, we do not invent a
          number. Lab measurements stay labelled as examples.
        </p>
        <Link href={ROUTES.proof} className="mt-4 inline-block text-[var(--qf-accent)]">
          Proof hub →
        </Link>
      </Section>

      <Section data-home-section="about">
        <h2 className="mb-[var(--qf-sp-4)] text-[var(--qf-fs-2xl)] font-bold">
          Norbert · system builder
        </h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          I build operating systems for small companies — from quotes, through orders, to
          inbox and reports. I build at AI speed and deliver with engineering discipline.
          My currency is hours, stress and money given back.
        </p>
        <Link href={ROUTES.about} className="mt-4 inline-block text-[var(--qf-accent)]">
          About →
        </Link>
      </Section>

      <Section data-home-section="pricing">
        <h2 className="mb-[var(--qf-sp-4)] text-[var(--qf-fs-2xl)] font-bold">
          Clear prices, fixed scope
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          <li>
            <Card>
              <h3 className="font-semibold">Automation Scan</h3>
              <p className="mt-2 text-2xl">{formatEuro(PRICING.discovery)}</p>
              <p className="mt-2 text-sm text-[var(--qf-text-dim)]">Credited toward implementation.</p>
            </Card>
          </li>
          <li>
            <Card>
              <h3 className="font-semibold">Implementation</h3>
              <p className="mt-2 text-2xl">from {formatEuro(PRICING.implementationFrom)}</p>
              <p className="mt-2 text-sm text-[var(--qf-text-dim)]">Fixed price, 2–4 weeks.</p>
            </Card>
          </li>
          <li>
            <Card>
              <h3 className="font-semibold">Maintenance</h3>
              <p className="mt-2 text-2xl">from {formatEuro(PRICING.maintenanceFrom)}/mo</p>
              <p className="mt-2 text-sm text-[var(--qf-text-dim)]">Monthly cancellable.</p>
            </Card>
          </li>
        </ul>
        <Link href={ROUTES.pricing} className="mt-6 inline-block text-[var(--qf-accent)]">
          Pricing →
        </Link>
      </Section>

      <Section data-home-section="faq">
        <h2 className="mb-[var(--qf-sp-4)] text-[var(--qf-fs-2xl)] font-bold">Questions</h2>
        <div className="space-y-3">
          {FAQ.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      <section className="qf-final-cta" aria-labelledby="home-cta-title">
        <div className="qf-final-cta-inner">
          <h2 id="home-cta-title" className="mb-[var(--qf-sp-4)]">
            Book the Automation Scan
          </h2>
          <p className="qf-final-cta-lead">
            90 minutes. {formatEuro(PRICING.discovery)}. The report is yours. Credited if we
            build.
          </p>
          <Link href={ROUTES.bookAScan} className="qf-btn-fill">
            Book a scan <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <StickyCta />
    </div>
  );
}
