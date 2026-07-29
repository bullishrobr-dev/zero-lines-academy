// ─────────────────────────────────────────────────────────────────────────────
// LessonView — the reading experience.
//
// This is the core of a training app, and it used to render every lesson as one
// undifferentiated grey wall: 20-34 content blocks at `text-gray-200`, full
// width, with five stacked lines of 10px metadata before a word of content.
//
// What changed:
//   • A porcelain masthead, then the lesson on a raised "sheet" — a real
//     reading surface with a Playfair drop cap and a constrained measure.
//   • Each `subheader` in the data now opens a numbered chapter (LessonSection),
//     so the wall has rhythm and a seller can see how much is left.
//   • Tips / key points / scripts / quotes / comparisons break the text column.
//   • Header metadata collapsed to one line plus a tier chip.
//
// Two Spanish bugs are fixed here:
//   1. Comparison cards read `section.left` / `section.right` and ignored `isEs`
//      entirely, so 13 populated `leftEs` blocks were dead data. The fallback is
//      PER FIELD, because only 1 of 13 `rightEs` blocks exists — swapping whole
//      objects would print Spanish on the left and nothing on the right.
//   2. `{isEs ? lesson.titleEs : lesson.title}` had no fallback, so psych-1 and
//      psych-3 (no `titleEs`) rendered an empty <h1>, and seven lessons rendered
//      an empty subtitle.
//
// Positioning note: Layout's <main> is `overflow-y-auto` but never actually
// scrolls (the document does), so `position: sticky` inside it does nothing —
// the old "sticky header" scrolled away. The condensed bar is therefore fixed
// to the app frame, and reading progress is measured from the article's own
// rect rather than a scrollTop that is always 0.
// ─────────────────────────────────────────────────────────────────────────────

import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, ChevronRight, Lock } from 'lucide-react';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import {
  getLesson,
  getCategory,
  lessons as allLessons,
  type ContentSection,
  type Lesson,
} from '../data/lessons';
import { celebrateLessonComplete } from '../utils/confetti';
import { haptic } from '../utils/haptics';
import { useCurrency } from '../utils/currency';
import { useLanguage } from '../contexts/LanguageContext';
import LessonSection from '../components/LessonSection';
import TipCard from '../components/TipCard';
import KeyPointCard from '../components/KeyPointCard';
import ScriptCard from '../components/ScriptCard';
import ProgressChecklist from '../components/ProgressChecklist';
import {
  getTierForLesson,
  isLessonUnlocked,
  getTotalTiers,
  TIER_NAMES,
  isTierUnlocked,
  UNLOCK_THRESHOLD,
} from '../data/lessonTiers';

/* ── Language helpers ────────────────────────────────────────────────────── */

function getText(
  section: ContentSection,
  field: 'text' | 'attribution',
  isEs: boolean
): string | undefined {
  if (isEs) {
    const val = section[`${field}Es` as keyof ContentSection];
    if (typeof val === 'string' && val.trim()) return val;
  }
  const enVal = section[field];
  return typeof enVal === 'string' ? enVal : undefined;
}

function getItems(section: ContentSection, isEs: boolean): string[] {
  if (isEs && Array.isArray(section.itemsEs) && section.itemsEs.length > 0) return section.itemsEs;
  return section.items || [];
}

/**
 * Comparison panels, resolved field by field.
 * `leftEs` exists on all 13 comparison blocks; `rightEs` on exactly one. Falling
 * back per field is what keeps the right-hand panel in English instead of blank.
 */
function getPanel(
  section: ContentSection,
  side: 'left' | 'right',
  isEs: boolean
): { label: string; text: string } | undefined {
  const en = section[side];
  const es = isEs ? section[side === 'left' ? 'leftEs' : 'rightEs'] : undefined;
  if (!en && !es) return undefined;
  const label = (es?.label?.trim() || en?.label || '').trim();
  const text = (es?.text?.trim() || en?.text || '').trim();
  if (!label && !text) return undefined;
  return { label, text };
}

/* ── Section renderers ───────────────────────────────────────────────────── */

