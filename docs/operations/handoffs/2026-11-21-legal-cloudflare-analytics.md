# Handoff — Legal: Cloudflare Web Analytics (2026-11-21)

## CO ROBIMY
Domknięcie decyzji D8: prawdziwe cookie/DPA copy + usunięcie martwego GA4/gtag/banneru z repo Quietforge.

## SHIPPED
- `/legal/#cookies` — Cloudflare Web Analytics, cookieless, bez banneru
- DPA sub-processors — Cloudflare (hosting + RUM), Resend (EU), bez Vercel/Google
- Usunięto: `GoogleAnalytics.tsx`, `CookieConsent.tsx`, `gtag.ts`, `gtag.d.ts`
- CSP w `config/site-routing.mjs` — GA/GTM out, `cloudflareinsights.com` in
- `trackEvent()` — tylko dev `console.info` (brak gtag bridge)

## NASTĘPNY KROK (Commander / osobna sesja)
- Opcjonalnie: zaktualizuj `brain.md`, `ga4-property-map.md`, `docs/canons/ops-rules.md` OR-01 pod D8
- Vercel: usuń `NEXT_PUBLIC_GA_MEASUREMENT_ID` z env prod/preview
- Jadzia INT-009: jeśli COI nadal czyta GA4 Quietforge — przełącz źródło na CF dashboard/API

## TESTY
lint + typecheck + build + `node --test tests/**/*.test.mjs` — PASS