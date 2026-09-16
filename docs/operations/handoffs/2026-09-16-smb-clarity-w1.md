# Handoff — SMB Clarity W1 (2026-09-16)

**Repo:** dsaas-quietforge · **Build:** `npm run typecheck` ✅ · `npm run build` ✅ (57 routes)

## Cel / Goal

Max-effect / min-complexity home clarity from external AUDIT: buyer knows in 5s what they buy, for whom, first step €690, FlexGrafik = lab proof.

## Co zrobiono / What changed

- Hero: quotes/leads/inbox + HITL; secondary **See live proof** → `/proof/`; dual-brand + honest microTrust
- Home flagships: Quote & Order, Inbox Triage, Lead Scout (dropped company-brain + ai-security from default)
- Proof: FlexGrafik OWNER-OPERATED REFERENCE narrative (before/system/now/not yet) + reference program
- Approach: first module 2–3 weeks + sample scan link
- FAQ: CRM change + EU data
- Canon/strategy site-map synced (SR-03)
- Audit archived to `docs/audits/2026-09-16/smb-clarity-external-audit.md`

## Pliki / Files

| File | Action |
|------|--------|
| `src/content/conversion-copy.ts` | HERO + CTAS.seeResults |
| `src/app/page.tsx` | hero/approach/proof/FAQ/metadata |
| `src/components/v2/IntentSystems.tsx` | FLAGSHIP_SLUGS ×3 |
| `docs/canon/site-map.md` | Home § SMB Clarity W1 |
| `docs/strategy/site-map.md` | §3 v7.1 |
| `docs/audits/2026-09-16/smb-clarity-external-audit.md` | new (from Desktop AUDIT.txt) |
| `docs/operations/SESSION-ANCHOR.md` | pointer |
| `docs/operations/handoffs/2026-09-16-smb-clarity-w1.md` | this file |

## Weryfikacja / Verification

```bash
npm run typecheck   # pass
npm run build       # pass (57 routes, sitemap 28)
```

## Strategy check

| Rule | Status |
|------|--------|
| Home order LOCKED | ✅ unchanged |
| Single L3 above fold | ✅ Book a scan |
| CSA positioning | ✅ eyebrow |
| Anti-chaos site-map | ✅ canon + strategy updated |
| Proof honesty (no fake clients) | ✅ OWNER-OPERATED REFERENCE |

## Post-deploy smoke (Dowódca)

1. `/` — H1 quotes/leads/inbox; CTA See live proof → `/proof/`
2. Systems default — 3 cards (quote, inbox, lead)
3. Proof — FlexGrafik story + reference program
4. Approach — first module wording + sample PDF link
5. FAQ — CRM + EU data present

## Następny krok / Next steps

- 14-day GA4 watch: `cta_book_map_click`, `book_discovery_view`, `intake_submit`
- Later only if flat: footer KVK/email; not `/nl/` or new landings
