// ─────────────────────────────────────────────────────────────
// HomeDashboard.tsx — Redesigned app home screen
// Hero quote, welcome, stats, categories, continue learning, daily challenge, quick access
// ─────────────────────────────────────────────────────────────

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Users,
  Hand,
  Sparkles,
  BookOpen,
  Flame,
  Zap,
  FileText,
  Dumbbell,
  BrainCircuit,
  Award,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState, useCallback } from 'react';
import { categories, getLessonsForCategory, getLesson, getCategory } from '../data/lessons';
import { getRandomQuote, type Quote } from '../data/quotes';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../contexts/LanguageContext';
import DailyChallengeCard from '../components/DailyChallengeCard';

/* ─── Helpers ─── */

const iconMap: Record<string, LucideIcon> = { Brain, Users, Hand, Sparkles };

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

function getUserName(): string {
  try {
    const userData = localStorage.getItem('zl_user');
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed.name) return parsed.name;
    }
    return localStorage.getItem('zl_user_name') || 'Learner';
  } catch {
    return 'Learner';
  }
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getContinueLearning(): string[] {
  try {
    return JSON.parse(localStorage.getItem('zl_continue_learning') || '[]');
  } catch {
    return [];
  }
}

function saveContinueLearning(lessonId: string) {
  const list = getContinueLearning().filter((id) => id !== lessonId);
  list.unshift(lessonId);
  if (list.length > 10) list.pop();
  localStorage.setItem('zl_continue_learning', JSON.stringify(list));
}

/* ─── Animations ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─── Quick Access Item ─── */

function QuickAccessItem({
  icon: Icon,
  label,
  onClick,
  color,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <span className="text-xs font-medium text-[#8A8A8A]">{label}</span>
    </motion.button>
  );
}

/* ─── Main Component ─── */

