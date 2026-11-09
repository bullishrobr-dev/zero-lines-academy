/*
 * `npm run print` — rebuild every printable sheet from the app's own data.
 *
 * The whole point is that these are GENERATED. Move a rung in pricing.ts,
 * rewrite a demo step, retire a claim — run this and every sheet follows. A
 * printed handout that disagrees with the app is worse than no handout, because
 * a seller trusts paper.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderAll } from './render.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', '..', 'print');

/* Run through tsx (see the `print` script in package.json): the content
   modules are TypeScript and import the app's own data directly, which is the
   whole point — there is no second copy of the corpus to go stale. */
const mods = await Promise.all([
  import('./content/stopping.ts').catch(() => null),
  import('./content/syringe.ts').catch(() => null),
  import('./content/peeling.ts').catch(() => null),
  import('./content/scrub.ts').catch(() => null),
  import('./content/nailkit.ts').catch(() => null),
  import('./content/cards.ts'),
]);

const docs = [];
const missing = [];
const builders = [
  ['stopping', 'buildStoppingDocs'],
  ['syringe', 'buildSyringeDocs'],
  ['peeling', 'buildPeelingDocs'],
  ['scrub', 'buildScrubDocs'],
  ['nailkit', 'buildNailKitDocs'],
  ['cards', 'buildCardDocs'],
];
mods.forEach((m, i) => {
  const [name, fn] = builders[i];
  if (!m || typeof m[fn] !== 'function') { missing.push(name); return; }
  docs.push(...m[fn]());
});
if (missing.length) console.log(`  (not built yet: ${missing.join(', ')})`);

/* A sheet that still carries a template token means the substitution was
   skipped somewhere, and it would print "{currency}140" for a seller to read
   out. Fail loudly rather than quietly produce it. */
const leaked = docs.filter((d) => /\{\s*(currency|locationName|location)\s*\}|\$\{/.test(JSON.stringify(d)));
if (leaked.length) {
  console.error(`FAIL — ${leaked.length} doc(s) still contain a template token:`);
  leaked.forEach((d) => console.error('  ' + d.slug));
  process.exit(1);
}

mkdirSync(OUT, { recursive: true });
const written = await renderAll(docs, OUT);
console.log(`PASS  ${written.length} sheet(s) written to print/`);
for (const d of docs) console.log(`      ${d.kind.padEnd(6)} ${d.slug}`);
