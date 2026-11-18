# API STANDARD — FLEXGRAFIK WIZARD INSPIRE (SH-G1-02)

**Status:** v1 · 2026-11-18 · wiąże wszystkie endpointy (chat/generate/checkout/webhook/asset).
**Cel:** JEDEN sposób obsługi błędów i bezpieczeństwa w całym ekosystemie — nie 4 różne per demo.

## 1. Envelope (wszystkie odpowiedzi)
```json
{ "success": true, "data": { }, "requestId": "req_...", "timestamp": "..." }
{ "success": false, "error": { "code": "GENERATION_FAILED", "message": "Generation could not be completed", "retryable": true }, "requestId": "req_..." }
```
- `error.code` = stały enum (UPPER_SNAKE); `retryable` jawnie; `requestId` zawsze (trace).

## 2. Wymagania per endpoint
| Wymaganie | Reguła |
|---|---|
| Input | JSON schema walidowany na wejściu (typy, zakresy, długości); odrzucanie nieznanego pola |
| Output | Envelope; pola camelCase; brak danych wrażliwych w logach/odpowiedziach |
| Error codes | `VALIDATION_ERROR · UNAUTHORIZED · PAYMENT_REQUIRED · PAYMENT_FAILED · GENERATION_FAILED · GENERATION_TIMEOUT · RATE_LIMITED · QUOTA_EXCEEDED · NOT_FOUND · CONFLICT · INTERNAL` |
| Auth | Order-scoped token (signed, TTL) dla generate/asset; webhook = signature Mollie; brak zgadywania ownership |
| Rate limits | per IP + per session + per order + per user; stałe w kodzie (patrz threat model) |
| Timeout | 10 s (checkout/webhook) · 120 s (generate async job, nie request) · 30 s (chat) |
| Retry | tylko `retryable:true`; idempotency key na POST (unikalny order/generation ID) — powtórka NIE generuje duplikatu kosztu |
| Idempotency | `Idempotency-Key` header; deduplikacja webhooków po `paymentId+status` |
| Logging | requestId/orderId/endpoint/status/duration/cost — bez PII |
| Versioning | `/api/v1/...`; zmiana kontraktu = L2 review + ADR |

## 3. Job lifecycle (generacje)
`CREATED → PAYMENT_VERIFIED → QUEUED → PROCESSING → QA → COMPLETED` + `FAILED · RETRYING · CANCELLED · EXPIRED`.
Status zawsze dostępny przez `GET /api/v1/jobs/:id` (polling frontu); frontend NIGDY nie jest źródłem prawdy o płatności ani stanie generacji.

## 4. Payment lifecycle (Mollie)
`created · pending · paid · failed · expired · cancelled · refund_requested · refunded · generation_unlocked · completed`.
Webhook: weryfikacja sygnatury → deduplikacja → zapis w KV → unlock. Kontrola zgodności: order=produkt, kwota, waluta.
