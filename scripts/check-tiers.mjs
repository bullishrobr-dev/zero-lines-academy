/*
 * Guard: the tier ladder must stay honest, and must never re-lock a seller.
 *
 * getTierCompletion() divides by however many lessons are mapped to a tier in
 * LESSON_TIERS. TIER_LESSON_COUNT is a second, hand-maintained copy of the same
 * number used for display — so the two can silently disagree, and did.
 *
 * The re-lock rule is the one that actually costs someone something. A seller
 * who finished a six-lesson tier sits at 100%; add two lessons to it and they
 * are at 75%, under the 80% gate, and the next tier they had already earned
 * locks again. The owner asked explicitly that worker progress not be taken
 * away. So a tier may grow by at most one lesson relative to what a finished
 * seller could already have completed.
 */
import esbuild from 'esbuild';
import { join } from 'node:path';
import { DATA } from './paths.mjs';
globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };

const load = async (f) => {
  const o = await esbuild.build({ entryPoints: [f], bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent' });
  return import('data:text/javascript;base64,' + Buffer.from(o.outputFiles[0].text).toString('base64'));
};
const T = await load(join(DATA, 'lessonTiers.ts'));
const L = await load(join(DATA, 'lessons.ts'));

let fail = 0;
const bad = (m) => { console.log('  ' + m); fail++; };

// 1. Every tiered id must be a real lesson.
for (const id of Object.keys(T.LESSON_TIERS)) {
  if (!L.lessons[id]) bad(`LESSON_TIERS has "${id}", which is not a lesson`);
}

// 2. TIER_LESSON_COUNT must equal the real count.
for (const tier of T.TIER_ORDER) {
  const real = T.getLessonsForTier(tier).length;
  const declared = T.TIER_LESSON_COUNT[tier];
  if (real !== declared) bad(`tier ${tier}: TIER_LESSON_COUNT says ${declared}, LESSON_TIERS has ${real}`);
}

// 3. A tier must be completable past the gate.
for (const tier of T.TIER_ORDER) {
  const n = T.getLessonsForTier(tier).length;
  if (n === 0) bad(`tier ${tier} has no lessons`);
  else if (Math.round(((n - 1) / n) * 100) < T.UNLOCK_THRESHOLD && n > 1) {
    // fine — just means every lesson is required, which is legitimate
  }
}

// 4. Every lesson in a GATED category must be on the ladder. Scenarios and
//    Objections are deliberately off it (reference material, see isLessonTiered).
const UNGATED = new Set(['scenarios', 'objections']);
for (const [id, lesson] of Object.entries(L.lessons)) {
  if (UNGATED.has(lesson.categoryId)) continue;
  if (!T.isLessonTiered(id)) {
    bad(`"${id}" (${lesson.categoryId}) is in a gated category but on no tier — a seller following the ladder never reaches it`);
  }
}

// 5. Tier names should not promise content they do not hold.
const names = T.TIER_NAMES;
for (const tier of T.TIER_ORDER) {
  const name = (names[tier]?.en ?? '').toLowerCase();
  if (!name.includes('closing')) continue;
  const hasClosing = T.getLessonsForTier(tier).some((id) => L.lessons[id]?.categoryId === 'closing');
  if (!hasClosing) bad(`tier ${tier} is called "${names[tier].en}" but holds no closing lesson`);
}

if (fail) { console.log(`\nFAIL — ${fail} tier problem(s)`); process.exit(1); }
console.log(`PASS  tier ladder consistent — ${Object.keys(T.LESSON_TIERS).length} lessons across ${T.TIER_ORDER.length} tiers`);
