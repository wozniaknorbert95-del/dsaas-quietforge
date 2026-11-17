import type { Metadata } from 'next';
import { DEMO_PAGES } from '@/content/lab-demos';
import { SITE_URL } from '@/lib/constants';

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
    <iframe
      src="/demo/zzpackage/wizard/index.html"
      title="FlexGrafik Wizard — werkende demo"
      className="qf-demo-frame"
    />
  );
}
