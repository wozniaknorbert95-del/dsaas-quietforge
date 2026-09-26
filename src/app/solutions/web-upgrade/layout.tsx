import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversion Web Upgrade — a site that converts',
  description:
    'A fast, modern, mobile-first website built to turn visitors into enquiries. Lead capture, GA4 tracking, no bloated builders. From €1,800. Book a paid Hours Engine Scan.',
  openGraph: {
    title: 'Conversion Web Upgrade — a site that converts',
    description:
      'A fast, modern, mobile-first website built to turn visitors into enquiries. Lead capture, GA4 tracking, no bloated builders.',
    images: ['/og/web-upgrade.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conversion Web Upgrade — a site that converts',
    description: 'A fast, modern website built to turn visitors into enquiries.',
    images: ['/og/web-upgrade.svg'],
  },
};

export default function WebUpgradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
