/*
 * The backend the SMOKE TEST talks to: none.
 *
 * vite.test.config.ts swaps this in for src/backend/supabaseClient.ts. Blank
 * URL and key put the app into the device-only mode it already ships with —
 * the committed roster plus local progress — which is what the fallback exists
 * for and is worth exercising anyway.
 *
 * Two reasons this matters more than "it makes CI simpler":
 *   · CI runs on every push. Against the live database that is a bot signing in
 *     as a real seller and banking XP and a streak on their account, several
 *     times a day, forever.
 *   · A test that needs a password in a repository secret is a test that stops
 *     running the day the secret expires, and nobody notices.
 *
 * If this file drifts out of step with the real module the test build fails
 * immediately with "does not provide an export named …", which is the right
 * kind of failure — loud, at build time, before anything is asserted.
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = '';
export const SUPABASE_ANON_KEY = '';

/* Deliberately not the real stamp. If a screenshot from this build ever turns
   up in a bug report, the stamp says where it came from. */
export const BUILD_STAMP = 'test build';

export const USERNAME_DOMAIN = 'zerolines.local';

export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}@${USERNAME_DOMAIN}`;
}

export function emailToUsername(email: string): string {
  return email.split('@')[0];
}

export const isDatabaseConfigured = false;

export function getSupabase(): SupabaseClient | null {
  return null;
}

export interface ProfileRow {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  location: 'andorra' | 'gibraltar' | null;
  manager_id: string | null;
  must_change_password: boolean | null;
  created_at: string;
}

export interface StatsRow {
  user_id: string;
  xp: number;
  current_streak: number;
  best_streak: number;
  last_active_date: string | null;
  lessons_done: number;
  quizzes_passed: number;
  updated_at: string;
}

export interface LeaderboardRow {
  id: string;
  username: string;
  name: string;
  location: 'andorra' | 'gibraltar';
  xp: number;
  current_streak: number;
  lessons_done: number;
  updated_at: string | null;
}
