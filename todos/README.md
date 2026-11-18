# TODOS — Single Source of Truth (Enterprise Program v2)

**Decyzja Dowódcy (2026-11-18):** Linear NIE jest źródłem prawdy (limit darmowy, zero dodatkowych kosztów).
**Autorytatywne SoT = `todos/*.json` w tym repo.** Linear (projekt P-QUI-5, QUI-266..278) = lekki widok/dashboard; nie dublować utrzymania. Każdy task todo ma stabilne ID; istniejące QUI mapowane poniżej.

## Pliki
- `_shared.json` — framework jakości (schema, autonomy L1–L4, evidence, gates, readiness score) + taski wspólne G1 (fundament) i G7 (ekosystem).
- `inspire.json` · `wizard.json` · `game.json` · `portal.json` — taski per demo (G0 audit+DoE → produktyzacja → walidacja → release gate).

## Schema taska (v2 — wiąże każdego agenta)
`id, title, objective, problem, priority(P0..P3), phase(G0..G7), scope, out_of_scope, files_allowed[], files_forbidden[], dependencies[], risk_level, autonomy_level(L1..L4), acceptance_criteria[], verification, test_plan[], dod[], rollback, evidence_required, review_required(bool), status(open|in_progress|blocked|done|failed), attempts, failure_reason, commit, linear_ref`

## Pętla autonomiczna (OpenCode `/demo-todo <plik>`)
`SELECT → CONTEXT → PLAN → IMPLEMENT → TEST → REVIEW → VERIFY → EVIDENCE → COMMIT → NEXT`
- **SELECT:** pierwszy `open` task z spełnionymi `dependencies` i najwyższym priority.
- **CONTEXT:** przeczytaj objective/problem/scope/files + powiązane docs/DoE; NIE zgaduj.
- **PLAN:** atomiczny plan w scope; jeśli wymaga wyjścia poza scope → STOP (L2/L4).
- **IMPLEMENT:** tylko `files_allowed`; SCOPE LOCK (bez nowych funkcji/unrelated/architektury bez ADR/deps bez uzasadnienia/zmiany kontraktu API/usuwania funkcji).
- **TEST:** `test_plan` + bramki repo (`npm run typecheck && npm run lint && npm run build`) + testy użytkowe/wizualne.
- **REVIEW:** niezależny `demo-reviewer` (Builder≠Reviewer): scope/regresje/security/komplikacja/testy/acceptance. `review_required=true` → bez review NIE done.
- **VERIFY+EVIDENCE:** `evidence_required` musi istnieć (screen przed/po, test output, logi, pomiar). **`done` bez evidence = zabronione.**
- **COMMIT:** branch `auto/<demo>`, commit z ID taska, wpis `commit`+`status=done`+evidence do todo.
- **NEXT:** dopiero gdy task naprawdę done; inaczej fix→retry; `attempts>=3` lub blocker → `status=blocked`+`failure_reason`+eskalacja.

## Autonomy levels
- **L1** execution: analiza/poprawki/refactor/testy w scope — autonomicznie.
- **L2** controlled: architektura/shared/API contract/schema/deps — wymaga review (demo-reviewer) przed done.
- **L3** restricted: payments/live keys/dane klientów/kosztowne generacje/deploy/destrukcyjne — **NIE autonomicznie**; eskalacja do Dowódcy.
- **L4** Commander: strategia/kanon/brand/ceny/obietnice/produkcja — tylko Dowódca.

## Stop conditions (eskalacja)
potrzebny sekret/klucz live · operacja płatnicza live · konflikt z kanonem · 3 nieudane próby · przekroczony budżet dzienny AI · regresja critical · brakujące dependency.

## Bramki jakości (fazy)
Kolejna faza startuje po spełnieniu **kryteriów jakości** (DoE + readiness), nie po „technicznie zrobione". Readiness score 100 (Functionality25/UX20/AI15/Security15/Perf10/Mobile-A11y10/Maintain5); ≥90 = release candidate przy 0 blockerów. **Auto-fail:** critical security · nieprawidłowa płatność · brak download płatnego rezultatu · główna funkcja nie działa · generacja nie działa (INSPIRE/WIZARD).

## Evidence standard
UI=screen przed/po+viewporty · API=req/res+error · chat=rozmowy+ocena · image=output+QA · payments=flow+statusy Mollie test · perf=pomiary · security=testy+0 blockerów · game=gameplay+video · SVG=walidacja+render+export.

## Mapowanie Linear (widok, nie SoT)
QUI-266=INS-G0-01 · QUI-267=WIZ-G0-01 · QUI-268=GAM-G0-01 · QUI-269=POR-G0-01 · QUI-270=SH-G0-05 · QUI-271=SH-G1-01 · QUI-272=SH-G1-02 · QUI-273=SH-G1-03 · QUI-274=SH-G1-04 · QUI-275=SH-G1-05 · QUI-276=SH-G1-06 · QUI-277=SH-G1-07 · QUI-278=SH-G1-08.
G2–G7: tylko w todo (Linear limit). `linear_ref` puste = brak mirroru.

## Uruchomienie
`opencode run "/demo-todo todos/inspire.json"` (agent demo-optimizer). Review: agent demo-reviewer. Produkcja deploy = ręczny krok Dowódcy (Zasada 11); preview auto.
