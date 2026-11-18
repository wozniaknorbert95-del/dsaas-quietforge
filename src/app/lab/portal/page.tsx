import type { Metadata } from 'next';
import DemoFrame from '@/components/demo/DemoFrame';
import { DEMO_PAGES, DEMO_SHARED } from '@/content/lab-demos';
import { ROUTES, SITE_URL } from '@/lib/constants';

const demo = DEMO_PAGES.portal;

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
 * Faithful replica of the original FlexGrafik portal homepage (front-page.php)
 * — the hub that routes to the three live tool replicas (Wizard, INSPIRE, Game).
 */
export default function LabPortalDemoPage() {
  return (
    <DemoFrame
      src="/demo/zzpackage/portal/"
      title="FlexGrafik Portal — werkende demo"
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
