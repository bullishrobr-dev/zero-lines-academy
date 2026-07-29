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

import { createClient } from '@supabase/supabase-js';
import {
  getSupabase,
  usernameToEmail,
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  type ProfileRow,
} from './supabaseClient';
import type { User, UserRole, UserLocation } from './types';

function toUser(p: ProfileRow, managerUsername?: string): User {
  return {
    id: p.id,
    username: p.username,
    name: p.name,
    role: p.role,
    location: p.location,
    managerUsername,
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
  // One message for both causes — telling someone which half they got right is
  // free help to whoever is guessing.
  if (error) return { success: false as const, error: 'Incorrect username or password' };

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

export async function getMyTeam(managerId: string): Promise<User[]> {
  return (await getUsers()).filter((u) => u.role === 'employee' && u.managerUsername);
  // Filtering by manager happens in getTeamProgress, which has the ids.
  void managerId;
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
 * Create a login and its profile.
 *
 * Signs up through a SEPARATE client with `persistSession: false`, so creating
 * someone does not replace the admin's own session — which is exactly the bug
 * the old localStorage backend had, where adding an employee silently logged
 * the admin in as them.
 */
export async function createUser(input: CreateUserInput) {
  const sb = getSupabase();
  if (!sb) return { success: false as const, error: 'Database not configured' };

  const username = input.username.trim().toLowerCase();
  if (await usernameExists(username)) {
    return { success: false as const, error: 'That username is taken' };
  }

  const isolated = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const { data, error } = await isolated.auth.signUp({
    email: usernameToEmail(username),
    password: input.password,
    // Read by the handle_new_user() trigger in supabase/schema.sql.
    options: { data: { username, name: input.name, role: input.role, location: input.location } },
  });

  if (error) return { success: false as const, error: error.message };
  if (!data.user) {
    return {
      success: false as const,
      error: 'Account created but not confirmed — turn off "Confirm email" in Supabase → Authentication → Providers.',
    };
  }

  // The trigger writes role and location from the metadata above, but the
  // manager link needs the admin's own session (RLS lets an admin update
  // profiles; the isolated client is not signed in as anyone).
  if (input.managerId) {
    await sb.from('profiles').update({ manager_id: input.managerId }).eq('id', data.user.id);
  }

  return { success: true as const, userId: data.user.id };
}

export async function deleteUser(userId: string) {
  const sb = getSupabase();
  if (!sb) return { success: false as const, error: 'Database not configured' };
  // Removing the profile revokes access; the auth row is cleaned up from the
  // Supabase dashboard, which needs a privileged key the browser must not hold.
  const { error } = await sb.from('profiles').delete().eq('id', userId);
  if (error) return { success: false as const, error: error.message };
  return { success: true as const };
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
