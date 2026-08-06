import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  DoorOpen,
  Star,
  Zap,
  TrendingUp,
  Moon,
  Check,
  Flame,
  Minus,
  Plus,
} from 'lucide-react';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { useProgress } from '../hooks/useProgress';
import { useLanguage } from '../contexts/LanguageContext';
import { focusTechniques } from '../data/dailyDoses';

// Another screen that shipped with no translation calls at all.
const COPY = {
  en: {
    title: 'Shift done',
    tagline: "Two minutes of reflection and it's yours to keep.",
    q1: 'How many people did you stop?',
    q2: 'How many did you bring inside?',
    q3: 'Best moment of the day?',
    q3Placeholder: 'The compliment stop that landed perfectly…',
    q4: 'Biggest challenge?',
    q4Placeholder: 'Rejections early in the shift…',
    q5: "Did you try today's focus technique?",
    yes: 'Yes, nailed it',
    no: 'Not today',
    q6: 'Rate your energy',
    energy: ['Drained', 'Low', 'Okay', 'Good', 'Fully charged'],
    energyStar: (n: number) => `Rate energy ${n} out of 5`,
    decreaseStops: 'One fewer stop',
    increaseStops: 'One more stop',
    decreaseInside: 'One fewer brought inside',
    increaseInside: 'One more brought inside',
    stopsLabel: 'People stopped',
    insideLabel: 'People brought inside',
    streakTitle: (n: number) => `${n}-day streak active`,
    streakBody: 'Finish this reflection to keep it alive.',
    submit: 'Complete reflection',
    submitBlocked: 'Fill every field to submit',
    xpNote: '+10 XP and your streak protected',
    doneTitle: 'Reflection saved · +10 XP',
    streakKept: (n: number) => `${n}-day streak kept`,
    summary: "Today's summary",
    stops: 'Stops',
    inside: 'Inside',
    conversion: 'Conversion',
    energyLabel: 'Energy',
    improving: 'You are improving. Keep pushing those numbers up.',
    redirecting: 'Taking you to the dashboard…',
  },
  es: {
    title: 'Turno terminado',
    tagline: 'Dos minutos de reflexión y te los llevas.',
    q1: '¿A cuántas personas has parado?',
    q2: '¿A cuántas has metido dentro?',
    q3: '¿El mejor momento del día?',
    q3Placeholder: 'El cumplido que funcionó perfecto…',
    q4: '¿Tu mayor reto?',
    q4Placeholder: 'Los rechazos al principio del turno…',
    q5: '¿Has probado la técnica de foco de hoy?',
    yes: 'Sí, clavada',
    no: 'Hoy no',
    q6: 'Puntúa tu energía',
    energy: ['Agotada', 'Baja', 'Normal', 'Buena', 'A tope'],
    energyStar: (n: number) => `Puntuar energía ${n} de 5`,
    decreaseStops: 'Una parada menos',
    increaseStops: 'Una parada más',
    decreaseInside: 'Una persona menos dentro',
    increaseInside: 'Una persona más dentro',
    stopsLabel: 'Personas paradas',
    insideLabel: 'Personas metidas dentro',
    streakTitle: (n: number) => `${n} días de racha activa`,
    streakBody: 'Termina esta reflexión para mantenerla viva.',
    submit: 'Completar reflexión',
    submitBlocked: 'Rellena todos los campos',
    xpNote: '+10 XP y tu racha protegida',
    doneTitle: 'Reflexión guardada · +10 XP',
    streakKept: (n: number) => `${n} días de racha mantenida`,
    summary: 'Resumen de hoy',
    stops: 'Paradas',
    inside: 'Dentro',
    conversion: 'Conversión',
    energyLabel: 'Energía',
    improving: 'Vas mejorando. Sigue subiendo esos números.',
    redirecting: 'Te llevamos al panel…',
  },
};

