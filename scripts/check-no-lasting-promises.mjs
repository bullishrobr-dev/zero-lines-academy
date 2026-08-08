/*
 * Guard: a seller must not promise something the SHOP has to honour after the
 * customer has walked out.
 *
 * The owner's ruling, in his words: "we don't really do returns. We don't do
 * refunds unless it's an extreme case." So a seller offering money back is
 * writing a cheque somebody else has to cash, on a different shift, to a
 * customer who is now angry. This is commercial self-interest, not manners —
 * everything else about the market patter (price theatre, "just for you", "my
 * last customer", "between us", scarcity) is explicitly fair game and guarded
 * by nothing.
 *
 * ── TWO THINGS THIS DELIBERATELY ALLOWS ─────────────────────────────────────
 *  1. The buffer / nail-kit replacement guarantee. Also the owner's ruling:
 *     "we honour everything about the buffer. They can come with the old buffer,
 *     we'll give them a new one." It is real, so "bring it back and we replace
 *     it" is a true statement and stays.
 *  2. Lines that FORBID the promise rather than make it. The stop-4 tip says
 *     "never promise anything the shop has to honour... no money back", which a
 *     naive pattern match flags as a violation when it is the rule itself.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC as ROOT } from './paths.mjs';


/** Offers of money back, in either language. */
const PROMISE = [
  /\brefund\b/i,
  /money back/i,
  /te devuelvo el dinero/i,
  /te devolvemos el dinero/i,
  /devoluci[oó]n del dinero/i,
  /mention my name/i,
  /menciona mi nombre/i,
  /pregunta por m[ií]\b/i,
  /ask for me by name/i,
  /* A promise does not have to say "refund" to be one. A flashcard offered a
     "satisfaction guarantee — if you don't love it in 7 days, I'll swap it for
     you", which is the same cheque drawn on a colleague's shift and sailed
     straight past a list that only knew the word refund. The buffer is the one
     real replacement the shop honours, so it is exempted below. */
  /satisfaction guarantee/i,
  /garant[ií]a de satisfacci[oó]n/i,
  /(swap|exchange|replace) it for you/i,
  /te lo (cambio|cambiamos|sustituyo)/i,
  /money.?back guarantee/i,
];

/** The line is stating the rule, not breaking it. */
const NEGATED =
  /never promise|do not promise|don't promise|no prometas|nada de |no money back|NOT to Do|what NOT|nunca prometas|no le prometas|no (hacemos|hay) devoluciones|we do not do returns|don't do returns/i;

/**
 * The buffer / nail-kit replacement, which is real and which the owner honours:
 * "they can come with the old buffer, we'll give them a new one". Swapping a
 * worn buffer is a true statement, so the words that would otherwise read as a
 * promise are allowed when the line is about that.
 */
const BUFFER = /buffer|pulidor|lima\b|nail ?kit|kit de u[ñn]as|whole kit|kit entero|MIX_FLOOR/i;

/**
 * Lines that are WRONG ANSWERS in a quiz.
 *
 * A distractor exists to be rejected — generalQuizzes has "come back and ask
 * for me by name" as an option precisely so sellers learn not to say it, and
 * flagging that would be flagging the lesson for teaching the rule. So the
 * scan resolves each `options:` block against its own `correctIndex` and
 * exempts every option that is not the answer.
 */
function distractorLines(src) {
  const exempt = new Set();
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*options(Es)?:\s*\[/.test(lines[i])) continue;
    const opts = [];
    let j = i + 1;
    for (; j < lines.length && !/^\s*\]/.test(lines[j]); j++) opts.push(j);
    // correctIndex sits a few lines past the closing bracket of the pair
    let correct = -1;
    for (let k = j; k < Math.min(j + 8, lines.length); k++) {
      const m = lines[k].match(/correctIndex:\s*(\d+)/);
      if (m) { correct = Number(m[1]); break; }
    }
    if (correct < 0) continue;
    opts.forEach((ln, idx) => { if (idx !== correct) exempt.add(ln + 1); });
    i = j;
  }
  return exempt;
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
for (const file of walk(ROOT)) {
  const src = readFileSync(file, 'utf8');
  const exempt = distractorLines(src);
  const all = src.split('\n');
  all
    .forEach((line, i) => {
      if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // explanatory comments are not content
      if (NEGATED.test(line)) return;
      /* Which product a guarantee belongs to is usually named a few lines up,
         on the ladder or block that owns it, not in the sentence itself — the
         nail-kit line is literally "bring it back and we replace it". */
      if (BUFFER.test(all.slice(Math.max(0, i - 12), i + 1).join(' '))) return;
      if (exempt.has(i + 1)) return; // a wrong answer, there to be rejected
      for (const rx of PROMISE) {
        if (rx.test(line)) {
          hits.push(`${file.replace(ROOT, 'src')}:${i + 1}  ${line.trim().slice(0, 130)}`);
          break;
        }
      }
    });
}

if (hits.length) {
  console.log(`FAIL — ${hits.length} promise(s) the shop would have to honour:\n`);
  hits.forEach((h) => console.log('  ' + h));
  process.exit(1);
}
console.log('PASS  no seller promises anything the shop must honour after the sale');
