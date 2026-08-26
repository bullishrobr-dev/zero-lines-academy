// ─────────────────────────────────────────────────────────────────────────────
// supabaseClient.ts — the live database connection.
//
// The app works with or without this. If the two values below are blank it
// falls back to the committed roster in src/data/accounts.ts and device-local
// progress, so the site never breaks while the database is being set up.
//
// ── ABOUT THE KEY BELOW ──────────────────────────────────────────────────────
// The publishable key is DESIGNED to be public and shipped in the browser. It
// is not a secret and committing it is correct. What protects the data is Row
// Level Security in supabase/schema.sql — those policies decide what each
// signed-in person may read and write.
//
// The key that must NEVER appear here is the `service_role` (or `sb_secret_…`)
// key. If you are pasting something labelled service_role, stop: that one
// bypasses every policy.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/** Supabase → Project Settings → Data API → Project URL */
export const SUPABASE_URL = 'https://cwlrmwajxbtjhqnbeghe.supabase.co';

/**
 * Supabase → Project Settings → API Keys → anon / public.
 *
 * This is the long-standing JWT form rather than the newer `sb_publishable_…`
 * one. Both are public keys and both are meant to ship in the browser; this one
 * is accepted by every version of the API, which is worth more here than being
 * current.
 */
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3bHJtd2FqeGJ0amhxbmJlZ2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MjY3NDAsImV4cCI6MjA5NTMwMjc0MH0.HZdmEK7LUr-Qa8i9i5xaN2nRAtmPmQLfyXikceCGyN4';

/**
 * Bumped by hand on every deploy. It is printed on the sign-in screen, so
 * "which build is this phone actually running?" is a question anyone can answer
 * by looking — rather than a guess about service worker caches.
 */
export const BUILD_STAMP = 'build 61';

/**
 * Sellers sign in with a username, not an email — most shop staff have no work
 * address, and a short username is far quicker to type on a phone between
 * customers. Supabase Auth wants an email, so the app appends this domain.
 * It is never sent to; it just makes a valid, unique address.
 */
export const USERNAME_DOMAIN = 'zerolines.local';

export function usernameToEmail(username: string): string {
  return `${username.trim().toLowerCase()}@${USERNAME_DOMAIN}`;
}

export function emailToUsername(email: string): string {
  return email.split('@')[0];
}

/** True once the two values above are filled in. */
export const isDatabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let client: SupabaseClient | null = null;

/** The live client, or null when the database has not been configured yet. */
export function getSupabase(): SupabaseClient | null {
  if (!isDatabaseConfigured) return null;
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // The app uses HashRouter, so there is no path-based callback to parse.
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}

// ── Row shapes, mirroring supabase/schema.sql ───────────────────────────────

export interface ProfileRow {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  /** Null for an admin, who is tied to neither shop. */
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
