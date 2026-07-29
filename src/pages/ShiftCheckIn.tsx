import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Flame, Target, ChevronDown, Sparkles, Sunrise, Check, Minus, Plus } from 'lucide-react';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { useLanguage } from '../contexts/LanguageContext';
import { focusTechniques } from '../data/dailyDoses';

// This screen had zero translation calls — it stayed English however the
// language toggle was set. Spanish is European, informal "tú".
const COPY = {
  en: {
    greeting: 'Good morning',
    tagline: 'Ready to make today count?',
    mood: 'How are you feeling?',
    goal: 'How many stops are you going for?',
    decrease: 'Lower the stop goal',
    increase: 'Raise the stop goal',
    goalLabel: 'Stop goal',
    focus: 'One thing to focus on today',
    focusPlaceholder: 'Pick a focus',
    openFocus: 'Choose a focus technique',
    streakTitle: (n: number) => `${n}-day streak`,
    streakHot: 'You are on a run. Keep it going.',
    streakGood: 'Good consistency. Keep it up.',
    streakStart: 'Building momentum. One more day.',
    submit: "Let's go",
    submitBlocked: 'Pick a mood to continue',
    xpNote: '+5 XP for checking in',
    doneTitle: 'Checked in · +5 XP',
    doneSummary: (goal: number, focus: string) => `Goal: ${goal} stops. Focus: ${focus}`,
    redirecting: 'Taking you to the dashboard…',
  },
  es: {
    greeting: 'Buenos días',
    tagline: '¿Lista para que hoy cuente?',
    mood: '¿Cómo te sientes?',
    goal: '¿Cuántas paradas te propones?',
    decrease: 'Bajar el objetivo de paradas',
    increase: 'Subir el objetivo de paradas',
    goalLabel: 'Objetivo de paradas',
    focus: 'Una cosa en la que centrarte hoy',
    focusPlaceholder: 'Elige un foco',
    openFocus: 'Elegir técnica de foco',
    streakTitle: (n: number) => `${n} días de racha`,
    streakHot: 'Estás en racha. Sigue así.',
    streakGood: 'Buena constancia. Sigue.',
    streakStart: 'Vas cogiendo ritmo. Un día más.',
    submit: 'Vamos allá',
    submitBlocked: 'Elige un estado para continuar',
    xpNote: '+5 XP por registrarte',
    doneTitle: 'Registrado · +5 XP',
    doneSummary: (goal: number, focus: string) => `Objetivo: ${goal} paradas. Foco: ${focus}`,
    redirecting: 'Te llevamos al panel…',
  },
};

const MOODS = [
  { emoji: '😴', label: 'Tired', labelEs: 'Cansada', value: 1 },
  { emoji: '😊', label: 'Good', labelEs: 'Bien', value: 2 },
  { emoji: '🔥', label: 'Ready', labelEs: 'Lista', value: 3 },
  { emoji: '💪', label: 'Strong', labelEs: 'Fuerte', value: 4 },
  { emoji: '🚀', label: 'Unstoppable', labelEs: 'Imparable', value: 5 },
];