/** Number field shared by both counters — including its focus ring. */
function CounterField({
  value,
  onChange,
  label,
  decreaseLabel,
  increaseLabel,
}: {
  value: string;
  onChange: (next: string) => void;
  label: string;
  decreaseLabel: string;
  increaseLabel: string;
}) {
  const step = (delta: number) => {
    const current = value === '' ? 0 : Number(value);
    onChange(String(Math.max(0, current + delta)));
  };

  return (
    <div className="surface-flat p-4">
      <div className="flex items-center justify-center gap-4">
        <button type="button" onClick={() => step(-1)} className="btn-icon" aria-label={decreaseLabel}>
          <Minus className="h-5 w-5" aria-hidden="true" />
        </button>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={value}
          aria-label={label}
          onChange={(e) => onChange(e.target.value === '' ? '' : String(Math.max(0, Number(e.target.value))))}
          placeholder="0"
          // `outline-none` used to be set here with nothing put back, so these
          // fields had no focus indicator at all; the placeholder sat at 2.08:1.
          className="h-touch w-24 rounded-card border border-line bg-surface-sunken text-center text-h1 font-bold tabular-nums text-teal-strong placeholder:text-ink-3 focus:border-teal-strong"
        />
        <button type="button" onClick={() => step(1)} className="btn-icon" aria-label={increaseLabel}>
          <Plus className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default function EndOfShift() {
  const navigate = useNavigate();
  const { endOfShift, getCurrentStreak, todayState } = useDailyFlow();
  const { awardXP } = useProgress();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = COPY[isEs ? 'es' : 'en'];

  const [stops, setStops] = useState('');
  const [inside, setInside] = useState('');
  const [bestMoment, setBestMoment] = useState('');
  const [challenge, setChallenge] = useState('');
  const [triedFocus, setTriedFocus] = useState<boolean | null>(null);
  const [energyRating, setEnergyRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const streak = getCurrentStreak();
  const focusId = todayState?.checkIn?.focus ?? focusTechniques[0].id;
  const focus = focusTechniques.find((f) => f.id === focusId);
  const focusLabel = focus ? (isEs ? focus.labelEs : focus.label) : '';

  const canSubmit =
    stops !== '' &&
    inside !== '' &&
    bestMoment.trim().length > 0 &&
    challenge.trim().length > 0 &&
    triedFocus !== null &&
    energyRating > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    endOfShift({
      stops: Number(stops),
      inside: Number(inside),
      bestMoment: bestMoment.trim(),
      challenge: challenge.trim(),
      triedFocus,
      energyRating,
    });
    // The +10 XP the screen promises now goes into the real total, once a day.
    awardXP('endshift', 10, 'End-of-shift reflection');
    setSubmitted(true);
    setTimeout(() => navigate('/'), 3500);
  };

  const section = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 + i * 0.06, duration: 0.35 },
    }),
  };

  const textareaClass =
    'w-full resize-none rounded-card border border-line bg-surface-sunken px-4 py-3 text-body-small text-ink placeholder:text-ink-3 focus:border-teal-strong';

  return (
    <div className="min-h-screen bg-background px-5 py-8 pb-safe text-ink">
      <div className="mx-auto max-w-app">
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-feature bg-violet-tint text-violet-strong">
            <Moon className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="mb-1 text-h1 text-ink">{t.title}</h1>
          <p className="text-body-small text-ink-2">{t.tagline}</p>
        </motion.header>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-6"
            >
              {/* Stops */}
              <motion.section custom={0} variants={section} initial="hidden" animate="visible">
                <h2 className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <Users className="h-4 w-4 text-teal-strong" aria-hidden="true" />
                  {t.q1}
                </h2>
                <CounterField
                  value={stops}
                  onChange={setStops}
                  label={t.stopsLabel}
                  decreaseLabel={t.decreaseStops}
                  increaseLabel={t.increaseStops}
                />
              </motion.section>

              {/* Inside */}
              <motion.section custom={1} variants={section} initial="hidden" animate="visible">
                <h2 className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <DoorOpen className="h-4 w-4 text-teal-strong" aria-hidden="true" />
                  {t.q2}
                </h2>
                <CounterField
                  value={inside}
                  onChange={setInside}
                  label={t.insideLabel}
                  decreaseLabel={t.decreaseInside}
                  increaseLabel={t.increaseInside}
                />
              </motion.section>

              {/* Best moment */}
              <motion.section custom={2} variants={section} initial="hidden" animate="visible">
                <label htmlFor="best-moment" className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <Star className="h-4 w-4 text-gold-strong" aria-hidden="true" />
                  {t.q3}
                </label>
                <textarea
                  id="best-moment"
                  value={bestMoment}
                  onChange={(e) => setBestMoment(e.target.value)}
                  placeholder={t.q3Placeholder}
                  rows={3}
                  className={textareaClass}
                />
              </motion.section>

              {/* Challenge */}
              <motion.section custom={3} variants={section} initial="hidden" animate="visible">
                <label htmlFor="challenge" className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <Zap className="h-4 w-4 text-coral-strong" aria-hidden="true" />
                  {t.q4}
                </label>
                <textarea
                  id="challenge"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder={t.q4Placeholder}
                  rows={3}
                  className={textareaClass}
                />
              </motion.section>

              {/* Focus */}
              <motion.section custom={4} variants={section} initial="hidden" animate="visible">
                <h2 className="mb-2 text-overline text-ink-3">{t.q5}</h2>
                <p className="mb-3 text-caption text-ink-2">{focusLabel}</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    aria-pressed={triedFocus === true}
                    onClick={() => setTriedFocus(true)}
                    className={`min-h-touch flex-1 rounded-card border text-body-small font-semibold transition-colors ${
                      triedFocus === true
                        ? 'border-teal bg-teal-tint text-teal-strong'
                        : 'border-line bg-surface text-ink-2'
                    }`}
                  >
                    {t.yes}
                  </button>
                  <button
                    type="button"
                    aria-pressed={triedFocus === false}
                    onClick={() => setTriedFocus(false)}
                    className={`min-h-touch flex-1 rounded-card border text-body-small font-semibold transition-colors ${
                      triedFocus === false
                        ? 'border-coral bg-coral-tint text-coral-strong'
                        : 'border-line bg-surface text-ink-2'
                    }`}
                  >
                    {t.no}
                  </button>
                </div>
              </motion.section>

              {/* Energy */}
              <motion.section custom={5} variants={section} initial="hidden" animate="visible">
                <h2 className="mb-3 text-overline text-ink-3">{t.q6}</h2>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileTap={{ scale: 0.88 }}
                      onClick={() => setEnergyRating(star)}
                      aria-label={t.energyStar(star)}
                      aria-pressed={energyRating === star}
                      className="flex h-touch w-touch items-center justify-center rounded-full"
                    >
                      <Star
                        className={`h-9 w-9 transition-colors ${
                          star <= energyRating
                            ? 'fill-gold text-gold-strong'
                            : 'text-ink-3'
                        }`}
                        aria-hidden="true"
                      />
                    </motion.button>
                  ))}
                </div>
                {energyRating > 0 && (
                  <p className="mt-2 text-center text-caption text-ink-2">
                    {t.energy[energyRating - 1]}
                  </p>
                )}
              </motion.section>

              {/* Streak */}
              {streak > 0 && (
                <motion.div
                  custom={6}
                  variants={section}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-3 rounded-card border border-coral/30 bg-coral-tint px-4 py-3"
                >
                  <Flame className="h-6 w-6 shrink-0 text-coral-strong" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-body-small font-bold text-coral-strong">
                      {t.streakTitle(streak)}
                    </p>
                    <p className="text-caption text-ink-2">{t.streakBody}</p>
                  </div>
                </motion.div>
              )}

              {/* Submit */}
              <motion.div custom={7} variants={section} initial="hidden" animate="visible" className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`w-full ${canSubmit ? 'btn-primary' : 'btn-quiet cursor-not-allowed opacity-60'}`}
                >
                  {canSubmit ? t.submit : t.submitBlocked}
                </button>
                {canSubmit && (
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
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12, stiffness: 140 }}
                className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal text-on-teal"
              >
                <Check className="h-10 w-10" aria-hidden="true" />
              </motion.div>

              <h2 className="mb-1 text-h2 text-ink">{t.doneTitle}</h2>

              {streak > 0 && (
                <p className="mb-4 flex items-center gap-1.5 text-body-small font-semibold text-coral-strong">
                  <Flame className="h-4 w-4" aria-hidden="true" />
                  {t.streakKept(streak)}
                </p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="surface-raised mt-4 w-full p-5"
              >
                <div className="mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-teal-strong" aria-hidden="true" />
                  <span className="text-overline text-ink-3">{t.summary}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <SummaryTile label={t.stops} value={stops || '0'} />
                  <SummaryTile label={t.inside} value={inside || '0'} />
                  <SummaryTile
                    label={t.conversion}
                    value={`${Number(stops) > 0 ? Math.round((Number(inside) / Number(stops)) * 100) : 0}%`}
                  />
                  <SummaryTile label={t.energyLabel} value={`${energyRating}/5`} />
                </div>
              </motion.div>

              {Number(stops) >= Number(inside) * 2 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-6 text-body-small text-ink-2"
                >
                  {t.improving}
                </motion.p>
              )}

              <p className="mt-4 text-caption text-ink-3">{t.redirecting}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card bg-surface-sunken p-3 text-center">
      <p className="text-h2 tabular-nums text-teal-strong">{value}</p>
      <p className="text-caption text-ink-2">{label}</p>
    </div>
  );
}
