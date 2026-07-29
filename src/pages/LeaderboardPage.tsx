// ─────────────────────────────────────────────────────────────────────────────
// LeaderboardPage — Andorra vs Gibraltar, without lying about it.
//
// The board is built from the real account roster. This device can only measure
// the signed-in seller's XP, so every other figure is shown as "awaiting sync"
// instead of an invented number. Everything on screen is either real or is
// labelled as missing. See `hooks/useLeaderboard.ts` for the TODO(backend).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Megaphone,
  Crown,
  CloudOff,
  Info,
  Trophy,
  Users,
} from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useLeaderboard, type Timeframe, type LeaderboardEntry } from '../hooks/useLeaderboard';
import PeerShoutout from '../components/PeerShoutout';

interface LeaderboardPageProps {
  currentUserId?: string;
  onNavigateHome?: () => void;
}

// ── Copy ────────────────────────────────────────────────────────────────────
// Local dictionary: `data/translations.ts` is another agent's file, so these
// strings live with the screen that uses them (the same pattern CheatSheetsPage
// and ProfilePage already follow). Spanish is European, informal "tú".

const COPY = {
  en: {
    title: 'Leaderboard',
    subtitle: 'Andorra 🇦🇩 vs Gibraltar 🇬🇮',
    back: 'Back to home',
    shoutout: 'Send a shout-out to a teammate',
    week: 'This week',
    month: 'This month',
    allTime: 'All time',
    storeRace: 'Store race',
    synced: 'synced',
    of: 'of',
    noFigures: 'No figures yet',
    leadsBy: 'leads by',
    xp: 'XP',
    tied: 'Level on the figures that have synced',
    noCompare: (store: string) => `Not a race yet — nothing has synced from ${store}`,
    deviceOnly:
      'Counted on this device only. Your teammates’ XP arrives when the shops are connected to a server — until then it shows as awaiting sync, not as a number we made up.',
    leading: 'Leading here',
    youOnly: 'Only your figures have synced so far',
    rankings: 'Rankings',
    awaiting: 'Awaiting sync',
    awaitingNote: 'No figures on this device yet',
    neverSynced: 'Never synced',
    yourRank: 'YOUR RANK',
    unranked: 'Earn XP to appear on the board',
    beat: 'Beat',
    you: 'You',
    loading: 'Loading the roster…',
    emptyTitle: 'Nobody on the roster yet',
    emptyBody: 'Ask your manager to add the team, then the race can start.',
    teammates: 'teammates',
    teammate: 'teammate',
  },
  es: {
    title: 'Clasificación',
    subtitle: 'Andorra 🇦🇩 vs Gibraltar 🇬🇮',
    back: 'Volver al inicio',
    shoutout: 'Envía un reconocimiento a un compañero',
    week: 'Esta semana',
    month: 'Este mes',
    allTime: 'Histórico',
    storeRace: 'Carrera entre tiendas',
    synced: 'sincronizados',
    of: 'de',
    noFigures: 'Aún sin datos',
    leadsBy: 'lidera por',
    xp: 'XP',
    tied: 'Empate con los datos sincronizados',
    noCompare: (store: string) => `Todavía no hay carrera — no ha llegado nada de ${store}`,
    deviceOnly:
      'Contado solo en este móvil. El XP de tus compañeros llegará cuando las tiendas estén conectadas a un servidor — hasta entonces aparece como pendiente de sincronizar, no como un número inventado.',
    leading: 'Va en cabeza aquí',
    youOnly: 'Por ahora solo se han sincronizado tus datos',
    rankings: 'Clasificación',
    awaiting: 'Pendiente de sincronizar',
    awaitingNote: 'Aún sin datos en este móvil',
    neverSynced: 'Nunca sincronizado',
    yourRank: 'TU PUESTO',
    unranked: 'Gana XP para entrar en la clasificación',
    beat: 'Supera a',
    you: 'Tú',
    loading: 'Cargando la plantilla…',
    emptyTitle: 'Todavía no hay nadie en la plantilla',
    emptyBody: 'Pide a tu responsable que añada al equipo y empezará la carrera.',
    teammates: 'compañeros',
    teammate: 'compañero',
  },
};

// ── Rank presentation ───────────────────────────────────────────────────────
// Gold is the achievement colour, so first place owns it. Coloured fills always
// take their dark `on-*` ink — never white.

function rankFill(rank: number): string {
  if (rank === 1) return 'bg-gold text-on-gold';
  if (rank === 2) return 'bg-teal text-on-teal';
  if (rank === 3) return 'bg-coral text-on-coral';
  return 'bg-surface-sunken text-ink-2 border border-line';
}

