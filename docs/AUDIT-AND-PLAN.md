# Zero Lines Academy — Audit & Remediation Plan

**Date:** 29 July 2026 · **Commit audited:** `e651a10` · **Method:** six parallel specialist audits over the full
~44k-line codebase, plus a live browser pass driving the real app as employee / manager / admin in both
languages and both locations.

Every claim below is either **CONFIRMED** (traced through code and reproduced in a browser) or explicitly
marked **SUSPECTED**. Line references are to the audited commit.

---

## 1. Executive summary

The app is in better shape structurally than it looks — TypeScript compiles clean, the build passes, the
routing and data model are sensible, and the content corpus is genuinely substantial. The problems are
concentrated in a small number of **wiring** failures, and they are almost all cheap to fix relative to their
impact.

Five findings dominate everything else:

| # | Finding | Effect |
|---|---|---|
| 1 | **Gibraltar sellers are shown euro prices.** `LocationContext` never reads the seller's assigned location. | Sellers quote the wrong currency to real customers. |
| 2 | **The Cheat Sheets price ladders render raw `${currency}` / `${locationName}` text.** | The most-used screen in a live sale is visibly broken, in both languages, in both shops. |
| 3 | **`/home` crashes for any user returning after a 2+ day break.** Infinite render loop. | The post-login landing page shows an error screen. |
| 4 | **Progress, XP and streaks are global, not per-user.** | On a shared shop tablet, sellers inherit and overwrite each other's data. |
| 5 | **A perfect quiz score awards 0 XP** while the screen congratulates you. | Directly explains "the quizzes are not good". |

Plus: an admin loses admin rights on page refresh; any seller can open the manager dashboard by editing the
URL; anyone can self-register as an admin; and a fresh `git clone` **cannot be installed** because the
lockfile pins 119 packages to an unreachable registry.

### Headline numbers

| Metric | Value |
|---|---|
| TypeScript errors | **0** ✅ |
| Production build | **passes** (8.2 MB `dist/`, no chunk warnings) ✅ |
| ESLint problems | **111** (106 errors, 5 warnings) across 43 files |
| Pages with **zero** translation calls | **10 of 28** |
| Translation keys defined / actually used | 209 / **44** (79% dead) |
| Hardcoded English strings in JSX | **377** across 51 files |
| Lesson-quiz questions with Spanish | **0 of 93** |
| Hardcoded `€`/`£` symbols in content | **~1,400** |
| Dead files under `src/` | **80 of 155 (52%)** — 12,249 lines |
| shadcn/ui components used | **4 of 53** |
| `package.json` dependencies actually used | **12 of 49** |
| `public/` page weight | **6.0 MB** of unoptimised PNG |
| Tests / CI | **zero** |

---

## 2. What the app is

A mobile-first PWA (React 19 + Vite + Tailwind + `HashRouter`) that trains cosmetics kiosk sellers in Andorra
(€) and Gibraltar (£). There is no server — a `localStorage` "mock backend" (`src/backend/mockBackend.ts`)
handles users, roles and persistence.

**Feature surface:** 31 lessons across 4 categories · 21 general quizzes + 31 lesson quizzes (253 questions) ·
10 exercises · 64 flashcards with spaced repetition · 4 product deep-dives (Syringe, Peeling, Scrub, Nail Kit)
· cheat sheets with price ladders and scripts · daily doses · shift check-in / end-of-shift reflection ·
street tracker · leaderboard · manager dashboard · admin panel · XP, levels, streaks, achievements.

**Roles:** `employee` → `manager` → `admin`. Managers/admins create sellers and assign each a location.

---

## 3. The two complaints, explained

### 3.1 "The couples between the different locations don't work"

**Root cause — a single line of dead code.**

- `src/contexts/LocationContext.tsx:38-42` — `getStoredLocation()` reads **only** `localStorage['zl_location']`
  and falls back to `'andorra'`. It never imports the auth context and never reads `user.location`.
- `src/hooks/useAuth.ts:36` — `localStorage.setItem('zl_location', user.location)` is the **only** line in the
  codebase that syncs a seller's assigned shop into the currency system.
- `grep -rn "hooks/useAuth" src/` → **0 importers.** That file was superseded by `contexts/AuthContext.tsx`,
  and the location sync was never carried across.

