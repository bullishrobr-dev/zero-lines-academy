// ─────────────────────────────────────────────────────────────
// CategoryHub.tsx — one learning path, its product deep-dives and its lessons
//
// Mirrors TrainingHub's hue map so a path keeps its identity when you open it.
//
// Line 209 used to read `(category as any).descriptionEs` — a cast for a field
// that does not exist on Category at all, so it silently always served English
// prose to Spanish sellers while telling the compiler everything was fine. The
// hero now uses `subtitle`/`subtitleEs`, which is translated for every category.
// ─────────────────────────────────────────────────────────────

import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Users,
  Hand,
  Sparkles,
  Check,
  ChevronRight,
  ArrowLeft,
  Eye,
  Droplets,
  Waves,
  Scissors,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { createElement, useMemo } from 'react';
import { categories, getLessonsForCategory, type Category } from '../data/lessons';
import { useLanguage } from '../contexts/LanguageContext';
import { LESSON_TIERS, TIER_NAMES } from '../data/lessonTiers';

const iconMap: Record<string, LucideIcon> = { Brain, Users, Hand, Sparkles };

/** The icon is data-driven, so it is resolved and instantiated in one step —
 *  binding it to a capitalised local first would be a component created during
 *  render, which resets its state on every pass. */
function renderIcon(name: string, props: { size: number; className: string }) {
  return createElement(iconMap[name] || Sparkles, { ...props, 'aria-hidden': true });
}

function getProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem('zl_lesson_progress') || '{}');
  } catch {
    return {};
  }
}

/**
 * `Category` carries a long English `description` with no `descriptionEs`, so
 * Spanish speakers were served English prose behind an `as any` cast that
 * claimed otherwise. The short `subtitle` IS translated for every category, so
 * the hero uses that in both languages — same information density, no cast, and
 * a page that opens on the lessons rather than on five lines of intro copy.
 */
function categoryTagline(category: Category, isEs: boolean): string {
  if (isEs) return category.subtitleEs ?? category.subtitle;
  return category.subtitle;
}

type Hue = 'teal' | 'violet' | 'coral' | 'gold';

/* Same assignment as TrainingHub — four paths, four worlds. */
const CATEGORY_HUE: Record<string, Hue> = {
  psychology: 'teal',
  connecting: 'violet',
  stopping: 'coral',
  products: 'gold',
};

const HUE: Record<
  Hue,
  { wash: string; chip: string; ink: string; bar: string; fill: string; onFill: string }
