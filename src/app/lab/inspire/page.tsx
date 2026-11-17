import type { Metadata } from 'next';
import DoorDemoPreview from '@/components/lab/DoorDemoPreview';
import { DEMO_PAGES } from '@/content/lab-demos';
import { SITE_URL } from '@/lib/constants';

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

export default function LabInspireDemoPage() {
  return <DoorDemoPreview id="inspire" />;
}
