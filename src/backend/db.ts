// ─────────────────────────────────────────────────────────────────────────────
// db.ts — the live database implementation.
//
// Used automatically whenever supabaseClient.ts has a URL and key. Until then
// the app falls back to the committed roster, so nothing breaks while the
// database is being set up.
//
// Everything here mirrors the function signatures in mockBackend.ts, which
// dispatches to whichever implementation is available.
// ─────────────────────────────────────────────────────────────────────────────

import { getSupabase, usernameToEmail, type ProfileRow } from './supabaseClient';
import type { User, UserRole, UserLocation } from './types';

function toUser(p: ProfileRow, managerUsername?: string): User {
  return {
    id: p.id,
    username: p.username,
    name: p.name,
    role: p.role,
    location: p.location,
    managerUsername,
    mustChangePassword: p.must_change_password ?? false,
    createdAt: p.created_at ?? '',
  };
}

// ── Auth ────────────────────────────────────────────────────────────────────

export async function login(username: string, password: string) {
  const sb = getSupabase();
  if (!sb) return { success: false as const, error: 'Database not configured' };

  const { error } = await sb.auth.signInWithPassword({
    email: usernameToEmail(username),
    password,
  });

  if (error) {
    // A wrong password and an unreachable server are completely different
    // problems, and telling a seller "incorrect password" when their signal
    // dropped sends them hunting for the wrong thing.
    const code = error.code ?? '';
    const wrongDetails =
      code === 'invalid_credentials' ||
      code === 'invalid_login_credentials' ||
      /invalid login credentials/i.test(error.message);

    if (wrongDetails) {
      // One message for both causes — telling someone which half they got
      // right is free help to whoever is guessing.
      return { success: false as const, error: 'Incorrect username or password' };
    }
    if (error.status === 0 || /fetch|network/i.test(error.message)) {
      return { success: false as const, error: 'Cannot reach the server. Check your signal and try again.' };
    }
    return { success: false as const, error: error.message };
  }

  const user = await getCurrentUser();
  if (!user) return { success: false as const, error: 'Signed in, but no profile found' };
  return { success: true as const, user };
}

export async function logout(): Promise<void> {
  await getSupabase()?.auth.signOut();
}

/** Resolves the signed-in auth session to a profile row. */
export async function getCurrentUser(): Promise<User | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data: session } = await sb.auth.getUser();
  if (!session.user) return null;

  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();
  if (error || !data) return null;

  return toUser(data as ProfileRow, await managerUsernameFor((data as ProfileRow).manager_id));
}

async function managerUsernameFor(managerId: string | null): Promise<string | undefined> {
  if (!managerId) return undefined;
  const sb = getSupabase();
  const { data } = await sb!.from('profiles').select('username').eq('id', managerId).maybeSingle();
  return (data as { username: string } | null)?.username;
}

// ── Roster ──────────────────────────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('profiles').select('*').order('name');
  if (error || !data) return [];

  const rows = data as ProfileRow[];
  const byId = new Map(rows.map((r) => [r.id, r.username]));
  return rows.map((r) => toUser(r, r.manager_id ? byId.get(r.manager_id) : undefined));
}

/**
 * A manager's team: the sellers who report to them, plus any seller at their
 * own shop who has not been assigned to a manager yet. Same rule as the roster
 * fallback in mockBackend, so a manager sees the same faces either way.
 */
async function resolveTeamProfiles(managerId: string): Promise<ProfileRow[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const { data: mgr } = await sb
    .from('profiles')
    .select('location')
    .eq('id', managerId)
    .maybeSingle();
  const location = (mgr as { location: string | null } | null)?.location ?? null;

  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .eq('role', 'employee')
    .order('name');
  if (error || !data) return [];

  return (data as ProfileRow[]).filter(
    (p) => p.manager_id === managerId || (p.manager_id === null && p.location === location)
  );
}

export async function getMyTeam(managerId: string): Promise<User[]> {
  const rows = await resolveTeamProfiles(managerId);
  return rows.map((r) => toUser(r));
}

// ── Team progress — what the manager dashboard reads ─────────────────────────

export interface TeamMemberProgress {
  user: User;
  progress: number;
  streak: number;
  avgScore: number;
  lastActive: string;
  completedLessons: number;
  totalLessons: number;
  hasData: boolean;
}

