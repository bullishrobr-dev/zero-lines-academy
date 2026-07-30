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

-- True while somebody is still on a password another person chose for them.
-- Set when an account is made and again after an admin resets it; cleared the
-- moment they pick their own. The app will not let them past it.
alter table public.profiles
  add column if not exists must_change_password boolean not null default false;

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

-- You may edit your own row — but see guard_profile_self_edit() below, which is
-- what stops "edit your own row" meaning "make yourself an admin".
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
--  WHAT "EDIT YOUR OWN PROFILE" IS ALLOWED TO MEAN
--
--  The policy above lets you update your own row, which you need — clearing
--  must_change_password is exactly that. But a policy cannot restrict which
--  *columns* you touch, so on its own it also lets any seller set their own
--  role to 'admin' with one request. This trigger is the actual boundary.
-- ═════════════════════════════════════════════════════════════════════════════

create or replace function public.guard_profile_self_edit()
returns trigger language plpgsql set search_path = public as $fn$
begin
  -- admin_create_user() sets this for the length of its own transaction, so it
  -- can put a new seller on a team without being blocked here.
  if coalesce(current_setting('zl.provisioning', true), '') = 'on' then return new; end if;
  if public.is_admin() then return new; end if;

  if new.id         is distinct from old.id
     or new.username   is distinct from old.username
     or new.role       is distinct from old.role
     or new.location   is distinct from old.location
     or new.manager_id is distinct from old.manager_id then
    raise exception 'Only an admin may change that' using errcode = '42501';
  end if;
  return new;
end;
$fn$;

drop trigger if exists profiles_guard_self_edit on public.profiles;
create trigger profiles_guard_self_edit
  before update on public.profiles
  for each row execute function public.guard_profile_self_edit();

-- ═════════════════════════════════════════════════════════════════════════════
--  ADDING PEOPLE, FROM INSIDE THE APP
--
--  Sellers have no email address, so the app invents one on a domain that does
--  not exist. Going through the normal sign-up endpoint would make the auth
--  server try — and fail — to post a confirmation mail to it, and sign-up also
--  returns a session, which would quietly sign the admin in as the person they
--  just created.
--
--  So provisioning happens here instead: one call, already confirmed, no mail,
--  no session. SECURITY DEFINER means these run with full rights, so the first
--  thing each one does is check who is calling.
-- ═════════════════════════════════════════════════════════════════════════════

create or replace function public.admin_create_user(
  p_username text, p_name text, p_password text,
  p_role text default 'employee', p_location text default 'andorra',
  p_manager_id uuid default null
) returns uuid language plpgsql security definer set search_path = public, extensions as $fn$
declare
  v_caller_role text; v_caller_location text;
  v_username text := lower(trim(p_username));
  v_name     text := trim(p_name);
  v_role     text := coalesce(nullif(trim(p_role), ''), 'employee');
  v_location text := coalesce(nullif(trim(p_location), ''), 'andorra');
  v_manager_id uuid := p_manager_id;
  v_id uuid := gen_random_uuid();
  v_email text;
begin
  select role, location into v_caller_role, v_caller_location
    from public.profiles where id = auth.uid();
  if v_caller_role is null or v_caller_role not in ('admin','manager') then
    raise exception 'Only an admin or a manager may add people' using errcode = '42501';
  end if;

  -- A manager may only add sellers, to their own shop, onto their own team.
  if v_caller_role = 'manager' then
    v_role := 'employee'; v_location := v_caller_location; v_manager_id := auth.uid();
  end if;

  if v_role not in ('admin','manager','employee') then
    raise exception 'Unknown role: %', v_role using errcode = '22023'; end if;
  if v_location not in ('andorra','gibraltar') then
    raise exception 'Unknown shop: %', v_location using errcode = '22023'; end if;
  if v_username !~ '^[a-z0-9._-]{3,32}$' then
    raise exception 'Username must be 3-32 characters, using letters, numbers, dot, dash or underscore' using errcode = '22023'; end if;
  if v_name = '' then
    raise exception 'Name is required' using errcode = '22023'; end if;
  if length(p_password) < 8 then
    raise exception 'Password must be at least 8 characters' using errcode = '22023'; end if;

  v_email := v_username || '@zerolines.local';
  if exists (select 1 from public.profiles where username = v_username)
     or exists (select 1 from auth.users where email = v_email) then
    raise exception 'That username is taken' using errcode = '23505'; end if;
  if v_manager_id is not null and not exists (select 1 from public.profiles where id = v_manager_id) then
    raise exception 'That manager no longer exists' using errcode = '22023'; end if;

  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    -- These four have no default and the auth server cannot read a NULL into
    -- them; leaving them out breaks sign-in with a type error.
    confirmation_token, recovery_token, email_change, email_change_token_new
  ) values (
    '00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated',
    v_email, extensions.crypt(p_password, extensions.gen_salt('bf', 10)), now(),
    jsonb_build_object('provider','email','providers', jsonb_build_array('email')),
    jsonb_build_object('username', v_username, 'name', v_name, 'role', v_role, 'location', v_location),
    now(), now(), '', '', '', ''
  );

  insert into auth.identities (id, user_id, provider_id, identity_data, provider,
                               last_sign_in_at, created_at, updated_at)
  values (gen_random_uuid(), v_id, v_id::text,
          jsonb_build_object('sub', v_id::text, 'email', v_email,
                             'email_verified', true, 'phone_verified', false),
          'email', now(), now(), now());

  -- handle_new_user() has already written the profile and stats rows from the
  -- metadata above; this adds the team link, which it cannot know, and marks
  -- the password as borrowed until they choose their own.
  perform set_config('zl.provisioning', 'on', true);
  update public.profiles
     set manager_id = v_manager_id, must_change_password = true
   where id = v_id;

  return v_id;
