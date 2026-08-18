/*
 * Guard: the seller never hands out the floor price on their own authority.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * CLAUDE.md, in the owner's words: "You use the voucher once, usually 175 to
 * 140… After that, if it doesn't work, you go full market, call a manager, and
 * get it to 100." And the reason, which is the part that matters: a seller who
 * can reach the floor on their own has no floor, because she can always ask for
 * one more.
 *
 * The closing lessons taught this correctly. The OBJECTION lessons did not —
 * O1's Script 3 had the seller lean in and say the bottom number himself, in
 * both languages, with a little story about his last customer to justify it.
 * The word "manager" did not appear once in that file: 1,533 lines, ten
 * lessons, zero. And O1 is unlocked on day one while the lesson that corrects
 * it sits behind tier 5, so the wrong version is the one a new seller meets
 * first.
 *
 * ── WHAT THIS CHECKS ────────────────────────────────────────────────────────
 * If a seller-facing string says the floor price, the same lesson has to put a
 * manager in the room. It does not care how — fetching one, quoting one,
 * naming one — only that the authority is not the seller's.
 *
 * Not checked here: quiz options, which have to be able to state the wrong
 * answer in order to mark it wrong.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC } from './paths.mjs';

/* Read the floor out of pricing.ts rather than hardcoding it, so moving the
   ladder does not leave this guard watching a number nobody uses. */
const pricing = readFileSync(join(SRC, 'data', 'pricing.ts'), 'utf8');
/* The SYRINGE ladder specifically. Every product has a `floor`, and the first
   one in the file belongs to the scrub — which a seller may absolutely discount
   on their own. This rule is about the star product's bottom rung, the one the
   owner reserves for a manager. */
const syringeBlock = pricing.slice(pricing.indexOf('SYRINGE_LADDER'));
const floor = syringeBlock.match(/floor:\s*(\d+)/)?.[1];

if (!floor) {
  console.log('FAIL — could not read the SYRINGE_LADDER floor out of data/pricing.ts.');
  console.log('       The guard cannot check a number it cannot find. Fix the parser or the file.');
  process.exit(1);
}

const FLOOR = new RegExp(`\\{currency\\}${floor}\\b`);
const AUTHORITY = /manager|encargado|supervisor/i;

/* Only the lesson files. A cheat sheet or a price table may print the rung
   without anybody speaking it. */
const LESSON_FILES = ['objectionLessons.ts', 'closingLessons.ts', 'lessons.ts'];

function lessonsIn(src) {
  /* Split on the id line, so each chunk is one lesson and the manager has to be
     in the SAME lesson as the number rather than anywhere in the file. */
  const out = [];
  const re = /^\s*id:\s*['"]([\w-]+)['"],/gm;
  const marks = [...src.matchAll(re)];
  marks.forEach((m, i) => {
    const start = m.index;
    const end = i + 1 < marks.length ? marks[i + 1].index : src.length;
    out.push({ id: m[1], body: src.slice(start, end) });
  });
  return out;
}

/*
 * Only what the seller SAYS OUT LOUD — the `script` blocks.
 *
 * Deliberately not prose. A paragraph explaining that the ladder bottoms out at
 * {currency}100, or that a careful spender is a fight for {currency}140 rather
 * than {currency}300, is correct teaching and a seller needs to know it; the
 * first version of this guard fired on three such lines in connect-2 and would
 * have been deleted by the second person who hit it. The failure this exists to
 * stop is the number coming out of the SELLER'S MOUTH.
 */
function scriptTexts(body) {
  const out = [];
  const re = /type:\s*['"]script['"]/g;
  let m;
  while ((m = re.exec(body))) {
    /* The block runs to the next `},` at the same nesting — close enough for a
       flat data file, and erring long only makes the guard stricter. */
    const chunk = body.slice(m.index, body.indexOf('\n      },', m.index) + 1);
    /*
     * Each language SEPARATELY. A script carries `text` and `textEs`, and
     * checking the block as one blob lets the two drift apart unnoticed: I put
     * the old English line back to test this guard and it passed, because the
     * Spanish twin still said "encargado" a few lines below. English regresses,
     * Spanish stays right, block still contains the word, nobody hears about
     * it — and the English half is what most of this shop reads.
     */
    for (const t of chunk.matchAll(/^\s*(text|textEs):\s*([\s\S]*?)(?=\n\s*(?:text|textEs|type)\s*:|$)/gm)) {
      out.push(t[2]);
    }
  }
  return out;
}

/**
 * The CORRECT answer of every quiz question, resolved against its correctIndex.
 *
 * Scripts were not the only place the floor could be handed over. A quiz whose
 * correct answer says "just give her the {currency}100 yourself" teaches it
 * just as hard — harder, arguably, because it is marked right and pays XP — and
 * that is close to the exact shape O1's third question had before it was
 * rewritten. Checked by planting one and watching this guard pass.
 *
 * Wrong answers are deliberately NOT checked. Stating the banned move is how a
 * seller learns to reject it, which is the same reason the walkaway guard
 * exempts distractors.
 */
function correctAnswers(body) {
  const out = [];
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*options(Es)?:\s*\[/.test(lines[i])) continue;
    const opts = [];
    let j = i + 1;
    for (; j < lines.length && !/^\s*\]/.test(lines[j]); j++) opts.push(lines[j]);
    let correct = -1;
    for (let k = j; k < Math.min(j + 8, lines.length); k++) {
      const m = lines[k].match(/correctIndex:\s*(\d+)/);
      if (m) { correct = Number(m[1]); break; }
    }
    if (correct >= 0 && opts[correct]) out.push(opts[correct]);
    i = j;
  }
  return out;
}

const hits = [];
for (const file of readdirSync(join(SRC, 'data')).filter((f) => LESSON_FILES.includes(f))) {
  const src = readFileSync(join(SRC, 'data', file), 'utf8');
  for (const lesson of lessonsIn(src)) {
    if (!FLOOR.test(lesson.body)) continue;

    /* The manager has to be in the SAME SCRIPT, not merely somewhere in the
       lesson. Checking the whole lesson made this guard useless the moment the
       fix landed: O1's quiz explanation mentions a manager, so a script that
       went back to handing out the floor would have been waved straight
       through. Found by planting the original line again and watching it
       pass. */
    const spoken = scriptTexts(lesson.body).filter(
      (chunk) => FLOOR.test(chunk) && !AUTHORITY.test(chunk)
    );
    const taught = correctAnswers(lesson.body).filter(
      (opt) => FLOOR.test(opt) && !AUTHORITY.test(opt)
    );
    if (spoken.length) hits.push(`${file}  ${lesson.id}  (a script says it)`);
    if (taught.length) hits.push(`${file}  ${lesson.id}  (a correct answer says it)`);
  }
}

if (hits.length) {
  console.log(`FAIL — ${hits.length} lesson(s) say {currency}${floor} with no manager in the room:\n`);
  hits.forEach((h) => console.log('  ' + h));
  console.log(`\nOne voucher takes the seller to the rung above. {currency}${floor} is not theirs to`);
  console.log('give: they go full market, then they go and fetch a manager, and the number');
  console.log('comes out of the manager\'s mouth. A seller who can reach the floor alone has');
  console.log('no floor. See "Where the floor actually comes from" in CLAUDE.md.');
  process.exit(1);
}
console.log(`PASS  the floor ({currency}${floor}) is never the seller's to give`);
