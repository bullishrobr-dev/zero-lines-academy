/*
 * Guard: index.html may not ask a third party for anything.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * The shell is the only thing standing between a seller and a white screen.
 * Every <link> and <script src> in it is render-blocking or boot-blocking, and
 * anything pointing at another origin turns "does the app open" into "is that
 * other company reachable from this basement".
 *
 * It was fonts.googleapis.com. Three families, one stylesheet, and on a
 * throttled connection it held the first paint for 12.6 seconds while a
 * customer stood there waiting. Worse, the service worker never cached those
 * requests, so the offline mode the whole app is built around still fell back
 * to Georgia the moment the signal went.
 *
 * The fonts now ship with the bundle — see the @font-face block at the top of
 * src/index.css. This exists so nobody helpfully adds the <link> back.
 *
 * Supabase is deliberately not covered here: it is called from application
 * code, after paint, and the app is designed to work when it cannot be
 * reached. The rule is about the shell, not about the network in general.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './paths.mjs';

const html = readFileSync(join(ROOT, 'index.html'), 'utf8');

/* Strip comments first — this file's own explanation names the host it bans,
   and so does the note sitting where the <link> used to be. */
const live = html.replace(/<!--[\s\S]*?-->/g, '');

const hits = [];
const TAG = /<(link|script|iframe|img)\b[^>]*>/gi;
const URL_ATTR = /\b(?:href|src)\s*=\s*["']([^"']+)["']/i;

for (const [tag] of live.matchAll(TAG)) {
  const m = tag.match(URL_ATTR);
  if (!m) continue;
  const url = m[1].trim();
  if (/^(https?:)?\/\//i.test(url)) hits.push(url);
}

/* preconnect/dns-prefetch carry no resource but announce the intent to fetch
   one, and they are how the <link> comes back a week later. */
for (const [tag] of live.matchAll(/<link\b[^>]*>/gi)) {
  if (/rel\s*=\s*["'](preconnect|dns-prefetch|preload|modulepreload)["']/i.test(tag)) {
    const m = tag.match(URL_ATTR);
    if (m && /^(https?:)?\/\//i.test(m[1].trim()) && !hits.includes(m[1].trim())) {
      hits.push(m[1].trim());
    }
  }
}

if (hits.length) {
  console.log(`FAIL — index.html reaches ${hits.length} other origin(s) before the app boots:\n`);
  hits.forEach((h) => console.log('  ' + h));
  console.log('\nShip it with the bundle instead. The seller is in a basement with a');
  console.log('customer in front of them; the shell has to open on its own.');
  process.exit(1);
}
console.log('PASS  index.html boots without asking anyone else for anything');
