# PROGRAM — FlexGrafik Doors → żywe, płatne produkty (enterprise, min. złożoność)
**Data:** 2026-11-18 · **Status:** PLAN do akceptacji Dowódcy · **Sztab:** architekt / UX / payments / AI-graphics / DevOps / growth / compliance

## 0. Teza i zmiana paradygmatu
Dema przestają być „offline reference" — **INSPIRE wraca jako pierwszy płatny, żywy produkt** (klient płaci za mockupę), Wizard idzie tym samym torem (wektorowa grafika do druku per produkt, Mollie). Reszta (Game, Portal) = optymalizacja do poziomu pierwszorzędnego. Cel: **max efektu, min złożoności** — jeden backend, jeden pipeline AI, jedna bramka płatności, cztery autonomiczne todo.

## 1. Architektura docelowa (MIN复杂度)
**Front zostaje statyczny** (Cloudflare Pages, `output:'export'`, repliki 1:1 w `public/demo/`). Dochodzi **jedna warstwa serwerowa w TYM SAMYM projekcie Pages**: `functions/api/*` (Pages Functions — zero nowej domeny, zero CORS, sekrety w env Pages):
- `POST /api/checkout` → tworzy płatność **Mollie** (metadata: orderId, typ produktu, parametry generacji) → redirect
- `POST /api/mollie/webhook` → weryfikacja sygnatury → oznacza opłacone → zapis w **KV**
- `GET /api/order/:id` → status (polling frontu) → po opłaceniu unlock generacji
- `POST /api/generate` (tylko po opłaceniu) → **OpenAI gpt-image (edit)** z szablonem pojazdu + logo klienta → mockupa; wynik → **R2** (signed URL, TTL 30 dni)
- `POST /api/chat` → proxy LLM z **oryginalnym kontraktem pytań** (PHASE_FIELDS z engine) — UX chatu bez zmian, odpowiedzi realne; cap tokenów/dzień
- `POST /api/vectorize` (Wizard) → raster z gpt-image → **wektoryzacja (vtracer/imagetracer WASM)** → SVG + PDF (pdf-lib) → R2
**Reuse zamiast rebuild:** szablony pojazdów/logo z repo INSPIRE + theme jako inputy image-edit; oryginalny JS frontu (dtp-design-agent, wizard) zostaje — zmieniamy tylko warstwę danych (demo-boot → real API). Python engine NIE jest uruchamiany (min złożoność); jego assety i kontrakty = źródło.
**Uczciwość techniczna:** gpt-image generuje RASTER, nie SVG. „Wektor do druku" = pipeline raster→wektor + QA; oferujemy SVG+PDF z gwarancją zwrotu, jeśli nie drukowalne. Nie obiecujemy cudu.

## 2. Autonomia OpenCode (4 × todo.json)
- Pliki: `todos/inspire.json`, `todos/wizard.json`, `todos/game.json`, `todos/portal.json` — schemat jak repo `todo.json` (phases/tasks: id, title, type, description, effort, **dod[]**, deps, gates).
- Konfiguracja: `opencode.json` + agent `demo-optimizer` + komenda `/demo-todo <plik>`; pętla: wybierz task → implementuj → **bramki** (`typecheck && lint && build && testy` + dod taska + strategy/proof-check) → evidence → commit na `auto/<demo>` → PR → następny.
- **Stop conditions (eskalacja do Dowódcy):** potrzebny sekret/klucz live, płatności live, konflikt z kanonem, 3 nieudane próby, budżet dzienny przekroczony.
- **Bezpieczeństwo:** agent NIGDY nie dotyka kluczy live ani nie deployuje na produkcję (Zasada 11) — preview auto, prod = ręczny krok Dowódcy (lub jawny unlock). Test-mode Mollie/OpenAI do czasu unlocku.
- Raport: po każdym tasku evidence w todo (status done + commit + test output); dzienny podsumowanie w `docs/operations/autonomy-log.md`.

