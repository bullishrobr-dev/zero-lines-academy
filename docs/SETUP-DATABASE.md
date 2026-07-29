# Turning on the database

Right now the app saves progress on each person's own phone. That means no shared
leaderboard, no way for you to see anyone's numbers, and accounts that have to be
committed by hand.

This gets you a real one: **logins that work anywhere, progress that follows the
person between devices, and a live leaderboard.**

It is free, permanently, at your size. No card, no trial.

---

## What you do — about 10 minutes, once

### 1. Make a Supabase account

Go to **[supabase.com](https://supabase.com)** → **Start your project** → sign in with GitHub.

Create a project:

| Field | What to put |
|---|---|
| Name | `zero-lines-academy` |
| Database password | Let it generate one. **Save it in your password manager** — you will rarely need it, but it cannot be recovered. |
| Region | **West EU (Ireland)** — closest to Andorra and Gibraltar |
| Plan | **Free** |

It takes a couple of minutes to spin up.

### 2. Create the tables

Left sidebar → **SQL Editor** → **New query**.

Open [`supabase/schema.sql`](../supabase/schema.sql) in this repo, copy the whole
file, paste it in, press **Run**.

You should see *Success. No rows returned*. That is correct — it built the tables,
not a result.

### 3. Create your own login

Left sidebar → **Authentication** → **Users** → **Add user** → **Create new user**.

| Field | Value |
|---|---|
| Email | `admin@zerolines.local` |
| Password | whatever you want to type into the app |
| Auto Confirm User | **✅ tick this** |

> That email address is not real and nothing is ever sent to it. Supabase requires
> an email; the app lets you sign in with just `admin` and adds the rest.

Then back to **SQL Editor** → **New query**, paste this, **Run**:

```sql
update public.profiles
   set role = 'admin', name = 'Owner', username = 'admin'
 where id = (select id from auth.users where email = 'admin@zerolines.local');
```

That makes you the admin rather than a seller.

### 4. Send me two values

Left sidebar → **Project Settings** → **Data API**, and **Project Settings** → **API Keys**.

Copy me:

- **Project URL** — looks like `https://abcdefghijkl.supabase.co`
- **anon / public** key — a long string starting `eyJ...`

Paste both into the chat and I will wire them in and deploy.

> **These two are safe to share and safe to publish.** The anon key is built to
> ship inside a web page; the database is protected by access rules, not by
> hiding the key.
>
> **Do not send the `service_role` key.** That one ignores every rule. If a value
> is labelled `service_role`, it is the wrong one.

---

## What happens then

I flip the app over to the database and push. From that moment:

- **Logins work everywhere.** A seller signs in on their own phone with the
  username and password you give them.
- **Progress follows the person.** New phone, same XP and streak.
- **The leaderboard is live** — a real Andorra vs Gibraltar race across everyone.
- **You add people in the app.** Admin Panel → Add user. No commits, no editing
  files. They can sign in immediately.
- **You can see the team.** The manager dashboard shows real progress, because
  there is finally somewhere shared to read it from.

---

## Is the free tier really enough?

For a two-shop team, comfortably.

| Free tier gives you | You will use |
|---|---|
| 500 MB database | A few MB. Every lesson result for 20 sellers for a year is well under 10 MB. |
| 50,000 monthly active users | However many sellers you have |
| 5 GB bandwidth / month | Far less — the app is served from GitHub, not Supabase |
| Unlimited API requests | — |

The one thing to know: **a free project pauses after 7 days with no activity.**
Anyone opening the app wakes it, so a team using it weekly will never notice. If
it does pause, you un-pause it from the dashboard in one click.

---

## What this does not change

- The site stays on GitHub Pages at the same URL, and still deploys from GitHub.
- Supabase holds the data. It is a second service, but a free one, and it is the
  only way a website with no server can remember anything between devices.
- **The repository is public**, so the training content is readable by anyone who
  finds it. The database is not — that is behind real access rules. If you want
  the content private too, that needs GitHub Pro (~$4/month) to run Pages from a
  private repo.
