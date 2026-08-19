import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import StickyCta from '@/components/layout/StickyCta';
import IntentSystems from '@/components/v2/IntentSystems';
import { PRICING, ROUTES, WHATSAPP } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';
import { CTAS, HERO, POSITIONING, PUBLIC_OFFER } from '@/content/conversion-copy';

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
  { title: 'Approval gates', href: '/security/#approval-gates', evidence: 'The system proposes. You click.' },
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
    a: `So both sides take it seriously. ${formatEuro(PRICING.discovery)} is credited toward implementation. You keep the report either way.`,
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
          <p className="qf-hero-eyebrow">{POSITIONING.label} · EU</p>
          <h1 className="qf-hero-headline">{HERO.headline}</h1>
          <p className="qf-hero-subline">{HERO.subline}</p>
          <p className="qf-hero-anti">{POSITIONING.antiPositioning}</p>
          <p className="qf-hero-proof-strip">{HERO.proofStrip}</p>
          <div className="qf-hero-cta-band">
            <Link href={ROUTES.bookAScan} className="qf-hero-cta-primary">
              <span className="qf-hero-cta-primary-label">
                {CTAS.bookAutomationMap} <span aria-hidden="true">→</span>
              </span>
              <span className="qf-hero-cta-primary-meta">{HERO.primaryCtaMeta}</span>
            </Link>
            <div className="qf-hero-cta-secondary-row">
              <Link href={ROUTES.systems} className="qf-hero-cta-secondary">
                {CTAS.seeSystems}
              </Link>
              <a
                href={WHATSAPP.url}
                className="qf-hero-cta-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {HERO.whatsappCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section data-home-section="counter" background="surface">
        <p className="qf-home-kicker">Given back to SMBs</p>
        <div className="qf-hours-counter">
          <p className="qf-hours-item">
            <span>Hours confirmed</span>
            <strong>0</strong>
          </p>
          <p className="qf-hours-item">
            <span>At €40/h</span>
            <strong>€0</strong>
          </p>
        </div>
        <p className="mt-[var(--qf-sp-4)] max-w-2xl text-[var(--qf-text-dim)]">
          Hours per week × €40/h, only after the client confirms. The counter starts at zero
          on purpose.{' '}
          <Link href={ROUTES.proofMethodology} className="qf-sys-link">
            How we measure
          </Link>
          .
        </p>
      </Section>

      <Section data-home-section="systems">
        <IntentSystems heading="Where does your time leak away?" />
      </Section>

      <Section data-home-section="approach">
        <p className="qf-home-kicker">Approach</p>
        <h2 className="qf-sys-h2">From scan to system in two to four weeks.</h2>
        <ol className="qf-sys-steps">
          {STEPS.map((step, index) => (
            <li key={step}>
              <span className="qf-sys-step-n">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
        <Link href={ROUTES.approach} className="mt-6 inline-block qf-sys-link">
          Full approach →
        </Link>
      </Section>

      <Section data-home-section="compare" background="surface">
        <p className="qf-home-kicker">Fit</p>
        <h2 className="qf-sys-h2">Agency, freelancer, QuietForge</h2>
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
        <p className="qf-home-kicker">Discipline</p>
        <h2 className="qf-sys-h2">Engineering discipline</h2>
        <ul className="qf-intent-grid">
          {DISCIPLINE.map((item) => (
            <li key={item.title}>
              <Card>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="qf-price-note mt-[var(--qf-sp-2)]">{item.evidence}</p>
                <Link href={item.href} className="qf-intent-card-cta">
                  Evidence →
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section data-home-section="proof" background="surface">
        <p className="qf-home-kicker">Proof</p>
        <h2 className="qf-sys-h2">Proof starts at zero</h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          Three client slots are open. Until a client verifies hours, we do not invent a
          number. Lab measurements stay labelled as examples.
        </p>
        <Link href={ROUTES.proof} className="mt-4 inline-block qf-sys-link">
          Proof hub →
        </Link>
      </Section>

      <Section data-home-section="about">
        <p className="qf-home-kicker">About</p>
        <h2 className="qf-sys-h2">Norbert · system builder</h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          I build operating systems for small companies — from quotes, through orders, to
          inbox and reports. I build at AI speed and deliver with engineering discipline.
          My currency is hours, stress and money given back.
        </p>
        <Link href={ROUTES.about} className="mt-4 inline-block qf-sys-link">
          About →
        </Link>
      </Section>

      <Section data-home-section="pricing">
        <p className="qf-home-kicker">Prices</p>
        <h2 className="qf-sys-h2">Clear prices, fixed scope</h2>
        <ul className="qf-price-grid">
          <li>
            <Card>
              <h3 className="font-semibold">{PUBLIC_OFFER.scanName}</h3>
              <p className="qf-price-amount">{PUBLIC_OFFER.scanPrice}</p>
              <p className="qf-price-note">{PUBLIC_OFFER.scanNote}</p>
            </Card>
          </li>
          <li>
            <Card>
              <h3 className="font-semibold">{PUBLIC_OFFER.implementationName}</h3>
              <p className="qf-price-amount">{PUBLIC_OFFER.implementationPrice}</p>
              <p className="qf-price-note">{PUBLIC_OFFER.implementationNote}</p>
            </Card>
          </li>
          <li>
            <Card>
              <h3 className="font-semibold">{PUBLIC_OFFER.maintenanceName}</h3>
              <p className="qf-price-amount">{PUBLIC_OFFER.maintenancePrice}</p>
              <p className="qf-price-note">{PUBLIC_OFFER.maintenanceNote}</p>
            </Card>
          </li>
        </ul>
        <Link href={ROUTES.pricing} className="mt-6 inline-block qf-sys-link">
          Pricing →
        </Link>
      </Section>

      <Section data-home-section="faq">
        <p className="qf-home-kicker">Questions</p>
        <h2 className="qf-sys-h2">Good to know</h2>
        <div className="qf-sys-faq">
          {FAQ.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      <section className="qf-final-cta" aria-labelledby="home-cta-title">
        <div className="qf-final-cta-inner">
          <h2 id="home-cta-title" className="qf-sys-h2">
            Book the Automation Scan
          </h2>
          <p className="qf-final-cta-lead">
            90 minutes. {formatEuro(PRICING.discovery)}. The report is yours. Credited if we
            build.
          </p>
          <div className="qf-sys-cta-row">
            <Link href={ROUTES.bookAScan} className="qf-btn-fill">
              {CTAS.bookAutomationMap} <span aria-hidden="true">→</span>
            </Link>
            <a
              href={WHATSAPP.url}
              className="qf-btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              {HERO.whatsappCta}
            </a>
          </div>
        </div>
      </section>
      <StickyCta />
    </div>
  );
}
