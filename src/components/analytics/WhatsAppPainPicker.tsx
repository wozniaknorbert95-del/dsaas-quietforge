'use client';

import { useState } from 'react';
import { WHATSAPP, whatsappBookUrl, whatsappBookUrlWithLeak } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { DEFAULT_SCAN_SKU_ID, type ScanSkuId } from '@/content/scan';

const LEAKS = [
  { id: 'quotes', label: 'Quotes & orders' },
  { id: 'inbox', label: 'Inbox triage' },
  { id: 'leads', label: 'Missed leads' },
  { id: 'reporting', label: 'Reporting' },
] as const;

/**
 * A/B WhatsApp prefill (media plan P1-5): picking the biggest leak rewrites the
 * WhatsApp message ("My biggest time leak is …"). No pick = control message.
 * Measured via payment_link_click with/without the leak param.
 */
export default function WhatsAppPainPicker({
  location,
  skuId = DEFAULT_SCAN_SKU_ID,
}: {
  location: string;
  skuId?: ScanSkuId;
}) {
  const [leak, setLeak] = useState<string | null>(null);

  const href = leak ? whatsappBookUrlWithLeak(leak, skuId) : whatsappBookUrl(skuId);

  return (
    <div>
      <p className="qf-book-hero-cta-lead">
        My biggest time leak is…
      </p>
      <div className="flex flex-wrap gap-2">
        {LEAKS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="qf-intent-chip"
            data-active={leak === item.id}
            aria-pressed={leak === item.id}
            onClick={() => {
              setLeak(item.id);
              trackEvent('whatsapp_prefill_selected', { leak: item.id });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--qf-text-faint)]">
        Not sure yet? Just send the message as-is.
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent('payment_link_click', { location, ...(leak ? { leak } : {}) })
        }
        className="qf-book-fast-path mt-4"
      >
        {WHATSAPP.bookMapLabel} →
      </a>
    </div>
  );
}
