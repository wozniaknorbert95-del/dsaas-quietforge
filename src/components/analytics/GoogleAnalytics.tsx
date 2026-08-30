'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import type { AnalyticsEvent } from '@/lib/analytics';
import { GA_MEASUREMENT_ID, CONSENT_STORAGE_KEY, gaEvent, gaPageView } from '@/lib/gtag';

interface QfAnalyticsDetail {
  event: AnalyticsEvent;
  [key: string]: string;
}

function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    gaPageView(pagePath);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handler = (raw: Event) => {
      const { event, ...params } = (raw as CustomEvent<QfAnalyticsDetail>).detail;
      gaEvent(event, params);
    };

    window.addEventListener('qf_analytics', handler);
    return () => window.removeEventListener('qf_analytics', handler);
  }, []);

  return null;
}

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Consent defaults MUST be queued before gtag.js loads. Analytics stay
          denied until the visitor grants consent via the CookieConsent banner. */}
      <Script id="qf-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          (function () {
            try {
              var stored = localStorage.getItem('${CONSENT_STORAGE_KEY}');
              if (stored === 'granted') {
                gtag('consent', 'update', {
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  analytics_storage: 'granted'
                });
              }
            } catch (e) {}
          })();
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="qf-google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsListener />
      </Suspense>
    </>
  );
}
