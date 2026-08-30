# Handoff — honest about/languages claims (2026-08-30)

**Repo:** services.flexgrafik.nl · **Build:** `npm run build` ✅ (56 routes) · `npm run typecheck` ✅
**Status:** DEPLOYED ✅ (Vercel prod `dpl_DfpDn9Ge2crCYEgrGH7d9fvmfNYY`)

## Cel / Goal

Dowódca poprawił prawdę w copy o sobie — usunąć claimy sugerujące, że „systemy w produkcji na firmie klientów" lub że „mówi językiem każdej branży". Fakty: mówi EN + PL, pisze maile po NL, preferuje mail jako kanał. Lata 3 = nauka i budowa na własnych repo (nie klienci).

## Co zrobiono / What changed

- **In numbers** (About): usunięto linię `3 years running systems in production on my own company`.
- **In numbers**: `30 trades — I speak your industry's language and see patterns between them` → `30 trades — I see the patterns between them`.
- **In numbers**: `EN · PL · NL-basic — languages spoken by your industry` → `EN · PL · NL — spoken EN/PL · written NL (email)`.
- **Home About** (`page.tsx`): `Thirty trades taught me your industry's language` → `Thirty trades taught me how small businesses actually work`; `three years running my own company` → `three years building systems for my own company`.
- **About story** (`conversion-copy.ts`): `built in production, on a live business` → `learned on my own repositories and built a complete platform`.
- **How-it-works**: `modules that already run a live business` → `modules we already built and run for ourselves`.

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/conversion-copy.ts` | update (numbers + storyBody) |
| `src/app/page.tsx` | update (home About paragraph) |
| `src/app/how-it-works/page.tsx` | update (step 2 lead) |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass (56 routes)
rg 'industry&apos;s language|industry' src/   # 0 matches (stare claimy)
```

## Post-deploy smoke (Dowódca)

1. `/about/` — „30 trades — I see the patterns between them" + „EN · PL · NL — spoken EN/PL · written NL (email)" renderują się; stary claim „speak your industry" nie występuje.
2. `/` — home About: „Thirty trades taught me how small businesses actually work" + „three years building systems for my own company".
3. `/how-it-works/` — step 2: „modules we already built and run for ourselves".

## Następny krok / Next steps

- Dowódca: jeśli preferencja „wole drogę mailową" ma się przełożyć na UI (np. wzmocnienie maila kosztem WhatsApp w CTA), to osobna sesja — decyzja tutaj.
- Decyzje otwarte z poprzednich handoffów: `quietforge.css` (legacy), lint pre-existing (3 błędy), sample report publiczny.
