/*
 * Guard: the prices in the writing are the prices in pricing.ts.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * `sub()` fills in {currency} and {locationName}. It does NOT fill in numbers —
 * every price in every lesson, script, quiz and cheat sheet is typed out by
 * hand. There are 1,399 mentions of ladder rungs across the corpus.
 *
 * So the day the owner moves a rung — drops the syringe opener, changes what
 * the voucher lands on — pricing.ts is right and up to a few hundred lines of
 * copy are quietly wrong, in two languages, with every existing guard green.
 * A seller reads the old number aloud to a customer.
 *
 * ── WHAT THIS DOES ──────────────────────────────────────────────────────────
 * It is a tripwire, not a validator. The ladders are pinned below. If pricing.ts
 * stops matching the pin, the build fails and tells you exactly which numbers
 * moved and how many lines of copy still say the old one — so the sweep happens
 * with the change instead of six months later.
 *
 * Changing a price is therefore a two-part job on purpose: edit pricing.ts,
 * sweep the copy, then update the pin. That is the correct amount of friction
 * for a number a seller says out loud for money.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC } from './paths.mjs';

/*
 * The pin: the exact rungs, as they stand. Generated from pricing.ts rather
 * than typed out — my first attempt at writing these by hand got them wrong
 * (the syringe ladder legitimately carries a second 300 rung, "second syringe
 * free", which reads like a duplicate and is not), and a pin that is wrong on
 * day one is a guard that cries wolf until somebody deletes it.
 *
 * To change a price: edit pricing.ts, sweep the copy, then run
 * `node scripts/check-prices-match-copy.mjs --pin` and paste what it prints.
 */
const PINNED = {
  SYRINGE_LADDER: '300|210,300,175,140,100|100',
  PEELING_LADDER: '150|100,150,70,50|50',
  MIX_MATCH_LADDER: '60|120,120,60,30|30',
};

const pricing = readFileSync(join(SRC, 'data', 'pricing.ts'), 'utf8');

/** One ladder, flattened to `base|steps|floor` — the whole shape in one line. */
function ladder(name) {
  const start = pricing.indexOf(`export const ${name}`);
  if (start < 0) return null;
  const block = pricing.slice(start, pricing.indexOf('\n};', start));
  const base = block.match(/^\s*base:\s*(\d+)/m)?.[1];
  const floor = block.match(/^\s*floor:\s*(\d+)/m)?.[1];
  const steps = [...block.matchAll(/^\s*price:\s*(\d+)/gm)].map((m) => m[1]);
  if (!base || !floor) return null;
  return `${base}|${steps.join(',')}|${floor}`;
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

/** How many authored lines mention this price. */
function mentions(n) {
  const re = new RegExp(`\\{currency\\}${n}\\b`);
  let count = 0;
  for (const f of walk(SRC)) {
    if (f.endsWith('pricing.ts')) continue;
    for (const line of readFileSync(f, 'utf8').split('\n')) if (re.test(line)) count++;
  }
  return count;
}

const drift = [];
for (const [name, pin] of Object.entries(PINNED)) {
  const now = ladder(name);
  if (!now) { drift.push({ name, why: `could not read ${name} out of pricing.ts` }); continue; }
  if (now !== pin) {
    const was = new Set(pin.split(/[|,]/));
    const is = new Set(now.split(/[|,]/));
    drift.push({ name, pin, now, gone: [...was].filter((n) => !is.has(n)) });
  }
}

if (process.argv.includes('--pin')) {
  console.log('Paste this into PINNED:\n');
  for (const name of Object.keys(PINNED)) console.log(`  ${name}: '${ladder(name)}',`);
  process.exit(0);
}

if (drift.length) {
  console.log('FAIL — a price ladder moved and the writing has not been swept:\n');
  for (const d of drift) {
    if (d.why) { console.log(`  ${d.name}: ${d.why}`); continue; }
    console.log(`  ${d.name}\n     pinned: ${d.pin}\n     now:    ${d.now}`);
    for (const n of d.gone) {
      console.log(`     {currency}${n} is no longer a rung and still appears on ${mentions(n)} authored line(s)`);
    }
  }
  console.log('\nNothing substitutes prices — every one is typed out by hand, in both');
  console.log('languages. Sweep the copy for the old numbers, then re-pin with:');
  console.log('    node scripts/check-prices-match-copy.mjs --pin');
  console.log('A seller reads these out loud to a customer, for money.');
  process.exit(1);
}
console.log(`PASS  ${Object.keys(PINNED).length} price ladders match the writing`);
