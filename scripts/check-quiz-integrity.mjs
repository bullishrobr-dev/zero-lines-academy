/*
 * Independent check of the two quiz tells, across EVERY quiz in the app.
 *
 * The answer used to be option B 85% of the time AND the longest option 85% of
 * the time, so both quizzes could be passed without reading. That was fixed
 * once; four agents just rewrote quiz copy, so it gets re-checked from the
 * real, post-overlay lesson objects rather than from anyone's report.
 */
import esbuild from 'esbuild';
import { DATA } from './paths.mjs';
import { sep } from 'node:path';
globalThis.localStorage={getItem:()=>null,setItem:()=>{},removeItem:()=>{}};
const load = async (f) => {
  const o = await esbuild.build({entryPoints:[f],bundle:true,format:'esm',platform:'node',write:false,logLevel:'silent'});
  return import('data:text/javascript;base64,'+Buffer.from(o.outputFiles[0].text).toString('base64'));
};
const R = DATA + sep;
const L = await load(R+'lessons.ts');           // applies the LESSON_QUIZZES overlay
const M2 = await load(R+'moreQuizzes2.ts');
const M1 = await load(R+'moreQuizzes.ts');
const G  = await load(R+'generalQuizzes.ts');

let pass=0,fail=0;const ck=(n,c,x='')=>{c?pass++:fail++;console.log(`${c?'PASS':'FAIL'}  ${n}${x?' — '+x:''}`)};

// Every question the app can actually show.
const lessonQs = Object.values(L.lessons).flatMap(l => l.quiz ?? []);
const bank = (m) => Object.values(m).flat().flatMap(q => Array.isArray(q?.questions) ? q.questions : []);
const otherQs = [...bank(M2), ...bank(M1), ...bank(G)];
const all = [...lessonQs, ...otherQs].filter(q => Array.isArray(q?.options) && q.options.length);
console.log(`      ${lessonQs.length} lesson questions + ${otherQs.length} standalone = ${all.length} total\n`);

ck('every correctIndex in range', all.every(q => q.correctIndex >= 0 && q.correctIndex < q.options.length));
ck('no empty options', all.every(q => q.options.every(o => typeof o === 'string' && o.trim())));

const pos = {};
all.forEach(q => { pos[q.correctIndex] = (pos[q.correctIndex] ?? 0) + 1; });
console.log('      answer positions:', JSON.stringify(pos));
const topShare = Math.max(...Object.values(pos)) / all.length;
ck('no position tell', topShare < 0.40, `${Math.round(topShare*100)}% on the most common slot`);

const longest = all.filter(q => {
  const lens = q.options.map(o => o.length);
  const max = Math.max(...lens);
  // uniquely longest only — a tie gives nothing away
  return lens.filter(l => l === max).length === 1 && lens[q.correctIndex] === max;
});
const share = longest.length / all.length;
console.log('      uniquely-longest-is-correct:', `${longest.length}/${all.length}`);
/*
 * RATCHET, not a target. Measured at 43% (113/264) immediately before the tax
 * sweep and 42% after, so this is a pre-existing property of the question bank,
 * not something the sweep introduced. It is well down from the 85% that made
 * the quizzes passable without reading, but still above the ~25% you would get
 * from four options of similar length. The threshold exists to stop it climbing
 * back; driving it toward 25% means rewriting option copy across the bank and
 * is its own piece of work.
 */
ck('length tell no worse than the 43% baseline', share <= 0.43, `${Math.round(share*100)}%`);

// Spanish parity where an ES twin exists at all
const withEs = all.filter(q => q.optionsEs);
const mismatched = withEs.filter(q => q.optionsEs.length !== q.options.length);
ck('optionsEs length matches options', mismatched.length === 0, `${withEs.length} bilingual questions`);
const esBlank = withEs.filter(q => q.optionsEs.some(o => !String(o).trim()));
ck('no blank Spanish option', esBlank.length === 0);

// Content rules
const blob = JSON.stringify(all);
ck('no currency symbol in any quiz', !/[€£]/.test(blob));
ck('no shop name hardcoded', !/Andorra|Gibraltar/.test(blob), 'uses {locationName}');
ck('no tax claim survived', !/tax[\s-]?haven|tax[\s-]?free|\bVAT\b|paraíso fiscal|libres? de impuestos/i.test(blob));

console.log(`\n${fail?`${fail} FAILED, `:''}${pass} passing`);
process.exit(fail?1:0);
