---
description: Session anchor + /handoff workflow — services.flexgrafik.nl
updated: 2026-09-16
---

# SESSION ANCHOR — 2026-09-16

> **Live domain:** https://quietforge.flexgrafik.nl/lab/ — **STILL OLD (9 stages)** until Promote  
> **NEW build ready:** https://flexgrafik-services-git-main-wozniaknorbert95-dels-projects.vercel.app/lab/  
> **Branch:** `main` @ `bc527cd` (Lab ICP merge `1ab4b95` + deploy handoff)  
> **Cloud agent:** cannot `vercel login` / `workflow_dispatch` (403) / no `VERCEL_TOKEN`  
> **Następna sesja (LOKALNY AGENT):** weryfikacja · polerka · Promote/deploy kompleksowy — prompt na dole tego pliku

---

## Co domknięte w sesji cloud (Lab ICP)

| Commit | Co |
|--------|-----|
| `36e2eb5` | Lab: merge stages 07–09 → `platform-build` + buyer-safe copy |
| `1ab4b95` | Merge feature → `main` |
| `bc527cd` | Docs: prod promote blocker + SESSION-ANCHOR |

**Build (cloud):** `npm run typecheck` ✅ · `npm run build` ✅ · `npm run audit:lab` (local :3000) ✅  
**Prod domain:** blocked — needs Commander/local **Promote to Production** on `flexgrafik-services`

Handoffs: `docs/operations/handoffs/2026-09-16-lab-icp-platform-merge.md` · `2026-09-16-lab-production-deploy.md` · audit `docs/audits/2026-09-16/lab-platform-stages-merge-audit.md`

---

## Werdykt

Lab IA naprawione w kodzie (7 etapów, jeden projekt platformy, ICP oszczędności). Deploy kodu na `main` + git-main alias OK. Custom domain nieprzypięta do nowego Production — to jedyny bloker.

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
9. Jeśli sesja wymaga lokalnego follow-up (deploy / polerka / smoke prod) — **wklej lub zaktualizuj prompt w sekcji „PROMPT DLA AGENTA LOKALNEGO” na dole.**

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
- [ ] (jeśli dotyczy) prompt dla agenta lokalnego aktualny

---

# PROMPT DLA AGENTA LOKALNEGO

> Skopiuj blok poniżej 1:1 do lokalnego Cursor / OpenCode po pullu `main`.  
> Cel: weryfikacja → polerka → deploy kompleksowy na `quietforge.flexgrafik.nl`.

```text
MODE: executor lokalny (masz vercel login + sekrety) — QuietForge / dsaas-quietforge

## Kontekst (cloud już zrobił)
- Branch produkcyjny: `main` @ ~`bc527cd` (Lab ICP: stages 07+08+09 → jeden `platform-build` / `#stage-07`).
- Kod i git-main alias mają NOWĄ Lab (7 etapów, „Governed tenant platform”).
- `https://quietforge.flexgrafik.nl/lab/` nadal STARA (9 etapów) — Production domain nieprzypięta.
- Cloud NIE mógł: `npx vercel --prod`, Promote, `gh workflow run deploy.yml` (403).
- Canon: nie „DSAAS” / OPA / Cedar jako produkt na Lab; public EN; proof tiers uczciwe.
- Handoff: `docs/operations/handoffs/2026-09-16-lab-production-deploy.md`
- Audit: `docs/audits/2026-09-16/lab-platform-stages-merge-audit.md`
- Skills: `.agents/skills/verify` → `copy-polish-quietforge` → `design-review` → `ship` / `.agents/workflows/deploy-vercel.md` → `handoff`

## ZADANIE (kolejność twarda)

