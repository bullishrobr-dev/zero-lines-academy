import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, CheckCircle, Zap, MessageCircle, Puzzle,
  TrendingUp, Dumbbell, Trophy, RefreshCw, ListOrdered,
} from 'lucide-react';
import { generalExercises, type RolePlayContent, type PriceDrillContent, type MatchingContent, type OrderingContent } from '../data/generalExercises';

/* ─── icon map ─── */
const typeIcon: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  roleplay: MessageCircle,
  pricedrill: TrendingUp,
  matching: Puzzle,
  ordering: ListOrdered,
  scenario: MessageCircle,
};

const typeLabel: Record<string, string> = {
  roleplay: 'Role-Play',
  pricedrill: 'Price Drill',
  matching: 'Matching',
  ordering: 'Ordering',
  scenario: 'Scenario',
};

type View = 'hub' | 'exercise' | 'results';
type Tab = 'all' | 'roleplay' | 'pricedrill' | 'matching' | 'ordering';

export default function ExercisesPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>('hub');
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  const exercise = generalExercises.find((e) => e.id === activeExerciseId) ?? null;

  const startExercise = useCallback((id: string) => {
    setActiveExerciseId(id);
    setScore(0);
    setView('exercise');
  }, []);

  const finishExercise = useCallback((earned: number) => {
    setScore(earned);
    setCompleted((prev) => prev.includes(activeExerciseId!) ? prev : [...prev, activeExerciseId!]);
    setView('results');
  }, [activeExerciseId]);

  const resetAll = useCallback(() => {
    setView('hub');
    setScore(0);
    setActiveExerciseId(null);
  }, []);

  const filtered = activeTab === 'all'
    ? generalExercises
    : generalExercises.filter((e) => e.type === activeTab);

  /* ─── Hub ─── */
  if (view === 'hub') {
    return (
      <div className="min-h-full bg-[#0A0A0A] pb-24">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            onClick={() => navigate('/home')}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] active:scale-95 transition-transform"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>
          <h1 className="text-h3 text-white">Exercises</h1>
          <div className="w-11" />
        </div>

        <div className="px-6 mt-3">
          <div className="flex items-center gap-2">
            <Dumbbell size={22} className="text-[#0ABAB5]" />
            <h2 className="text-h1 text-white">PRACTICE</h2>
          </div>
          <p className="text-body text-[#B0B0B0] mt-1">Sharpen your skills with real scenarios</p>
        </div>

        {/* Stats */}
        <div className="flex gap-2 px-6 mt-4">
          <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-2">
            <CheckCircle size={14} className="text-[#22C55E]" />
            <span className="text-caption text-white">{completed.length} done</span>
          </div>
          <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-2">
            <Zap size={14} className="text-[#F59E0B]" />
            <span className="text-caption text-white">{score} pts</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 mt-5 gap-2 overflow-x-auto no-scrollbar">
          {(['all', 'roleplay', 'pricedrill', 'matching', 'ordering'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === t
                  ? 'bg-[#0ABAB5] text-white'
                  : 'bg-[#1A1A1A] text-[#8A8A8A]'
              }`}
            >
              {t === 'all' ? 'All' : typeLabel[t] ?? t}
            </button>
          ))}
        </div>

        {/* Exercise Cards */}
        <div className="px-4 mt-4 space-y-3">
          <AnimatePresence mode="wait">
            {filtered.map((ex, i) => {
              const Icon = typeIcon[ex.type] ?? Puzzle;
              const isDone = completed.includes(ex.id);
              return (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="bg-[#1A1A1A] rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0ABAB5]/15 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-[#0ABAB5]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-h4 text-white">{ex.title}</h4>
                      <p className="text-body-small text-[#8A8A8A] mt-0.5">{ex.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[11px] text-[#0ABAB5] bg-[#0ABAB5]/10 px-2 py-0.5 rounded-full">
                          {typeLabel[ex.type] ?? ex.type}
                        </span>
                        <span className="text-[11px] text-[#F59E0B]">+{ex.xpReward} XP</span>
                      </div>
                    </div>
                    {isDone && <CheckCircle size={18} className="text-[#22C55E] shrink-0" />}
                  </div>
                  <button
                    onClick={() => startExercise(ex.id)}
                    className="w-full mt-3 h-11 bg-[#2A2A2A] rounded-xl flex items-center justify-center active:scale-[0.98] transition-transform"
                  >
                    <span className="text-sm font-medium text-white">{isDone ? 'Practice Again' : 'Start Exercise'}</span>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="h-6" />
      </div>
    );
  }

  /* ─── Exercise View ─── */
  if (view === 'exercise' && exercise) {
    if (exercise.type === 'roleplay' || exercise.type === 'scenario') {
      return (
        <RolePlayView
          content={exercise.content as RolePlayContent}
          title={exercise.title}
          xpReward={exercise.xpReward}
          onFinish={finishExercise}
          onBack={resetAll}
        />
      );
    }
    if (exercise.type === 'pricedrill') {
      return (
        <PriceDrillView
          content={exercise.content as PriceDrillContent}
          title={exercise.title}
          xpReward={exercise.xpReward}
          onFinish={finishExercise}
          onBack={resetAll}
        />
      );
    }
    if (exercise.type === 'matching') {
      return (
        <MatchingView
          content={exercise.content as MatchingContent}
          title={exercise.title}
          xpReward={exercise.xpReward}
          onFinish={finishExercise}
          onBack={resetAll}
        />
      );
    }
    if (exercise.type === 'ordering') {
      return (
        <OrderingView
          content={exercise.content as OrderingContent}
          title={exercise.title}
          xpReward={exercise.xpReward}
          onFinish={finishExercise}
          onBack={resetAll}
        />
      );
    }
  }

  /* ─── Results ─── */
  if (view === 'results') {
    return (
      <div className="min-h-full bg-[#0A0A0A] flex flex-col items-center px-6 pt-12 pb-24">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
          <Trophy size={48} className="text-[#D4A843] mb-4" />
          <h2 className="text-h1 text-white">Exercise Complete!</h2>
          <p className="text-body text-[#8A8A8A] mt-2">You earned {score} points</p>
        </motion.div>
        <div className="w-full flex flex-col gap-3 mt-8">
          <button onClick={resetAll} className="w-full h-14 bg-[#0ABAB5] rounded-full flex items-center justify-center gap-2 active:scale-[0.97] transition-transform">
            <RefreshCw size={18} className="text-white" />
            <span className="text-button text-white">Practice Again</span>
          </button>
          <button onClick={() => navigate('/home')} className="w-full h-12 border border-[#0ABAB5] rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-[#0ABAB5]">Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}

/* ═══════════════════════ RolePlayView ═══════════════════════ */
function RolePlayView({ content, title, xpReward, onFinish, onBack }: {
  content: RolePlayContent; title: string; xpReward: number;
  onFinish: (s: number) => void; onBack: () => void;
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const bestScore = selectedIdx !== null ? content.responses[selectedIdx]?.score ?? 0 : 0;

  return (
    <div className="min-h-full bg-[#0A0A0A] pb-24">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] active:scale-95 transition-transform">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="flex-1 min-w-0"><h3 className="text-h4 text-white truncate">{title}</h3></div>
      </div>

      {/* Customer Profile */}
      <div className="px-4 mt-3">
        <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0F0F0F] rounded-xl p-4 border border-[#2A2A2A]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0ABAB5]/20 flex items-center justify-center">
              <MessageCircle size={22} className="text-[#0ABAB5]" />
            </div>
            <div>
              <h4 className="text-h4 text-white">{content.customerName}</h4>
              <p className="text-caption text-[#8A8A8A]">{content.customerProfile}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario */}
      <div className="px-4 mt-4">
        <div className="bg-[#0ABAB5]/10 border border-[#0ABAB5]/20 rounded-xl p-4">
          <p className="text-body text-white italic leading-relaxed">&ldquo;{content.scenario}&rdquo;</p>
        </div>
      </div>

      {/* Responses */}
      <div className="px-4 mt-5 space-y-2.5">
        <p className="text-overline text-[#8A8A8A] mb-1">CHOOSE YOUR RESPONSE:</p>
        {content.responses.map((r, i) => {
          const isSelected = selectedIdx === i;
          let btnClass = 'bg-[#1A1A1A] border-[#2A2A2A]';
          if (selectedIdx !== null) {
            if (r.score >= 80) btnClass = 'bg-[#22C55E]/15 border-[#22C55E]';
            else if (r.score >= 40) btnClass = 'bg-[#F59E0B]/15 border-[#F59E0B]';
            else btnClass = 'bg-[#EF4444]/15 border-[#EF4444]';
          } else if (isSelected) btnClass = 'bg-[#0ABAB5]/15 border-[#0ABAB5]';

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedIdx(i)}
              disabled={selectedIdx !== null}
              className={`w-full text-left p-4 rounded-xl border transition-all ${btnClass}`}
            >
              <p className="text-body-small text-white">{r.text}</p>
              {selectedIdx !== null && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 pt-3 border-t border-white/10">
                  <p className={`text-sm font-semibold ${r.score >= 80 ? 'text-[#22C55E]' : r.score >= 40 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                    {r.score >= 80 ? 'Excellent!' : r.score >= 40 ? 'Okay, but could be better' : 'Not the best approach'}
                  </p>
                  <p className="text-caption text-[#B0B0B0] mt-1">{r.feedback}</p>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedIdx !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 mt-6">
          <button
            onClick={() => onFinish(Math.round(bestScore / 100 * xpReward))}
            className="w-full h-14 bg-[#0ABAB5] rounded-full flex items-center justify-center active:scale-[0.97] transition-transform"
          >
            <span className="text-button text-white">Continue</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════ PriceDrillView ═══════════════════════ */
function PriceDrillView({ content, title, xpReward, onFinish, onBack }: {
  content: PriceDrillContent; title: string; xpReward: number;
  onFinish: (s: number) => void; onBack: () => void;
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showExp, setShowExp] = useState(false);
  const correct = content.options.find((o) => o.correct);

  return (
    <div className="min-h-full bg-[#0A0A0A] pb-24">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] active:scale-95 transition-transform">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="flex-1 min-w-0"><h3 className="text-h4 text-white truncate">{title}</h3></div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-[#1A1A1A] rounded-xl p-5 text-center">
          <p className="text-caption text-[#8A8A8A]">Product</p>
          <p className="text-h3 text-white mt-1">{content.product}</p>
        </div>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-[#0ABAB5]/10 border border-[#0ABAB5]/20 rounded-xl p-4">
          <p className="text-caption text-[#8A8A8A] mb-1">Customer Reaction</p>
          <p className="text-body text-white italic">&ldquo;{content.customerReaction}&rdquo;</p>
        </div>
      </div>

      <div className="px-4 mt-5 space-y-2.5">
        <p className="text-overline text-[#8A8A8A] mb-1">WHAT IS YOUR NEXT PRICE STEP?</p>
        {content.options.map((opt, i) => {
          const isSel = selectedIdx === i;
          const isCor = opt.correct;
          let cls = 'bg-[#1A1A1A] border-[#2A2A2A]';
          if (selectedIdx !== null) {
            if (isCor) cls = 'bg-[#22C55E]/15 border-[#22C55E]';
            else if (isSel) cls = 'bg-[#EF4444]/15 border-[#EF4444]';
            else cls = 'bg-[#1A1A1A] border-[#2A2A2A] opacity-40';
          }
          return (
            <motion.button key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              onClick={() => { if (selectedIdx === null) { setSelectedIdx(i); setShowExp(true); } }}
              disabled={selectedIdx !== null}
              className={`w-full text-left p-4 rounded-xl border transition-all ${cls}`}>
              <p className="text-body-small text-white">{opt.text}</p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showExp && correct && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-4 mt-4">
            <div className={`p-4 rounded-xl border ${selectedIdx !== null && content.options[selectedIdx]?.correct ? 'bg-[#22C55E]/10 border-[#22C55E]/30' : 'bg-[#F59E0B]/10 border-[#F59E0B]/30'}`}>
              <p className={`text-sm font-semibold ${selectedIdx !== null && content.options[selectedIdx]?.correct ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>
                {selectedIdx !== null && content.options[selectedIdx]?.correct ? 'Correct!' : 'Good to know'}
              </p>
              <p className="text-body-small text-[#B0B0B0] mt-1">{correct.explanation}</p>
            </div>
            <button onClick={() => onFinish(selectedIdx !== null && content.options[selectedIdx]?.correct ? xpReward : Math.round(xpReward * 0.5))}
              className="w-full mt-4 h-14 bg-[#0ABAB5] rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
              <span className="text-button text-white">Continue</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════ MatchingView ═══════════════════════ */
function MatchingView({ content, title, xpReward, onFinish, onBack }: {
  content: MatchingContent; title: string; xpReward: number;
  onFinish: (s: number) => void; onBack: () => void;
}) {
  const [matches, setMatches] = useState<Record<number, number>>({});
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const pairs = content.pairs;
  const correctCount = Object.entries(matches).filter(([termIdx, defIdx]) => Number(defIdx) === Number(termIdx)).length;

  return (
    <div className="min-h-full bg-[#0A0A0A] pb-24">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] active:scale-95 transition-transform">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="flex-1 min-w-0"><h3 className="text-h4 text-white truncate">{title}</h3></div>
      </div>

      <div className="px-4 mt-3">
        <p className="text-overline text-[#8A8A8A]">MATCH THE TERM WITH ITS DEFINITION</p>
        <p className="text-caption text-[#8A8A8A] mt-1">{correctCount} of {pairs.length} matched</p>
      </div>

      <div className="px-4 mt-4 space-y-2">
        {pairs.map((pair, i) => (
          <motion.button key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => {
              if (selectedTerm === null) { setSelectedTerm(i); }
              else if (selectedTerm === i) { setSelectedTerm(null); }
              else { setMatches((m) => ({ ...m, [selectedTerm]: i })); setSelectedTerm(null); }
            }}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedTerm === i ? 'bg-[#0ABAB5]/15 border-[#0ABAB5]' :
              matches[i] !== undefined ? (Number(matches[i]) === i ? 'bg-[#22C55E]/15 border-[#22C55E]' : 'bg-[#EF4444]/15 border-[#EF4444]') :
              'bg-[#1A1A1A] border-[#2A2A2A]'
            }`}>
            <p className="text-body-small text-white font-semibold">{pair.term}</p>
            {matches[i] !== undefined && (
              <p className="text-caption text-[#B0B0B0] mt-1">{pairs[matches[i]]?.definition ?? ''}</p>
            )}
          </motion.button>
        ))}
      </div>

      {Object.keys(matches).length === pairs.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 mt-6">
          <button onClick={() => onFinish(Math.round((correctCount / pairs.length) * xpReward))}
            className="w-full h-14 bg-[#0ABAB5] rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
            <span className="text-button text-white">Finish</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ═══════════════════════ OrderingView ═══════════════════════ */
function OrderingView({ content, title, xpReward, onFinish, onBack }: {
  content: OrderingContent; title: string; xpReward: number;
  onFinish: (s: number) => void; onBack: () => void;
}) {
  const [ordered, setOrdered] = useState<{ text: string; origOrder: number }[]>([]);
  const [remaining, setRemaining] = useState(() =>
    [...content.steps].sort(() => Math.random() - 0.5).map((s) => ({ text: s.text, origOrder: s.correctOrder }))
  );

  const handleTap = (item: { text: string; origOrder: number }) => {
    setOrdered((o) => [...o, item]);
    setRemaining((r) => r.filter((ri) => ri !== item));
  };

  const allPlaced = remaining.length === 0;
  const allCorrect = allPlaced && ordered.every((item, idx) => item.origOrder === idx);

  return (
    <div className="min-h-full bg-[#0A0A0A] pb-24">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1A1A1A] active:scale-95 transition-transform">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="flex-1 min-w-0"><h3 className="text-h4 text-white truncate">{title}</h3></div>
      </div>

      <div className="px-4 mt-3">
        <p className="text-overline text-[#8A8A8A]">TAP STEPS IN THE CORRECT ORDER</p>
        <p className="text-body-small text-[#B0B0B0] mt-1">{content.context}</p>
      </div>

      {/* Ordered so far */}
      {ordered.length > 0 && (
        <div className="px-4 mt-4">
          <div className="bg-[#0ABAB5]/10 border border-[#0ABAB5]/20 rounded-xl p-4">
            <p className="text-caption text-[#0ABAB5] mb-2">Your Order:</p>
            {ordered.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5">
                <span className="text-[#0ABAB5] font-bold text-sm w-5">{i + 1}.</span>
                <p className="text-body-small text-white">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining steps */}
      <div className="px-4 mt-4 space-y-2">
        {remaining.map((item, i) => (
          <motion.button key={`${item.text}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            onClick={() => handleTap(item)}
            className="w-full text-left p-4 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] active:scale-[0.98] transition-transform">
            <p className="text-body-small text-white">{item.text}</p>
          </motion.button>
        ))}
      </div>

      {allPlaced && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 mt-6">
          <div className={`p-4 rounded-xl border ${allCorrect ? 'bg-[#22C55E]/10 border-[#22C55E]' : 'bg-[#F59E0B]/10 border-[#F59E0B]'}`}>
            <p className={`text-sm font-semibold ${allCorrect ? 'text-[#22C55E]' : 'text-[#F59E0B]'}`}>
              {allCorrect ? 'Perfect order!' : 'Not quite right'}
            </p>
            {!allCorrect && <p className="text-caption text-[#B0B0B0] mt-1">Review the correct order and try again.</p>}
          </div>
          <button onClick={() => onFinish(allCorrect ? xpReward : Math.round(xpReward * 0.3))}
            className="w-full mt-4 h-14 bg-[#0ABAB5] rounded-full flex items-center justify-center active:scale-[0.97] transition-transform">
            <span className="text-button text-white">Continue</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
