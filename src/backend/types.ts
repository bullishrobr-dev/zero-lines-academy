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
