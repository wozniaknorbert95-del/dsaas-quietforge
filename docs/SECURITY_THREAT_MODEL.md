# SECURITY_THREAT_MODEL.md (SH-G1-05)

**Status:** v1 · 2026-11-18 · wiąże przed launchem komercyjnym (INSPIRE/WIZARD).
**Zasada:** endpoint generowania NIE może być prostym proxy do AI. 0 blockerów przed launch = wymóg auto-fail.

## 1. Threats i mitigacje
| # | Threat | Mitigacja (wymagana) |
|---|---|---|
| T1 | Prompt injection (treść użytkownika steruje modelem) | System prompt izolowany; walidacja długości/formatu wejścia; brak wykonywania instrukcji z inputu; cap tokenów |
| T2 | Malicious uploads (logo/foto) | Whitelist MIME + magic-bytes check; max rozmiar; rekompresja (strip EXIF/HTML); storage w R2 bez wykonywania; brak ścieżki usera w URL |
| T3 | Abuse endpointów (generowanie na koszt firmy) | Rate limits per IP/session/order/user; kolejka jobów; CAPTCHA/turnstile przy wzroście ruchu; abuse detection (anomalie kosztu) |
| T4 | Wyciek API keys | Klucze wyłącznie w env (Cloudflare Pages secrets); NIGDY w repo/front-end/logach; rotacja; osobne klucze test/live |
| T5 | Nieautoryzowane pobieranie cudzych plików | Signed URLs TTL (krótki) + order-scoped token; ownership check; brak publicznych bucketów; nieodgadywalne ID |
| T6 | Manipulacja order ID / payment status | Backend+Mollie = jedyne źródło prawdy; weryfikacja sygnatury webhooka; walidacja kwoty/produktu; frontend nigdy nie decyduje |
| T7 | Webhook spoofing | Weryfikacja sygnatury Mollie + deduplikacja (`paymentId+status`); ignore niezweryfikowanych |
| T8 | Niekontrolowany koszt AI | Budżet dzienny global + per order/session w kodzie; cap tokenów/parametrów generacji; hard stop po limicie; ledger kosztów |
| T9 | Dostęp do cudzych projektów | Project/Asset scoping do sesji/orderu; brak enumeracji; audyt access logów |
| T10 | Wyciek danych przez logi | Logi bez PII (maskowanie email/token); retencja logów; brak treści plików w logach |

## 2. Payment safety (Mollie)
Idempotency keys · unikalny order ID · deduplikacja webhooków · reconciliation (order vs payment) · timeout handling · refund workflow · pełny lifecycle statusów (patrz api-standard.md §4). **Podwójne obciążenie i podwójna generacja = niedopuszczalne.**

## 3. Abuse protection — stałe (w kodzie)
Rate limits: per IP 10/min · per session 30/h · per order 5 generacji · per user wg produktu. Upload: ≤10 MB, PNG/JPG/WEBP, magic-bytes. Generacja timeout 120 s, retry max 2 (koszt cap). Quota per order twarde.

## 4. Wymagania przed launch (gates)
- [ ] Wszystkie T1–T10 zaimplementowane + przetestowane (evidence)
- [ ] Pen-test podstawowy endpointów (walidacja, auth, ownership, rate limit)
- [ ] Secrets wyłącznie w env + rotacja procedura
- [ ] AVG: zgoda przed uploadem, retencja per typ (docs/quality/asset-lifecycle), delete webhook
- [ ] 0 critical security = auto-fail gate

## 5. Asset lifecycle (retencja)
Temporary generation ≤24 h · preview ≤7 dni · paid final 90 dni (regeneracja linku) · uploaded logo ≤90 dni · failed ≤24 h · logi 30 dni bez PII. Delete = natychmiastowy z R2 + KV (AVG).
