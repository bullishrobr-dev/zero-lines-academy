import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Brain,
  Heart,
  Zap,
  Package,
  ChevronRight,
  Flame,
  BookOpen,
  TrendingUp,
  Clock,
  Sparkles,
  BarChart3,
  Sun,
} from 'lucide-react';
import { useFlashcards } from '../hooks/useFlashcards';
import { categories, getFlashcardsByCategory } from '../data/flashcards';

// ── Icon map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Heart,
  Zap,
  Package,
};

const categoryColors: Record<string, { bg: string; text: string; border: string; icon: string; progress: string }> = {
  'sales-psychology': {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    icon: 'text-purple-400',
    progress: 'bg-purple-500',
  },
  'reading-connecting': {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/20',
    icon: 'text-pink-400',
    progress: 'bg-pink-500',
  },
  'art-of-stopping': {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    border: 'border-yellow-500/20',
    icon: 'text-yellow-400',
    progress: 'bg-yellow-500',
  },
  'product-mastery': {
    bg: 'bg-[#0ABAB5]/10',
    text: 'text-[#0ABAB5]',
    border: 'border-[#0ABAB5]/20',
    icon: 'text-[#0ABAB5]',
    progress: 'bg-[#0ABAB5]',
  },
};

// ── Component ───────────────────────────────────────────────────────────────

export default function FlashcardDeckPage() {
  const navigate = useNavigate();
  const {
    dueCount,
    streak,
    masteryPercent,
    totalReviewed,
    categoryMastery,
    categoryDueCount,
    isReady,
  } = useFlashcards();

  // Morning briefing: up to 5 most urgent cards across all categories
  const handleMorningBriefing = () => {
    navigate('/flashcards?mode=morning');
  };

  // Build deck stats
  const decks = useMemo(() => {
    return categories.map((cat, index) => {
      const cards = getFlashcardsByCategory(cat.id);
      const totalCards = cards.length;
      const due = categoryDueCount[cat.id] ?? 0;
      const mastered = categoryMastery[cat.id] ?? 0;
      const Icon = iconMap[cat.icon] ?? Brain;
      const colors = categoryColors[cat.id];

      return {
        ...cat,
        index,
        totalCards,
        due,
        mastered,
        Icon,
        colors,
      };
    });
  }, [categoryDueCount, categoryMastery]);

  const totalCards = useMemo(
    () => decks.reduce((sum, d) => sum + d.totalCards, 0),
    [decks]
  );

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0ABAB5] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-[#0A0A0A]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[430px] items-center px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5 text-white/70" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">Flashcard Decks</h1>
            <p className="text-xs text-white/40">Spaced Repetition System</p>
          </div>
          {dueCount > 0 && (
            <div className="flex h-9 min-w-[36px] items-center justify-center rounded-full bg-[#0ABAB5]/15 px-2.5">
              <span className="text-sm font-bold text-[#0ABAB5]">{dueCount}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[430px] px-4 pt-5">
        {/* Overall Stats Row */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard
            icon={<BookOpen className="h-4 w-4" />}
            label="Due Today"
            value={dueCount}
            color="text-[#0ABAB5]"
            bg="bg-[#0ABAB5]/10"
          />
          <StatCard
            icon={<Flame className="h-4 w-4" />}
            label="Streak"
            value={streak}
            suffix="days"
            color="text-orange-400"
            bg="bg-orange-500/10"
          />
          <StatCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="Mastered"
            value={`${masteryPercent}%`}
            color="text-emerald-400"
            bg="bg-emerald-500/10"
          />
        </div>

        {/* Overall Progress */}
        <div className="mb-6 rounded-2xl border border-white/5 bg-[#111] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-white/40" />
              <span className="text-sm font-medium text-white/70">Overall Progress</span>
            </div>
            <span className="text-sm font-bold text-white">{totalReviewed} reviews</span>
          </div>
          <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-[#0ABAB5]"
              initial={{ width: 0 }}
              animate={{ width: `${masteryPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/30">{totalCards} total cards</span>
            <span className="text-xs font-medium text-[#0ABAB5]">{masteryPercent}% mastered</span>
          </div>
        </div>

        {/* Morning Briefing Button */}
        {dueCount > 0 && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleMorningBriefing}
            className="mb-6 flex w-full items-center gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4 transition hover:bg-yellow-500/10"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-500/15">
              <Sun className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-semibold text-white">Morning Briefing</h3>
              <p className="text-xs text-white/40">
                Quick 5-card review to start your day
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/15">
              <ChevronRight className="h-4 w-4 text-yellow-400" />
            </div>
          </motion.button>
        )}

        {/* Quick "Review All" button */}
        {dueCount > 0 && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/flashcards')}
            className="mb-6 flex w-full items-center gap-3 rounded-2xl border border-[#0ABAB5]/30 bg-[#0ABAB5]/10 p-4 transition hover:bg-[#0ABAB5]/15"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0ABAB5]/20">
              <Sparkles className="h-6 w-6 text-[#0ABAB5]" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-sm font-semibold text-white">Review All Due Cards</h3>
              <p className="text-xs text-white/40">
                {dueCount} card{dueCount !== 1 ? 's' : ''} waiting for review
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0ABAB5]/20">
              <ChevronRight className="h-4 w-4 text-[#0ABAB5]" />
            </div>
          </motion.button>
        )}

        {/* Section Title */}
        <h2 className="mb-4 text-base font-bold text-white">Study by Category</h2>

        {/* Category Decks */}
        <div className="space-y-3">
          {decks.map((deck) => (
            <motion.button
              key={deck.id}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: deck.index * 0.08 }}
              onClick={() => navigate(`/flashcards?category=${deck.id}`)}
              className={`flex w-full items-center gap-4 rounded-2xl border ${deck.colors.border} bg-[#111] p-4 text-left transition hover:bg-[#161616]`}
            >
              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${deck.colors.bg}`}
              >
                <deck.Icon className={`h-6 w-6 ${deck.colors.icon}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {deck.name}
                  </h3>
                  {deck.due > 0 && (
                    <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-[#0ABAB5]/15 px-1.5 text-[10px] font-bold text-[#0ABAB5]">
                      {deck.due}
                    </span>
                  )}
                </div>
                <p className="mb-2 truncate text-xs text-white/40">
                  {deck.description}
                </p>

                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className={`h-full rounded-full ${deck.colors.progress}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${deck.mastered}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 + deck.index * 0.1 }}
                    />
                  </div>
                  <span className="text-[10px] font-medium tabular-nums text-white/30">
                    {deck.mastered}%
                  </span>
                </div>

                <div className="mt-1.5 flex items-center gap-3">
                  <span className="text-[10px] text-white/30">
                    {deck.totalCards} cards
                  </span>
                  {deck.due > 0 && (
                    <span className="flex items-center gap-1 text-[10px] text-[#0ABAB5]">
                      <Clock className="h-3 w-3" />
                      {deck.due} due
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-5 w-5 shrink-0 text-white/15" />
            </motion.button>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-8 pb-4 text-center">
          <p className="text-xs text-white/20">
            {totalCards} cards across {categories.length} categories
          </p>
          <p className="mt-1 text-[10px] text-white/15">
            Reviews use spaced repetition for optimal retention
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Stat Card ───────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  suffix,
  color,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  suffix?: string;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#111] p-3">
      <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
        <span className={color}>{icon}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold ${color}`}>{value}</span>
        {suffix && <span className="text-[10px] text-white/30">{suffix}</span>}
      </div>
      <p className="mt-0.5 text-[10px] text-white/40">{label}</p>
    </div>
  );
}
