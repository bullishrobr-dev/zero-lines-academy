import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Users,
  Hand,
  Sparkles,
  Lock,
  Check,
  ChevronRight,
  ArrowLeft,
  type LucideIcon,
} from 'lucide-react';
import { useMemo } from 'react';
import { categories, getLessonsForCategory } from '../data/lessons';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Users,
  Hand,
  Sparkles,
};

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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function CategoryHub() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const category = useMemo(() => categories.find((c) => c.id === id), [id]);
  const lessons = useMemo(() => (id ? getLessonsForCategory(id) : []), [id]);
  const progress = useMemo(() => getProgress(), []);

  if (!category) {
    navigate('/home', { replace: true });
    return null;
  }

  const completedCount = lessons.filter((l) => progress[l.id]).length;
  const completionPct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const CatIcon = getIcon(category.icon);

  return (
    <div className="min-h-full pb-6">
      {/* Hero */}
      <div
        className="px-6 pt-6 pb-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${category.accentColor}18 0%, transparent 100%)`,
        }}
      >
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-1 text-[#8A8A8A] mb-4 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-body-small">Back</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
            style={{ backgroundColor: `${category.accentColor}25` }}
          >
            <CatIcon size={28} style={{ color: category.accentColor }} />
          </div>
          <h1 className="text-h1 text-white mb-2">{category.title}</h1>
          <p className="text-body-small text-[#8A8A8A] leading-relaxed">{category.description}</p>
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-caption text-[#8A8A8A]">Category Progress</span>
          <span className="text-caption font-semibold" style={{ color: category.accentColor }}>
            {completionPct}%
          </span>
        </div>
        <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: category.accentColor }}
            initial={{ width: 0 }}
            animate={{ width: `${completionPct}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          />
        </div>
        <p className="text-caption text-[#8A8A8A] mt-2">
          {completedCount} of {lessons.length} lessons completed
        </p>
      </div>

      {/* Lesson list */}
      <div className="px-6 space-y-3">
        {lessons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-body-small text-[#8A8A8A]">No lessons available yet.</p>
          </div>
        )}
        {lessons.map((lesson, index) => {
          const isCompleted = progress[lesson.id];
          const prevLesson = lessons[index - 1];
          const isLocked = index > 0 && prevLesson ? !progress[prevLesson.id] : index > 0;
          const isFirst = index === 0;
          const locked = !isFirst && isLocked;

          const LessonIcon = getIcon(lesson.icon);

          return (
            <motion.button
              key={lesson.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              onClick={() => {
                if (!locked) navigate(`/lesson/${lesson.id}`);
              }}
              className={`w-full text-left relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                locked
                  ? 'opacity-50 border-[#1A1A1A] bg-[#0F0F0F] cursor-not-allowed'
                  : 'border-[#1A1A1A] bg-[#111111] hover:border-[#2A2A2A] active:scale-[0.98]'
              }`}
            >
              {/* Icon circle */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${category.accentColor}18` }}
              >
                {locked ? (
                  <Lock size={18} style={{ color: category.accentColor }} />
                ) : (
                  <LessonIcon size={18} style={{ color: category.accentColor }} />
                )}
              </div>

              {/* Middle content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-h4 text-white truncate">{lesson.title}</h4>
                <p className="text-caption text-[#8A8A8A] mt-0.5">{lesson.subtitle}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#8A8A8A]">
                    {lesson.duration}
                  </span>
                  <span className="text-[11px] font-medium text-[#0ABAB5]">+{lesson.xpReward} XP</span>
                </div>
              </div>

              {/* Right indicator */}
              <div className="shrink-0">
                {isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-[#0ABAB5] flex items-center justify-center">
                    <Check size={16} strokeWidth={3} className="text-white" />
                  </div>
                ) : locked ? (
                  <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                    <Lock size={14} className="text-[#8A8A8A]" />
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="w-8 h-8 rounded-full border-2 border-[#0ABAB5] flex items-center justify-center">
                      <ChevronRight size={14} className="text-[#0ABAB5]" />
                    </div>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
