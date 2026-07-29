# The database

**It is already set up. There is nothing for you to do here.**

This page is a record of how it is put together, for whoever looks after the app
next.

---

## What is running

| | |
|---|---|
| Project | **Zero Lines Academy**, region `eu-west-1` |
| URL | `https://cwlrmwajxbtjhqnbeghe.supabase.co` |
| Cost | Free tier — no card, no bill |
| Schema | [`supabase/schema.sql`](../supabase/schema.sql) |
| App connection | [`src/backend/supabaseClient.ts`](../src/backend/supabaseClient.ts) |

### Tables

| Table | Holds |
|---|---|
| `profiles` | Who each person is — username, name, role, shop, their manager |
| `progress` | Which lessons someone has finished |
| `quiz_results` | Best score per quiz and per exercise |
| `stats` | XP, streaks and totals — this is what the leaderboard reads |
| `sales` | Street tracker: stops, brings, sales |
| `leaderboard` | A view joining `profiles` to `stats`, admins excluded |

---

## Signing in

Sellers sign in with a **username**, not an email — most shop staff have no work
address, and a short username is far quicker to type on a phone between
customers. The auth server needs an email, so the app appends
`@zerolines.local`: `maria` becomes `maria@zerolines.local`. That domain does not
exist and is never sent to.

## Adding people

From the app — **Admin Panel → Add someone**. It generates a password, creates
the login, and shows you the credentials once to pass on. No dashboard, no
commit, no waiting for a rebuild.

Behind it is `admin_create_user()` in the database rather than the normal sign-up
endpoint, because sign-up would try to post a confirmation mail to a domain that
does not exist, and would also return a session — quietly signing you in as the
person you just created.

A **manager** can add people too, but only sellers, only to their own shop, and
only onto their own team. That is enforced in the database, not in the screen,
so it holds however the request arrives.

## Forgotten passwords

`admin_set_password()` gives someone a new password. There is no "forgot
password" email, because there are no email addresses.

## Removing someone

`admin_delete_user()` deletes the login itself, so the username can be used
again; their progress goes with it. The last remaining admin cannot be removed,
and you cannot remove yourself.

---

## About the key in the repository

`src/backend/supabaseClient.ts` contains a publishable key. **That is correct and
safe.** It is designed to be public and to ship inside the app — it identifies
the project, it does not grant anything.

What actually protects the data is Row Level Security. Every table has policies
that decide what the signed-in person may read and write:

- you can only write your own progress, scores and stats
- everyone signed in can read `stats`, because that *is* the leaderboard
- managers and admins can read their people's progress
- only admins can change the roster

The key that must **never** be committed is the `service_role` (or
`sb_secret_…`) key. That one bypasses every policy.

---

## If you ever need to rebuild it from nothing

1. Create a Supabase project.
2. SQL Editor → paste [`supabase/schema.sql`](../supabase/schema.sql) → Run.
3. Run the first-admin block at the bottom of that file, with a password of your
   choosing.
4. Put the project URL and publishable key into
   [`src/backend/supabaseClient.ts`](../src/backend/supabaseClient.ts).

The app checks those two values at startup. If they are blank it falls back to
the committed roster in `src/data/accounts.ts` with progress kept on each
device — so a fork still runs before anyone sets a database up.

---

## Free tier

The project sleeps after about a week with no traffic and wakes on the next
request. With sellers using it during shifts that will not happen. If it ever
does, opening the app wakes it — the first load is slow, the rest are normal.
