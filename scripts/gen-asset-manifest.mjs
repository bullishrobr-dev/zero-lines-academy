/*
 * Writes dist/asset-manifest.json — every file the app is made of.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * The sellers work inside a shopping centre, often with no usable signal. The
 * service worker could already survive that for whatever they had happened to
 * open online, but a route they had never visited had never been downloaded, so
 * the lesson they wanted at the kiosk was a blank screen.
 *
 * The owner's call, and it is the right one for this shop: download the whole
 * app once, on first open, and then never need the network again. It is about
 * 1.2 MB all in — two photographs — against a seller standing in front of a
 * customer with nothing on the screen.
 *
 * The worker cannot hardcode the list because Vite fingerprints every chunk
 * (`assets/lessons-C7mcOUTH.js`), and it cannot discover them from index.html
 * because lazy routes are not referenced there. So the list is generated here,
 * at build time, from what actually shipped.
 *
 * Excluded on purpose:
 *   index.html            already precached by name, and the worker is network
 *                         -first on documents so it must not be pinned here.
 *   sw.js                 the worker does not cache itself; the browser owns
 *                         its update cycle and caching it would fight that.
 *   asset-manifest.json   caching the list inside the thing the list describes
 *                         is how you get a manifest that can never be updated.
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROOT } from './paths.mjs';

const DIST = join(ROOT, 'dist');
const SKIP = new Set(['index.html', 'sw.js', 'asset-manifest.json']);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

let files;
try {
  files = walk(DIST);
} catch {
  console.log('SKIP  no dist/ — run `vite build` first');
  process.exit(0);
}

/* Relative, and prefixed './', because the app is served from a GitHub Pages
   sub-path and the worker resolves each one against the document. An absolute
   '/assets/...' would 404 in production. */
const list = files
  .map((f) => relative(DIST, f).split('\\').join('/'))
  .filter((p) => !SKIP.has(p))
  .sort()
  .map((p) => './' + p);

writeFileSync(join(DIST, 'asset-manifest.json'), JSON.stringify(list, null, 0) + '\n');

const bytes = files.reduce((n, f) => n + statSync(f).size, 0);
console.log(
  `PASS  wrote dist/asset-manifest.json — ${list.length} files, ${(bytes / 1024 / 1024).toFixed(1)} MB uncompressed`
);
