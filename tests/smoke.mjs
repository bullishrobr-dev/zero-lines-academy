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

    /* The reward loop's OTHER half, and the worst bug this app has had: every
       lesson paid zero XP, because "mark complete" wrote the progress key by
       hand and skipped the award. Valid TypeScript, clean lint, green guards,
       and nobody noticed until a seller asked why reading did nothing. The
       check-in above would not have caught it — different code path. */
    /*
     * Reset, then land on the lesson with a FULL document load.
     *
     * Two traps here, and both made this check fail against an app that was
     * working. Emptying localStorage under a running app leaves React holding
     * the old values, so the assertion runs against state that no longer
     * matches storage. And the check-in above fires a delayed navigate('/home')
     * after its celebration — a plain hash navigation to the lesson gets yanked
     * back to Home a second later, and the button is simply not there.
     *
     * A distinct query string forces a real page load, which settles both.
     */
    await page.evaluate(() => {
      localStorage.removeItem('zl_xp');
      localStorage.removeItem('zl_lesson_progress');
    });
    await page.goto(`${BASE}/?smoke=lesson#/lesson/stop-2`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800);
    const xpBeforeLesson = await page.evaluate(() => Number(localStorage.getItem('zl_xp') || 0));
    const complete = page.getByRole('button', {
      name: lang === 'es' ? /Marcar lecci|completada/i : /Mark Lesson Complete/i,
    }).first();
    let xpAfterLesson = xpBeforeLesson;
    let lessonFlagged = false;
    if (await complete.count()) {
      await complete.click();
      await page.waitForTimeout(1500);
      xpAfterLesson = await page.evaluate(() => Number(localStorage.getItem('zl_xp') || 0));
      lessonFlagged = await page.evaluate(() => {
        try { return Boolean(JSON.parse(localStorage.getItem('zl_lesson_progress') || '{}')['stop-2']); }
        catch { return false; }
      });
    }
    ok('finishing a lesson pays XP', xpAfterLesson > xpBeforeLesson, `${xpBeforeLesson} → ${xpAfterLesson}`);
    ok('finishing a lesson is recorded', lessonFlagged, lessonFlagged ? '' : 'stop-2 not flagged complete');

    ok('no page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
  } finally {
    await browser.close();
  }
}

/*
 * The promise the whole service worker exists for, in the owner's words:
 * download the app once, then never need the network again. The sellers work
 * inside a shopping centre, often with no usable signal, and the failure this
 * guards against is the one that matters — a seller standing in front of a
 * customer opening a lesson they have never opened before and getting a blank
 * screen.
 *
 * Checked in a real browser with the network genuinely cut, because nothing
 * about this is visible from the source.
 */
async function offline() {
  console.log('\n═══ offline ═══');
  const { browser, ctx, page } = await launch({ width: 390 });
  try {
    await signIn(page, BASE);
    await go(page, BASE, '/home');

    /* Wait for the worker to install AND walk the asset manifest. Cutting the
       network in the instant after it registers races the precache, and a
       navigation made in that window legitimately fails — that is a test
       artifact, not a seller's experience, and it cost me an hour of chasing a
       bug that was not there. */
    await page.waitForTimeout(15000);
    const cached = await page.evaluate(async () => {
      const names = await caches.keys();
      if (!names.length) return 0;
      return (await (await caches.open(names[0])).keys()).length;
    });
    ok('the app precaches itself', cached > 50, `${cached} files cached`);

    await ctx.setOffline(true);

    /* A brand new tab is the honest test: it is what reopening the app from the
       home screen does, with nothing already in memory to hide a cache miss. */
    const fresh = await ctx.newPage();
    await fresh.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {});
    /* Long enough to cover index.html's one-shot boot retry. A cold offline
       open blanks roughly two times in three — the worker is asleep and the
       module script goes out while it is still starting — and the shell
       reloads itself once to recover. What matters to a seller is that the
       lesson is on the screen a moment later, not which attempt drew it. */
    await fresh.waitForTimeout(9000);
    const home = await fresh.evaluate(() => (document.body.innerText || '').trim().length);
    ok('opens with no signal at all', home > 300, `${home} chars on the home screen`);

    /* A lesson this profile has never opened online. Precaching the whole
       corpus is the entire point — a route the seller had never visited used to
       be a blank screen at the kiosk. */
    await fresh.goto(`${BASE}/#/lesson/O5`, { waitUntil: 'domcontentloaded', timeout: 25000 }).catch(() => {});
    await fresh.waitForTimeout(4000);
    const lesson = await fresh.evaluate(() => (document.body.innerText || '').trim().length);
    ok('a never-opened lesson reads offline', lesson > 1000, `${lesson} chars of lesson`);

    await ctx.setOffline(false);
  } finally {
    await browser.close();
  }
}

await run(390, 'en');
await run(320, 'es');
await offline();

const failed = results.filter((r) => !r.cond);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) {
  failed.forEach((f) => console.log(`  ✗ ${f.name}${f.detail ? ' — ' + f.detail : ''}`));
  process.exit(1);
}
