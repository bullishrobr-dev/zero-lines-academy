// ─────────────────────────────────────────────────────────────
// backend/types.ts — Shared types for the backend system
// ─────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'manager' | 'employee';
export type UserLocation = 'andorra' | 'gibraltar';

export interface User {
  id: string;
  /**
   * What the person types to sign in. Replaced email: sellers on a shop floor
   * do not all have a work address, and a short username is far quicker to
   * type on a phone between customers.
   */
  username: string;
  name: string;
  role: UserRole;
  location: UserLocation;
  /** Username of their manager, if any. */
  managerUsername?: string;
  /**
   * True while the person is still on the password somebody else chose for
   * them. Set when an account is made and again after an admin resets it, and
   * cleared the moment they pick their own. The app will not let them past it.
   */
  mustChangePassword?: boolean;
  createdAt: string;
}

export interface LessonProgress {
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  score?: number;
}

export interface QuizResult {
  userId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: number[];
  completedAt: string;
}

export interface TeamStats {
  totalEmployees: number;
  avgCompletion: number;
  topPerformer: string;
  atRiskCount: number;
}
