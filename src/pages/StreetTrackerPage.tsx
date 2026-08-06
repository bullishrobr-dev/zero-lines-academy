import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame, DoorOpen, Coins, Trophy, DoorClosed } from 'lucide-react';
import { useStreetTracker } from '../hooks/useStreetTracker';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import QuickLogButtons from '../components/QuickLogButtons';
import EncounterCard from '../components/EncounterCard';
import SaleLogModal from '../components/SaleLogModal';
import BetweenShiftsCard from '../components/BetweenShiftsCard';
import { PRODUCTS } from '../types/streetTracker';
import { walkReason, chipLabel } from '../data/encounterChips';
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
    beatYouToday: 'What beat you today',
    beatYouTimes: 'times',
    beatYouCta: 'Your line for it →',
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
    beatYouToday: 'Lo que te frenó hoy',
    beatYouTimes: 'veces',
    beatYouCta: 'Tu respuesta →',
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
  stop: { fill: 'bg-teal-tint text-teal-strong', ink: 'text-teal-strong', xp: '+5' },
  sale: { fill: 'bg-gold-tint text-gold-strong', ink: 'text-gold-strong', xp: '+10' },
} as const;

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
            <span className={`text-caption font-bold ${style.ink}`}>{style.xp} XP</span>
            <span className="text-caption text-ink-3">{timeAgo(session.timestamp, t)}</span>
          </div>
        </div>
        {session.type === 'sale' && productName && (
          <p className="mt-0.5 text-caption text-gold-strong">
            {productName} — {money(session.amount || 0)}
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
      <div className="flex h-28 items-end justify-between gap-1.5">
        {data.map((day, i) => {
          const total = day.stops + day.sales;
          const pct = total === 0 ? 0 : (total / maxVal) * 100;
          return (
            <div key={day.date} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full flex-1 items-end justify-center">
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

/**
 * "Let me think about it beat you 5 times today — here is your line for it."
 *
 * Only shown once a reason has actually come up twice, so it stays a signal
 * rather than wallpaper, and it links straight into the objection lesson that
 * answers it.
 */
const TopObjection: React.FC<{
  reasons: { id: string; count: number }[];
  t: Copy;
  isEs: boolean;
}> = ({ reasons, t, isEs }) => {
  const navigate = useNavigate();
  const top = reasons[0];
  if (!top || top.count < 2) return null;
  const chip = walkReason(top.id);
  if (!chip) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-feature feature-warning p-4"
    >
      <p className="text-overline text-ink-3">{t.beatYouToday}</p>
      <p className="mt-1 text-body-small text-ink">
        <b>{chipLabel(chip, isEs)}</b> · {top.count} {t.beatYouTimes}
      </p>
      {chip.lessonId && (
        <button
          type="button"
          onClick={() => navigate(`/lesson/${chip.lessonId}`)}
          className="btn-quiet mt-2 min-h-touch w-full text-body-small"
        >
          {t.beatYouCta}
        </button>
      )}
    </motion.section>
  );
};

// ── Page ────────────────────────────────────────────────────────────────────

const StreetTrackerPage: React.FC = () => {
  const {
    logActivity,
    openEncounter,
    resolveEncounter,
    getTodayLogs,
    getTodayReasons,
    getDailySummary,
    getWeekSummary,
    getPersonalBest,
    getTotalXP,
    getStreak,
  } = useStreetTracker();

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
  /* Which closer chip the encounter card captured, passed into the sale entry. */
  const [pendingCloser, setPendingCloser] = useState<string | undefined>(undefined);

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
                resolveEncounter(openEncounter.id, 'sold', reason);
                setPendingCloser(reason);
                setShowSaleModal(true);
              }}
            />
          )}
        </AnimatePresence>

        {/* The payoff for tapping a chip: today's most common objection, and a
            one-tap route to the lesson that answers it. Without this the journal
            is write-only, which is how journals die. */}
        <TopObjection reasons={getTodayReasons()} t={t} isEs={isEs} />

        <AnimatePresence>
          {showBetweenShifts && (
            <BetweenShiftsCard
              onFlashcardSprint={() => setShowBetweenShifts(false)}
              onScenarioDrill={() => setShowBetweenShifts(false)}
              onTechniqueReminder={() => setShowBetweenShifts(false)}
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
        onLogSale={() => setShowSaleModal(true)}
      />

      <SaleLogModal
        isOpen={showSaleModal}
        onClose={() => setShowSaleModal(false)}
        onSubmit={(productId, amount, note) => {
          const entry = logActivity('sale', productId, amount, note || undefined);
          if (pendingCloser) resolveEncounter(entry.id, 'sold', pendingCloser);
          setPendingCloser(undefined);
        }}
      />
    </div>
  );
};

export default StreetTrackerPage;
