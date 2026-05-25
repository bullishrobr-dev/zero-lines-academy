// ─────────────────────────────────────────────────────────────
// backend/mockBackend.ts — Complete mock backend API
// All data persisted to localStorage. Ready for Supabase swap.
// ─────────────────────────────────────────────────────────────

import type { User, UserRole, UserLocation, LessonProgress, QuizResult, TeamStats } from './types';

// ── Storage keys ──
const LS_USERS = 'zl_backend_users';
const LS_CURRENT_USER = 'zl_user'; // shared with useAuth hook
const LS_PROGRESS = 'zl_backend_progress';
const LS_QUIZZES = 'zl_backend_quiz_results';

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
  const existing = loadJSON<User[]>(LS_USERS, []);
  if (existing.length > 0) return; // already seeded

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

export async function signup(data: SignupData): Promise<LoginResult> {
  seedData();
  await simulateNetwork();

  const users = loadJSON<User[]>(LS_USERS, []);

  if (users.some((u) => u.email === data.email)) {
    return { success: false, error: 'Email already registered' };
  }

  const newUser: User = {
    id: genId(),
    email: data.email,
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
  saveJSON(LS_CURRENT_USER, safeUser);
  return { success: true, user: safeUser };
}

export function logout(): void {
  localStorage.removeItem(LS_CURRENT_USER);
}

export function getCurrentUser(): Omit<User, 'password'> | null {
  return loadJSON<Omit<User, 'password'> | null>(LS_CURRENT_USER, null);
}

// ── User Management ──
export async function getUsers(): Promise<Omit<User, 'password'>[]> {
  seedData();
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  return users.map(({ password, ...safe }) => safe);
}

export async function getMyTeam(managerId: string): Promise<Omit<User, 'password'>[]> {
  seedData();
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  return users
    .filter((u) => u.managerId === managerId || (u.role === 'employee' && u.location === getCurrentUser()?.location))
    .map(({ password, ...safe }) => safe);
}

export async function getEmployeesByLocation(location: UserLocation): Promise<Omit<User, 'password'>[]> {
  seedData();
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  return users
    .filter((u) => u.role === 'employee' && u.location === location)
    .map(({ password, ...safe }) => safe);
}

export async function createUser(data: SignupData): Promise<LoginResult> {
  return signup(data);
}

export async function deleteUser(userId: string): Promise<boolean> {
  await simulateNetwork();
  const users = loadJSON<User[]>(LS_USERS, []);
  const filtered = users.filter((u) => u.id !== userId);
  if (filtered.length === users.length) return false;
  saveJSON(LS_USERS, filtered);
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

  // Get employees under this manager or at same location
  const employees = users.filter(
    (u) => u.role === 'employee' && (u.managerId === managerId || u.location === manager.location)
  );

  const TOTAL_LESSONS = 31;

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