function RankBadge({ rank }: { rank: number }) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 14, stiffness: 220 }}
      className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-caption font-bold ${rankFill(
        rank
      )}`}
    >
      {rank}
    </motion.div>
  );
}

// ── Store race ──────────────────────────────────────────────────────────────

const STORE_BAR: Record<string, string> = {
  andorra: 'bg-teal',
  gibraltar: 'bg-violet',
};

function StoreRow({
  flag,
  name,
  knownXP,
  syncedCount,
  rosterCount,
  share,
  isLeading,
  storeId,
  t,
  delay,
}: {
  flag: string;
  name: string;
  knownXP: number;
  syncedCount: number;
  rosterCount: number;
  share: number;
  isLeading: boolean;
  storeId: string;
  t: (typeof COPY)['en'];
  delay: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-lg leading-none" aria-hidden="true">
            {flag}
          </span>
          <span className="text-body-small font-semibold text-ink truncate">{name}</span>
          {isLeading && knownXP > 0 && (
            <Crown className="w-4 h-4 shrink-0 text-gold-strong" aria-hidden="true" />
          )}
        </div>
        <span className="text-caption font-bold text-ink tabular-nums shrink-0">
          {syncedCount > 0 ? `${knownXP.toLocaleString()} ${t.xp}` : t.noFigures}
        </span>
      </div>

      <div className="h-3 rounded-full bg-surface-sunken overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${STORE_BAR[storeId] ?? 'bg-teal'}`}
          initial={{ width: 0 }}
          animate={{ width: `${share}%` }}
          transition={{ duration: 0.9, ease: 'easeOut', delay }}
        />
      </div>

      <p className="mt-1 text-caption text-ink-3">
        {syncedCount} {t.of} {rosterCount} {t.synced}
      </p>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function LeaderboardPage({
  currentUserId: currentUserIdProp,
  onNavigateHome,
}: LeaderboardPageProps) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { language } = useLanguage();
  const t = COPY[language === 'es' ? 'es' : 'en'];

  // Was hardcoded to "u7", so every seller on every device was identified as
  // the same fictional person ("Anna Roca") and saw an identical "your rank".
  const currentUserId = currentUserIdProp ?? user?.id ?? '';
  const goHome = onNavigateHome ?? (() => navigate('/home'));

  const [timeframe, setTimeframe] = useState<Timeframe>('week');
  const [showShoutout, setShowShoutout] = useState(false);

  const { entries, ranked, awaitingSync, standings, isLoading, getUserRank, addShoutout } =
    useLeaderboard(currentUserId, timeframe);

  const tabs: { label: string; value: Timeframe }[] = [
    { label: t.week, value: 'week' },
    { label: t.month, value: 'month' },
    { label: t.allTime, value: 'allTime' },
  ];

  const userRank = getUserRank(currentUserId);
  const userEntry = entries.find((e) => e.id === currentUserId);

  // rank is 1-based; the person ahead is at index rank-2. Guarded, because
  // an unranked user used to produce `leaderboard[-2]`.
  const personAhead =
    userRank !== null && userRank > 1 ? (ranked[userRank - 2] as LeaderboardEntry | undefined) : undefined;
  const xpGap =
    personAhead && userEntry?.xp != null ? Math.max(0, (personAhead.xp ?? 0) - userEntry.xp) : 0;

  const totalKnownXP = standings.reduce((sum, s) => sum + s.knownXP, 0);
  const leadingStore = useMemo(() => {
    const [a, b] = standings;
    if (!a || !b || a.knownXP === b.knownXP) return null;
    return a.knownXP > b.knownXP ? a : b;
  }, [standings]);
  /** A shop that has reported nothing at all — it is not losing, it is absent. */
  const silentStore = useMemo(
    () => (standings.some((s) => s.syncedCount > 0) ? standings.find((s) => s.syncedCount === 0) : undefined),
    [standings]
  );
  const gap = leadingStore
    ? Math.abs((standings[0]?.knownXP ?? 0) - (standings[1]?.knownXP ?? 0))
    : 0;

  const podium = ranked.slice(0, 3);

  const handleShoutoutSubmit = (to: string, message: string, reaction: string) => {
    addShoutout(currentUserId, to, message, reaction);
  };

  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="mx-auto max-w-app">
        {/* ── Header ── */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-line">
          <div className="flex items-center gap-3 px-4 py-3">
            <button
              type="button"
              onClick={goHome}
              className="btn-icon shrink-0"
              aria-label={t.back}
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-h4 text-ink truncate">{t.title}</h1>
              <p className="text-caption text-ink-3 truncate">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setShowShoutout(true)}
              className="btn-icon shrink-0"
              aria-label={t.shoutout}
            >
              <Megaphone className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Timeframe */}
          <div className="flex gap-1.5 px-4 pb-3" role="tablist" aria-label={t.title}>
            {tabs.map((tab) => {
              const active = timeframe === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTimeframe(tab.value)}
                  className={`flex-1 min-h-touch rounded-chip text-caption font-semibold transition-colors ${
                    active
                      ? 'bg-teal text-on-teal'
                      : 'bg-surface-sunken text-ink-2 border border-line'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        <main className="px-4 pt-4 pb-8 space-y-5">
          {/* Your standing, at the TOP.
              It used to be a `fixed bottom-0` bar — which the app's floating
              nav pill now sits directly on top of. Above the fold is also where
              it belongs: it is the first thing a seller opens this page for. */}
          {userEntry && (
            <motion.section
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="surface-raised flex items-center gap-3 p-3"
              aria-label={t.yourRank}
            >
              <div className="flex shrink-0 flex-col items-center">
                <span className="text-h3 tabular-nums text-teal-strong">
                  {userRank !== null ? `#${userRank}` : '—'}
                </span>
                <span className="text-caption text-ink-3">{t.yourRank}</span>
              </div>

              <div className="h-10 w-px shrink-0 bg-line" />

              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal text-caption font-bold text-on-teal">
                  {userEntry.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-body-small font-semibold text-ink">{userEntry.name}</p>
                  <p className="text-caption tabular-nums text-ink-2">
                    {userEntry.xp !== null ? `${userEntry.xp.toLocaleString()} ${t.xp}` : t.unranked}
                  </p>
                </div>
              </div>

              {personAhead && xpGap > 0 ? (
                <div className="shrink-0 text-right">
                  <p className="text-caption text-ink-3">
                    {t.beat} {personAhead.name.split(' ')[0]}
                  </p>
                  <p className="text-caption font-bold text-gold-strong">
                    +{xpGap} {t.xp}
                  </p>
                </div>
              ) : (
                userRank === 1 && (
                  <Crown className="h-6 w-6 shrink-0 text-gold-strong" aria-hidden="true" />
                )
              )}
            </motion.section>
          )}

          {isLoading ? (
            <div className="surface-flat p-8 flex flex-col items-center gap-3">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-teal border-t-transparent" />
              <p className="text-body-small text-ink-2">{t.loading}</p>
            </div>
          ) : entries.length === 0 ? (
            <div className="surface-flat p-8 text-center">
              <Users className="mx-auto mb-3 h-8 w-8 text-ink-3" aria-hidden="true" />
              <h2 className="text-h4 text-ink mb-1">{t.emptyTitle}</h2>
              <p className="text-body-small text-ink-2">{t.emptyBody}</p>
            </div>
          ) : (
            <>
              {/* ── Andorra vs Gibraltar ── */}
              <section className="surface-raised p-4" aria-label={t.storeRace}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-overline text-ink-3">{t.storeRace}</h2>
                  <span className="text-caption text-ink-3">{t[timeframe]}</span>
                </div>

                <div className="space-y-3.5">
                  {standings.map((s, i) => (
                    <StoreRow
                      key={s.store}
                      storeId={s.store}
                      flag={s.flag}
                      name={s.name}
                      knownXP={s.knownXP}
                      syncedCount={s.syncedCount}
                      rosterCount={s.rosterCount}
                      share={totalKnownXP > 0 ? (s.knownXP / totalKnownXP) * 100 : 0}
                      isLeading={leadingStore?.store === s.store}
                      t={t}
                      delay={0.1 + i * 0.12}
                    />
                  ))}
                </div>

                {/* "Andorra leads by 150 XP" is only true if Gibraltar has
                    actually reported something. One store versus silence is
                    not a lead — say what it really is. */}
                {totalKnownXP > 0 && (
                  <p className="mt-3.5 text-center text-caption text-ink-2">
                    {silentStore
                      ? t.noCompare(`${silentStore.flag} ${silentStore.name}`)
                      : leadingStore
                        ? `${leadingStore.flag} ${leadingStore.name} ${t.leadsBy} ${gap.toLocaleString()} ${t.xp}`
                        : t.tied}
                  </p>
                )}

                {/* The honest bit, on screen and not in a tooltip. */}
                <div className="mt-3 flex items-start gap-2 rounded-chip bg-surface-sunken p-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />
                  <p className="text-caption text-ink-2">{t.deviceOnly}</p>
                </div>
              </section>

              {/* ── Podium / solo card ── */}
              {podium.length >= 2 ? (
                <section className="px-1" aria-label={t.rankings}>
                  <div className="flex items-end justify-center gap-3">
                    {podium.map((entry, idx) => {
                      const rank = idx + 1;
                      const heights = ['h-24', 'h-20', 'h-16'];
                      return (
                        <motion.div
                          key={entry.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex flex-1 flex-col items-center gap-2"
                        >
                          <div
                            className={`relative flex h-12 w-12 items-center justify-center rounded-full text-body-small font-bold ${rankFill(
                              rank
                            )}`}
                          >
                            {entry.initials}
                            {rank === 1 && (
                              <Crown
                                className="absolute -top-2 -right-1 h-5 w-5 text-gold-strong"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                          <p className="w-full truncate text-center text-caption font-medium text-ink">
                            {entry.isYou ? t.you : entry.name.split(' ')[0]}
                          </p>
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            transition={{ delay: 0.15 + idx * 0.1 }}
                            className={`flex w-full ${heights[idx]} items-end justify-center rounded-t-card pb-2 ${rankFill(
                              rank
                            )}`}
                          >
                            <span className="text-caption font-bold tabular-nums">
                              {(entry.xp ?? 0).toLocaleString()}
                            </span>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              ) : (
                podium.length === 1 && (
                  <section className="surface-feature feature-gold p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-on-gold">
                        <Trophy className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-overline text-gold-strong">{t.leading}</p>
                        <p className="truncate text-h4 text-ink">
                          {podium[0].isYou ? t.you : podium[0].name}
                        </p>
                        <p className="text-caption text-ink-2">{t.youOnly}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-h3 tabular-nums text-ink">
                          {(podium[0].xp ?? 0).toLocaleString()}
                        </p>
                        <p className="text-caption text-ink-3">{t.xp}</p>
                      </div>
                    </div>
                  </section>
                )
              )}

              {/* ── Ranked list ── */}
              {ranked.length > 0 && (
                <section>
                  <h2 className="mb-2 text-overline text-ink-3">{t.rankings}</h2>
                  <ul className="space-y-2">
                    {ranked.map((entry, index) => {
                      const rank = index + 1;
                      return (
                        <motion.li
                          key={entry.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(index * 0.04, 0.3) }}
                          className={`flex items-center gap-3 rounded-card border p-3 ${
                            entry.isYou
                              ? 'border-teal/45 bg-teal-tint'
                              : 'border-line bg-surface'
                          }`}
                        >
                          <RankBadge rank={rank} />
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                              entry.isYou
                                ? 'bg-teal text-on-teal'
                                : 'bg-surface-sunken text-ink-2 border border-line'
                            }`}
                          >
                            {entry.initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <p className="truncate text-body-small font-semibold text-ink">
                                {entry.name}
                              </p>
                              <span className="shrink-0 text-caption" aria-hidden="true">
                                {entry.flag}
                              </span>
                            </div>
                            {entry.isYou && (
                              <p className="text-caption text-teal-strong">{t.you}</p>
                            )}
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-body-small font-bold tabular-nums text-ink">
                              {(entry.xp ?? 0).toLocaleString()}
                            </p>
                            <p className="text-caption text-ink-3">{t.xp}</p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </section>
              )}

              {/* ── Awaiting sync ── */}
              {awaitingSync.length > 0 && (
                <section>
                  <div className="mb-2 flex items-center gap-2">
                    <CloudOff className="h-4 w-4 text-ink-3" aria-hidden="true" />
                    <h2 className="text-overline text-ink-3">
                      {t.awaiting} · {awaitingSync.length}{' '}
                      {awaitingSync.length === 1 ? t.teammate : t.teammates}
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {awaitingSync.map((entry) => (
                      <li
                        key={entry.id}
                        className="flex items-center gap-3 rounded-card border border-dashed border-line bg-surface-sunken p-3"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-caption font-bold text-ink-3">
                          {entry.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate text-body-small font-medium text-ink-2">
                              {entry.name}
                            </p>
                            <span className="shrink-0 text-caption" aria-hidden="true">
                              {entry.flag}
                            </span>
                          </div>
                          <p className="text-caption text-ink-3">{t.awaitingNote}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-body-small font-bold text-ink-3" aria-label={t.neverSynced}>
                            —
                          </p>
                          <p className="text-caption text-ink-3">{t.xp}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </main>
      </div>

      {/* ── Shout-out sheet ── */}
      <AnimatePresence>
        {showShoutout && (
          <PeerShoutout
            teammates={entries
              .filter((e) => e.id !== currentUserId)
              .map((e) => ({ id: e.id, name: e.name, initials: e.initials, flag: e.flag }))}
            onSubmit={handleShoutoutSubmit}
            onClose={() => setShowShoutout(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
