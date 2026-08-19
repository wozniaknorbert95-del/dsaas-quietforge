# Handoff — Home + systems polish (2026-08-19)

**Repo:** quietforge.flexgrafik.nl · **Build:** typecheck + build ✅ (49 routes)

## Cel / Goal

Profesjonalna polerka home + 6 spoke’ów: hierarchia, mniej powtórzeń, identity lock, a11y FAQ, CTA 44px.

## Co zrobiono

- Home: eyebrow **System builder · EU**, anti-position, labelled counter, 2–4 weeks, WhatsApp na końcu, bez „Agent proposes”
- Spoke: kompaktowy hero + badge, flow+kroki razem, ROI w CostOfInaction (bez drugiej sekcji euro), CTA band
- FAQ: `aria-controls`, `hidden`, focus ring
- Karty: bez translate-y (borders, not motion)
- TL;DR bez podwójnego „Typically gives back”

## Weryfikacja

```bash
npm run typecheck   # pass
npm run build       # pass
```

## Post-deploy smoke

1. `/` — eyebrow System builder, anti-position, 0 hours labelled
2. `/systems/quote-order-engine/` — TL;DR pod CTA, jedna tabela €40/h
3. FAQ klawiaturą (Enter otwiera)
4. WhatsApp min 44px
