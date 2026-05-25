import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  COMPETENCIES,
  getProficiencyLevel,
  getLessonsByCompetency,
  getFlashcardCategoriesByCompetency,
} from '../data/competencies';
import type { CompetencyId, ProficiencyLevel } from '../data/competencies';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CompetencyScore {
  score: number;
  level: ProficiencyLevel;
  lessonCompletion: number;
  quizAccuracy: number;
  flashcardMastery: number;
}

export type CompetencyScores = Record<CompetencyId, CompetencyScore>;

export interface EmployeeScores {
  employeeId: string;
  employeeName: string;
  scores: CompetencyScores;
  overallAverage: number;
}

// Raw data types from localStorage
interface LessonProgress {
  [lessonId: string]: {
    completed: boolean;
    completedAt?: string;
  };
}

interface QuizResult {
  quizId: string;
  score: number; // 0-100
  completedAt: string;
}

interface QuizResults {
  [quizId: string]: QuizResult[];
}

interface FlashcardState {
  [cardId: string]: {
    difficulty: 'hard' | 'medium' | 'easy';
    category: string;
  };
}

// Weights for overall score calculation
const WEIGHTS = {
  lessons: 0.4,
  quizzes: 0.3,
  flashcards: 0.3,
};

// ─── localStorage Helpers ─────────────────────────────────────────────────────

const STORAGE_KEYS = {
  lessonProgress: 'zl_lesson_progress',
  quizResults: 'zl_quiz_results',
  flashcardState: 'zl_flashcard_state',
} as const;

function getLessonProgress(): LessonProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.lessonProgress);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getQuizResults(): QuizResults {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.quizResults);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function getFlashcardState(): FlashcardState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.flashcardState);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ─── Score Calculation ────────────────────────────────────────────────────────

/**
 * Calculate lesson completion % for a competency
 */
function calcLessonCompletion(competencyId: CompetencyId, progress: LessonProgress): number {
  const lessons = getLessonsByCompetency(competencyId);
  if (lessons.length === 0) return 0;

  const completed = lessons.filter((id) => progress[id]?.completed).length;
  return Math.round((completed / lessons.length) * 100);
}

/**
 * Calculate quiz accuracy for a competency (average of best scores)
 */
function calcQuizAccuracy(competencyId: CompetencyId, results: QuizResults): number {
  const lessons = getLessonsByCompetency(competencyId);
  if (lessons.length === 0) return 0;

  let totalScore = 0;
  let quizCount = 0;

  for (const lessonId of lessons) {
    const quizzes = results[lessonId];
    if (quizzes && quizzes.length > 0) {
      // Use the best score for this quiz
      const bestScore = Math.max(...quizzes.map((q) => q.score));
      totalScore += bestScore;
      quizCount++;
    }
  }

  if (quizCount === 0) return 0;
  return Math.round(totalScore / quizCount);
}

/**
 * Calculate flashcard mastery % for a competency
 * Counts cards at 'easy' difficulty as mastered
 */
function calcFlashcardMastery(competencyId: CompetencyId, state: FlashcardState): number {
  const categories = getFlashcardCategoriesByCompetency(competencyId);
  if (categories.length === 0) return 0;

  const allCards = Object.entries(state);
  let competencyCards = 0;
  let masteredCards = 0;

  for (const [, cardData] of allCards) {
    if (categories.includes(cardData.category)) {
      competencyCards++;
      if (cardData.difficulty === 'easy') {
        masteredCards++;
      }
    }
  }

  if (competencyCards === 0) return 0;
  return Math.round((masteredCards / competencyCards) * 100);
}

/**
 * Calculate overall score for a single competency using weighted average
 */
function calcCompetencyScore(
  competencyId: CompetencyId,
  progress: LessonProgress,
  results: QuizResults,
  flashcards: FlashcardState
): CompetencyScore {
  const lessonCompletion = calcLessonCompletion(competencyId, progress);
  const quizAccuracy = calcQuizAccuracy(competencyId, results);
  const flashcardMastery = calcFlashcardMastery(competencyId, flashcards);

  const score = Math.round(
    lessonCompletion * WEIGHTS.lessons +
      quizAccuracy * WEIGHTS.quizzes +
      flashcardMastery * WEIGHTS.flashcards
  );

  return {
    score: Math.min(100, Math.max(0, score)),
    level: getProficiencyLevel(score),
    lessonCompletion,
    quizAccuracy,
    flashcardMastery,
  };
}

/**
 * Calculate scores for all competencies
 */
export function calculateCompetencyScores(
  progress?: LessonProgress,
  results?: QuizResults,
  flashcards?: FlashcardState
): CompetencyScores {
  const p = progress ?? getLessonProgress();
  const r = results ?? getQuizResults();
  const f = flashcards ?? getFlashcardState();

  const scores = {} as CompetencyScores;

  for (const competency of COMPETENCIES) {
    scores[competency.id] = calcCompetencyScore(competency.id, p, r, f);
  }

  return scores;
}

/**
 * Calculate overall average across all competencies
 */
export function calculateOverallAverage(scores: CompetencyScores): number {
  const values = Object.values(scores);
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, s) => acc + s.score, 0);
  return Math.round(sum / values.length);
}

// ─── React Hook ───────────────────────────────────────────────────────────────

