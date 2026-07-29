// ─────────────────────────────────────────────────────────────
// backend/mockBackend.ts — Complete mock backend API
// All data persisted to localStorage. Ready for Supabase swap.
// ─────────────────────────────────────────────────────────────

import type { User, UserRole, UserLocation, LessonProgress, QuizResult, TeamStats } from './types';

// ── Storage keys ──
const LS_USERS = 'zl_backend_users';
const LS_CURRENT_USER = 'zl_user';
const LS_PROGRESS = 'zl_backend_progress';
const LS_QUIZZES = 'zl_backend_quiz_results';
const LS_SEEDED = 'zl_backend_seeded';

/**
 * Total lessons in the curriculum. Deliberately a constant rather than an
 * import of `src/data/lessons.ts` — that module is 435 kB and is already
 * code-split behind the lesson routes; importing it here would pull it into
 * the initial bundle for every user. Keep in sync with `getTotalLessons()`.
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
  localStorage.setItem(key, JSON.stringify(value));
}

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}

// ── Seed Data ──
function seedData(): void {
  // Use an explicit flag rather than inferring from an empty array. Inferring
  // meant a corrupt or quota-evicted `zl_backend_users` looked "unseeded", and
  // the next call would silently overwrite every real account with the demo
  // ones. It also meant deleting all users resurrected the demo admin.
  try {
    if (localStorage.getItem(LS_SEEDED) === 'v1') return;
  } catch {
    // localStorage unavailable — seeding in memory is the best we can do
  }

  const admin: User = {
    id: 'admin-1',
    email: 'admin@zerolines.com',
    name: 'System Admin',
    password: 'admin123',
    role: 'admin',
    location: 'andorra',
    createdAt: new Date().toISOString(),
  };

  const managerAndorra: User = {
    id: 'mgr-1',
    email: 'manager.andorra@zerolines.com',
    name: 'Carlos Rivera',
    password: 'manager1',
    role: 'manager',
    location: 'andorra',
    createdAt: new Date().toISOString(),
  };

  const managerGibraltar: User = {
    id: 'mgr-2',
    email: 'manager.gibraltar@zerolines.com',
    name: 'Sarah Johnson',
    password: 'manager2',
    role: 'manager',
    location: 'gibraltar',
    createdAt: new Date().toISOString(),
  };

  const employees: User[] = [
    { id: 'emp-1', email: 'maria@zerolines.com', name: 'Maria Garcia', password: 'emp1', role: 'employee', location: 'andorra', managerId: 'mgr-1', createdAt: '2026-04-15T10:00:00Z' },
    { id: 'emp-2', email: 'john@zerolines.com', name: 'John Smith', password: 'emp2', role: 'employee', location: 'gibraltar', managerId: 'mgr-2', createdAt: '2026-04-20T10:00:00Z' },
    { id: 'emp-3', email: 'sofia@zerolines.com', name: 'Sofia Martinez', password: 'emp3', role: 'employee', location: 'andorra', managerId: 'mgr-1', createdAt: '2026-03-10T10:00:00Z' },
    { id: 'emp-4', email: 'david@zerolines.com', name: 'David Lee', password: 'emp4', role: 'employee', location: 'gibraltar', managerId: 'mgr-2', createdAt: '2026-05-01T10:00:00Z' },
    { id: 'emp-5', email: 'emma@zerolines.com', name: 'Emma Wilson', password: 'emp5', role: 'employee', location: 'gibraltar', managerId: 'mgr-2', createdAt: '2026-04-25T10:00:00Z' },
    { id: 'emp-6', email: 'lucas@zerolines.com', name: 'Lucas Fernandez', password: 'emp6', role: 'employee', location: 'andorra', managerId: 'mgr-1', createdAt: '2026-03-20T10:00:00Z' },
  ];

  const allUsers = [admin, managerAndorra, managerGibraltar, ...employees];
  saveJSON(LS_USERS, allUsers);
  try {
    localStorage.setItem(LS_SEEDED, 'v1');
  } catch {
    // non-fatal
  }
}

// ── Auth ──
export interface LoginResult {
  success: boolean;
  user?: Omit<User, 'password'>;
  error?: string;
}

export async function login(email: string, password: string): Promise<LoginResult> {
  seedData();
  await simulateNetwork();

  const users = loadJSON<User[]>(LS_USERS, []);
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  const { password: _, ...safeUser } = user;
  saveJSON(LS_CURRENT_USER, safeUser);
  return { success: true, user: safeUser };
}

export interface SignupData {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  location: UserLocation;
  managerId?: string;
}

/** Creates the account record. Does NOT touch the current session. */
async function createUserRecord(data: SignupData): Promise<LoginResult> {
  seedData();
  await simulateNetwork();

  const users = loadJSON<User[]>(LS_USERS, []);

  const email = data.email.trim().toLowerCase();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    return { success: false, error: 'Email already registered' };
  }

  const newUser: User = {
    id: genId(),
    email,
    name: data.name,
    password: data.password,
    role: data.role,
    location: data.location,
    managerId: data.managerId,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveJSON(LS_USERS, users);

  const { password: _, ...safeUser } = newUser;
  return { success: true, user: safeUser };
}

