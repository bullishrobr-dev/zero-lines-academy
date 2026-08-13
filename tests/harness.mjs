/*
 * Shared browser harness for the smoke test.
 *
 * ── TWO TRAPS THAT MADE EARLIER RUNS LIE ────────────────────────────────────
 *  1. The app opens on ONBOARDING, not the sign-in form. A script that goes
 *     straight for the inputs finds none and times out — or worse, finds two
 *     and fills the wrong screen.
 *  2. `page.url()` has no hash on first load, so "does the url contain #/auth"
 *     is FALSE before the router has even redirected. A whole 320px sweep once
 *     came back clean because of that: it had never got past the sign-in
 *     screen and every assertion ran against the auth page.
 *
 * So: click through onboarding, then assert on `location.hash` AFTER the router
 * has run. If sign-in fails, throw — a smoke test that quietly checks the login
 * screen thirty times is worse than no smoke test.
 */
import { chromium } from 'playwright';

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

export async function signIn(page, base, user = 'admin', pass = process.env.ZL_PASSWORD) {
  if (!pass) throw new Error('Set ZL_PASSWORD — the smoke test signs in as a real account.');
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