## 3. Plany per demo (zarys tasków → todo.json po akceptacji)
### INSPIRE (P1 — zarabia podczas testów)
1. **UX de-chaos:** start = JEDNA akcja (upload logo / start chat); sekcje drugorzędne (how-it-works, comparison, portfolio, FAQ) → accordion/poniżej foldu; sticky CTA minimalny; copy zostaje, kolejność i gęstość zmienione (mobile-first, cel: <10 s do pierwszej akcji).
2. **Realny chat:** `/api/chat` z kontraktem PHASE_FIELDS; cap tokenów; fallback na oryginalne chipy.
3. **Płatna generacja mockup:** wybór pakietu (2 mockupy) → Mollie → unlock → gpt-image edit (pojazd+logo) → podgląd + download (R2). Cena决策 Dowódcy (sugestia €19 incl. BTW).
4. **Jakość:** QA gate na output (kontrast, logo czytelne) + refund jeśli nie spełnia; watermark na podglądzie przed płatnością? (decyzja: podgląd darmowy low-res, full po płatności).
5. **Legal/AVG:** regulamin usługi cyfrowej, zgoda na upload, retencja 30 dni + delete, VAT incl.
### WIZARD (P2 — wektor do druku per produkt)
1. **INSPIRE-fed:** każdy produkt katalogu dostaje „wygeneruj grafikę do druku" → pipeline gpt-image → vectorize → SVG+PDF (R2) → Mollie per produkt (sugestia €39).
2. Checkout fizyczny zostaje demo-stop (na razie); **cyfrowy wektor = żywy płatny** (osobny SKU, poza min. €199 — decyzja Dowódcy).
3. QA wektora (ścieżki, CMYK-note, drukowalność) + refund guarantee.
### GAME (P3 — optymalizacja)
1. Wydajność (bundle 2,8 MB → lazy audio/level-assets), mobile touch QA, reduced-motion, a11y overlayów.
2. Handoff kupon → Wizard dopięty do żywego checkoutu wektora (gdy P2 live).
### PORTAL (P3 — optymalizacja)
1. UX start (hero + 1 CTA), lazy images, LCP <2,5 s, mobile overflow audit.
2. Linki do żywych produktów (INSPIRE paid) + spójny banner „live/demo" per door.

## 4. Ekonomia (unit math, do zatwierdzenia)
- Mockup pack €19: koszt gpt-image edit ~€0,3–1,0 + chat ~€0,05 + Mollie ~€0,3–0,6 + R2/KV ~€0,01 → **marża ~€17** → pokrywa narzędzia + zysk.
- Wektor €39: koszt ~€1–2 + fee → marża ~€36.
- **Cap dzienny** (np. €20/dzień AI) w kodzie Functions + alert; przekroczenie = stop generacji (nie agenta).
- Ceny incl. BTW 21%; EU OSS przy skali (notatka compliance).

## 5. Compliance / bezpieczeństwo
Mollie webhook signature verify; sekrety tylko env Pages (nigdy w repo/agent); uploady R2 TTL 30 dni + delete webhook; regulamin + privacy dla usługi płatnej (nowa podstrona `/legal/digital-service/`); refund policy jasna; AVG zgoda przed uploadem; test-mode do unlocku.

## 6. Kanon / story (z OK Dowódcy)
- `/results/flexgrafik/`: status INSPIRE → **LIVE (paid)**, reszta DEMO; dopisek „first door is back" (story L4-012 chroniona — edycja tylko z Twoim OK).
- MR-13/15: żywe płatności = realny traction, ale claimy komercyjne = Commander-only; metryki tylko z ledger.
- strategy-check + proof-check jako bramki autonomy.

## 7. Sekwencja
**F0 (decyzje+klucze, 1 sesja):** ceny, unlock test-mode, Mollie/OpenAI keys w env, R2/KV binding, zgoda na story-edit.
**F1:** Functions szkielet + Mollie test + R2 + chat proxy (wspólne, 1 todo `todos/_shared.json`).
**F2:** INSPIRE todo (autonomia) → preview → Twój QA → prod unlock.
**F3:** WIZARD todo (autonomia) → preview → QA → prod.
**F4:** GAME+PORTAL todo (autonomia, równolegle).
**F5:** polerka `/results/flexgrafik/` (spójne statusy, copy, OG, screenshoty Twoje).

## 8. Ryzyka → mitigacje
Jakość AI (QA gate+refund) · koszt runaway (cap w kodzie) · webhook spoof (signature) · static+functions interplay (test preview) · canon drift (bramki) · autonomia na prod (manual deploy) · VAT/OSS (próg + notatka).

## 9. todo.json — schemat (jak repo)
`{version, updated, demo, build_gate, autonomy:{branch, gates[], stop_conditions[], budget_cap_eur_per_day}, phases:[{id,name,priority,depends_on,tasks:[{id,title,type,description,effort,dod[],evidence:null,status:"open"}]}]}`

## 10. Decyzje Dowódcy (blokujące F0)
1. Ceny: mockup pack €? / wektor €? (sugestie €19/€39)
2. Unlock: Mollie **test-mode** + OpenAI key w env Pages (nigdy w repo) — tak/nie
3. R2 + KV binding na projekcie Pages — tak/nie
4. Story-edit na `/results/flexgrafik/` („first door is back") — OK?
5. Autonomia: preview auto + **prod manual** (Zasada 11) — potwierdź, lub jawny unlock prod
6. Podgląd mockupy: darmowy low-res watermark vs płatny od razu — wybór
