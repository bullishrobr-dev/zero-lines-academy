/*
 * Guard: no seller-facing line may send the customer out of the shop.
 *
 * The owner's rule, and it overrides every other consideration in the app:
 *
 *   "We don't want them to leave the shop. That's a rule. As far as we are
 *    concerned if they left the shop they are never coming back. 'Think about
 *    it.' Absolutely fucking not! It's direct selling."
 *
 * This is not politeness policing. The lines this catches are the POLITE ones —
 * "take this card with the price on it", "come back when you have decided",
 * "the offer will still be here". They sound helpful and professional, they
 * feel like good service, and they walk a customer who was ready to buy
 * straight out of the door. One of them was the CORRECT ANSWER in a quiz, so
 * sellers were being actively taught to lose the sale.
 *
 * ── WHAT THIS DELIBERATELY ALLOWS ───────────────────────────────────────────
 *  1. The customer's own words. "I need to think about it" is the objection
 *     being answered; it appears as a script title, a quiz question and a chip
 *     label. Naming the objection is not committing it, so the fields that name
 *     things are exempt.
 *  2. Wrong answers in a quiz. A distractor exists to be rejected — the
 *     take-away card is now a distractor precisely so sellers learn not to do
 *     it. Options are resolved against their own correctIndex.
 *  3. Lines that forbid it rather than do it ("never say come back tomorrow").
 *  4. "No pressure" on its own, which is a softener used to earn the demo
 *     rather than an exit. Keep the softness, lose the door.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC as ROOT } from './paths.mjs';

/*
 * Unambiguously handing the customer the door, in either language.
 *
 * Deliberately NOT in this list: "take your time", "sin prisa", "have a think".
 * They read like violations and mostly are not — a couple conferring at the
 * table, someone reading the box in their hands, a stage direction telling the
 * seller not to rush. None of those is a customer leaving, and the rule is
 * about leaving. Flagging them would train people to ignore this guard.
 */
