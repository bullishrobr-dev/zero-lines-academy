import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStreetTracker } from '../hooks/useStreetTracker';
import QuickLogButtons from '../components/QuickLogButtons';
import SaleLogModal from '../components/SaleLogModal';
import BetweenShiftsCard from '../components/BetweenShiftsCard';
import { PRODUCTS } from '../types/streetTracker';
import type { StreetSession, DailySummary } from '../types/streetTracker';

const t = {
  en: {
    title: 'Street Tracker',
    todayStats: "Today's Performance",
    stops: 'Stops',
    brings: 'Brings',
    sales: 'Sales',
    revenue: 'Revenue',
    conversionRate: 'Conversion Rate',
    personalBests: 'Personal Bests',
    bestStops: 'Best Stops',
    bestBrings: 'Best Brings',
    bestSales: 'Best Sales',
    bestRevenue: 'Best Revenue',
    weekTrend: '7-Day Trend',
    activityLog: 'Activity Log',
    noActivity: "No activity yet today. Let's get out there!",
    justNow: 'Just now',
    minsAgo: 'm ago',
    hrsAgo: 'h ago',
    xpToday: 'XP Today',
    dayStreak: 'day streak',
    saleNote: 'Sale:',
    noteLabel: 'Note:',
  },
  es: {
    title: 'Tracker de Calle',
    todayStats: 'Rendimiento de Hoy',
    stops: 'Paradas',
    brings: 'Adentro',
    sales: 'Ventas',
    revenue: 'Ingresos',
    conversionRate: 'Tasa de Conversión',
    personalBests: 'Mejores Marcas',
    bestStops: 'Mejores Paradas',
    bestBrings: 'Mejores Adentro',
    bestSales: 'Mejores Ventas',
    bestRevenue: 'Mejores Ingresos',
    weekTrend: 'Tendencia 7 Días',
    activityLog: 'Registro de Actividad',
    noActivity: 'Sin actividad aún hoy. ¡Vamos allá!',
    justNow: 'Ahora mismo',
    minsAgo: 'm',
    hrsAgo: 'h',
    xpToday: 'XP Hoy',
    dayStreak: 'días racha',
    saleNote: 'Venta:',
    noteLabel: 'Nota:',
  },
};

function timeAgo(timestamp: number, lang: 'en' | 'es'): string {
  const mins = Math.floor((Date.now() - timestamp) / 60000);
  if (mins < 1) return t[lang].justNow;
  if (mins < 60) return `${mins}${t[lang].minsAgo}`;
  const hrs = Math.floor(mins / 60);
  return `${hrs}${t[lang].hrsAgo}`;
}

function formatCurrency(amount: number): string {
  return `€${amount.toLocaleString()}`;
}

function formatDateLabel(dateKey: string): string {
  const d = new Date(dateKey + 'T00:00:00');
  return d.toLocaleDateString('en', { weekday: 'short' }).slice(0, 3);
}

