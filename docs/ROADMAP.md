# Zero Lines Academy — where this goes next

Six specialists reviewed the app in parallel: a kiosk sales trainer, a mobile
product designer, a frontend engineer, a backend and security engineer, a
learning scientist, and QA. This is what they found and the order I would build
in.

They disagreed about almost nothing, which is itself the finding. Five of six
independently described the same underlying problem in their own vocabulary.

---

## The one sentence version

**The app measures taps, not selling.** Everything below follows from that.

A lesson is "complete" when you scroll to the bottom and press a button
(`LessonView.tsx` → `handleMarkComplete`). The quiz is optional and only appears
*after* that. Finishing it with 0 out of 5 still unlocks the next tier. Meanwhile
the only real selling data in the product — stops, brings, sales, what you
promised yourself at check-in, what actually happened at end of shift — is
collected, written to the phone, and never read by anything, ever.

So the app can tell you who pressed the most buttons. It cannot yet tell you who
got better at selling. That is the gap worth closing, and most of the roadmap is
different angles on it.

---

## Stage 0 — Done today

Not planned work; it was too serious to leave.

- **Anyone could have made themselves an admin.** The database trusted the role
  sent in a sign-up request, and the public API key ships in a public
  repository. One HTTP request granted control of both shops' data. Closed two
  ways: the trigger never reads a role from the caller, and nothing can create a
  login except an admin acting inside the app.
- **The "choose your own password" gate was decorative** — one request cleared
  it without changing any password. Setting the password and clearing the flag
  are now a single database operation.
- **A shared shop tablet silently ate people's XP.** The ledger of which quizzes
  had already paid out survived the handover, so the next seller aced the same
  quiz and earned exactly nothing — permanently, with no repair path.
- A manager could read every seller in both shops, and reset another manager's
  password. Both scoped down.
- Password reset and account removal now end that person's open sessions.
- The admin is no longer pinned to a shop and can switch between them.
- `tsc --noEmit` was typechecking **nothing** (empty root config + project
  references). `npm run typecheck` is the real one, and it found a genuine error
  the moment it ran.

---

## Stage 1 — Stop saying things that are not true (1–2 weeks)

Highest value per hour in the whole document, and some of it is legal exposure
rather than polish.

**Content that could cost real money**

- `objectionLessons.ts` scripts a **money-back guarantee that does not exist**:
  "you can get a full VAT refund at the border. Zero risk." Gibraltar has no
  VAT; Andorra has no buyer-side border refund. A seller repeating this is
  making a promise the shop cannot honour.
- `moreQuizzes2.ts` teaches "nothing to declare on the way home" and "no customs
  fees". Andorra → EU allowances are around €300. A €300 syringe sits exactly on
  that line.
- `scrubData.ts` has sellers say the scrub is "recommended to help with eczema,
  psoriasis". `syringeData.ts` sells "Natural Alternative to Botox", "stimulates
  collagen", "relaxes the facial muscles". Those are **medicinal claims** on a
  cosmetic, and Gibraltar runs UK cosmetics rules.
- There is **no safety screening** anywhere — no pregnancy question, no
  contraindication, no aftercare line — and sellers put product on strangers'
  faces twenty times a day.

**Numbers the app invents**

- `HomeDashboard` fires a "+15 XP" toast for the daily dose. No XP is added
  anywhere. Check-in and end-of-shift both promise XP in their copy and pay
  none.
- The daily challenge card shows 20/25/30 XP; the code always pays 20.
- On a new phone the header reads **1,840 XP next to 0 lessons and every
  category at 0%**, because XP syncs from the server and the lesson map does
  not.

**Spanish that points at the wrong lesson**

Seven Spanish lesson titles name a completely different lesson than their
English counterparts — "Building Instant Rapport" is titled "Building Instant
*Speed*" in Spanish. A Spanish-first seller cannot navigate their own
curriculum.

---

## Stage 2 — One XP ledger, one streak, numbers that cannot be typed in (2–3 weeks)

There are currently **four separate XP economies** (lessons/quizzes, daily flow,
street tracker, flashcards) and only one of them counts. There are **three
different streaks** with different rules on different screens; they will visibly
disagree with each other.

Worse, every number is client-authored. `stats` is writable by its owner with no
constraint, so one line in a phone's browser console sets your XP to 999999 and
your streak to 365. The leaderboard is the motivational core of the app and it
is currently forgeable.

- One `awardXP(source, amount)` path through `useProgress`; daily flow, street
  tracker and flashcards all route into it.
- Kill two of the three streaks.
- Move scoring server-side: an append-only `xp_events` table with a unique
  client event id, `stats` becomes a rollup the client cannot write. The
  idempotency key also kills the double-counting that happens today when someone
  re-completes lessons on a new phone.
- An outbox in IndexedDB that drains on reconnect, so nothing is lost when the
  app closes inside the 1.5-second save delay — which is most of the time, on a
  phone, in a street.

---

## Stage 3 — A manager dashboard that is not empty (2–3 weeks)

`getTeamProgress` and `getTeamStats` have **no database branch at all**. They
build the team from the old committed file and read progress from the manager's
own phone. A seller created through the button on that very screen never appears
in the team, and "no data" is shown for everyone, permanently.

