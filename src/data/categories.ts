// ─────────────────────────────────────────────────────────────
// categories.ts — the six tracks, and nothing else.
//
// These used to live at the top of lessons.ts. That file is 6,884 lines: every
// lesson body, every quiz, plus the scenario, objection and closing sets it
// pulls in — 741 KB in the built bundle. Anything that wanted a category name
// or a lesson count had to download all of it, and `useProgress` wants exactly
// that, on every screen in the app.
//
// So the small, universally-wanted things live here, where they cost a few KB
// instead of most of a megabyte. lessons.ts re-exports them, so nothing that
// already imports `categories` or `Category` from there has to change.
// ─────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  title: string;
  titleEs?: string;
  subtitle: string;
  subtitleEs?: string;
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
    titleEs: 'Psicología de Ventas y Auto-Dominio',
    subtitle: 'Master your mind, master the floor',
    subtitleEs: 'Domina tu mente, domina el piso',
    description:
      'Everything starts with you. Your energy, your confidence, your mindset — that is what customers feel before you say a single word. These lessons are about becoming the kind of salesperson who walks in and owns the room.',
    icon: 'Brain',
    accentColor: '#0ABAB5',
    lessonOrder: ['psych-1', 'psych-2', 'psych-3', 'psych-4', 'psych-5', 'psych-6', 'psych-7', 'psych-8'],
  },
  {
    id: 'connecting',
    title: 'Reading & Connecting with People',
    titleEs: 'Lectura y Conexión con la Gente',
    subtitle: 'See what others miss',
    subtitleEs: 'Ve lo que otros no ven',
    description:
      'The best salespeople are master observers. They read people in seconds — their mood, their budget, their relationship dynamics — and they adapt instantly. These lessons give you the tools to connect with anyone who walks through your door.',
    icon: 'Users',
    accentColor: '#8B5CF6',
    lessonOrder: ['connect-1', 'connect-2', 'connect-3', 'connect-4', 'connect-5', 'connect-6', 'connect-7', 'connect-8'],
  },
  {
    id: 'stopping',
    title: 'The Art of Stopping',
    titleEs: 'El Arte de Parar',
    subtitle: 'Turn strangers into demos',
    subtitleEs: 'Convierte desconocidos en demos',
    description:
      'Stopping is the hardest skill and the most important. No stop, no sale. These lessons give you a whole toolbox of approaches — different styles, different energies, different techniques — so you can find what works for YOUR personality.',
    icon: 'Hand',
    accentColor: '#F59E0B',
    lessonOrder: ['stop-1', 'stop-2', 'stop-3', 'stop-4', 'stop-5', 'stop-6', 'stop-7'],
  },
  {
    // The sale itself. Seven lessons taught stopping someone and eight taught
    // the products, and between them was a hole where the money actually
    // changes hands. Authored from the owner's own method, in his words.
    id: 'closing',
    title: 'Bring, Close, Collect',
    titleEs: 'Meter, Cerrar, Cobrar',
    subtitle: 'From hello to paid',
    subtitleEs: 'Del hola al pago',
    description:
      'You stopped them. Now what? These are the five metres from the pavement to the chair, the moment you ask for the money, and the ninety seconds between yes and paid. This is where sales are won and lost after all the hard work is already done.',
    icon: 'DoorOpen',
    accentColor: '#FF6B6B',
    lessonOrder: ['close-market', 'close-1', 'close-2', 'close-3'],
  },
  {
    id: 'products',
    title: 'Product Mastery',
    titleEs: 'Dominio del Producto',
    subtitle: 'Know your weapons inside out',
    subtitleEs: 'Conoce tus armas a fondo',
    description:
      'Your products are incredible — but only if you know how to show them. Deep-dive into every product pitch, demo technique, price structure, and closing strategy. These are your money-makers.',
    icon: 'Sparkles',
    accentColor: '#0ABAB5',
    lessonOrder: ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6', 'prod-7', 'prod-8'],
  },

  // ── The practice shelves ──
  // The four paths above own the four brand accents (teal / violet / coral /
  // gold — see the hue maps in TrainingHub and CategoryHub). These two are not
  // a fifth and sixth path: they are reference material a seller dips into
  // mid-shift, so they take the design system's SEMANTIC tokens instead of a
  // brand hue. `--warning` (#A16207) and `--success` (#15803D) are real tokens
  // with light, dark and tint values already defined in src/index.css, they are
  // both AA on `--surface`, and neither is claimed by a learning path. Nothing
  // renders `accentColor` today; these values are the tokens to reach for when
  // something does.
  {
    id: 'scenarios',
    title: 'Street Scenarios',
    titleEs: 'Situaciones de Calle',
    subtitle: 'When it goes sideways, you already know what to do',
    subtitleEs: 'Cuando se tuerce, ya sabes qué hacer',
    description:
      'The drunk customer, the demo that fails in front of a crowd, the competitor who walks into your pitch, the toddler mid-tantrum. Every one of these will happen to you. These are the drills — read the situation, the moves, the words, and the mistakes that cost the sale — so the first time it happens is not the first time you have thought about it.',
    icon: 'Drama',
    accentColor: '#A16207',
    lessonOrder: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10'],
  },
  {
    id: 'objections',
    title: 'Objection Handling',
    titleEs: 'Manejo de Objeciones',
    subtitle: 'Every "no" has a door in it',
    subtitleEs: 'Todo "no" tiene una puerta',
    description:
      '"I am on a budget." "Let me think about it." "I can get it cheaper on Amazon." These ten lines account for almost every lost sale on the street — and none of them mean no. Each lesson gives you the psychology underneath the objection, three scripts at three lengths, and the responses that kill the sale outright.',
    icon: 'ShieldQuestion',
    accentColor: '#15803D',
    lessonOrder: ['O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10'],
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