**Reproduced live.** Logging in as `john@zerolines.com` (assigned `gibraltar` in the seed data):

```
zl_user     = {"name":"John Smith","location":"gibraltar", ...}
zl_location = andorra                      ← never synced
/cheat-sheets   €:32  £:0                  ← should be £:32
/syringe        €:15  £:0
/nail-kit       €:19  £:0
```

Manually forcing `zl_location=gibraltar` flips everything to £ correctly — so **the machinery works, it is
simply never connected to the user record.**

Compounding it, `src/pages/ProfilePage.tsx:374-403` shows a logged-in seller a badge reading
**"🇬🇮 Gibraltar — Locked"** while every price on screen is in €. The branch that displays the truth is the
branch that cannot act on it; the location switcher only appears when logged **out**.

Also: `/street-tracker` stays in € even after the location is forced, because
`src/pages/StreetTrackerPage.tsx:69-71` hardcodes `€${amount}`.

### 3.2 "The translations are not always good"

Six separate causes, in order of visibility:

1. **The Cheat Sheets ladders print un-interpolated template tokens.** `src/pages/CheatSheetsPage.tsx` —
   40 lines use **single-quoted** strings containing `${currency}` / `${locationName}`. JavaScript does not
   interpolate single quotes, so the literal text reaches the DOM. Confirmed in the browser; sellers read:

   > `"Here in ${locationName} it's only 150${currency}."`
   > `"In Europe this treatment costs 200${currency}."`
   > Price column: `${currency}120 for 3`

   This is a **regression** introduced by commit `c430602`. Before it, the text read `150€`. The copy-to-
   clipboard button (`:758`) copies the broken string too. `tsc` cannot catch this, which is why it shipped.

2. **10 of 28 pages contain zero translation calls** — they render English regardless of the toggle:
   `WorkflowPage`, `StoppingPage`, `ShiftCheckIn`, `OnboardingPage`, `MindsetPage`, **`LessonQuiz`**,
   `LeaderboardPage`, `FlashcardDeckPage`, `EndOfShift`, `ConnectingPage`.
   Verified live in Spanish mode: `/end-of-shift` renders *"Great Shift! Let's reflect. HOW MANY PEOPLE DID
   YOU STOP TODAY?"*; `/flashcard-decks` renders *"Flashcard Decks · Spaced Repetition System · Due Today"*.

3. **All 93 lesson-quiz questions are English-only.** `src/data/lessons.ts` has `question:` ×94 and
   `questionEs:` ×**0**. `src/pages/LessonQuiz.tsx:23` literally contains `// language support placeholder`.
   A Spanish seller reads a fully-Spanish lesson, taps "Take Quiz", and gets an entirely English quiz.

4. **Accent-stripped Spanish in 4 lessons.** `src/data/lessons.ts:3543-4311` (`psych-1`…`psych-4`) — 105
   strings with every diacritic removed. `MEDIA MANANA` instead of `MEDIA MAÑANA`, `presentacion`,
   `Grabate`, `estas`, `senal`. Root cause traced to `scripts/translations_group5.py`, where **128 of 128**
   strings are accent-free. To a native speaker this reads as visibly broken machine output.

5. **Mexican Spanish shipped to a Spain/Andorra/Gibraltar audience.**
   `scripts/translations_group1.py:3` says so outright: `# Mexican Spanish translations`. In shipped data:
   `celular` (×23, Spain: *móvil*), `ahorita`, `platicando`, `checar`, `lentes de sol`. These are scripts the
   seller reads **aloud to a customer** in Andorra.

6. **Comparison cards never render Spanish.** `src/pages/LessonView.tsx:220-226` is the only section renderer
   that ignores `isEs`. 13 populated `leftEs` blocks are dead data. (And 12 of 13 `rightEs` are missing, so
   this must be fixed together with the data or Spanish users get a half-translated card.)

**Worth stating clearly:** the translation *table* itself (`src/data/translations.ts`) is clean — 209 keys,
perfect EN/ES parity, no missing keys, and no Spanish field anywhere contains English prose. The problem is
that **79% of it is never called** and the pages hardcode English instead.

---

## 4. Critical defects (P0)

