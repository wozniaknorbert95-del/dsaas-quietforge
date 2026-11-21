/**
 * Conversion analytics hooks — client-only; no third-party tags on quietforge.nl
 * (site traffic is measured by Cloudflare Web Analytics at the edge).
 */

export type AnalyticsEvent =
  | 'cta_book_map_click'
  | 'cta_results_click'
  | 'cta_how_it_works_click'
  | 'cta_whatsapp_click'
  | 'cta_jadzia_proof_click'
  | 'sample_map_download'
  | 'wizard_demo_click'
  | 'case_study_open'
  | 'pricing_view'
  | 'pricing_variant_click'
  | 'reference_program_click'
  | 'blog_read'
  | 'about_section_scroll'
  | 'book_discovery_view'
  | 'book_payment_start'
  | 'book_payment_complete'
  | 'payment_link_click'
  | 'system_page_view'
  | 'whatsapp_prefill_selected'
  | 'intake_submit'
  | 'form_error'
  | 'sample_scan_download'
  | 'lab_timeline_select'
  | 'lab_external_demo_click'
  | 'lab_evidence_open';

export function trackEvent(event: AnalyticsEvent, detail?: Record<string, string>): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return;
  }

  console.info('[analytics]', event, detail ?? '');
}
