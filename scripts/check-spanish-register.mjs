/*
 * Guard: the Spanish in this app is spoken in Andorra and Gibraltar.
 *
 * It is European Spanish, informal "tú" — "vale", "cariño", "venga", "date un
 * capricho". The customer standing in front of the seller is a person you are
 * flirting a sale out of, not a form you are filling in, so she is never
 * "usted"; and the vocabulary is the one she uses at home, not the one a
 * translation engine reaches for. "Regresa mañana", "un carro", "tu celular",
 * "qué lindo" all read as foreign to her — which is the one thing a seller
 * cannot afford to sound.
 *
 * Sweep after sweep kept finding the same forms creeping back in, which is what
 * this file is for: the ones it catches cannot come back without failing CI.
 *
 * ── WHAT THIS DELIBERATELY ALLOWS ───────────────────────────────────────────
 *  1. Explanatory comments. A comment saying "no LatAm vocabulary here" is not
 *     content and is never rendered.
 *  2. Wrong answers in a quiz. Same resolution the other content guards use.
 *     Here the reason is narrower than in check-no-walkaways: a distractor is
 *     often the CUSTOMER's own words, and plenty of customers on that floor are
 *     Latin-American tourists who really do say "regreso mañana". What the
 *     seller says is what this guard is about.
 *  3. Peninsular words that merely look suspicious. "Vale" is the most common
 *     word in the corpus and it is correct. "Carrito", "cartera" (a wallet, not
 *     a handbag), "manejar objeciones" (to handle them, not to drive) and
 *     "reemplazar" are all fine here and none of them is flagged.
 *
 * ── WHAT THIS DELIBERATELY DOES NOT TRY TO DO ───────────────────────────────
 * Usted hiding in a verb ending — "¿puedo mostrarle?", "piense en ello",
 * "¿qué le parece?" — is not detectable without knowing whether "le" is the
 * customer or a third party the seller is talking ABOUT ("pide la opinión de
 * la pareja"). Those were fixed by hand; the pronoun itself is guarded here and
 * catches most regressions, because copy that slips into usted almost always
 * says the word at least once.
 *
 * Several other markers were tried and dropped for being unable to tell right
 * from wrong: bare "oigan"/"vengan"/"pasen" (identical to the ordinary third
 * person plural — "para que no te oigan"), any -en+pronoun ending (matches the
 * English words "suspense", "offense", "cleanse" and the tú imperative
 * "manténlo"), "calificar" (a customer can legitimately "calificar" as a
 * buyer), "gerente" and "reemplazar" (both real Spanish), and "banqueta"
 * (a stool in Spain, a pavement in Mexico — a kiosk owns stools).
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC as ROOT } from './paths.mjs';

/*
 * JS word boundaries are ASCII-only, so `\b` sees a boundary in the middle of
 * "déjala" and reports the LatAm "jala". Every pattern below brackets itself
 * with real letter tests instead.
 */
const L = '(?<![\\p{L}\\p{M}])';
const R = '(?![\\p{L}\\p{M}])';
const w = (body) => new RegExp(L + body + R, 'iu');

