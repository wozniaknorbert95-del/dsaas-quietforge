/**
 * GA4 measurement — binding: docs/strategy/conversion-pipeline.md §10
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID in Vercel (format G-XXXXXXXXXX).
 *
 * Consent handling (GDPR/AVG): analytics are 'denied' by default and become
 * 'granted' only after explicit user consent stored under CONSENT_STORAGE_KEY.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

export const CONSENT_STORAGE_KEY = 'qf_consent_v1';

export type ConsentDecision = 'granted' | 'denied';

export function isGaEnabled(): boolean {
  return GA_MEASUREMENT_ID.length > 0;
}

function consentParams(analytics: ConsentDecision): Record<string, string> {
  return {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: analytics,
  };
}

/** Read the visitor's stored consent decision (if any). */
export function getStoredConsent(): ConsentDecision | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

/** Persist the visitor's consent decision. */
export function storeConsent(decision: ConsentDecision): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, decision);
  } catch {
    /* storage unavailable — noop */
  }
}

/** Push a consent update to gtag, queueing on dataLayer if gtag is not ready yet. */
export function applyConsent(decision: ConsentDecision): void {
  if (typeof window === 'undefined') {
    return;
  }
  const params = consentParams(decision);
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', params);
  } else {
    window.dataLayer.push(['consent', 'update', params]);
  }
}

export function gaPageView(pagePath: string): void {
  if (!isGaEnabled() || typeof window.gtag !== 'function') {
    return;
  }

  // send_page_view is false on initial config — config+page_path does not emit a hit.
  // Explicit page_view is required for GA4 to register traffic (Realtime + home card).
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function gaEvent(event: string, params?: Record<string, string>): void {
  if (!isGaEnabled() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', event, params);
}
