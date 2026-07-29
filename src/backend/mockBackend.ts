// ─────────────────────────────────────────────────────────────────────────────
// backend/mockBackend.ts — the seam where a real API would go.
//
// WHERE THE DATA ACTUALLY LIVES, because this trips people up:
//
//   WHO CAN SIGN IN  →  src/data/accounts.ts, committed to the repository.
//                       Edit that file and commit; everyone gets it on the next
//                       deploy. This is why a seller can sign in on their own
//                       phone at all — there is no server holding a user table.
//
//   PROGRESS         →  localStorage, on each person's own device. XP, streaks,
//                       lesson completion and quiz scores never leave the phone
//                       they were earned on. A manager cannot see them from
//                       here; that genuinely needs a server. See the README.
//
// Everything below is deliberately confined to this file so a real API can
// replace it without the rest of the app noticing.
// ─────────────────────────────────────────────────────────────────────────────

import type { User, UserRole, UserLocation, LessonProgress, QuizResult, TeamStats } from './types';
import { ACCOUNTS, accountId, findAccount, type Account } from '../data/accounts';
import { hashPassword, verifierMatches } from '../utils/credentials';

// ── Storage keys ──
const LS_CURRENT_USER = 'zl_user';
const LS_PROGRESS = 'zl_backend_progress';
const LS_QUIZZES = 'zl_backend_quiz_results';

/**
 * Total lessons in the curriculum. Deliberately a constant rather than an
 * import of src/data/lessons.ts — that module is large and already code-split
 * behind the lesson routes; importing it here would pull it into the initial
 * bundle for every user.
 */
export const TOTAL_LESSON_COUNT = 31;

// ── Helpers ──
function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked — losing a write is survivable, throwing is not.
  }
}

/** Committed roster entry → the shape the app works with. */
function toUser(a: Account): User {
  return {
    id: accountId(a.username),
    username: a.username.toLowerCase(),
    name: a.name,
    role: a.role,
    location: a.location,
    managerUsername: a.managerUsername?.toLowerCase(),
    // The roster does not track join dates; the app guards a missing value.
    createdAt: '',
  };
}

function allUsers(): User[] {
  return ACCOUNTS.map(toUser);
}

// ── Auth ──
export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Sign in against the committed roster.
 *
 * Deliberately gives one message for both "no such username" and "wrong
 * password" — telling someone which half they got right is free help.
 */
export async function login(username: string, password: string): Promise<LoginResult> {
  const account = findAccount(username);

  // Hash even when the username is unknown, so a missing account does not
  // return noticeably faster than a wrong password.
  const salt = account?.salt ?? 'no-such-account';
  const attempt = await hashPassword(password, salt);

  if (!account || !verifierMatches(attempt, account.verifier)) {
    return { success: false, error: 'Incorrect username or password' };
  }

  const user = toUser(account);
  saveJSON(LS_CURRENT_USER, user);
  return { success: true, user };
}

export function logout(): void {
  try {
    localStorage.removeItem(LS_CURRENT_USER);
  } catch {
    // non-fatal
  }
}

/**
 * The signed-in user, or null.
 *
 * Re-resolved against the committed roster on every read, so removing someone
 * from accounts.ts signs them out everywhere on the next deploy, and a change
 * to their role or shop takes effect without them signing in again.
 */
export function getCurrentUser(): User | null {
  const raw = loadJSON<Partial<User> | null>(LS_CURRENT_USER, null);
  if (!raw?.username) return null;

  const account = findAccount(raw.username);
  if (!account) {
    // Their account was removed from the roster, or this is a stale session
    // from before the username migration.
    logout();
    return null;
  }
  return toUser(account);
}

// ── User management ──
export async function getUsers(): Promise<User[]> {
  return allUsers();
}

/**
 * Employees reporting to a manager: their assigned reports, plus anyone at the
 * same shop who has no manager set yet. It deliberately does NOT fall back to
 * "everyone at this location" — that used to mean every manager saw every
 * colleague, and was how a plain seller could read the whole roster.
 */
function resolveTeam(users: User[], manager: User): User[] {
  return users.filter(
    (u) =>
      u.role === 'employee' &&
      (u.managerUsername === manager.username ||
        (!u.managerUsername && u.location === manager.location))
  );
}

export async function getMyTeam(managerId: string): Promise<User[]> {
  const users = allUsers();
  const manager = users.find((u) => u.id === managerId);
  if (!manager) return [];
  return resolveTeam(users, manager);
}

export async function getEmployeesByLocation(location: UserLocation): Promise<User[]> {
  return allUsers().filter((u) => u.role === 'employee' && u.location === location);
}

