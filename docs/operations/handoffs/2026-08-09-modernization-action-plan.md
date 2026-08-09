# PLAN DZIAŁANIA: Modernizacja Witryny Quietforge (quietforge.flexgrafik.nl)

**Wersja:** 1.0  
**Data:** 2026-08-09  
**Autor:** Senior UX & Conversion Architect  
**Status:** DO ZATWIERDZENIA PRZEZ DOWÓDCĘ  
**Branch:** `arena/019fe4fa-services`  
**Baza kanoniczna:** `docs/canons/*-rules.md`, `docs/strategy/site-map.md` v6.0, `src/content/pricing.ts`, `src/content/proof.ts`, `src/content/ecosystem.ts`

---

## WSTĘP I KONTEKST STRATEGICZNY

### Cel dokumentu
Ten dokument jest **kompletnym, rygorystycznym planem modernizacji** całej witryny Quietforge. Przedstawia działanie **podstrona po podstronie, sekcja po sekcji**, z precyzyjnym wskazaniem plików do edycji, treści do wdrożenia, kryteriów **Definition of Done (DoD)** oraz weryfikacji typów TypeScript i budowy produkcyjnej.

### Zasady nadrzędne (NON-NEGOTIABLE)

| Zasada | Opis | Źródło |
|--------|------|--------|
| **Canon Cenowy** | Cennik **wyłącznie** z `src/content/pricing.ts`. Brak "utrzymania za €290". Managed Automation = €349–€890/mo. Automatyzacja Map = €290 (zaliczana). | SR-15, site-map §8, pricing.ts |
| **Problem → System → Effect** | Każda strona i sekcja realizuje ten schemat. Zero "AI-bełkotu" (revolutionize, seamless, unleash). Ton: **Cwany Cheater** — surowy, bezpośredni, konkretny. | MR-05, marketing-strategy §1–2 |
| **Zero Placeholders** | Wszystkie puste ramki wideo/makiety → realne zrzuty z `/public/gratka/` (np. `jadzia-commander-home.png`). Brak `[FILL:]` na produkcji. | proof.ts, MR-13, proof-rules |
| **Anti-Wapoware** | Tylko dowody: **PROVEN / DEMO / PLANNED** (z `proof.ts`). Żadnych wynalezionych metryk, klientów, uptime. | MR-13, MR-14, proof.ts |
| **Single L3 CTA** | Hero + każda sekcja: **jeden** primary CTA = "Book Automation Map". Brak "Email me" / "Contact" jako primary na zimnym trafiku. | SR-04, conversion-pipeline §3–4 |
| **Two-brand separation** | Quietforge = SMB B2B + investor bridge. FlexGrafik = live proof. Nigdy nie mieszać cen, аудиторii, pozycjonowania. | vision-system §2, SR-11 |
| **Human-in-the-loop** | Wszędzie: "you approve", "human gate", "nothing sends without you". Nigdy nie obiecywać pełnej autonomii. | MR-16, vision-system §7 |
| **Home Order LOCKED** | 7 sekcji w ścisłej kolejności (site-map §3 v6.0). Zmiana `page.tsx` = aktualizacja `site-map.md` §2 w tej samej sesji. | SR-01, SR-03, SR-17 |
| **Build Gate** | `npm run typecheck && npm run build` **musi przejść** przed każdym commitem. | brain.md §4, AGENTS.md §8 |

---

## I. ANALIZA STANU BIEŻĄCEGO (AS-IS)

### Repozytorium — stan git (2026-08-09)
```
Branch: arena/019fe4fa-services
Modified:
  - docs/operations/SESSION-ANCHOR.md
  - public/sitemap.xml
  - src/lib/nooa/ExecutionEngine.ts
  - src/lib/nooa/PerformanceTracker.ts
  - src/lib/nooa/agents/ConversionRetentionAgent.ts
  - src/lib/nooa/agents/OptimizationStrategyAgent.ts

Untracked (nowe z ostatniej sesji Growth OS):
  - docs/operations/handoffs/2026-08-09-growth-os-production-hardening.md
  - src/app/api/growth-os/ledger/route.ts
  - src/lib/mollie.ts
```

### Ostatni handoff
**Growth OS Production Hardening (2026-08-09)** — zrealizowano: API ledger, Mollie integration, type-safety, marketing canon compliance. **Następne kroki Dowódcy:** ustawienie `MOLLIE_API_KEY`/`MOLLIE_WEBHOOK_SECRET` w Vercel, webhook endpoint, deploy `/growth-os/`.

### Rozbieżności kanoniczne wykryte
1. **`src/content/ecosystem.ts` linie 57–68**: `HOME_SECTIONS` pokazuje wersję v5.0 (11 sekcji w tym `VcmsTrustStrip`, `WizardVisualizerCompact`, `BuiltVsPlanned`), a `site-map.md` §3 v6.0 nakazuje **7 sekcji** (bez VCMS strip, Wizard visualizer, BuiltVsPlanned na home).
2. **`src/app/page.tsx`** aktualnie importuje i renderuje: `HeroSection`, `PainGrid`, `IntentRouter`, `JadziaSpearhead`, `WhyItWorks`, `Pricing`, `FinalCtaBand` — to **zgodne z v6.0**, ale `ecosystem.ts` nie zsynchronizowany.
3. **Brakujące OG images** dla nowych tras: `/growth-os/`, `/api/growth-os/ledger` (choć API nie wymaga OG).
4. **`/results/whatsapp-discovery-pilot/`** — nadal publiczna, a site-map §5 nakazuje `noindex` i usunięcie z sitemapy dopóki nie będzie kompletna.

