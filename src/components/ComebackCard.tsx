// ─────────────────────────────────────────────────────────────────────────────
// ComebackCard.tsx — what the journal gives back for the minute between customers.
//
// ── THE HOLE THIS FILLS ─────────────────────────────────────────────────────
// A seller taps "Walked", taps "Muy caro", and the card vanishes. The single
// most teachable second in the whole product — four seconds after an objection
// beat them, while it still stings — produced nothing at all. The reason went
// into localStorage and only resurfaced later as an aggregate: a count on Home
// once four of them had piled up, or a link to a lesson they will read never.
//
// So this is not another counter and not another link. It is the WORDS, in the
// journal, seconds later, and a twenty-second rep to get them into their mouth.
// Reading a line does nothing. Saying it out loud once is the whole difference
// between having an answer and having an answer available under pressure.
//
// ── WHY IT IS NOT THE "BIGGEST LEAK" CARD AGAIN ─────────────────────────────
// BiggestLeak (Home) is a weekly diagnosis that hands off to two other screens:
// "here is your pattern, go and read about it". This is the opposite end —
// per-encounter, immediate, and it contains the content rather than pointing at
// it. They never appear on the same screen and they never say the same thing.
//
// ── WHERE THE LINES COME FROM ───────────────────────────────────────────────
// SCRIPTS and EMERGENCY_BLOCKS in src/data/cheatSheets.ts, matched on the same
// `answers` key the Cheat Sheets "They said…" panel uses — which is the same
// chip vocabulary the journal writes. One set of words for the whole app: the
// cheat sheet and this card can never end up teaching two different answers.
// Nothing here invents sales copy, and every price is resolved by `sub()` off
// the ladders in pricing.ts, so no number can drift.
//
// ── WHAT IT MUST NEVER DO ───────────────────────────────────────────────────
// Get in the way of logging. It is a card in the page, never a modal, never
// something to dismiss first. The journal renders it only when NO encounter is
// open, so the instant a customer walks in the quick-log button is still one
// tap and this card is simply gone.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Check, MessagesSquare, Mic, RefreshCw, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import { haptic } from '../utils/haptics';
import { WALK_REASONS, walkReason, chipLabel } from '../data/encounterChips';
import { linesAnswering } from '../data/cheatSheets';

/** One rep. Long enough to actually say a line twice, short enough to do standing up. */
const REP_SECONDS = 20;

const REPS_KEY = 'zl_comeback_reps';

const COPY = {
  en: {
    freshEyebrow: 'They just said',
    patternEyebrow: 'Beating you today',
    warmupEyebrow: 'Warm-up',
    freshNote: 'Say it now, while it still stings. The next one gets it.',
    patternNote: 'Same one again today. Say it until it comes out by itself.',
    warmupNote: 'Dead minute? One objection, one answer. Have it ready before you need it.',
    times: (n: number) => `${n}× today`,
    rep: 'Say it out loud',
    repHint: '20 sec',
    repLive: 'Out loud. Now.',
    repDone: 'Said out loud. That is how it sticks.',
    again: 'Again',
    stop: 'Stop',
    another: 'Another line',
    lineOf: (i: number, n: number) => `${i} of ${n}`,
    lesson: 'The lesson behind it',
    allLines: 'All the lines for this',
    dismiss: 'Close',
    reps: (n: number) => `${n} out loud today`,
  },
  es: {
    freshEyebrow: 'Te acaban de decir',
    patternEyebrow: 'Te está ganando hoy',
    warmupEyebrow: 'Calentamiento',
    freshNote: 'Dilo ahora, que aún escuece. Al siguiente se la sueltas.',
    patternNote: 'Otra vez la misma hoy. Dilo hasta que te salga sola.',
    warmupNote: '¿Rato muerto? Una objeción, una respuesta. Tenla lista antes de necesitarla.',
    times: (n: number) => `${n}× hoy`,
    rep: 'Dilo en voz alta',
    repHint: '20 s',
    repLive: 'En voz alta. Venga.',
    repDone: 'Dicho en voz alta. Así se queda.',
    again: 'Otra vez',
    stop: 'Parar',
    another: 'Otra frase',
    lineOf: (i: number, n: number) => `${i} de ${n}`,
    lesson: 'La lección que hay detrás',
    allLines: 'Todas las frases para esto',
    dismiss: 'Cerrar',
    reps: (n: number) => `${n} en voz alta hoy`,
  },
} as const;

interface Line {
  key: string;
  /** Which product or context the line belongs to, where it has one. */
  tag?: string;
  /** Still carries {currency} / {locationName} — `sub()` resolves it at render. */
  text: string;
}

/**
 * Every line in the app that answers one walk-away reason, in one language.
 *
 * The selection itself lives in cheatSheets.ts and is shared with the Cheat
 * Sheets "They said…" panel, so this card and that sheet can never end up
 * teaching different answers to the same objection. All that happens here is
 * picking a language.
 */
