# API STANDARD — FLEXGRAFIK WIZARD INSPIRE (SH-G1-02)

**Status:** v1 · 2026-11-18 · wiąże wszystkie endpointy (chat/generate/checkout/webhook/asset).
**Cel:** JEDEN sposób obsługi błędów i bezpieczeństwa w całym ekosystemie — nie 4 różne per demo.

## 1. Envelope (wszystkie odpowiedzi)
```json
{ "success": true, "data": { }, "requestId": "req_...", "timestamp": "..." }
{ "success": false, "error": { "code": "GENERATION_FAILED", "message": "Generation could not be completed", "retryable": true }, "requestId": "req_...", "timestamp": "..." }
```
- `error.code` = stały enum (UPPER_SNAKE); `retryable` jawnie; `requestId` zawsze (trace); `timestamp` w obu wariantach (symetria).

## 2. Wymagania per endpoint (kontrakt)
| Endpoint | Input | Auth | Error codes (specyficzne) | Rate limit |
|---|---|---|---|---|
| `POST /api/v1/chat` | `{sessionId, message, locale, quickReplyId?, fieldUpdates?}` (max 4000 znaków) | order/session token | `VALIDATION_ERROR · RATE_LIMITED · QUOTA_EXCEEDED · GENERATION_TIMEOUT` | per IP 10/min · session 30/h |
| `POST /api/v1/generate` | multipart: brief JSON + logo + `Idempotency-Key` | order token (PAYMENT_VERIFIED) | `PAYMENT_REQUIRED · GENERATION_FAILED · GENERATION_TIMEOUT · QUOTA_EXCEEDED · CONFLICT (dup)` | per order wg produktu (hard max 5) |
| `POST /api/v1/checkout` | `{product, qty, locale, returnUrl}` | brak (publiczny) | `VALIDATION_ERROR · PAYMENT_FAILED · RATE_LIMITED` | per IP 10/min |
| `POST /api/v1/mollie/webhook` | Mollie body + sygnatura | signature (T7) | `UNAUTHORIZED · CONFLICT (dedup) · INTERNAL` | dedup `paymentId+status` |
| `GET /api/v1/asset/:id` | signed token (query) | order ownership (T5) | `UNAUTHORIZED · NOT_FOUND · EXPIRED` | per order 60/h |
| `GET /api/v1/jobs/:id` | — | order token | `NOT_FOUND · UNAUTHORIZED` | per order 60/h |

**Jedno źródło limitów:** per order = limit wg produktu (katalog produktów), **hard max 5 generacji/order** (cytowane w SECURITY_THREAT_MODEL §3 i observability §4). Pole kosztu zdarzenia = `cost` (jedna nazwa wszędzie).

### Wymagania globalne (wszystkie endpointy)
| Wymaganie | Reguła |
|---|---|
| Input | JSON schema walidowany na wejściu (typy, zakresy, długości); odrzucanie nieznanego pola |
| Output | Envelope; pola camelCase; brak danych wrażliwych w logach/odpowiedziach |
| Auth | Order-scoped token (signed, TTL) dla generate/asset/job; webhook = signature Mollie (T7); brak zgadywania ownership |
| Timeout | 10 s (checkout/webhook) · 120 s (generate = async job, nie request) · 30 s (chat) |
| Idempotency | `Idempotency-Key` header na POST; deduplikacja webhooków po `paymentId+status` |
| Logging | `requestId · orderId · projectId · endpoint · status · timestamp · duration · errorCode · model · cost` — bez PII (jedno źródło: observability §1) |
| Versioning | `/api/v1/...`; zmiana kontraktu = L2 review + ADR |

### Retry (jedno źródło: SECURITY_THREAT_MODEL §3)
Tylko `retryable:true`; **max 2** powtórki generacji; retry UI (3 próby) = 1 próba + 2 retry. Idempotency-Key na POST — powtórka NIE generuje duplikatu kosztu.

## 3. Job lifecycle (generacje)
`CREATED → PAYMENT_VERIFIED → QUEUED → PROCESSING → QA → COMPLETED` + `FAILED · RETRYING · CANCELLED · EXPIRED`.
Status zawsze dostępny przez `GET /api/v1/jobs/:id` (polling frontu); frontend NIGDY nie jest źródłem prawdy o płatności ani stanie generacji.

## 4. Payment lifecycle (Mollie)
`created · pending · paid · failed · expired · cancelled · refund_requested · refunded · generation_unlocked · completed`.
Webhook: weryfikacja sygnatury → deduplikacja → zapis w KV → unlock. Kontrola zgodności: order=produkt, kwota, waluta.
