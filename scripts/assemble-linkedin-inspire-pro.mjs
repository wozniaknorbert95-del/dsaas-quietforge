/**
 * Assemble INSPIRE LinkedIn pro clip from rendered QF slide frames.
 * Usage: node scripts/assemble-linkedin-inspire-pro.mjs
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const ffmpeg = ffmpegInstaller.path;

const FRAMES_DIR = path.join(root, 'docs/operations/media/inspire-slides/frames');
const OUT_DIR = path.join(root, 'docs/operations/media');
const TMP = path.join(OUT_DIR, 'inspire-tmp');

const SCENES = [
  { id: 'hook', duration: 5, kenBurns: false },
  { id: 'pivot', duration: 3, kenBurns: false },
  { id: 'hero', duration: 4, kenBurns: true },
  { id: 'intake', duration: 18, kenBurns: true },
  { id: 'confirm', duration: 6, kenBurns: true },
  { id: 'mockups', duration: 10, kenBurns: true },
  { id: 'wizard', duration: 5, kenBurns: true },
  { id: 'cta', duration: 5, kenBurns: false },
];

const FPS = 30;
const FADE = 0.28;
const OUT = path.join(OUT_DIR, 'linkedin-inspire-pro-9x16.mp4');

function run(args, label) {
  const r = spawnSync(ffmpeg, args, { stdio: 'inherit', cwd: root });
  if (r.status !== 0) {
    throw new Error(`ffmpeg failed: ${label}`);
  }
}

function buildVf(durationSec, kenBurns) {
  const frames = Math.ceil(durationSec * FPS);
  const fadeOutStart = Math.max(0, durationSec - FADE);
  const base = kenBurns
    ? `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x050608,zoompan=z='min(zoom+0.0006,1.015)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=1080x1920:fps=${FPS}`
    : `scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x050608,loop=loop=${frames - 1}:size=1:start=0,trim=duration=${durationSec},setpts=PTS-STARTPTS,fps=${FPS}`;
  return `${base},fade=t=in:st=0:d=${FADE},fade=t=out:st=${fadeOutStart.toFixed(3)}:d=${FADE},format=yuv420p`;
}

fs.mkdirSync(TMP, { recursive: true });

const clipPaths = [];

for (const scene of SCENES) {
  const png = path.join(FRAMES_DIR, `scene-${scene.id}.png`);
  if (!fs.existsSync(png)) {
    console.error('Missing frame:', png);
    console.error('Run: node scripts/render-inspire-slides.mjs');
    process.exit(1);
  }
  const clip = path.join(TMP, `${scene.id}.mp4`);
  run(
    [
      '-y',
      '-loop',
      '1',
      '-i',
      png,
      '-vf',
      buildVf(scene.duration, scene.kenBurns),
      '-t',
      String(scene.duration),
      '-c:v',
      'libx264',
      '-crf',
      '20',
      '-preset',
      'medium',
      '-an',
      '-r',
      String(FPS),
      clip,
    ],
    scene.id
  );
  clipPaths.push(clip);
  console.log(`clip ${scene.id} (${scene.duration}s)`);
}

const listFile = path.join(TMP, 'concat.txt');
fs.writeFileSync(
  listFile,
  clipPaths.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n'),
  'utf8'
);

run(
  [
    '-y',
    '-f',
    'concat',
    '-safe',
    '0',
    '-i',
    listFile,
    '-c:v',
    'libx264',
    '-crf',
    '20',
    '-preset',
    'medium',
    '-movflags',
    '+faststart',
    '-an',
    OUT,
  ],
  'concat'
);

const stat = fs.statSync(OUT);
const totalSec = SCENES.reduce((s, sc) => s + sc.duration, 0);
console.log(`\n✓ ${OUT}`);
console.log(`  ${(stat.size / 1024 / 1024).toFixed(2)} MB · ${totalSec}s`);

for (const p of clipPaths) {
  fs.unlinkSync(p);
}
fs.unlinkSync(listFile);
try {
  fs.rmdirSync(TMP);
} catch {
  /* ignore */
}
