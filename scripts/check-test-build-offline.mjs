/*
 * Guard: the smoke-test build really is offline.
 *
 * vite.test.config.ts swaps the backend out so CI never signs in to the live
 * database. The first time it was written it did not — '@/backend/supabaseClient'
 * matched the '@' alias, which is listed first and wins, so one component kept
 * the real client while every other file got the stub. Nothing failed. The
 * build looked fine. It would have been a bot writing XP to a seller's account
 * on every push.
 *
 * A missing swap is invisible from the outside, so the only honest check is to
 * read the bundle and look for the project. Runs as part of `npm run build:test`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './paths.mjs';

/* Defaults to the test build. Takes a directory so the guard can be pointed at
   dist/ as a positive control — a guard nobody has ever seen fail is a guard
   nobody knows works. `node scripts/check-test-build-offline.mjs dist` MUST
   report a failure; if it passes, this script is broken, not the build. */
const DIST = join(ROOT, process.argv[2] || 'dist-test');

/* Read the marker out of the real module rather than hardcoding it here — the
   project URL changes if the database is ever moved, and a guard looking for a
   URL nobody uses any more passes forever. */
const real = readFileSync(join(ROOT, 'src', 'backend', 'supabaseClient.ts'), 'utf8');
const url = real.match(/SUPABASE_URL\s*=\s*'([^']+)'/)?.[1];
const host = url && new URL(url).hostname;

if (!host) {
  console.log('FAIL — could not read SUPABASE_URL out of src/backend/supabaseClient.ts.');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(js|html)$/.test(p)) out.push(p);
  }
  return out;
}

let files;
try {
  files = walk(DIST);
} catch {
  console.log('SKIP  no dist-test/ — run `npm run build:test` first');
  process.exit(0);
}

const leaks = files.filter((f) => readFileSync(f, 'utf8').includes(host));

if (leaks.length) {
  console.log(`FAIL — ${leaks.length} chunk(s) in the test build still talk to ${host}:\n`);
  leaks.forEach((f) => console.log('  ' + f.slice(ROOT.length + 1)));
  console.log('\nAn import escaped the alias in vite.test.config.ts. Remember that the');
  console.log("first matching alias wins, so the swaps must come BEFORE the '@' prefix.");
  process.exit(1);
}
console.log(`PASS  test build reaches no backend — ${files.length} files, no trace of ${host}`);