end;
$fn$;

-- ── Resetting a forgotten password ──────────────────────────────────────────
create or replace function public.admin_set_password(p_user_id uuid, p_password text)
returns void language plpgsql security definer set search_path = public, extensions as $fn$
declare v_caller_role text; v_target_mgr uuid;
begin
  select role into v_caller_role from public.profiles where id = auth.uid();
  select manager_id into v_target_mgr from public.profiles where id = p_user_id;
  if v_caller_role is null or v_caller_role not in ('admin','manager') then
    raise exception 'Only an admin or a manager may reset a password' using errcode = '42501'; end if;
  if v_caller_role = 'manager' and v_target_mgr is distinct from auth.uid() then
    raise exception 'A manager may only reset their own team' using errcode = '42501'; end if;
  if length(p_password) < 8 then
    raise exception 'Password must be at least 8 characters' using errcode = '22023'; end if;
  if not exists (select 1 from auth.users where id = p_user_id) then
    raise exception 'No such person' using errcode = '22023'; end if;

  update auth.users
     set encrypted_password = extensions.crypt(p_password, extensions.gen_salt('bf', 10)),
         updated_at = now()
   where id = p_user_id;

  -- A password that has been read out over the phone is not a password. Ask
  -- them to pick their own the next time they sign in.
  perform set_config('zl.provisioning', 'on', true);
  update public.profiles set must_change_password = true where id = p_user_id;
end;
$fn$;

-- ── Removing someone ────────────────────────────────────────────────────────
-- Deletes the login itself, so the username can be used again. Everything else
-- (profile, progress, stats) goes with it through the cascades.
create or replace function public.admin_delete_user(p_user_id uuid)
returns void language plpgsql security definer set search_path = public, extensions as $fn$
begin
  if not public.is_admin() then
    raise exception 'Only an admin may remove someone' using errcode = '42501'; end if;
  if p_user_id = auth.uid() then
    raise exception 'You cannot remove your own account' using errcode = '22023'; end if;
  if (select role from public.profiles where id = p_user_id) = 'admin'
     and (select count(*) from public.profiles where role = 'admin') <= 1 then
    raise exception 'That is the last admin - promote someone else first' using errcode = '22023'; end if;
  delete from auth.users where id = p_user_id;
end;
$fn$;

-- Signed-out visitors must never be able to call any of these.
revoke all on function public.admin_create_user(text, text, text, text, text, uuid) from public, anon;
revoke all on function public.admin_set_password(uuid, text) from public, anon;
revoke all on function public.admin_delete_user(uuid) from public, anon;
grant execute on function public.admin_create_user(text, text, text, text, text, uuid) to authenticated;
grant execute on function public.admin_set_password(uuid, text) to authenticated;
grant execute on function public.admin_delete_user(uuid) to authenticated;

-- ═════════════════════════════════════════════════════════════════════════════
--  THE FIRST ADMIN
--
--  Everyone else is made from inside the app, but the first admin has to exist
--  before anyone can sign in to make anybody. Run this once, with a password of
--  your own. This project has already had it run.
--
--    do $boot$
--    declare v_id uuid := gen_random_uuid(); v_email text := 'admin@zerolines.local';
--    begin
--      if exists (select 1 from auth.users where email = v_email) then return; end if;
--      insert into auth.users (
--        instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
--        raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
--        confirmation_token, recovery_token, email_change, email_change_token_new
--      ) values (
--        '00000000-0000-0000-0000-000000000000', v_id, 'authenticated', 'authenticated',
--        v_email, extensions.crypt('CHOOSE-A-PASSWORD', extensions.gen_salt('bf', 10)), now(),
--        jsonb_build_object('provider','email','providers', jsonb_build_array('email')),
--        jsonb_build_object('username','admin','name','Owner','role','admin','location','andorra'),
--        now(), now(), '', '', '', ''
--      );
--      insert into auth.identities (id, user_id, provider_id, identity_data, provider,
--                                   last_sign_in_at, created_at, updated_at)
--      values (gen_random_uuid(), v_id, v_id::text,
--              jsonb_build_object('sub', v_id::text, 'email', v_email,
--                                 'email_verified', true, 'phone_verified', false),
--              'email', now(), now(), now());
--    end $boot$;
--
--  You sign in to the app as `admin` — it adds the @zerolines.local part.
-- ═════════════════════════════════════════════════════════════════════════════
