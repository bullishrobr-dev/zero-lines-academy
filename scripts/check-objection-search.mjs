/*
 * Guard: every objection a seller can tap is findable by typing it.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * The journal gives the seller eight chips for why a customer walked. Those
 * labels are the shop's own words for the eight objections, so they are also
 * the words a seller will type into the cheat-sheet search thirty seconds
 * later, with the next customer already in front of them.
 *
 * "Me lo pienso" — the chip for the second most common objection there is —
 * returned zero results. The corpus only ever carried the infinitive,
 * "pensar", and the search is a substring match, so the conjugated form a real
 * customer actually says could never hit anything. A search that returns
 * nothing mid-sale is a phone going back into a pocket.
 *
 * ── WHAT THIS CHECKS ────────────────────────────────────────────────────────
 * For every chip label, in both languages: at least one significant word of it
 * is either written somewhere in the cheat-sheet corpus, or listed in
 * SEARCH_ALIASES so that it resolves to a word that is.
 *
 * That is deliberately weaker than running the real search — it does not prove
 * the RIGHT card comes back first. It proves the seller is not looking at an
 * empty screen, which is the failure that actually happened.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SRC } from './paths.mjs';

const fold = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/* Words too common to prove anything. If the only word of a label that the
   corpus knows is "my", the seller has not found her objection. */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'my', 'me', 'it', 'is', 'for', 'to', 'no', 'not', 'and', 'or', 'of',
  'lo', 'la', 'el', 'los', 'las', 'un', 'una', 'mi', 'es', 'para', 'y', 'o', 'de', 'se',
  'they', 'just', 'let', 'been', 'more', 'mas', 'ya', 'han', 'sin', 'solo', 'nada',
]);

const chipsSrc = readFileSync(join(SRC, 'data', 'encounterChips.ts'), 'utf8');
const cheatsSrc = readFileSync(join(SRC, 'data', 'cheatSheets.ts'), 'utf8');
const pageSrc = readFileSync(join(SRC, 'pages', 'CheatSheetsPage.tsx'), 'utf8');

/* Only the walk-away reasons. The closer chips ('The demo', 'It just clicked')
   are not things a customer says, so nobody searches for them. */
const walkBlock = chipsSrc.slice(
  chipsSrc.indexOf('WALK_REASONS'),
  chipsSrc.indexOf('CLOSE_REASONS', chipsSrc.indexOf('WALK_REASONS'))
);

const labels = [];
for (const m of walkBlock.matchAll(/label:\s*'([^']+)',\s*labelEs:\s*'([^']+)'/g)) {
  /* "Nothing, they just left" is not an objection — it is the absence of one,
     and the app excludes it from the counts for the same reason. */
  if (/^Nothing/i.test(m[1])) continue;
  labels.push({ en: m[1], es: m[2] });
}

if (labels.length < 5) {
  console.log('FAIL — could not parse WALK_REASONS out of encounterChips.ts.');
  console.log('       The guard cannot check what it cannot read. Fix the parser or the file.');
  process.exit(1);
}

/* Everything a seller could match against: the cheat-sheet corpus, plus every
   alias row, folded once. */
const corpus = fold(cheatsSrc);
const aliasBlock = pageSrc.slice(
  pageSrc.indexOf('const SEARCH_ALIASES'),
  pageSrc.indexOf('];', pageSrc.indexOf('const SEARCH_ALIASES'))
);
const aliasWords = new Set(
  [...aliasBlock.matchAll(/'([^']+)'/g)].map((m) => fold(m[1]))
);

/** A word counts if the corpus contains it, or an alias row carries it. */
const findable = (word) => corpus.includes(word) || aliasWords.has(word);

const misses = [];
for (const { en, es } of labels) {
  for (const [lang, label] of [['en', en], ['es', es]]) {
    const words = fold(label)
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w));
    if (words.length === 0) continue;
    if (!words.some(findable)) misses.push(`${lang}  "${label}"  (tried: ${words.join(', ')})`);
  }
}

if (misses.length) {
  console.log(`FAIL — ${misses.length} objection chip label(s) find nothing in search:\n`);
  misses.forEach((m) => console.log('  ' + m));
  console.log('\nA seller taps this chip in the journal and then types the same words into');
  console.log('the cheat sheet with a customer waiting. Add a row to SEARCH_ALIASES in');
  console.log('src/pages/CheatSheetsPage.tsx joining the word she types to the word the');
  console.log('corpus uses — that is what it is for.');
  process.exit(1);
}
console.log(`PASS  every objection chip is findable — ${labels.length} chips, both languages`);