function linesFor(reasonId: string, isEs: boolean): Line[] {
  return linesAnswering(reasonId).map((l) => ({
    key: l.key,
    tag: isEs ? l.labelEs ?? l.label : l.label,
    text: isEs ? l.textEs : l.text,
  }));
}

/**
 * The reasons that actually have an answer to give. "Nothing, they just left"
 * is excluded everywhere — it is not an objection and there is nothing to
 * rehearse — and anything added to encounterChips.ts without a scripted line
 * drops out of the warm-up rotation on its own rather than rendering an empty
 * card.
 */
const ANSWERABLE = WALK_REASONS.filter(
  (c) => c.id !== 'none' && linesFor(c.id, false).length > 0
);

/**
 * The warm-up reason for a given day.
 *
 * A seller with nothing logged yet has no pattern to show them, and inventing
 * one would be a lie. So the empty state is honest about being a warm-up and
 * rotates by date, which also stops it becoming the same wallpaper every shift.
 */
function warmupReason(dateKey: string): string {
  let sum = 0;
  for (let i = 0; i < dateKey.length; i++) sum = (sum * 31 + dateKey.charCodeAt(i)) >>> 0;
  return ANSWERABLE[sum % ANSWERABLE.length].id;
}

/** Reps said out loud today, stored as "YYYY-MM-DD:n". */
function readReps(dateKey: string): number {
  try {
    const raw = localStorage.getItem(REPS_KEY) || '';
    const [day, n] = raw.split(':');
    return day === dateKey ? Number(n) || 0 : 0;
  } catch {
    return 0;
  }
}

function bumpReps(dateKey: string): number {
  const next = readReps(dateKey) + 1;
  try {
    localStorage.setItem(REPS_KEY, `${dateKey}:${next}`);
  } catch {
    /* quota or private mode — the counter is a nicety, never a blocker */
  }
  return next;
}

export type ComebackMode = 'fresh' | 'pattern' | 'warmup';

interface Props {
  mode: ComebackMode;
  /** Required for 'fresh' and 'pattern'. In 'warmup' the card picks its own. */
  reasonId?: string;
  /** How many times this reason has beaten them today. Only shown above 1. */
  countToday?: number;
  /** Local date key, so the rep counter and the warm-up rotate on local days. */
  dateKey: string;
  onDismiss: () => void;
}