const ActivityItem: React.FC<{ session: StreetSession; lang: 'en' | 'es' }> = ({
  session,
  lang,
}) => {
  const product = PRODUCTS.find((p) => p.id === session.productId);
  const productName = product ? (lang === 'es' ? product.nameEs : product.name) : '';

  const icon =
    session.type === 'stop' ? '🛑' : session.type === 'bring' ? '🚪' : '💰';
  const color =
    session.type === 'stop'
      ? 'text-[#0ABAB5] bg-[#0ABAB5]/10 border-[#0ABAB5]/20'
      : session.type === 'bring'
      ? 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20'
      : 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20';
  const label =
    session.type === 'stop'
      ? '+2'
      : session.type === 'bring'
      ? '+5'
      : '+10';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 py-2.5 border-b border-gray-800/40 last:border-b-0"
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-base border flex-shrink-0 mt-0.5 ${color}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white capitalize">
            {session.type === 'stop'
              ? t[lang].stops.slice(0, -1)
              : session.type === 'bring'
              ? t[lang].brings.slice(0, -1)
              : t[lang].sales.slice(0, -1)}
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${color.split(' ')[0]}`}>{label} XP</span>
            <span className="text-[10px] text-gray-500">{timeAgo(session.timestamp, lang)}</span>
          </div>
        </div>
        {session.type === 'sale' && productName && (
          <p className="text-xs text-[#F59E0B]/80 mt-0.5">
            {t[lang].saleNote} {productName} — {formatCurrency(session.amount || 0)}
          </p>
        )}
        {session.note && (
          <p className="text-[11px] text-gray-400 mt-0.5 italic truncate">{session.note}</p>
        )}
      </div>
    </motion.div>
  );
};

const StatCard: React.FC<{
  label: string;
  value: string | number;
  color: string;
  icon: string;
  delay?: number;
}> = ({ label, value, color, icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-[#141414] rounded-xl p-3 border border-gray-800/50"
  >
    <div className="flex items-center gap-1.5 mb-1.5">
      <span className="text-sm">{icon}</span>
      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-2xl font-bold" style={{ color }}>
      {value}
    </p>
  </motion.div>
);

const ConversionGauge: React.FC<{ rate: number }> = ({ rate }) => {
  const clamped = Math.min(rate, 100);
  const getColor = () => {
    if (clamped >= 50) return '#22C55E';
    if (clamped >= 25) return '#0ABAB5';
    if (clamped >= 10) return '#F59E0B';
    return '#EF4444';
  };
  const color = getColor();

  return (
    <div className="bg-[#141414] rounded-xl p-4 border border-gray-800/50">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
          Conversion Rate
        </span>
        <span className="text-lg font-bold" style={{ color }}>
          {rate}%
        </span>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[9px] text-gray-600">0%</span>
        <span className="text-[9px] text-gray-600">50%</span>
        <span className="text-[9px] text-gray-600">100%</span>
      </div>
    </div>
  );
};

const WeekChart: React.FC<{ data: DailySummary[]; lang: 'en' | 'es' }> = ({ data, lang }) => {
  const maxVal = Math.max(...data.map((d) => d.stops + d.brings + d.sales), 1);

  return (
    <div className="bg-[#141414] rounded-xl p-4 border border-gray-800/50">
      <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
        {t[lang].weekTrend}
      </h3>
      <div className="flex items-end justify-between gap-1.5 h-28">
        {data.map((day, i) => {
          const total = day.stops + day.brings + day.sales;
          const pct = total === 0 ? 0 : (total / maxVal) * 100;
          // Revenue indicator could be added here as a dot overlay
          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex-1 flex items-end justify-center gap-0.5">
                {/* Activity bar */}
                <motion.div
                  className="w-full max-w-[18px] rounded-t-md"
                  style={{ backgroundColor: '#0ABAB5' }}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(pct, 4)}%` }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                />
              </div>
              {/* Revenue dot indicator */}
              {day.revenue > 0 && (
                <div
                  className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"
                  title={`€${day.revenue}`}
                />
              )}
              {day.revenue === 0 && <div className="w-1.5 h-1.5" />}
              <span className="text-[9px] text-gray-500">{formatDateLabel(day.date)}</span>
            </div>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-800/30">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-[#0ABAB5]" />
          <span className="text-[9px] text-gray-500">Activity</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
          <span className="text-[9px] text-gray-500">Revenue</span>
        </div>
      </div>
    </div>
  );
};