export default function HomeDashboard() {
  const navigate = useNavigate();
  const progress = useProgress();
  const { language, t } = useLanguage();

  const userName = useMemo(() => getUserName(), []);
  const lessonProgress = progress.lessonProgress;

  // Stats
  const totalXP = progress.getTotalXP();
  const lessonsCompleted = progress.getLessonsCompletedCount();
  const currentStreak = progress.getCurrentStreak();

  // Continue learning
  const continueIds = useMemo(() => getContinueLearning(), []);
  const continueLessons = useMemo(
    () => continueIds.map((id) => getLesson(id)).filter(Boolean).slice(0, 6),
    [continueIds]
  );

  // Motivational quote
  const [quote, setQuote] = useState<Quote>(() => getRandomQuote());
  const refreshQuote = useCallback(() => setQuote(getRandomQuote()), []);

  // Category data
  const categoryData = useMemo(() => {
    return categories.map((cat) => {
      const catLessons = getLessonsForCategory(cat.id);
      const catCompleted = catLessons.filter((l) => lessonProgress[l.id]).length;
      const catPct = catLessons.length > 0 ? Math.round((catCompleted / catLessons.length) * 100) : 0;
      return { ...cat, catLessons: catLessons.length, catCompleted, catPct };
    });
  }, [lessonProgress]);

  return (
    <div className="min-h-full px-6 pt-6 pb-24">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* ── Motivational Quote Hero ── */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="p-5 rounded-2xl bg-[#111111] border border-[#1A1A1A] relative">
            <button
              onClick={refreshQuote}
              className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#5A5A5A] hover:text-[#0ABAB5] transition-colors"
            >
              <RefreshCw size={14} />
            </button>
            <p
              className="text-lg italic leading-relaxed text-[#0ABAB5] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              "{language === 'es' ? quote.textEs : quote.text}"
            </p>
            <p className="text-sm text-[#8A8A8A]">— {quote.author}</p>
          </div>
        </motion.div>

        {/* ── Welcome Message ── */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-h1 text-white">
            {getGreeting()}, <span className="text-[#0ABAB5]">{userName}</span>!
          </h1>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 mb-6">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
            <Flame size={22} className="text-orange-500 mb-2" />
            <p className="text-h4 text-white font-bold">{totalXP}</p>
            <p className="text-caption text-[#8A8A8A]">Total XP</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
            <BookOpen size={22} className="text-[#0ABAB5] mb-2" />
            <p className="text-h4 text-white font-bold">{lessonsCompleted}</p>
            <p className="text-caption text-[#8A8A8A]">Lessons</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
            <Zap size={22} className="text-[#F59E0B] mb-2" />
            <p className="text-h4 text-white font-bold">{currentStreak}</p>
            <p className="text-caption text-[#8A8A8A]">Streak</p>
          </div>
        </motion.div>

        {/* ── Continue Learning ── */}
        {continueLessons.length > 0 && (
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-h2 text-white font-bold">Continue Learning</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-6 px-6">
              {continueLessons.map((lesson) => {
                if (!lesson) return null;
                const cat = getCategory(lesson.categoryId);
                const isDone = lessonProgress[lesson.id];
                const LessonIcon = getIcon(lesson.icon);
                return (
                  <motion.button
                    key={lesson.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      saveContinueLearning(lesson.id);
                      navigate(`/lesson/${lesson.id}`);
                    }}
                    className="snap-start flex-shrink-0 w-60 p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${cat?.accentColor || '#0ABAB5'}20` }}
                      >
                        <LessonIcon size={13} style={{ color: cat?.accentColor || '#0ABAB5' }} />
                      </div>
                      <span className="text-caption text-[#8A8A8A] truncate">{cat?.title}</span>
                    </div>
                    <h4 className="text-h4 text-white font-semibold mb-1 truncate">{lesson.title}</h4>
                    <p className="text-caption text-[#8A8A8A] truncate mb-2">{lesson.subtitle}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#8A8A8A]">
                        {lesson.duration}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-medium text-green-400 flex items-center gap-0.5">
                          <Award size={10} /> Done
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Categories Grid ── */}
        <motion.div variants={itemVariants} className="mb-2">
          <h2 className="text-h2 text-white font-bold mb-4">Categories</h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categoryData.map((cat, i) => {
            const CatIcon = getIcon(cat.icon);
            return (
              <motion.button
                key={cat.id}
                variants={itemVariants}
                custom={i}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/category/${cat.id}`)}
                className="text-left p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors flex flex-col"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${cat.accentColor}20` }}
                >
                  <CatIcon size={22} style={{ color: cat.accentColor }} />
                </div>
                <h4 className="text-h4 text-white font-semibold leading-tight mb-1">{cat.title}</h4>
                <p className="text-caption text-[#8A8A8A] mb-3">{cat.subtitle}</p>
                {cat.id === 'products' && (
                  <p className="text-[10px] font-medium text-[#0ABAB5] mb-2">4 Products Inside</p>
                )}
                {/* Mini progress bar */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#8A8A8A]">
                      {cat.catCompleted}/{cat.catLessons}
                    </span>
                    <span className="text-[10px] font-semibold" style={{ color: cat.accentColor }}>
                      {cat.catPct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.accentColor }}
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.catPct}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* ── Daily Challenge ── */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-h2 text-white font-bold mb-4">Daily Challenge</h2>
          <DailyChallengeCard
            isCompleted={progress.isDailyChallengeCompleted()}
            onComplete={progress.completeDailyChallenge}
          />
        </motion.div>

        {/* ── Quick Access Row ── */}
        <motion.div variants={itemVariants}>
          <h2 className="text-h2 text-white font-bold mb-4">Quick Access</h2>
          <div className="grid grid-cols-3 gap-3">
            <QuickAccessItem
              icon={FileText}
              label="Cheat Sheets"
              onClick={() => navigate('/cheat-sheets')}
              color="#8B5CF6"
            />
            <QuickAccessItem
              icon={Dumbbell}
              label="Exercises"
              onClick={() => navigate('/exercises')}
              color="#0ABAB5"
            />
            <QuickAccessItem
              icon={BrainCircuit}
              label="Quizzes"
              onClick={() => navigate('/quizzes')}
              color="#F59E0B"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