---

## II. PLAN MODERNIZACJI — PODSTRONA PO PODSTRONIE

---

### 1. `/` (HOME) — 7 SEKCJI KANONICZNYCH (site-map §3 v6.0)

#### Pliki do edycji/weryfikacji:
- `src/app/page.tsx` — kompozycja główna
- `src/components/home/HeroSection.tsx`
- `src/components/home/PainGrid.tsx`
- `src/components/home/IntentRouter.tsx`
- `src/components/home/JadziaSpearhead.tsx`
- `src/components/home/WhyItWorks.tsx`
- `src/components/sections/Pricing.tsx` (home variant)
- `src/components/home/FinalCtaBand.tsx`
- `src/components/layout/SectionProgress.tsx`
- `src/components/layout/StickyCta.tsx`
- `src/components/home/IntentFilterSticky.tsx`
- `src/components/home/HomeIntentBoundary.tsx`
- `src/content/ecosystem.ts` — **AKTUALIZACJA `HOME_SECTIONS` do v6.0**
- `docs/strategy/site-map.md` — §3 v6.0 (już poprawne, potwierdzić)

#### Szczegółowy plan sekcji:

| # | Sekcja | Komponent | Zadanie szczegółowe | Ból (Problem) | Rozwiązanie (System) | Efekt (Effect) | Dowód (Proof) |
|---|--------|-----------|---------------------|---------------|----------------------|----------------|---------------|
| 1 | **Hero** | `HeroSection` | • Eyebrow: `// Conversion Systems Architect for NL small business`<br>• H1: "Conversion systems that qualify leads, reduce admin and keep humans in control."<br>• Lead: "For Dutch small businesses tired of manual quotes, inbox chaos and sites that do not become pipeline."<br>• **CTA band w first viewport (mobile)**: Primary "Book Automation Map" (€290, credited), Secondary "See live systems", Tertiary "Ask on WhatsApp"<br>• Proof strip: "Ops cockpit live · modules with honest status · you approve"<br>• Proof visual: **`/gratka/jadzia-commander-home.png`** (Commander Start) | Brak jasności: "co to za firma?" | Nazwa roli + outcome + dual-brand 1-liner | 5-sekundowa klarowność + L3 CTA above fold | Jadzia Commander screenshot (LIVE) |
| 2 | **Pain Router** | `PainGrid` + `IntentFilterChips` | • 9 kart bólu z `ecosystem.ts:PAIN_GRID` (quotes, site, leads, inbox, ops-blind, ops-brief, publish, drift, agent-queue)<br>• 5 chips intencji (Time, Money, Calm, Team, Order) — **sticky na mobile**<br>• Filtrowanie: dim niepasujących, nie ukrywaj<br>• `?intent=` shareable URL<br>• Clear filter + "See modules ↓" scroll do IntentRouter | "Czy to mój problem?" | Rozpoznawanie wycieku + konkretny fix w jednej karcie | Intent filtering → przejście do modułów | CostLine (np. "~12h/week lost to triage") |
| 3 | **Intent Router** | `IntentRouter` | • ≥7 kart modułów (wszystkie `homeVisible: true` z `ECOSYSTEM_REPOS` = 7, bez `flexgrafik-meta`)<br>• **Status badges** = home honesty (LIVE/PARTIAL/PLANNED z `homeStatusNote`)<br>• **Brak chips na home** (chips tylko w PainGrid i na `/solutions/`)<br>• Hierarchia: Business outcome → System name → Tech/repo<br>• CTA na karcie: "See proof" → `/results/{slug}/` | "Który moduł to naprawi?" | Produkcja modułów z honest statusem | Wybór modułu → case study | Status badges (LIVE/PARTIAL) |
| 4 | **Jadzia Spearhead** | `JadziaSpearhead` | • **JEDYNY flagship proof na home** (site-map §6 Spearhead rule)<br>• Operations Command + Marketing Brain **shadow F0–F3**<br>• HITL: "Commander picks one queued action; confirm before anything consequential"<br>• **Bez Act/autonomy claim** — "autonomy not offered"<br>• Screenshot: `/gratka/jadzia-commander-home.png` + `/gratka/jadzia-commander-data-health.png`<br>• CTA → `/results/jadzia-coi/` | "Czy to naprawdę działa w produkcji?" | Live COI Commander + Data Health (DTL) | Zaufanie do operational spine | Jadzia screenshots (LIVE ~93%) |
| 5 | **WhyItWorks** | `WhyItWorks` | • Metoda + bezpieczeństwo + sprzeciwy — **jeden H2**<br>• Problem→System→Effect w 3–4 krokach<br>• Objections z `TrustAndObjections` (4 nazwane sprzeciwy MR-09)<br>• Human-in-the-loop jako moat | "Czy to bezpieczne? Jak to działa?" | Proces: Map → Build → Handover → Run + HITL gates | Usunięcie ryzyka decyzyjnego | Process steps + objections handled |
| 6 | **Pricing (Home)** | `Pricing` (home variant) | • **Trzystopniowa ścieżka**: Map (€290) → Build (from €1,490 / €3,490) → Run (€349–€890/mo)<br>• "Most popular" badge na **Ecosystem/Multi-System**<br>• Ceny **wyłącznie z `pricing.ts`** (PRICING_MATRIX)<br>• Single System Build = from €1,490 (tylko gdy scope < named package)<br>• Credit line: "The €290 fee is credited toward your first build." | "Ile to kosztuje? Czy stać mnie?" | Transparentna matryca 3-krokowa | Decyzja o Mapie | Pricing matrix (kanoniczna) |
| 7 | **FinalCtaBand** | `FinalCtaBand` | • Silny L3: "Book Automation Map" + sample Map download<br>• Eyebrow: `// final step`<br>• No-pressure: "If there is nothing worth automating, you keep the Map and stop there." | "Co robię teraz?" | Jeden jasny next step | Konwersja na `/book-discovery/` | Sample Map PDF link |