/** Self-registration: creates the account AND signs that person in. */
export async function signup(data: SignupData): Promise<LoginResult> {
  const result = await createUserRecord(data);
  if (result.success && result.user) {
    saveJSON(LS_CURRENT_USER, result.user);
  }
  return result;
}

export function logout(): void {
  localStorage.removeItem(LS_CURRENT_USER);
}

/**
 * The session record, or null if there isn't a valid one.
 *
 * This used to blind-cast whatever was in localStorage to a full `User`. A
 * legacy writer stored a smaller shape under the same key, so after any page
 * refresh `user.id` and `user.email` were `undefined` while `isAuthenticated`
 * stayed true — which silently broke team lookups, progress records and admin
 * rights. Now an incomplete record is treated as no session at all.
 */
export function getCurrentUser(): Omit<User, 'password'> | null {
  const raw = loadJSON<Partial<User> | null>(LS_CURRENT_USER, null);
  if (!raw || typeof raw !== 'object') return null;
  if (!raw.id || !raw.email || !raw.role || !raw.location) {
    // Stale or truncated session — clear it so the user is asked to sign in
    // again rather than operating with a half-formed identity.
    try {
      localStorage.removeItem(LS_CURRENT_USER);
    } catch {
      // non-fatal
    }
    return null;
  }
  return raw as Omit<User, 'password'>;
}

// ── User Management ──
export async function getUsers(): Promise<Omit<User, 'password'>[]> {
  seedData();
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  return users.map(({ password, ...safe }) => safe);
}

/**
 * Employees reporting to a manager.
 *
 * Assigned reports only, plus any employee at the same shop who has no manager
 * yet. The previous `||` meant every manager at a location saw every employee
 * at that location — which is also what let a plain seller read the whole
 * roster by opening /manager directly.
 */
function resolveTeam(users: User[], manager: User): User[] {
  return users.filter(
    (u) =>
      u.role === 'employee' &&
      (u.managerId === manager.id || (!u.managerId && u.location === manager.location))
  );
}

export async function getMyTeam(managerId: string): Promise<Omit<User, 'password'>[]> {
  seedData();
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  const manager = users.find((u) => u.id === managerId);
  if (!manager) return [];
  return resolveTeam(users, manager).map(({ password, ...safe }) => safe);
}

export async function getEmployeesByLocation(location: UserLocation): Promise<Omit<User, 'password'>[]> {
  seedData();
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  return users
    .filter((u) => u.role === 'employee' && u.location === location)
    .map(({ password, ...safe }) => safe);
}

/**
 * Admin/manager provisioning a seller. Must NOT switch the current session —
 * this used to delegate to signup(), so an admin who added an employee was
 * silently logged in as that employee on their next page refresh.
 */
export async function createUser(data: SignupData): Promise<LoginResult> {
  return createUserRecord(data);
}

export interface DeleteResult {
  success: boolean;
  error?: string;
}

export async function deleteUser(userId: string): Promise<DeleteResult> {
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  const target = users.find((u) => u.id === userId);
  if (!target) return { success: false, error: 'User not found' };

  if (getCurrentUser()?.id === userId) {
    return { success: false, error: 'You cannot delete your own account' };
  }
  if (target.role === 'admin' && users.filter((u) => u.role === 'admin').length === 1) {
    return { success: false, error: 'Cannot delete the last admin account' };
  }

  saveJSON(
    LS_USERS,
    users.filter((u) => u.id !== userId)
  );
  return { success: true };
}

/**
 * Edit an existing account. `location` was previously not editable at all, so a
 * seller assigned to the wrong shop had to be deleted and recreated — and,
 * because location drives which currency they are taught, that meant quoting
 * the wrong money until someone noticed.
 */
