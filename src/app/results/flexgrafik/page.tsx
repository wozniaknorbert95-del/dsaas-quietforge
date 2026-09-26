import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { CTAS } from '@/content/conversion-copy';
import { getIntentMeta } from '@/content/ecosystem';
import {
  FLEXGRAFIK_COMPANY_CASE as C,
  FLEXGRAFIK_COMPANY_META,
  FLEXGRAFIK_DOORS,
  FLEXGRAFIK_WALKS,
} from '@/content/flexgrafik-company-case';
import { ROUTES, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: FLEXGRAFIK_COMPANY_META.title,
  description: FLEXGRAFIK_COMPANY_META.description,
  openGraph: {
    title: `${FLEXGRAFIK_COMPANY_META.title} | Quietforge`,
    description: FLEXGRAFIK_COMPANY_META.description,
    url: `${SITE_URL}${ROUTES.resultsFlexgrafik}`,
    images: [
      {
        url: '/og/results-flexgrafik.svg',
        width: 1200,
        height: 630,
        alt: FLEXGRAFIK_COMPANY_META.ogAlt,
      },
    ],
  },
  alternates: { canonical: `${SITE_URL}${ROUTES.resultsFlexgrafik}` },
  twitter: {
    card: 'summary_large_image',
    title: `${FLEXGRAFIK_COMPANY_META.title} | Quietforge`,
    description: FLEXGRAFIK_COMPANY_META.description,
    images: ['/og/results-flexgrafik.svg'],
  },
};

export default function FlexgrafikCompanyCasePage() {
  return (
    <>
      <Section padding="large">
        <p className="qf-fg-chip">{C.honestyChip}</p>
        <p className="qf-lab-eyebrow">{C.eyebrow}</p>
        <h1 className="qf-fg-h1">{C.title}</h1>
        <p className="qf-lab-lead">{C.lead}</p>
        <div className="qf-fg-actions">
          <Link href={ROUTES.bookAScan} className="qf-btn-fill">
            {C.ctaPrimary} →
          </Link>
          <Link href={ROUTES.lab} className="qf-btn-ghost">
            {C.ctaSecondary} →
          </Link>
        </div>
      </Section>

      <Section background="surface">
        <div className="qf-fg-arc">
          <div>
            <h2 className="qf-sys-h2">{C.problemTitle}</h2>
            <p className="qf-sys-lead">{C.problem}</p>
          </div>
          <div>
            <h2 className="qf-sys-h2">{C.systemTitle}</h2>
            <p className="qf-sys-lead">{C.system}</p>
          </div>
          <div>
            <h2 className="qf-sys-h2">{C.effectTitle}</h2>
            <p className="qf-sys-lead">{C.effect}</p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">{C.doorsTitle}</h2>
        <ul className="qf-fg-door-grid">
          {FLEXGRAFIK_DOORS.map((door) => (
            <li key={door.id} className="qf-approach-card">
              <span className="qf-approach-card-n">{door.n}</span>
              <p className="qf-fg-intent-row">
                {door.intents.map((id) => (
                  <span key={id} className="qf-fg-intent" data-intent={id}>
                    {getIntentMeta(id).shortLabel}
                  </span>
                ))}
                <span className="qf-fg-status">{door.status}</span>
              </p>
              <h3 className="qf-approach-card-title">
                {door.name} · {door.role}
              </h3>
              <p className="qf-approach-card-body">{door.body}</p>
              <a
                href={door.href}
                className="qf-btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {door.hrefLabel} →
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">{C.walkLead}</h2>
        <ul className="qf-fg-walk-grid">
          {FLEXGRAFIK_WALKS.map((walk) => (
            <li key={walk.id} className="qf-approach-card">
              <span className="qf-approach-card-n">{walk.n}</span>
              <p className="qf-fg-intent-row">
                {walk.intents.map((id) => (
                  <span key={id} className="qf-fg-intent" data-intent={id}>
                    {getIntentMeta(id).shortLabel}
                  </span>
                ))}
                <span className="qf-fg-status">{walk.status}</span>
              </p>
              <h3 className="qf-approach-card-title">{walk.title}</h3>
              <p className="qf-approach-card-body">{walk.forYou}</p>
              <ol className="qf-fg-walk-steps">
                {walk.steps.map((step) => (
                  <li key={step.n}>
                    <span>{step.n}</span>
                    {step.label}
                  </li>
                ))}
              </ol>
              <a
                href={walk.href}
                className="qf-btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                {walk.hrefLabel} →
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="qf-fg-platform">
          <p className="qf-fg-chip">{C.platformStatus}</p>
          <h2 className="qf-sys-h2">{C.platformTitle}</h2>
          <p className="qf-sys-lead">{C.platform}</p>
          <p className="qf-fg-not-proven">{C.notProven}</p>
          <h2 className="qf-sys-h2">{C.offerMapTitle}</h2>
          <p className="qf-sys-lead">{C.offerMap}</p>
          <div className="qf-fg-actions">
            <Link href={ROUTES.bookAScan} className="qf-btn-fill">
              {CTAS.bookAutomationMap} →
            </Link>
            <Link href={ROUTES.proofMethodology} className="qf-btn-ghost">
              {C.methodologyLabel} →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