#### Chrome Home (site-map §3):
- `SectionProgress`: Start → Pick → Proof → Close
- `StickyCta`: mobile only, po wyjściu hero z viewport
- Sticky mobile: **Book Automation Map** (filled) + **Ask on WhatsApp** (outline)
- Desktop primary CTA: **Book Automation Map**

#### Definition of Done (Home):
- [ ] `src/content/ecosystem.ts` → `HOME_SECTIONS` zaktualizowane do v6.0 (7 sekcji, bez VCMS/Wizard/BuiltVsPlanned)
- [ ] `src/app/page.tsx` renderuje **tylko** 7 sekcji kanonicznych (brak `VcmsTrustStrip`, `WizardVisualizerCompact`, `BuiltVsPlanned`, `DualBrandBand`, `FeaturedStrip`, `SystemMetrics` jako standalone)
- [ ] Hero: CTA band w first viewport na mobile (375px), proof strip z Jadzia screenshot
- [ ] PainGrid: 9 kart + 5 chips, filtrowanie dim-only, `?intent=` działa
- [ ] IntentRouter: 7 kart, status badges z `homeStatusNote`, brak chips
- [ ] JadziaSpearhead: screenshot Commander Start + Data Health, copy: "shadow F0–F3, HITL, autonomy not offered"
- [ ] WhyItWorks: 1 H2, 4 nazwane objections, HITL language
- [ ] Pricing: ceny z `PRICING_MATRIX`, 3-tier path, credit line
- [ ] FinalCtaBand: L3 Book Map + sample Map download
- [ ] `npm run typecheck && npm run build` → **PASS**
- [ ] `rg '\[FILL:' src/` → **0 matches**
- [ ] Mobile 375px: no horizontal overflow, sticky CTA appears after proof

---

### 2. `/solutions/` (HUB) + 5 PODSTRÓN OFERTOWYCH

#### Pliki do edycji:
- `src/app/solutions/page.tsx` — hub (już poprawny w strukturze, weryfikacja copy)
- `src/app/solutions/sales-funnel/page.tsx`
- `src/app/solutions/web-upgrade/page.tsx`
- `src/app/solutions/lead-magnet-game/page.tsx`
- `src/app/solutions/inbox-killer/page.tsx`
- `src/app/solutions/managed-automation/page.tsx`
- `src/lib/navigation.ts` — `SOLUTIONS_NAV` (SSoT dla nazw, badge, price, href)

#### Zasada rozgraniczania (site-map §3 Important naming fix):
| Pakiet | Public Label | Co to JEST | Co to NIE JEST | Cena |
|--------|--------------|------------|----------------|------|
| **Web Upgrade** | Website modernisation + lead capture | Trust site, clear CTAs, qualification-ready architecture | **NIE** = full portal agent, NIE = wizard checkout | €1,800–€5,500 |
| **Sales Funnel / Wizard Cash Engine** | Quote, price, checkout in one guided flow | Configurator, open pricing, Mollie checkout, optional Design Intake (INSPIRE) | **NIE** = prosta strona WWW | €2,400–€6,500 |

#### Szablon każdej podstrony ofertowej (Problem → System → Effect):
```typescript
// Sekcja 1: Hero ofertowy
Eyebrow: // [SOLUTION NAME]
H1: [Outcome-first headline, np. "End quote ping-pong with a guided configurator that shows price and lets clients pay"]
Lead: [Cost of inaction, max 2 zdania]
CTA: Primary "Book Automation Map" (L3) + Secondary "See live proof" (L1 → /results/{slug}/)
Proof visual: Screenshot z /gratka/ (wizard-checkout.png, inbox-lanes.png, lead-magnet-start.png, portal-assistant.png)

// Sekcja 2: Problem → System → Effect (Problem/System/Effect beats)
Problem: [Konkreten ból z PAIN_GRID]
System: [Co robi moduł — buyer language]
Effect: [Co się zmienia dla biznesu — konkretne outcome]
Status badge: LIVE/PARTIAL/PLANNED (z proof.ts)

// Sekcja 3: Scope examples (z PRICING_SCOPE_EXAMPLES)
• Przykład 1: [np. "Configurator + open pricing + Mollie checkout"]
• Przykład 2: [np. "Above + Complex Quote & Design Intake (INSPIRE pattern)"]

// Sekcja 4: Cena (kanoniczna z PRICING_MATRIX)
Range: €X,XXX–€X,XXX (lub €XXX–€XXX/mo dla Managed)
Credit line: "Automation Map €290 credited toward this build."

// Sekcja 5: Trust / Safety / HITL
Human-in-the-loop copy + AVG/DPA hint

// Sekcja 6: Final CTA
L3 "Book Automation Map" + sample Map download
```

#### Szczegóły per podstrona:

| Podstrona | Kluczowe rozróżnienie | Proof visual (gratka) | Status (proof.ts) | Cena (pricing.ts) |
|-----------|----------------------|----------------------|-------------------|-------------------|
| `/solutions/sales-funnel/` | **Spearhead** — quote→checkout, INSPIRE intake optional | `wizard-checkout.png`, `inspire/intake.png`, `inspire/mockups.png` | Wizard: LIVE (9-step) | €2,400–€6,500 |
| `/solutions/web-upgrade/` | **Capture** — trust site + wizard-first CTAs, supervised chat | `portal-assistant.png` | Portal: LIVE (generic chat), Qualification API: LIVE, UX: PARTIAL | €1,800–€5,500 |
| `/solutions/lead-magnet-game/` | **Selective** — register→play→reward→wizard bridge | 7-screen gallery (`lead-magnet-start.png`...`lead-magnet-conversion-handoff.png`) | LIVE (PWA, rewards, bridge, lead sync) | €2,200–€6,500 |
| `/solutions/inbox-killer/` | **Operate** — lanes + draft + HITL send gate | `inbox-lanes.png` | Test-env: 142 msgs/run, HITL send | €1,200–€4,800 |
| `/solutions/managed-automation/` | **Monthly** — Care/Manage/Partner tiers, no lock-in | `agent-os-mission-control.png` (admin dashboard) | LIVE (monitoring, fixes, brief) | €349–€890/mo |

#### Definition of Done (/solutions/ + 5 pages):
- [ ] Hub: poprawne nazwy, badge, ceny z `SOLUTIONS_NAV` (rozdzielone Web Upgrade vs Sales Funnel)
- [ ] Każda podstrona: Problem → System → Effect arc, 1 H1, proof visual z `/gratka/`
- [ ] Ceny **tylko** z `PRICING_MATRIX` / `SOLUTION_DETAIL_PRICES` — brak hardcoded
- [ ] Status badges: `LIVE`/`PARTIAL`/`PLANNED` zgodne z `proof.ts` (vcmsFeatureStatus, agentOsFeatureStatus, itd.)
- [ ] INSPIRE pattern na sales-funnel: "Complex Quote & Design Intake" z mockups + handoff do Wizard
- [ ] Lead Magnet: 7-screen gallery z `leadMagnetGallery` (wszystkie `ready: true`)
- [ ] Managed Automation: 2 tiery (Care/Partner) z `PRICING_SCOPE_EXAMPLES.managedAutomation`
- [ ] `npm run typecheck && npm run build` → **PASS**

---

### 3. `/pricing/` — TRZYSTOPNIOWA ŚCIEŻKA + OBROTA WARTOŚCI

#### Pliki do edycji:
- `src/app/pricing/page.tsx` (aktualna wersja — **weryfikacja i doprecyzowanie**)

#### Stan obecny (analiza):
Strona ma dobrą strukturę (§A Hero, §B2 Product Tiers table, §B The Path 4 karty, §C Step 1 Map, §D Step 2 Build tables, §E Step 3 Run, §F Why priced this way, §G FAQ, §H Final CTA). **Wymaga doprecyzowania:**

1. **§B2 Product Tiers table** — upewnić się, że używa `PRODUCT_TIER_RANGES` (buyer ladder: Sales Funnel → Web Upgrade → Lead Magnet → Inbox → Managed) i `PRICING_SCOPE_EXAMPLES`
2. **§B The Path (4 karty)** — Map (€290) → Single Build (from €1,490) → Multi-System (from €3,490) → Managed (€349–€890/mo) — **spójne z site-map §8**
3. **§D Step 2 Build tables** — `SETUP_TIERS` musi używać `PRICING_MATRIX` ranges, nie `pricing.singleSystem` (który to legacy shape)
4. **Obrona wartości** — sekcja §F "Why it's priced this way" rozwinąć o: "Outcome not hours", "Governance patterns for SMB", "Proven before you buy"

#### Definition of Done (/pricing/):
- [ ] Wszystkie ceny wyłącznie z `src/content/pricing.ts` (`PRICING_MATRIX`, `PRICING_NUMBERS`, `PRODUCT_TIER_RANGES`, `PRICING_SCOPE_EXAMPLES`)
- [ ] Trzystopniowa ścieżka jasna: **Map (€290) → Build (from €1,490 / €3,490) → Run (€349–€890/mo)**
- [ ] "Most popular" badge na **Ecosystem / Multi-System Build** (nie na Single)
- [ ] Credit line widoczna w 3 miejscach: Hero, Step 1, Step 2
- [ ] Obrona ceny: 3 pillars (outcome-based, governance-for-SMB, proven-in-production)
- [ ] FAQ: 5 pytań (credited?, contracts?, why from?, monthly required?, usage costs?)
- [ ] Final CTA: L3 Book Map + sample Map download
- [ ] `npm run typecheck && npm run build` → **PASS**

---

### 4. `/how-it-works/` — PROCES + HUMAN-IN-THE-LOOP

#### Pliki do edycji:
- `src/app/how-it-works/page.tsx` (weryfikacja i uzupełnienie)

#### Stan obecny:
Dobra struktura: Hero → Architecture (LOS diagram) → Step 1 Map → Step 2 Build → Step 3 Run → Control Block (HITL) → Timeline → After Delivery → FAQ → Final CTA.

