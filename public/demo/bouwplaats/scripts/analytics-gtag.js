// GA4 gtag configuration — FlexGrafik App
// Externalized from index.html for CSP compliance (script-src 'self')
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'wait_for_update': 500,
});
gtag('js', new Date());
gtag('config', 'G-0XN9Z7HS90', {
  anonymize_ip: true,
  send_page_view: false
});
