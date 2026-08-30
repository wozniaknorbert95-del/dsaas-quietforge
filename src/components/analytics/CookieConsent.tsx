'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getStoredConsent,
  storeConsent,
  applyConsent,
  type ConsentDecision,
} from '@/lib/gtag';

/**
 * Cookie consent banner — GDPR/AVG.
 * Analytics stay 'denied' until the visitor explicitly accepts. The decision
 * is stored in localStorage and restored on later visits by GoogleAnalytics.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getStoredConsent()) {
      setVisible(true);
    }
  }, []);

  const decide = (decision: ConsentDecision) => {
    storeConsent(decision);
    applyConsent(decision);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="qf-cookie-consent"
    >
      <div className="qf-cookie-consent-inner">
        <p className="qf-cookie-consent-text">
          We use anonymous visitor statistics to understand which pages help small
          businesses. We do not sell data and no cross-site advertising runs here.
          You can change your choice anytime in your browser settings.
        </p>
        <div className="qf-cookie-consent-actions">
          <button
            type="button"
            className="qf-btn-ghost"
            onClick={() => decide('denied')}
          >
            Essential only
          </button>
          <button
            type="button"
            className="qf-btn-fill"
            onClick={() => decide('granted')}
          >
            Accept analytics
          </button>
        </div>
        <Link href="/legal/#cookies" className="qf-cookie-consent-link">
          Cookie policy
        </Link>
      </div>
    </div>
  );
}