- Wire the remaining backend functions to the database (the dispatch seam is the
  architecture's load-bearing idea and half of it was never connected).
- A `team_progress` RPC, plus the four missing indexes.
- Give Miguel something worth opening daily: who has not trained this week, who
  is stuck on a tier, whose stop→bring→sale rate is sliding.

---

## Stage 4 — Teach the parts of the sale that are missing (3–4 weeks)

The trainer's verdict: the demo choreography is genuinely professional — the
one-eye reveal, the mirror, turning to the companion for confirmation. The
sequencing around it is wrong, and three chunks of the sale are simply absent.

- **The bring.** Seven lessons on stopping, zero on the five metres between the
  pavement and the chair — the lead, walking half-backwards, the doorway
  hesitation, "sit here for me", what to do when one of a couple won't follow.
  This is where most sellers lose the customer.
- **Asking for the money, then shutting up.** Closing lines exist; no lesson
  teaches the ask, the silence after it, or who speaks first.
- **The counter.** Nothing on taking the card while the yes is warm, what to say
  while the terminal thinks, the second customer waiting, the walk-out. The 90
  seconds between "yes" and "paid" is where kiosk sales die.
- **Resequence.** Sixteen lessons currently stand between a new starter and
  their first price. Demo choreography should be tier 2 — it is what makes the
  sale and it is learnable by day three. The descent discounts should be gated
  *later*, not earlier.
- Cut lessons to a three-minute read. They average ~200 lines and claim 8–10
  minutes; nobody reads that between customers.

**A pricing observation, for you to rule on.** The mix-and-match ladder is
80 → 60 → *120 for 3* → *120 for 4* → *60 for 2* → 30. Rung two hands over a
fourth unit for zero extra revenue, and it is scripted as something the seller
volunteers ("that's the best deal in the shop"). Between 120 and 60 there is
nothing at all. As written, the ladder teaches sellers to halve. Adding rungs
between 120 and 60, and making buy-2-get-2 something traded for rather than
offered, is the single highest-revenue change in this document — but it is your
call, not mine, so I have not touched it.

---

## Stage 5 — Practice that transfers to the street (3–4 weeks)

Every interaction in the app is a tap. The highest-fidelity practice available
is choosing one of three *written* replies. Street selling is spoken, physical
and full of rejection.

- **The spoken rep.** 20–30 seconds saying today's technique out loud, scored
  against a rubric, with reps as the currency. Half the scaffolding already
  exists: a focus technique is chosen at check-in and asked about at end of
  shift, and the loop is simply never closed.
- **Close the shift loop.** Read yesterday's end-of-shift and tracker numbers to
  choose today's lesson, dose and cards. Ninety days of reflections are archived
  and nothing has ever read them.
- **Fix the flashcard scheduler.** It is a competent SM-2 skeleton with four real
  defects: no relearning step (a failed card leaves the session and returns
  tomorrow, skipping the single most valuable moment in retrieval practice); no
  interval fuzz, so every card reviewed on day one comes back on exactly the
  same day forever; no new-card cap, so day one shows a seller all 68 cards; and
  "mastered" is unreachable unless you rate yourself *Easy* twice running.
- **Make lesson completion mean something** — gate the tier on passing the quiz,
  not on pressing the button.
- **Re-test old lessons.** Pull quiz items back into the scheduler so knowledge
  visibly decays and can be repaired.

---

## Stage 6 — The phone experience (2 weeks)

- **Cheat Sheets is 13,692 pixels — sixteen screens.** It is the page labelled
  "open mid-sale". Sticky search, product-first default instead of "All",
  collapsed by default, pinning and recents.
- **No install prompt and no update prompt.** For staff on personal iPhones, an
  Add-to-Home-Screen path is the biggest single PWA gap. The service worker
  already has an update mechanism that nothing ever triggers.
- **Split Profile** — 1,112 lines and 3,820 pixels, with the theme switch buried
  3,400px down and the daily challenge card duplicated from home.
- Respect reduced motion (lesson bodies currently animate in from invisible),
  drop the 300ms slide on every route change, fix sub-44px targets, stop showing
  raw error messages to sellers.

---

## Stage 7 — Competition that stays fun after month two (2 weeks)

- The leaderboard is **lifetime-only**, so the longest-serving seller wins
  permanently and a new starter can never close the gap. Rolling 30-day board,
  plus a personal-best board so improvement counts.
- **XP is a finite pot.** Once the curriculum is done, earning collapses to about
  20 a day — exactly when practice should be intensifying.
- **No streak freeze**, on a rota-shift workforce, with heavy loss framing. One
  good week, then churn. Add rest days.
- The cheapest streak-keeper currently wins: one self-reported tap on the daily
  challenge is 20 XP and a streak day. That is the dominant strategy and it
  should not be.

---

## Stage 8 — Foundations (ongoing)

- **There are no tests.** The five worth having first: the XP economy and device
  handover; the backend dispatch contract; route guards; local-date logic
  (streaks and card scheduling, both of which already carry scars from timezone
  bugs); content integrity.
- **225 kB of lesson prose downloads on the dashboard**, because the progress
  hook imports the lesson text to count lessons. Split the index from the prose:
  one day's work, off the critical path of every single login.
- Versioned migrations instead of one re-runnable schema file, and an admin
  audit log.
- Longer term, provisioning should move behind an Edge Function using Supabase's
  own admin API. Writing `auth.users` directly works and is well guarded, but it
  is a rental: a platform upgrade can break account creation silently.

---

## If you only do three things

1. **Stage 1.** Stop teaching the refund guarantee and the medicinal claims, and
   stop showing XP numbers the app does not award.
2. **Stage 4's "bring" lessons**, and rule on the pricing ladder.
3. **Stage 2.** One XP ledger, server-owned, so the leaderboard means something —
   because everything you want to do with competition rests on it.
