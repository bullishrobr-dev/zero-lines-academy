/*
 * Guard: no seller-facing content may make a tax claim.
 *
 * The owner's instruction was "you don't need to mention tax-free, tax haven."
 * The price comparison the shop actually teaches — Europe price vs the price
 * here — is verifiable and needs no tax explanation, so the claim buys nothing
 * and carries risk. This is a sibling of the earlier VAT-refund removal.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { SRC as ROOT } from './paths.mjs';

const BANNED = [
  /tax[\s-]?haven/i, /tax[\s-]?free/i, /duty[\s-]?free/i,
  /\bVAT\b/, /\bIVA\b/,
  /paraíso fiscal/i, /libres? de impuestos/i, /sin impuestos/i,
  /ventaja fiscal/i, /baja fiscalidad/i, /exento de impuestos/i,
  // the earlier removals, kept guarded so they cannot creep back
  /VAT refund/i, /nothing to declare/i, /nada que declarar/i,
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

const hits = [];
for (const file of walk(ROOT)) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    // The guard file's own comment block and this test are exempt nowhere —
    // but an explanatory code COMMENT about the removal is allowed, since it is
    // never rendered. Only flag lines that look like content or data.
    const isComment = /^\s*(\/\/|\*|\/\*)/.test(line);
    for (const rx of BANNED) {
      if (rx.test(line) && !isComment) {
        hits.push(`${file.replace(ROOT, 'src')}:${i + 1}  ${line.trim().slice(0, 110)}`);
        break;
      }
    }
  });
}

if (hits.length) {
  console.log(`FAIL — ${hits.length} tax claim(s) still in content:\n`);
  hits.slice(0, 40).forEach((h) => console.log('  ' + h));
  if (hits.length > 40) console.log(`  ...and ${hits.length - 40} more`);
  process.exit(1);
}
console.log('PASS  no tax claims in any seller-facing string');
