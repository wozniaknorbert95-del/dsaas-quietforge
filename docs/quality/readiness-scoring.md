# ENTERPRISE READINESS SCORING (SH-G0-05)

**Status:** v1 · 2026-11-18 · wspólny dla 4 demo + ekosystemu. **Score jest dodatkiem do gate'ów, nigdy ich nie maskuje.**

## 1. Skala (100 pkt)
| Obszar | Pkt | Co mierzy |
|---|---|---|
| Functionality & Reliability | 25 | główne scenariusze E2E działają; stany; recovery; brak soft-locków |
| UX & Visual Quality | 20 | first-action <10 s; hierarchia; stany UX; spójność; visual regression |
| AI & Output Quality | 15 | QA gate; First-pass Quality Rate; retry rate; zgodność z briefem |
| Security | 15 | threat model T1–T10; auth/ownership; secrets; abuse protection |
| Performance | 10 | LCP ≤2,5 s · INP ≤200 ms · CLS ≤0,1 · budżet JS · 0 critical console |
| Mobile & Accessibility | 10 | 375/768/1280; WCAG podstawy; tap targets ≥44 px |
| Maintainability | 5 | brak niepotrzebnej złożoności; testy; dokumentacja; DRY |

## 2. Statusy
**90–100** Release candidate (przy 0 blockerów) · **80–89** ograniczone poprawki · **70–79** niegotowe do launchu · **<70** powrót do optymalizacji.

## 3. AUTO-FAIL (niezależnie od wyniku)
- Critical security issue
- Nieprawidłowa płatność (podwójne obciążenie, zły status, brak weryfikacji webhooka)
- Brak możliwości pobrania płatnego rezultatu
- Główna funkcja demo nie działa
- Generacja nie działa (INSPIRE/WIZARD)

## 4. Procedura pomiaru
1. Zbierz evidence wg standardu (todos/README.md) — testy, screenshoty, pomiary, logi.
2. Oceń każdy obszar (skala poniżej); uzasadnij punkt dowodem, nie opinią.
3. Sprawdź auto-fail checklistę.
4. Wynik zapisz w `docs/operations/readiness/<demo>-<data>.md` + baseline w audycie.
5. Release gate (L4): score ≥90 + 0 blockerów + sign-off Dowódcy.

## 5. Szczegóły ocen (minimum per próg)
- Functionality: 25 = wszystkie główne E2E zielone; −5 za każdy scenariusz główny częściowo; −15 za niekompletny kluczowy scenariusz.
- UX: 20 = first-action <10 s + 0 UX blockers + visual regression czyste; −5 za chaos w starcie / brak stanu.
- AI: 15 = QA gate wdrożony + First-pass ≥80%; −5 za brak gate; −10 za sprzedaż nieudanych outputów.
- Security: 15 = T1–T10 zamknięte; **0 za critical**; −5 za high.
- Perf: 10 = budżet spełniony; −2 za każdy przekroczony metric.
- Mobile/A11y: 10 = 3 viewporty + WCAG AA na głównych ścieżkach.
- Maintainability: 5 = brak duplikacji/nadmiarowej złożoności (min complexity principle).