const WALKAWAY = [
  /come back (later|tomorrow|another day|when you|once you)/i,
  /the (offer|price|deal) will still be (here|there|around)/i,
  /still be here (when|tomorrow|later)/i,
  /(take|here is|here's) (this|the|a) (sample )?card/i,
  /card with the price/i,
  /while you (look|have a look) around/i,
  /hold (it|one|that) (for you )?at the counter/i,
  /business card/i,
  /* Open-ended returns. "Come back whenever you like" reads warmer than "come
     back tomorrow" and does exactly the same job, which is why the first
     version of this list missed it. Same for "pop back", "drop back in" and
     "the offer is not going anywhere". */
  /(come|pop|drop|call) (back|in) (whenever|any ?time|if you|later|again)/i,
  /(is|are)(n't| not) going anywhere/i,
  /we'?re (open|here) (all|till|until|tomorrow)/i,
  /have a (think|look) (about it )?and (come|pop|let)/i,
  /(send|write|note) (you |them )?the price/i,
  /think about it and (come|let|get)/i,
  /* "Plant a seed and let them go" — the politest walkaway in the language,
     and it was being taught as the ROUTINE read of crossed arms after a price.
     Crossed arms after a price is the ladder asking to be walked. */
  /plant(ing)? a seed (for|and)/i,
  /let (them|her|him) go (gracefully|warmly|politely|with a smile)/i,
  /(walk|move) (them|her|him) (on|along) (gently|politely)/i,

  /vuelve cuando (quieras|te apetezca|lo tengas)/i,
  /(vuelve|p[áa]sate) (m[áa]s tarde|otro rato|luego)/i,
  /no se va a ninguna parte/i,
  /aqu[ií] estaremos (ma[ñn]ana|luego|todo el d[ií]a)/i,
  /te (mando|escribo|apunto) el precio/i,
  /pi[eé]nsatelo y (vuelve|me dices|luego)/i,
  /(planta|siembra) (una )?semilla (para|y|de cara)/i,
  /d[eé]jal[oa]s? ir (con elegancia|con calidez|con una sonrisa)/i,

  /vuelve (cuando|ma[ñn]ana|otro d[ií]a|luego)/i,
  /p[áa]sate cuando quieras/i,
  /la oferta seguir[áa]/i,
  /el precio seguir[áa]/i,
  /ll[eé]vate (esta|la) tarjeta/i,
  /tarjeta con el precio/i,
  /tarjeta de presentaci[oó]n/i,
  /mientras (das una vuelta|mira alrededor)/i,
  /reservarlo en el mostrador/i,
];

/** The line is stating the rule, or warning against it, not doing it. */
const NEGATED =
  /never say|do not say|don't say|nunca digas|no digas|nada de |what NOT|NOT to Do|worst |peor |never (offer|hand|give)|nunca (ofrezcas|des)|loses the sale|pierde la venta|kill(s|ed)? the sale|mata(do)? la venta|never (come|comes|came) back|never return|no vuelve|means never|significa nunca|without a plan|sin un plan|they will not|no van a volver|walking out|se va(n)? (la venta|andando)|is the sale|es la venta/i;

/*
 * Safety, not salesmanship. You cannot put acid on broken skin today whatever
 * the sales rule says, so the copy that sends someone away to heal first is
 * the one place "come back when…" is the honest answer.
 */
const SAFETY = /SAFETY|seguridad|broken skin|inflamed|piel (da[ñn]ada|irritada)|irritation|scarring|cicatri/i;

/*
 * THE THREE EXCEPTIONS. All three are the owner's own words, all three are
 * narrow, and copy only gets the exemption when the surrounding lines say
 * plainly which one it is in. See CLAUDE.md.
 *
 *  1. A to Z and it did not work — you gave it 100% and nothing landed.
 *
 *  2. The demo died in front of a crowd. "There is no point trying to sell to
 *     a dead body. Get them out of the shop, and you continue with the next
 *     one." Two seconds to fight it, and no pivot to another product.
 *
 *  3. She has been abandoned mid-demo — husband gone, friends gone, nobody
 *     behind her. The only place in this app where "come back later" is right:
 *     "Go think about it, see how it looks, come back later. I'll fix your
 *     other eye, even if you don't buy anything." She leaves with one eye done
 *     and a reason to walk back in, which is a hook rather than a polite exit.
 *
 * Deliberately NOT exempt: the seller who is bored, the customer who "looks
 * like a time waster", anything softened with "gracefully". Those are the
 * walkaways this guard exists for.
 */
const LAST_RESORT =
  /nothing (else )?work|if nothing|si no funciona|last resort|[úu]ltimo recurso|let (them|her|him) go|d[eé]jal[oa]s? ir|tried everything|lo has intentado todo|dead body|cuerpo (sin vida|muerto)|it is dead|est[áa] muert|died in front|se muri[óo] delante|abandon|abandonad|on her own|sola en la silla|nobody (behind|with) her|nadie detr[áa]s|husband (has )?(left|walked|gone)|el marido se ha ido|friends (have )?(left|gone)|las amigas se han ido/i;

/** Fields that NAME an objection rather than script the seller's answer. */
const NAMING_FIELD = /^\s*(title|titleEs|question|questionEs|label|labelEs|head|headEs|name|nameEs)\s*:/;

/**
 * The objection-and-answer form the lesson bodies use:
 *
 *   'I'LL THINK ABOUT IT AND COME BACK' → 'What is there to think about? …'
 *
 * Everything left of the arrow is the CUSTOMER talking — the objection being
 * answered, not a line the seller says. Only what follows the arrow is the
 * seller's script, so that is the only part worth testing. Strip rather than
 * exempt: a walkaway hiding in the ANSWER still has to fail.
 */
function sellerPart(line) {
  const i = line.indexOf('→');
  return i === -1 ? line : line.slice(i + 1);
}

/**
 * Scored exercise choices — `{ text, feedback, score }` in generalExercises.ts
 * and its siblings. A low-scoring choice is a wrong answer with the reasoning
 * attached ("Giving a card means you will likely never see them again"), which
 * is the guard's own argument, written out for the seller. The block above
 * only understands quiz `options` + `correctIndex`, so this covers the other
 * shape. A choice scoring well is a recommended line and stays in scope.
 */
const GOOD_ANSWER_SCORE = 60;
function lowScoringChoiceLines(src) {
  const exempt = new Set();
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (!/^\s*text(Es)?:\s*['"`]/.test(lines[i])) continue;
    // Look ahead for this choice's score, stopping at the next choice.
    for (let k = i + 1; k < Math.min(i + 12, lines.length); k++) {
      /* Only a bare `text:` starts the NEXT choice. Breaking on `textEs:` too
         would stop the search on the very next line, which is exactly how the
         first version of this silently exempted nothing at all. */
      if (/^\s*text:\s*['"`]/.test(lines[k])) break;
      const m = lines[k].match(/^\s*score:\s*(\d+)/);
      if (!m) continue;
      if (Number(m[1]) < GOOD_ANSWER_SCORE) exempt.add(i + 1);
      break;
    }
  }
  return exempt;
}

/**
 * Lines that are WRONG ANSWERS in a quiz — there to be rejected, not said.
 * Same resolution the other content guards use: walk each options block and
 * exempt every entry that is not the one correctIndex points at.
 */
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
  const lowScoring = lowScoringChoiceLines(src);
  const all = src.split('\n');
  all.forEach((raw, i) => {
    const line = sellerPart(raw);
    if (/^\s*(\/\/|\*|\/\*)/.test(line)) return; // explanatory comments are not content
    if (NAMING_FIELD.test(line)) return; // naming the objection is not committing it
    /* A field whose value sits on the following line — `question:\n  "…"`. The
       string still belongs to a field that only NAMES the objection. */
    if (i > 0 && /^\s*(title|titleEs|question|questionEs|label|labelEs|head|headEs)\s*:\s*$/.test(all[i - 1])) return;
    if (NEGATED.test(line)) return;
    /* Context, not just the line: a "Nothing works" block header licenses the
       lines underneath it, and each language twin must be judged the same way
       or one passes and the other fails on wording alone. */
    const context = all.slice(Math.max(0, i - 4), i + 1).join(' ');
    if (LAST_RESORT.test(context)) return; // the rare A-to-Z-failed exit he allows
    if (SAFETY.test(context)) return;
    if (exempt.has(i + 1)) return; // a wrong answer, there to be rejected
    if (lowScoring.has(i + 1)) return; // a scored exercise choice marked wrong
    for (const rx of WALKAWAY) {
      if (rx.test(line)) {
        hits.push(`${file.replace(ROOT, 'src')}:${i + 1}  ${raw.trim().slice(0, 130)}`);
        break;
      }
    }
  });
}

if (hits.length) {
  console.log(`FAIL — ${hits.length} line(s) send the customer out of the shop:\n`);
  hits.forEach((h) => console.log('  ' + h));
  console.log('\nThe rule: if they leave, they are never coming back. See CLAUDE.md.');
  console.log('Answer the objection and keep them in front of you, or make the line a');
  console.log('quiz distractor so sellers learn not to say it.');
  process.exit(1);
}
console.log('PASS  nothing tells the customer to leave and come back');
