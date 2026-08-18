/*
 * Test the guards, by attacking them.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * The guards in scripts/ deliberately allow a banned line through as a WRONG
 * answer, because stating the move is how a seller learns to refuse it. Nobody
 * had asked the obvious follow-up: what happens when the banned line is the
 * RIGHT one?
 *
 * Answer, when it was first asked: the walkaway guard caught it and the floor
 * guard did not. "Just give her the {currency}100 yourself" marked correct, on
 * a live question, paying XP — twenty-six checks green. That is close to what
 * O1 actually said before it was rewritten, so the guard written to stop it
 * recurring would not have stopped it recurring.
 *
 * A guard nobody has watched fail is a guess. This makes watching them fail
 * cheap: it plants one real violation of each rule, in a script and in a
 * correct answer, and reports which guards notice.
 *
 * ── NOT IN CI, ON PURPOSE ───────────────────────────────────────────────────
 * It edits a source file and runs the whole content suite once per attack, so
 * it is slow and it mutates. Run it by hand when you add or change a guard:
 *
 *     node tests/attack-guards.mjs
 *
 * It refuses to start unless git is clean, and restores in a finally, so a
 * crash cannot cost you work.
 */
import { readFileSync, writeFileSync, copyFileSync, unlinkSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const FILE = 'src/data/objectionLessons.ts';
const BAK = join(tmpdir(), 'zl-attack-guards.bak');

/* Anchors that exist in the corpus today. If one goes missing the run says so
   rather than reporting a false all-clear — a harness that silently plants
   nothing is exactly the failure it exists to catch. */
const IN_A_SCRIPT = 'YOU: \\"On a budget';
const A_CORRECT_ANSWER = "'A manager. You go and get one, and the number comes out of his mouth',";

const ATTACKS = [
  ['tax claim, in a script', 'script', 'It is tax free here, my darling. '],
  ['tax claim, as a correct answer', 'correct', "'Tell her it is tax free in Andorra',"],
  ['refund promise, in a script', 'script', 'If you do not love it, bring it back for a full refund. '],
  ['refund promise, as a correct answer', 'correct', "'Promise her a full refund if she is not happy',"],
  ['names a disease, in a script', 'script', 'It clears up eczema and psoriasis. '],
  ['names a disease, as a correct answer', 'correct', "'Tell her it treats her eczema',"],
  ['retired 2-metre rule, in a script', 'script', 'Start your approach at 2 metres. '],
  ['walkaway, in a script', 'script', 'Have a think about it and come back tomorrow. '],
  ['walkaway, as a correct answer', 'correct', "'Tell her to come back tomorrow when she has decided',"],
  ['seller gives the floor, in a script', 'script', 'I can do {currency}100 for you, just for you. '],
  ['seller gives the floor, as a correct answer', 'correct', "'Just give her the {currency}100 yourself',"],
];

/* Tracked changes only. This mutates and restores a tracked file, so that is
   what it must not put at risk; untracked scratch files are none of its
   business, and refusing to run because of one is how a useful check gets
   skipped. */
if (execSync('git diff --name-only && git diff --cached --name-only', { encoding: 'utf8' }).trim()) {
  console.log('Refusing to run with uncommitted changes to tracked files — this edits');
  console.log('a source file and restores it. Commit or stash first.');
  process.exit(1);
}

copyFileSync(FILE, BAK);
const results = [];
try {
  for (const [name, where, text] of ATTACKS) {
    const clean = readFileSync(BAK, 'utf8');
    const anchor = where === 'script' ? IN_A_SCRIPT : A_CORRECT_ANSWER;
    const planted =
      where === 'script'
        ? clean.replace(anchor, anchor + ' ' + text, 1)
        : clean.replace(anchor, text, 1);
    if (planted === clean) { results.push([name, 'ANCHOR MISSING — fix this harness']); continue; }
    writeFileSync(FILE, planted);
    let caught = false;
    try { execSync('npm run check:content', { stdio: 'pipe' }); } catch { caught = true; }
    results.push([name, caught ? 'caught' : 'MISSED']);
    copyFileSync(BAK, FILE);
  }
} finally {
  copyFileSync(BAK, FILE);
  try { unlinkSync(BAK); } catch { /* nothing to clean */ }
}

console.log('\n  rule                                          verdict');
console.log('  ------------------------------------------------------');
for (const [n, v] of results) console.log(`  ${n.padEnd(46)}${v}`);
const bad = results.filter((r) => r[1] !== 'caught');
if (bad.length) {
  console.log(`\n${bad.length} planted violation(s) went straight through. A guard that`);
  console.log('cannot see the thing it exists to stop is worse than no guard, because');
  console.log('everyone trusts it. Fix the guard, then run this again.');
  process.exit(1);
}
console.log(`\nall ${results.length} planted violations were caught`);
