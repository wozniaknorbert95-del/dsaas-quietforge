import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import ProofEmptyState from '@/components/ui/ProofEmptyState';
import ProofScreenImage from '@/components/ui/ProofScreenImage';
import { CTAS } from '@/content/conversion-copy';
import { getIntentMeta } from '@/content/ecosystem';
import {
  FLEXGRAFIK_COMPANY_CASE as C,
  FLEXGRAFIK_COMPANY_META,
  FLEXGRAFIK_DOORS,
  FLEXGRAFIK_WALKS,
} from '@/content/flexgrafik-company-case';
import { screens } from '@/content/proof';
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
            <h2 className="qf-sys-h2">{C.storyTitle}</h2>
            <p className="qf-sys-lead">{C.story.join(' ')}</p>
          </div>
          <p className="qf-sys-lead">
            <strong className="text-[var(--qf-text)]">{C.conclusion}</strong>
          </p>
        </div>
      </Section>

      <Section>
        <h2 className="qf-sys-h2">{C.doorsTitle}</h2>
        <p className="qf-sys-lead">{C.doorsLead}</p>
        <ul className="qf-fg-door-grid">
          {FLEXGRAFIK_DOORS.map((door) => {
            const screen = screens[door.screenKey];
            const ready = Boolean(screen.ready && screen.src);
            return (
              <li key={door.id} className="qf-approach-card">
                <span className="qf-approach-card-n">{door.n}</span>
                <Link
                  href={door.demoHref}
                  className="qf-fg-door-shot"
                  aria-label={`${door.demoLabel} — ${door.name}`}
                >
                  {ready ? (
                    <ProofScreenImage
                      src={screen.src ?? ''}
                      alt={screen.alt}
                      width={800}
                      height={500}
                    />
                  ) : (
                    <ProofEmptyState
                      eyebrow="// Demo"
                      title="Screen coming soon"
                      description="Open the demo page for the full walkthrough."
                      aspect="screen"
                    />
                  )}
                </Link>
                <p className="qf-fg-intent-row">
                  {door.intents.map((id) => (
                    <span key={id} className="qf-fg-intent" data-intent={id}>
                      {getIntentMeta(id).shortLabel}
                    </span>
                  ))}
                  <span className="qf-fg-status">{C.demoChip}</span>
                </p>
                <h3 className="qf-approach-card-title">
                  {door.name} · {door.role}
                </h3>
                <p className="qf-approach-card-body">{door.body}</p>
                <Link href={door.demoHref} className="qf-btn-ghost">
                  {door.demoLabel} →
                </Link>
                <p className="qf-fg-status">{C.offlineLabel}</p>
              </li>
            );
          })}
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
              {walk.href ? (
                <a
                  href={walk.href}
                  className="qf-btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {walk.hrefLabel} →
                </a>
              ) : (
                <span className="qf-fg-status">{C.offlineLabel}</span>
              )}
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
