/**
 * OG image template generator — writes SVG stubs for routes missing OG files.
 * Run: node scripts/generate-og.mjs [route-slug] [title] [eyebrow]
 * Example: node scripts/generate-og.mjs home "Conversion Systems Architect" "// Quietforge"
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ogDir = join(__dirname, '..', 'public', 'og');

const slug = process.argv[2] ?? 'home';
const title = process.argv[3] ?? 'Quietforge';
const eyebrow = process.argv[4] ?? '// Conversion Systems';

if (!existsSync(ogDir)) mkdirSync(ogDir, { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0e0c0a"/>
  <rect x="48" y="48" width="1104" height="534" fill="none" stroke="#3d3830" stroke-width="2"/>
  <text x="80" y="140" fill="#d4a574" font-family="monospace" font-size="28">${eyebrow}</text>
  <text x="80" y="240" fill="#e8e4df" font-family="monospace" font-size="48" font-weight="bold">${title.slice(0, 42)}</text>
  <text x="80" y="520" fill="#8a8278" font-family="monospace" font-size="24">quietforge.nl</text>
</svg>`;

const out = join(ogDir, `${slug}.svg`);
writeFileSync(out, svg, 'utf8');
console.log(`Wrote ${out}`);
