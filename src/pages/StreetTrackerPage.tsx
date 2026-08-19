import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame, DoorOpen, Coins, Trophy, DoorClosed, ArrowRightLeft } from 'lucide-react';
import { useStreetTracker } from '../hooks/useStreetTracker';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import QuickLogButtons from '../components/QuickLogButtons';
import EncounterCard from '../components/EncounterCard';
import SaleLogModal from '../components/SaleLogModal';
import BetweenShiftsCard from '../components/BetweenShiftsCard';
import ComebackCard, { type ComebackMode } from '../components/ComebackCard';
import { PRODUCTS, XP_VALUES, saleXp } from '../types/streetTracker';
import type { StreetSession, DailySummary } from '../types/streetTracker';

const COPY = {
  en: {
    title: 'My Journal',
    subtitle: 'Two taps. Then back out there.',
    todayStats: "Today's performance",
    stops: 'Brought in',
    sales: 'Sales',
    revenue: 'Revenue',
    stop: 'Brought someone in',
    sale: 'Sale',
    conversionRate: 'Conversion rate',
    personalBests: 'Personal bests',
    bestStops: 'Most brought in',
    bestSales: 'Best sales',
    bestRevenue: 'Best revenue',
    weekTrend: '7-day trend',
    activity: 'Activity',
    revenueLegend: 'Revenue',
    noActivity: 'Nothing logged yet today. Get out there.',
    justNow: 'just now',
    minsAgo: 'm ago',
    hrsAgo: 'h ago',
    xpToday: 'XP today',
    dayStreak: 'day streak',
    handedOver: 'Passed to the upseller',
  },
  es: {
    title: 'Mi Diario',
    subtitle: 'Dos toques. Y vuelves a la calle.',
    todayStats: 'Rendimiento de hoy',
    stops: 'Metidos dentro',
    sales: 'Ventas',
    revenue: 'Ingresos',
    stop: 'He metido a alguien',
    sale: 'Venta',
    conversionRate: 'Tasa de conversión',
    personalBests: 'Mejores marcas',
    bestStops: 'Máximo metidos',
    bestSales: 'Mejores ventas',
    bestRevenue: 'Mejores ingresos',
    weekTrend: 'Tendencia 7 días',
    activity: 'Actividad',
    revenueLegend: 'Ingresos',
    noActivity: 'Aún no has registrado nada hoy. Sal ahí fuera.',
    justNow: 'ahora mismo',
    minsAgo: 'm',
    hrsAgo: 'h',
    xpToday: 'XP hoy',
    dayStreak: 'días de racha',
    handedOver: 'Traspaso al upseller',
  },
};

type Copy = (typeof COPY)['en'];

const VISITS_KEY = 'zl_tracker_visits';

function timeAgo(timestamp: number, t: Copy): string {
  const mins = Math.floor((Date.now() - timestamp) / 60000);
  if (mins < 1) return t.justNow;
  if (mins < 60) return `${mins}${t.minsAgo}`;
  return `${Math.floor(mins / 60)}${t.hrsAgo}`;
}

/** Weekday initials for the trend chart, in the seller's language. */
function weekdayLabel(key: string, isEs: boolean): string {
  const [y, m, d] = key.split('-').map(Number);
  if (!y || !m || !d) return '';
  return new Date(y, m - 1, d)
    .toLocaleDateString(isEs ? 'es-ES' : 'en-GB', { weekday: 'short' })
    .slice(0, 3);
}

// ── Activity row ────────────────────────────────────────────────────────────

// Tints rather than solid fills: there is no `on-violet` ink token, and a
// coloured fill without its matching ink is exactly how contrast gets lost.
const ACTIVITY_STYLE = {
  stop: { fill: 'bg-teal-tint text-teal-strong', ink: 'text-teal-strong' },
  sale: { fill: 'bg-gold-tint text-gold-strong', ink: 'text-gold-strong' },
} as const;

