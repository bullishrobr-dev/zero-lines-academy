/*
 * Guard: src/data/lessonMeta.ts must still match the lessons it was derived
 * from.
 *
 * lessonMeta.ts exists so the home screen can show a lesson title without
 * downloading every lesson body in the app. The cost of that is a derived copy
 * of the titles — and a derived copy that nobody re-derives is just a stale
 * copy. Rename a lesson in lessons.ts and, without this, the lesson page would
 * show the new title while the home screen kept showing the old one, silently
 * and forever.
 *
 * So: regenerate in memory, compare to what is committed, fail on any
 * difference. The fix is always `npm run gen:meta`.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { DATA } from './paths.mjs';
import { OUTPUT } from './gen-lesson-meta.mjs';

const path = join(DATA, 'lessonMeta.ts');
let committed;
try {
  committed = readFileSync(path, 'utf8');
} catch {
  console.log('FAIL — src/data/lessonMeta.ts is missing.\n\n  Run:  npm run gen:meta');
  process.exit(1);
}

if (committed !== OUTPUT) {
  const a = committed.split('\n');
  const b = OUTPUT.split('\n');
  const firstDiff = a.findIndex((line, i) => line !== b[i]);
  console.log('FAIL — src/data/lessonMeta.ts is out of date with src/data/lessons.ts.\n');
  if (firstDiff !== -1) {
    console.log(`  first difference at line ${firstDiff + 1}:`);
    console.log(`    committed:  ${(a[firstDiff] ?? '<end of file>').trim().slice(0, 90)}`);
    console.log(`    generated:  ${(b[firstDiff] ?? '<end of file>').trim().slice(0, 90)}`);
  } else {
    console.log(`  committed is ${a.length} lines, generated is ${b.length}`);
  }
  console.log('\n  Run:  npm run gen:meta');
  process.exit(1);
}

const count = (OUTPUT.match(/^  "/gm) || []).length;
console.log(`PASS  lesson metadata matches the lessons — ${count} lessons`);
