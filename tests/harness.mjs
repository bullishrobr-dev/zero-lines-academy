/*
 * Shared browser harness for the smoke test.
 *
 * ── THREE TRAPS THAT MADE EARLIER RUNS LIE ──────────────────────────────────
 *  1. The app opens on ONBOARDING, not the sign-in form. A script that goes
 *     straight for the inputs finds none and times out — or worse, finds two
 *     and fills the wrong screen.
 *  2. `page.url()` has no hash on first load, so "does the url contain #/auth"
 *     is FALSE before the router has even redirected. A whole 320px sweep once
 *     came back clean because of that: it had never got past the sign-in
 *     screen and every assertion ran against the auth page.
 *  3. Something else was already on port 4173. A leftover server from hours
 *     earlier kept the port, the new one slid quietly to 4174, and a full
 *     twelve-check run came back green having tested a build six versions
 *     old. Nothing in the output said so.
 *
 * So: click through onboarding, assert on `location.hash` AFTER the router has
 * run, and check the build stamp on the sign-in screen is the one we just
 * built. Each of those throws. A smoke test that quietly checks the wrong
 * thing thirty times is worse than no smoke test — it is a green tick over a
 * regression.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));

/*
 * What the app under test should say it is. Read out of the fixture rather
 * than written here, so it cannot drift; ZL_EXPECT_STAMP overrides it when you
 * point the harness at a production build by hand.
 */
const EXPECTED_STAMP =
  process.env.ZL_EXPECT_STAMP ||
  readFileSync(join(HERE, 'fixtures', 'supabaseClient.ts'), 'utf8')
    .match(/BUILD_STAMP\s*=\s*'([^']+)'/)?.[1];

/** Set ZL_CHROME to use a preinstalled browser instead of Playwright's own. */
const EXECUTABLE = process.env.ZL_CHROME || undefined;

export async function launch({ width = 390, height = 844, dark = false } = {}) {
  const browser = await chromium.launch({
    ...(EXECUTABLE ? { executablePath: EXECUTABLE } : {}),
    args: ['--no-sandbox'],
  });
  const ctx = await browser.newContext({
    viewport: { width, height },
    colorScheme: dark ? 'dark' : 'light',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && !/favicon|ERR_CONNECTION_RESET/.test(m.text())) errors.push(m.text());
  });
  return { browser, ctx, page, errors };
}

/*
 * Signs in as the throwaway account baked into the test build — see
 * tests/fixtures/accounts.ts. No repository secret, and the account cannot
 * reach the live site.
 *
 * Both are overridable, because pointing this at a production build to check
 * something by hand is a reasonable thing to want. If you do that, the fixture
 * account will not exist and sign-in will throw, which is the correct answer:
 * set ZL_USER and ZL_PASSWORD to a real one.
 */
export async function signIn(
  page,
  base,
  user = process.env.ZL_USER || 'smoketest',
  pass = process.env.ZL_PASSWORD || 'SMOKE-TEST-ONLY',
) {
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Onboarding first, when this profile has never opened the app.
  const skip = page.getByText(/Sign in|Iniciar sesión/i).first();
  if (await skip.count()) {
    await skip.click().catch(() => {});
    await page.waitForTimeout(1500);
  }

  const inputs = page.locator('input');
  if ((await inputs.count()) < 2) {
    throw new Error('no sign-in form — got: ' + (await page.evaluate(() => document.body.innerText)).slice(0, 200));
  }

  /* The sign-in screen prints the build stamp, which is the only thing on the
     page that says WHICH app this is. Check it before trusting anything else:
     a stale server on the port is otherwise completely silent, and the run
     comes back green having tested a build nobody is shipping. */
  const shown = await page.evaluate(() => document.body.innerText);
  if (EXPECTED_STAMP && !shown.includes(EXPECTED_STAMP)) {
    const stamp = shown.match(/·\s*([^\n]+)$/m)?.[1]?.trim() || '(none found)';
    throw new Error(
      `WRONG BUILD at ${base} — expected "${EXPECTED_STAMP}", the page says "${stamp}".\n` +
        '       Something else is on the port, or the build is stale. Check for a leftover\n' +
        '       server (ss -ltn | grep 4173) and rebuild with `npm run build:test`.'
    );
  }
  await inputs.nth(0).fill(user);
  await inputs.nth(1).fill(pass);
  await page.locator('button').filter({ hasText: /sign in|entrar|log in/i }).last().click();
  await page.waitForTimeout(3000);

  const hash = await page.evaluate(() => location.hash);
  if (hash.startsWith('#/auth')) throw new Error('SIGN-IN FAILED — still at ' + hash);
  return hash;
}

/** Navigate, and refuse to continue if the app bounced us back to auth. */
export async function go(page, base, route) {
  await page.goto(`${base}/#${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const hash = await page.evaluate(() => location.hash);
  if (hash.startsWith('#/auth')) throw new Error(`kicked to auth on ${route}`);
  return hash;
}

export const text = (page) => page.evaluate(() => document.body.innerText);
