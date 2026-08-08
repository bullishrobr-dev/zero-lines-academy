/*
 * Guard: the live Supabase URL and anon key must never be committed blank.
 *
 * The app is DESIGNED to fall back to a committed roster and device-local
 * progress when those two values are empty, which is what makes it testable in
 * a sandbox with no network. That same property makes this the single most
 * dangerous file in the repo to leave half-edited: a blank pair still builds,
 * still typechecks, still passes every content check, still deploys — and
 * silently cuts every seller off from the database. Progress stops syncing and
 * the leaderboard empties, with nothing on screen to say why.
 *
 * It nearly happened: three agents were each told to blank the keys, build an
 * offline bundle to test against, and restore them. Concurrently, on one file.
 * One agent's "restore" could easily have written back another's blanked copy.
 * A guard is the right answer to that, not a reminder to be careful.
 */
import { readFileSync } from 'node:fs';
import { fromRoot } from './paths.mjs';

const FILE = fromRoot('src', 'backend', 'supabaseClient.ts');
const src = readFileSync(FILE, 'utf8');

const url = src.match(/export const SUPABASE_URL = '([^']*)'/)?.[1];
const key = src.match(/export const SUPABASE_ANON_KEY =\s*\n?\s*'([^']*)'/)?.[1];

const problems = [];
if (url === undefined) problems.push('SUPABASE_URL declaration not found');
else if (!url.trim()) problems.push('SUPABASE_URL is blank');
else if (!/^https:\/\/[a-z0-9]+\.supabase\.co$/.test(url)) problems.push(`SUPABASE_URL looks wrong: ${url}`);

if (key === undefined) problems.push('SUPABASE_ANON_KEY declaration not found');
else if (!key.trim()) problems.push('SUPABASE_ANON_KEY is blank');
else if (!key.startsWith('eyJ')) problems.push('SUPABASE_ANON_KEY is not a JWT');

/* The service_role key bypasses every row-level-security policy. It must never
   reach the browser bundle, and this repo is public. */
if (/sb_secret_|service_role/.test(key ?? '')) problems.push('SERVICE ROLE KEY PRESENT — this bypasses all RLS, remove it immediately');

if (problems.length) {
  console.log('FAIL — src/backend/supabaseClient.ts:\n');
  problems.forEach((p) => console.log('  ' + p));
  console.log('\nRestore with:  git checkout src/backend/supabaseClient.ts');
  console.log('(then re-apply only the BUILD_STAMP bump if you were mid-deploy)');
  process.exit(1);
}
console.log('PASS  live backend keys present and well-formed');
