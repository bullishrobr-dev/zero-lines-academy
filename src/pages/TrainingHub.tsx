// ─────────────────────────────────────────────────────────────
// TrainingHub.tsx — the four learning paths
//
// Two of the four categories used to share the same teal, so half the page was
// one colour and the paths read as a list rather than four different worlds.
// Each now owns a hue (teal / violet / coral / gold) and its own tinted
// feature surface.
//
// The tier rail was `w-28` chips carrying 9-10px labels and a 🔒 emoji — the
// smallest, least readable thing on the screen. Rebuilt at legible sizes with a
// real lucide Lock. It also used `scrollbar-hide`, a class this project does
// not define; the real one is `no-scrollbar`.
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Users, Hand, Sparkles, ChevronLeft, Lock, ArrowRight, type LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { categories, getLessonsForCategory } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../contexts/LanguageContext';
import type { TranslationKey } from '../data/translations';
import { TIER_NAMES, getTierCompletion, isTierUnlocked } from '../data/lessonTiers';

/* ─── Helpers ─── */

const iconMap: Record<string, LucideIcon> = { Brain, Users, Hand, Sparkles };

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

type Hue = 'teal' | 'violet' | 'coral' | 'gold';

/* One hue per category — see also CategoryHub, which mirrors this map. */
const categoryMeta: Record<
  string,
  { titleKey: TranslationKey; descKey: TranslationKey; hue: Hue }
> = {
  psychology: {
    titleKey: 'trainingSalesPsychology',
    descKey: 'trainingSalesPsychologyDesc',
    hue: 'teal',
  },
  connecting: {
    titleKey: 'trainingReadingConnecting',
    descKey: 'trainingReadingConnectingDesc',
    hue: 'violet',
  },
  stopping: {
    titleKey: 'trainingArtOfStopping',
    descKey: 'trainingArtOfStoppingDesc',
    hue: 'coral',
  },
  products: {
    titleKey: 'trainingProductMastery',
    descKey: 'trainingProductMasteryDesc',
    hue: 'gold',
  },
};

const HUE: Record<Hue, { surface: string; chip: string; ink: string; bar: string }> = {
  teal: { surface: '', chip: 'bg-teal-tint', ink: 'text-teal-strong', bar: 'bg-teal' },
  violet: {
    surface: 'feature-violet',
    chip: 'bg-violet-tint',
    ink: 'text-violet-strong',
    bar: 'bg-violet',
  },
  coral: {
    surface: 'feature-coral',
    chip: 'bg-coral-tint',
    ink: 'text-coral-strong',
    bar: 'bg-coral',
  },
  gold: { surface: 'feature-gold', chip: 'bg-gold-tint', ink: 'text-gold-strong', bar: 'bg-gold' },
};

/* ─── Animations ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─── Main component ─── */

export default function TrainingHub() {
  const navigate = useNavigate();
  const progress = useProgress();
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const lessonProgress = progress.lessonProgress;

  const categoryData = useMemo(() => {
    return categories.map((cat) => {
      const catLessons = getLessonsForCategory(cat.id);
      const catCompleted = catLessons.filter((l) => lessonProgress[l.id]).length;
      const catPct =
        catLessons.length > 0 ? Math.round((catCompleted / catLessons.length) * 100) : 0;
      return { ...cat, catLessons: catLessons.length, catCompleted, catPct, meta: categoryMeta[cat.id] };
    });
  }, [lessonProgress]);

  const tierData = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((tierNum) => ({
      tier: tierNum,
      name: TIER_NAMES[tierNum]?.[isEs ? 'es' : 'en'] || `Tier ${tierNum}`,
      completion: getTierCompletion(tierNum, lessonProgress),
      unlocked: isTierUnlocked(tierNum, lessonProgress),
    }));
  }, [lessonProgress, isEs]);

  return (
    <div className="min-h-full">
      {/* ── Header ── */}
      <header className="hero-day rounded-b-feature border-b border-line px-5 pb-6 pt-7">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/home')}
            className="btn-icon shrink-0 bg-surface"
            aria-label={t('categoryBack')}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </motion.button>
          <div className="min-w-0">
            <h1 className="text-h1 text-ink">{t('trainingTitle')}</h1>
            <p className="text-body-small text-ink-2">{t('trainingSubtitle')}</p>
          </div>
        </div>

        {/* ── Tier rail ── */}
        <div className="mt-6">
          <p className="mb-3 text-overline text-ink-2">
            {isEs ? 'Progreso por nivel' : 'Tier progress'}
          </p>
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
            {tierData.map((tier) => (
              <li
                key={tier.tier}
                className={`flex w-[168px] flex-shrink-0 snap-start flex-col rounded-card border p-3.5 ${
                  tier.unlocked
                    ? tier.completion >= 80
                      ? 'border-teal/40 bg-teal-tint'
                      : 'border-line bg-surface'
                    : 'border-line bg-surface-sunken'
                }`}
              >
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span
                    className={`text-overline ${tier.unlocked ? 'text-teal-strong' : 'text-ink-3'}`}
                  >
                    {isEs ? 'Nivel' : 'Tier'} {tier.tier}
                  </span>
                  {tier.unlocked ? (
                    <span className="text-caption font-bold tabular-nums text-ink-2">
                      {tier.completion}%
                    </span>
                  ) : (
                    <>
                      <Lock size={15} className="text-ink-3" aria-hidden="true" />
                      <span className="sr-only">{t('statusLocked')}</span>
                    </>
                  )}
                </div>
                <p
                  className={`mb-3 line-clamp-2 min-h-[40px] text-body-small font-semibold ${
                    tier.unlocked ? 'text-ink' : 'text-ink-3'
                  }`}
                >
                  {tier.name}
                </p>
                <div className="mt-auto h-2 overflow-hidden rounded-full bg-line">
                  <div
                    className={`h-full rounded-full transition-all ${
                      tier.unlocked ? 'bg-teal' : 'bg-line-strong'
                    }`}
                    style={{ width: `${tier.completion}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* ── Category cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 px-5 pt-7"
      >
        {categoryData.map((cat, i) => {
          const CatIcon = getIcon(cat.icon);
          const hue = HUE[cat.meta?.hue ?? 'teal'];
          return (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/category/${cat.id}`)}
              className={`surface-feature ${hue.surface} flex w-full items-start gap-4 p-5 text-left`}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-feature ${hue.chip}`}
              >
                <CatIcon size={28} className={hue.ink} aria-hidden="true" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="min-w-0 flex-1 text-h3 text-ink">
                    {cat.meta ? t(cat.meta.titleKey) : cat.title}
                  </span>
                  <ArrowRight size={20} className={`shrink-0 ${hue.ink}`} aria-hidden="true" />
                </span>
                <span className="mt-0.5 block text-body-small text-ink-2">
                  {cat.meta ? t(cat.meta.descKey) : cat.subtitle}
                </span>

                <span className="mb-1.5 mt-4 flex items-center justify-between gap-2">
                  <span className="text-caption text-ink-2">
                    {cat.catLessons} {t('trainingLessons')} · {cat.catCompleted}/{cat.catLessons}
                  </span>
                  <span className={`text-caption font-bold tabular-nums ${hue.ink}`}>
                    {cat.catPct}%
                  </span>
                </span>
                <span className="block h-2 overflow-hidden rounded-full bg-line">
                  <motion.span
                    className={`block h-full rounded-full ${hue.bar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.catPct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  />
                </span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
