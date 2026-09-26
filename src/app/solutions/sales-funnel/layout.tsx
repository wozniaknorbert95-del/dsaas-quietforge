import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales Funnel Engine — quotes & bookings on autopilot',
  description:
    'A simple step-by-step flow that quotes, books and qualifies for you. Built-in logic, CRM integration, fewer emails. From €2,400. Book a paid Hours Engine Scan.',
  openGraph: {
    title: 'Sales Funnel Engine — quotes & bookings on autopilot',
    description:
      'A simple step-by-step flow that quotes, books and qualifies for you. Built-in logic, CRM integration, fewer emails.',
    images: ['/og/sales-funnel.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Funnel Engine — quotes & bookings on autopilot',
    description: 'A step-by-step flow that handles quotes, bookings and qualifying.',
    images: ['/og/sales-funnel.svg'],
  },
};

export default function SalesFunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
