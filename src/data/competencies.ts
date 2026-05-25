export type CompetencyId = 'approach' | 'product' | 'objections' | 'closing' | 'rapport' | 'upselling' | 'mindset';

export interface Competency {
  id: CompetencyId;
  name: string;
  nameEs: string;
  color: string; // hex color for this competency
}

export const COMPETENCIES: Competency[] = [
  { id: 'approach', name: 'Approach & Hook', nameEs: 'Enfoque y Gancho', color: '#0ABAB5' },
  { id: 'product', name: 'Product Knowledge', nameEs: 'Conocimiento de Producto', color: '#8B5CF6' },
  { id: 'objections', name: 'Objection Handling', nameEs: 'Manejo de Objeciones', color: '#F59E0B' },
  { id: 'closing', name: 'Closing Technique', nameEs: 'Técnica de Cierre', color: '#EF4444' },
  { id: 'rapport', name: 'Rapport Building', nameEs: 'Construcción de Confianza', color: '#10B981' },
  { id: 'upselling', name: 'Upselling', nameEs: 'Venta Adicional', color: '#EC4899' },
  { id: 'mindset', name: 'Mindset', nameEs: 'Mentalidad', color: '#06B6D4' },
];

// Score thresholds for proficiency levels
export const SCORE_LEVELS = {
  weak: { max: 30, label: 'Weak', labelEs: 'Débil', color: '#DC2626' },
  developing: { max: 55, label: 'Developing', labelEs: 'En Desarrollo', color: '#F59E0B' },
  strong: { max: 75, label: 'Strong', labelEs: 'Fuerte', color: '#10B981' },
  expert: { max: 100, label: 'Expert', labelEs: 'Experto', color: '#047857' },
} as const;

export type ProficiencyLevel = keyof typeof SCORE_LEVELS;

/**
 * Get the proficiency level for a given score
 */
export function getProficiencyLevel(score: number): ProficiencyLevel {
  if (score <= 30) return 'weak';
  if (score <= 55) return 'developing';
  if (score <= 75) return 'strong';
  return 'expert';
}

/**
 * Get the display info for a proficiency level
 */
export function getLevelInfo(level: ProficiencyLevel) {
  return SCORE_LEVELS[level];
}

/**
 * Get a competency by its ID
 */
export function getCompetencyById(id: CompetencyId): Competency | undefined {
  return COMPETENCIES.find((c) => c.id === id);
}

/**
 * Get the competency color at a given opacity (0-1)
 * Useful for heatmap cell backgrounds
 */
export function getCompetencyColorWithOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, opacity))})`;
}

/**
 * Get the competency color at intensity based on score (0-100)
 * Maps score to opacity: 0 -> 0.08, 100 -> 0.85
 */
export function getScoreColorIntensity(color: string, score: number): string {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const opacity = 0.08 + (normalizedScore / 100) * 0.77; // Range: 0.08 - 0.85
  return getCompetencyColorWithOpacity(color, opacity);
}

// Map lesson IDs to their primary competency
export const LESSON_COMPETENCIES: Record<string, CompetencyId> = {
  // Sales Psychology → mindset
  'psych-1': 'mindset',
  'psych-2': 'mindset',
  'psych-3': 'mindset',
  'psych-4': 'mindset',
  'psych-5': 'mindset',
  'psych-6': 'mindset',
  'psych-7': 'closing',
  'psych-8': 'closing',
  // Reading & Connecting → rapport
  'connect-1': 'rapport',
  'connect-2': 'rapport',
  'connect-3': 'rapport',
  'connect-4': 'rapport',
  'connect-5': 'rapport',
  'connect-6': 'rapport',
  'connect-7': 'rapport',
  'connect-8': 'rapport',
  // Art of Stopping → approach
  'stop-1': 'approach',
  'stop-2': 'approach',
  'stop-3': 'approach',
  'stop-4': 'approach',
  'stop-5': 'approach',
  'stop-6': 'approach',
  'stop-7': 'approach',
  'stop-8': 'approach',
  // Product Mastery → product
  'prod-1': 'product',
  'prod-2': 'product',
  'prod-3': 'product',
  'prod-4': 'product',
  'prod-5': 'product',
  'prod-6': 'product',
  'prod-7': 'upselling',
  'prod-8': 'upselling',
};

// Flashcard category → competency mapping
export const FLASHCARD_COMPETENCIES: Record<string, CompetencyId> = {
  'sales-psychology': 'mindset',
  'reading-connecting': 'rapport',
  'art-of-stopping': 'approach',
  'product-mastery': 'product',
};

// Quiz ID → competency mapping (for quizzes associated with lessons)
export const QUIZ_COMPETENCIES: Record<string, CompetencyId> = {
  ...LESSON_COMPETENCIES,
};

// Objection-specific lesson IDs
export const OBJECTION_LESSON_IDS: string[] = [
  'psych-7',
  'psych-8',
];

// Upselling-specific lesson IDs
export const UPSELLING_LESSON_IDS: string[] = [
  'prod-7',
  'prod-8',
];

// All lesson IDs grouped by competency
export function getLessonsByCompetency(competencyId: CompetencyId): string[] {
  return Object.entries(LESSON_COMPETENCIES)
    .filter(([, compId]) => compId === competencyId)
    .map(([lessonId]) => lessonId);
}

// All flashcard categories for a competency
export function getFlashcardCategoriesByCompetency(competencyId: CompetencyId): string[] {
  return Object.entries(FLASHCARD_COMPETENCIES)
    .filter(([, compId]) => compId === competencyId)
    .map(([category]) => category);
}
