import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { EXTERNAL, SITE_URL } from '@/lib/constants';
import { GRATKA } from '@/lib/gratka';
import { getCaseStudyBySlug } from '@/lib/case-studies';
import CaseStudyLayout from '@/components/casestudy/CaseStudyLayout';
import {
  salesFunnelAfterItems,
  salesFunnelArchitectureAlt,
  salesFunnelArchitectureIntro,
  salesFunnelBeforeItems,
  salesFunnelBuildDescription,
  salesFunnelCaseMeta,
  salesFunnelJourneySteps,
  salesFunnelOwnerEcosystemBridge,
  salesFunnelRoiFooter,
  salesFunnelRoiIntro,
  salesFunnelRoiRows,
  salesFunnelStack,
  salesFunnelStepsFootnote,
  salesFunnelWizardBridge,
  salesFunnelInspireBridge,
  SALES_FUNNEL_SLUG,
} from '@/content/sales-funnel-case-study';

export const metadata: Metadata = {
  title: salesFunnelCaseMeta.title,
  description: salesFunnelCaseMeta.description,
  openGraph: {
    title: salesFunnelCaseMeta.openGraphTitle,
    description: salesFunnelCaseMeta.openGraphDescription,
    url: `${SITE_URL}/results/sales-funnel`,
    images: [
      {
        url: '/og/results-sales-funnel.svg',
        width: 1200,
        height: 630,
        alt: salesFunnelCaseMeta.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: salesFunnelCaseMeta.openGraphTitle,
    description: salesFunnelCaseMeta.twitterDescription,
    images: ['/og/results-sales-funnel.svg'],
  },
};

export default function SalesFunnelCaseStudyPage() {
  const study = getCaseStudyBySlug(SALES_FUNNEL_SLUG);

  if (!study) {
    return null;
  }

  const downloadButtons = (
    <>
      <Button href={GRATKA.salesFunnelJourneySvg} target="_blank" rel="noopener noreferrer" variant="secondary">
        Journey diagram (SVG) ↓
      </Button>
      <Button href={GRATKA.salesFunnelJourneyPdf} target="_blank" rel="noopener noreferrer" variant="secondary">
        Journey map (PDF) ↓
      </Button>
      <Button href={GRATKA.salesFunnelRoiPdf} target="_blank" rel="noopener noreferrer" variant="secondary">
        ROI framing sheet (PDF) ↓
      </Button>
      <Button href={EXTERNAL.zzpackageWizard} target="_blank" rel="noopener noreferrer" variant="ghost">
        See the live wizard →
      </Button>
    </>
  );

  return (
    <CaseStudyLayout
      study={study}
      problemBefore={[...salesFunnelBeforeItems]}
      problemAfter={[...salesFunnelAfterItems]}
      architectureDiagramSvgUrl={GRATKA.salesFunnelJourneySvg}
      architectureDiagramAlt={salesFunnelArchitectureAlt}
      architectureDescription={
        <>
          <p className="mb-4">{salesFunnelArchitectureIntro}</p>
          <p className="mb-4 max-w-[var(--qf-maxw-narrow)] font-mono text-xs text-[var(--qf-text-faint)]">
            {salesFunnelStepsFootnote}
          </p>
          <Card className="qf-panel--spearhead mb-6 p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
              {salesFunnelWizardBridge.eyebrow}
            </p>
            <p className="mb-3 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
              {salesFunnelWizardBridge.title}
            </p>
            <p className="mb-4 max-w-[var(--qf-maxw-narrow)] text-sm text-[var(--qf-text-dim)]">
              {salesFunnelWizardBridge.lead}
            </p>
            <Button href={salesFunnelWizardBridge.href} target="_blank" rel="noopener noreferrer" variant="primary">
              {salesFunnelWizardBridge.cta}
            </Button>
          </Card>
          <Card className="mb-6 p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
              {salesFunnelInspireBridge.eyebrow}
            </p>
            <p className="mb-3 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
              {salesFunnelInspireBridge.title}
            </p>
            <p className="mb-4 max-w-[var(--qf-maxw-narrow)] text-sm text-[var(--qf-text-dim)]">
              {salesFunnelInspireBridge.lead}
            </p>
            <Button href={salesFunnelInspireBridge.href} variant="secondary" withArrow>
              {salesFunnelInspireBridge.cta}
            </Button>
          </Card>
          <Card className="mb-4 p-6">
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-[var(--qf-accent)]">
              {salesFunnelOwnerEcosystemBridge.eyebrow}
            </p>
            <p className="mb-3 text-[var(--qf-fs-lg)] font-bold text-[var(--qf-text)]">
              {salesFunnelOwnerEcosystemBridge.title}
            </p>
            <p className="mb-4 max-w-[var(--qf-maxw-narrow)] text-sm text-[var(--qf-text-dim)]">
              {salesFunnelOwnerEcosystemBridge.lead}
            </p>
            <Button href={salesFunnelOwnerEcosystemBridge.href} variant="ghost">
              {salesFunnelOwnerEcosystemBridge.cta}
            </Button>
          </Card>
        </>
      }
      buildModules={[...salesFunnelJourneySteps]}
      buildDescription={<p>{salesFunnelBuildDescription}</p>}
      stack={[...salesFunnelStack]}
      manifestKey="salesFunnel"
      videoKey="wizard"
      screenKey="wizardCheckout"
      downloadButtons={downloadButtons}
    >
      <h2 className="mt-8 text-[var(--qf-fs-xl)] font-bold tracking-tight mb-4">
        ROI framing — qualitative only
      </h2>
      <p className="mb-8 max-w-[var(--qf-maxw-narrow)] text-[var(--qf-text-dim)]">
        {salesFunnelRoiIntro}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--qf-border)]">
              <th className="py-3 pr-4 font-mono text-xs uppercase tracking-wider text-[var(--qf-warn)]">
                Manual quote
              </th>
              <th className="py-3 font-mono text-xs uppercase tracking-wider text-[var(--qf-ok)]">
                Self-service funnel
              </th>
            </tr>
          </thead>
          <tbody>
            {salesFunnelRoiRows.map((row) => (
              <tr key={row.manual} className="border-b border-[var(--qf-border)]">
                <td className="py-3 pr-4 text-[var(--qf-text-dim)]">{row.manual}</td>
                <td className="py-3 text-[var(--qf-text-dim)]">{row.selfService}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-none text-sm text-[var(--qf-text-faint)]">
        {salesFunnelRoiFooter}
      </p>
    </CaseStudyLayout>
  );
}
