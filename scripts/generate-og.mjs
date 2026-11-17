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

/** Wrap title into ≤2 lines of ~32 chars — never cut mid-word (42-char slice was truncating). */
function wrapTitle(text, max = 32, maxLines = 2) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  for (const word of words) {
    if (!line) {
      line = word;
    } else if (`${line} ${word}`.length <= max) {
      line += ` ${word}`;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length <= maxLines) return lines;
  const kept = lines.slice(0, maxLines);
  kept[maxLines - 1] = `${kept[maxLines - 1].slice(0, max - 1)}…`;
  return kept;
}

const titleLines = wrapTitle(title);
const titleSvg = titleLines
  .map((line, i) => `  <text x="80" y="${240 + i * 64}" fill="#e8e4df" font-family="monospace" font-size="48" font-weight="bold">${line}</text>`)
  .join('\n');

if (!existsSync(ogDir)) mkdirSync(ogDir, { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0e0c0a"/>
  <rect x="48" y="48" width="1104" height="534" fill="none" stroke="#3d3830" stroke-width="2"/>
  <text x="80" y="140" fill="#d4a574" font-family="monospace" font-size="28">${eyebrow}</text>
${titleSvg}
  <text x="80" y="520" fill="#8a8278" font-family="monospace" font-size="24">quietforge.nl</text>
</svg>`;

const out = join(ogDir, `${slug}.svg`);
writeFileSync(out, svg, 'utf8');
console.log(`Wrote ${out}`);
