/*
 * Smoke test — the handful of things that have actually broken.
 *
 * The content guards in scripts/ read the source. This drives the built app in
 * a real browser, because several of the worst bugs in this app's history were
 * invisible to a file reader:
 *
 *   · every lesson paid zero XP, because the "mark complete" button wrote the
 *     progress key by hand and skipped the award. Valid TypeScript, passing
 *     lint, eighteen green guards.
 *   · the daily-dose tick never appeared until you reloaded, because two
 *     components each held their own copy of the same state.
 *   · a 320px sweep came back clean while never having got past the sign-in
 *     screen.
 *
 * Run:
 *   npm run build:test
 *   npx vite preview --config vite.test.config.ts --outDir dist-test --port 4173
 *   npm run test:smoke
 *
 * The test build swaps in a blank backend and a throwaway account, so this
 * needs no password and never touches the live database. See
 * vite.test.config.ts. $ZL_BASE overrides the server (default 127.0.0.1:4173).
 */
import { launch, signIn, go, text } from './harness.mjs';

const BASE = process.env.ZL_BASE || 'http://127.0.0.1:4173';

const results = [];
const ok = (name, cond, detail = '') => {
  results.push({ name, cond: Boolean(cond), detail });
  console.log(`  ${cond ? '✓' : '✗'} ${name}${detail ? '  — ' + detail : ''}`);
};

async function run(width, lang) {
  const tag = `${width}px/${lang}`;
  const { browser, page, errors } = await launch({ width });
  try {
    console.log(`\n═══ ${tag} ═══`);
    await signIn(page, BASE);
    if (lang === 'es') {
      await page.evaluate(() => localStorage.setItem('zl_language', 'es'));
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(1200);
    }

    /* Every screen a seller can reach, checked for the two things that make a
       page unusable on a phone: a sideways scroll, and a template token that
       never got substituted (which is how Gibraltar once read euro prices). */
    const ROUTES = [
      '/home', '/training', '/cheat-sheets', '/cheat-sheets/said', '/cheat-sheets/prices',
      '/street-tracker', '/end-of-shift', '/shift-checkin', '/profile', '/settings',
      '/quizzes', '/exercises', '/leaderboard', '/first-day', '/flashcards', '/manager',
      '/lesson/stop-1', '/lesson/close-1', '/lesson/close-handover', '/lesson/O1', '/lesson/S2',
    ];
    let worstOverflow = 0;
    let worstRoute = '';
    let tokenLeak = '';
    let shortest = Infinity;
    let shortestRoute = '';
    for (const r of ROUTES) {
      await go(page, BASE, r);
      const { scroll, client } = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      if (scroll - client > worstOverflow) { worstOverflow = scroll - client; worstRoute = r; }
      const t = await text(page);
      if (/\{currency\}|\{locationName\}|\{price/.test(t)) tokenLeak = r;
      /* Body text minus the nav bar, which is on every screen and would
         otherwise let a completely blank page score ~50 characters. The
         thinnest real screen is the objection index — eight short chips — so
         the floor is set below that and is only looking for "rendered
         nothing at all". */
      const body = await page.evaluate(() => {
        const nav = document.querySelector('nav[aria-label]')?.innerText || '';
        return (document.body.innerText || '').replace(nav, '').trim().length;
      });
      if (body < shortest) { shortest = body; shortestRoute = r; }
    }
    ok(`no sideways scroll on ${ROUTES.length} routes`, worstOverflow <= 1,
      worstOverflow > 1 ? `${worstOverflow}px on ${worstRoute}` : '');
    ok('every price token resolved', !tokenLeak, tokenLeak);
    ok('no route renders empty', shortest > 90, `thinnest was ${shortestRoute} at ${shortest} chars of content`);

    /* The reward loop. A lesson that pays nothing is the bug that survived
       eighteen guards, so it gets checked in a browser every time. */
    await go(page, BASE, '/home');
    const before = await page.evaluate(() => Number(localStorage.getItem('zl_xp') || 0));
    await go(page, BASE, '/shift-checkin');
    const mood = page.getByRole('button', { name: lang === 'es' ? /Lista|A tope/ : /Ready|Strong/ }).first();
    if (await mood.count()) {
      await mood.click();
      await page.waitForTimeout(400);
      await page.locator('button:visible')
        .filter({ hasText: /start|empezar|vamos|let|go|listo|día|day/i })
        .last().click({ timeout: 4000 }).catch(() => {});
      await page.waitForTimeout(1500);
    }
    const streak = await page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('zl_daily_streak') || 'null'); } catch { return null; }
    });
    ok('checking in banks the streak', (streak?.currentStreak ?? 0) >= 1, JSON.stringify(streak));
    const after = await page.evaluate(() => Number(localStorage.getItem('zl_xp') || 0));
    ok('checking in pays XP', after > before, `${before} → ${after}`);

    ok('no page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  } finally {
    await browser.close();
  }
}

await run(390, 'en');
await run(320, 'es');

const failed = results.filter((r) => !r.cond);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  failed.forEach((f) => console.log(`  ✗ ${f.name}${f.detail ? ' — ' + f.detail : ''}`));
  process.exit(1);
}
