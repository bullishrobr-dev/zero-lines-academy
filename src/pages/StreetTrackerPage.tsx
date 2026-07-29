import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Flame, Hand, DoorOpen, Coins, Trophy, DoorClosed } from 'lucide-react';
import { useStreetTracker } from '../hooks/useStreetTracker';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../utils/currency';
import QuickLogButtons from '../components/QuickLogButtons';
import SaleLogModal from '../components/SaleLogModal';
import BetweenShiftsCard from '../components/BetweenShiftsCard';
import { PRODUCTS } from '../types/streetTracker';
import type { StreetSession, DailySummary } from '../types/streetTracker';

const COPY = {
  en: {
    title: 'Street Tracker',
    subtitle: 'Log it the second it happens',
    todayStats: "Today's performance",
    stops: 'Stops',
    brings: 'Brings',
    sales: 'Sales',
    revenue: 'Revenue',
    stop: 'Stop',
    bring: 'Bring',
    sale: 'Sale',
    conversionRate: 'Conversion rate',
    personalBests: 'Personal bests',
    bestStops: 'Best stops',
    bestBrings: 'Best brings',
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
  },
  es: {
    title: 'Tracker de Calle',
    subtitle: 'Regístralo en el momento',
    todayStats: 'Rendimiento de hoy',
    stops: 'Paradas',
    brings: 'Adentro',
    sales: 'Ventas',
    revenue: 'Ingresos',
    stop: 'Parada',
    bring: 'Adentro',
    sale: 'Venta',
    conversionRate: 'Tasa de conversión',
    personalBests: 'Mejores marcas',
    bestStops: 'Mejores paradas',
    bestBrings: 'Mejores adentro',
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
  stop: { fill: 'bg-teal-tint text-teal-strong', ink: 'text-teal-strong', xp: '+2' },
  bring: { fill: 'bg-violet-tint text-violet-strong', ink: 'text-violet-strong', xp: '+5' },
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
  const Icon = session.type === 'stop' ? Hand : session.type === 'bring' ? DoorOpen : Coins;
  const label = session.type === 'stop' ? t.stop : session.type === 'bring' ? t.bring : t.sale;

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
  const maxVal = Math.max(...data.map((d) => d.stops + d.brings + d.sales), 1);

  return (
    <div className="surface-flat p-4">
      <h3 className="mb-3 text-overline text-ink-3">{t.weekTrend}</h3>
      <div className="flex h-28 items-end justify-between gap-1.5">
        {data.map((day, i) => {
          const total = day.stops + day.brings + day.sales;
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

// ── Page ────────────────────────────────────────────────────────────────────

const StreetTrackerPage: React.FC = () => {
  const {
    logActivity,
    getTodayLogs,
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
  const bestBrings = useMemo(() => getPersonalBest('brings'), [getPersonalBest]);
  const bestSales = useMemo(() => getPersonalBest('sales'), [getPersonalBest]);
  const bestRevenue = useMemo(() => getPersonalBest('revenue'), [getPersonalBest]);

  return (
    // Clearance for the fixed quick-log bar. Layout already adds the nav pill's
    // own padding to <main>, so this only has to cover the bar itself.
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
              icon={<Hand className="h-3.5 w-3.5" aria-hidden="true" />}
            />
            <StatCard
              label={t.brings}
              value={summary.brings}
              ink="text-violet-strong"
              tint="bg-violet-tint"
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
            <PersonalBest label={t.bestBrings} value={bestBrings} delay={0.05} />
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
        onLogBring={() => logActivity('bring')}
        onLogSale={() => setShowSaleModal(true)}
      />

      <SaleLogModal
        isOpen={showSaleModal}
        onClose={() => setShowSaleModal(false)}
        onSubmit={(productId, amount, note) =>
          logActivity('sale', productId, amount, note || undefined)
        }
      />
    </div>
  );
};

export default StreetTrackerPage;
