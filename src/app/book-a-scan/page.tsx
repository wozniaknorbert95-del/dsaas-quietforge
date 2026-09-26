import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import FaqItem from '@/components/ui/FaqItem';
import { EMAIL, ROUTES, SITE_URL } from '@/lib/constants';
import AnalyticsPageView from '@/components/analytics/AnalyticsPageView';
import SampleScanLink from '@/components/analytics/SampleScanLink';
import BookScanIntake from '@/components/scan/BookScanIntake';
import {
  SCAN_CHIPS,
  SCAN_COPY,
  SCAN_CREDIT_DAYS,
  SCAN_EVIDENCE_LABELS,
  SCAN_FAQ,
  SCAN_FROM_TO,
  SCAN_PROCESS,
  SCAN_SAMPLE,
  SCAN_SKUS,
  SCAN_YOU_PAY_FOR,
  scanVatLine,
} from '@/content/scan';
import { formatEuro } from '@/content/pricing';

export const metadata: Metadata = {
  title: `Book an Hours Engine Scan — ${SCAN_COPY.fromPrice}`,
  description: SCAN_COPY.heroLead,
  openGraph: {
    title: `Book an Hours Engine Scan — ${SCAN_COPY.fromPrice}`,
    description: SCAN_COPY.heroLead,
    url: `${SITE_URL}/book-a-scan/`,
  },
};

export default function BookAScanPage() {
  return (
    <>
      <AnalyticsPageView event="book_discovery_view" />
      <Section padding="large">
        <h1 className="qf-scan-h1">{SCAN_COPY.h1}</h1>
        <p className="qf-sys-lead">{SCAN_COPY.heroLead}</p>
        <ul className="qf-scan-chips">
          {SCAN_CHIPS.map((chip) => (
            <li key={chip.n} className="qf-scan-chip">
              <span>{chip.n}</span>
              {chip.label}
            </li>
          ))}
        </ul>
        <p className="qf-sys-lead">{SCAN_COPY.labHook}</p>
        <p className="qf-scan-aside">{SCAN_COPY.feeGoesTo}</p>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">What you pay for</h2>
        <ul className="qf-scan-pay-grid">
          {SCAN_YOU_PAY_FOR.map((item) => (
            <li key={item.n} className="qf-approach-card">
              <span className="qf-approach-card-n">{item.n}</span>
              <h3 className="qf-approach-card-title">{item.title}</h3>
              <p className="qf-approach-card-body">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">Four steps</h2>
        <ol className="qf-scan-process">
          {SCAN_PROCESS.map((step) => (
            <li key={step.n} className="qf-approach-card">
              <span className="qf-approach-card-n">{step.n}</span>
              <h3 className="qf-approach-card-title">{step.title}</h3>
              <p className="qf-approach-card-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section background="surface">
        <p className="qf-fg-chip">{SCAN_SAMPLE.chip}</p>
        <h2 className="qf-sys-h2">From file to ranking</h2>
        <p className="qf-sys-lead">{SCAN_SAMPLE.math}</p>
        <ul className="qf-scan-fromto">
          {SCAN_FROM_TO.map((col) => (
            <li key={col.title} className="qf-approach-card">
              <span className="qf-approach-card-n">{col.klass}</span>
              <h3 className="qf-approach-card-title">{col.title}</h3>
              <p className="qf-scan-fromto-value">{col.value}</p>
              <p className="qf-approach-card-body">{col.euro}</p>
            </li>
          ))}
        </ul>
        <p className="qf-sys-lead">
          <SampleScanLink />
        </p>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">Every number carries a label</h2>
        <p className="qf-sys-lead">{SCAN_COPY.howWeCalculate}</p>
        <table className="qf-scan-label-table">
          <thead>
            <tr>
              <th scope="col">Label</th>
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
        <p className="qf-scan-aside">
          {SCAN_COPY.creditLine} {SCAN_COPY.guarantee}
        </p>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">Pick depth of evidence</h2>
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
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">Good to know</h2>
        <div className="qf-sys-faq">
          {SCAN_FAQ.map((item) => (
            <FaqItem key={item.q} question={item.q} answer={item.a} />
          ))}
        </div>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">Request a scan</h2>
        <BookScanIntake />
        <p className="qf-scan-fineprint">
          {EMAIL} · Rotterdam · reply within one working day · credited {SCAN_CREDIT_DAYS}{' '}
          days
        </p>
        <p className="qf-scan-fineprint">
          Your details are used only to respond to this enquiry. See the{' '}
          <Link href={ROUTES.legal} className="qf-scan-privacy">
            privacy &amp; data policy
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
