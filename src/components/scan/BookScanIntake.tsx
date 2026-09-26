'use client';

import { useState } from 'react';
import WhatsAppPainPicker from '@/components/analytics/WhatsAppPainPicker';
import BookDiscoveryForm from '@/app/book-discovery/BookDiscoveryForm';
import { formatEuro } from '@/content/pricing';
import {
  DEFAULT_SCAN_SKU_ID,
  SCAN_SKUS,
  scanVatLine,
  type ScanSkuId,
} from '@/content/scan';

export default function BookScanIntake() {
  const [skuId, setSkuId] = useState<ScanSkuId>(DEFAULT_SCAN_SKU_ID);

  return (
    <>
      <fieldset className="qf-scan-sku-fieldset">
        <legend className="qf-scan-sku-legend">Which scan</legend>
        <ul className="qf-scan-sku-grid">
          {SCAN_SKUS.map((sku) => {
            const selected = sku.id === skuId;
            const cardClass = selected
              ? 'qf-approach-card qf-compare-card--ours qf-scan-sku-choice'
              : 'qf-approach-card qf-scan-sku-choice';
            return (
              <li key={sku.id}>
                <label className={cardClass}>
                  <span className="qf-scan-sku-choice-row">
                    <input
                      type="radio"
                      name="scan-sku"
                      value={sku.id}
                      checked={selected}
                      onChange={() => setSkuId(sku.id)}
                    />
                    <span className="qf-approach-card-n">{sku.eyebrow}</span>
                  </span>
                  <span className="qf-approach-card-title">
                    {sku.name} · {formatEuro(sku.priceNet)}
                  </span>
                  <span className="qf-approach-card-body">{scanVatLine(sku)}</span>
                  <span className="qf-approach-card-body">{sku.youMustSend}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="qf-book-hero-cta">
        <p className="qf-book-hero-cta-title">Ready to book?</p>
        <p className="qf-book-hero-cta-lead">
          WhatsApp for the payment link, or the form below. I reply within one working
          day.
        </p>
        <WhatsAppPainPicker location="book_a_scan" skuId={skuId} />
        <a href="#request-slot" className="qf-btn-ghost">
          Prefer the form ↓
        </a>
      </div>

      <div id="request-slot" className="qf-scan-form-anchor">
        <BookDiscoveryForm skuId={skuId} />
      </div>
    </>
  );
}