interface UseCompetenciesOptions {
  /** If provided, uses mock data instead of localStorage */
  mockData?: {
    progress?: LessonProgress;
    results?: QuizResults;
    flashcards?: FlashcardState;
  };
}

export function useCompetencies(options?: UseCompetenciesOptions) {
  const [scores, setScores] = useState<CompetencyScores>(() => {
    if (options?.mockData) {
      return calculateCompetencyScores(
        options.mockData.progress,
        options.mockData.results,
        options.mockData.flashcards
      );
    }
    return calculateCompetencyScores();
  });

  const [isLoading, setIsLoading] = useState(!options?.mockData);

  // Load and recalculate scores from localStorage
  const refreshScores = useCallback(() => {
    if (options?.mockData) return;
    setIsLoading(true);

    // Use setTimeout to avoid blocking UI
    const timer = setTimeout(() => {
      const newScores = calculateCompetencyScores();
      setScores(newScores);
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [options?.mockData]);

  // Listen for storage changes from other tabs/components
  useEffect(() => {
    if (options?.mockData) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === STORAGE_KEYS.lessonProgress ||
        e.key === STORAGE_KEYS.quizResults ||
        e.key === STORAGE_KEYS.flashcardState
      ) {
        refreshScores();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Initial load
    refreshScores();

    return () => window.removeEventListener('storage', handleStorageChange);
  }, [options?.mockData, refreshScores]);

  // Overall average
  const overallAverage = useMemo(() => calculateOverallAverage(scores), [scores]);

  // Strongest competency
  const strongestCompetency = useMemo(() => {
    let maxScore = -1;
    let strongestId: CompetencyId | null = null;

    for (const competency of COMPETENCIES) {
      const s = scores[competency.id]?.score ?? 0;
      if (s > maxScore) {
        maxScore = s;
        strongestId = competency.id;
      }
    }

    return strongestId ? { id: strongestId, score: maxScore } : null;
  }, [scores]);

  // Weakest competency
  const weakestCompetency = useMemo(() => {
    let minScore = 101;
    let weakestId: CompetencyId | null = null;

    for (const competency of COMPETENCIES) {
      const s = scores[competency.id]?.score ?? 0;
      if (s < minScore) {
        minScore = s;
        weakestId = competency.id;
      }
    }

    return weakestId ? { id: weakestId, score: minScore } : null;
  }, [scores]);

  return {
    scores,
    isLoading,
    overallAverage,
    strongestCompetency,
    weakestCompetency,
    refreshScores,
  };
}

// ─── Multi-Employee (Team) Hook ───────────────────────────────────────────────

export function useTeamCompetencies(employees: Array<{ id: string; name: string }>) {
  const [employeeScores, setEmployeeScores] = useState<EmployeeScores[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, simulate with localStorage per employee or use default values
    const results: EmployeeScores[] = employees.map((emp) => {
      const scores = calculateCompetencyScores();
      return {
        employeeId: emp.id,
        employeeName: emp.name,
        scores,
        overallAverage: calculateOverallAverage(scores),
      };
    });

    setEmployeeScores(results);
  }, [employees]);

  // Calculate team average per competency
  const teamAverages = useMemo(() => {
    const avgScores = {} as CompetencyScores;

    for (const comp of COMPETENCIES) {
      const compScores = employeeScores.map((es) => es.scores[comp.id]?.score ?? 0);
      const avg = compScores.length > 0
        ? Math.round(compScores.reduce((a, b) => a + b, 0) / compScores.length)
        : 0;

      avgScores[comp.id] = {
        score: avg,
        level: getProficiencyLevel(avg),
        lessonCompletion: 0, // Not meaningful for team avg
        quizAccuracy: 0,
        flashcardMastery: 0,
      };
    }

    return avgScores;
  }, [employeeScores]);

  // Team overall average
  const teamOverallAverage = useMemo(
    () => calculateOverallAverage(teamAverages),
    [teamAverages]
  );

  // Count employees with data per competency
  const employeeCounts = useMemo(() => {
    const counts: Record<CompetencyId, number> = {} as Record<CompetencyId, number>;

    for (const comp of COMPETENCIES) {
      counts[comp.id] = employeeScores.filter(
        (es) => (es.scores[comp.id]?.score ?? 0) > 0
      ).length;
    }

    return counts;
  }, [employeeScores]);

  // Team strongest/weakest
  const teamStrongest = useMemo(() => {
    let maxScore = -1;
    let id: CompetencyId | null = null;
    for (const comp of COMPETENCIES) {
      const s = teamAverages[comp.id]?.score ?? 0;
      if (s > maxScore) {
        maxScore = s;
        id = comp.id;
      }
    }
    return id ? { id, score: maxScore } : null;
  }, [teamAverages]);

  const teamWeakest = useMemo(() => {
    let minScore = 101;
    let id: CompetencyId | null = null;
    for (const comp of COMPETENCIES) {
      const s = teamAverages[comp.id]?.score ?? 0;
      if (s < minScore) {
        minScore = s;
        id = comp.id;
      }
    }
    return id ? { id, score: minScore } : null;
  }, [teamAverages]);

  return {
    employeeScores,
    teamAverages,
    teamOverallAverage,
    employeeCounts,
    totalEmployees: employees.length,
    teamStrongest,
    teamWeakest,
  };
}

// ─── Standalone utility for server/non-React usage ───────────────────────────

export { getLessonsByCompetency, getFlashcardCategoriesByCompetency, WEIGHTS };
