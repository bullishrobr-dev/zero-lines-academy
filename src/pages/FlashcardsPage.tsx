import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Flame, RotateCcw, Trophy, Zap, Sparkles, Sun,
} from 'lucide-react';
import { useFlashcards } from '../hooks/useFlashcards';
import { useLanguage } from '../contexts/LanguageContext';
import { type Flashcard, getCategoryById } from '../data/flashcards';

type Rating = 'again' | 'hard' | 'good' | 'easy';

const R_EN = [
  { k: 'again' as Rating, l: 'Again', i: '1d', b: 'bg-red-500/20', t: 'text-red-400', d: 'border-red-500/30', h: 'hover:bg-red-500/30' },
  { k: 'hard' as Rating, l: 'Hard', i: '3d', b: 'bg-orange-500/20', t: 'text-orange-400', d: 'border-orange-500/30', h: 'hover:bg-orange-500/30' },
  { k: 'good' as Rating, l: 'Good', i: '7d', b: 'bg-emerald-500/20', t: 'text-emerald-400', d: 'border-emerald-500/30', h: 'hover:bg-emerald-500/30' },
  { k: 'easy' as Rating, l: 'Easy', i: '14d', b: 'bg-[#0ABAB5]/20', t: 'text-[#0ABAB5]', d: 'border-[#0ABAB5]/30', h: 'hover:bg-[#0ABAB5]/30' },
];
const R_ES = [
  { k: 'again' as Rating, l: 'Otra vez', i: '1d', b: 'bg-red-500/20', t: 'text-red-400', d: 'border-red-500/30', h: 'hover:bg-red-500/30' },
  { k: 'hard' as Rating, l: 'Difícil', i: '3d', b: 'bg-orange-500/20', t: 'text-orange-400', d: 'border-orange-500/30', h: 'hover:bg-orange-500/30' },
  { k: 'good' as Rating, l: 'Bien', i: '7d', b: 'bg-emerald-500/20', t: 'text-emerald-400', d: 'border-emerald-500/30', h: 'hover:bg-emerald-500/30' },
  { k: 'easy' as Rating, l: 'Fácil', i: '14d', b: 'bg-[#0ABAB5]/20', t: 'text-[#0ABAB5]', d: 'border-[#0ABAB5]/30', h: 'hover:bg-[#0ABAB5]/30' },
];

