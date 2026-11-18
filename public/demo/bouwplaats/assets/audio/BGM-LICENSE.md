# Bouwplaats Chaos — Background Music License

## Track

| Field     | Value                                                    |
| --------- | -------------------------------------------------------- |
| Title     | **Bouwplaats Ambient Loop**                              |
| Files     | `bgm_loop.mp3`, `bgm_loop.ogg`                           |
| Duration  | ~24 s (seamless loop)                                    |
| Generator | `scripts/generate-bgm-loop.mjs` (ffmpeg lavfi synthesis) |

## Rights

**FlexGrafik Original — All rights reserved.**

- Composed and rendered in-repo for the Advergame lead magnet at `app.flexgrafik.nl`.
- No third-party samples, stems, or stock-library downloads are embedded.
- Synthesis uses procedural sine/brown-noise sources only (no copyrighted recordings).

## Usage

| Allowed                                         | Not allowed                                            |
| ----------------------------------------------- | ------------------------------------------------------ |
| Playback inside FlexGrafik Bouwplaats Chaos PWA | Redistribution as standalone music                     |
| Offline precache via service worker             | Re-licensing to third parties without written approval |

## Attribution

No external attribution required. Optional in-game credit: _Music — FlexGrafik Original_.

## Regeneration

```bash
npm run generate:bgm
npm run check:bgm
```

Commit regenerated assets when the script or filter graph changes.
