# ENTERPRISE PRODUCT ENGINEERING & AUTONOMOUS OPTIMIZATION PROGRAM v2
**Projekt Linear:** FLEXGRAFIK WIZARD INSPIRE (team QUI) · **Data:** 2026-11-18
**Standard wiążący:** recenzja enterprise „FLEXGRAFIK ZYJE" (Desktop) — 36 punktów, 5 warstw, fazy G0–G7.
**Filozofia:** nie automat produkujący commity, lecz **autonomiczny system inżynierski, który podnosi jakość i potrafi to udowodnić**. Build ≠ sukces. `done` bez evidence ≠ done.

## 5 warstw
1. **Product Intelligence** — audyt i diagnoza przed kodem; agent rozumie produkt.
2. **Engineering Excellence** — ADR, kontrakty API, job lifecycle, idempotency, testy E2E/wizualne/regresja.
3. **AI Quality & Economics** — output quality gate, cost tracking per order, budżety, retry, realna marża, KPI.
4. **Autonomous Governance** — atomic tasks, scope lock, Builder+Reviewer, L1–L4, stop conditions, evidence.
5. **Product Readiness** — DoE per demo, readiness score (100 pkt) + auto-fail gates, release gate.

## Fazy i bramki (G0→G7; kolejna faza startuje po spełnieniu KRYTERIÓW JAKOŚCI, nie po „technicznie zrobione")
- **G0 Discovery & Audit:** deep audit 4 demo (funkcje, błędy JS/API, martwe przyciski, UX, mobile, perf, zależności, rozbieżności UI-vs-real) + baseline + **DoE per demo**. Agent NIE przebudowuje.
- **G1 Quality Foundation:** ADR (A reuse / B minimal shared / C dedicated — decyzja z repo), standard API (success/error/requestId, validation, rate limits, idempotency, versioning), UX states (loading/success/error/recovery), lekki Design Quality Standard, framework testów (E2E+visual+gameplay), **SECURITY_THREAT_MODEL.md**, observability (requestId/orderId/cost), cost control layer, autonomy governance (opencode.json, Builder/Reviewer, scope lock, L1–L4).
- **G2 INSPIRE Productization:** customer journey 14 kroków, chat quality system (rola/prompt/pamięć/anty-halucynacje/kontrola jakości), generation job lifecycle (CREATED→PAYMENT_VERIFIED→QUEUED→PROCESSING→QA→COMPLETED + FAILED/RETRYING/CANCELLED/EXPIRED), **AI Output Quality Gate** (zgodność, kompozycja, logo deformacje, artefakty, rozdzielczość…), model Project→Versions→Generation→Asset, asset lifecycle+signed URLs+ownership, payment lifecycle Mollie (test) + idempotency + webhook dedup.
- **G3 INSPIRE Commercial Validation:** E2E jak klient (onboarding→chat→logo→generacja→płatność test→rezultat→download), cost/margin realny, mobile+visual QA, KPI baseline, **controlled launch gate** (score ≥90 + 0 blockerów).
- **G4 WIZARD Productization:** pipeline wektorowy + **profile produkcyjne** (sticker/decal/textile/vehicle/signage/large-format: bleed, margines, DPI, ścieżki), **SVG QA** (ścieżki, viewBox, clipping, punkty, render, PDF), kontrola brandingu (proporcje/kolory logo, warstwa, safe zone, wersja bez tła), INSPIRE-fed per produkt, Mollie.
- **G5 GAME:** **Automated Gameplay Regression Suite** (ukończalność, soft-locki, restart/pause, score, kolizje, input, audio, mobile), perf (FPS/input latency/memory), polish.
- **G6 PORTAL:** definicja funkcji biznesowej (jaka akcja i dlaczego) → journey → CTA/nawigacja/perf/a11y/branding.
- **G7 Ecosystem Polish:** `/results/flexgrafik/` (statusy LIVE/DEMO, copy z OK Dowódcy, OG, screeny), spójność cross-demo, SEO/metadata/analytics, final release gate.

## Autonomia (L1–L4) + pętla
- **L1** autonomous execution (analiza/poprawki/testy w scope taska) · **L2** controlled (architektura/shared/API/schema/deps → review) · **L3** restricted (payments/live keys/dane klientów/kosztowne generacje/deploy/destrukcyjne → NIE autonomicznie) · **L4** Commander (strategia/kanon/brand/ceny/obietnice/produkcja).
- Pętla: **SELECT→CONTEXT→PLAN→IMPLEMENT→TEST→REVIEW→VERIFY→EVIDENCE→COMMIT→NEXT**; brak przejścia dalej przy: niepełnych testach, regresji, critical/high review, niekompletnym evidence, niezadowolonej zależności.
- **Builder ≠ Reviewer** (niezależny review: scope, regresje, security, komplikacja, testy, acceptance).
- **SCOPE LOCK:** bez nowych funkcji bez uzasadnienia, bez ruszania unrelated, bez zmiany architektury bez ADR, bez deps bez uzasadnienia, bez zmiany kontraktu API bez zgody, bez usuwania funkcji „bo łatwiej od nowa".

## todo.json v2 (per demo + shared) — pola taska
id, title, objective, problem, priority, phase, scope, out_of_scope, files_allowed, files_forbidden, dependencies, risk_level, acceptance_criteria[], verification, test_plan[], dod[], rollback, evidence_required, review_required, autonomy_level, status, attempts, failure_reason, commit.
**Evidence standard:** UI=screen przed/po+viewporty · API=req/res+error · chat=zestaw rozmów+ocena · image=output+QA · payments=flow+statusy Mollie test · perf=pomiary · security=testy+0 blockerów · game=gameplay+video · SVG=walidacja+render+export.

## Readiness score (100) + auto-fail
Functionality 25 · UX/Visual 20 · AI/Output 15 · Security 15 · Performance 10 · Mobile/A11y 10 · Maintainability 5. ≥90 release candidate (0 blockerów). **Auto-fail:** critical security, nieprawidłowa płatność, brak download płatnego rezultatu, główna funkcja nie działa, generacja nie działa (INSPIRE/WIZARD).

## KPI (fundament decyzji)
First Action Rate · Chat Completion · Generation Start · Payment Conversion · Generation Success · First-pass Quality · Retry Rate · Refund Rate · Avg Cost/Order · Gross Margin/Order · Time to Result · Support Rate.

## Performance budget (wszystkie demo)
LCP ≤2,5 s · INP ≤200 ms · CLS ≤0,1 · JS payload per demo · 0 critical console · 0 unexpected failed requests · Game: FPS/input latency/memory.

## Decyzje Dowódcy (L4, blokujące)
ceny (mockup/wektor) · Mollie test-mode + OpenAI key w env · R2/KV binding · story-edit `/results/flexgrafik/` · unlock prod (Zasada 11) · podgląd mockupy (watermark vs paid).
