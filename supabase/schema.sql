-- ═════════════════════════════════════════════════════════════════════════════
--  ZERO LINES ACADEMY — DATABASE SETUP
--
--  Paste this whole file into Supabase → SQL Editor → New query → Run.
--  It is safe to run more than once.
--
--  What it creates:
--    profiles       who each person is (name, role, shop)
--    progress       lessons completed, per person
--    quiz_results   quiz and exercise scores, per person
--    stats          XP, streak and totals — what the leaderboard reads
--    sales          street tracker: stops, brings, sales
--
--  Every table is protected by Row Level Security, so the public API key that
--  ships in the app can only ever read and write what the signed-in person is
--  allowed to touch.
-- ═════════════════════════════════════════════════════════════════════════════

-- ── Profiles ────────────────────────────────────────────────────────────────
-- One row per person, created automatically when their login is created.

create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  name        text not null,
  role        text not null default 'employee' check (role in ('admin', 'manager', 'employee')),
  location    text not null default 'andorra' check (location in ('andorra', 'gibraltar')),
  manager_id  uuid references public.profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);

-- ── Progress ────────────────────────────────────────────────────────────────
create table if not exists public.progress (
  user_id      uuid not null references public.profiles(id) on delete cascade,
  lesson_id    text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- ── Quiz and exercise results ───────────────────────────────────────────────
create table if not exists public.quiz_results (
  user_id      uuid not null references public.profiles(id) on delete cascade,
  quiz_id      text not null,
  kind         text not null default 'quiz' check (kind in ('quiz', 'exercise')),
  best_score   int  not null default 0 check (best_score between 0 and 100),
  xp_awarded   int  not null default 0,
  updated_at   timestamptz not null default now(),
  primary key (user_id, quiz_id)
);

-- ── Stats — the leaderboard reads this ──────────────────────────────────────
create table if not exists public.stats (
  user_id          uuid primary key references public.profiles(id) on delete cascade,
  xp               int not null default 0,
  current_streak   int not null default 0,
  best_streak      int not null default 0,
  last_active_date date,
  lessons_done     int not null default 0,
  quizzes_passed   int not null default 0,
  updated_at       timestamptz not null default now()
);

-- ── Street tracker ──────────────────────────────────────────────────────────
create table if not exists public.sales (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  kind        text not null check (kind in ('stop', 'bring', 'sale')),
  product_id  text,
  amount      numeric(10,2),
  occurred_at timestamptz not null default now()
);

create index if not exists sales_user_time_idx on public.sales (user_id, occurred_at desc);

-- ═════════════════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
--
--  The key that ships in the app is the "anon" key. It is meant to be public —
--  these policies are what actually protect the data, not the key.
-- ═════════════════════════════════════════════════════════════════════════════

alter table public.profiles     enable row level security;
alter table public.progress     enable row level security;
alter table public.quiz_results enable row level security;
alter table public.stats        enable row level security;
alter table public.sales        enable row level security;

-- Helper: is the caller an admin? SECURITY DEFINER avoids the policy recursing
-- into profiles while it is deciding whether you may read profiles.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role in ('admin', 'manager')
  );
$$;

-- ── profiles ────────────────────────────────────────────────────────────────
drop policy if exists "read team profiles"   on public.profiles;
drop policy if exists "update own profile"   on public.profiles;
drop policy if exists "admin manages profiles" on public.profiles;

-- Everyone signed in can see the roster: the leaderboard needs names, and this
-- exposes no scores by itself.
create policy "read team profiles" on public.profiles
  for select to authenticated using (true);

create policy "update own profile" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "admin manages profiles" on public.profiles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── progress / quiz_results / sales — yours to write, staff may read ────────
drop policy if exists "own progress"       on public.progress;
drop policy if exists "staff read progress" on public.progress;

create policy "own progress" on public.progress
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "staff read progress" on public.progress
  for select to authenticated using (public.is_staff());

drop policy if exists "own quiz results"       on public.quiz_results;
drop policy if exists "staff read quiz results" on public.quiz_results;

create policy "own quiz results" on public.quiz_results
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "staff read quiz results" on public.quiz_results
  for select to authenticated using (public.is_staff());

drop policy if exists "own sales"       on public.sales;
drop policy if exists "staff read sales" on public.sales;

create policy "own sales" on public.sales
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "staff read sales" on public.sales
  for select to authenticated using (public.is_staff());

-- ── stats — everyone reads (that IS the leaderboard), you write only your own
drop policy if exists "read all stats" on public.stats;
drop policy if exists "own stats"      on public.stats;

create policy "read all stats" on public.stats
  for select to authenticated using (true);

create policy "own stats" on public.stats
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- ═════════════════════════════════════════════════════════════════════════════
--  AUTOMATION
-- ═════════════════════════════════════════════════════════════════════════════

-- When a login is created, create the matching profile and stats row from the
-- metadata the app passes in. Without this you would have a login with nobody
-- attached to it.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, name, role, location)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'employee'),
    coalesce(new.raw_user_meta_data->>'location', 'andorra')
  )
  on conflict (id) do nothing;

  insert into public.stats (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ═════════════════════════════════════════════════════════════════════════════
--  LEADERBOARD
--
--  A view so the app makes one call instead of stitching tables together, and
--  so it can never accidentally select a column it should not see.
-- ═════════════════════════════════════════════════════════════════════════════

create or replace view public.leaderboard
with (security_invoker = true) as
  select
    p.id,
    p.username,
    p.name,
    p.location,
    coalesce(s.xp, 0)             as xp,
    coalesce(s.current_streak, 0) as current_streak,
    coalesce(s.lessons_done, 0)   as lessons_done,
    s.updated_at
  from public.profiles p
  left join public.stats s on s.user_id = p.id
  where p.role <> 'admin'
  order by coalesce(s.xp, 0) desc;

-- ═════════════════════════════════════════════════════════════════════════════
--  DONE.
--
--  Next: create your own login.
--    Authentication → Users → Add user → Create new user
--      Email:    admin@zerolines.local
--      Password: (choose one)
--      ✅ Auto Confirm User
--
--  Then run this so that login is an admin rather than a seller:
--
--    update public.profiles
--       set role = 'admin', name = 'Owner', username = 'admin'
--     where id = (select id from auth.users where email = 'admin@zerolines.local');
--
--  You sign in to the app as `admin` — it adds the @zerolines.local part.
-- ═════════════════════════════════════════════════════════════════════════════