#### Wymagane uzupełnienia:
1. **Control Block (HITL)** — rozwinąć: konkretne gatunki (send gate, publish gate, deploy gate, spend gate) + "you always see what's happening and why"
2. **Timeline** — dodać realistyczne ramy: "Typical go-live within 2 weeks after Map — depends on access, approvals, scope. No 6-month black-box projects."
3. **After Delivery** — dodać: "Quarterly review of metrics and funnel performance when you want a structured check-in."
4. **Architecture diagram** — `LivingSystemDiagram` (interactive) z linkiem do `/founder/#system-diagram` i `/results/owner-ecosystem/#los`

#### Definition of Done (/how-it-works/):
- [ ] HITL Control Block: 4 konkretne gatunki (send, publish, deploy, spend) + "you approve every consequential action"
- [ ] Timeline: realistyczne ramy + "no 6-month projects"
- [ ] Architecture: interactive LOS diagram (variant="founder", defaultView="story") + linki do technical map
- [ ] Ceny w Step 3: `PRICING_MATRIX.managedAutomation.range` (€349–€890/mo)
- [ ] `npm run typecheck && npm run build` → **PASS**

---

### 5. `/results/` — HUB DOWODÓW + INTEGRACJA Z `/growth-os/`

#### Pliki do edycji:
- `src/app/results/page.tsx`
- `src/lib/case-studies.ts` — `CASE_STUDIES` (SSoT)
- `src/content/results-page.ts` — `resultsPageHero`, `resultsPageMeta`
- `src/components/results/FieldReports.tsx`
- `src/components/home/SystemMetrics.tsx`

#### Stan obecny:
- Hero + INSPIRE block + **Growth OS Cockpit section (hardcoded styling!)** + Case Studies grid (7 kart) + LOS diagram + FieldReports + SystemMetrics + Final CTA
- **Problem**: sekcja Growth OS ma hardcoded style (`bg-[#14151a]`, `text-[#ffb300]`) — **musi używać qf-* tokens / quietforge.css**

#### Wymagane zmiany:
1. **Growth OS section** — przenieść do komponentu `GrowthOsCtaSection.tsx` z design system tokens (`.qf-panel--spearhead` lub `.qf-section` + `.qf-container`), CTA → `/growth-os/`
2. **Case Studies** — każda karta: Problem / System / Effect / Status / Measurement (z `caseMeasurements` w `proof.ts`) + diagram SVG + gratka links (PDF/SVG download)
3. **INSPIRE block** — z `InspireExtensionBlock` (OK, shared SSoT)
4. **LOS diagram** — `GratkaDiagram` z `GRATKA.losArchitectureSvg` + download links
5. **FieldReports** — 3 self-reports z `proof.ts:fieldReports` (Wizard funnel, Inbox run, VCMS scan)
6. **SystemMetrics** — metrics z `proof.ts:metrics` (8 repos, 6 production-touching, 9 wizard steps, 167 SKUs, 5 game levels, 5 agent nodes, 142 msgs/scan, 8 integrations)

#### Definition of Done (/results/):
- [ ] Growth OS CTA section: **zero hardcoded colors**, używa `quietforge.css` tokens / `qf-*` classes
- [ ] 7 case study cards: Problem/System/Effect/Status/Measurement + diagram + gratka downloads
- [ ] Status badges: `LIVE`/`PARTIAL`/`PLANNED` z `proof.ts` (caseMeasurements ready: true)
- [ ] FieldReports: 3 zweryfikowane wpisy (verified: true)
- [ ] SystemMetrics: 8 metrics z `proof.ts:metrics` (repos, productionTouching, wizardSteps, skus, gameLevels, agentNodes, msgsPerScan, integrations)
- [ ] Final CTA: L3 Book Map
- [ ] `npm run typecheck && npm run build` → **PASS**

---

### 6. `/book-discovery/` — FORMULARZ REZERWACJI MAPY (€290)

#### Pliki do edycji:
- `src/app/book-discovery/page.tsx`
- `src/app/book-discovery/BookDiscoveryForm.tsx` (nowy lub edycja istniejącego)
- `src/app/api/intake/route.ts` (weryfikacja endpointu)