const MARKERS = [
  // The register itself. The customer is a "tú" — always, in both shops.
  [w('usted(es)?'), 'the customer is a "tú" — use tú/vosotros, not usted/ustedes'],
  /*
   * Ustedes imperatives. Only the forms carrying an attached pronoun are
   * listed: those cannot be anything else. A bare "vengan" or "prueben" is the
   * ordinary third person plural far more often than it is an order.
   */
  [w('(av[ií]senme|d[ií]ganme|d[ií]gannos|esc[uú]chenme|m[ií]ren(me|lo|la)|pru[eé]ben(lo|la)|h[aá]gan(lo|la)|v[eé]an(lo|la)|t[oó]men(lo|la)|s[ií]ganme|d[eé]jenme|[uú]sen(lo|la)|si[eé]ntense|ac[eé]rquense|p[oó]nganse|v[aá]yanse|esp[eé]renme)'),
    'ustedes imperative — a group is "vosotros": mirad, venid, probadlo'],
  // "Oigan" only where it is being used to hail people, never mid-sentence.
  [/(¡|"|“|^\s*)\s*oigan(?![\p{L}\p{M}])/iu, '"¡Oigan!" — say "¡Oye!" or "¡Chicas!"'],

  // Vocabulary. Each of these has a peninsular twin the seller actually says.
  [w('regres(o|as|a|amos|an|ar|ar[ée]|ar[aá]s|ar[aá]|aremos|ar[aá]n|aba|aban|[eé]|aste|[oó]|aron|ando|ad[oa]s?|ara|aras|aran|e|es|en|arte|arse)'),
    'regresar → volver (vuelvo, vuelve, volver)'],
  [w('pl[aá]tic(a|ar|as|amos|an|ando|ada|arte)'), 'platicar → hablar / charlar'],
  [w('agarr(a|ar|as|an|amos|ando|ad[oa]|[oó]|[eé]|e|en|arlo|arla|arle)'), 'agarrar → coger'],
  [w('jal(ar|a|as|an|amos|ando|[oó]|e|en|arlo|arla)'), 'jalar → tirar'],
  [w('lind[oa]s?|lind[ií]simo'), 'lindo/linda → bonito / guapa / precioso'],
  [w('carros?'), 'carro → coche'],
  [w('celular(es)?'), 'celular → móvil'],
  [w('computadoras?'), 'computadora → ordenador'],
  [w('aud[ií]fonos?'), 'audífonos → cascos / auriculares'],
  [w('ahorita'), 'ahorita → ahora mismo'],
  [/¿\s*mande\s*\?/iu, '¿Mande? → ¿Cómo?'],
  [w('manej(ar|a|as|o|e|es) (el|un|tu|su|mi) (carro|coche|auto|veh[ií]culo)'),
    'manejar (a vehicle) → conducir. "Manejar objeciones" is fine and is not flagged'],
  [w('boleta'), 'boleta de calificaciones → boletín de notas'],
  [w('calif[ií]cate'), 'califícate → puntúate'],
  [w('luc(e|es|en|[ií]a|ir[aá]|ir[aá]s) (m[áa]s|muy|bien|mejor|genial|preciosa)'),
    'lucir (to look) → parecer / verse guapa'],
  [w('(lo|la|te|se) tomes? (esto )?personal'), 'no lo tomes personal → no te lo tomes como algo personal'],
  [w('ap[uú]r(ate|ense|ese)|apurarse'), 'apúrate → date prisa'],
  [w('empaques?'), 'empaque → envase / embalaje'],
  [w('(rentar|checar|parqueo|elevador|refrigerador|boletos?|playeras?|lentes de sol)'),
    'LatAm vocabulary — alquilar, mirar, aparcamiento, ascensor, nevera, billete, camiseta, gafas de sol'],
  [w('([oó]rale|ch[eé]vere|padr[ií]simo|chido|platillo)'), 'not a word anyone says in Andorra or Gibraltar'],
];

/*
 * ── PRE-EXISTING DEBT ───────────────────────────────────────────────────────
 *
 * This list held the seventeen Latin-American lines that were already in the
 * tree when the guard was written, in files owned by work in flight at the
 * time. It was built so it could only ever shrink: a new occurrence anywhere
 * failed the build, and an entry that STOPPED matching also failed, telling
 * whoever fixed the line to delete it.
 *
 * It worked. All seventeen are fixed and the list is empty, which is the state
 * it was designed to reach. Leave it empty — if a future pass ever needs to
 * freeze debt again, the mechanism below still works, but a permanently
 * populated version of this is just an ignore-list wearing a disguise.
 */
const QUARANTINE = [];

/*
 * Two of the data files store their Spanish as \uXXXX escapes. Without decoding
 * them first the guard reads "regresarás" as an unremarkable ASCII string
 * and half the product copy is invisible to it.
 */
const decode = (s) => s.replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)));

/**
 * Lines that are WRONG ANSWERS in a quiz. Same resolution as the other content
 * guards: walk each options block and exempt every entry the correctIndex does
 * not point at.
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
const used = new Set();

for (const file of walk(ROOT)) {
  const src = readFileSync(file, 'utf8');
  const rel = file.replace(ROOT, 'src');
  const exempt = distractorLines(src);
  src.split('\n').forEach((raw, i) => {
    if (/^\s*(\/\/|\*|\/\*)/.test(raw)) return; // explanatory comments are not content
    if (exempt.has(i + 1)) return; // a wrong answer, often the customer's own words
    const line = decode(raw);
    for (const [rx, hint] of MARKERS) {
      const m = line.match(rx);
      if (!m) continue;
      const held = QUARANTINE.findIndex(([f, snip]) => rel === f && line.includes(snip));
      if (held >= 0) { used.add(held); break; }
      hits.push(`${rel}:${i + 1}  [${m[0]}]  ${hint}\n      ${line.trim().slice(0, 120)}`);
      break;
    }
  });
}

const stale = QUARANTINE.filter((_, idx) => !used.has(idx));

if (hits.length || stale.length) {
  if (hits.length) {
    console.log(`FAIL — ${hits.length} line(s) are not European Spanish:\n`);
    hits.slice(0, 40).forEach((h) => console.log('  ' + h));
    if (hits.length > 40) console.log(`  ...and ${hits.length - 40} more`);
    console.log('\nThe sellers and the customers are in Andorra and Gibraltar. Informal tú,');
    console.log('peninsular vocabulary. See the Language section of CLAUDE.md.');
  }
  if (stale.length) {
    console.log(`\n${hits.length ? 'ALSO: ' : 'FAIL — '}${stale.length} quarantine entr(y/ies) no longer match anything:\n`);
    stale.forEach(([f, s]) => console.log(`  ${f}  "${s}"`));
    console.log('\nSomeone fixed or moved these lines — good. Delete the entries from');
    console.log('QUARANTINE in this file so the list keeps shrinking.');
  }
  process.exit(1);
}

console.log(
  QUARANTINE.length
    ? `PASS  Spanish is peninsular and tú — ${QUARANTINE.length} pre-existing line(s) still quarantined`
    : 'PASS  Spanish is peninsular and tú everywhere'
);