### A) Sync + weryfikacja
1. `git fetch origin && git checkout main && git pull origin main`
2. `npm ci` (jeśli trzeba) → `npm run typecheck` → `npm run build` — MUST PASS
3. `npm run lint` — zanotuj; nie blokuj na pre-existing archive warnings
4. Grep gate Lab:
   - `rg 'DSAAS|DSaaS|\\bOPA\\b|Cedar|DMN' src/content/lab.ts src/app/lab/ src/components/lab/` → 0
   - `rg "Agent OS UI / Mission Control|Tenant Platform Core|Extract the platform|Deploy the implementation business" src/content/lab.ts` → 0
   - milestony: dokładnie 7, last id `platform-build`
5. Lokalnie: `npm run start` + `AUDIT_BASE_URL=http://localhost:3000 npm run audit:lab` → PASS (7 stages, title Governed tenant platform)
6. Opcjonalnie: otwórz `/lab/#stage-07` i `/lab/#stage-09` (alias → `#stage-07`)

### B) Polerka (tylko jeśli coś failuje lub copy klei się / brzmi jak SaaS)
1. Uruchom skill `copy-polish-quietforge` na zmienionych stringach Lab
2. Skill `design-review` / szybki UI pass — bez redesignu; max 8 Tailwind utils; qf-* tokens
3. Minimalny diff; po polerce znowu typecheck + build
4. Commit conventional na `main` TYLKO jeśli są realne fixy (nigdy force-push)

### C) Deploy kompleksowy (projekt z domeną = flexgrafik-services)
Preferowana ścieżka (lokalny CLI, brain.md):
1. `npx vercel whoami` — musisz być zalogowany
2. `npx vercel link --project flexgrafik-services` (org: wozniaknorbert95-dels-projects)
3. Build już PASS → deploy Production:
   - `npx vercel --prod --yes`
   - ALBO jeśli repo używa `dist/`: `npx vercel dist --prod --yes` (jak w brain.md / deploy-vercel.md)
4. Alternatywa UI: Vercel → flexgrafik-services → Deployments → commit z Lab merge → **Promote to Production**
5. Alternatywa Actions: GitHub → Actions → „Deploy to Vercel” → Run workflow on `main`
   (napraw `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` jeśli workflow pada — historycznie FAIL)

### D) Post-deploy smoke (MUST na żywej domenie)
```bash
curl -sI https://quietforge.flexgrafik.nl/lab/ | head -5
curl -sL https://quietforge.flexgrafik.nl/lab/ | rg -c 'Governed tenant platform'   # >0
curl -sL https://quietforge.flexgrafik.nl/lab/ | rg 'qf-lab-stage-number">0[89]'     # expect 0
AUDIT_BASE_URL=https://quietforge.flexgrafik.nl npm run audit:lab
```
Ręcznie w przeglądarce:
1. `/lab/` — 7 etapów; ostatni = Governed tenant platform
2. `/lab/#stage-07` — Problem/Built/Effect (human-stop, jeden projekt)
3. `/lab/#stage-09` — ten sam card; hash rewrite na `#stage-07`
4. Sekcja platform chapter — 4 buyer-safe fakty; brak DSAAS/OPA
5. CTA Book a scan działa

### E) Zamknięcie sesji
1. Zaktualizuj `docs/operations/SESSION-ANCHOR.md` → DEPLOYED + URL + deployment id
2. Handoff `docs/operations/handoffs/YYYY-MM-DD-lab-prod-live.md` (build + smoke + deployment URL)
3. Zaktualizuj SESSION ANCHOR w `.agents/workflows/handoff.md`
4. Raport dla Dowódcy (PL, krótko): PASS/FAIL smoke · URL · co zablokowane

## STOP / NIE RÓB
- Nie cofaj merge 7 etapów z powrotem do 9
- Nie publikuj Mission Control / private platform repo jako public demo
- Nie nazywaj produktu „DSAAS” na Lab
- Nie deployuj jeśli typecheck/build fail
- Nie force-push `main`

## DONE WHEN
- [ ] quietforge.flexgrafik.nl/lab/ pokazuje 7 etapów + Governed tenant platform
- [ ] audit:lab na produkcji PASS
- [ ] SESSION-ANCHOR + handoff zaktualizowane
```