#### Stan obecny:
Strona ma dobrą strukturę: Hero (paid first step) → WhatsApp fast path → Sample Map → What you get → 3 steps → After Map → **Form (#request-slot)** → Email fallback → Quick questions.

#### **Krytyczne zmiany (conversion-pipeline §5, site-map §9):**
1. **Formularz musi odzwierciedlać komercyjne obietnice:**
   - Jeśli **płatność/kalendarz NIE LIVE**: submit button = `"Request my Automation Map slot"` (nie "Send enquiry")
   - Microcopy: `"If the fit is right, I'll send a payment link and available times within 24 hours."`
   - Page title: `"Request your Automation Map slot — €290, credited"`

2. **Pola formularza (wymagane 8):**
   1. Name
   2. Business name
   3. Email
   4. Website/link
   5. Biggest pain (select z 9 PAIN_GRID + "Other")
   6. Budget range: "€1,200–€5,000" / "€5,000–€15,000" / "€15,000+" / "Not sure yet"
   7. Preferred time zone / availability
   8. Optional notes

3. **Proof near form (wymagane):**
   - Sample Map download link
   - 3 bullets: co otrzymuje klient (Mapa, ROI, rekomendacja build/no-build)
   - Credit line: "The €290 fee is credited toward your first build."
   - No-pressure: "If there is nothing worth automating, you keep the Map and stop there."

4. **KvK Verification (nowe wymaganie):**
   - Dodatkowe pole: "KvK number (optional, for faster fit check)" — walidacja formatu NL
   - Jeśli podany → auto-fill nazwa firmy z KVK API (opcjonalnie, v2)

5. **WhatsApp deep link** — `WHATSAPP.bookMapUrl` z pre-fill: "Hi, I'd like to book an Automation Map slot. My business: [name], website: [url], biggest pain: [pain]"

#### Definition of Done (/book-discovery/):
- [ ] Submit button: **"Request my Automation Map slot"** (nie "Send enquiry")
- [ ] Microcopy payment link follows after fit check
- [ ] 8 wymaganych pól + opcjonalne KvK
- [ ] Proof block przy formularzu: sample Map + 3 bullets + credit line + no-pressure
- [ ] WhatsApp fast path z pre-filled message
- [ ] `npm run typecheck && npm run build` → **PASS**
- [ ] Form POST → `/api/intake` → email do `quietforge@flexgrafik.nl` (honeypot + rate-limit 3/10min/IP)

---

### 7. `/about/`, `/trust/`, `/founder/`, `/legal/`, `/blog/`

#### `/about/` — Formalny profil (footer only per site-map §2)
**Plik:** `src/app/about/page.tsx`
**Zmiany:**
- Hero: H1 z `ABOUT.heroTitle`, intro z `ABOUT.heroIntro`
- Story: `ABOUT.storyTitle` + `ABOUT.storyBody` (first person: "I built this to run my own business")
- Moat pillars: 3 karty z `ABOUT.moatPillars`
- Why: `ABOUT.whyTitle` + `ABOUT.whyBody`
- Principles: lista z `ABOUT.principles` (✓ checks)
- Link do `portfolio.flexgrafik.nl` (enterprise track) z jasnym rozróżnieniem
- Final CTA: L3 Book Map
- **Anti-positioning** (MR-03): "Not a web designer. Not an AI chatbot builder."

#### `/trust/` — Bezpieczeństwo, AVG, HITL
**Plik:** `src/app/trust/page.tsx` (weryfikacja)
- Safety items: 7 kart (HITL, service accounts, test inbox, EU data, logged, AVG/DPA, no lock-in) — **zgodne z marketing-strategy §6 risk reversal**
- Admin dashboard screenshot: `screens.adminDashboard` (ready: true, `/gratka/agent-os-mission-control.png`)
- AVG/DPA checklist: 6 kroków (scope, verwerkersovereenkomst, service accounts, EU hosting, HITL, handover logs/README)
- Playbook download: `ARTEFACTS.dataSafetyPlaybook` (PDF)

#### `/founder/` — System Diagram (interaktywny)
**Plik:** `src/app/founder/page.tsx`
- Hero: Founder story (first person)
- **Interactive LOS Diagram:** `LivingSystemDiagram variant="founder" defaultView="story"` (zastępuje video placeholder)
- 3 pillars: Built for real use, Single source of truth, Scalable without headcount
- Proof links: Results, Owner Ecosystem, Wizard Cash Engine
- Final CTA: L3 Book Map
- **Wymagane:** brak unfinished video placeholders (MR-16)

#### `/legal/` — Privacy, Terms, Contact
**Plik:** `src/app/legal/page.tsx` (weryfikacja)
- Privacy: data collected, usage, WhatsApp opt-in (90-day retention, deletion on request), GDPR rights
- Terms: payment (setup before work, monthly in advance), cancellation (7 days, retain data), liability (limited to 12mo fees)
- Contact email

#### `/blog/` — L1 Nurture
**Plik:** `src/app/blog/page.tsx` + `src/app/blog/[slug]/page.tsx`
- 3+ posty (Automation for small business, Digital transformation without jargon, Under the hood: Inbox Killer)
- Każdy post: category, date, excerpt, link do szczegółów
- Final CTA: L3 Book Map
- **Zero AI-bełkotu w treściach**

#### Definition of Done (utility pages):
- [ ] Wszystkie ceny z `pricing.ts` (jeśli występują)
- [ ] Proof status honest (LIVE/PARTIAL/PLANNED)
- [ ] `/founder/`: interactive LOS diagram, brak video placeholder
- [ ] `/trust/`: AVG/DPA checklist + playbook download
- [ ] `/legal/`: complete privacy + terms
- [ ] `/blog/`: 3+ posty, CTA Book Map
- [ ] `npm run typecheck && npm run build` → **PASS**

---

## III. ZADANIA POZIOMU SYSTEMOWEGO (CROSS-CUTTING)

### 1. Synchronizacja `ecosystem.ts` z `site-map.md` v6.0
**Plik:** `src/content/ecosystem.ts` linie 57–68
```typescript
// ZMIANA: HOME_SECTIONS z v5.0 (11 items) na v6.0 (7 items)
export const HOME_SECTIONS = [
  'HeroSection',
  'PainGrid',
  'IntentRouter',
  'JadziaSpearhead',
  'WhyItWorks',
  'Pricing',
  'FinalCtaBand',
] as const;

// HOME_SECTION_MARKERS — usunąć: VcmsTrustStrip, WizardVisualizerCompact, BuiltVsPlanned, DualBrandBand, FeaturedStrip, SystemMetrics
```

### 2. OG Images dla wszystkich tras publicznych (AGENTS.md §9)
**Skrypt:** `scripts/generate-og.mjs`
**Trasy wymagające OG (site-map §5 + nowe):**
- `/growth-os/` — nowa trasa (public cockpit)
- `/results/jadzia-coi/` — jeśli brak
- `/results/owner-ecosystem/` — jeśli brak
- Weryfikacja istniejących: home, solutions, pricing, book-discovery, how-it-works, results, founder, trust, legal, blog, 5 solution pages, 7 case studies

### 3. Sitemap & Robots (AGENTS.md §10)
**Skrypt:** `scripts/generate-sitemap.mjs` (uruchamiany przy buildzie)
- `public/sitemap.xml` — auto-regenerowany, priorytety per site-map §6
- `/results/whatsapp-discovery-pilot/` → **noindex, usunięte z sitemapy** (site-map §5)
- `robots.txt` — zaktualizowany

### 4. JSON-LD (AGENTS.md §11)
**Plik:** `src/app/layout.tsx`
- `Organization` (Quietforge, url: quietforge.flexgrafik.nl, founder: Norbert Wozniak)
- `Person` (Norbert Wozniak, founder, quietforge.flexgrafik.nl)
- `WebSite` (istniejące)

### 5. Design System Compliance (DESIGN-SYSTEM.md, ux-rules.md)
- **Max 8 Tailwind utils/element** — przekroczenie → wyciągnąć do `qf-*` w `quietforge.css`
- **Dark theme default** — CSS vars z `globals.css`
- **`prefers-reduced-motion`** — wszystkie animacje
- **Mobile-first** — tap targets ≥ 44px
- **Sharp corners** `--qf-radius: 2px`
- **Borders not shadows** — depth via `--qf-bg-raised`/`--qf-bg-inset`
- **One accent color** (amber `--qf-accent`)
- **Monospace everywhere** `--qf-mono`

### 6. Growth OS Section na `/results/` — refaktoryzacja styling
**Plik:** `src/app/results/page.tsx` linie 151–169
- Usunąć hardcoded: `bg-[#14151a]`, `border-[#2c2d30]`, `text-[#ffb300]`, `text-[#f1f1f1]`, `text-[#98999a]`, `bg-[#ffb300]`, `text-[#0b0c10]`
- Stworzyć komponent `src/components/results/GrowthOsCtaSection.tsx` używający `.qf-panel--spearhead` / `.qf-section` + tokens

---

## IV. DEFINITION OF DONE — KRYTERIA GLOBALNE (Każde zadanie)

| Kryterium | Weryfikacja |
|-----------|-------------|
| **TypeScript strict** | `npm run typecheck` → 0 errors, 0 `any` |
| **Build produkcyjny** | `npm run build` → PASS (38+ routes, static export do `dist/`) |
| **Zero placeholders** | `rg '\[FILL:' src/` → 0 matches |
| **Ceny kanoniczne** | Wszystkie ceny z `src/content/pricing.ts` (rg na hardcoded € w komponentach) |
| **Proof honest** | Status badges tylko PROVEN/DEMO/PLANNED z `proof.ts` |
| **Design system** | Max 8 utils/element, qf-* tokens, dark-first, reduced-motion |
| **Mobile 375px** | No horizontal overflow, sticky CTA after proof |
| **OG Images** | Wszystkie public routes mają `/og/*.svg` (1200×630) |
| **Sitemap** | `public/sitemap.xml` zaktualizowany, priorytety per §6 |
| **Accessibility** | Lighthouse A11y ≥ 95, focus visible, WCAG AA contrast |
| **Handoff** | `docs/operations/handoffs/YYYY-MM-DD-[feature].md` po sesji |

---

## V. KOLEJNOŚĆ REALIZACJI (ZALECANE BATCHE)

### Batch 1: Fundamenty (1–2 sesje)
1. **Sync `ecosystem.ts` HOME_SECTIONS → v6.0** + weryfikacja `page.tsx`
2. **OG Images** dla wszystkich tras (skrypt)
3. **Sitemap/Robots** regeneracja + whatsapp-pilot noindex
4. **JSON-LD** w `layout.tsx` (Organization + Person)
5. **Growth OS CTA section** refaktoryzacja na `/results/` (design system)

### Batch 2: Home + Solutions Hub (2–3 sesje)
1. **Home** — 7 sekcji: Hero, PainGrid, IntentRouter, JadziaSpearhead, WhyItWorks, Pricing, FinalCtaBand
2. **`/solutions/` Hub** — weryfikacja copy, rozdzielenie Web Upgrade vs Sales Funnel
3. **5 podstron ofertowych** — szablon Problem→System→Effect, proof visuals, ceny, status badges

### Batch 3: Money Pages (2–3 sesje)
1. **`/pricing/`** — doprecyzowanie 3-tier path, obrona wartości, FAQ
2. **`/how-it-works/`** — HITL Control Block (4 gatunki), Timeline, Architecture diagram
3. **`/book-discovery/`** — formularz 8 pól, submit button copy, proof block, KvK, WhatsApp pre-fill

### Batch 4: Proof + Utility (1–2 sesje)
1. **`/results/`** — Case studies z measurement, FieldReports, SystemMetrics, Growth OS CTA
2. **`/about/`**, **`/trust/`**, **`/founder/`** (interactive LOS), **`/legal/`**, **`/blog/`**

### Batch 5: Quality Gate & Deploy (1 sesja)
1. **Full audit:** `npm run typecheck && npm run build && npm run lint && npm run audit:links`
2. **Lighthouse CI** — Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95
3. **Mobile 375px** — no horizontal overflow, sticky CTA timing
4. **Handoff** dokumentacja
5. **Deploy** (Dowódca: Zasada 11 — manual only)

---

## VI. PLIKI DO UTWORZENIA / EDYCJI — PODSUMOWANIE

### Nowe pliki:
| Plik | Opis |
|------|------|
| `src/components/results/GrowthOsCtaSection.tsx` | Refaktoryzacja Growth OS CTA z design system tokens |
| `src/app/book-discovery/BookDiscoveryForm.tsx` | Nowy formularz 8 pól (jeśli nie istnieje) |
| `docs/operations/handoffs/2026-08-09-modernization-action-plan.md` | Ten dokument |

### Pliki do edycji (kluczowe):
| Plik | Zakres zmian |
|------|--------------|
| `src/content/ecosystem.ts` | `HOME_SECTIONS` → v6.0 (7 items), `HOME_SECTION_MARKERS` cleanup |
| `src/app/page.tsx` | Weryfikacja: tylko 7 sekcji kanonicznych |
| `src/components/home/HeroSection.tsx` | CTA band mobile-first, proof strip z Jadzia screenshot |
| `src/components/home/PainGrid.tsx` | 9 kart + 5 chips, dim-only filter, `?intent=` |
| `src/components/home/IntentRouter.tsx` | 7 kart, status badges z `homeStatusNote`, brak chips |
| `src/components/home/JadziaSpearhead.tsx` | Commander Start + Data Health screenshots, "shadow F0–F3, HITL, autonomy not offered" |
| `src/components/home/WhyItWorks.tsx` | 1 H2, 4 objections, HITL language |
| `src/components/sections/Pricing.tsx` (home variant) | 3-tier path, credit line, ceny z PRICING_MATRIX |
| `src/components/home/FinalCtaBand.tsx` | L3 Book Map + sample Map download |
| `src/app/solutions/page.tsx` | Hub: SOLUTIONS_NAV, rozdzielenie Web vs Sales |
| `src/app/solutions/sales-funnel/page.tsx` | Problem→System→Effect, wizard screenshots, INSPIRE, €2,400–€6,500 |
| `src/app/solutions/web-upgrade/page.tsx` | Trust site + wizard CTAs, portal-assistant.png, €1,800–€5,500 |
| `src/app/solutions/lead-magnet-game/page.tsx` | 7-screen gallery, reward bridge, €2,200–€6,500 |
| `src/app/solutions/inbox-killer/page.tsx` | Lanes + HITL send gate, inbox-lanes.png, €1,200–€4,800 |
| `src/app/solutions/managed-automation/page.tsx` | Care/Partner tiers, mission-control.png, €349–€890/mo |
| `src/app/pricing/page.tsx` | 3-tier path, Product Tiers table (PRODUCT_TIER_RANGES), obrona ceny |
| `src/app/how-it-works/page.tsx` | HITL 4 gatunki, Timeline realistyczny, LOS diagram interactive |
| `src/app/book-discovery/page.tsx` | Form 8 pól, submit "Request my Automation Map slot", proof block, KvK, WhatsApp pre-fill |
| `src/app/results/page.tsx` | GrowthOsCtaSection, Case studies z measurement, FieldReports, SystemMetrics |
| `src/app/about/page.tsx` | Anti-positioning, founder story first-person, portfolio.flexgrafik.nl link |
| `src/app/trust/page.tsx` | AVG/DPA checklist, playbook download, admin dashboard screenshot |
| `src/app/founder/page.tsx` | LivingSystemDiagram variant="founder" defaultView="story" |
| `src/app/legal/page.tsx` | Privacy + Terms complete |
| `src/app/blog/page.tsx` | 3+ posty, CTA Book Map |
| `src/app/layout.tsx` | JSON-LD: Organization + Person + WebSite |
| `public/sitemap.xml` | Auto-regenerowany (build script) |
| `scripts/generate-og.mjs` | OG images dla wszystkich tras publicznych |

---

## VII. NASTĘPNE KROKI DLA DOWÓDCY

1. **Przegląd i zatwierdzenie** tego planu (zmiany / uwagi / priorytetyzacja)
2. **Decyzja o Batch 1** — start od fundamentów (ecosystem.ts sync, OG, sitemap, JSON-LD, Growth OS refactor)
3. **Ustawienie `MOLLIE_API_KEY` + `MOLLIE_WEBHOOK_SECRET`** w Vercel (z poprzedniego handoff Growth OS)
4. **Konfiguracja webhook Mollie** w Dashboard: `https://quietforge.flexgrafik.nl/api/webhooks/mollie`
5. **Utworzenie `/api/webhooks/mollie/route.ts`** dla payment status → ledger sync

---

## VIII. ZASADY KOMUNIKACJI W TRAKCIE REALIZACJI

- **Jedna sesja = jeden batch = jeden moduł** (Zasada 1-1-1)
- **Po każdej sesji:** handoff w `docs/operations/handoffs/YYYY-MM-DD-[feature].md`
- **Build gate:** `npm run typecheck && npm run build` **musi przejść** przed commitem
- **Zero secrets** w repo — `.env.local` tylko lokalnie
- **Kod/komentarze = EN**, komunikacja z Dowódcą = PL
- **Flaga konfliktu:** jeśli canon vs implementacja → `KONFLIKT Z SR-XX` / `MR-XX` → stop i raport

---

**KONIEC PLANU**  
*Document ready for Commander review. Awaiting approval to proceed with Batch 1 execution.*

---

*Owner: Norbert Wozniak (Dowódca) · Generated: 2026-08-09 · Next action: Commander approval → Batch 1 kickoff*