### C1 — `/home` crashes for any returning user
`src/hooks/useProgress.ts:256-269` — `getCurrentStreak()` calls `setStreak()` **during render** with a guard
that can never be satisfied (it preserves the stale `lastActiveDate`), and returns a new object identity each
time so React cannot bail out. Called during render at `ProfilePage.tsx:219` and `HomeDashboard.tsx:140`.

**Reproduced live** — set `zl_streak` to a date 2+ days old and open `/home`:

> *"Something went wrong … Too many re-renders. React limits the number of renders to prevent an infinite loop."*

Every seller returning from a weekend or a day off hits this on the post-login landing page.

### C2 — Identity is destroyed on every page refresh
Three modules write three incompatible shapes to one key, `zl_user`:

| Writer | Shape |
|---|---|
| `src/backend/mockBackend.ts:100,138` | `{id, email, name, role, location, managerId, createdAt}` |
| `src/contexts/AuthContext.tsx:42-48,60-66` | `{name, location, role, language, joinedAt}` ← **last writer wins** |
| `src/hooks/useAuth.ts:32-40` | a third shape (dead file) |

`AuthContext` overwrites the backend's correct object with a lossy one, then on reload
`backend.getCurrentUser()` reads it back and blind-casts it to a full `User`. After any refresh:
`user.id` → `undefined`, `user.email` → `undefined`, `user.createdAt` → `undefined`.

`AuthContext.tsx:45` also hardcodes `role: result.user.role === 'admin' ? 'manager' : …`. **Confirmed live:**

```
zl_user = {"name":"System Admin", ..., "role":"manager", ...}
/admin BEFORE reload → renders the Admin Panel
/admin AFTER  reload → redirected to #/profile
```

Knock-on effects: manager dashboard resolves an empty team (`getTeamProgress(undefined)`); Profile renders
`Invalid Date`; the admin self-delete guard (`AdminPanel.tsx:186`) always passes.

### C3 — No route guards; privilege escalation by URL
`src/App.tsx:70-99` — all 28 routes are unguarded. `/manager` has **no role check at all**.
**Confirmed live:** logging in as `maria@zerolines.com` (plain employee) and navigating to `#/manager`
renders the full dashboard — *"3 EMPLOYEES · AT RISK · DAILY DIGEST"* — with colleague names, emails,
progress and quiz scores. She can also add users and send team nudges.

`mockBackend.ts:258-260` makes this work: the team filter is
`u.managerId === managerId || u.location === manager.location` — the `||` branch matches any employee at the
same shop.

### C4 — Anyone can self-register as an admin
`src/pages/AuthPage.tsx:308` — the public signup form offers a role pill for **Admin** alongside Employee and
Manager. No verification, no invite. This is on the unauthenticated route.

### C5 — All progress data is shared between sellers on a device
None of the progress keys are namespaced by user: `zl_lesson_progress`, `zl_quiz_scores`, `zl_streak`,
`zl_xp`, `zl_activity_log`, `zl_daily_flow`, `zl_flashcard_state`, `zl_street_tracker`.
`AuthContext.logout()` (`:72-76`) removes **only** `zl_user`.

**Confirmed live:** seeded 340 XP and a 9-day streak, then logged in as a different seller — they inherited
both. On a shared shop tablet this means sellers see, overwrite, and can factory-reset each other's records.

### C6 — A perfect quiz score awards zero XP
`src/pages/QuizzesPage.tsx:69` double-counts the final answer:

```js
const perfect = score + (selectedIdx === question.correctIndex ? 1 : 0) === quiz.questions.length;
```
`handleAnswer` (`:57`) already incremented `score` before the results button renders.

| Real score | `perfect` | XP recorded | Screen says |
|---|---|---|---|
| **100%** | `false` | **0** | *"Perfect score! +150 XP"* |
| (n−1)/n | `true` | full reward | *"Score 100% to earn XP"* |

Affects **all 21 quizzes**. Separately, `LessonQuiz.tsx:81` computes and displays XP but never persists it,
and `ExercisesPage.tsx` never persists anything at all.

### C7 — The repo cannot be installed from a clean clone
`package-lock.json` pins **119 packages** to `registry.npmmirror.com`, which is unreachable — including
`plugin-inspect-react-code`, which `vite.config.ts:4` needs to build. Reinstalling against npmjs succeeds in
15 seconds. *(This is also what stalled my own install for ten minutes.)*