const PersonalBestBadge: React.FC<{
  label: string;
  value: string | number;
  color: string;
  delay?: number;
}> = ({ label, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', stiffness: 300 }}
    className="flex items-center gap-2 bg-[#0A0A0A] rounded-lg px-3 py-2 border border-gray-800/40"
  >
    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
      <span className="text-xs">🏆</span>
    </div>
    <div>
      <p className="text-[9px] text-gray-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  </motion.div>
);

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

  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showBetweenShifts, setShowBetweenShifts] = useState(() => {
    const visits = parseInt(localStorage.getItem('zl_tracker_visits') || '0', 10);
    localStorage.setItem('zl_tracker_visits', String(visits + 1));
    return visits >= 2;
  });

  const txt = t[lang];
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayLogs = useMemo(() => getTodayLogs(), [getTodayLogs]);
  const summary = useMemo(() => getDailySummary(todayKey), [getDailySummary, todayKey]);
  const weekData = useMemo(() => getWeekSummary(), [getWeekSummary]);
  const totalXP = useMemo(() => getTotalXP(), [getTotalXP]);
  const streak = useMemo(() => getStreak(), [getStreak]);

  const bestStops = useMemo(() => getPersonalBest('stops'), [getPersonalBest]);
  const bestBrings = useMemo(() => getPersonalBest('brings'), [getPersonalBest]);
  const bestSales = useMemo(() => getPersonalBest('sales'), [getPersonalBest]);
  const bestRevenue = useMemo(() => getPersonalBest('revenue'), [getPersonalBest]);

  const handleLogStop = () => logActivity('stop');
  const handleLogBring = () => logActivity('bring');
  const handleLogSale = () => setShowSaleModal(true);

  const handleSaleSubmit = (productId: string, amount: number, note: string) => {
    logActivity('sale', productId, amount, note || undefined);
  };

  // Force re-render on log by using a key derived from sessions count
  const [, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white max-w-[430px] mx-auto relative pb-36">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-gray-800/40">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold text-white">{txt.title}</h1>
            <p className="text-[10px] text-gray-500">Zero Lines Training Academy</p>
          </div>
          <div className="flex items-center gap-2">
            {/* XP Badge */}
            <div className="flex items-center gap-1 bg-[#0ABAB5]/10 border border-[#0ABAB5]/20 rounded-full px-2.5 py-1">
              <span className="text-xs">⚡</span>
              <span className="text-xs font-bold text-[#0ABAB5]">{totalXP} XP</span>
            </div>
            {/* Streak */}
            {streak > 1 && (
              <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 rounded-full px-2.5 py-1">
                <span className="text-xs">🔥</span>
                <span className="text-xs font-bold text-orange-400">
                  {streak} {t[lang].dayStreak}
                </span>
              </div>
            )}
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="w-8 h-8 rounded-full bg-gray-800 text-[10px] font-bold text-gray-300 flex items-center justify-center"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Between Shifts Card */}
        <AnimatePresence>
          {showBetweenShifts && (
            <BetweenShiftsCard
              lang={lang}
              onFlashcardSprint={() => setShowBetweenShifts(false)}
              onScenarioDrill={() => setShowBetweenShifts(false)}
              onTechniqueReminder={() => setShowBetweenShifts(false)}
              onDismiss={() => setShowBetweenShifts(false)}
            />
          )}
        </AnimatePresence>

        {/* Today's Stats Grid */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-0.5">
            {txt.todayStats}
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            <StatCard label={txt.stops} value={summary.stops} color="#0ABAB5" icon="🛑" delay={0} />
            <StatCard label={txt.brings} value={summary.brings} color="#22C55E" icon="🚪" delay={0.05} />
            <StatCard label={txt.sales} value={summary.sales} color="#F59E0B" icon="💰" delay={0.1} />
            <StatCard
              label={txt.revenue}
              value={formatCurrency(summary.revenue)}
              color="#F59E0B"
              icon="💶"
              delay={0.15}
            />
          </div>
        </div>

        {/* Conversion Rate Gauge */}
        <ConversionGauge rate={summary.conversionRate} />

        {/* Personal Bests */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-0.5">
            {txt.personalBests}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <PersonalBestBadge label={txt.bestStops} value={bestStops} color="#0ABAB5" delay={0} />
            <PersonalBestBadge
              label={txt.bestBrings}
              value={bestBrings}
              color="#22C55E"
              delay={0.05}
            />
            <PersonalBestBadge label={txt.bestSales} value={bestSales} color="#F59E0B" delay={0.1} />
            <PersonalBestBadge
              label={txt.bestRevenue}
              value={formatCurrency(bestRevenue)}
              color="#F59E0B"
              delay={0.15}
            />
          </div>
        </div>

        {/* Week Trend Chart */}
        <WeekChart data={weekData} lang={lang} />

        {/* Activity Log */}
        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-0.5">
            {txt.activityLog}
          </h2>
          <div className="bg-[#141414] rounded-xl p-4 border border-gray-800/50">
            {todayLogs.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-3xl block mb-2">🚪</span>
                <p className="text-sm text-gray-500">{txt.noActivity}</p>
              </div>
            ) : (
              <div className="max-h-64 overflow-y-auto pr-1">
                <AnimatePresence>
                  {todayLogs.map((log) => (
                    <ActivityItem key={log.id} session={log} lang={lang} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Bottom spacer for fixed buttons */}
        <div className="h-4" />
      </div>

      {/* Quick Log Buttons - Fixed Bottom */}
      <QuickLogButtons
        onLogStop={() => {
          handleLogStop();
          refresh();
        }}
        onLogBring={() => {
          handleLogBring();
          refresh();
        }}
        onLogSale={handleLogSale}
        lang={lang}
      />

      {/* Sale Log Modal */}
      <SaleLogModal
        isOpen={showSaleModal}
        onClose={() => setShowSaleModal(false)}
        onSubmit={(productId, amount, note) => {
          handleSaleSubmit(productId, amount, note);
          refresh();
        }}
        lang={lang}
      />
    </div>
  );
};

export default StreetTrackerPage;