function ComparisonPanel({
  tone,
  label,
  text,
}: {
  tone: 'teal' | 'coral';
  label: string;
  text: string;
}) {
  /* Deliberately NOT green/red. The data's polarity flips between blocks —
     "Closed Questions (Weak)" is on the left, "Weak Anchoring" is on the left,
     but "Open Questions (Powerful)" is on the right — so colouring left=good
     mislabelled half the lessons. Teal/coral reads as "this vs that". */
  const skin =
    tone === 'teal'
      ? 'border-teal/30 bg-teal-tint'
      : 'border-coral/30 bg-coral-tint';
  const labelSkin = tone === 'teal' ? 'text-teal-strong' : 'text-coral-strong';

  return (
    <div className={`rounded-card border px-4 py-3.5 ${skin}`}>
      <p className={`text-overline ${labelSkin}`}>{label}</p>
      <p className="mt-1.5 text-body-small text-ink">{text}</p>
    </div>
  );
}

function ComparisonCard({
  left,
  right,
}: {
  left?: { label: string; text: string };
  right?: { label: string; text: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      /* Stacked, not side by side: these blocks run 200+ characters each and
         two columns on a 390px phone gave ~14 characters a line. */
      className="-mx-2 my-7 grid gap-2.5"
    >
      {left && <ComparisonPanel tone="teal" {...left} />}
      {right && <ComparisonPanel tone="coral" {...right} />}
    </motion.div>
  );
}

function PullQuote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      /* Full bleed across the sheet — the hardest break in the column. */
      className="-mx-5 my-9 border-y border-line bg-surface-sunken px-5 py-7"
    >
      <blockquote className="font-brand text-h3 italic text-ink">&ldquo;{text}&rdquo;</blockquote>
      {attribution && (
        <figcaption className="mt-3 text-overline text-ink-3">— {attribution}</figcaption>
      )}
    </motion.figure>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="my-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
          <span className="text-body-small text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="my-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-tint text-caption font-bold tabular-nums text-teal-strong"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span className="text-body-small text-ink">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Playfair initial on the opening paragraph, the way a feature article opens. */
/* leading is exactly two body lines (2 x 28px) so the text wraps cleanly around
   the initial instead of leaving a ragged half-line indent. */
const DROP_CAP =
  'first-letter:float-left first-letter:mr-2.5 first-letter:font-brand ' +
  'first-letter:text-[46px] first-letter:font-bold first-letter:leading-[56px] ' +
  'first-letter:text-teal-strong';

interface RendererProps {
  section: ContentSection;
  sub: (text: string) => string;
  isEs: boolean;
  /** Stable across re-renders — used to persist checklist ticks. */
  storageKey: string;
  dropCap?: boolean;
}

function SectionRenderer({ section, sub, isEs, storageKey, dropCap }: RendererProps) {
  const text = sub(getText(section, 'text', isEs) || '');
  const items = getItems(section, isEs).map(sub);

  switch (section.type) {
    case 'header':
      return <h2 className="mb-5 font-brand text-h2 text-ink">{text}</h2>;

    case 'subheader':
      // Normally consumed by the chapter grouping; kept as a safety net.
      return <h3 className="mb-3 mt-8 text-h4 text-ink">{text}</h3>;

    case 'paragraph':
      return (
        <p className={`my-5 text-body text-ink ${dropCap ? DROP_CAP : ''}`}>{text}</p>
      );

    case 'quote':
      return (
        <PullQuote
          text={text}
          attribution={
            getText(section, 'attribution', isEs)
              ? sub(getText(section, 'attribution', isEs)!)
              : undefined
          }
        />
      );

    case 'tip':
      return <TipCard>{text}</TipCard>;

    case 'keypoint':
      return <KeyPointCard>{text}</KeyPointCard>;

    case 'script':
      return <ScriptCard text={text} />;

    case 'bullets':
      return <BulletList items={items} />;

    case 'numbered':
      return <NumberedList items={items} />;

    case 'comparison':
      return (
        <ComparisonCard
          left={mapPanel(getPanel(section, 'left', isEs), sub)}
          right={mapPanel(getPanel(section, 'right', isEs), sub)}
        />
      );

    case 'checklist':
      return (
        <ProgressChecklist
          storageKey={storageKey}
          items={items.map((item, i) => ({ id: `${storageKey}-${i}`, text: item }))}
        />
      );

    case 'divider':
      return (
        <div className="my-9 flex justify-center gap-2" aria-hidden="true">
          <span className="h-1 w-1 rounded-full bg-line-strong/50" />
          <span className="h-1 w-1 rounded-full bg-line-strong/50" />
          <span className="h-1 w-1 rounded-full bg-line-strong/50" />
        </div>
      );

    default:
      return null;
  }
}

function mapPanel(
  panel: { label: string; text: string } | undefined,
  sub: (t: string) => string
) {
  return panel ? { label: sub(panel.label), text: sub(panel.text) } : undefined;
}

/* ── Chapter grouping ────────────────────────────────────────────────────── */

interface Chapter {
  /** The `subheader` block that opens this chapter; absent for the lede. */
  titleSection?: ContentSection;
  entries: { section: ContentSection; index: number }[];
}

function toChapters(sections: ContentSection[]): Chapter[] {
  const chapters: Chapter[] = [{ entries: [] }];
  sections.forEach((section, index) => {
    // Every divider in the data exists only to announce the next subheader, and
    // the numbered chapter rule now does that job.
    if (section.type === 'divider' && sections[index + 1]?.type === 'subheader') return;
    if (section.type === 'subheader') {
      chapters.push({ titleSection: section, entries: [] });
      return;
    }
    chapters[chapters.length - 1].entries.push({ section, index });
  });
  return chapters.filter((c) => c.titleSection || c.entries.length > 0);
}

/* ── Progress ────────────────────────────────────────────────────────────── */

function getProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem('zl_lesson_progress') || '{}');
  } catch {
    return {};
  }
}

