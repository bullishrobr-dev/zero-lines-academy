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

/*
 * ── SECOND PASS: THE DOCTRINE CLAIM, ANYWHERE IN THE CORPUS ─────────────────
 *
 * The pass above only reads three lesson files, and that scoping hid three real
 * regressions in the standalone quiz banks — files it has never opened:
 *
 *   • "The {currency}100 price is your 'nuclear option'… Only pull it when the
 *     customer has mentally said yes" — the correct answer, paying XP.
 *   • "{currency}100 is a floor… it is the last thing YOU say" — the seller's
 *     mouth again, in an explanation.
 *   • "If it's a stretch today, I can do the {currency}100 emergency price for
 *     you" — the seller volunteering the floor, unasked, marked correct.
 *
 * Widening the first pass to the whole corpus is not the fix, and this was
 * measured rather than guessed: {currency}100 is ALSO the peeling's Offer 1 and
 * the bottom of every printed syringe ladder, so "any string with the floor
 * needs a manager" fires on 156 lines, nearly all of them correct. A guard that
 * cries wolf 150 times is a guard somebody deletes.
 *
 * So this pass is narrow on purpose. It fires only where the floor appears in
 * the SAME SENTENCE as floor language — floor, suelo, emergency, nuclear,
 * absolute minimum, last price — which is what a claim ABOUT the bottom rung
 * looks like and what a ladder listing never does. Listings are excluded
 * outright by their arrows.
 *
 * Measured on the corpus before the fixes: 6 hits, all three genuine, in both
 * languages, zero false positives.
 */
const DOCTRINE = new RegExp(
  [
    'floor', 'suelo', 'emergency', 'emergencia', 'nuclear',
    'absolute minimum', 'm[ií]nimo absoluto',
    'last price', '[uú]ltimo precio',
    'bottom rung', '[uú]ltimo escal[oó]n',
  ].join('|'),
  'i',
);

/** Question blocks, split on the `question:` key — one per quiz item. */
function questionBlocks(src) {
  const lines = src.split('\n');
  const marks = [];
  lines.forEach((l, i) => {
    if (/^\s*question:/.test(l)) marks.push(i);
  });
  return marks.map((start, n) => ({
    line: start + 1,
    body: lines.slice(start, n + 1 < marks.length ? marks[n + 1] : lines.length).join('\n'),
  }));
}

/**
 * The correct option plus both explanations — what the quiz TEACHES.
 *
 * The explanation is grabbed as its STRING LITERAL, on the key's line or the
 * next one. The first version of this walked forward from the key with a lazy
 * `[\s\S]{0,1400}?(?=\n\s*\w+:|$)` and, under the /m flag, `$` matches at every
 * line end — so it stopped dead at the end of the `explanation:` line and read
 * nothing at all. It still went green, because the one violation whose text sat
 * in an OPTION was caught by correctAnswers() above, and two that sat in
 * explanations sailed through. Found by running the finished guard against the
 * corpus from before the fixes and counting: two hits where the prototype had
 * found six.
 */
function taughtText(block) {
  const out = correctAnswers(block);
  const re = /^\s*explanation(?:Es)?:\s*(?:\r?\n\s*)?("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/gm;
  for (const m of block.matchAll(re)) out.push(m[1]);
  return out;
}

function doctrineHits(src) {
  const out = [];
  for (const { line, body } of questionBlocks(src)) {
    /* A manager anywhere in the question's own block is enough. The rule is
       that the seller is not the authority, not that every sentence repeats
       it. */
    if (AUTHORITY.test(body)) continue;
    for (const chunk of taughtText(body)) {
      for (const sentence of chunk.split(/(?<=[.!?])\s+/)) {
        /* An arrow means a ladder being printed out — 500 → 300 → … → 100 —
           which has to end at the floor and says nothing about who gives it. */
        if (sentence.includes('\u2192')) continue;
        if (FLOOR.test(sentence) && DOCTRINE.test(sentence)) {
          out.push({ line, sentence: sentence.replace(/\s+/g, ' ').trim().slice(0, 120) });
          break;
        }
      }
    }
  }
  return out;
}

/*
 * And the coach, which is seller-facing copy that no lesson guard would ever
 * open. demoCoach.ts writes sentences about the ladder from a seller's own
 * week — "the lowest you ever said out loud was X" — and the one about walking
 * further down is exactly the place a future edit could quietly hand over the
 * bottom rung. Same rule, applied to its message strings.
 */
function coachHits() {
  const src = readFileSync(join(SRC, 'utils', 'demoCoach.ts'), 'utf8');
  const out = [];
  for (const m of src.matchAll(/^\s*(body|bodyEs):\s*`([^`]*)`/gm)) {
    const text = m[2];
    if (AUTHORITY.test(text)) continue;
    for (const sentence of text.split(/(?<=[.!?])\s+/)) {
      if (FLOOR.test(sentence) || /\b100\b/.test(sentence)) {
        if (DOCTRINE.test(sentence)) {
          out.push({ line: src.slice(0, m.index).split('\n').length, sentence: sentence.slice(0, 120) });
          break;
        }
      }
    }
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

/* The narrow pass, over EVERY data file rather than the three lesson ones. */
for (const file of readdirSync(join(SRC, 'data')).filter((f) => f.endsWith('.ts'))) {
  const src = readFileSync(join(SRC, 'data', file), 'utf8');
  for (const h of doctrineHits(src)) {
    hits.push(`${file}:${h.line}  (a correct answer or explanation says it)  "${h.sentence}"`);
  }
}
for (const h of coachHits()) {
  hits.push(`utils/demoCoach.ts:${h.line}  (a coaching message says it)  "${h.sentence}"`);
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
