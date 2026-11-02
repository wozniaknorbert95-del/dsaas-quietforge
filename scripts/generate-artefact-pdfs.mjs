import { mdToPdf } from 'md-to-pdf';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const stylesheet = join(__dirname, 'artefact-pdf.css');

const targets = [
  { dir: join(root, 'public', 'artefacts'), files: [
    'data-safety-playbook.md',
    'maintenance-handover.md',
  ]},
  { dir: join(root, 'public', 'gratka'), files: [
    'inbox-killer-before-after.md',
    'orchestrator-agent-card-sample.md',
    'orchestrator-workflow-map.md',
    'sales-funnel-journey-map.md',
    'sales-funnel-roi-framing.md',
    'advisory-scope-summary.md',
    'advisory-avg-layer.md',
    'advisory-delivery-timeline.md',
    'los-architecture.md',
    // Deprecated — stale WorkFlow layer; kept for external bookmarks only:
    // 'owner-ecosystem-map.md',
  ]},
];

for (const { dir, files } of targets) {
  for (const file of files) {
    const inputPath = join(dir, file);
    const outputPath = join(dir, file.replace(/\.md$/, '.pdf'));

    const pdf = await mdToPdf(
      { path: inputPath },
      {
        dest: outputPath,
        css: stylesheet,
        pdf_options: {
          format: 'A4',
          margin: { top: '20mm', right: '18mm', bottom: '20mm', left: '18mm' },
          printBackground: true,
        },
      }
    );

    if (!pdf?.filename) {
      throw new Error(`Failed to generate PDF for ${file}`);
    }

    console.log(`Generated ${outputPath}`);
  }
}
