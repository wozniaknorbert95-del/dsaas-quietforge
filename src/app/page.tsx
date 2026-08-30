import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import StickyCta from '@/components/layout/StickyCta';
import IntentSystems from '@/components/v2/IntentSystems';
import { PRICING, ROUTES } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';
import { CTAS, HERO, POSITIONING, PUBLIC_OFFER, REFERENCE_PROGRAM } from '@/content/conversion-copy';
import { hoursCounter, hoursValueEuro, referenceProgram, referenceSpotsOpen } from '@/content/hours-counter';
import ReferenceCta from '@/components/home/ReferenceCta';
import SampleScanLink from '@/components/analytics/SampleScanLink';
import WhatsAppLink from '@/components/analytics/WhatsAppLink';

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
  'Scan — pre-work, a 90-minute session, and a written go/no-go in 2 days.',
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
  {
    q: 'What if it doesn’t work?',
    a: 'You sign off before anything goes live — and the final 50% is invoiced only after it runs in your production.',
  },
  {
    q: 'What’s the reference program?',
    a: 'Five reference spots this quarter: the full scan at €0–€345 in exchange for publishing the measured results. After five, it closes.',
  },
];

export default function Home() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="pb-20 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section data-home-section="hero" className="qf-hero">
        <div className="qf-hero-inner">
          <p className="qf-hero-eyebrow">{POSITIONING.label} · EU</p>
          <h1 className="qf-hero-headline">{HERO.headline}</h1>
          <p className="qf-hero-subline">{HERO.subline}</p>
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
              <WhatsAppLink location="hero" className="qf-hero-cta-whatsapp" />
            </div>
          </div>
          <div className="qf-hero-pas">
            <div className="qf-hero-pas-item">
              <span className="qf-hero-pas-label">{HERO.beats.problem.label}</span>
              <span className="qf-hero-pas-text">{HERO.beats.problem.text}</span>
            </div>
            <div className="qf-hero-pas-item">
              <span className="qf-hero-pas-label">{HERO.beats.system.label}</span>
              <span className="qf-hero-pas-text">{HERO.beats.system.text}</span>
            </div>
            <div className="qf-hero-pas-item">
              <span className="qf-hero-pas-label">{HERO.beats.effect.label}</span>
              <span className="qf-hero-pas-text">{HERO.beats.effect.text}</span>
            </div>
          </div>
          <p className="qf-hero-anti">{POSITIONING.antiPositioning}</p>
          <p className="qf-hero-proof-strip">{HERO.proofStrip}</p>
          <p className="qf-hero-chip">{HERO.proofChip}</p>
        </div>
      </section>

      <Section data-home-section="counter" background="surface">
        <p className="qf-home-kicker">Hours returned · verified by clients</p>
        <div className="qf-hours-counter">
          <p className="qf-hours-item">
            <span>Hours confirmed</span>
            <strong>{hoursCounter.hoursConfirmed}</strong>
          </p>
          <p className="qf-hours-item">
            <span>At €{hoursCounter.ratePerHour}/h</span>
            <strong>€{hoursValueEuro}</strong>
          </p>
        </div>
        <p className="mt-[var(--qf-sp-4)] max-w-2xl text-[var(--qf-text-dim)]">
          Counting starts at zero by design — the first verified client case opens the
          count. No invented numbers.{' '}
          <Link href={ROUTES.proofMethodology} className="qf-sys-link">
            How we measure
          </Link>
          .
        </p>
        <p className="mt-[var(--qf-sp-3)] max-w-2xl text-sm text-[var(--qf-text-faint)]">
          Reference program:{' '}
          {referenceSpotsOpen} of {referenceProgram.spotsTotal} spots open —{' '}
          <Link href={ROUTES.proof} className="qf-sys-link">
            apply for a reference spot
          </Link>
          .
        </p>
      </Section>

      <Section data-home-section="systems">
        <IntentSystems heading="Where does your time leak away?" home />
      </Section>

      <Section data-home-section="approach">
        <p className="qf-home-kicker">Approach</p>
        <h2 className="qf-sys-h2">From scan to first system in 2–4 weeks.</h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          The scan is a written decision, not a sales call — pre-work, one live session,
          a go/no-go you keep either way.
        </p>
        <ol className="qf-sys-steps mt-4">
          {STEPS.map((step, index) => (
            <li key={step}>
              <span className="qf-sys-step-n">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-2xl text-sm text-[var(--qf-text-faint)]">
          Fixed price after the scan. Core, Scale or Command — you choose the depth.{' '}
          <Link href={ROUTES.pricing} className="qf-sys-link">
            See variants
          </Link>
          .
        </p>
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
              <tr>
                <td>Who checks security</td>
                <td>Sometimes</td>
                <td>Rarely</td>
                <td>Every build: review + scans</td>
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
        <h2 className="qf-sys-h2">{REFERENCE_PROGRAM.heading}</h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          {REFERENCE_PROGRAM.lead} Until a client verifies hours, we do not invent a number.
          Lab measurements stay labelled as examples.
        </p>
        <ReferenceCta
          label={`Apply — ${referenceSpotsOpen} spots open, scan from €0`}
        />
      </Section>

      <Section data-home-section="about">
        <p className="qf-home-kicker">About</p>
        <h2 className="qf-sys-h2">Norbert · your systems architect</h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          Architect of autonomous operating systems. Thirty trades taught me your
          industry&apos;s language; three years running my own company taught me what
          systems really cost — and give back.
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
              <h3 className="font-semibold">Build</h3>
              <p className="qf-price-amount">
                {PUBLIC_OFFER.buildVariants.map((variant) => variant.price).join(' / ')}
              </p>
              <p className="qf-price-note">
                Core / Scale* / Command — you choose the depth. (* most chosen)
              </p>
            </Card>
          </li>
          <li>
            <Card>
              <h3 className="font-semibold">Care</h3>
              <p className="qf-price-amount">
                {PUBLIC_OFFER.careVariants.map((variant) => variant.price).join(' / ')}
              </p>
              <p className="qf-price-note">Keep / Grow* / Unlock — monthly, cancellable.</p>
            </Card>
          </li>
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-[var(--qf-text-faint)]">
          Every build: independent code review, security scans, tests, docs, your repo from
          day one. Final 50% after it runs in production.
        </p>
        <Link href={ROUTES.pricing} className="mt-6 inline-block qf-sys-link">
          Pricing →
        </Link>
      </Section>

      <Section data-home-section="faq">
        <p className="qf-home-kicker">Questions</p>
        <h2 className="qf-sys-h2">Straight answers</h2>
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
          <p className="qf-final-cta-sample">
            <SampleScanLink />
          </p>
          <div className="qf-sys-cta-row">
            <Link href={ROUTES.bookAScan} className="qf-btn-fill">
              {CTAS.bookAutomationMap} <span aria-hidden="true">→</span>
            </Link>
            <WhatsAppLink location="final_cta" className="qf-btn-ghost" />
          </div>
        </div>
      </section>
      <StickyCta />
    </div>
  );
}
