import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HashScroll from "@/components/layout/HashScroll";
import { BRAND_LOGO, CREATOR, EMAIL, LINKEDIN_URL, SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Quietforge — systems that give you back your time',
    template: '%s | Quietforge',
  },
  description:
    'Operating systems for small businesses — quotes, orders, inbox, reports. AI speed, engineering discipline, you approve.',
  keywords: [
    'small business operating systems',
    'SMB workflow automation',
    'quote to order automation',
    'inbox triage',
    'engineering discipline',
  ],
  authors: [{ name: 'Norbert Wozniak', url: `${SITE_URL}/about/` }],
  creator: 'Norbert Wozniak',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Quietforge',
    title: 'Quietforge — systems that give you back your time',
    description:
      'Quotes, orders, inbox, reporting — rebuilt as managed systems. Nothing live without your approval.',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'Quietforge — systems that give you back your time',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quietforge — systems that give you back your time',
    description: 'Operating systems for small businesses — you approve, we measure hours given back.',
    creator: '@flexgrafik',
    images: ['/og/home.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [{ url: BRAND_LOGO.src, type: 'image/png' }],
    apple: [{ url: BRAND_LOGO.src, type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Operating systems for small businesses — quotes, orders, inbox, reports. Human approval on every live step.",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      email: EMAIL,
      founder: { "@type": "Person", name: CREATOR },
      sameAs: [LINKEDIN_URL],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: CREATOR,
      jobTitle: "System builder for small businesses",
      url: `${SITE_URL}/about/`,
      worksFor: { "@type": "Organization", name: SITE_NAME },
      sameAs: [LINKEDIN_URL],
    },
  ];

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body data-app="services" className="min-h-full flex flex-col bg-[var(--qf-bg)] text-[var(--qf-text)]">
        <GoogleAnalytics />
        <HashScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