/**
 * Every team member's figures, read from `stats` (globally readable, and what
 * each seller pushes) and `quiz_results` (their average score, where policy
 * allows). `hasData` is false for someone who has not started, so the screen
 * can say "nothing yet" rather than draw a real-looking zero.
 */
export async function getTeamProgress(
  managerId: string,
  totalLessons: number
): Promise<TeamMemberProgress[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const team = await resolveTeamProfiles(managerId);
  if (team.length === 0) return [];
  const ids = team.map((p) => p.id);

  const { data: statsRows } = await sb.from('stats').select('*').in('user_id', ids);
  const statsById = new Map(
    ((statsRows as StatsSnapshotRow[] | null) ?? []).map((s) => [s.user_id, s])
  );

  // Average quiz score, for the direct reports whose results this manager may
  // read. Missing rows simply leave avgScore at 0.
  const { data: quizRows } = await sb
    .from('quiz_results')
    .select('user_id,best_score')
    .in('user_id', ids);
  const quizByUser = new Map<string, number[]>();
  for (const q of (quizRows as { user_id: string; best_score: number }[] | null) ?? []) {
    const list = quizByUser.get(q.user_id) ?? [];
    list.push(q.best_score);
    quizByUser.set(q.user_id, list);
  }

  return team.map((p) => {
    const s = statsById.get(p.id);
    const scores = quizByUser.get(p.id) ?? [];
    const completedLessons = s?.lessons_done ?? 0;
    const hasData = !!s && (s.xp > 0 || s.lessons_done > 0 || !!s.last_active_date);
    return {
      user: toUser(p),
      progress: totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0,
      streak: s?.current_streak ?? 0,
      avgScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
      lastActive: s?.last_active_date ?? '',
      completedLessons,
      totalLessons,
      hasData,
    };
  });
}

interface StatsSnapshotRow {
  user_id: string;
  xp: number;
  current_streak: number;
  best_streak: number;
  last_active_date: string | null;
  lessons_done: number;
  quizzes_passed: number;
}

// ── Creating a person ───────────────────────────────────────────────────────

export interface CreateUserInput {
  username: string;
  name: string;
  password: string;
  role: UserRole;
  location: UserLocation;
  managerId?: string | null;
}

export async function usernameExists(username: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { data } = await sb
    .from('profiles')
    .select('id')
    .eq('username', username.trim().toLowerCase())
    .maybeSingle();
  return !!data;
}

/**
 * Create a login and its profile — in one call, from inside the app.
 *
 * This goes through `admin_create_user` in the database rather than the normal
 * sign-up endpoint, for two reasons:
 *
 *  1. Sellers have no email address. The app invents one on a domain that does
 *     not exist, so sign-up would have the auth server try — and fail — to post
 *     a confirmation mail to it, and the account would never be usable.
 *  2. Sign-up returns a session. Creating someone would quietly sign the admin
 *     in as the person they just created.
 *
 * The function runs with elevated rights, so it checks the caller itself: only
 * an admin or a manager may call it, and a manager may only add sellers to
 * their own shop and their own team.
 */
export async function createUser(input: CreateUserInput) {
  const sb = getSupabase();
  if (!sb) return { success: false as const, error: 'Database not configured' };

  const { data, error } = await sb.rpc('admin_create_user', {
    p_username: input.username.trim().toLowerCase(),
    p_name: input.name.trim(),
    p_password: input.password,
    p_role: input.role,
    p_location: input.location,
    p_manager_id: input.managerId ?? null,
  });

  if (error) return { success: false as const, error: friendly(error.message) };
  return { success: true as const, userId: String(data) };
}

/**
 * Give someone a new password — for when a seller forgets theirs.
 *
 * The database also re-arms `must_change_password`, so the person is asked to
 * pick their own the next time they sign in. A password that has been read out
 * over the phone is not a password.
 */
export async function setPassword(userId: string, password: string) {
  const sb = getSupabase();
  if (!sb) return { success: false as const, error: 'Database not configured' };
  const { error } = await sb.rpc('admin_set_password', {
    p_user_id: userId,
    p_password: password,
  });
  if (error) return { success: false as const, error: friendly(error.message) };
  return { success: true as const };
}

/**
 * The signed-in person choosing their own password.
 *
 * Setting the password and clearing the "you are on a borrowed password" flag
 * are one operation in the database, deliberately. When they were two, the flag
 * was an ordinary column on a row you are allowed to edit — so anyone could
 * clear it with a single request and skip the screen entirely, without ever
 * changing their password.
 */
