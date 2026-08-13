/*
 * Guard: a line the owner says in two lessons is written in one place.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * The approach sequence is taught twice on purpose — `stop-1` gives a new
 * seller the whole thing on day one, `close-1` is the detailed version they
 * come back to later. Same method, two depths, which is right.
 *
 * The problem is the scripts inside them. Three of the owner's lines had been
 * copied into both files and hand-kept in step FOUR separate times, in two
 * languages. Every one of those was a chance for the app to start teaching two
 * slightly different greetings — and a seller who reads both lessons, notices
 * they disagree, and cannot tell which is right stops trusting the app rather
 * than picking one.
 *
 * So the shared lines live in src/data/canonicalScripts.ts and both lessons
 * spread them in. This fails the build if one is hand-written anywhere else.
 *
 * If you are here because the build went red: import the constant instead of
 * pasting the line. If you meant to CHANGE the wording, change it in
 * canonicalScripts.ts and both lessons follow — which is the entire point.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC } from './paths.mjs';

const CANON_FILE = join(SRC, 'data', 'canonicalScripts.ts');

/* Pull the strings straight out of the module rather than restating them here.
   A guard with its own copy of the text is one more thing to keep in step, and
   would be the fourth copy of exactly the problem it exists to stop. */
const canonSrc = readFileSync(CANON_FILE, 'utf8');
const lines = [];
for (const m of canonSrc.matchAll(/^\s*(text|textEs):\s*`([^`]+)`/gm)) {
  const value = m[2].trim();
  if (value.length > 20) lines.push(value);
}

if (lines.length < 4) {
  console.log('FAIL — could not read the canonical scripts out of canonicalScripts.ts.');
  console.log('       The guard cannot check what it cannot parse. Fix the parser or the file.');
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(p)) out.push(p);
  }
  return out;
}

const hits = [];
for (const file of walk(SRC)) {
  if (file === CANON_FILE) continue; // the one place they are allowed to exist
  const src = readFileSync(file, 'utf8');
  const rel = file.slice(SRC.length + 1).split('\\').join('/');
  src.split('\n').forEach((line, i) => {
    if (/^\s*(?:\/\/|\*|\/\*)/.test(line)) return; // a comment quoting it is fine

    /* Only a STANDALONE copy counts — a `text:` or `textEs:` whose whole value
       is the canonical line, which is the copy-pasted script block this guard
       exists to stop.

       QUOTING it inside a longer sentence is not duplication and must pass. A
       cheat-sheet card that reads `Four or five metres out … "Hi guys, how you
       doing?" — and WAIT` cannot spread a constant into the middle of its own
       prose, and fifteen legitimate lines look exactly like that. A guard that
       demands the impossible is a guard somebody deletes. */
    const m = line.match(/^\s*(?:text|textEs|answer|answerEs)\s*:\s*[`'"](.*)[`'"],?\s*$/);
    if (!m) return;
    const value = m[1].trim();
    for (const canon of lines) {
      if (value === canon.trim()) hits.push(`${rel}:${i + 1}  ${canon.slice(0, 64)}…`);
    }
  });
}

if (hits.length) {
  console.log(`FAIL — ${hits.length} hand-written cop${hits.length === 1 ? 'y' : 'ies'} of a canonical script:\n`);
  hits.forEach((h) => console.log('  ' + h));
  console.log('\nImport it from data/canonicalScripts.ts and spread it in:');
  console.log("    { type: 'script', ...GREETING },");
  console.log('\nTo change the wording, change it THERE — both lessons follow, which is');
  console.log('the whole reason the file exists.');
  process.exit(1);
}
console.log(`PASS  ${lines.length / 2} shared script(s) written once, spread everywhere`);