/**
 * What THIS row actually paid.
 *
 * It used to be one number per type, written when every sale was worth the
 * same 60. Once a sale started paying by product the row kept saying +60 for a
 * {currency}30 nail kit — the sheet promised +20, the journal reported +60, and
 * the total agreed with neither on screen. A row in a log has one job, which is
 * to be true.
 */
function rowXP(session: StreetSession): number {
  return session.type === 'sale' ? saleXp(session.productId, session.handedOver) : XP_VALUES.stop;
}

const ActivityRow: React.FC<{ session: StreetSession; t: Copy; isEs: boolean; money: (n: number) => string }> = ({
  session,
  t,
  isEs,
  money,
}) => {
  const product = PRODUCTS.find((p) => p.id === session.productId);
  const productName = product ? (isEs ? product.nameEs : product.name) : '';
  const style = ACTIVITY_STYLE[session.type];
  const Icon = session.type === 'stop' ? DoorOpen : Coins;
  const label = session.type === 'stop' ? t.stop : t.sale;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 border-b border-line py-2.5 last:border-b-0"
    >
      <div
        className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.fill}`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-body-small font-semibold text-ink">{label}</span>
          <div className="flex shrink-0 items-center gap-2">
            <span className={`text-caption font-bold ${style.ink}`}>+{rowXP(session)} XP</span>
            <span className="text-caption text-ink-3">{timeAgo(session.timestamp, t)}</span>
          </div>
        </div>
        {session.type === 'sale' && productName && (
          <p className="mt-0.5 text-caption text-gold-strong">
            {productName} — {money(session.amount || 0)}
          </p>
        )}
        {/* The job finished, not just the sale. Only ever shown when the seller
            said so — an absent tag means nobody was asked, not a failure. */}
        {session.handedOver && (
          <p className="mt-0.5 flex items-center gap-1 text-caption text-teal-strong">
            <ArrowRightLeft className="h-3 w-3 shrink-0" aria-hidden="true" />
            {t.handedOver}
          </p>
        )}
        {session.note && <p className="mt-0.5 truncate text-caption italic text-ink-3">{session.note}</p>}
      </div>
    </motion.li>
  );
};

// ── Small pieces ────────────────────────────────────────────────────────────

const StatCard: React.FC<{
  label: string;
  value: string | number;
  ink: string;
  tint: string;
  icon: React.ReactNode;
  delay?: number;
}> = ({ label, value, ink, tint, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="surface-flat p-3"
  >
    <div className="mb-1.5 flex items-center gap-1.5">
      <span className={`flex h-6 w-6 items-center justify-center rounded-chip ${tint} ${ink}`}>
        {icon}
      </span>
      <span className="truncate text-caption font-medium text-ink-2">{label}</span>
    </div>
    <p className={`text-h2 tabular-nums ${ink}`}>{value}</p>
  </motion.div>
);

const ConversionGauge: React.FC<{ rate: number; label: string }> = ({ rate, label }) => {
  const clamped = Math.min(Math.max(rate, 0), 100);
  const tone =
    clamped >= 50
      ? { bar: 'bg-success', ink: 'text-success' }
      : clamped >= 25
        ? { bar: 'bg-teal', ink: 'text-teal-strong' }
        : clamped >= 10
          ? { bar: 'bg-warning', ink: 'text-warning' }
          : { bar: 'bg-danger', ink: 'text-danger' };

  return (
    <div className="surface-flat p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-overline text-ink-3">{label}</span>
        <span className={`text-h3 tabular-nums ${tone.ink}`}>{rate}%</span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-surface-sunken"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <motion.div
          className={`h-full rounded-full ${tone.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="mt-1.5 flex justify-between text-caption text-ink-3">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

const WeekChart: React.FC<{ data: DailySummary[]; t: Copy; isEs: boolean }> = ({ data, t, isEs }) => {
  const maxVal = Math.max(...data.map((d) => d.stops + d.sales), 1);

  return (
    <div className="surface-flat p-4">
      <h3 className="mb-3 text-overline text-ink-3">{t.weekTrend}</h3>
      {/* `items-end` here collapsed every column to its content height, which
          left the bar well at 0px — and a percentage height against a 0px
          parent is 0px. So the chart drew seven invisible bars over seven day
          labels, on every shift, for everyone. The columns stretch to the full
          112px now and the bars sit on the floor of their own well instead. */}
      <div className="flex h-28 items-stretch justify-between gap-1.5">
        {data.map((day, i) => {
          const total = day.stops + day.sales;
          const pct = total === 0 ? 0 : (total / maxVal) * 100;
          return (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full min-h-0 flex-1 items-end justify-center">
                <motion.div
                  className="w-full max-w-[18px] rounded-t-chip bg-teal"
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(pct, 4)}%` }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                />
              </div>
              <div
                className={`h-1.5 w-1.5 rounded-full ${day.revenue > 0 ? 'bg-gold' : 'bg-transparent'}`}
              />
              <span className="text-caption text-ink-3">{weekdayLabel(day.date, isEs)}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center gap-4 border-t border-line pt-2">
        <span className="flex items-center gap-1.5 text-caption text-ink-3">
          <span className="h-2 w-2 rounded-sm bg-teal" />
          {t.activity}
        </span>
        <span className="flex items-center gap-1.5 text-caption text-ink-3">
          <span className="h-2 w-2 rounded-full bg-gold" />
          {t.revenueLegend}
        </span>
      </div>
    </div>
  );
};

const PersonalBest: React.FC<{ label: string; value: string | number; delay?: number }> = ({
  label,
  value,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 280 }}
    className="flex items-center gap-2 rounded-card border border-line bg-surface-sunken px-3 py-2"
  >
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-on-gold">
      <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="truncate text-caption text-ink-3">{label}</p>
      <p className="text-body-small font-bold tabular-nums text-ink">{value}</p>
    </div>
  </motion.div>
);

// ── The learning slot ───────────────────────────────────────────────────────
//
// One card, directly under the encounter, chosen by what the seller's own data
// says. It replaces the old "what beat you today" strip, which named the
// objection and then sent them somewhere else to find out what to say about it
// — a signpost where the answer would have fitted.
//
// See ComebackCard.tsx for what it shows and why it is not the Home screen's
// leak card wearing a different hat.

/** How long a loss stays worth answering on the spot. */
const FRESH_WINDOW_MS = 20 * 60 * 1000;

/** Remembers the one card the seller closed, so it stays closed. */
const COMEBACK_DISMISS_KEY = 'zl_comeback_done';

// ── Page ────────────────────────────────────────────────────────────────────

const StreetTrackerPage: React.FC = () => {
  const {
    logActivity,
    openEncounter,
    lastWalkAway,
    resolveEncounter,
    getTodayLogs,
    getTodayReasons,
    getDailySummary,
    getWeekSummary,
    getPersonalBest,
    getTotalXP,
    getStreak,
  } = useStreetTracker();

  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEs = language === 'es';
  const t = COPY[isEs ? 'es' : 'en'];

  // Gibraltar sells in £. This page hardcoded `€${amount}`, so a Gibraltar
  // seller logged pound takings into a euro-labelled field all shift.
  const { currency } = useCurrency();
  const money = useMemo(
    () => (amount: number) => `${currency}${amount.toLocaleString(isEs ? 'es-ES' : 'en-GB')}`,
    [currency, isEs]
  );

  const [showSaleModal, setShowSaleModal] = useState(false);
  /*
   * ── THE ENCOUNTER AND THE MONEY ARE ONE ACT ────────────────────────────────
   *
   * There are two ways to log a sale and they used to fail in opposite
   * directions, both silently:
   *
   *   Via the card's "Sold" chip, the encounter was resolved BEFORE the sheet
   *   was filled in. Dismiss the sheet — or tap the bottom nav to look
   *   something up, which unmounts this page — and the customer was gone from
   *   the screen with Sales 0 and Revenue 0, and nothing left to log against.
   *   The card vanishing looks exactly like success.
   *
   *   Via the big docked Sale button, the money booked but the stop was never
   *   closed, because the resolve targeted the SALE row's id, which no
   *   encounter query reads. The journal then carried a phantom "In the shop"
   *   customer, timer running, for the rest of the shift — surviving a reload,
   *   and swallowing the next real encounter, because the objection-answer
   *   card and the nudges are both gated on there being no open encounter.
   *
   * So: neither route resolves anything. Both stash what they know, and the
   * single write happens in the sheet's onSubmit, after the money exists.
   */
  const [pendingCloser, setPendingCloser] = useState<string | undefined>(undefined);
  /** The OPEN STOP this sale belongs to. Never a sale row's id. */
  const [pendingEncounterId, setPendingEncounterId] = useState<string | undefined>(undefined);

  // A state initializer must be PURE — React may call it twice, and under
  // StrictMode it does. This one wrote to localStorage, so the visit counter
  // jumped by two per mount and the "between shifts" prompt appeared a visit
  // early. Read here, write in the effect below.
  const [visitCount] = useState(() => {
    try {
      const n = parseInt(localStorage.getItem(VISITS_KEY) || '0', 10);
      return Number.isFinite(n) ? n : 0;
    } catch {
      return 0;
    }
  });
  const [showBetweenShifts, setShowBetweenShifts] = useState(visitCount >= 2);

  const counted = useRef(false);
  useEffect(() => {
    if (counted.current) return;
    counted.current = true;
    try {
      localStorage.setItem(VISITS_KEY, String(visitCount + 1));
    } catch {
      /* non-fatal */
    }
  }, [visitCount]);

  const todayKey = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  // ── The learning slot ─────────────────────────────────────────────────────
  //
  // Freshness has to be re-checked on the clock, not only when the data
  // changes: a seller who leaves the journal open would otherwise still be told
  // a loss from half an hour ago "just" happened. The ticker only runs while
  // something is actually fresh, and stops itself the moment it is not.
  const [nowTick, setNowTick] = useState(() => Date.now());
  useEffect(() => {
    if (!lastWalkAway || Date.now() - lastWalkAway.resolvedAt >= FRESH_WINDOW_MS) return;
    const id = window.setInterval(() => setNowTick(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, [lastWalkAway, nowTick]);

  const [dismissedComeback, setDismissedComeback] = useState(() => {
    try {
      return localStorage.getItem(COMEBACK_DISMISS_KEY) ?? '';
    } catch {
      return '';
    }
  });

  const todayReasons = useMemo(() => getTodayReasons(), [getTodayReasons]);

  /**
   * What the spare minute is for, in priority order:
   *
   *  1. the objection that beat them minutes ago, while it still stings;
   *  2. failing that, the one that has beaten them more than once today;
   *  3. failing that — a seller with no history, or a good day — an honest
   *     warm-up that does not pretend to be their data.
   *
   * The seven-day window is deliberately NOT used here. That is the Home
   * screen's biggest-leak card, and saying the same sentence on two screens is
   * how both stop being read.
   */
  const comeback = useMemo((): { mode: ComebackMode; reasonId?: string; count: number; token: string } => {
    if (lastWalkAway && nowTick - lastWalkAway.resolvedAt < FRESH_WINDOW_MS) {
      const count = todayReasons.find((r) => r.id === lastWalkAway.reason)?.count ?? 1;
      return { mode: 'fresh', reasonId: lastWalkAway.reason, count, token: `w-${lastWalkAway.id}` };
    }
    const top = todayReasons[0];
    if (top && top.count >= 2) {
      // The count is in the token, so closing it at three does not hide it
      // again at four — by then it is news.
      return {
        mode: 'pattern',
        reasonId: top.id,
        count: top.count,
        token: `p-${todayKey}-${top.id}-${top.count}`,
      };
    }
    return { mode: 'warmup', count: 0, token: `u-${todayKey}` };
  }, [lastWalkAway, nowTick, todayReasons, todayKey]);

  /* Never while someone is in the shop. The encounter owns that slot, and the
     quick-log button stays one tap away from opening the next one. */
  const showComeback = !openEncounter && dismissedComeback !== comeback.token;

  const dismissComeback = useCallback((token: string) => {
    setDismissedComeback(token);
    try {
      localStorage.setItem(COMEBACK_DISMISS_KEY, token);
    } catch {
      /* non-fatal */
    }
  }, []);

  const todayLogs = useMemo(() => getTodayLogs(), [getTodayLogs]);
  const summary = useMemo(() => getDailySummary(todayKey), [getDailySummary, todayKey]);
  const weekData = useMemo(() => getWeekSummary(), [getWeekSummary]);
  const totalXP = useMemo(() => getTotalXP(), [getTotalXP]);
  const streak = useMemo(() => getStreak(), [getStreak]);

  const bestStops = useMemo(() => getPersonalBest('stops'), [getPersonalBest]);
  const bestSales = useMemo(() => getPersonalBest('sales'), [getPersonalBest]);
  const bestRevenue = useMemo(() => getPersonalBest('revenue'), [getPersonalBest]);

  return (
    // Clearance for the docked quick-log bar. Layout already reserves the
    // bottom bar's own height on <main>, so this only covers the ~101px the
    // quick-log bar adds on top of it, plus air.
    <div className="relative min-h-screen bg-background pb-32 text-ink">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-app items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <h1 className="truncate text-h4 text-ink">{t.title}</h1>
            <p className="truncate text-caption text-ink-3">{t.subtitle}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-teal-tint px-2.5 py-1">
              <Zap className="h-3.5 w-3.5 text-teal-strong" aria-hidden="true" />
              <span className="text-caption font-bold tabular-nums text-teal-strong">
                {totalXP} XP
              </span>
            </span>
            {streak > 1 && (
              <span className="flex items-center gap-1 rounded-full bg-coral-tint px-2.5 py-1">
                <Flame className="h-3.5 w-3.5 text-coral-strong" aria-hidden="true" />
                <span className="text-caption font-bold text-coral-strong">
                  {streak} {t.dayStreak}
                </span>
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-app space-y-5 px-4 pt-4">
        {/* The live encounter — someone is in the shop right now. A visible
            loose end is what brings the phone back out. */}
        <AnimatePresence>
          {openEncounter && (
            <EncounterCard
              key={openEncounter.id}
              encounter={openEncounter}
              onWalked={(reason) => resolveEncounter(openEncounter.id, 'walked', reason)}
              onSold={(reason) => {
                /* Stash only. The encounter is not closed until the money is
                   saved — until then her outcome genuinely is not known. */
                setPendingCloser(reason);
                setPendingEncounterId(openEncounter.id);
                setShowSaleModal(true);
              }}
            />
          )}
        </AnimatePresence>

        {/* The payoff for tapping a chip: the words that answer it, right here,
            seconds later, and twenty seconds to say them out loud. Without this
            the journal is write-only, which is how journals die. */}
        <AnimatePresence mode="wait">
          {showComeback && (
            <ComebackCard
              key={comeback.token}
              mode={comeback.mode}
              reasonId={comeback.reasonId}
              countToday={comeback.count}
              dateKey={todayKey}
              onDismiss={() => dismissComeback(comeback.token)}
            />
          )}
        </AnimatePresence>

        {/* The generic drill menu, kept as the fallback for a seller who has
            closed the card above — two learning cards stacked over the numbers
            is exactly the clutter this screen cannot afford. Its three buttons
            used to close the card and go nowhere at all; they now open the
            thing they name. */}
        <AnimatePresence>
          {showBetweenShifts && !showComeback && (
            <BetweenShiftsCard
              onFlashcardSprint={() => navigate('/flashcards')}
              onScenarioDrill={() => navigate('/exercises')}
              onTechniqueReminder={() => navigate('/cheat-sheets')}
              onDismiss={() => setShowBetweenShifts(false)}
            />
          )}
        </AnimatePresence>

        {/* Today */}
        <section>
          <h2 className="mb-2 text-overline text-ink-3">{t.todayStats}</h2>
          <div className="grid grid-cols-2 gap-2.5">
            <StatCard
              label={t.stops}
              value={summary.stops}
              ink="text-teal-strong"
              tint="bg-teal-tint"
              icon={<DoorOpen className="h-3.5 w-3.5" aria-hidden="true" />}
              delay={0.05}
            />
            <StatCard
              label={t.sales}
              value={summary.sales}
              ink="text-coral-strong"
              tint="bg-coral-tint"
              icon={<Coins className="h-3.5 w-3.5" aria-hidden="true" />}
              delay={0.1}
            />
            {/* Gold is the achievement colour, so the money wears it. Revenue
                used to render in coral, which reads as an alert, not a win. */}
            <StatCard
              label={t.revenue}
              value={money(summary.revenue)}
              ink="text-gold-strong"
              tint="bg-gold-tint"
              icon={<span className="text-caption font-bold">{currency}</span>}
              delay={0.15}
            />
          </div>
        </section>

        <ConversionGauge rate={summary.conversionRate} label={t.conversionRate} />

        {/* Personal bests */}
        <section>
          <h2 className="mb-2 text-overline text-ink-3">{t.personalBests}</h2>
          <div className="grid grid-cols-2 gap-2">
            <PersonalBest label={t.bestStops} value={bestStops} />
            <PersonalBest label={t.bestSales} value={bestSales} delay={0.1} />
            <PersonalBest label={t.bestRevenue} value={money(bestRevenue)} delay={0.15} />
          </div>
        </section>

        <WeekChart data={weekData} t={t} isEs={isEs} />

        {/* Activity log */}
        <section>
          <h2 className="mb-2 text-overline text-ink-3">{t.activity}</h2>
          <div className="surface-flat p-4">
            {todayLogs.length === 0 ? (
              <div className="py-8 text-center">
                <DoorClosed className="mx-auto mb-2 h-8 w-8 text-ink-3" aria-hidden="true" />
                <p className="text-body-small text-ink-2">{t.noActivity}</p>
              </div>
            ) : (
              <ul className="max-h-64 overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {todayLogs.map((log) => (
                    <ActivityRow key={log.id} session={log} t={t} isEs={isEs} money={money} />
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </section>
      </div>

      <QuickLogButtons
        onLogStop={() => logActivity('stop')}
        onLogSale={() => {
          /* The docked button can be tapped with a customer already in the
             chair. Bind the sale to that encounter so it closes with it. */
          setPendingEncounterId(openEncounter?.id);
          setShowSaleModal(true);
        }}
      />

      <SaleLogModal
        isOpen={showSaleModal}
        onClose={() => {
          /* Abandoning the sheet must leave no trace: the encounter stays open
             and the card is still there to finish. Clearing the closer stops
             it leaking into whatever sale is logged next. */
          setShowSaleModal(false);
          setPendingCloser(undefined);
          setPendingEncounterId(undefined);
        }}
        onSubmit={(productId, amount, note, handedOver) => {
          logActivity('sale', productId, amount, note || undefined, handedOver);
          if (pendingEncounterId) resolveEncounter(pendingEncounterId, 'sold', pendingCloser);
          setPendingCloser(undefined);
          setPendingEncounterId(undefined);
        }}
      />
    </div>
  );
};

export default StreetTrackerPage;
