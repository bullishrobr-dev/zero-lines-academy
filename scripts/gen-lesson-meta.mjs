/*
 * Generates src/data/lessonMeta.ts from the real lessons.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * A lesson is a title, a duration and an icon — plus twenty to thirty content
 * sections and a quiz. Almost everything in the app wants the first part: the
 * home screen's "carry on where you left off" cards, the training hub's counts,
 * the category lists, and `useProgress`, which every screen uses. Only two
 * screens ever read the second part: the lesson itself and its quiz.
 *
 * But they all lived in one 6,800-line module, so wanting a title meant
 * downloading every word of every lesson — 741 KB of the built bundle, on the
 * first screen after sign-in, on a shop's 4G.
 *
 * ── WHY GENERATED RATHER THAN HAND-WRITTEN ──────────────────────────────────
 * A second hand-maintained copy of 35 lessons' titles is a copy that goes
 * stale: someone fixes a title in lessons.ts, the home screen keeps showing the
 * old one, and nothing complains. Deriving it means there is still exactly one
 * source of truth. check-lesson-meta.mjs re-runs this in CI and fails if the
 * committed file no longer matches, so the two cannot drift apart.
 *
 * Run with:  npm run gen:meta
 */
import esbuild from 'esbuild';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DATA } from './paths.mjs';

globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };

const built = await esbuild.build({
  entryPoints: [join(DATA, 'lessons.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
});
const { lessons } = await import(
  'data:text/javascript;base64,' + Buffer.from(built.outputFiles[0].text).toString('base64')
);

/** Everything except `sections` and `quiz` — the two fields that carry the weight. */
const FIELDS = [
  'id',
  'categoryId',
  'title',
  'titleEs',
  'subtitle',
  'subtitleEs',
  'duration',
  'icon',
  'order',
  'xpReward',
];

const entries = Object.keys(lessons)
  .sort()
  .map((id) => {
    const l = lessons[id];
    const body = FIELDS.filter((f) => l[f] !== undefined)
      .map((f) => `    ${f}: ${JSON.stringify(l[f])},`)
      .join('\n');
    return `  ${JSON.stringify(id)}: {\n${body}\n  },`;
  })
  .join('\n');

export const OUTPUT = `// ─────────────────────────────────────────────────────────────
// GENERATED FILE — do not edit by hand.
//
// Run \`npm run gen:meta\` to rebuild it from src/data/lessons.ts, which stays
// the single source of truth. CI fails if this file is out of date.
//
// This is every lesson MINUS its \`sections\` and \`quiz\` — the title, duration
// and icon that the home screen, the training hub, the category lists and
// useProgress all want, without the 741 KB of lesson bodies they do not.
// Import from here unless you are actually rendering a lesson or its quiz.
// ─────────────────────────────────────────────────────────────

export type { Category } from './categories';
export { categories, getCategory } from './categories';

import { categories } from './categories';

export interface LessonMeta {
  id: string;
  categoryId: string;
  title: string;
  titleEs?: string;
  subtitle: string;
  subtitleEs?: string;
  duration: string;
  icon: string;
  order: number;
  xpReward: number;
}

export const LESSON_META: Record<string, LessonMeta> = {
${entries}
};

export function getLessonMeta(id: string): LessonMeta | undefined {
  return LESSON_META[id];
}

/** Same order the full-content version returns: the category's own order, by \`order\`. */
export function getLessonMetaForCategory(categoryId: string): LessonMeta[] {
  const cat = categories.find((c) => c.id === categoryId);
  if (!cat) return [];
  return cat.lessonOrder
    .map((id) => LESSON_META[id])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

export function getTotalLessons(): number {
  return Object.keys(LESSON_META).length;
}
`;

if (import.meta.url === `file://${process.argv[1]}`) {
  writeFileSync(join(DATA, 'lessonMeta.ts'), OUTPUT);
  console.log(`PASS  wrote src/data/lessonMeta.ts — ${Object.keys(lessons).length} lessons`);
}
