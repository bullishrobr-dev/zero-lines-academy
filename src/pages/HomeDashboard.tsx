import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Users,
  Hand,
  Sparkles,
  Zap,
  BookOpen,
  Flame,
  Award,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { categories, getLessonsForCategory, lessons, getLesson, getCategory } from '../data/lessons';

/* ─── Helpers ─── */

const iconMap: Record<string, LucideIcon> = { Brain, Users, Hand, Sparkles };

function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

function getProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem('zl_lesson_progress') || '{}');
  } catch {
    return {};
  }
}

function getUserName(): string {
  try {
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

function getDailyChallenge(): { text: string; done: boolean } {
  try {
    const saved = localStorage.getItem('zl_daily_challenge');
    const today = new Date().toDateString();
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) return parsed;
    }
    const challenges = [
      'Practice the 3-Second Rule on 5 strangers today',
      'Compliment 3 customers genuinely today',
      'Use the Comparison Close in a real demo',
      'Memorize one new product script perfectly',
      'Track your stops-to-demos ratio for a full shift',
    ];
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    const data = { date: today, text: challenge, done: false };
    localStorage.setItem('zl_daily_challenge', JSON.stringify(data));
    return data;
  } catch {
    return { text: 'Complete one lesson today', done: false };
  }
}

/* ─── Circular Progress ─── */

function CircularProgress({
  pct,
  size = 140,
  strokeWidth = 10,
  color = '#0ABAB5',
  children,
}: {
  pct: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}) {
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#1A1A1A" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

/* ─── Animations ─── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

/* ─── Main Component ─── */

export default function HomeDashboard() {
  const navigate = useNavigate();
  const progress = useMemo(() => getProgress(), []);
  const userName = useMemo(() => getUserName(), []);

  const totalLessons = Object.keys(lessons).length;
  const completedLessons = Object.keys(progress).filter((k) => progress[k]).length;
  const overallPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // XP calculation
  const totalXP = useMemo(() => {
    return Object.keys(progress)
      .filter((k) => progress[k])
      .reduce((sum, id) => {
        const lesson = getLesson(id);
        return sum + (lesson?.xpReward || 0);
      }, 0);
  }, [progress]);

  // Streak (simplified)
  const streak = 3; // Placeholder — would be calculated from history

  // Continue learning
  const continueIds = useMemo(() => getContinueLearning(), []);
  const continueLessons = useMemo(
    () => continueIds.map((id) => getLesson(id)).filter(Boolean).slice(0, 5),
    [continueIds]
  );

  // Daily challenge
  const [daily, setDaily] = useState(() => getDailyChallenge());

  const handleDailyDone = () => {
    const updated = { ...daily, done: true };
    setDaily(updated);
    localStorage.setItem('zl_daily_challenge', JSON.stringify(updated));
  };

  // Date
  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Category completion data
  const categoryData = useMemo(() => {
    return categories.map((cat) => {
      const catLessons = getLessonsForCategory(cat.id);
      const catCompleted = catLessons.filter((l) => progress[l.id]).length;
      const catPct = catLessons.length > 0 ? Math.round((catCompleted / catLessons.length) * 100) : 0;
      return { ...cat, catLessons: catLessons.length, catCompleted, catPct };
    });
  }, [progress]);

  return (
    <div className="min-h-full px-6 pt-6 pb-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {/* Welcome header */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-overline text-[#8A8A8A] mb-1">{todayStr}</p>
          <h1 className="text-h1 text-white">
            Welcome back,{' '}
            <span className="text-[#0ABAB5]">{userName}</span>!
          </h1>
          <p className="text-body-small text-[#8A8A8A] mt-2 leading-relaxed">
            Every master was once a beginner. Keep pushing forward.
          </p>
        </motion.div>

        {/* Overall progress ring */}
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-8">
          <CircularProgress pct={overallPct}>
            <div className="text-center">
              <p className="text-score text-white">{overallPct}%</p>
              <p className="text-caption text-[#8A8A8A]">
                {completedLessons}/{totalLessons}
              </p>
            </div>
          </CircularProgress>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 mb-8">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
            <Zap size={22} className="text-[#F59E0B] mb-2" />
            <p className="text-h4 text-white font-bold">{totalXP}</p>
            <p className="text-caption text-[#8A8A8A]">Total XP</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
            <BookOpen size={22} className="text-[#0ABAB5] mb-2" />
            <p className="text-h4 text-white font-bold">{completedLessons}</p>
            <p className="text-caption text-[#8A8A8A]">Lessons Done</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A]">
            <Flame size={22} className="text-orange-500 mb-2" />
            <p className="text-h4 text-white font-bold">{streak}</p>
            <p className="text-caption text-[#8A8A8A]">Day Streak</p>
          </div>
        </motion.div>

        {/* Category grid */}
        <motion.div variants={itemVariants} className="mb-2">
          <h2 className="text-h2 text-white font-bold mb-4">Categories</h2>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 mb-8">
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

        {/* Continue learning */}
        {continueLessons.length > 0 && (
          <>
            <motion.div variants={itemVariants} className="mb-3 flex items-center justify-between">
              <h2 className="text-h2 text-white font-bold">Continue Learning</h2>
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 mb-8 -mx-6 px-6">
              {continueLessons.map((lesson) => {
                if (!lesson) return null;
                const cat = getCategory(lesson.categoryId);
                const isDone = progress[lesson.id];
                return (
                  <motion.button
                    key={lesson.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      saveContinueLearning(lesson.id);
                      navigate(`/lesson/${lesson.id}`);
                    }}
                    className="snap-start flex-shrink-0 w-64 p-4 rounded-2xl bg-[#111111] border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${cat?.accentColor || '#0ABAB5'}20` }}
                      >
                        {(() => {
                          const Icon = getIcon(lesson.icon);
                          return <Icon size={13} style={{ color: cat?.accentColor || '#0ABAB5' }} />;
                        })()}
                      </div>
                      <span className="text-caption text-[#8A8A8A] truncate">{cat?.title}</span>
                    </div>
                    <h4 className="text-h4 text-white font-semibold mb-1 truncate">{lesson.title}</h4>
                    <p className="text-caption text-[#8A8A8A] truncate">{lesson.subtitle}</p>
                    <div className="flex items-center gap-2 mt-2">
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
            </motion.div>
          </>
        )}

        {/* Daily challenge */}
        <motion.div variants={itemVariants}>
          <h2 className="text-h2 text-white font-bold mb-4">Daily Challenge</h2>
          <div className="p-5 rounded-2xl bg-[#111111] border border-[#1A1A1A] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#0ABAB5]/15 flex items-center justify-center shrink-0">
              <Award size={20} className="text-[#0ABAB5]" />
            </div>
            <div className="flex-1">
              <p className="text-body-small text-white font-medium leading-relaxed mb-3">
                {daily.text}
              </p>
              {daily.done ? (
                <span className="inline-flex items-center gap-1 text-caption text-green-400 font-semibold">
                  <Check size={14} strokeWidth={3} /> Completed
                </span>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDailyDone}
                  className="px-5 py-2.5 rounded-full bg-[#0ABAB5] text-white text-caption font-semibold hover:bg-[#09a9a4] transition-colors"
                >
                  Mark Done
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