> = {
  teal: {
    wash: 'hero-day',
    chip: 'bg-teal-tint',
    ink: 'text-teal-strong',
    bar: 'bg-teal',
    fill: 'bg-teal',
    onFill: 'text-on-teal',
  },
  violet: {
    wash: 'hero-dusk',
    chip: 'bg-violet-tint',
    ink: 'text-violet-strong',
    bar: 'bg-violet',
    fill: 'bg-violet',
    onFill: 'text-on-teal',
  },
  coral: {
    wash: 'hero-dawn',
    chip: 'bg-coral-tint',
    ink: 'text-coral-strong',
    bar: 'bg-coral',
    fill: 'bg-coral',
    onFill: 'text-on-coral',
  },
  gold: {
    wash: 'hero-dawn',
    chip: 'bg-gold-tint',
    ink: 'text-gold-strong',
    bar: 'bg-gold',
    fill: 'bg-gold',
    onFill: 'text-on-gold',
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

/* ─── Product deep-dives ─── */

interface ProductSubcategory {
  id: string;
  title: string;
  titleEs: string;
  badge?: string;
  badgeEs?: string;
  description: string;
  descriptionEs: string;
  icon: LucideIcon;
  route: string;
  hue: Hue;
}

const productSubcategories: ProductSubcategory[] = [
  {
    id: 'syringe',
    title: 'The Syringe',
    titleEs: 'La Jeringa',
    badge: 'FLAGSHIP',
    badgeEs: 'ESTRELLA',
    description: 'Natural Botox alternative — instant results',
    descriptionEs: 'Alternativa natural al bótox — resultados al instante',
    icon: Eye,
    route: '/syringe',
    hue: 'teal',
  },
  {
    id: 'peeling',
    title: 'The Peeling',
    titleEs: 'El Peeling',
    description: 'Weekly treatment — one year of glowing skin',
    descriptionEs: 'Tratamiento semanal — un año de piel radiante',
    icon: Droplets,
    route: '/peeling',
    hue: 'violet',
  },
  {
    id: 'scrub',
    title: 'Dead Sea Scrub & Body Butter',
    titleEs: 'Exfoliante del Mar Muerto y Manteca',
    description: 'Sensory duo — feel the difference',
    descriptionEs: 'Dúo sensorial — nota la diferencia',
    icon: Waves,
    route: '/scrub',
    hue: 'gold',
  },
  {
    id: 'nail-kit',
    title: 'Nail Kit',
    titleEs: 'Kit de Uñas',
    description: '60-second shine — lifetime warranty',
    descriptionEs: 'Brillo en 60 segundos — garantía de por vida',
    icon: Scissors,
    route: '/nail-kit',
    hue: 'coral',
  },
];

function ProductSubcategoryCard({
  sub,
  index,
  isEs,
}: {
  sub: ProductSubcategory;
  index: number;
  isEs: boolean;
}) {
  const navigate = useNavigate();
  const Icon = sub.icon;
  const hue = HUE[sub.hue];

  return (
    <motion.button
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(sub.route)}
      className="surface-raised flex w-full items-start gap-4 p-4 text-left"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-chip ${hue.chip}`}>
        <Icon size={24} className={hue.ink} aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="mb-1 flex flex-wrap items-center gap-2">
          <span className="text-h4 text-ink">{isEs ? sub.titleEs : sub.title}</span>
          {sub.badge && (
            <span className={`rounded-full px-2 py-0.5 text-overline ${hue.chip} ${hue.ink}`}>
              {isEs ? sub.badgeEs ?? sub.badge : sub.badge}
            </span>
          )}
        </span>
        <span className="block text-caption text-ink-2">
          {isEs ? sub.descriptionEs : sub.description}
        </span>
        <span className={`mt-2 flex items-center gap-1 text-caption font-bold ${hue.ink}`}>
          {isEs ? 'Ver el pitch' : 'Learn the pitch'}
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </span>
    </motion.button>
  );
}

/* ─── Main component ─── */

export default function CategoryHub() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const category = useMemo(() => categories.find((c) => c.id === id), [id]);
  const lessons = useMemo(() => (id ? getLessonsForCategory(id) : []), [id]);
  const progress = useMemo(() => getProgress(), []);

  if (!category) {
    navigate('/home', { replace: true });
    return null;
  }

  const completedCount = lessons.filter((l) => progress[l.id]).length;
  const completionPct =
    lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const isProductsCategory = id === 'products';
  const hue = HUE[CATEGORY_HUE[category.id] ?? 'teal'];

  return (
    <div className="min-h-full">
      {/* ── Hero ── */}
      <header className={`${hue.wash} rounded-b-feature border-b border-line px-5 pb-6 pt-7`}>
        <button
          onClick={() => navigate('/training')}
          className="mb-4 flex min-h-touch items-center gap-1.5 text-body-small text-ink-2"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          {t('categoryBack')}
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <span className={`mb-4 flex h-14 w-14 items-center justify-center rounded-feature ${hue.chip}`}>
            {renderIcon(category.icon, { size: 28, className: hue.ink })}
          </span>
          <h1 className="text-h1 text-ink">
            {isEs && category.titleEs ? category.titleEs : category.title}
          </h1>
          <p className="mt-2 text-body text-ink-2">{categoryTagline(category, isEs)}</p>
        </motion.div>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-caption text-ink-2">{t('categoryProgress')}</span>
            <span className={`text-caption font-bold tabular-nums ${hue.ink}`}>{completionPct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <motion.div
              className={`h-full rounded-full ${hue.bar}`}
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            />
          </div>
          <p className="mt-2 text-caption text-ink-3">
            {completedCount} {isEs ? 'de' : 'of'} {lessons.length} {t('categoryLessonsCompleted')}
          </p>
        </div>
      </header>

      {/* ── Product deep-dives (products path only) ── */}
      {isProductsCategory && (
        <section className="px-5 pt-7">
          <h2 className="mb-3 text-h3 text-ink">
            {isEs ? 'Inmersiones de producto' : 'Product deep dives'}
          </h2>
          <div className="space-y-3">
            {productSubcategories.map((sub, index) => (
              <ProductSubcategoryCard key={sub.id} sub={sub} index={index} isEs={isEs} />
            ))}
          </div>
        </section>
      )}

      {/* ── Lessons ── */}
      <section className="px-5 pt-7">
        <h2 className="mb-3 text-h3 text-ink">{t('lessons')}</h2>
        <div className="space-y-3">
          {lessons.length === 0 && (
            <p className="surface-flat p-6 text-center text-body-small text-ink-2">
              {t('categoryNoLessons')}
            </p>
          )}
          {lessons.map((lesson, index) => {
            const isCompleted = progress[lesson.id];
            const tierNum = LESSON_TIERS[lesson.id] || 1;
            const tierName = TIER_NAMES[tierNum]?.[isEs ? 'es' : 'en'] || `Tier ${tierNum}`;

            return (
              <motion.button
                key={lesson.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                className="surface-flat flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-chip ${hue.chip}`}
                >
                  {renderIcon(lesson.icon, { size: 20, className: hue.ink })}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-h4 text-ink">
                    {isEs && lesson.titleEs ? lesson.titleEs : lesson.title}
                  </span>
                  <span className="mt-0.5 line-clamp-2 text-caption text-ink-2">
                    {isEs && lesson.subtitleEs ? lesson.subtitleEs : lesson.subtitle}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-caption font-semibold ${hue.chip} ${hue.ink}`}
                      title={tierName}
                    >
                      {isEs ? 'Nivel' : 'Tier'} {tierNum}
                    </span>
                    <span className="rounded-full bg-surface-sunken px-2.5 py-0.5 text-caption text-ink-2">
                      {lesson.duration}
                    </span>
                    <span className="text-caption font-semibold text-ink-2">
                      +{lesson.xpReward} XP
                    </span>
                  </span>
                </span>

                <span className="shrink-0">
                  {isCompleted ? (
                    <span
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full ${hue.fill} ${hue.onFill}`}
                    >
                      <Check size={18} strokeWidth={3} aria-hidden="true" />
                      <span className="sr-only">{t('completed')}</span>
                    </span>
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-line-strong text-ink-2">
                      <ChevronRight size={16} aria-hidden="true" />
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
