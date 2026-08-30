/**
 * Conversion analytics — thin wrapper for measurement events.
 * Binding: docs/strategy/conversion-pipeline.md §10
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
  | 'sample_scan_download';

export function trackEvent(event: AnalyticsEvent, detail?: Record<string, string>): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent('qf_analytics', {
      detail: { event, ...detail },
    })
  );

  if (process.env.NODE_ENV === 'development') {
    console.info('[analytics]', event, detail ?? '');
  }
}
