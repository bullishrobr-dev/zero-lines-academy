/*
 * Guard: nothing outside its owning hook may write the progress keys directly.
 *
 * ── THE BUG THIS EXISTS TO PREVENT ──────────────────────────────────────────
 * LessonView did not use useProgress at all. Its "Mark lesson complete" button
 * hand-wrote `zl_lesson_progress`:
 *
 *     const p = getProgress();
 *     p[lesson.id] = true;
 *     localStorage.setItem('zl_lesson_progress', JSON.stringify(p));
 *
 * That set the completed flag without paying the XP. And because the "Take the
 * quiz" button rendered ONLY once the lesson was marked complete, the only
 * route to a quiz ran through that button — after which completeLesson() saw
 * the lesson already flagged and skipped the award for good. All 56 lessons,
 * 100-150 XP each: roughly 6,400 XP that no seller could ever earn.
 *
 * The tick appeared, the confetti fired and the tier unlocked, so nothing about
 * it looked broken. typecheck, lint and eighteen content guards all passed on
 * it, because `localStorage.setItem` is perfectly valid code. Only reading the
 * two implementations side by side could find it.
 *
 * So: these keys have exactly one owner each. Write them through the hook that
 * owns them, or the reward, the streak and the activity log silently disagree
 * with the flag.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC } from './paths.mjs';

/** key → the single module allowed to write it. */
const OWNED = {
  zl_lesson_progress: 'hooks/useProgress.ts',
  zl_xp: 'hooks/useProgress.ts',
  zl_streak: 'hooks/useProgress.ts',
  zl_quiz_scores: 'hooks/useProgress.ts',
  zl_activity_log: 'hooks/useProgress.ts',
  zl_exercise_scores: 'hooks/useProgress.ts',
  zl_daily_xp_awarded: 'hooks/useProgress.ts',
  zl_quiz_xp_awarded: 'hooks/useProgress.ts',
  zl_street_tracker: 'hooks/useStreetTracker.ts',
  zl_street_xp: 'hooks/useStreetTracker.ts',
  zl_daily_flow: 'hooks/useDailyFlow.ts',
  zl_daily_streak: 'hooks/useDailyFlow.ts',
};

/* AuthContext wipes per-user keys on sign-in as a shared-tablet measure, and
   SettingsPage offers a deliberate reset. Both REMOVE rather than write, which
   cannot desync a value from its siblings. */
const ALLOWED_ELSEWHERE = /removeItem|PER_USER_KEYS|LEGACY|delete\s/;

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
  const rel = file.slice(SRC.length + 1).split('\\').join('/');
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // a comment explaining the rule
    if (!/localStorage\.setItem/.test(line)) return;
    if (ALLOWED_ELSEWHERE.test(line)) return;
    for (const [key, owner] of Object.entries(OWNED)) {
      if (!line.includes(key)) continue;
      if (rel === owner) continue; // the owner may write its own key
      hits.push(`${rel}:${i + 1}  writes ${key} — owned by ${owner}`);
    }
  });
}

if (hits.length) {
  console.log(`FAIL — ${hits.length} write(s) to state that belongs to a hook:\n`);
  hits.forEach((h) => console.log('  ' + h));
  console.log('\nGo through the hook that owns the key. Writing it directly sets the');
  console.log('value without the XP, the streak and the activity log that belong with');
  console.log('it — which is how every lesson in this app came to be worth nothing.');
  process.exit(1);
}
console.log(`PASS  progress state is only written by the hooks that own it`);
