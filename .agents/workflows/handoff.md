---
description: Session anchor + /handoff workflow — services.flexgrafik.nl
updated: 2026-08-30
---

# SESSION ANCHOR — 2026-08-30

> **Live:** https://quietforge.flexgrafik.nl/  
> **Branch:** `main` @ `c1d1c1a`  
> **Deploy:** Vercel prod `dpl_9fQf6988xuANHRLREMpCThpEenua` · 56 routes · sitemap 27  
> **Następna sesja:** decyzje Dowódcy — smoke ✓ · quietforge.css legacy · lint pre-existing · sample report publiczny

---

## Co domknięte w bieżącej sesji (dead-code cleanup + deploy)

| Commit | Co |
|--------|-----|
| `f8ac6c2` | Kompleksowe czyszczenie martwego kodu + home sync — 18 martwych komponentów usuniętych łącznie, martwe exporty content (ecosystem/readiness/home-intent), ~13,7 kB martwego CSS, home STEPS/footer/OG/docs sync |
| `c1d1c1a` | Docs: rekord deployu + handoff |

**Build:** `npm run build` + `typecheck` PASS · 56 routes · HTTPS quietforge 200 ✅ · smoke wszystkich kluczowych route'ów ✅

Handoffs tej sesji: `docs/operations/handoffs/2026-08-30-approach-scan-690.md` · `2026-08-30-home-stale-data-sync.md` · `2026-08-30-dead-code-cleanup.md` · runbook `scan-delivery-runbook.md`

---

## Werdykt eksperta (dead-code cleanup)
Home i money-pages renderują się kompletnie po wycięciu martwych komponentów/CSS. Canon §Home zweryfikowany 1:1 z live. Lint: 3 błędy pre-existing (poza sesją). Decyzje otwarte: quietforge.css (legacy), sample report publiczny, lint fix.

---

# /handoff — workflow (template)

## Goal
Zamknąć sesję z kompletnym dokumentem stanu — co zmienione, co działa, co następne.

## Input
Wynik sesji (kod, deploy, decyzje).

## Do
1. Uruchom `npm run build` — zapisz wynik.
2. Uruchom `npm run typecheck` — zapisz wynik.
3. Zidentyfikuj wszystkie zmienione pliki (`git status --short`).
4. Określ SCOPE zmian (co zrobione, co nie).
5. Zanotuj DECYZJE podjęte w trakcie sesji.
6. Zanotuj BLOKERS (co zatrzymuje kolejne kroki).
7. Utwórz handoff doc w `docs/operations/handoffs/YYYY-MM-DD-[feature].md`.
8. **Zaktualizuj SESSION ANCHOR u góry tego pliku.**

## Handoff Template

```markdown
# Handoff: [Nazwa funkcjonalności]

## Context
[1-2 zdania co i dlaczego]

## Deliverables
[Co zostało zrobione — lista]

## Build Results
- `npm run build`: [PASS / FAIL — liczba stron]
- `npm run typecheck`: [PASS / FAIL]

## Files Changed
| File | Action |

## Decisions
| Decyzja | Uzasadnienie |

## Next Steps
1. [krok 1]
2. [krok 2]
```

## Don't
- Nie pomijaj build results.
- Nie commituj bez weryfikacji `npm run build`.
- Nie mega-diff — 1 sesja = IA lub 1 komponent.

## Done when
- [ ] SESSION ANCHOR zaktualizowany
- [ ] `docs/operations/handoffs/YYYY-MM-DD-[feature].md` istnieje
- [ ] Build PASS
