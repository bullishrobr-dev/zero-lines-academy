// ─────────────────────────────────────────────────────────────
// HomeDashboard.tsx — Main dashboard screen
// Motivational quote, welcome, stats, continue learning, daily challenge, quick access
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
  Target,
  TrendingUp,
  FileText,
  Dumbbell,
  BrainCircuit,
  Award,
  ChevronRight,
  Quote as QuoteIcon,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState, useCallback, useRef } from 'react';
import { getLesson, getCategory } from '../data/lessons';
import { getRandomQuote, type Quote } from '../data/quotes';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../contexts/LanguageContext';
import DailyChallengeCard from '../components/DailyChallengeCard';
import DailyDose, { DailyDoseModal } from '../components/DailyDose';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { useCountUp } from '../hooks/useCountUp';
import { celebrateChallengeComplete } from '../utils/confetti';
import { haptic } from '../utils/haptics';
import { Sunrise, Moon } from 'lucide-react';

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
      className="flex flex-col items-center gap-2 p-4 card-elevation-1 hover:border-[#2A2A2A] transition-colors"
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
  const dailyFlow = useDailyFlow();
  const todayProgress = dailyFlow.getTodayProgress();
  const [showDoseModal, setShowDoseModal] = useState(false);

  const userName = useMemo(() => getUserName(), []);
  const lessonProgress = progress.lessonProgress;

  // Stats
  const totalXP = progress.getTotalXP();
  const lessonsCompleted = progress.getLessonsCompletedCount();
  const currentStreak = progress.getCurrentStreak();

  // Greeting based on time of day
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return t('homeGoodMorning');
    if (hour < 17) return t('homeGoodAfternoon');
    return t('homeGoodEvening');
  }, [t]);

  // Continue learning
  const continueIds = useMemo(() => getContinueLearning(), []);
  const continueLessons = useMemo(
    () => continueIds.map((id) => getLesson(id)).filter(Boolean).slice(0, 6),
    [continueIds]
  );

  // Motivational quotes — pre-select 5 for swipeable carousel
  const [quotesList] = useState<Quote[]>(() => {
    const all = Array.from({ length: 5 }, () => getRandomQuote());
    return all;
  });
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quote = quotesList[quoteIndex];

  const goToQuote = useCallback(
    (dir: 'prev' | 'next') => {
      setQuoteIndex((prev) => {
        if (dir === 'next') return (prev + 1) % quotesList.length;
        return prev === 0 ? quotesList.length - 1 : prev - 1;
      });
    },
    [quotesList.length]
  );

  // Touch swipe state for quote card
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  }, []);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const diff = touchStartX.current - touchEndX.current;
      if (Math.abs(diff) > 40) {
        goToQuote(diff > 0 ? 'next' : 'prev');
      }
    },
    [goToQuote]
  );

  // Count-up animated stats
  const animatedXP = useCountUp(totalXP, 800);
  const animatedLessons = useCountUp(lessonsCompleted, 800);
  const animatedStreak = useCountUp(currentStreak, 800);

  // Daily challenge completion with confetti
  const handleDailyChallengeComplete = useCallback(() => {
    haptic('medium');
    celebrateChallengeComplete();
    progress.completeDailyChallenge();
  }, [progress]);

  return (
    <div className="min-h-full px-6 pt-6 pb-24">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* ── Motivational Quote Hero ── */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#0ABAB5]/10 to-transparent border border-[#1A1A1A] border-l-2 border-l-[#0ABAB5] relative overflow-hidden select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Decorative large quote marks */}
            <div className="absolute -top-3 -left-1 pointer-events-none select-none">
              <QuoteIcon size={64} className="text-[#0ABAB5]/[0.07]" />
            </div>
            <div className="absolute -bottom-5 -right-1 pointer-events-none select-none rotate-180">
              <QuoteIcon size={48} className="text-[#0ABAB5]/[0.05]" />
            </div>

            <p
              className="relative z-10 text-lg italic leading-relaxed text-[#0ABAB5] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{language === 'es' ? quote.textEs : quote.text}&rdquo;
            </p>
            <p className="relative z-10 text-sm text-[#8A8A8A]">&mdash; {quote.author}</p>

            {/* Dot indicators */}
            <div className="relative z-10 flex items-center justify-center gap-1.5 mt-4">
              {quotesList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === quoteIndex ? 'bg-[#0ABAB5] w-4' : 'bg-[#5A5A5A]/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── Welcome Message ── */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-h1 text-white">
            {greeting}, <span className="text-[#0ABAB5]">{userName}</span>!
          </h1>
          {userName === 'Learner' && (
            <button
              onClick={() => navigate('/auth')}
              className="mt-3 flex items-center gap-2 text-[#0ABAB5] text-sm font-medium hover:underline"
            >
              {language === 'es' ? 'Inicia sesión para acceder al panel de admin/manager' : 'Sign in to access admin & manager dashboard'}
              <ChevronRight size={14} />
            </button>
          )}
        </motion.div>

        {/* ── Shift Check-In Card (if not done today) ── */}
        {!todayProgress.checkedIn && (
          <motion.div variants={itemVariants} className="mb-4">
            <button
              onClick={() => navigate('/shift-checkin')}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#0ABAB5]/20 to-[#008B8B]/10 border border-[#0ABAB5]/30 hover:border-[#0ABAB5]/50 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0ABAB5]/20 flex items-center justify-center">
                <Sunrise className="w-5 h-5 text-[#0ABAB5]" />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-white">
                  {language === 'es' ? 'Check-In de Turno' : 'Shift Check-In'}
                </p>
                <p className="text-xs text-[#8A8A8A]">
                  {language === 'es' ? '¿Cómo te sientes? ¿Cuál es tu meta hoy?' : 'How do you feel? What\'s your goal today?'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#0ABAB5]" />
            </button>
          </motion.div>
        )}

        {/* ── Daily Dose ── */}
        <motion.div variants={itemVariants} className="mb-4">
          <DailyDose onOpen={() => setShowDoseModal(true)} />
          <DailyDoseModal isOpen={showDoseModal} onClose={() => setShowDoseModal(false)} />
        </motion.div>

        {/* ── End of Shift Card (if checked in but not reflected) ── */}
        {todayProgress.checkedIn && !todayProgress.reflected && (
          <motion.div variants={itemVariants} className="mb-4">
            <button
              onClick={() => navigate('/end-of-shift')}
              className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6]/20 to-[#6D28D9]/10 border border-[#8B5CF6]/30 hover:border-[#8B5CF6]/50 transition-colors flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 flex items-center justify-center">
                <Moon className="w-5 h-5 text-[#8B5CF6]" />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-white">
                  {language === 'es' ? 'Fin de Turno' : 'End of Shift'}
                </p>
                <p className="text-xs text-[#8A8A8A]">
                  {language === 'es' ? 'Reflexiona sobre tu día y mantén tu racha' : 'Reflect on your day and keep your streak'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#8B5CF6]" />
            </button>
          </motion.div>
        )}

        {/* ── Stats Row ── */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 mb-6">
          <div className="flex flex-col items-center p-4 card-elevation-1">
            <Flame
              size={22}
              className={`text-orange-500 mb-2 ${totalXP === 0 ? 'animate-pulse' : ''}`}
            />
            <p className={`text-h4 font-bold ${totalXP === 0 ? 'text-[#5A5A5A]' : 'text-white'}`}>
              {totalXP === 0 ? 'Start' : animatedXP}
            </p>
            <p className="text-caption text-[#8A8A8A]">{t('homeTotalXP')}</p>
            {totalXP === 0 && (
              <div className="w-full h-1 bg-[#1A1A1A] rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[2%] bg-orange-500/40 rounded-full" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center p-4 card-elevation-1">
            <BookOpen
              size={22}
              className={`text-[#0ABAB5] mb-2 ${lessonsCompleted === 0 ? 'animate-pulse' : ''}`}
            />
            <p className={`text-h4 font-bold ${lessonsCompleted === 0 ? 'text-[#5A5A5A]' : 'text-white'}`}>
              {lessonsCompleted === 0 ? 'Start' : animatedLessons}
            </p>
            <p className="text-caption text-[#8A8A8A]">{t('homeLessonsLabel')}</p>
            {lessonsCompleted === 0 && (
              <div className="w-full h-1 bg-[#1A1A1A] rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[2%] bg-[#0ABAB5]/40 rounded-full" />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center p-4 card-elevation-1">
            <Zap
              size={22}
              className={`text-[#F59E0B] mb-2 ${currentStreak === 0 ? 'animate-pulse' : ''}`}
            />
            <p className={`text-h4 font-bold ${currentStreak === 0 ? 'text-[#5A5A5A]' : 'text-white'}`}>
              {currentStreak === 0 ? 'Start' : animatedStreak}
            </p>
            <p className="text-caption text-[#8A8A8A]">{t('homeStreakLabel')}</p>
            {currentStreak === 0 && (
              <div className="w-full h-1 bg-[#1A1A1A] rounded-full mt-2 overflow-hidden">
                <div className="h-full w-[2%] bg-[#F59E0B]/40 rounded-full" />
              </div>
            )}
          </div>
        </motion.div>

        {/* ── Continue Learning ── */}
        {continueLessons.length > 0 && (
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-h2 text-white font-bold">{t('homeContinueLearning')}</h2>
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
                    className="snap-start flex-shrink-0 w-60 p-4 card-elevation-2 hover:border-[#2A2A2A] transition-colors text-left"
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
                          <Award size={10} /> {t('homeDone')}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Daily Challenge ── */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-h2 text-white font-bold mb-4">{t('homeDailyChallenge')}</h2>
          <DailyChallengeCard
            isCompleted={progress.isDailyChallengeCompleted()}
            onComplete={handleDailyChallengeComplete}
          />
        </motion.div>

        {/* ── First Day Track Promo ── */}
        <motion.div variants={itemVariants} className="mb-6">
          <button
            onClick={() => navigate('/first-day')}
            className="w-full p-5 rounded-2xl bg-gradient-to-r from-[#0ABAB5]/20 to-[#008B8B]/10 border border-[#0ABAB5]/30 hover:border-[#0ABAB5]/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0ABAB5]/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#0ABAB5]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-white">
                  {language === 'es' ? '¿Nuevo en Zero Lines?' : 'New to Zero Lines?'}
                </h3>
                <p className="text-xs text-[#8A8A8A]">
                  {language === 'es'
                    ? 'Track de primer día — Aprende a detener gente y traerla adentro'
                    : 'First-day track — Learn to stop people and bring them inside'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#0ABAB5]" />
            </div>
          </button>
        </motion.div>

        {/* ── Quick Practice ── */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-xs text-[#8A8A8A] mb-2 italic">
            {language === 'es' ? '¿Tienes unos minutos? Afila tus habilidades.' : 'Got a few minutes? Sharpen your skills.'}
          </p>
          <h2 className="text-h2 text-white font-bold mb-4">
            {language === 'es' ? 'Práctica Rápida' : 'Quick Practice'}
          </h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-6 px-6">
            {/* Flashcard Sprint */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/flashcards?mode=quick')}
              className="snap-start flex-shrink-0 w-64 p-4 card-elevation-2 hover:border-[#2A2A2A] transition-colors text-left flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#0ABAB5]/20 flex items-center justify-center flex-shrink-0">
                <Zap size={22} className="text-[#0ABAB5]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">Flashcard Sprint</h4>
                <p className="text-xs text-[#8A8A8A]">
                  {language === 'es' ? '1 min · 5 cartas' : '1 min · 5 cards'}
                </p>
              </div>
              <ChevronRight size={18} className="text-[#5A5A5A] flex-shrink-0" />
            </motion.button>

            {/* Scenario Drill */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/training')}
              className="snap-start flex-shrink-0 w-64 p-4 card-elevation-2 hover:border-[#2A2A2A] transition-colors text-left flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                <Target size={22} className="text-[#F59E0B]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">
                  {language === 'es' ? 'Simulacro de Escenario' : 'Scenario Drill'}
                </h4>
                <p className="text-xs text-[#8A8A8A]">
                  {language === 'es' ? '2 min · Situación real' : '2 min · Real situation'}
                </p>
              </div>
              <ChevronRight size={18} className="text-[#5A5A5A] flex-shrink-0" />
            </motion.button>

            {/* Price Ladder */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/quizzes')}
              className="snap-start flex-shrink-0 w-64 p-4 card-elevation-2 hover:border-[#2A2A2A] transition-colors text-left flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp size={22} className="text-[#8B5CF6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white truncate">
                  {language === 'es' ? 'Escalera de Precios' : 'Price Ladder'}
                </h4>
                <p className="text-xs text-[#8A8A8A]">
                  {language === 'es' ? 'Prueba tus precios' : 'Test your pricing'}
                </p>
              </div>
              <ChevronRight size={18} className="text-[#5A5A5A] flex-shrink-0" />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Quick Access Row ── */}
        <motion.div variants={itemVariants}>
          <h2 className="text-h2 text-white font-bold mb-4">{t('homeQuickAccess') || 'Quick Access'}</h2>
          <div className="grid grid-cols-3 gap-3">
            <QuickAccessItem
              icon={FileText}
              label={t('homeQuickAccessCheatSheets')}
              onClick={() => navigate('/cheat-sheets')}
              color="#8B5CF6"
            />
            <QuickAccessItem
              icon={Dumbbell}
              label={t('homeQuickAccessExercises')}
              onClick={() => navigate('/exercises')}
              color="#0ABAB5"
            />
            <QuickAccessItem
              icon={BrainCircuit}
              label={t('homeQuickAccessQuizzes')}
              onClick={() => navigate('/quizzes')}
              color="#F59E0B"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
