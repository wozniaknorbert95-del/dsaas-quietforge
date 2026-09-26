import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import FaqItem from '@/components/ui/FaqItem';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import SampleScanLink from '@/components/analytics/SampleScanLink';
import { ROUTES, WHATSAPP } from '@/lib/constants';
import { formatEuro } from '@/content/pricing';
import {
  SCAN_COPY,
  SCAN_CREDIT_DAYS,
  SCAN_EVIDENCE_LABELS,
  SCAN_FAQ,
  SCAN_SKUS,
  SCAN_TOOLS,
  scanVatLine,
} from '@/content/scan';

export const metadata: Metadata = {
  title: 'The Hours Engine Scan — depth of evidence, not a sales call',
  description:
    'Hours, Both-lanes, or Decision. You send owner files; we measure leaks. Ranking only from measured hours. From €149 excl. VAT, credited 30 days.',
  openGraph: {
    title: 'The Hours Engine Scan — depth of evidence, not a sales call | Quietforge',
    description:
      'You pick how much evidence we read. No invented euro. From €149 excl. VAT, credited 30 days.',
    images: [
      {
        url: '/og/approach.svg',
        width: 1200,
        height: 630,
        alt: 'The Hours Engine Scan — depth of evidence, not a sales call',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hours Engine Scan — depth of evidence, not a sales call | Quietforge',
    description:
      'You pick how much evidence we read. No invented euro. From €149 excl. VAT, credited 30 days.',
    images: ['/og/approach.svg'],
  },
};

const TIMELINE = [
  {
    day: 'You send',
    title: 'URL + owner export',
    body: 'One host, and mailbox or quotes as a file. No live login. You write down the time window. About 20–40 minutes of your time.',
  },
  {
    day: 'We measure',
    title: 'Files first, website second',
    body: 'The Hours Engine labels every number. The crawl looks at your site only — it never prints hours or euro.',
  },
  {
    day: 'You keep',
    title: 'A written report',
    body: 'Typically within 5 working days of a complete export. Ranking only where hours were measured. GO / PARK / NO on Decision.',
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
    body: 'Small-business owners spend about 11 hours a week on admin — roughly 2× the time they spend selling (Amex SME Barometer, 2025). The scan measures your files; it does not invent that euro.',
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
    label: 'average hourly rate, NL freelancers — context, not the scan rate',
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
  SCAN_FAQ[0],
  {
    q: 'What exactly do I receive?',
    a: 'A written report. Every number carries a label: Measured hours, Waiting time, You stated, Website hypothesis, or Not enough data. Ranking only of measured hours.',
  },
  {
    q: 'How long until I get the report?',
    a: SCAN_COPY.reportWindow,
  },
  SCAN_FAQ[2],
  {
    q: 'Is the fee really credited?',
    a: `${SCAN_COPY.creditLine} If there is nothing worth automating, you keep the report and stop there.`,
  },
  SCAN_FAQ[1],
  SCAN_FAQ[3],
  {
    q: 'Is my data safe during the scan?',
    a: 'Owner-only files. No staff inboxes. No live mailbox login. Raw files stay out of git and are deleted after you accept the report or abandon the scan. See Security.',
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
          <span className="qf-sys-intents">evidence · labels · no invented euro</span>
        </p>
        <h1 className="qf-sys-h1">The Hours Engine Scan — depth of evidence, not a sales call.</h1>
        <p className="qf-sys-tagline">{SCAN_COPY.labHook}</p>
        <p className="qf-sys-meta">
          {SCAN_COPY.fromPrice} · credited {SCAN_CREDIT_DAYS} days · {SCAN_COPY.reportWindow}
        </p>
        <p className="qf-scan-aside">{SCAN_COPY.feeGoesTo}</p>
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
        <h2 className="qf-sys-h2">Three depths. Same tools.</h2>
        <p className="qf-sys-lead">{SCAN_COPY.clientPicks}</p>
        <ul className="qf-scan-sku-grid">
          {SCAN_SKUS.map((sku) => (
            <li key={sku.id} className="qf-approach-card">
              <span className="qf-approach-card-n">{sku.eyebrow}</span>
              <h3 className="qf-approach-card-title">
                {sku.name} · {formatEuro(sku.priceNet)}
              </h3>
              <p className="qf-approach-card-body">{scanVatLine(sku)}</p>
              <p className="qf-approach-card-body">{sku.youMustSend}</p>
              <p className="qf-approach-card-body">{sku.feeGoesTo}</p>
              <p className="qf-approach-card-body">{sku.rankingMayInclude}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">What happens, and when</h2>
        <p className="qf-sys-lead">{SCAN_COPY.reportWindow}</p>
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

      <Section background="surface">
        <h2 className="qf-sys-h2">Every number carries a label</h2>
        <p className="qf-sys-lead">{SCAN_COPY.howWeCalculate}</p>
        <table className="qf-scan-label-table">
          <thead>
            <tr>
              <th scope="col">Label on the page</th>
              <th scope="col">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {SCAN_EVIDENCE_LABELS.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="qf-sys-lead">{SCAN_COPY.noExportHonesty}</p>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">Tools we run — not a menu for you</h2>
        <p className="qf-sys-lead">
          The same tools on every SKU. A higher SKU means more of your data in the report, not a new logo.
        </p>
        <ul className="qf-scan-tool-grid">
          {SCAN_TOOLS.map((item) => (
            <li key={item.tool} className="qf-approach-card">
              <h3 className="qf-approach-card-title">{item.tool}</h3>
              <p className="qf-approach-card-body">Looks at: {item.looksAt}</p>
              <p className="qf-approach-card-body">Never: {item.never}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">Why a paid scan is the calmest first step</h2>
        <p className="qf-sys-lead">
          Fixed net prices. A report you own either way. Compare it with what you actually choose between:
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
          {SCAN_COPY.creditLine} {SCAN_COPY.guarantee}
        </p>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">The numbers behind the scan</h2>
        <p className="qf-sys-lead">
          Admin quietly eats the week of a small-business owner. The scan measures where, for you specifically, from your files. The context below is sourced industry research — not a QuietForge result:
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
        <p className="qf-sys-lead">{SCAN_COPY.howWeCalculate}</p>
        <p className="qf-sys-lead">
          <SampleScanLink />
        </p>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">After the scan: the build</h2>
        <p className="qf-sys-lead">
          The scan decides whether to build. GO on a scan line is not start of build. If yes, the path is short and gated:
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
            Start with Hours
          </h2>
          <p className="qf-final-cta-lead">
            {SCAN_COPY.fromPrice}. You send a file. We measure. The report is yours either way.
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