### C8 — The service worker permanently freezes users on an old build
`public/sw.js:6` — `CACHE_NAME = 'zero-lines-v1'` is hardcoded and never bumped, and the fetch handler
(`:56-59`) is **cache-first for `document`**. After a seller's first visit, `index.html` and the JS bundles are
served from cache forever. **Every fix in this plan would fail to reach existing users until this is fixed.**

---

## 5. Content correctness

The answer keys are structurally perfect — **0** out-of-range indices, **0** duplicate IDs, **0** malformed
options across all 253 questions. The problems are editorial.

### 5.1 The app teaches contradictory prices

Six different Nail Kit price ladders coexist:

| Source | Europe anchor | Local base | Bundle | Floor |
|---|---|---|---|---|
| `NailKitPage.tsx:345,358` | **140** | **80** | — | — |
| `nailKitData.ts:255,268,294` | — | 45 | 160/3 | 45 |
| `CheatSheetsPage.tsx:191-200` | **100** | **60** | 120/3 | **30** |
| `generalQuizzes.ts:324,333` | 100 | **60** ← *marked correct* | 120/3 | 30 |
| `moreQuizzes2.ts:171` | — | **45** | — | — |
| `flashcards.ts:580` | 60 | 35 | — | — |

**A seller who studies the Nail Kit page learns €80, and the quiz then marks them wrong for it.**
The Scrub has four conflicting floors (€25 / €30 / €35 / €45); the Syringe has two (€100 / €140).

`generalQuizzes.ts:4` claims *"CORRECT prices from the Zero Lines Sales Bible — DO NOT ALTER"*. It disagrees
with the product pages. **Only you can say which is authoritative.**

### 5.2 Quizzes are trivially gameable
**84% of correct answers are option B** (`moreQuizzes.ts`: 95%). **82% are the longest option.**
10 of 21 general quizzes and 19 of 31 lesson quizzes score **100% by picking B every time**. No shuffling
exists anywhere.

### 5.3 Exercises that cannot be completed
- **Matching** (`ExercisesPage.tsx:572,618-622`): scoring wants `matches[i] === i`, but the interaction makes
  tapping term `i` twice *deselect* it — so a correct match is unreachable by playing. Meanwhile
  `handleTimeUp` (`:578-586`) auto-fills the correct answers, so **letting the timer expire scores 100%**.
  The definitions column is never rendered at all.
- **Ordering** (`generalExercises.ts:521-548` vs `ExercisesPage.tsx:686`): data is 1-based, comparison is
  0-based, so `allCorrect` is permanently `false`.
- **8 of 10 exercises score better if you do nothing** — roleplays auto-select the best answer on timeout;
  price drills award 50% XP for a wrong or absent answer.

### 5.4 Other content defects
- A quiz teaches Gibraltar sellers to say *"here you pay in euros"* — and marks it **correct**
  (`moreQuizzes2.ts:935-947`).
- `dailyDoses.ts` is a separate **£-only** price universe (38 `£`, 0 `€`) quoting products that don't exist
  (serum £49, day cream, travel kit £99) at prices found nowhere else. Shown to Andorra sellers too.
- `lessons.ts` is Andorra-hardcoded (92 mentions) and instructs Gibraltar sellers to say
  *"But here in Andorra, because we're a tax haven…"* (`:1924`).
- **All 64 flashcards reference lesson IDs that don't exist** (`sp-N`/`rc-N` vs the real `psych-N`/`stop-N`).
- 2 of 8 achievements are permanently unobtainable; `competencies.ts:100` references a non-existent `stop-8`.
- **~167 KB of finished, fully-bilingual lesson content is unreachable** — `scenarioLessons.ts` (10 lessons)
  and `objectionLessons.ts` (10 lessons) are never imported by anything.

---

## 6. Design

The owner's verdict is correct and the cause is measurable.

**There is no design system in force.** A token layer exists but **zero** app screens use it: `bg-card`,
`text-muted-foreground`, `bg-primary` etc. appear **0 times** outside `components/ui/`. Instead:
`#0ABAB5` appears as a raw hex literal **697 times**, `#8A8A8A` **333 times**, `#1A1A1A` **214 times**.

**The surfaces are mathematically indistinguishable.** Measured against the `#0A0A0A` page background:

