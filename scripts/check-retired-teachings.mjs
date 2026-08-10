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

const hits = [];
for (const file of walk(SRC)) {
  const rel = file.slice(SRC.length + 1).split('\\').join('/');
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (IS_COMMENT.test(line)) return;
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