export default function ShiftCheckIn() {
  const navigate = useNavigate();
  const { checkIn, getCurrentStreak } = useDailyFlow();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = COPY[isEs ? 'es' : 'en'];

  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [stopGoal, setStopGoal] = useState(20);
  const [focusTechnique, setFocusTechnique] = useState(focusTechniques[0].id);
  const [showDropdown, setShowDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const streak = getCurrentStreak();
  const selected = focusTechniques.find((f) => f.id === focusTechnique);
  const focusLabel = selected ? (isEs ? selected.labelEs : selected.label) : t.focusPlaceholder;

  const handleSubmit = () => {
    if (selectedMood === null) return;
    checkIn({ mood: selectedMood, goal: stopGoal, focus: focusTechnique });
    setSubmitted(true);
    setTimeout(() => navigate('/'), 2500);
  };

  return (
    <div className="min-h-screen bg-background px-5 py-8 pb-safe text-ink">
      <div className="mx-auto max-w-app">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-feature bg-gold text-on-gold">
            <Sunrise className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="mb-1 text-h1 text-ink">{t.greeting}</h1>
          <p className="text-body-small text-ink-2">{t.tagline}</p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-7"
            >
              {/* Mood */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <Sparkles className="h-4 w-4 text-teal-strong" aria-hidden="true" />
                  {t.mood}
                </h2>
                <div className="flex justify-between gap-2">
                  {MOODS.map((mood, index) => {
                    const active = selectedMood === mood.value;
                    return (
                      <motion.button
                        key={mood.value}
                        type="button"
                        aria-pressed={active}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + index * 0.04 }}
                        onClick={() => setSelectedMood(mood.value)}
                        className={`flex min-h-touch flex-1 flex-col items-center gap-1.5 rounded-card border px-1 py-3 transition-colors ${
                          active ? 'border-teal bg-teal-tint' : 'border-line bg-surface'
                        }`}
                      >
                        <span className="text-2xl leading-none" aria-hidden="true">
                          {mood.emoji}
                        </span>
                        <span
                          className={`text-center text-caption leading-tight ${
                            active ? 'text-teal-strong' : 'text-ink-2'
                          }`}
                        >
                          {isEs ? mood.labelEs : mood.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.section>

              {/* Stop goal */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <Target className="h-4 w-4 text-teal-strong" aria-hidden="true" />
                  {t.goal}
                </h2>
                <div className="surface-flat p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStopGoal((prev) => Math.max(5, prev - 5))}
                      className="btn-icon"
                      aria-label={t.decrease}
                    >
                      <Minus className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <motion.output
                      key={stopGoal}
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1 }}
                      className="text-display tabular-nums text-teal-strong"
                    >
                      {stopGoal}
                    </motion.output>
                    <button
                      type="button"
                      onClick={() => setStopGoal((prev) => Math.min(50, prev + 5))}
                      className="btn-icon"
                      aria-label={t.increase}
                    >
                      <Plus className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={stopGoal}
                    onChange={(e) => setStopGoal(Number(e.target.value))}
                    className="w-full accent-teal"
                    aria-label={t.goalLabel}
                  />
                  <div className="mt-1 flex justify-between text-caption text-ink-3">
                    <span>5</span>
                    <span>50</span>
                  </div>
                </div>
              </motion.section>

              {/* Focus */}
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <Flame className="h-4 w-4 text-teal-strong" aria-hidden="true" />
                  {t.focus}
                </h2>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown((v) => !v)}
                    aria-expanded={showDropdown}
                    aria-label={t.openFocus}
                    className="flex min-h-touch w-full items-center justify-between gap-3 rounded-card border border-line bg-surface px-4 py-3 text-left"
                  >
                    <span className="text-body-small text-ink">{focusLabel}</span>
                    <motion.span
                      animate={{ rotate: showDropdown ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="h-4 w-4 text-ink-2" aria-hidden="true" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {showDropdown && (
                      <motion.ul
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-card border border-line bg-surface shadow-feature"
                      >
                        {focusTechniques.map((tech) => {
                          const active = focusTechnique === tech.id;
                          return (
                            <li key={tech.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  setFocusTechnique(tech.id);
                                  setShowDropdown(false);
                                }}
                                className={`min-h-touch w-full px-4 py-3 text-left text-body-small ${
                                  active ? 'bg-teal-tint text-teal-strong' : 'text-ink-2'
                                }`}
                              >
                                {isEs ? tech.labelEs : tech.label}
                              </button>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.section>

              {/* Streak */}
              {streak > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center gap-3 rounded-card border border-coral/30 bg-coral-tint px-4 py-3"
                >
                  <Flame className="h-6 w-6 shrink-0 text-coral-strong" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-body-small font-bold text-coral-strong">
                      {t.streakTitle(streak)}
                    </p>
                    <p className="text-caption text-ink-2">
                      {streak >= 7 ? t.streakHot : streak >= 3 ? t.streakGood : t.streakStart}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={selectedMood === null}
                  className={`w-full ${
                    selectedMood !== null ? 'btn-primary' : 'btn-quiet cursor-not-allowed opacity-60'
                  }`}
                >
                  {selectedMood !== null ? t.submit : t.submitBlocked}
                </button>
                {selectedMood !== null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-center text-caption text-ink-3"
                  >
                    {t.xpNote}
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 140 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal text-on-teal"
              >
                <Check className="h-10 w-10" aria-hidden="true" />
              </motion.div>
              <h2 className="mb-2 text-h2 text-ink">{t.doneTitle}</h2>
              <p className="text-body-small text-ink-2">{t.doneSummary(stopGoal, focusLabel)}</p>
              <p className="mt-4 text-caption text-ink-3">{t.redirecting}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
