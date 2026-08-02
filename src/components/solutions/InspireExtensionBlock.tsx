import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { ROUTES } from '@/lib/constants';
import { CTAS } from '@/content/conversion-copy';
import { salesFunnelInspireExtension } from '@/content/sales-funnel-case-study';

type InspireExtensionBlockProps = {
  /** Hash landing target — results hub keeps `design-intake`; solutions uses `inspire`. */
  id?: string;
  /**
   * `outcome` — LI-R10 hub H2 (→ 48-hour quote).
   * `extension` — solutions money-page H2 (Complex Quote & Design Intake).
   */
  headingMode?: 'outcome' | 'extension';
  /** Hub ladder: secondary deep-link to solutions `#inspire`. */
  showSolutionLink?: boolean;
  mapAnalyticsLocation?: string;
};

/**
 * Complex Quote & Design Intake (INSPIRE) — shared proof block.
 * SSoT: `salesFunnelInspireExtension`.
 */
export default function InspireExtensionBlock({
  id,
  headingMode = 'extension',
  showSolutionLink = false,
  mapAnalyticsLocation = 'inspire_extension',
}: InspireExtensionBlockProps) {
  const inspire = salesFunnelInspireExtension;
  const heading = headingMode === 'outcome' ? inspire.outcomeTitle : inspire.title;
  const lead = headingMode === 'outcome' ? inspire.outcomeLead : inspire.lead;
  const headingClass =
    headingMode === 'outcome'
      ? 'text-[var(--qf-fs-2xl)] font-bold tracking-tight max-w-3xl'
      : 'text-[var(--qf-fs-xl)] font-bold tracking-tight';

  return (
    <div id={id}>
      <Eyebrow>{inspire.eyebrow}</Eyebrow>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className={headingClass}>{heading}</h2>
        <span className="inline-flex items-center rounded border border-[var(--qf-warn)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--qf-warn)]">
          {inspire.statusBadge}
        </span>
      </div>
      <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-fs-lg)] text-[var(--qf-text-dim)]">
        {lead}
      </p>
      <div className="mb-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {inspire.evidence.map((shot) => (
          <figure
            key={shot.src}
            className="overflow-hidden rounded-[var(--qf-radius)] border border-[var(--qf-border)] bg-[var(--qf-bg-inset)]"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={640}
              height={400}
              className="h-auto w-full"
              loading="lazy"
            />
            <figcaption className="px-3 py-2 font-mono text-xs text-[var(--qf-text-faint)]">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
            Flow
          </p>
          <ol className="space-y-2">
            {inspire.steps.map((step, i) => (
              <li key={step} className="flex gap-2 text-sm text-[var(--qf-text)]">
                <span className="font-mono text-[var(--qf-text-faint)]">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </Card>
        <Card className="border-[var(--qf-border)] p-6">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-warn)]">
            Limitations
          </p>
          <ul className="space-y-2">
            {inspire.limitations.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-[var(--qf-text-dim)]">
                <span className="shrink-0 text-[var(--qf-warn)]">·</span>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button href={inspire.demoHref} withArrow variant="secondary">
          {inspire.demoLabel}
        </Button>
        {showSolutionLink ? (
          <Button href={inspire.secondaryHref} withArrow variant="ghost">
            {inspire.secondaryLabel}
          </Button>
        ) : null}
        <Button
          href={ROUTES.bookDiscovery}
          withArrow
          analyticsEvent="cta_book_map_click"
          analyticsDetail={{ location: mapAnalyticsLocation }}
        >
          {CTAS.bookAutomationMap}
        </Button>
      </div>
    </div>
  );
}