export default function FlashcardsPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const [sp] = useSearchParams();
  const catId = sp.get('category') ?? undefined;
  const mode = sp.get('mode');
  const morning = mode === 'morning';
  const quick = mode === 'quick';
  const limited = morning || quick;

  const { dueCards: allDue, reviewCard, streak, getCardProgress } = useFlashcards();

  const cards = useMemo<Flashcard[]>(() => {
    let c = catId ? allDue.filter((x) => x.categoryId === catId) : [...allDue];
    return limited && c.length > 5 ? c.slice(0, 5) : c;
  }, [allDue, catId, limited]);

  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [stats, setStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 });
  const [key, setKey] = useState(0);

  const card = cards[idx];
  const done = cards.length === 0 || idx >= cards.length;
  const num = Math.min(idx + 1, cards.length);
  const tot = cards.length;
  const pct = tot > 0 ? (num / tot) * 100 : 0;
  const catName = card ? (getCategoryById(card.categoryId)?.name ?? 'General') : catId ? (getCategoryById(catId)?.name ?? 'General') : 'All Categories';
  const reviewed = stats.again + stats.hard + stats.good + stats.easy;

  const R = isEs ? R_ES : R_EN;

  const onFlip = useCallback(() => setFlip((p) => !p), []);
  const onRate = useCallback((r: Rating) => {
    if (!card) return;
    reviewCard(card.id, r);
    setStats((p) => ({ ...p, [r]: p[r] + 1 }));
    setFlip(false);
    setTimeout(() => { setIdx((p) => p + 1); setKey((k) => k + 1); }, 150);
  }, [card, reviewCard]);
  const onRestart = useCallback(() => {
    setIdx(0); setFlip(false); setStats({ again: 0, hard: 0, good: 0, easy: 0 }); setKey((k) => k + 1);
  }, []);

  // ── EMPTY ──
  if (cards.length === 0) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] px-6 text-center">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0ABAB5]/15">
        <Trophy className="h-12 w-12 text-[#0ABAB5]" />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-2 text-2xl font-bold text-white">{isEs ? '¡Todo al Día! 🎉' : 'All Caught Up! 🎉'}</motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8 max-w-xs text-sm text-white/50">
        {catId ? (isEs ? `No hay cartas pendientes en ${getCategoryById(catId)?.name ?? 'esta categoría'}.` : `No cards due in ${getCategoryById(catId)?.name ?? 'this category'}.`) : (isEs ? 'No hay cartas pendientes. ¡Vuelve mañana!' : 'No cards due for review. Come back tomorrow!')}
      </motion.p>
      <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/flashcard-decks')} className="rounded-xl bg-[#0ABAB5] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#0ABAB5]/90">
        {isEs ? 'Explorar Mazos' : 'Browse Decks'}
      </motion.button>
      {streak > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex items-center gap-2 rounded-full bg-orange-500/15 px-4 py-2">
          <Flame className="h-4 w-4 text-orange-400" />
          <span className="text-sm font-medium text-orange-300">{streak} {isEs ? 'días de racha' : 'day streak'}</span>
        </motion.div>
      )}
    </div>
  );

  // ── COMPLETE ──
  if (done) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] px-6 text-center">
      <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#0ABAB5]/15">
        <Trophy className="h-12 w-12 text-[#0ABAB5]" />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-2 text-2xl font-bold text-white">{isEs ? '¡Completado! 🎉' : 'All Done! 🎉'}</motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-8 text-sm text-white/50">{isEs ? `Repasaste ${reviewed} carta${reviewed !== 1 ? 's' : ''} hoy` : `You reviewed ${reviewed} card${reviewed !== 1 ? 's' : ''} today`}</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-8 grid w-full max-w-[300px] grid-cols-4 gap-2">
        {R.map((r) => (
          <div key={r.k} className={`rounded-xl ${r.b} p-3 text-center`}>
            <div className={`text-lg font-bold ${r.t}`}>{stats[r.k]}</div>
            <div className={`text-[10px] uppercase tracking-wider ${r.t} opacity-60`}>{r.l}</div>
          </div>
        ))}
      </motion.div>
      {streak > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="mb-8 flex items-center gap-2 rounded-full bg-orange-500/15 px-4 py-2">
          <Flame className="h-4 w-4 text-orange-400" />
          <span className="text-sm font-medium text-orange-300">{streak} {isEs ? 'días de racha' : 'day streak'} 🔥</span>
        </motion.div>
      )}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex w-full max-w-[300px] flex-col gap-3">
        <button onClick={onRestart} className="flex items-center justify-center gap-2 rounded-xl bg-[#0ABAB5] py-3.5 text-sm font-semibold text-black transition hover:bg-[#0ABAB5]/90 active:scale-[0.98]">
          <RotateCcw className="h-4 w-4" />{isEs ? 'Repasar de Nuevo' : 'Review Again'}
        </button>
        <button onClick={() => navigate('/flashcard-decks')} className="rounded-xl bg-white/10 py-3.5 text-sm font-medium text-white transition hover:bg-white/15 active:scale-[0.98]">{isEs ? 'Explorar Mazos' : 'Browse Decks'}</button>
      </motion.div>
    </div>
  );

  // ── ACTIVE REVIEW ──
  const prog = getCardProgress(card.id);

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0A]">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-[#0A0A0A]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[430px] items-center px-4 py-3">
          <button onClick={() => navigate(-1)} className="mr-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10">
            <ArrowLeft className="h-5 w-5 text-white/70" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-white/40">{isEs ? `Carta ${num} de ${tot}` : `Card ${num} of ${tot}`}</span>
              <div className="flex items-center gap-2">
                {morning && <span className="flex items-center gap-1 rounded-full bg-yellow-500/15 px-2 py-0.5 text-[10px] font-medium text-yellow-400"><Sun className="h-3 w-3"/>{isEs ? 'Mañana' : 'Morning'}</span>}
                {quick && <span className="flex items-center gap-1 rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-medium text-purple-400"><Zap className="h-3 w-3"/>{isEs ? 'Rápido' : 'Quick'}</span>}
                {streak > 0 && <span className="flex items-center gap-1 text-xs font-medium text-orange-400"><Flame className="h-3.5 w-3.5"/>{streak}</span>}
              </div>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#0ABAB5] transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col px-5 py-5">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="rounded-full bg-[#0ABAB5]/10 px-3 py-1 text-xs font-medium text-[#0ABAB5]">{catName}</span>
          {prog && prog.reviewCount > 0 && <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/40">Reviewed {prog.reviewCount}x</span>}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }} className="flex-1 flex flex-col">
            <div className="relative flex-1 cursor-pointer" style={{ perspective: '1000px', minHeight: '280px' }} onClick={onFlip}>
              <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d', transform: flip ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 0.4s ease' }}>
                {/* Front */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111] p-6 shadow-xl" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0ABAB5]/15">
                    <Zap className="h-7 w-7 text-[#0ABAB5]" />
                  </div>
                  <h3 className="text-center text-lg font-semibold leading-relaxed text-white">{isEs && (card as any).questionEs ? (card as any).questionEs : card.question}</h3>
                  <p className="mt-6 text-xs text-white/30">{isEs ? 'Toca para revelar la respuesta' : 'Tap to reveal answer'}</p>
                </div>
                {/* Back */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-[#0ABAB5]/30 bg-[#0d1f1f] p-6 shadow-xl" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0ABAB5]/20">
                    <Sparkles className="h-7 w-7 text-[#0ABAB5]" />
                  </div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#0ABAB5]/70">{isEs ? 'Respuesta' : 'Answer'}</p>
                  <p className="text-center text-base leading-relaxed text-white/90">{isEs && (card as any).answerEs ? (card as any).answerEs : card.answer}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Rating */}
        <div className="mt-6">
          <AnimatePresence>
            {flip ? (
              <motion.div key="r" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.25 }}>
                <p className="mb-3 text-center text-xs font-medium tracking-wide text-white/30 uppercase">{isEs ? '¿Qué tan bien lo sabías?' : 'How well did you know it?'}</p>
                <div className="grid grid-cols-4 gap-2">
                  {R.map((r) => (
                    <motion.button key={r.k} whileTap={{ scale: 0.92 }} onClick={(e) => { e.stopPropagation(); onRate(r.k); }} className={`flex flex-col items-center gap-0.5 rounded-xl border py-3 transition ${r.b} ${r.t} ${r.d} ${r.h}`}>
                      <span className="text-xs font-bold">{r.l}</span>
                      <span className="text-[10px] opacity-70">{r.i}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
                  <Sparkles className="h-4 w-4 text-[#0ABAB5]/50" />
                  <span className="text-xs text-white/40">{isEs ? 'Toca la carta para voltear' : 'Tap card to flip'}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
