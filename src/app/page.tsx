import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import FaqItem from '@/components/ui/FaqItem';
import StickyCta from '@/components/layout/StickyCta';
import IntentSystems from '@/components/v2/IntentSystems';
import { ROUTES } from '@/lib/constants';
import {
  ABOUT,
  CTAS,
  HERO,
  HOME_SYSTEMS_PAINS,
  POSITIONING,
  PUBLIC_OFFER,
} from '@/content/conversion-copy';
import { SCAN_COPY } from '@/content/scan';
import WhatsAppLink from '@/components/analytics/WhatsAppLink';

export const metadata: Metadata = {
  title: 'Quotes, leads and inbox — you approve before anything sends',
  description:
    'Automation for Dutch small businesses: quote flows, lead qualification and inbox triage. Nothing customer-facing goes out without your click. Start with the Automation Scan.',
  openGraph: {
    title: 'Quotes, leads and inbox — you approve | Quietforge',
    description:
      'Systems for Dutch SMB owners: quotes, leads and inbox. You approve. FlexGrafik is the reference lab where it was built.',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Quietforge — quotes, leads and inbox with human approval',
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
  'Scan — you send files, we measure leaks, written GO / PARK / NO. No invented euro.',
  'Scope — one module, priced after the scan, usually 2–3 weeks after sign-off.',
  'Build — AI speed, human review, scans.',
  'You approve — nothing live without it.',
  'Handover — docs, repo, optional maintenance.',
];

const FLEXGRAFIK_STORY = [
  {
    label: 'Before',
    text: 'Quote requests and inbox threads competed with print deadlines — answers waited on whoever opened the mailbox.',
  },
  {
    label: 'System',
    text: 'Qualify the request, draft the next step, then stop for a human click before anything customer-facing goes out.',
  },
  {
    label: 'Now',
    text: 'Portal, quote wizard, game and design intake were built and run in the FlexGrafik lab. Today they are offline — the flexgrafik.nl domain and hosting lapsed — and they are coming back. Not a client case study.',
  },
  {
    label: 'Not yet',
    text: 'Not every process is fully automated; the lab still shows PARTIAL and PLANNED work honestly.',
  },
] as const;

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
    q: 'Do I need to change my CRM?',
    a: 'No. Keep your tools unless the scan shows a specific integration is required — and that stays in scope before build.',
  },
  {
    q: 'Do my data leave the EU?',
    a: 'Intake form data is processed on EU hosting. Analytics are anonymous and consent-based. Full detail is on Security and Legal.',
  },
  {
    q: 'Can I run this on my own VPS?',
    a: 'Yes, when the scan says it fits. You keep the keys and the repo — we scope hosting before build, not as a surprise later.',
  },
  {
    q: 'Where does the code live?',
    a: 'In your repository from day one. I am replaceable by design.',
  },
  {
    q: 'Why is the scan paid?',
    a: `So both sides take it seriously. ${SCAN_COPY.creditLine} You keep the report either way.`,
  },
  {
    q: 'Do you have client case studies yet?',
    a: 'Not yet. Lab examples are labelled examples. Real cases publish only after the client verifies the numbers.',
  },
  {
    q: 'Is FlexGrafik the proof?',
    a: 'FlexGrafik is an owner-operated reference business and build laboratory, not an external client case. QuietForge sells given-back time, not a catalogue of modules.',
  },
  {
    q: 'What if it is not worth automating?',
    a: 'The scan can conclude “don’t automate”. That is a successful scan.',
  },
  {
    q: 'What if it doesn’t work?',
    a: 'You sign off before anything goes live — and the final 50% is invoiced only after it runs in your production.',
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
          <p className="qf-hero-hitl">{HERO.hitlLine}</p>
          <div className="qf-hero-cta-band">
            <Link href={ROUTES.bookAScan} className="qf-hero-cta-primary">
              <span className="qf-hero-cta-primary-label">
                {CTAS.bookAutomationMap} <span aria-hidden="true">→</span>
              </span>
              <span className="qf-hero-cta-primary-meta">{HERO.primaryCtaMeta}</span>
            </Link>
            <div className="qf-hero-cta-secondary-row">
              <Link href={ROUTES.proof} className="qf-hero-cta-secondary">
                {CTAS.seeResults}
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
          <p className="qf-hero-proof-strip">{HERO.dualBrandLine}</p>
          <p className="qf-hero-chip">{HERO.proofChip}</p>
        </div>
      </section>

      <Section data-home-section="systems">
        <h2 className="qf-sys-h2">Three places owners lose hours</h2>
        <ul className="mt-3 max-w-2xl list-disc space-y-1 pl-5 text-[var(--qf-text-dim)]">
          {HOME_SYSTEMS_PAINS.map((pain) => (
            <li key={pain}>{pain}</li>
          ))}
        </ul>
        <div className="mt-6">
          <IntentSystems heading="" home />
        </div>
      </Section>

      <Section data-home-section="approach">
        <p className="qf-home-kicker">Approach</p>
        <h2 className="qf-sys-h2">
          First working module usually 2–3 weeks after scope sign-off.
        </h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          The scan is a written measurement, not a sales call — you send files, we label
          every number, you keep the report either way.
        </p>
        <ol className="qf-sys-steps mt-4">
          {STEPS.map((step, index) => (
            <li key={step}>
              <span className="qf-sys-step-n">{index + 1}.</span> {step}
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-2xl text-sm text-[var(--qf-text-faint)]">
          The build has no fixed price. It is priced after the scan, from what your company
          actually needs.{' '}
          <Link href={ROUTES.pricing} className="qf-sys-link">
            How pricing works
          </Link>
          .
        </p>
        <Link href={ROUTES.approach} className="mt-6 inline-block qf-sys-link">
          Full approach →
        </Link>
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
        <h2 className="qf-sys-h2">How FlexGrafik shortened quote and inbox work</h2>
        <p className="max-w-2xl text-sm text-[var(--qf-text-faint)]">
          OWNER-OPERATED REFERENCE — lab evidence, not an external client result.
        </p>
        <ul className="mt-4 max-w-2xl space-y-3 text-[var(--qf-text-dim)]">
          {FLEXGRAFIK_STORY.map((item) => (
            <li key={item.label}>
              <strong className="text-[var(--qf-text)]">{item.label}.</strong> {item.text}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-2xl text-sm text-[var(--qf-text-faint)]">
          {HERO.microTrust}{' '}
          <Link href={ROUTES.lab} className="qf-sys-link">
            See the Builder&apos;s Lab →
          </Link>
        </p>
      </Section>

      <Section data-home-section="about">
        <p className="qf-home-kicker">About</p>
        <h2 className="qf-sys-h2">Norbert Wozniak · Rotterdam</h2>
        <p className="max-w-2xl text-[var(--qf-text-dim)]">
          Conversion Systems Architect for Dutch small businesses. Thirty trades taught me
          how owners actually work; three years building systems for FlexGrafik taught me
          what they cost — and give back. {ABOUT.kvk}.
        </p>
        <Link href={ROUTES.about} className="mt-4 inline-block qf-sys-link">
          About →
        </Link>
      </Section>

      <Section data-home-section="pricing">
        <p className="qf-home-kicker">Prices</p>
        <h2 className="qf-sys-h2">Scan first. The build is priced after the scan.</h2>
        <ul className="qf-price-grid">
          <li>
            <Card>
              <h3 className="font-semibold">{PUBLIC_OFFER.scanName}</h3>
              <p className="qf-price-amount">{PUBLIC_OFFER.scanPrice}</p>
              <p className="qf-price-note">{PUBLIC_OFFER.scanNote}</p>
              <p className="qf-price-note mt-[var(--qf-sp-2)]">{PUBLIC_OFFER.scanForWho}</p>
            </Card>
          </li>
          <li>
            <Card>
              <h3 className="font-semibold">Build</h3>
              <p className="qf-price-amount">{PUBLIC_OFFER.buildPrice}</p>
              <p className="qf-price-note">{PUBLIC_OFFER.buildPriceNote}</p>
              <p className="qf-price-note mt-[var(--qf-sp-2)]">{PUBLIC_OFFER.buildForWho}</p>
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
            Book an Hours Engine Scan
          </h2>
          <p className="qf-final-cta-lead">
            {SCAN_COPY.fromPrice}. The report is yours. {SCAN_COPY.creditLine}
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
