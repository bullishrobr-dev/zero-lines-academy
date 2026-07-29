# Zero Lines Academy

Sales training for the Zero Lines street team. A mobile-first PWA that teaches new sellers the stopping
technique, the sales psychology, the product knowledge and the price ladders — then lets them practise with
quizzes, drills, flashcards and scenario roleplay.

Two shops, one curriculum:

| Shop | Currency |
|---|---|
| **Andorra** | € |
| **Gibraltar** | £ |

The technique, the psychology, the discounts and the prices are identical in both. **Only the currency symbol
differs.** A seller's shop is assigned by their manager on their account and drives every price shown to them
— it is never guessed from the browser.

Fully bilingual: **English / European Spanish**, switchable at any time.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck, then production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm run lint` | ESLint over the repo |

Requires **Node 20+**.

### Demo accounts

There is no server yet — auth and persistence run against a `localStorage` mock backend that seeds itself on
first load. These accounts exist for development only and are surfaced in the UI **only in dev builds**:

| Email | Password | Role | Shop |
|---|---|---|---|
| `admin@zerolines.com` | `admin123` | admin | Andorra |
| `manager.andorra@zerolines.com` | `manager1` | manager | Andorra |
| `manager.gibraltar@zerolines.com` | `manager2` | manager | Gibraltar |
| `maria@zerolines.com` | `emp1` | employee | Andorra |
| `john@zerolines.com` | `emp2` | employee | Gibraltar |

> These are plain-text credentials in a mock backend. They must not survive the move to a real backend — see
> **Replacing the backend** below.

---

## How it is put together

```
src/
  backend/      mockBackend.ts — users, roles, teams. The seam a real API slots into.
  contexts/     Theme, Language, Auth, Location. Auth wraps Location: the shop
                comes from the signed-in user.
  data/         All content: lessons, quizzes, exercises, flashcards, cheat
                sheets, and pricing.ts.
  hooks/        Progress, XP, streaks, flashcard scheduling, street tracking.
  pages/        One file per route.
  components/   Shared UI. components/ui/ is shadcn.
  utils/        currency.ts, haptics, confetti.
```

### Prices

**`src/data/pricing.ts` is the single source of truth for every price in the app.** Nothing else may hardcode
one. It stores plain numbers — never a currency symbol — because the amounts are identical in both shops.

The Nail Kit, Scrub and Body Butter form one mix-and-match family and share a ladder:

| Rung | Price |
|---|---|
| Europe anchor | 80 |
| Local base | 60 |
| Buy 2, get 1 free | 120 for 3 |
| Buy 2, get 2 free | 120 for 4 |
| Buy 1, get 1 free | 60 for 2 |
| Floor | 30 |

The Syringe and the Peeling have their own ladders in the same file.

### Currency and location

Render every price through `useCurrency()` (`src/utils/currency.ts`):

```tsx
const { price, priceFor, sub, currency } = useCurrency();

price(120)            // "£120" in Gibraltar, "€120" in Andorra
priceFor(120, 3)      // "£120 for 3"
sub(step.words)       // fills {currency} and {locationName} in authored copy
```

In content files, write the placeholder tokens `{currency}` and `{locationName}`. **Never write a `€` or `£`
into content, and never build a price with a template literal in a data file** — a past regression shipped
40 lines of literal `${currency}` text to sellers because the strings were single-quoted.

### Language

UI strings go through `t()` from `useLanguage()`, with keys in `src/data/translations.ts`. Content data
carries bilingual pairs — `title` / `titleEs` — and always falls back to English when a translation is
missing. Spanish is **European Spanish** (Spain), informal *tú*: *móvil* not *celular*, *ahora mismo* not
*ahorita*, *gafas de sol* not *lentes de sol*.

### Theming

Light-first with a full dark mode, toggled by the user in Profile and defaulting to the OS preference.
All colour lives in CSS custom properties in `src/index.css` and is exposed through semantic Tailwind
classes. **Do not hardcode hex values in components.**

Use `bg-surface`, `text-ink` / `text-ink-2` / `text-ink-3`, the `teal` / `coral` / `gold` / `violet` accents,
the `surface-flat` / `surface-raised` / `surface-feature` treatments, and the `btn-*` classes. A coloured fill
always takes dark ink (`bg-coral text-on-coral`) — never white, which fails contrast.

---

## Replacing the backend

`src/backend/mockBackend.ts` is deliberately the only module that touches user storage, so it can be swapped
for a real API without changes rippling outwards. When you do:

- Move authentication to the provider. No password material should reach the client.
- Delete `seedData()` and the demo accounts.
- Namespace learner progress per user server-side. Today it is cleared locally when a different person signs
  in, which is enough for a shared shop tablet but not a substitute for real per-user storage.
- The leaderboard needs real cross-device data before it can show live team standings.

## Deployment

Static hosting. `vite.config.ts` sets `base: './'` and the app uses `HashRouter`, so it works under a
sub-path as well as at a domain root.

The service worker (`public/sw.js`) is **network-first for documents** so a deploy actually reaches sellers,
and cache-first only for fingerprinted assets. If you change `sw.js`, bump `CACHE_VERSION` in it.
