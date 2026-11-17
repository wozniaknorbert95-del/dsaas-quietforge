import type { Metadata } from 'next';
import DemoFrame from '@/components/demo/DemoFrame';
import { DEMO_PAGES, DEMO_SHARED } from '@/content/lab-demos';
import { ROUTES, SITE_URL } from '@/lib/constants';

const demo = DEMO_PAGES.wizard;

export const metadata: Metadata = {
  title: demo.meta.title,
  description: demo.meta.description,
  alternates: { canonical: `${SITE_URL}${demo.route}` },
  openGraph: {
    title: `${demo.meta.title} | Quietforge`,
    description: demo.meta.description,
    url: `${SITE_URL}${demo.route}`,
    images: [
      {
        url: demo.meta.ogImage,
        width: 1200,
        height: 630,
        alt: demo.meta.ogAlt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${demo.meta.title} | Quietforge`,
    description: demo.meta.description,
    images: [demo.meta.ogImage],
  },
};

/**
 * Faithful 1:1 replica of the original zzpackage.flexgrafik.nl Wizard —
 * the untouched original client-side app (JS/CSS/catalog) with the PHP/WooCommerce
 * layer stubbed; everything works, the order safely stops at "Afrekenen" (demo).
 * Source: docs/operations/plans/2026-11-17-zzpackage-replica-spec.md
 */
export default function LabWizardDemoPage() {
  return (
    <DemoFrame
      src="/demo/zzpackage/wizard/"
      title="FlexGrafik Wizard — werkende demo"
      heading={demo.title}
      lead={demo.lead}
      backHref={ROUTES.resultsFlexgrafik}
      backLabel={DEMO_SHARED.frameBackLabel}
      proofHref={ROUTES.proof}
      proofLabel={DEMO_SHARED.frameProofLabel}
      scanHref={ROUTES.bookAScan}
      scanLabel={DEMO_SHARED.frameScanLabel}
      loadingLabel={DEMO_SHARED.frameLoading}
      analyticsEvent="wizard_demo_click"
      analyticsDetail={{ location: 'lab_wizard_replica' }}
    />
  );
}
