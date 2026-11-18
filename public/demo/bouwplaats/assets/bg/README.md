# City background WebP (L1–L5) — S18

**Status:** **L1 Rotterdam LIVE** (3-layer parallax pilot). L2–L5: gradient skies.

**SSoT design:** [Figma Make — Game Background Design](https://www.figma.com/make/srYUHE0W2JJLswU1RLEmNn/Game-Background-Design)

Scope: `docs/screen-optimization/S18-L1-SCOPE-LOCK.md`

## L1 files (deployed)

| Layer        | File                                     |
| ------------ | ---------------------------------------- |
| sky          | `bg-level-1-rotterdam-sky.webp`          |
| farBuildings | `bg-level-1-rotterdam-farBuildings.webp` |
| silhouettes  | `bg-level-1-rotterdam-silhouettes.webp`  |

## L2–L5 (deferred)

3 layers per level — regenerate when wave expands.

## Regenerate

```bash
npm run sg:export-city-bg
```

Staging: `scripts/asset-pipeline/_staging/figma-make-v17/`
