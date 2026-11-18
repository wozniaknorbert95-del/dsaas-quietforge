/**
 * SH-G1-03 render smoke test — realizes `test_plan: "render stanow"`.
 * Compiles src/components/ui/states/*.tsx (tsc, JSX → CJS) and renders every
 * component with react-dom/server renderToStaticMarkup — a component that
 * throws on render or emits empty markup fails here, not in production.
 * Run: node --test "tests/render/*.test.mjs"
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { rmSync, readdirSync } from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ROOT = path.resolve(import.meta.dirname, '..', '..');
const STATES_DIR = path.join(ROOT, 'src', 'components', 'ui', 'states');
// Must live inside the repo so compiled CJS resolves react/lucide-react from node_modules.
const outDir = path.join(ROOT, 'tests', 'render', '.tmp-out');
rmSync(outDir, { recursive: true, force: true });

const require_ = createRequire(import.meta.url);

test.after(() => rmSync(outDir, { recursive: true, force: true }));

function compile() {
  const sources = readdirSync(STATES_DIR)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => path.join(STATES_DIR, f));
  // Run tsc via node directly (npx.cmd spawn is unreliable on Windows).
  const tscJs = path.join(ROOT, 'node_modules', 'typescript', 'lib', 'tsc.js');
  execFileSync(
    process.execPath,
    [
      tscJs,
      ...sources,
      '--jsx', 'react-jsx',
      '--module', 'commonjs',
      '--target', 'es2021',
      '--moduleResolution', 'node',
      '--esModuleInterop',
      '--skipLibCheck',
      '--outDir', outDir,
    ],
    { cwd: ROOT, stdio: 'pipe' },
  );
}

function load(name) {
  return require_(path.join(outDir, `${name}.js`)).default;
}

test('states compile via tsc (JSX -> CJS)', () => {
  compile();
  const built = readdirSync(outDir).filter((f) => f.endsWith('.js'));
  assert.ok(built.length >= 7, `expected >=7 compiled components, got ${built.length}`);
});

test('every state renders non-empty markup without throwing', () => {
  const cases = {
    LoadingState: { label: 'Loading' },
    ErrorState: { message: 'Something failed', onRetry: () => {} },
    SuccessState: { result: 'Your order is confirmed', action: { label: 'Continue', href: '#next' } },
    EmptyState: { title: 'Nothing here', description: 'Start now' },
    DisabledHint: { reason: 'Why disabled', id: 'hint-1' },
    Toast: { toast: { id: 't1', tone: 'info', text: 'Saved' }, onDismiss: () => {} },
    StatesProof: {},
  };
  for (const [name, props] of Object.entries(cases)) {
    const Comp = load(name);
    const html = renderToStaticMarkup(React.createElement(Comp, props));
    assert.ok(html.length > 30, `${name} rendered empty markup`);
  }
});

test('state semantics: loading announces, error offers recovery, toast is aria-live', () => {
  const Loading = load('LoadingState');
  const ErrorS = load('ErrorState');
  const Toast = load('Toast');
  const loadingHtml = renderToStaticMarkup(React.createElement(Loading, { label: 'In behandeling…' }));
  assert.match(loadingHtml, /In behandeling/);
  const errorHtml = renderToStaticMarkup(
    React.createElement(ErrorS, { message: 'Try again', onRetry: () => {} }),
  );
  assert.match(errorHtml, /Try again/, 'error shows actionable message');
  assert.match(errorHtml, /button/i, 'error offers retry action');
  const toastHtml = renderToStaticMarkup(
    React.createElement(Toast, { toast: { id: 'x', tone: 'error', message: 'Failed' }, onDismiss: () => {} }),
  );
  assert.match(toastHtml, /aria-live/, `toast uses aria-live per notification standard (got: "${toastHtml.slice(0, 120)}")`);
});