| Surface | Contrast vs page |
|---|---|
| `card-elevation-1` `#141414` | **1.075 : 1** |
| `card-elevation-2` `#1A1A1A` | **1.138 : 1** |
| `card-elevation-3` `#1C1C1C` | **1.162 : 1** |

Three "elevation levels" separated by 1–2%. Nothing has an edge; the whole UI is one flat dark field.

**One accent does every job** — nav, progress, headings, links, CTAs, badges, borders, focus, checkmarks, and
*two of the four* training categories. When one hue means everything, nothing looks important.

**Also dead:** all 5 gradient utilities (1 use total), both glow shadows (0 uses), all 5 custom animations
(0 uses), the entire named colour palette (`bg-brand`, `text-gold`, `text-success` — 0 uses each),
`font-brand` (0 uses — the 4 product pages use `font-serif`, which silently renders **Georgia**, not Playfair).

### Accessibility failures
- **Primary CTA fails AA at 2.41:1** in 8 places (`text-white` on teal) while passing at 8.70:1 in 32 others.
  The same button, two different label colours.
- 14 more text/background pairs below 4.5:1 (down to **1.38:1**).
- Every card border fails the 3:1 non-text minimum (1.14:1).
- **0 of 24 form inputs have a label association.** ~20 icon-only buttons have no accessible name.
- `index.html:5` sets `user-scalable=no` — pinch-zoom is blocked (WCAG 1.4.4 fail) for sellers reading 9px
  price scripts in Mediterranean daylight.
- `Navbar.tsx:26-28` has **no `env(safe-area-inset-bottom)`** — on any notched iPhone installed as a PWA, the
  nav labels sit under the home indicator.
- Focus outlines removed with no replacement in 6 places, including the End-of-Shift number inputs.

### Missed emotional payoff
`XPToast.tsx` (a finished spring-animated `+N XP` pill) and `ConfettiCelebration.tsx` (a finished 4-burst
celebration) are **never rendered**. Haptics are wired at 4 sites out of ~40 candidates. The general Quizzes
results screen — reachable from the bottom nav — fires **no confetti and no haptic**. Levelling up, unlocking
an achievement and unlocking a tier all produce nothing but a number changing.

### Orphaned features
**6 routes have zero inbound links**, including two fully-built ones: `/leaderboard` (445 lines) and
`/street-tracker` (473 lines). Four others (`/mindset`, `/stopping`, `/connecting`, `/workflow`) are 8-line
"coming soon" stubs that are nonetheless routed. **21 of 33 components are dead** — roughly 2,500 lines of
finished UI no seller can see.

---

## 7. The plan

Ordered so that each phase is independently shippable and nothing later depends on an unfixed earlier item.

### Phase 0 — Unblock (half a day)
Nothing else can ship reliably until these land.

1. **Fix the service worker** (C8) — network-first for documents, build-hash `CACHE_NAME`, relative paths.
   *Without this, existing users never receive any other fix.*
2. **Regenerate `package-lock.json`** against npmjs; add `.npmrc` pinning the registry (C7).
3. `.gitignore`: add `__pycache__/`, `*.pyc`, `.env*`, `*.local`; `git rm --cached scripts/__pycache__`.

### Phase 1 — Stop the bleeding (1–2 days)
The bugs that break the product for real sellers today.

4. **Sync location from the user record** (§3.1) — read `user.location` in `LocationProvider`, re-key
   `zl_location` per user, clear on logout. Show it read-only in Profile; let admins edit it.
