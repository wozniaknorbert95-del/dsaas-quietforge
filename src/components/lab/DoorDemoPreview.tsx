import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import ProofScreenImage from '@/components/ui/ProofScreenImage';
import ProofEmptyState from '@/components/ui/ProofEmptyState';
import { getIntentMeta } from '@/content/ecosystem';
import { DEMO_PAGES, DEMO_SHARED, type DemoPageId } from '@/content/lab-demos';
import { CTAS, PUBLIC_OFFER } from '@/content/conversion-copy';
import { screens } from '@/content/proof';
import { ROUTES } from '@/lib/constants';

interface DoorDemoPreviewProps {
  id: DemoPageId;
  /** Interactive live demo — replaces the static screenshot gallery when provided. */
  demo?: React.ReactNode;
}

/**
 * Demo preview page for one FlexGrafik door — sales-led:
 * outcome hero → live demo (or real screens) → what it changes in your company →
 * how it lands → scan CTA with one honest boundary line.
 */
export default function DoorDemoPreview({ id, demo }: DoorDemoPreviewProps) {
  const demoPage = DEMO_PAGES[id];

  return (
    <>
      <Section padding="large">
        <p className="qf-fg-chip">{DEMO_SHARED.chip}</p>
        <p className="qf-lab-eyebrow">{demoPage.eyebrow}</p>
        <h1 className="qf-fg-h1">{demoPage.title}</h1>
        <p className="qf-lab-lead">{demoPage.lead}</p>
        {demo ? <p className="qf-lab-status-note">{DEMO_SHARED.demoNote}</p> : null}
        <div className="qf-fg-actions">
          <Button
            href={ROUTES.bookAScan}
            withArrow
            size="lg"
            analyticsEvent="cta_book_map_click"
            analyticsDetail={{ location: `demo_${id}_hero` }}
          >
            {CTAS.bookAutomationMap}
          </Button>
          <Link href={DEMO_SHARED.storyHref} className="qf-btn-ghost">
            {DEMO_SHARED.storyCta} →
          </Link>
        </div>
      </Section>

      {demo ? (
        <Section id="demo" background="surface">
          <h2 className="qf-sys-h2">{DEMO_SHARED.demoTitle}</h2>
          {demo}
        </Section>
      ) : (
      <Section id="screens" background="surface">
        <h2 className="qf-sys-h2">{DEMO_SHARED.shotsTitle}</h2>
        <ul className="qf-demo-shot-grid">
          {demoPage.shots.map((shot) => {
            const screen = screens[shot.key];
            const ready = Boolean(screen.ready && screen.src);
            return (
              <li key={shot.key} className="qf-demo-shot">
                <div className="qf-demo-shot-frame">
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
                      description="This capture is being refreshed. The walkthrough on this page shows what the system does."
                      aspect="screen"
                    />
                  )}
                </div>
                <p className="qf-demo-shot-caption">{shot.caption}</p>
              </li>
            );
          })}
        </ul>
      </Section>
      )}

      <Section>
        <h2 className="qf-sys-h2">{demoPage.benefitsTitle}</h2>
        <ul className="qf-demo-grid">
          {demoPage.benefits.map((benefit) => (
            <li key={benefit.title} className="qf-approach-card">
              <p className="qf-fg-intent-row">
                <span className="qf-fg-intent" data-intent={benefit.intent}>
                  {getIntentMeta(benefit.intent).shortLabel}
                </span>
              </p>
              <h3 className="qf-approach-card-title">{benefit.title}</h3>
              <p className="qf-approach-card-body">{benefit.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="surface">
        <h2 className="qf-sys-h2">{demoPage.stepsTitle}</h2>
        <ol className="qf-fg-walk-steps">
          {demoPage.steps.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <p className="qf-demo-step-body">
                <strong className="text-[var(--qf-text)]">{step.label}.</strong> {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="qf-fg-featured">
          <h2 className="qf-fg-featured-title">{DEMO_SHARED.ctaTitle}</h2>
          <p className="qf-fg-featured-body">{DEMO_SHARED.ctaBody}</p>
          <div className="qf-fg-actions">
            <Button
              href={ROUTES.bookAScan}
              withArrow
              analyticsEvent="cta_book_map_click"
              analyticsDetail={{ location: `demo_${id}_footer` }}
            >
              {CTAS.bookAutomationMap}
            </Button>
            <Link href={DEMO_SHARED.storyHref} className="qf-btn-ghost">
              {DEMO_SHARED.storyCta} →
            </Link>
          </div>
          <p className="qf-fg-not-proven">
            {demoPage.honesty} {PUBLIC_OFFER.scanNote}
          </p>
        </div>
      </Section>
    </>
  );
}
