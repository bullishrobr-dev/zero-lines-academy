/*
 * Guard: things the owner has retired stay retired.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * Content in this app gets rewritten a lot, and a retired teaching does not die
 * in one place — it dies in a lesson, and survives in a flashcard, a quiz
 * distractor, a daily dose and a Spanish twin. The 2-metre rule was in seven
 * files under four different names. Every one of them was reachable by a seller
 * standing on the pavement, and each one taught him to start his approach at a
 * distance the owner says loses the customer.
 *
 * So each entry below is a thing he has explicitly killed, with his reason and
 * what replaced it. If you are here because the build went red, do not add an
 * exemption — read the reason and write the replacement.
 *
 * Guards for tax claims, lasting promises and walkaways live in their own
 * scripts because each carries a lot of context. This file is for retirements
 * that are one rule each.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC } from './paths.mjs';

const RETIRED = [
  {
    name: 'the 2-metre rule',
    /* "2m is way too close, man. If it's 2m it's too too close, so they're
       gonna actually pass. You wanna get their attention like 4 or 5m away." */
    patterns: [
      /\b(?:1\.5|2|two)[\s-]?met(?:re|er|ro)s?\b/i,
      /\b2[\s-]?met(?:re|er|ro)\b/i,
      /regla de (?:los )?2 metros/i,
      /2-met(?:re|er) (?:rule|zone|strike)/i,
      /\barm[\s-]lengths?\b/i,
      /brazo y medio/i,
      /strike zone|zona de ataque/i,
    ],
    replacement:
      'Four or five metres, and it is where you GET THEIR ATTENTION while they\n' +
      '    are still walking — not where you start the approach. You only close the\n' +
      '    distance once they have looked at you. Write it in prose; it is a\n' +
      '    distance, not a named rule, and it is not "the 4-metre rule" either.',
  },
  {
    name: 'naming a disease or condition',
    /* CLAUDE.md: "Naming a disease or a medical condition the product helps
       with is not [fine], and that is not squeamishness: it is a claim about a
       vulnerable person that a seller would be saying out loud to their face."
       Two product scripts said "dermatologists recommend it for eczema,
       psoriasis…" in both languages, and no guard had ever looked. Puffery is
       fine — "the driest skin in the world uses this" is fine. An illness is
       not. */
    patterns: [
      /\b(eczema|psoriasis|psoriasi|dermatitis|rosacea|rosácea|acn[eé]|vitiligo|melasma)\b/i,
      /\b(cancer|c[áa]ncer|tumou?r|diabet|arthrit|artritis|alzheimer|lupus)\b/i,
      /(treats?|cures?|heals?|remedy for|trata|cura|remedio para)\s+(your\s+)?(skin\s+)?(condition|disease|enfermedad|afecci[oó]n)/i,
      /dermatologist(s)? (recommend|prescribe)|los dermat[oó]logos (lo )?recomiendan/i,
      /clinically proven|cl[ií]nicamente probado|medically proven|m[eé]dicamente probado/i,
    ],
    replacement:
      'Say it as puffery about the SKIN, not as a claim about an illness: "the\n' +
      '    driest skin in the world uses this", "people who cannot put anything on\n' +
      '    their face use this". Never name a condition, never borrow a doctor\n' +
      "    to vouch for it. A seller says this out loud to somebody who may have\n" +
      '    the thing you just named.',
  },
  {
    name: 'the 45-degree angle',
    /* "This 45 degree angle is kind of stupid. It's just important to let the
       people know that you don't want to be in their face. Talk to them a
       little bit from the side, but it has been repeated so many times it
       makes it a little bit stupid." */
    patterns: [/\b45[\s-]?(?:degrees?|grados)\b/i, /\b45[\s-]?degree\b/i, /ángulo de 45/i],
    replacement:
      'Keep the principle, lose the protractor: do not stand in their face, do\n' +
      '    not block the path, come at them a bit from the side. Say it in the\n' +
      '    words a seller would use — and say it ONCE, in the lesson that owns it.',
  },
];

function walk(dir) {
  const out = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(ts|tsx)$/.test(p)) out.push(p);
  }
  return out;
}

/* A comment explaining the retirement is not the retirement coming back — this
   file's own patterns would otherwise fail it, and so would the note left in a
   lesson saying what used to be there. */
const IS_COMMENT = /^\s*(?:\/\/|\*|\/\*)/;

/* Structural exemptions, the same two the walkaway guard needs and for the
   same reason: a rule about what a SELLER SAYS must not fire on the question
   that describes the customer's situation, or on a wrong answer that exists to
   be rejected. The acne question is the case that proves it — its correct
   answer refuses the claim and its explanation says "do not put a name on what
   she has", which is the guard's own argument written out for the seller. */
const NAMING_FIELD =
  /^\s*(?:question|questionEs|title|titleEs|label|labelEs|name|nameEs|head|headEs|subtitle|subtitleEs)\s*:/;

/** Wrong answers, resolved against their own correctIndex. */
function distractorLines(src) {
  const exempt = new Set();
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*options(Es)?:\s*\[/.test(lines[i])) continue;
    const opts = [];
    let j = i + 1;
    for (; j < lines.length && !/^\s*\]/.test(lines[j]); j++) opts.push(j);
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

const hits = [];
for (const file of walk(SRC)) {
  const rel = file.slice(SRC.length + 1).split('\\').join('/');
  const src = readFileSync(file, 'utf8');
  const distractors = distractorLines(src);
  const all = src.split('\n');
  all
    .forEach((line, i) => {
      if (IS_COMMENT.test(line)) return;
      if (NAMING_FIELD.test(line)) return;
      /* `question:` on one line and its string on the next — the prettier
         format this repo uses for anything long. The string still belongs to a
         field that only NAMES the situation. */
      if (i > 0 && /^\s*(?:question|questionEs|title|titleEs|label|labelEs|subtitle|subtitleEs)\s*:\s*$/.test(all[i - 1])) return;
      if (distractors.has(i + 1)) return;
      for (const r of RETIRED) {
        if (r.patterns.some((rx) => rx.test(line))) {
          hits.push({ rel, line: i + 1, text: line.trim().slice(0, 120), rule: r });
          break;
        }
      }
    });
}

if (hits.length) {
  const groups = new Map();
  for (const h of hits) {
    if (!groups.has(h.rule.name)) groups.set(h.rule.name, { rule: h.rule, rows: [] });
    groups.get(h.rule.name).rows.push(h);
  }
  console.log(`FAIL — ${hits.length} line(s) teach something the owner retired:\n`);
  for (const { rule, rows } of groups.values()) {
    console.log(`  ${rule.name} — ${rows.length} line(s)`);
    rows.forEach((r) => console.log(`    ${r.rel}:${r.line}  ${r.text}`));
    console.log(`    → ${rule.replacement}\n`);
  }
  console.log('Fix the Spanish twin as well as the English. Half the team reads');
  console.log('the Spanish, and a half-applied fix ships without anyone noticing.');
  process.exit(1);
}
console.log(`PASS  nothing teaches a retired rule — ${RETIRED.length} retirements held`);