export async function changeOwnPassword(password: string) {
  const sb = getSupabase();
  if (!sb) return { success: false as const, error: 'Database not configured' };

  const { error } = await sb.rpc('set_own_password', { p_password: password });
  if (error) {
    if (/fetch|network/i.test(error.message)) {
      return { success: false as const, error: 'Cannot reach the server. Check your signal and try again.' };
    }
    return { success: false as const, error: friendly(error.message) };
  }
  return { success: true as const };
}

/**
 * Remove someone completely — the login as well as the profile, so the username
 * can be used again. Progress and stats go with it through the cascades.
 */
export async function deleteUser(userId: string) {
  const sb = getSupabase();
  if (!sb) return { success: false as const, error: 'Database not configured' };
  const { error } = await sb.rpc('admin_delete_user', { p_user_id: userId });
  if (error) return { success: false as const, error: friendly(error.message) };
  return { success: true as const };
}

/**
 * Database errors arrive with Postgres framing around them. The messages raised
 * by our own functions are already written for a person, so strip the wrapper
 * and leave anything unrecognised alone.
 */
function friendly(message: string): string {
  return message.replace(/^ERROR:\s*/i, '').replace(/\s*CONTEXT:[\s\S]*$/, '').trim() || 'Something went wrong';
}

export async function updateUser(
  userId: string,
  changes: Partial<Pick<ProfileRow, 'name' | 'role' | 'location' | 'manager_id'>>
): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  const { error } = await sb.from('profiles').update(changes).eq('id', userId);
  return !error;
}

// ── Stats — what the leaderboard reads ──────────────────────────────────────

export interface StatsSnapshot {
  xp: number;
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string | null;
  lessonsDone: number;
  quizzesPassed: number;
}

/** Push this device's figures up so they survive a new phone and rank live. */
export async function pushStats(userId: string, s: StatsSnapshot): Promise<void> {
  const sb = getSupabase();
  if (!sb) return;
  await sb.from('stats').upsert(
    {
      user_id: userId,
      xp: s.xp,
      current_streak: s.currentStreak,
      best_streak: s.bestStreak,
      last_active_date: s.lastActiveDate,
      lessons_done: s.lessonsDone,
      quizzes_passed: s.quizzesPassed,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
}

export async function pullStats(userId: string): Promise<StatsSnapshot | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.from('stats').select('*').eq('user_id', userId).maybeSingle();
  if (!data) return null;
  const r = data as {
    xp: number;
    current_streak: number;
    best_streak: number;
    last_active_date: string | null;
    lessons_done: number;
    quizzes_passed: number;
  };
  return {
    xp: r.xp,
    currentStreak: r.current_streak,
    bestStreak: r.best_streak,
    lastActiveDate: r.last_active_date,
    lessonsDone: r.lessons_done,
    quizzesPassed: r.quizzes_passed,
  };
}

export async function recordLessonComplete(userId: string, lessonId: string): Promise<void> {
  await getSupabase()
    ?.from('progress')
    .upsert({ user_id: userId, lesson_id: lessonId }, { onConflict: 'user_id,lesson_id' });
}

export async function recordQuiz(
  userId: string,
  quizId: string,
  kind: 'quiz' | 'exercise',
  bestScore: number,
  xpAwarded: number
): Promise<void> {
  await getSupabase()
    ?.from('quiz_results')
    .upsert(
      {
        user_id: userId,
        quiz_id: quizId,
        kind,
        best_score: bestScore,
        xp_awarded: xpAwarded,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,quiz_id' }
    );
}

// ── Leaderboard ─────────────────────────────────────────────────────────────

export interface LiveLeaderboardEntry {
  id: string;
  username: string;
  name: string;
  location: UserLocation;
  xp: number;
  currentStreak: number;
  lessonsDone: number;
}

export async function getLeaderboard(): Promise<LiveLeaderboardEntry[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.from('leaderboard').select('*');
  if (error || !data) return [];
  return (data as Array<Record<string, unknown>>).map((r) => ({
    id: String(r.id),
    username: String(r.username),
    name: String(r.name),
    location: r.location as UserLocation,
    xp: Number(r.xp ?? 0),
    currentStreak: Number(r.current_streak ?? 0),
    lessonsDone: Number(r.lessons_done ?? 0),
  }));
}