// ── Progress (device-local) ──
export async function getLessonProgress(userId: string): Promise<LessonProgress[]> {
  return loadJSON<LessonProgress[]>(LS_PROGRESS, []).filter((p) => p.userId === userId);
}

export async function completeLesson(userId: string, lessonId: string, score?: number): Promise<void> {
  const all = loadJSON<LessonProgress[]>(LS_PROGRESS, []);
  const idx = all.findIndex((p) => p.userId === userId && p.lessonId === lessonId);
  const record: LessonProgress = {
    userId,
    lessonId,
    completed: true,
    completedAt: new Date().toISOString(),
    score,
  };
  if (idx === -1) all.push(record);
  else all[idx] = record;
  saveJSON(LS_PROGRESS, all);
}

export async function getQuizResults(userId: string): Promise<QuizResult[]> {
  return loadJSON<QuizResult[]>(LS_QUIZZES, []).filter((q) => q.userId === userId);
}

export async function saveQuizResult(result: QuizResult): Promise<void> {
  const all = loadJSON<QuizResult[]>(LS_QUIZZES, []);
  all.push(result);
  saveJSON(LS_QUIZZES, all);
}

// ── Team view ──
export interface EmployeeProgress {
  user: User;
  progress: number;
  streak: number;
  avgScore: number;
  lastActive: string;
  completedLessons: number;
  totalLessons: number;
  /**
   * False when this device holds no records for the person — which is the
   * normal case, since progress never leaves the phone that earned it. The UI
   * must say so rather than render zeros as if they were measured.
   */
  hasData: boolean;
}

export async function getTeamProgress(managerId: string): Promise<EmployeeProgress[]> {
  const users = allUsers();
  const manager = users.find((u) => u.id === managerId);
  if (!manager) return [];

  const allProgress = loadJSON<LessonProgress[]>(LS_PROGRESS, []);
  const allQuizzes = loadJSON<QuizResult[]>(LS_QUIZZES, []);

  return resolveTeam(users, manager).map((emp) => {
    const empProgress = allProgress.filter((p) => p.userId === emp.id && p.completed);
    const empQuizzes = allQuizzes.filter((q) => q.userId === emp.id);
    const hasData = empProgress.length > 0 || empQuizzes.length > 0;
    const completedLessons = empProgress.length;

    return {
      user: emp,
      progress: Math.round((completedLessons / TOTAL_LESSON_COUNT) * 100),
      streak: 0,
      avgScore: empQuizzes.length
        ? Math.round(empQuizzes.reduce((s, q) => s + q.score, 0) / empQuizzes.length)
        : 0,
      lastActive: empProgress.length
        ? (empProgress
            .slice()
            .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))[0]
            .completedAt ?? '')
        : '',
      completedLessons,
      totalLessons: TOTAL_LESSON_COUNT,
      hasData,
    };
  });
}

export async function getTeamStats(managerId: string): Promise<TeamStats> {
  const team = await getTeamProgress(managerId);
  const measured = team.filter((e) => e.hasData);
  if (measured.length === 0) {
    return { totalEmployees: team.length, avgCompletion: 0, topPerformer: '—', atRiskCount: 0 };
  }
  return {
    totalEmployees: team.length,
    avgCompletion: Math.round(measured.reduce((s, e) => s + e.progress, 0) / measured.length),
    topPerformer: measured.reduce((best, e) => (e.progress > best.progress ? e : best), measured[0])
      .user.name.split(' ')[0],
    atRiskCount: measured.filter((e) => e.progress < 40).length,
  };
}

// ── Roster editing ──
// There is no server, so the app cannot add a person for everyone. What it can
// do is produce the exact line to commit. See AdminPanel.

export interface NewAccountDraft {
  username: string;
  name: string;
  role: UserRole;
  location: UserLocation;
  managerUsername?: string;
}

export function usernameTaken(username: string): boolean {
  return !!findAccount(username);
}

/** The snippet the owner pastes into src/data/accounts.ts. */
export async function buildAccountSnippet(
  draft: NewAccountDraft,
  password: string,
  salt: string
): Promise<string> {
  const verifier = await hashPassword(password, salt);
  const manager = draft.managerUsername
    ? `\n    managerUsername: '${draft.managerUsername.toLowerCase()}',`
    : '';
  return `  {
    username: '${draft.username.trim().toLowerCase()}',
    name: '${draft.name.replace(/'/g, "\\'")}',
    salt: '${salt}',
    verifier: '${verifier}',
    role: '${draft.role}',
    location: '${draft.location}',${manager}
  },`;
}