export async function updateUser(
  userId: string,
  changes: Partial<Pick<User, 'name' | 'role' | 'location' | 'managerId'>>
): Promise<boolean> {
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return false;

  users[idx] = { ...users[idx], ...changes };
  saveJSON(LS_USERS, users);

  // Keep the live session in step if the edited user is the signed-in one.
  const current = getCurrentUser();
  if (current?.id === userId) {
    const { password: _, ...safe } = users[idx];
    saveJSON(LS_CURRENT_USER, safe);
  }
  return true;
}

export async function updateUserRole(userId: string, role: UserRole, managerId?: string): Promise<boolean> {
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) return false;
  users[idx].role = role;
  if (managerId !== undefined) users[idx].managerId = managerId;
  saveJSON(LS_USERS, users);
  return true;
}

// ── Progress ──
export async function getLessonProgress(userId: string): Promise<LessonProgress[]> {
  await simulateNetwork();
  const all = loadJSON<LessonProgress[]>(LS_PROGRESS, []);
  return all.filter((p) => p.userId === userId);
}

export async function completeLesson(userId: string, lessonId: string, score?: number): Promise<void> {
  await simulateNetwork();
  const all = loadJSON<LessonProgress[]>(LS_PROGRESS, []);
  const existing = all.find((p) => p.userId === userId && p.lessonId === lessonId);
  if (existing) {
    existing.completed = true;
    existing.completedAt = new Date().toISOString();
    if (score !== undefined) existing.score = score;
  } else {
    all.push({ userId, lessonId, completed: true, completedAt: new Date().toISOString(), score });
  }
  saveJSON(LS_PROGRESS, all);
}

// ── Quiz Results ──
export async function getQuizResults(userId: string): Promise<QuizResult[]> {
  await simulateNetwork();
  const all = loadJSON<QuizResult[]>(LS_QUIZZES, []);
  return all.filter((q) => q.userId === userId);
}

export async function saveQuizResult(result: QuizResult): Promise<void> {
  await simulateNetwork();
  const all = loadJSON<QuizResult[]>(LS_QUIZZES, []);
  all.push(result);
  saveJSON(LS_QUIZZES, all);
}

// ── Team Progress (for Manager Dashboard) ──
export interface EmployeeProgress {
  user: Omit<User, 'password'>;
  progress: number;
  streak: number;
  avgScore: number;
  lastActive: string;
  completedLessons: number;
  totalLessons: number;
}

export async function getTeamProgress(managerId: string): Promise<EmployeeProgress[]> {
  seedData();
  await simulateNetwork();

  const users = loadJSON<User[]>(LS_USERS, []);
  const allProgress = loadJSON<LessonProgress[]>(LS_PROGRESS, []);
  const allQuizzes = loadJSON<QuizResult[]>(LS_QUIZZES, []);

  const manager = users.find((u) => u.id === managerId);
  if (!manager) return [];

  const employees = resolveTeam(users, manager);

  const TOTAL_LESSONS = TOTAL_LESSON_COUNT;

  return employees.map((emp) => {
    const empProgress = allProgress.filter((p) => p.userId === emp.id && p.completed);
    const empQuizzes = allQuizzes.filter((q) => q.userId === emp.id);
    const completedLessons = empProgress.length;
    const progress = Math.round((completedLessons / TOTAL_LESSONS) * 100);
    const avgScore = empQuizzes.length > 0
      ? Math.round(empQuizzes.reduce((s, q) => s + q.score, 0) / empQuizzes.length)
      : 0;
    const lastActive = empProgress.length > 0
      ? empProgress.sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''))[0].completedAt || emp.createdAt
      : emp.createdAt;
    const streak = Math.min(30, Math.floor(progress / 10)); // simulated streak based on progress

    return {
      user: { id: emp.id, email: emp.email, name: emp.name, role: emp.role, location: emp.location, managerId: emp.managerId, createdAt: emp.createdAt },
      progress,
      streak,
      avgScore,
      lastActive,
      completedLessons,
      totalLessons: TOTAL_LESSONS,
    };
  });
}

// ── Stats ──
export async function getTeamStats(managerId: string): Promise<TeamStats> {
  const team = await getTeamProgress(managerId);
  if (team.length === 0) {
    return { totalEmployees: 0, avgCompletion: 0, topPerformer: '-', atRiskCount: 0 };
  }
  const avgCompletion = Math.round(team.reduce((s, e) => s + e.progress, 0) / team.length);
  const top = team.reduce((best, e) => (e.progress > best.progress ? e : best), team[0]);
  const atRiskCount = team.filter((e) => e.progress < 40).length;
  return {
    totalEmployees: team.length,
    avgCompletion,
    topPerformer: top.user.name.split(' ')[0],
    atRiskCount,
  };
}

// ── Simulation ──
function simulateNetwork(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
}
