import type { Metadata } from 'next';
import DemoFrame from '@/components/demo/DemoFrame';
import { DEMO_PAGES, DEMO_SHARED } from '@/content/lab-demos';
import { ROUTES, SITE_URL } from '@/lib/constants';

const demo = DEMO_PAGES.inspire;

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
 * Faithful 1:1 replica of the original FlexGrafik INSPIRE design intake
 * (voertuigreclame-ontwerp) — original front (dtp-design-agent) with the AI
 * backend stubbed from the flexgrafik-inspire engine repo content.
 * Offerte submission safely stops at the demo modal (company offline).
 */
export default function LabInspireDemoPage() {
  return (
    <DemoFrame
      src="/demo/zzpackage/inspire/"
      title="FlexGrafik INSPIRE — werkende demo"
      heading={demo.title}
      lead={demo.lead}
      backHref={ROUTES.resultsFlexgrafik}
      backLabel={DEMO_SHARED.frameBackLabel}
      proofHref={ROUTES.proof}
      proofLabel={DEMO_SHARED.frameProofLabel}
      scanHref={ROUTES.bookAScan}
      scanLabel={DEMO_SHARED.frameScanLabel}
      loadingLabel={DEMO_SHARED.frameLoading}
    />
  );
}
