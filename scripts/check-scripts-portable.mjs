/*
 * Guard: no guard may hardcode the path of the machine that wrote it.
 *
 * Every check in this folder once opened its files through
 * `/home/user/zero-lines-academy/…`. That is where the repo sits in one
 * sandbox and nowhere else, so on a GitHub runner the first guard died on
 * ENOENT and took the whole job with it. The suite passed locally on every
 * run and had never passed in CI even once — a safety net that reports green
 * where you look and is not attached where it matters.
 *
 * Resolve from `import.meta.url` (see paths.mjs). This check exists so nobody
 * has to remember that.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './paths.mjs';

const DIR = join(ROOT, 'scripts');
const ABSOLUTE = /(?:^|['"`\s(])\/(?:home|Users|root|tmp|var|mnt|opt)\//;

const problems = [];
for (const name of readdirSync(DIR)) {
  if (!name.endsWith('.mjs') && !name.endsWith('.js')) continue;
  const lines = readFileSync(join(DIR, name), 'utf8').split('\n');
  lines.forEach((line, i) => {
    // The explanation above is allowed to name the paths it is about.
    const isComment = /^\s*(\*|\/\/|\/\*)/.test(line);
    if (isComment) return;
    if (ABSOLUTE.test(line)) problems.push(`${name}:${i + 1}  ${line.trim().slice(0, 90)}`);
  });
}

if (problems.length) {
  console.log('FAIL — a check script hardcodes an absolute machine path:\n');
  problems.forEach((p) => console.log('  ' + p));
  console.log('\nUse ROOT / SRC / DATA / fromRoot() from scripts/paths.mjs instead.');
  console.log('These scripts run on a GitHub runner too, where that path does not exist.');
  process.exit(1);
}
console.log('PASS  every check script resolves its own paths — runs anywhere');
