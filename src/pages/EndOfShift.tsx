// ─────────────────────────────────────────────────────────────────────────────
// EndOfShift — the two minutes at 6pm where the day turns into a lesson.
//
// It is no longer where the streak is won: the streak counts showing up, so it
// was already banked at check-in this morning (see hooks/useDailyFlow.ts). This
// screen is where the seller names the one that got away, which is the only
// part of the day that makes the next one better.
//
// ── WHAT WAS WRONG ──────────────────────────────────────────────────────────
// Seven required fields, two of them free-text essays, and a button that read
// "Fill every field to submit" until every last one was done. The streak and the
// XP both sat behind that wall, at the end of a shift, on a phone, standing up.
//
// Worse, the first question was "How many people did you stop?" — a PAVEMENT
// count. The journal deliberately refuses to collect that number (see the note
// at the top of types/streetTracker.ts: "it measured effort rather than result,
// and nobody could count it honestly anyway"), so the app was refusing to let a
// seller finish their day without a figure it says elsewhere is uncountable.
// Every one of them was guessed, and a guessed number is worse than no number.
//
// ── WHAT THIS IS NOW ────────────────────────────────────────────────────────
//  · The pavement question is gone.
//  · The count of people brought inside is READ BACK from the journal, which
//    has been counting them all day, one tap at a time. It stays editable — the
//    journal misses the ones logged on paper — but nobody has to remember it.
//  · Both essays are optional and say so.
//  · The six slip chips stay REQUIRED, and they are the only long answer left.
//    That is the owner's honest checklist and the single thing on this screen
//    that makes a seller better; softening it would leave a comfort blanket
//    with nothing attached, which is exactly what CLAUDE.md forbids.
//  · The blocked button names what is missing instead of "fill every field".
// ─────────────────────────────────────────────────────────────────────────────

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  DoorOpen,
  Star,
  Zap,
  TrendingUp,
  Moon,
  Check,
  Flame,
  Minus,
  Plus,
  Shield,
} from 'lucide-react';
import { useDailyFlow } from '../hooks/useDailyFlow';
import { useProgress } from '../hooks/useProgress';
import { useStreetTracker } from '../hooks/useStreetTracker';
import { useLanguage } from '../contexts/LanguageContext';
import { focusTechniques } from '../data/dailyDoses';

// Another screen that shipped with no translation calls at all.
const COPY = {
  en: {
    title: 'Shift done',
    tagline: "Two minutes of reflection and it's yours to keep.",
    q2: 'How many did you bring inside?',
    fromJournal: 'Counted from your journal. Change it if you brought more in.',
    optional: 'Optional',
    q3: 'Best moment of the day?',
    q3Placeholder: 'The compliment stop that landed perfectly…',
    q4: 'Biggest challenge?',
    q4Placeholder: 'Rejections early in the shift…',
    q5: "Did you try today's focus technique?",
    yes: 'Yes, nailed it',
    no: 'Not today',
    slipTitle: 'Think of the one that got away today',
    slipHint: 'Be honest — this is the only question on here that makes you better.',
    slips: {
      words: 'I said something wrong',
      step: 'I skipped a step',
      silence: 'I filled the silence',
      lazy: 'I went lazy halfway',
      ladder: 'I stopped early on the ladder',
      none: 'I did everything — they still walked',
    },
    slipLesson: 'That is your lesson, and it only cost you one sale. Take it out to the first one tomorrow.',
    slipAbsolved: 'Then it is not on you. Bad customer, part of the game. Put it down and leave it here.',
    q6: 'Rate your energy',
    energy: ['Drained', 'Low', 'Okay', 'Good', 'Fully charged'],
    energyStar: (n: number) => `Rate energy ${n} out of 5`,
    decreaseInside: 'One fewer brought inside',
    increaseInside: 'One more brought inside',
    insideLabel: 'People brought inside',
    streakTitle: (n: number) => `${n}-day streak active`,
    streakBody: 'Already safe — you checked in this morning. This is the bit you keep.',
    submit: 'Complete reflection',
    /* Naming the one thing that is missing, instead of "fill every field" and
       leaving a tired seller to hunt for it. */
    needSlip: 'Pick the one that got away',
    needFocus: 'Answer the focus question',
    needEnergy: 'Rate your energy',
    xpNote: '+10 XP, and one thing worth taking to tomorrow',
    doneTitle: 'Reflection saved · +10 XP',
    streakKept: (n: number) => `${n}-day streak kept`,
    summary: "Today's summary",
    inside: 'Inside',
    sales: 'Sales',
    conversion: 'Conversion',
    energyLabel: 'Energy',
    improving: 'You are improving. Keep pushing those numbers up.',
    redirecting: 'Taking you to the dashboard…',
  },
  es: {
    title: 'Turno terminado',
    tagline: 'Dos minutos de reflexión y te los llevas.',
    q2: '¿A cuántas has metido dentro?',
    fromJournal: 'Contado desde tu diario. Cámbialo si metiste a más.',
    optional: 'Opcional',
    q3: '¿El mejor momento del día?',
    q3Placeholder: 'El cumplido que funcionó perfecto…',
    q4: '¿Tu mayor reto?',
    q4Placeholder: 'Los rechazos al principio del turno…',
    q5: '¿Has probado la técnica de foco de hoy?',
    yes: 'Sí, clavada',
    no: 'Hoy no',
    slipTitle: 'Piensa en la que se te escapó hoy',
    slipHint: 'Sé sincero — es la única pregunta de aquí que te hace mejor.',
    slips: {
      words: 'Dije algo que no debía',
      step: 'Me salté un paso',
      silence: 'Llené el silencio',
      lazy: 'Aflojé a mitad de camino',
      ladder: 'Paré antes de tiempo en la escalera',
      none: 'Lo hice todo — y aun así se fueron',
    },
    slipLesson: 'Ahí tienes tu lección, y solo te ha costado una venta. Sácala con el primero de mañana.',
    slipAbsolved: 'Entonces no es culpa tuya. Mal cliente, parte del juego. Suéltalo y déjalo aquí.',
    q6: 'Puntúa tu energía',
    energy: ['Agotada', 'Baja', 'Normal', 'Buena', 'A tope'],
    energyStar: (n: number) => `Puntuar energía ${n} de 5`,
    decreaseInside: 'Una persona menos dentro',
    increaseInside: 'Una persona más dentro',
    insideLabel: 'Personas metidas dentro',
    streakTitle: (n: number) => `${n} días de racha activa`,
    streakBody: 'Ya está a salvo — has fichado esta mañana. Esto es lo que te llevas.',
    submit: 'Completar reflexión',
    needSlip: 'Elige la que se te escapó',
    needFocus: 'Contesta a lo del foco',
    needEnergy: 'Puntúa tu energía',
    xpNote: '+10 XP, y una cosa que merece la pena llevarse a mañana',
    doneTitle: 'Reflexión guardada · +10 XP',
    streakKept: (n: number) => `${n} días de racha mantenida`,
    summary: 'Resumen de hoy',
    inside: 'Dentro',
    sales: 'Ventas',
    conversion: 'Conversión',
    energyLabel: 'Energía',
    improving: 'Vas mejorando. Sigue subiendo esos números.',
    redirecting: 'Te llevamos al panel…',
  },
};