5. **Fix the 40 `${currency}` literals** in `CheatSheetsPage.tsx` (§3.2 #1) — convert to template literals.
   Add an ESLint rule banning `${` inside single-quoted strings so it cannot regress.
6. **Fix the `/home` crash** (C1) — make `getCurrentStreak()` pure; move the expiry write into an effect.
7. **Fix the `zl_user` contract** (C2) — delete the `AuthContext` overwrites; validate in `getCurrentUser()`.
   Stop demoting admins.
8. **Add route guards** (C3) — `<RequireAuth>` / `<RequireRole>`; add the missing check to `/manager`;
   fix the `||` in `getTeamProgress` so managers see only their own team.
9. **Remove the Admin option from public signup** (C4).
10. **Namespace all progress keys by `user.id`** (C5); clear on logout. *(Depends on #7.)*
11. **Fix quiz scoring** (C6) — the off-by-one, plus persist lesson-quiz and exercise results.
12. **Fix the two broken exercises** (§5.3) — matching interaction and the 1-based/0-based ordering compare.

### Phase 2 — Language and money (2–4 days)

13. **Currency sweep** — one `useCurrency()` helper; replace the ~1,400 hardcoded symbols. Priority order:
    `StreetTrackerPage`/`SaleLogModal` (a seller logging real revenue into a €-labelled field), then
    `dailyDoses.ts`, then the lesson/quiz corpus.
14. **Agree one canonical price table per product** (§5.1) and derive every other file from it. **This needs
    your input** — I can restructure it, but only you know the true prices.
15. **Translate the 10 dead pages** — start with `LessonQuiz`, `EndOfShift`, `ShiftCheckIn`, `ProfilePage`
    (its 26 keys are already written and just need `t` destructured at `:195`).
16. **Inject the 162 already-written quiz translations** sitting unused in `scripts/translations_group*.py`.
    The 93 `optionsEs` arrays still need writing from scratch.
17. **Restore accents** in `psych-1`…`psych-4` (§3.2 #4).
18. **Dialect + register pass** — `celular`→`móvil`, `ahorita`→`ahora mismo`, `checar`→`comprobar`,
    `lentes de sol`→`gafas de sol`, `platicando`→`charlando`; unify on **tú** throughout.
19. **Fix comparison-card Spanish** (`LessonView.tsx:220-226`) *and* add the 12 missing `rightEs` together.
20. **Location-gate the Andorra/Gibraltar-specific content** so a Gibraltar seller is never told to say
    "here in Andorra", and remove the quiz that teaches them they trade in euros.

### Phase 3 — Cleanup (1 day)

21. Delete 49 unused shadcn components (5,828 lines) + the 33 dependencies they drag in.
    *(Regenerating any is a one-line `npx shadcn add`.)*
22. Delete the Tier-A orphans and the 3 abandoned feature clusters (competency heatmaps, learning velocity,
    streak defence) — **or** wire them up; they're finished. My recommendation: delete, resurrect from git if
    wanted.
23. Delete `scripts/` — every script hardcodes `/mnt/agents/output/app` and cannot run. **Harvest the
    translation memory first** (step 16).
24. Optimise `public/` → WebP: **6.0 MB → ~500 KB**. Replace `hero-glow.png` (1.13 MB, `hidden md:block`, so
    *every mobile user downloads it invisibly*) with a CSS radial-gradient. Delete orphaned `logo-nav.png`.
25. Generate real square 192/512 icons and fix `manifest.json` (all 8 sizes currently point at one
    2470×1493 image).
26. Rewrite `README.md`; delete `info.md` and `plan.md` (both describe files that don't exist).
27. `eslint --fix` the 29 auto-fixable escapes; fix the 5 rules-of-hooks and 5 purity errors.
28. Extract `CheatSheetsPage.tsx:57-468` (410 lines of content) into `src/data/cheatSheets.ts`.
29. Add Vitest + a smoke test per route, and a GitHub Actions workflow running `tsc`, `eslint`, `build`.

### Phase 4 — The facelift (3–5 days)

Direction: **"Counter Light"** — light-first, warm-neutral, with a teal/coral duo accent and champagne for
achievement. A cosmetics counter is bright, warm and tactile; the current app is a dark developer console.
A proper dark mode (deep teal-ink, not neutral black) stays for evening shifts.

**Light mode**

| Token | Hex | Note |
|---|---|---|
| `--bg` | `#FAF7F5` | warm porcelain, not white |
| `--surface` | `#FFFFFF` | cards genuinely lift off the ground |
| `--ink` | `#16110F` | 18.7:1 |
| `--ink-2` | `#5C524C` | 7.6:1 |
| `--ink-3` | `#6F635B` | 5.8:1 — the *floor* is now AA |
| `--teal-600` | `#067A76` | teal for **text** (5.2:1) — fixes today's 2.41:1 |
| `--teal-500` | `#0ABAB5` | brand teal preserved, **fills only** |
| `--coral-500/600` | `#FF6A7A` / `#C63A4C` | energy, streaks, primary CTA |
| `--gold-500/600` | `#E3B54A` / `#8A6410` | achievement |

**Dark mode** moves from neutral `#0A0A0A` to teal-ink `#0E1517` with surfaces at `#1A2426` / `#242F31` —
a genuinely perceptible step instead of 1%.

**The rule that fixes the biggest a11y bug:** teal fills always take a dark ink label, never white
(8.9:1 vs 2.41:1) — which is what 32 of the 40 existing call sites already do.

**Signature moves**
1. Time-of-day gradient hero on Home — sunrise-coral → midday-teal → evening-violet, with the streak flame.
   Gives the screen the focal point it currently lacks.
2. Product-tinted deep-dive cards with **real product photography** — there is currently not one product
   image anywhere inside the app.
3. **The price ladder rendered as an actual ladder** — stepped rungs, oversized tabular numerals, the
   recommended rung raised, struck anchors recessed. It's the most-used artefact in a live sale and today it's
   seven identical grey boxes.
4. Floating pill nav with `env(safe-area-inset-bottom)` and a raised centre "Log a sale" button — fixes the
   notch bug and rescues `/street-tracker` from orphanhood.
5. **Wire the reward layer that already exists** — `XPToast` on every XP event, `haptic()` on every answer,
   `ConfettiCelebration` on level-up / achievement / tier unlock / perfect quiz. Highest value-per-hour change
   in the whole audit: the code is written, it just isn't connected.
6. Achievements as collectible artefacts on champagne foil, locked ones embossed rather than 60%-opacity grey.
7. Editorial lesson reading mode — warm surface, Playfair drop-cap, constrained measure, cards that break the
   column.
8. One frosted sticky header pattern replacing today's five competing header layouts.

Plus the mechanical wins: collapse **eleven** corner radii to four; ban `text-[9px]`/`text-[10px]`
(255 instances today); add `tabular-nums` so count-up stats stop jittering; delete the triple-stacked bottom
padding (176–240px of dead space on every screen).

---

## 8. Future ideas

Beyond fixing what's here — things that fit this product and this business:

**Near-term, high value**
- **Manager-authored content.** Let a manager add a script or objection response from the dashboard. Today all
  content is compiled in; the people who know what's working on the street can't contribute.
- **Real backend.** The `backend/` seam is already clean and honest about being swappable. Supabase gives real
  auth, cross-device sync, and a manager view that reflects reality — today's leaderboard is entirely
  fabricated (`useLeaderboard.ts:32-45` hardcodes 12 fictional people, and **every user is "Anna Roca"**).
- **Wire up the street tracker properly** so stops → brings → sales feed the leaderboard and the manager's
  coaching queue. The tracker exists and is unreachable.
- **Shift-aware content.** The app knows when a shift starts and ends; a pre-shift 60-second drill and a
  post-shift reflection tied to what actually sold that day is a natural loop.

**Genuinely differentiating**
- **Voice practice.** Sellers memorise scripts they must deliver aloud. Record a pitch, get it transcribed and
  scored against the canonical script — pace, filler words, whether the price ladder was followed in order.
  This is the single biggest gap between "knows the script" and "can deliver it".
- **Objection simulator.** A conversational drill where the customer pushes back and the seller has to hold
  the ladder. The objection content is already written — it's one of the orphaned files.
- **Live price-ladder companion.** A one-tap, glanceable ladder for use mid-conversation, in the right
  currency, with a "where am I on the ladder" tracker. The cheat sheet is nearly this already.
- **Team challenges.** Andorra vs Gibraltar weekly targets. The leaderboard already models two stores.

**Operational**
- Per-location analytics for the owner: which lessons correlate with which sellers' conversion rates.
- Onboarding checklist for a new hire's first week, with the manager signing off each step.
- Offline-first for real (Phase 0 fixes the SW; `vite-plugin-pwa` would make the claim true).

---

## 9. What I need from you

Three decisions I can't make correctly on your behalf:

1. **The real prices.** §5.1 lists six conflicting Nail Kit ladders and four Scrub floors. Which source is the
   truth? Once you tell me, I'll make everything derive from one table so it can't drift again.
2. **How far to go on the design.** Retheme (same layouts, new colour/type/depth system — lower risk,
   ~2 days) or full redesign of the key screens (Home, Training, Lesson, Quiz, Cheat Sheets — ~5 days)?
3. **The orphaned features.** `/leaderboard`, `/street-tracker`, the competency heatmaps and the 20 unreachable
   lessons are all finished work. Wire them in, or delete them?
