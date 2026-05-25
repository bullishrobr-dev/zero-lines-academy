// ─────────────────────────────────────────────────────────────
// TrainingHub.tsx — Learning categories page
// Shows 4 category cards with progress, lesson counts, and navigation
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Users, Hand, Sparkles, ChevronLeft, type LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { categories, getLessonsForCategory } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../contexts/LanguageContext';
import { TIER_NAMES, getTierCompletion, isTierUnlocked } from '../data/lessonTiers';

/* ─── Helpers ─── */

const iconMap: Record<string, LucideIcon> = { Brain, Users, Hand, Sparkles };

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

const categoryMeta: Record<
  string,
  { titleKey: string; descKey: string; accentColor: string }
> = {
  psychology: {
    titleKey: 'trainingSalesPsychology',
    descKey: 'trainingSalesPsychologyDesc',
    accentColor: '#0ABAB5',
  },
  connecting: {
    titleKey: 'trainingReadingConnecting',
    descKey: 'trainingReadingConnectingDesc',
    accentColor: '#8B5CF6',
  },
  stopping: {
    titleKey: 'trainingArtOfStopping',
    descKey: 'trainingArtOfStoppingDesc',
    accentColor: '#F59E0B',
  },
  products: {
    titleKey: 'trainingProductMastery',
    descKey: 'trainingProductMasteryDesc',
    accentColor: '#0ABAB5',
  },
};

/* ─── Animations ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─── Main Component ─── */

export default function TrainingHub() {
  const navigate = useNavigate();
  const progress = useProgress();
  const { t, language } = useLanguage();

  const lessonProgress = progress.lessonProgress;

  // Build category data with lesson counts and completion
  const categoryData = useMemo(() => {
    return categories.map((cat) => {
      const catLessons = getLessonsForCategory(cat.id);
      const catCompleted = catLessons.filter((l) => lessonProgress[l.id]).length;
      const catPct = catLessons.length > 0 ? Math.round((catCompleted / catLessons.length) * 100) : 0;
      const meta = categoryMeta[cat.id];
      return { ...cat, catLessons: catLessons.length, catCompleted, catPct, meta };
    });
  }, [lessonProgress]);

  // Tier progress data
  const tierData = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((tierNum) => ({
      tier: tierNum,
      name: TIER_NAMES[tierNum]?.[language === 'es' ? 'es' : 'en'] || `Tier ${tierNum}`,
      completion: getTierCompletion(tierNum, lessonProgress),
      unlocked: isTierUnlocked(tierNum, lessonProgress),
    }));
  }, [lessonProgress, language]);

  return (
    <div className="min-h-full px-6 pt-6 pb-24">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 mb-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-[#8A8A8A] hover:text-white transition-colors"
        >
          <ChevronLeft size={20} />
        </motion.button>
        <div>
          <h1 className="text-h1 text-white font-bold">{t('trainingTitle')}</h1>
          <p className="text-sm text-[#8A8A8A]">{t('trainingSubtitle')}</p>
        </div>
      </div>

      {/* ── Tier Progress Cards ── */}
      <div className="mt-4 mb-6">
        <p className="text-[11px] font-semibold tracking-widest text-[#0ABAB5] uppercase mb-3">
          {language === 'es' ? 'PROGRESO POR NIVEL' : 'TIER PROGRESS'}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {tierData.map((t) => (
            <div
              key={t.tier}
              className={`flex-shrink-0 w-28 snap-start p-3 rounded-xl border ${
                t.unlocked
                  ? t.completion >= 80
                    ? 'bg-[#0ABAB5]/10 border-[#0ABAB5]/30'
                    : 'bg-[#1A1A1A] border-[#2A2A2A]'
                  : 'bg-[#0A0A0A] border-[#1A1A1A] opacity-50'
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs font-bold text-[#0ABAB5]">T{t.tier}</span>
                {!t.unlocked && <span className="text-[9px]">🔒</span>}
              </div>
              <p className="text-[10px] text-[#8A8A8A] leading-tight mb-2 truncate">{t.name}</p>
              <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0ABAB5] transition-all"
                  style={{ width: `${t.completion}%` }}
                />
              </div>
              <p className="text-[9px] text-[#8A8A8A] mt-1">{t.completion}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 space-y-4"
      >
        {categoryData.map((cat, i) => {
          const CatIcon = getIcon(cat.icon);
          const meta = cat.meta;
          const accentColor = meta?.accentColor || cat.accentColor;
          return (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              custom={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/category/${cat.id}`)}
              className="w-full text-left p-5 card-elevation-2 hover:border-[#2A2A2A] transition-colors flex items-start gap-4"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${accentColor}20` }}
              >
                <CatIcon size={28} style={{ color: accentColor }} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-h3 text-white font-semibold mb-0.5">
                  {t(meta.titleKey as any)}
                </h3>
                <p className="text-sm text-[#8A8A8A] mb-3">
                  {t(meta.descKey as any)}
                </p>

                {/* Lesson count + progress */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#8A8A8A]">
                    {cat.catLessons} {t('trainingLessons')} · {cat.catCompleted}/{cat.catLessons}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: accentColor }}>
                    {cat.catPct}%
                  </span>
                </div>
                <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: accentColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.catPct}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