/** Local date key — same convention as the journal and useProgress. */
function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * The five ways a seller loses a sale that were their own doing, plus the sixth
 * answer that is not. Order matters: the slips come first and 'none' sits last,
 * so the absolution is what you reach at the END of reading the list rather
 * than the easy first tap.
 */
type SlipId = 'words' | 'step' | 'silence' | 'lazy' | 'ladder' | 'none';
const SLIP_IDS: SlipId[] = ['words', 'step', 'silence', 'lazy', 'ladder', 'none'];

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
  const { getDailySummary } = useStreetTracker();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = COPY[isEs ? 'es' : 'en'];

  /* The journal has been counting all day, one tap per person walked in. Asking
     the seller to remember the same number at 6pm is asking them to guess at
     something the app already knows. Read once, on mount: it becomes the
     starting value of an editable field, not a value that keeps overwriting
     what they typed. */
  const journalToday = useMemo(() => getDailySummary(todayKey()), [getDailySummary]);

  const [inside, setInside] = useState(String(journalToday.stops));
  const [bestMoment, setBestMoment] = useState('');
  const [challenge, setChallenge] = useState('');
  const [triedFocus, setTriedFocus] = useState<boolean | null>(null);
  /* The one that got away — see the `close-fault` lesson and CLAUDE.md. The
     owner's whole method is that a seller is absolved only AFTER the honest
     list, never before, so this sits at the end of the day rather than in the
     middle of a shift where it would read as an excuse. It is the one answer on
     this screen that is still required, and deliberately so. */
  const [slip, setSlip] = useState<SlipId | null>(null);
  const [energyRating, setEnergyRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const streak = getCurrentStreak();
  const focusId = todayState?.checkIn?.focus ?? focusTechniques[0].id;
  const focus = focusTechniques.find((f) => f.id === focusId);
  const focusLabel = focus ? (isEs ? focus.labelEs : focus.label) : '';

  /* Three taps, all of them single taps. The two essays are gone from this list
     — a seller with nothing to write should not be locked out of their own
     streak, and a forced sentence is a made-up sentence. */
  const missing = slip === null
    ? t.needSlip
    : triedFocus === null
      ? t.needFocus
      : energyRating === 0
        ? t.needEnergy
        : null;
  const canSubmit = missing === null;

  const handleSubmit = () => {
    // Re-tested field by field rather than through `canSubmit`, so the compiler
    // can see that neither of the two nullable answers is still null.
    if (slip === null || triedFocus === null || energyRating === 0) return;
    const insideCount = inside === '' ? 0 : Number(inside);
    endOfShift({
      /* `stops` predates the journal, when it meant people halted on the
         pavement. That count is not collected anywhere any more, and a STOP now
         means someone who is inside the shop (types/streetTracker.ts) — the same
         number as `inside`. Nothing in the app reads either field back; writing
         the journal's real count into both is the only honest thing left to put
         there, and beats storing a guess or a zero. */
      stops: insideCount,
      inside: insideCount,
      bestMoment: bestMoment.trim(),
      challenge: challenge.trim(),
      triedFocus,
      slip,
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
              {/* Inside — prefilled from the journal, still editable.
                  The pavement-stop counter that used to sit above this is gone:
                  see the note at the top of this file. */}
              <motion.section custom={0} variants={section} initial="hidden" animate="visible">
                <h2 className="mb-1 flex items-center gap-2 text-overline text-ink-3">
                  <DoorOpen className="h-4 w-4 text-teal-strong" aria-hidden="true" />
                  {t.q2}
                </h2>
                <p className="mb-3 text-caption text-ink-2">{t.fromJournal}</p>
                <CounterField
                  value={inside}
                  onChange={setInside}
                  label={t.insideLabel}
                  decreaseLabel={t.decreaseInside}
                  increaseLabel={t.increaseInside}
                />
              </motion.section>

              {/* Best moment — optional */}
              <motion.section custom={2} variants={section} initial="hidden" animate="visible">
                <label htmlFor="best-moment" className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <Star className="h-4 w-4 text-gold-strong" aria-hidden="true" />
                  {t.q3}
                  <span className="text-ink-3">· {t.optional}</span>
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

              {/* Challenge — optional */}
              <motion.section custom={3} variants={section} initial="hidden" animate="visible">
                <label htmlFor="challenge" className="mb-3 flex items-center gap-2 text-overline text-ink-3">
                  <Zap className="h-4 w-4 text-coral-strong" aria-hidden="true" />
                  {t.q4}
                  <span className="text-ink-3">· {t.optional}</span>
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

              {/* The one that got away — the owner's honest audit. */}
              <motion.section custom={4} variants={section} initial="hidden" animate="visible">
                <h2 className="mb-1 flex items-center gap-2 text-overline text-ink-3">
                  <Shield className="h-4 w-4 text-violet-strong" aria-hidden="true" />
                  {t.slipTitle}
                </h2>
                <p className="mb-3 text-caption text-ink-2">{t.slipHint}</p>
                <div className="flex flex-col gap-2">
                  {SLIP_IDS.map((id) => {
                    /* 'none' is the answer that says it was not your fault, so
                       it wears the calm colour; the five slips wear the coral
                       the app uses everywhere else for a lost customer. */
                    const selected =
                      id === 'none'
                        ? 'border-teal bg-teal-tint text-teal-strong'
                        : 'border-coral bg-coral-tint text-coral-strong';
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-pressed={slip === id}
                        onClick={() => setSlip(id)}
                        className={`min-h-touch w-full rounded-card border px-4 py-3 text-left text-body-small font-semibold transition-colors ${
                          slip === id ? selected : 'border-line bg-surface text-ink-2'
                        }`}
                      >
                        {t.slips[id]}
                      </button>
                    );
                  })}
                </div>
                {slip && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 text-caption font-semibold ${
                      slip === 'none' ? 'text-teal-strong' : 'text-ink-2'
                    }`}
                    aria-live="polite"
                  >
                    {slip === 'none' ? t.slipAbsolved : t.slipLesson}
                  </motion.p>
                )}
              </motion.section>

              {/* Focus */}
              <motion.section custom={5} variants={section} initial="hidden" animate="visible">
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
              <motion.section custom={6} variants={section} initial="hidden" animate="visible">
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
                  custom={7}
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
              <motion.div custom={8} variants={section} initial="hidden" animate="visible" className="pt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`w-full ${canSubmit ? 'btn-primary' : 'btn-quiet cursor-not-allowed opacity-60'}`}
                >
                  {canSubmit ? t.submit : missing}
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
                {/* Conversion is sales ÷ people brought inside — of the ones you
                    got in front of you, how many bought. It used to be
                    inside ÷ pavement-stops, which measured effort against a
                    number nobody could count. Sales come from the journal; the
                    till already knows them and nobody should retype them. */}
                <div className="grid grid-cols-2 gap-3">
                  <SummaryTile label={t.inside} value={inside || '0'} />
                  <SummaryTile label={t.sales} value={String(journalToday.sales)} />
                  <SummaryTile
                    label={t.conversion}
                    value={`${Number(inside) > 0 ? Math.round((journalToday.sales / Number(inside)) * 100) : 0}%`}
                  />
                  <SummaryTile label={t.energyLabel} value={`${energyRating}/5`} />
                </div>
              </motion.div>

              {journalToday.sales > 0 && (
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
