// ─────────────────────────────────────────────────────────────
// Zero Lines Academy — Lesson Data Structure
// All lesson content lives here as structured data.
// UI components render dynamically from this file.
// ─────────────────────────────────────────────────────────────

export type SectionType =
  | 'header'
  | 'subheader'
  | 'paragraph'
  | 'quote'
  | 'tip'
  | 'keypoint'
  | 'script'
  | 'checklist'
  | 'bullets'
  | 'numbered'
  | 'divider'
  | 'comparison';

export interface ContentSection {
  type: SectionType;
  text?: string;
  attribution?: string;
  items?: string[];
  left?: { label: string; text: string };
  right?: { label: string; text: string };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  duration: string; // e.g. "5 min"
  icon: string; // lucide-react icon name
  order: number;
  xpReward: number;
  sections: ContentSection[];
  quiz: QuizQuestion[];
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string; // lucide-react icon name
  accentColor: string; // hex color for category theming
  lessonOrder: string[]; // ordered lesson IDs
}

// ── Categories ──
export const categories: Category[] = [
  {
    id: 'psychology',
    title: 'Sales Psychology & Self-Mastery',
    subtitle: 'Master your mind, master the floor',
    description:
      'Everything starts with you. Your energy, your confidence, your mindset — that is what customers feel before you say a single word. These lessons are about becoming the kind of salesperson who walks in and owns the room.',
    icon: 'Brain',
    accentColor: '#0ABAB5',
    lessonOrder: [], // filled after lessons are defined
  },
  {
    id: 'connecting',
    title: 'Reading & Connecting with People',
    subtitle: 'See what others miss',
    description:
      'The best salespeople are master observers. They read people in seconds — their mood, their budget, their relationship dynamics — and they adapt instantly. These lessons give you the tools to connect with anyone who walks through your door.',
    icon: 'Users',
    accentColor: '#8B5CF6',
    lessonOrder: [],
  },
  {
    id: 'stopping',
    title: 'The Art of Stopping',
    subtitle: 'Turn strangers into demos',
    description:
      'Stopping is the hardest skill and the most important. No stop, no sale. These lessons give you a whole toolbox of approaches — different styles, different energies, different techniques — so you can find what works for YOUR personality.',
    icon: 'Hand',
    accentColor: '#F59E0B',
    lessonOrder: [],
  },
  {
    id: 'products',
    title: 'Product Mastery',
    subtitle: 'Know your weapons inside out',
    description:
      'Your products are incredible — but only if you know how to show them. Deep-dive into every product pitch, demo technique, price structure, and closing strategy. These are your money-makers.',
    icon: 'Sparkles',
    accentColor: '#0ABAB5',
    lessonOrder: [],
  },
];

// ── Placeholder — will be populated by content agent ──
export const lessons: Record<string, Lesson> = {};

// ── Helper functions ──
export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getLessonsForCategory(categoryId: string): Lesson[] {
  const cat = getCategory(categoryId);
  if (!cat) return [];
  return cat.lessonOrder
    .map((id) => lessons[id])
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
}

export function getLesson(id: string): Lesson | undefined {
  return lessons[id];
}

export function getNextLesson(lessonId: string): Lesson | undefined {
  const lesson = lessons[lessonId];
  if (!lesson) return undefined;
  const catLessons = getLessonsForCategory(lesson.categoryId);
  const idx = catLessons.findIndex((l) => l.id === lessonId);
  return catLessons[idx + 1];
}

export function getTotalLessons(): number {
  return Object.keys(lessons).length;
}