export default function ComebackCard({ mode, reasonId, countToday = 0, dateKey, onDismiss }: Props) {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { sub } = useCurrency();
  const isEs = language === 'es';
  const c = COPY[isEs ? 'es' : 'en'];

  const id = mode === 'warmup' ? warmupReason(dateKey) : reasonId;
  const chip = walkReason(id);
  const lines = useMemo(() => (id ? linesFor(id, isEs) : []), [id, isEs]);

  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(REP_SECONDS);
  const [done, setDone] = useState(false);
  const [reps, setReps] = useState(() => readReps(dateKey));
  /** Wall-clock end of the rep; null when no rep is running. */
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const live = endsAt !== null;

  /*
   * The rep clock, kept against the wall clock rather than counting ticks — a
   * phone that sleeps in an apron pocket mid-rep comes back with the right
   * number instead of a timer twenty seconds behind reality. Polled rather than
   * scheduled per second so the reading is right the moment the tab wakes; the
   * seconds value only changes once a second, so this is one render a second.
   * Cleared on unmount, so a customer walking in never leaves a timer running
   * behind the encounter card.
   */
  useEffect(() => {
    if (endsAt === null) return;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setLeft(remaining);
      if (remaining > 0) return;
      /* Stop the clock here rather than relying on the state change below to
         tear the effect down. Those setState calls are batched and the cleanup
         only runs after React commits — on a slow phone that can take longer
         than the 250ms to the next tick, and a second pass would buzz twice and
         count the rep twice. */
      window.clearInterval(timer);
      setEndsAt(null);
      setDone(true);
      haptic('medium');
      setReps(bumpReps(dateKey));
    };
    const timer = window.setInterval(tick, 250);
    return () => window.clearInterval(timer);
  }, [endsAt, dateKey]);

  function startRep() {
    haptic('light');
    setLeft(REP_SECONDS);
    setDone(false);
    setEndsAt(Date.now() + REP_SECONDS * 1000);
  }

  function stopRep() {
    setEndsAt(null);
    setLeft(REP_SECONDS);
  }

  function nextLine() {
    haptic('light');
    setEndsAt(null);
    setLeft(REP_SECONDS);
    setDone(false);
    setIndex((i) => (i + 1) % Math.max(lines.length, 1));
  }

  // Nothing to say means nothing to show. A card that renders a heading over an
  // empty box is worse than no card.
  if (!chip || lines.length === 0) return null;

  const line = lines[index % lines.length];
  const eyebrow =
    mode === 'fresh' ? c.freshEyebrow : mode === 'pattern' ? c.patternEyebrow : c.warmupEyebrow;
  const note = mode === 'fresh' ? c.freshNote : mode === 'pattern' ? c.patternNote : c.warmupNote;
  // Coral is the objection colour everywhere else in the app — the "They said…"
  // tile, the leak card's lines button — so a lost customer wears it here too.
  // A warm-up is not a loss, so it stays on the neutral teal feature surface.
  const surface = mode === 'warmup' ? 'surface-feature' : 'surface-feature feature-coral';
  const accent = mode === 'warmup' ? 'text-teal-strong' : 'text-coral-strong';
  const tint = mode === 'warmup' ? 'bg-teal-tint' : 'bg-coral-tint';
  const pct = Math.round(((REP_SECONDS - left) / REP_SECONDS) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className={`${surface} p-4`}
      aria-label={eyebrow}
    >
      <div className="flex items-start gap-2">
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-chip ${tint} ${accent}`}>
          <MessagesSquare size={14} aria-hidden="true" />
        </span>
        <p className={`min-w-0 flex-1 pt-1 text-overline ${accent}`}>{eyebrow}</p>
        <button type="button" onClick={onDismiss} aria-label={c.dismiss} className="btn-icon shrink-0">
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h2 className="text-h3 text-ink">“{chipLabel(chip, isEs)}”</h2>
        {countToday > 1 && (
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-caption font-bold ${tint} ${accent}`}>
            {c.times(countToday)}
          </span>
        )}
      </div>
      <p className="mt-1 text-caption text-ink-2">{note}</p>

      {/* The answer itself. Sits on a plain surface so the words, not the card,
          are the thing being read. */}
      <div className="mt-3 rounded-card border border-line bg-surface p-3">
        {(line.tag || lines.length > 1) && (
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <span className="truncate text-caption font-semibold text-ink-3">{line.tag ?? ''}</span>
            {lines.length > 1 && (
              <span className="shrink-0 text-caption tabular-nums text-ink-3">
                {c.lineOf(index + 1, lines.length)}
              </span>
            )}
          </div>
        )}
        <p className="text-body text-ink">{sub(line.text)}</p>
      </div>

      {/* The rep. Reading is not learning; saying it once out loud is.
          The buttons come FIRST and the clock appears underneath them, so
          starting a rep does not shove the control out from under the thumb
          that just tapped it. */}
      <div className="mt-3">
        <div className="flex items-center gap-2">
          {live ? (
            <button type="button" onClick={stopRep} className="btn-quiet flex-1 text-body-small">
              {c.stop}
            </button>
          ) : (
            // px-3 rather than the stock px-6: at 390px the label and its
            // duration share the row with the shuffle control, and "Dilo en voz
            // alta · 20 s" wrapped onto two lines at the wider padding.
            <button type="button" onClick={startRep} className="btn-secondary flex-1 px-3 text-body-small">
              <Mic size={16} aria-hidden="true" />
              {done ? c.again : `${c.rep} · ${c.repHint}`}
            </button>
          )}
          {lines.length > 1 && (
            <button
              type="button"
              onClick={nextLine}
              aria-label={c.another}
              title={c.another}
              className="btn-icon shrink-0"
            >
              <RefreshCw size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        {live && (
          <div className="mt-2">
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className={`text-caption font-bold ${accent}`} aria-live="polite">
                {c.repLive}
              </span>
              <span className="text-h4 tabular-nums text-ink">{left}s</span>
            </div>
            {/* Width, not transform: `prefers-reduced-motion` flattens the tween
                to nothing and the bar simply steps once a second. The number
                above it is the real signal either way. */}
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={c.rep}
            >
              <div
                className={`h-full rounded-full transition-[width] duration-1000 ease-linear ${
                  mode === 'warmup' ? 'bg-teal' : 'bg-coral'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {done && (
          <p
            className="mt-2 flex items-center gap-1.5 text-caption font-semibold text-success"
            aria-live="polite"
          >
            <Check size={14} aria-hidden="true" />
            {c.repDone}
          </p>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        {/* One escape hatch, not two. The lines are already on this card, so the
            only thing left to offer is the reasoning underneath them. Reasons
            with no lesson of their own fall back to the sheet. */}
        <button
          type="button"
          onClick={() =>
            navigate(chip.lessonId ? `/lesson/${chip.lessonId}` : `/cheat-sheets?said=${chip.id}`)
          }
          className="flex min-h-touch min-w-0 items-center gap-1.5 text-caption font-semibold text-ink-2 underline"
        >
          <BookOpen size={14} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{chip.lessonId ? c.lesson : c.allLines}</span>
        </button>
        {reps > 0 && <span className="shrink-0 text-caption text-ink-3">{c.reps(reps)}</span>}
      </div>
    </motion.section>
  );
}
