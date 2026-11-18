# OBSERVABILITY + COST CONTROL (SH-G1-06)

**Status:** v1 · 2026-11-18 · „produkt musi wiedzieć co się dzieje, zanim klient napisze, że zapłacił i nic nie dostał".

## 1. Struktura zdarzenia (każdy request/job)
`requestId · orderId · projectId · endpoint · status · timestamp · duration · errorCode · model · cost`
Logi bez PII (maskowanie email/token). Emitowane przez wszystkie `functions/api/*` (wg api-standard.md).

## 2. Monitoring (minimalny, wspólny)
Bramka alertowa: API errors · payment failures · webhook failures · generation failures · timeouts · retry storms · koszt AI · storage failures.
Cel: wykrycie awarii ZANIM zgłosi klient. Alerty → kanał Dowódcy (webhook/email).

## 3. Cost Control Layer (per generacja)
Zapis w KV ledger: `model · input (tokens/params) · output · cost · duration · retryCount · orderId · status`.
Agregacja → **realna marża per produkt** (nie szacunek!). Trigger alertu: koszt/order > próg; retryRate > próg.

## 4. Budżety (twarde, w kodzie) — jedno źródło liczb
| Poziom | Limit (start) | Zachowanie po przekroczeniu |
|---|---|---|
| Globalny dzienny AI | **€20** domyślnie (env `AI_DAILY_BUDGET_EUR`; finalną wartość ustala Dowódca — L4) | hard stop generacji (nie agenta), alert |
| Per order | wg produktu (katalog), **hard max 5 generacji** (SECURITY_THREAT_MODEL §3) | odrzucenie kolejnych generacji w orderze |
| Per session | **3 generacje** | throttling + komunikat |
| Alert koszt/order | **> €3** | alert do Dowódcy |
| Alert retry rate | **> 20%/dzień** | alert do Dowódcy |

## 5. KPI (fundament decyzji — nie intuicja)
First Action Rate · Chat Completion Rate · Generation Start Rate · Payment Conversion · Generation Success Rate · First-pass Quality Rate · Retry Rate · Refund Rate · Avg Cost/Order · Gross Margin/Order · Time to Result · Support Rate.
Baseline zbierany od startu G2; dashboard minimalny (arkusz/KV export), nie system monitoringu.

## 6. Implementacja (następny task po review tego doc)
`functions/api/_lib/observability.ts` (log+ledger emit) + KV binding; koszty liczone wg cen modeli (bieżące źródło + snapshot w ledgerze).
