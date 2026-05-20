import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Copy,
  CheckCircle2,
  Lightbulb,
  AlertCircle,
  Circle,
} from 'lucide-react';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { getLesson, getCategory, getNextLesson, type ContentSection } from '../data/lessons';

/* ─── Section Renderers ─── */

function QuoteCard({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <div className="my-6 pl-4 border-l-4 border-[#0ABAB5]">
      <p
        className="text-lg italic text-white leading-relaxed"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        &ldquo;{text}&rdquo;
      </p>
      {attribution && (
        <p className="text-caption text-[#8A8A8A] mt-2">— {attribution}</p>
      )}
    </div>
  );
}

function TipCard({ text }: { text: string }) {
  return (
    <div className="my-6 p-4 rounded-2xl bg-[#0ABAB5]/10 border border-[#0ABAB5]/20 flex gap-3">
      <Lightbulb size={20} className="text-[#0ABAB5] shrink-0 mt-0.5" />
      <div>
        <p className="text-caption font-semibold text-[#0ABAB5] mb-1 uppercase tracking-wider">Pro Tip</p>
        <p className="text-body-small text-gray-200 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function KeyPointCard({ text }: { text: string }) {
  return (
    <div className="my-6 p-4 rounded-2xl border-2 border-[#0ABAB5]/40 bg-[#0ABAB5]/5 flex gap-3">
      <AlertCircle size={20} className="text-[#0ABAB5] shrink-0 mt-0.5" />
      <p className="text-body-small text-white font-medium leading-relaxed">{text}</p>
    </div>
  );
}

function ScriptCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <div className="my-6 rounded-2xl bg-[#111111] border border-[#1A1A1A] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1A1A1A]">
        <span className="text-caption text-[#8A8A8A] font-medium">Script:</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-caption text-[#8A8A8A] hover:text-[#0ABAB5] transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-4">
        <p
          className="text-body-small text-gray-200 leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function ComparisonCard({ left, right }: { left?: { label: string; text: string }; right?: { label: string; text: string } }) {
  return (
    <div className="my-6 grid grid-cols-2 gap-3">
      {left && (
        <div className="p-4 rounded-2xl border-2 border-green-500/30 bg-green-500/5">
          <p className="text-caption font-semibold text-green-400 mb-1.5">{left.label}</p>
          <p className="text-body-small text-gray-200 leading-relaxed">{left.text}</p>
        </div>
      )}
      {right && (
        <div className="p-4 rounded-2xl border-2 border-red-500/30 bg-red-500/5">
          <p className="text-caption font-semibold text-red-400 mb-1.5">{right.label}</p>
          <p className="text-body-small text-gray-200 leading-relaxed">{right.text}</p>
        </div>
      )}
    </div>
  );
}

function ChecklistCard({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <div className="my-6 space-y-2.5">
      {items.map((item, i) => {
        const isChecked = checked[i];
        return (
          <button
            key={i}
            onClick={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))}
            className="w-full flex items-start gap-3 text-left p-3 rounded-xl bg-[#111111] border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors"
          >
            <div className="shrink-0 mt-0.5">
              {isChecked ? (
                <CheckCircle2 size={20} className="text-[#0ABAB5]" />
              ) : (
                <Circle size={20} className="text-[#8A8A8A]" />
              )}
            </div>
            <span className={`text-body-small leading-relaxed ${isChecked ? 'text-[#8A8A8A] line-through' : 'text-gray-200'}`}>
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0ABAB5] shrink-0 mt-2" />
          <span className="text-body-small text-gray-200 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="my-6 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-5 h-5 rounded-full bg-[#0ABAB5] flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[10px] font-bold text-white">{i + 1}</span>
          </span>
          <span className="text-body-small text-gray-200 leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  );
}

function SectionRenderer({ section }: { section: ContentSection }) {
  switch (section.type) {
    case 'header':
      return (
        <h2 className="text-h2 text-white font-bold mt-8 mb-3">{section.text}</h2>
      );
    case 'subheader':
      return (
        <h3 className="text-h3 text-gray-300 font-semibold mt-6 mb-2">{section.text}</h3>
      );
    case 'paragraph':
      return (
        <p className="text-body text-gray-200 leading-relaxed my-4">{section.text}</p>
      );
    case 'quote':
      return <QuoteCard text={section.text || ''} attribution={section.attribution} />;
    case 'tip':
      return <TipCard text={section.text || ''} />;
    case 'keypoint':
      return <KeyPointCard text={section.text || ''} />;
    case 'script':
      return <ScriptCard text={section.text || ''} />;
    case 'bullets':
      return <BulletList items={section.items || []} />;
    case 'numbered':
      return <NumberedList items={section.items || []} />;
    case 'comparison':
      return <ComparisonCard left={section.left} right={section.right} />;
    case 'checklist':
      return <ChecklistCard items={section.items || []} />;
    case 'divider':
      return <div className="my-8 h-px bg-[#1A1A1A]" />;
    default:
      return null;
  }
}

/* ─── Main Component ─── */

function getProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem('zl_lesson_progress') || '{}');
  } catch {
    return {};
  }
}

export default function LessonView() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lesson = useMemo(() => (lessonId ? getLesson(lessonId) : undefined), [lessonId]);
  const category = useMemo(() => (lesson ? getCategory(lesson.categoryId) : undefined), [lesson]);
  const nextLesson = useMemo(() => (lessonId ? getNextLesson(lessonId) : undefined), [lessonId]);

  const [isCompleted, setIsCompleted] = useState(() => {
    if (!lessonId) return false;
    const p = getProgress();
    return !!p[lessonId];
  });

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress(scrollTop / scrollHeight);
      }
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  if (!lesson || !category) {
    navigate('/home', { replace: true });
    return null;
  }

  const handleMarkComplete = () => {
    if (isCompleted) return;
    const p = getProgress();
    p[lesson.id] = true;
    localStorage.setItem('zl_lesson_progress', JSON.stringify(p));
    setIsCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#0ABAB5', '#0ABAB5', '#FFFFFF', '#F59E0B'],
    });
  };

  const handleBack = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Scroll progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1A1A1A] z-20">
        <motion.div
          className="h-full bg-[#0ABAB5]"
          style={{ width: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Header */}
      <div className="shrink-0 px-6 pt-5 pb-3 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-10">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-[#8A8A8A] mb-3 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-body-small">Back</span>
        </button>
        <p className="text-overline text-[#0ABAB5] mb-1">{category.title}</p>
        <h1 className="text-h1 text-white">{lesson.title}</h1>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto no-scrollbar">
        <div className="px-6 pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {lesson.sections.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Bottom CTA Section */}
          <div className="mt-10 pt-6 border-t border-[#1A1A1A] space-y-3">
            {!isCompleted ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleMarkComplete}
                className="w-full py-4 rounded-full bg-[#0ABAB5] text-white text-button font-semibold flex items-center justify-center gap-2 hover:bg-[#09a9a4] transition-colors"
              >
                <Check size={20} strokeWidth={2.5} />
                Mark Lesson Complete
              </motion.button>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full py-4 rounded-full bg-green-500/20 text-green-400 text-button font-semibold flex items-center justify-center gap-2 border border-green-500/30"
                >
                  <Check size={20} strokeWidth={3} />
                  Completed
                </motion.div>

                {/* Take Quiz */}
                {lesson.quiz && lesson.quiz.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/lesson/${lesson.id}/quiz`)}
                    className="w-full py-4 rounded-full bg-[#1A1A1A] text-white text-button font-semibold flex items-center justify-center gap-2 border border-[#2A2A2A] hover:border-[#0ABAB5]/50 transition-colors"
                  >
                    Take Quiz
                  </motion.button>
                )}
              </>
            )}

            {nextLesson && isCompleted && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/lesson/${nextLesson.id}`)}
                className="w-full py-4 rounded-full bg-[#1A1A1A] text-[#8A8A8A] text-button font-semibold flex items-center justify-center gap-2 border border-[#2A2A2A] hover:border-[#3A3A3A] hover:text-white transition-colors"
              >
                Next Lesson: {nextLesson.title}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