function getNextUnlockedLesson(currentLessonId: string): Lesson | undefined {
  const progress = getProgress();
  const allLessonIds = Object.values(allLessons)
    .sort((a, b) => {
      const tierA = getTierForLesson(a.id);
      const tierB = getTierForLesson(b.id);
      if (tierA !== tierB) return tierA - tierB;
      return a.order - b.order;
    })
    .map((l) => l.id);

  const currentIdx = allLessonIds.indexOf(currentLessonId);
  if (currentIdx === -1) return undefined;

  for (let i = currentIdx + 1; i < allLessonIds.length; i++) {
    if (isLessonUnlocked(allLessonIds[i], progress)) return allLessons[allLessonIds[i]];
  }
  return undefined;
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function LessonView() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const articleRef = useRef<HTMLDivElement>(null);
  const mastheadRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [condensed, setCondensed] = useState(false);
  const { sub } = useCurrency();
  const { language, t } = useLanguage();
  const isEs = language === 'es';

  const lesson = useMemo(() => (lessonId ? getLesson(lessonId) : undefined), [lessonId]);
  const category = useMemo(() => (lesson ? getCategory(lesson.categoryId) : undefined), [lesson]);

  const tierInfo = useMemo(() => {
    if (!lessonId) return null;
    const tierNum = getTierForLesson(lessonId);
    const totalTiers = getTotalTiers();
    const lang: 'en' | 'es' = isEs ? 'es' : 'en';
    const tierName = TIER_NAMES[tierNum]?.[lang] || `${tierNum}`;

    const nextTierNum = tierNum < totalTiers ? tierNum + 1 : null;
    const nextTierName = nextTierNum ? TIER_NAMES[nextTierNum]?.[lang] || `${nextTierNum}` : null;
    const nextTierUnlocked = nextTierNum ? isTierUnlocked(nextTierNum, getProgress()) : false;

    return { tierNum, tierName, totalTiers, nextTierNum, nextTierName, nextTierUnlocked };
  }, [lessonId, isEs]);

  const isLocked = useMemo(
    () => (lessonId ? !isLessonUnlocked(lessonId, getProgress()) : false),
    [lessonId]
  );

  const nextUnlockedLesson = useMemo(
    () => (!lessonId || isLocked ? undefined : getNextUnlockedLesson(lessonId)),
    [lessonId, isLocked]
  );

  const [isCompleted, setIsCompleted] = useState(() =>
    lessonId ? !!getProgress()[lessonId] : false
  );

  const chapters = useMemo(() => (lesson ? toChapters(lesson.sections) : []), [lesson]);
  const numberedTotal = useMemo(
    () => chapters.filter((c) => c.titleSection).length,
    [chapters]
  );
  /** Only the very first paragraph of the lesson gets the drop cap. */
  const dropCapIndex = useMemo(
    () => (lesson ? lesson.sections.findIndex((s) => s.type === 'paragraph') : -1),
    [lesson]
  );

  // Layout resets #main-content's scrollTop between routes, but that element
  // never scrolls — the document does. Without this, opening the next lesson
  // dropped you into the middle of it.
  useEffect(() => {
    document.getElementById('main-content')?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [lessonId]);

  // Reading progress + condensed header. Measured from the article's rect
  // because no ancestor here reports a usable scrollTop.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const masthead = mastheadRef.current;
      if (masthead) setCondensed(masthead.getBoundingClientRect().bottom < 4);

      const article = articleRef.current;
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const ratio = span <= 0 ? (rect.bottom <= window.innerHeight ? 1 : 0) : -rect.top / span;
      setScrollProgress(Math.min(1, Math.max(0, ratio)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    // Capture phase: scroll events do not bubble, but they do capture, so this
    // works whether the document or some ancestor turns out to be the scroller.
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
    };
  }, [lessonId]);

  const handleMarkComplete = useCallback(() => {
    if (!lesson || isCompleted) return;
    const p = getProgress();
    p[lesson.id] = true;
    localStorage.setItem('zl_lesson_progress', JSON.stringify(p));
    setIsCompleted(true);
    haptic('medium');
    celebrateLessonComplete();
  }, [lesson, isCompleted]);

  if (!lesson || !category) return <Navigate to="/home" replace />;

  const title = (isEs && lesson.titleEs?.trim()) || lesson.title;
  const subtitle = (isEs && lesson.subtitleEs?.trim()) || lesson.subtitle;
  const categoryTitle = (isEs && category.titleEs?.trim()) || category.title;
  const back = t('lessonBack');

  return (
    <div className="relative">
      {/* ── Fixed chrome: reading progress + condensed title bar ───────────── */}
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-app"
        initial={false}
        animate={{ y: condensed ? '0%' : '-101%' }}
        transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
      >
        {/* Opaque on purpose: framer-motion's transform on the wrapper breaks
            backdrop-filter, so a translucent bar ghosted the text underneath. */}
        <div className="pointer-events-auto border-b border-line bg-surface pt-safe">
          <div className="flex items-center gap-1 px-2 py-1.5">
            <button
              type="button"
              onClick={() => navigate(`/category/${category.id}`)}
              className="btn-icon shrink-0 border-transparent bg-transparent"
              aria-label={back}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <p className="min-w-0 flex-1 truncate text-caption font-semibold text-ink">{title}</p>
            <span className="shrink-0 pr-2 text-caption tabular-nums text-ink-3">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </motion.div>

      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[41] mx-auto w-full max-w-app pt-safe"
        aria-hidden="true"
      >
        <div className="h-[3px] w-full">
          <motion.div
            className="h-full rounded-r-full bg-teal"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* ── Masthead ───────────────────────────────────────────────────────── */}
      <header ref={mastheadRef} className="relative overflow-hidden px-5 pb-12 pt-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 80% at 8% 0%, rgb(var(--teal) / 0.18) 0%, transparent 62%), radial-gradient(100% 70% at 96% 10%, rgb(var(--gold) / 0.16) 0%, transparent 60%)',
          }}
        />

        <div className="relative">
          <button
            type="button"
            onClick={() => navigate(`/category/${category.id}`)}
            className="-ml-2 inline-flex min-h-touch items-center gap-1 pr-3 text-body-small font-medium text-ink-2"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            {back}
          </button>

          {/* One metadata line, plus a slim chip. This used to be five lines in
              three different sizes, most of them 10px. */}
          <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            <p className="text-overline text-teal-strong">{categoryTitle}</p>

            {isLocked ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-danger-tint px-2.5 py-1 text-caption font-semibold text-danger">
                <Lock size={12} aria-hidden="true" />
                {t('locked')}
              </span>
            ) : (
              tierInfo && (
                <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-caption font-semibold text-ink-2">
                  <span className="tabular-nums">
                    {tierInfo.tierNum}/{tierInfo.totalTiers}
                  </span>
                  {' · '}
                  {tierInfo.tierName}
                </span>
              )
            )}
          </div>

          <h1 className="mt-3 font-brand text-h1 text-ink">{title}</h1>
          <p className="mt-2 max-w-[32rem] text-body text-ink-2">{subtitle}</p>
        </div>
      </header>

      {/* ── The sheet ──────────────────────────────────────────────────────── */}
      <div className="-mt-6 rounded-feature border-t border-line bg-surface shadow-feature">
        <article
          ref={articleRef}
          className="px-5 pt-8"
          aria-hidden={isLocked ? true : undefined}
        >
          <div className="mx-auto max-w-[34rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {chapters.map((chapter, ci) => {
                  const body = chapter.entries.map(({ section, index }) => (
                    <SectionRenderer
                      key={index}
                      section={section}
                      sub={sub}
                      isEs={isEs}
                      storageKey={`${lesson.id}-${index}`}
                      dropCap={index === dropCapIndex}
                    />
                  ));

                  if (!chapter.titleSection) return <div key={`lede-${ci}`}>{body}</div>;

                  return (
                    <LessonSection
                      key={`ch-${ci}`}
                      sectionNumber={chapters.slice(0, ci).filter((c) => c.titleSection).length + 1}
                      totalSections={numberedTotal}
                      title={sub(getText(chapter.titleSection, 'text', isEs) || '')}
                    >
                      {body}
                    </LessonSection>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </article>

        {/* ── Finish ─────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-[34rem] px-5 pb-10 pt-3">
          <div className="border-t border-line pt-7">
            {!isCompleted ? (
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={handleMarkComplete}
                className="btn-primary w-full py-4 text-button"
              >
                <Check size={20} strokeWidth={2.5} aria-hidden="true" />
                {t('lessonMarkComplete')}
              </motion.button>
            ) : (
              <div className="space-y-3">
                <motion.p
                  initial={{ scale: 0.94, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex min-h-touch w-full items-center justify-center gap-2 rounded-full border border-success/30 bg-success-tint py-3 text-button font-semibold text-success"
                >
                  <Check size={20} strokeWidth={3} aria-hidden="true" />
                  {t('lessonCompleted')}
                </motion.p>

                {lesson.quiz && lesson.quiz.length > 0 && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/lesson/${lesson.id}/quiz`)}
                    className="btn-secondary w-full py-4 text-button"
                  >
                    {t('lessonTakeQuiz')}
                  </motion.button>
                )}

                {nextUnlockedLesson && !isLocked && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/lesson/${nextUnlockedLesson.id}`)}
                    className="btn-quiet w-full justify-between py-3 text-left"
                  >
                    <span className="min-w-0">
                      <span className="block text-overline text-ink-3">
                        {t('lessonNextLesson')}
                      </span>
                      <span className="block truncate text-body-small font-semibold text-ink">
                        {(isEs && nextUnlockedLesson.titleEs?.trim()) || nextUnlockedLesson.title}
                      </span>
                    </span>
                    <ChevronRight size={18} className="shrink-0 text-ink-3" aria-hidden="true" />
                  </motion.button>
                )}
              </div>
            )}

            {/* The tier hint used to sit above the lesson title, where it was
                noise. Here it explains what finishing actually unlocks. */}
            {tierInfo?.nextTierName && (
              <p className="mt-5 text-center text-caption text-ink-3">
                {tierInfo.nextTierUnlocked ? (
                  <>
                    {isEs ? 'Siguiente nivel desbloqueado: ' : 'Next tier unlocked: '}
                    <span className="font-semibold text-teal-strong">{tierInfo.nextTierName}</span>
                  </>
                ) : (
                  <>
                    {isEs
                      ? `Completa el ${UNLOCK_THRESHOLD}% de este nivel para desbloquear `
                      : `Complete ${UNLOCK_THRESHOLD}% of this tier to unlock `}
                    <span className="font-semibold text-teal-strong">{tierInfo.nextTierName}</span>
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Lock overlay ───────────────────────────────────────────────────── */}
      {isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 z-40 mx-auto flex w-full max-w-app flex-col items-center justify-center bg-background/92 px-8 text-center backdrop-blur-md"
        >
          <span className="grid h-16 w-16 place-items-center rounded-feature bg-surface-sunken text-ink-3">
            <Lock size={28} aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-brand text-h2 text-ink">
            {isEs ? 'Lección bloqueada' : 'Lesson locked'}
          </h2>
          <p className="mt-2 max-w-[17rem] text-body-small text-ink-2">
            {isEs
              ? 'Completa el nivel anterior para desbloquear esta lección.'
              : 'Finish the previous tier to unlock this lesson.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/training')}
            className="btn-secondary mt-7"
          >
            {isEs ? 'Ir al centro de formación' : 'Go to Training Hub'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/category/${category.id}`)}
            className="mt-2 inline-flex min-h-touch items-center px-4 text-body-small font-medium text-ink-2"
          >
            {back}
          </button>
        </motion.div>
      )}
    </div>
  );
}
