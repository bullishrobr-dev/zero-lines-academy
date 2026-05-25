// ─────────────────────────────────────────────────────────────
// backend/types.ts — Shared types for the backend system
// ─────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'manager' | 'employee';
export type UserLocation = 'andorra' | 'gibraltar';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // plain text for mock — real app would hash
  role: UserRole;
  location: UserLocation;
  managerId?: string;
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
