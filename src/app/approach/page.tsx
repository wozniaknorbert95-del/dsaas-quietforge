import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import FaqItem from '@/components/ui/FaqItem';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import SampleScanLink from '@/components/analytics/SampleScanLink';
import { PRICING, ROUTES, WHATSAPP } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';

export const metadata: Metadata = {
  title: 'The Automation Scan — a decision, not a sales call',
  description:
    'Pre-work, a 90-minute session, and a written report with a go/no-go. The Automation Scan is a fixed-price decision basis, not a pitch.',
  openGraph: {
    title: 'The Automation Scan — a decision, not a sales call | Quietforge',
    description:
      `${formatEuro(PRICING.discovery)} buys a written decision: leaks ranked by payback, the math shown, a roadmap and a go/no-go.`,
    images: [
      {
        url: '/og/approach.svg',
        width: 1200,
        height: 630,
        alt: 'The Automation Scan — a decision, not a sales call',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Automation Scan — a decision, not a sales call | Quietforge',
    description:
      `${formatEuro(PRICING.discovery)} buys a written decision: leaks ranked by payback, the math shown, a roadmap and a go/no-go.`,
    images: ['/og/approach.svg'],
  },
};

const TIMELINE = [
  {
    day: 'Day 0 — pre-work',
    title: 'We study your business before you talk',
    body: 'Your site, your stack, your volumes are reviewed before the session. The agenda is prepared, so the live call starts with numbers, not "tell me about your business".',
  },
  {
    day: 'Day 1–2 — live session',
    title: '60–90 minutes, mapped leaks',
    body: 'We map where the week leaks: quotes, orders, inbox, reporting. Hard numbers instead of impressions — hours, volumes, what waits on you.',
  },
  {
    day: 'Day 3–4 — written report',
    title: 'A decision you can act on',
    body: 'A written report with your leaks ranked by payback, the math shown, and a roadmap: what first, what later, what NOT to automate.',
  },
];

const REPORT_SECTIONS = [
  {
    n: '01',
    title: 'Scored maturity',
    body: 'Five dimensions — tools, processes, data, automation, people — each scored so the imbalances are visible, not just a single number.',
  },
  {
    n: '02',
    title: 'Opportunity matrix',
    body: 'Every candidate process scored on impact × effort × risk. The high-payback, low-effort items float to the top.',
  },
  {
    n: '03',
    title: 'Quantified payback',
    body: 'For each leak: hours lost per week × your hour value. The math is shown line by line — nothing asserted.',
  },
  {
    n: '04',
    title: '30/60/90 roadmap',
    body: 'What to do first, who does it, and how long it takes. Quick wins in the first month, bigger moves after.',
  },
  {
    n: '05',
    title: 'Go / no-go',
    body: 'A clear recommendation — including "do not automate". That is a valid, successful outcome.',
  },
];

const COMPARISON = [
  {
    name: 'Free audit',
    vs: 'the 15-minute skim',
    body: 'A lead magnet: quick enough to sell you a retainer, no depth, no report you own. Your time, their pipeline.',
  },
  {
    name: 'Generic consultant',
    vs: 'day rates and open ends',
    body: 'A discovery that can stretch, with invoices that follow. Built for enterprise budgets, not a 3-person business.',
  },
  {
    name: 'Doing nothing',
    vs: 'the real cost',
    body: 'Small-business owners spend about 11 hours a week on admin — roughly 2× the time they spend selling. At €80/h that is a €46K+/year leak.',
  },
];

const METRICS = [
  {
    value: '11 h',
    label: 'per week on admin (owner-reported)',
    src: 'Amex SME Barometer, UK, 2025',
  },
  {
    value: '15 h',
    label: 'per month, median admin burden',
    src: 'KfW Focus No. 495, Germany, 2025',
  },
  {
    value: '€81',
    label: 'average hourly rate, NL freelancers',
    src: 'Knab, 2025',
  },
  {
    value: '2×',
    label: 'more time on admin than on selling',
    src: 'Amex SME Barometer, UK, 2025',
  },
];

const STEPS_AFTER = [
  {
    title: 'Scope',
    body: 'One system, fixed price, two to four weeks. If it is not worth automating, we stop.',
    you: 'You choose the first leak to close.',
  },
  {
    title: 'Build',
    body: 'AI speed with engineering discipline: review, scans, documentation.',
    you: 'Short check-ins. No surprise live deploys.',
  },
  {
    title: 'You approve',
    body: 'Nothing customer-facing goes live without your click.',
    you: 'You are the gate.',
  },
  {
    title: 'Handover',
    body: 'Repo in your account, docs, optional maintenance.',
    you: 'You own the system.',
  },
];

const FAQ = [
  {
    q: 'Is this a sales call?',
    a: 'No. The deliverable is a written decision basis, not a pitch. The session is anti-sales by design — if the answer is "do not automate", the report says so, and that is a successful scan.',
  },
  {
    q: 'What exactly do I receive?',
    a: 'A written report with your top leaks ranked by payback, the hour-by-hour math, a scored maturity view, a 30/60/90 roadmap and a go/no-go. You keep it regardless of what you do next.',
  },
  {
    q: 'How long until I get the report?',
    a: 'Day 0 pre-work, a 60–90 minute session in the first two days, and the report within two working days after the session.',
  },
  {
    q: 'Is the fee really credited?',
    a: `Yes. The ${formatEuro(PRICING.discovery)} is credited toward your first build. If there is nothing worth automating, you keep the report and stop there.`,
  },
  {
    q: 'What if the scan finds nothing worth automating?',
    a: 'That is a valid outcome. The report says so, and you have a document that proves you checked. Not every process deserves automation.',
  },
  {
    q: 'Is my data safe during the scan?',
    a: 'Intake data is processed on EU hosting; analytics are anonymous and consent-based. For delivery, every system stays gated and logged. See the security page for the gate list.',
  },
];

export default function ApproachPage() {
  return (
    <>
      <AnalyticsPageView event="system_page_view" detail={{ slug: 'approach' }} />
      <Section>
        <p className="qf-sys-crumb">
          <Link href={ROUTES.home}>Home</Link>
          {' / '}
          Approach
        </p>
        <p className="qf-sys-status">
          <span className="qf-sys-badge">Approach</span>
          <span className="qf-sys-intents">decision · process · no surprises</span>
        </p>
        <h1 className="qf-sys-h1">The Automation Scan — a decision, not a sales call.</h1>
        <p className="qf-sys-tagline">
          {formatEuro(PRICING.discovery)} buys a written decision basis: your leaks ranked
          by payback, the math shown, and a clear go/no-go. The session is input, not the
          product.
        </p>
        <p className="qf-sys-meta">
          pre-work · 60–90 min session · report in 2 days · credited toward your build
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
        <h2 className="qf-sys-h2">What happens, and when</h2>
        <p className="qf-sys-lead">
          No ambiguity about what you get or when. The whole engagement fits in four days.
        </p>
        <ul className="qf-approach-timeline">
          {TIMELINE.map((step) => (
            <li key={step.day} className="qf-tl-item">
              <span className="qf-tl-day">{step.day}</span>
              <h3 className="qf-tl-title">{step.title}</h3>
              <p className="qf-tl-body">{step.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">What the report contains</h2>
        <p className="qf-sys-lead">
          You see the structure before you book. This is what lands in your inbox.
        </p>
        <ul className="qf-approach-grid">
          {REPORT_SECTIONS.map((section) => (
            <li key={section.n} className="qf-approach-card">
              <span className="qf-approach-card-n">{section.n}</span>
              <h3 className="qf-approach-card-title">{section.title}</h3>
              <p className="qf-approach-card-body">{section.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">
          Why {formatEuro(PRICING.discovery)} is the calmest number in consulting
        </h2>
        <p className="qf-sys-lead">
          Fixed price. Fixed scope. A report you own either way. Compare it with what you
          actually choose between:
        </p>
        <ul className="qf-compare">
          {COMPARISON.map((item, index) => (
            <li key={item.name} className={index === 2 ? 'qf-compare-card qf-compare-card--ours' : 'qf-compare-card'}>
              <span className="qf-compare-vs">{item.vs}</span>
              <h3 className="qf-compare-name">{item.name}</h3>
              <p className="qf-compare-body">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="qf-sys-lead">
          The fee is credited toward your first build. The report stays yours. If nothing
          is worth automating, you stop — and keep the document.
        </p>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">The numbers behind the scan</h2>
        <p className="qf-sys-lead">
          Admin quietly eats the week of a small-business owner. The scan measures where,
          for you specifically. The context below is sourced:
        </p>
        <ul className="qf-approach-metrics">
          {METRICS.map((metric) => (
            <li key={metric.label} className="qf-metric">
              <span className="qf-metric-n">{metric.value}</span>
              <span className="qf-metric-label">{metric.label}</span>
              <span className="qf-metric-src">{metric.src}</span>
            </li>
          ))}
        </ul>
        <p className="qf-sys-lead">
          The €80/h used in the comparison above is a conservative scenario based on
          Knab&apos;s €81/h NL freelance rate. Our public methodology values hours at
          €40/h — the counter and case studies stay at that rate.
        </p>
        <p className="qf-sys-lead">
          <SampleScanLink />
        </p>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">After the scan: the build</h2>
        <p className="qf-sys-lead">
          The scan decides whether to build. If yes, the path is short and gated:
        </p>
        <ol className="qf-sys-steps">
          {STEPS_AFTER.map((step, index) => (
            <li key={step.title}>
              <span className="qf-sys-step-n">{index + 1}.</span>{' '}
              <strong className="text-[var(--qf-text)]">{step.title}</strong> — {step.body}{' '}
              <span className="text-[var(--qf-text-faint)]">({step.you})</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">Good to know</h2>
        <div className="qf-sys-faq">
          {FAQ.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      <section className="qf-final-cta" aria-labelledby="approach-cta-title">
        <div className="qf-final-cta-inner">
          <h2 id="approach-cta-title" className="qf-sys-h2">
            Start with the scan
          </h2>
          <p className="qf-final-cta-lead">
            90 minutes and a written decision. The report is yours either way — and the
            fee is credited if we build.
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
