// ─────────────────────────────────────────────────────────────────────────────
// ProfilePage.tsx — the seller's own screen.
//
// Rebuilt on the Counter Light design system. Notable changes:
//  • Levels/achievements moved to src/data/gamification.ts (two badges there
//    were impossible to earn — see that file).
//  • Achievements are collectible artefacts now: champagne foil when owned,
//    embossed silhouette when not, with a real unlock moment (ConfettiCelebration
//    + XPToast, both of which existed in the repo and were rendered nowhere).
//  • The shop is presented as the read-only fact it is. The old code showed a
//    "Locked" badge next to a toggle that only appeared when signed OUT. The
//    name is the same kind of fact now: it comes from the committed roster in
//    src/data/accounts.ts, so there is nothing here that could save an edit.
//  • "Share my stats" copies this seller's own numbers as plain text. Progress
//    never leaves the device that earned it — there is no server — so pasting
//    it into WhatsApp is the honest version of a team view.
//  • 43 hardcoded English strings replaced: the 26 Profile/Achievement keys that
//    already existed in translations.ts were never wired up, and this file never
//    even destructured `t`.
//  • The hand-rolled language modal (no focus trap, no Escape, white-on-teal at
//    2.41:1) is now a Radix AlertDialog with dark ink on the teal fill.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  AtSign,
  Bell,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Flame,
  KeyRound,
  Languages,
  Lock,
  LogOut,
  MapPin,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Share2,
  Shield,
  Sparkles,
  Sun,
  Target,
  Trophy,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { isDatabaseConfigured } from '@/backend/supabaseClient';
import { useProgress } from '@/hooks/useProgress';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme, type ThemePreference } from '@/contexts/ThemeContext';
import { useCurrency } from '@/utils/currency';
import { useLocation as useShop } from '@/contexts/LocationContext';
import DailyChallengeCard from '@/components/DailyChallengeCard';
import ConfettiCelebration from '@/components/ConfettiCelebration';
import XPToast from '@/components/XPToast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { categories, getLesson } from '@/data/lessons';
import {
  ACHIEVEMENTS,
  getAchievement,
  getLevelProgress,
  getUnlockedAchievementIds,
  type AccentToken,
  type Achievement,
} from '@/data/gamification';

/* Strings with no key in src/data/translations.ts. Same pattern the rest of the
   app uses — that file is owned elsewhere, so new copy lives with its screen. */
const COPY = {
  yourAccount: { en: 'Your account', es: 'Tu cuenta' },
  yourShop: { en: 'Your shop', es: 'Tu tienda' },
  shopExplainer: {
    en: 'Your manager assigns your shop. It decides the prices and the currency you are trained on, so only they can change it.',
    es: 'Tu responsable asigna tu tienda. Define los precios y la moneda con los que te formas, así que solo puede cambiarla él.',
  },
  role: { en: 'Role', es: 'Puesto' },
  roleAdmin: { en: 'Administrator', es: 'Administrador' },
  roleManager: { en: 'Manager', es: 'Responsable' },
  roleSeller: { en: 'Salesperson', es: 'Vendedor' },
  joined: { en: 'Joined', es: 'Desde' },
  username: { en: 'Username', es: 'Usuario' },
  usernameNote: {
    en: 'Your name and username are set by your manager.',
    es: 'Tu nombre y tu usuario los pone tu responsable.',
  },
  viewingShop: { en: 'Viewing as', es: 'Viendo como' },
  viewingShopNote: {
    en: 'You run both shops, so you are not tied to either. Switch to see exactly what a seller there sees.',
    es: 'Diriges las dos tiendas, así que no estás fijado a ninguna. Cambia para ver justo lo que ve un vendedor de allí.',
  },
  changePassword: { en: 'Change your password', es: 'Cambiar tu contraseña' },
  changePasswordDesc: {
    en: 'Pick a new one. Takes a moment.',
    es: 'Elige una nueva. Es un momento.',
  },
  signOut: { en: 'Sign out', es: 'Cerrar sesión' },
  shareStats: { en: 'Share my stats', es: 'Compartir mis datos' },
  shareCopied: { en: 'Copied — now paste it', es: 'Copiado — ahora pégalo' },
  shareHint: {
    en: 'Copies your numbers as plain text. Your progress stays on this phone, so this is how your manager gets to see it.',
    es: 'Copia tus números en texto plano. Tu progreso se queda en este móvil, así que así es como lo ve tu responsable.',
  },
  shareLevel: { en: 'Level', es: 'Nivel' },
  shareXP: { en: 'XP', es: 'XP' },
  shareLessons: { en: 'Lessons completed', es: 'Lecciones completadas' },
  shareQuizzes: { en: 'Quizzes passed', es: 'Tests superados' },
  shareStreak: { en: 'Current streak', es: 'Racha actual' },
  shareDays: { en: 'days', es: 'días' },
  shareAccuracy: { en: 'Accuracy', es: 'Precisión' },
  tools: { en: 'Shortcuts', es: 'Accesos' },
  firstDay: { en: 'First Day Track', es: 'Ruta del Primer Día' },
  firstDayDesc: { en: 'Quick-start guide for new hires', es: 'Guía rápida para los nuevos' },
  managerDash: { en: 'Manager dashboard', es: 'Panel del responsable' },
  managerDashDesc: { en: "See your team's progress", es: 'Mira el progreso de tu equipo' },
  adminPanel: { en: 'Admin panel', es: 'Panel de administración' },
  adminPanelDesc: { en: 'Manage people and shops', es: 'Gestiona personas y tiendas' },
  appearance: { en: 'Appearance', es: 'Apariencia' },
  themeLight: { en: 'Light', es: 'Claro' },
  themeDark: { en: 'Dark', es: 'Oscuro' },
  themeSystem: { en: 'System', es: 'Sistema' },
  themeHint: {
    en: 'System follows your phone. Dark is easier on the eyes on a late shift.',
    es: 'Sistema sigue tu móvil. Oscuro se agradece en el turno de noche.',
  },
  language: { en: 'Language', es: 'Idioma' },
  langConfirmTitle: { en: 'Switch to English?', es: '¿Cambiar a español?' },
  langConfirmBody: {
    en: 'The app reloads and everything is shown in English. Your progress is kept.',
    es: 'La app se recarga y todo se muestra en español. Tu progreso se mantiene.',
  },
  confirm: { en: 'Switch', es: 'Cambiar' },
  dangerZone: { en: 'Careful', es: 'Con cuidado' },
  artefacts: { en: 'artefacts', es: 'piezas' },
  howToUnlock: { en: 'How to earn it', es: 'Cómo conseguirlo' },
  unlockedTitle: { en: 'Artefact unlocked', es: 'Pieza desbloqueada' },
  levelUpTitle: { en: 'Level up', es: 'Subiste de nivel' },
  keepGoing: { en: 'Keep going', es: 'Seguir' },
  rarityCommon: { en: 'Common', es: 'Común' },
  rarityRare: { en: 'Rare', es: 'Poco común' },
  rarityLegendary: { en: 'Legendary', es: 'Legendaria' },
  activityLesson: { en: 'Lesson completed', es: 'Lección completada' },
  activityQuiz: { en: 'Quiz completed', es: 'Cuestionario completado' },
  activityQuizPerfect: { en: 'Perfect quiz score', es: 'Cuestionario perfecto' },
  activityChallenge: { en: 'Daily challenge done', es: 'Reto diario hecho' },
  progressTitle: { en: 'Your numbers', es: 'Tus números' },
  nothingYet: { en: 'Nothing here yet', es: 'Aún no hay nada' },
} as const;

type CopyKey = keyof typeof COPY;

/* ── Accent plumbing ──
   Tailwind needs whole class names at build time, so accents are looked up in a
   table rather than assembled from a string. */
const ACCENT: Record<AccentToken, { fill: string; tint: string; text: string; ring: string }> = {
  teal: { fill: 'bg-teal', tint: 'bg-teal-tint', text: 'text-teal-strong', ring: 'ring-teal/30' },
  coral: { fill: 'bg-coral', tint: 'bg-coral-tint', text: 'text-coral-strong', ring: 'ring-coral/30' },
  gold: { fill: 'bg-gold', tint: 'bg-gold-tint', text: 'text-gold-strong', ring: 'ring-gold/30' },
  violet: { fill: 'bg-violet', tint: 'bg-violet-tint', text: 'text-violet-strong', ring: 'ring-violet/30' },
};

/* The lesson data ships hex accent colours that cannot adapt to dark mode. Map
   each category onto a design-system hue instead. */
const CATEGORY_ACCENT: Record<string, AccentToken> = {
  psychology: 'violet',
  connecting: 'teal',
  stopping: 'coral',
  products: 'gold',
};

const SNAPSHOT_KEY = 'zl_profile_seen';
const REMINDER_KEY = 'zl_daily_reminder';

interface Snapshot {
  xp: number;
  level: number;
  unlocked: string[];
}

function readSnapshot(): Snapshot | null {
  try {
    const raw = localStorage.getItem(SNAPSHOT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Snapshot>;
    if (typeof parsed?.xp !== 'number' || typeof parsed?.level !== 'number') return null;
    return { xp: parsed.xp, level: parsed.level, unlocked: parsed.unlocked ?? [] };
  } catch {
    return null;
  }
}

function writeSnapshot(next: Snapshot) {
  try {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked — the worst case is a celebration replaying once.
  }
}

/** `createdAt` used to be dropped from the session, which printed "Invalid Date". */
function formatDate(value: string | undefined, locale: string, withTime = false): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  });
}

/* ── Small building blocks ── */

function SectionHeading({
  icon: Icon,
  title,
  meta,
}: {
  icon: LucideIcon;
  title: string;
  meta?: string;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3 px-1">
      <h2 className="flex items-center gap-2 text-overline text-ink-3">
        <Icon size={14} aria-hidden />
        {title}
      </h2>
      {meta && <span className="text-caption text-ink-3">{meta}</span>}
    </div>
  );
}

function Artefact({
  achievement,
  unlocked,
  size = 'md',
  label,
}: {
  achievement: Achievement;
  unlocked: boolean;
  size?: 'md' | 'lg';
  label: string;
}) {
  const Icon = achievement.icon;
  const box = size === 'lg' ? 'h-24 w-24' : 'h-14 w-14';
  const iconSize = size === 'lg' ? 40 : 24;

  return (
    <div
      className={[
        box,
        'relative flex shrink-0 items-center justify-center rounded-full',
        unlocked
          ? 'foil-gold ring-1 ring-gold/50 shadow-[0_4px_14px_-6px_rgb(var(--gold)/0.8)]'
          : 'bg-surface-sunken ring-1 ring-line shadow-[inset_0_2px_6px_rgb(var(--ink)/0.16)]',
      ].join(' ')}
      role="img"
      aria-label={label}
    >
      <Icon
        size={iconSize}
        aria-hidden
        className={
          unlocked
            ? 'text-on-gold drop-shadow-[0_1px_0_rgb(var(--gold)/0.9)]'
            : 'text-line-strong drop-shadow-[0_1px_0_rgb(var(--surface))]'
        }
      />
    </div>
  );
}

/* ── Page ── */

export default function ProfilePage() {
  const navigate = useNavigate();
  const progress = useProgress();
  const { language, setLanguage, t } = useLanguage();
  const { preference, setPreference } = useTheme();
  const { currency, locationName } = useCurrency();
  const { location: shopLocation, setLocation, isLocked } = useShop();
  const authCtx = useAuthContext();
  const authUser = authCtx.user;

  const isEs = language === 'es';
  const c = useCallback((key: CopyKey) => (isEs ? COPY[key].es : COPY[key].en), [isEs]);
  const locale = isEs ? 'es-ES' : 'en-GB';

  const [pendingLang, setPendingLang] = useState<'en' | 'es' | null>(null);
  const [statsCopied, setStatsCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);
  const [reminderEnabled, setReminderEnabled] = useState(() => {
    try {
      return localStorage.getItem(REMINDER_KEY) === '1';
    } catch {
      return false;
    }
  });

  // Celebrations
  const [detailId, setDetailId] = useState<string | null>(null);
  /* What this seller had the last time they opened this screen. Captured once,
     at mount, so everything below is derived during render — no setState in an
     effect, no cascading renders. */
  const [baseline] = useState<Snapshot | null>(() => readSnapshot());
  const [dismissedUnlocks, setDismissedUnlocks] = useState<string[]>([]);
  const [levelToastDone, setLevelToastDone] = useState(false);
  const [confettiDone, setConfettiDone] = useState(false);

  const displayName = authUser?.name || progress.getUserName() || t('profileSalesTrainee');

  const xp = progress.getTotalXP();
  const levelInfo = useMemo(() => getLevelProgress(xp), [xp]);
  const { level, next, percent } = levelInfo;
  const levelAccent = ACCENT[level.accent];
  const levelName = isEs ? level.name.es : level.name.en;

  const lessonsCompleted = progress.getLessonsCompletedCount();
  const quizzesPassed = progress.getQuizzesPassedCount();
  const currentStreak = progress.getCurrentStreak();
  const bestStreak = progress.getBestStreak();
  const accuracy = progress.getAccuracyRate();
  const activityLog = progress.getActivityLog();

  const unlockedIds = useMemo(() => getUnlockedAchievementIds(progress), [progress]);
  const unlockedKey = unlockedIds.join(',');
  const unlockedCount = unlockedIds.length;

  /* Celebrate anything earned since this seller last opened their profile — the
     lesson that levelled them up happened two screens ago, so the payoff has to
     look backwards. An XP total *below* the snapshot means the progress hook has
     not hydrated from localStorage yet; treating that as real would fire a bogus
     level-up on the very next render. */
  const hydrated = !baseline || xp >= baseline.xp;
  const freshUnlocks = baseline && hydrated ? unlockedIds.filter((id) => !baseline.unlocked.includes(id)) : [];
  const celebratingId = freshUnlocks.find((id) => !dismissedUnlocks.includes(id)) ?? null;
  const showLevelToast = !!baseline && hydrated && level.level > baseline.level && !levelToastDone;
  const wantsConfetti = (celebratingId !== null || showLevelToast) && !confettiDone;

  // Remember where they are now, so the same artefact never celebrates twice.
  useEffect(() => {
    if (!hydrated) return;
    writeSnapshot({
      xp,
      level: level.level,
      unlocked: unlockedKey ? unlockedKey.split(',') : [],
    });
  }, [xp, level.level, unlockedKey, hydrated]);

  /* The honest stand-in for a server-side team view: this seller's own numbers,
     as plain text they can paste into WhatsApp. Every figure comes from the
     progress hook — nothing here is estimated or rounded up. */
  const buildStatsSummary = () =>
    [
      `Zero Lines Academy — ${displayName}${authUser ? ` (${authUser.username})` : ''}`,
      `${c('shareLevel')} ${level.level} · ${levelName}`,
      `${c('shareXP')}: ${xp}`,
      `${c('shareLessons')}: ${lessonsCompleted}`,
      `${c('shareQuizzes')}: ${quizzesPassed}`,
      `${c('shareStreak')}: ${currentStreak} ${c('shareDays')}`,
      `${c('shareAccuracy')}: ${accuracy}%`,
    ].join('\n');

  const handleShareStats = async () => {
    const summary = buildStatsSummary();
    let ok = true;
    try {
      await navigator.clipboard.writeText(summary);
    } catch {
      // The Clipboard API needs a secure context, which a shop tablet is not
      // always on. A copy button that silently does nothing is worse than none.
      try {
        const ta = document.createElement('textarea');
        ta.value = summary;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (!ok) return;
    setStatsCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setStatsCopied(false), 2400);
  };

  const handleReset = () => {
    progress.resetProgress();
    writeSnapshot({ xp: 0, level: 1, unlocked: [] });
    setDismissedUnlocks([]);
    setLevelToastDone(true);
    setConfettiDone(true);
  };

  const toggleReminder = () => {
    setReminderEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(REMINDER_KEY, next ? '1' : '0');
      } catch {
        // preference simply will not survive a reload
      }
      return next;
    });
  };

  const roleLabel =
    authUser?.role === 'admin' ? c('roleAdmin') : authUser?.role === 'manager' ? c('roleManager') : c('roleSeller');

  const joined = formatDate(authUser?.createdAt, locale);
  const detailAchievement = detailId ? getAchievement(detailId) : undefined;
  const unlockedNow = celebratingId ? getAchievement(celebratingId) : undefined;

  const rarityLabel = (a: Achievement) =>
    a.rarity === 'legendary' ? c('rarityLegendary') : a.rarity === 'rare' ? c('rarityRare') : c('rarityCommon');

  return (
    <div className="min-h-full bg-background pb-10">
      {/* ── Identity ─────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-line bg-surface px-5 pb-6 pt-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-teal/10 blur-3xl"
        />

        <div className="relative flex items-start gap-4">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ring-2 ${levelAccent.tint} ${levelAccent.ring}`}
          >
            <span className={`text-h2 font-brand ${levelAccent.text}`}>
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            {/* A fact, not a field. The name is whatever the committed roster
                says; there is no server call that could change it from here. */}
            <h1 className="truncate text-h2 text-ink">{displayName}</h1>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption font-semibold ${levelAccent.tint} ${levelAccent.text}`}
              >
                <level.icon size={13} aria-hidden />
                {t('profileLevel')} {level.level} · {levelName}
              </span>
              <span className="text-caption text-ink-2">
                {xp} {t('profileXP')}
              </span>
            </div>
          </div>
        </div>

        {/* Level progress */}
        <div className="relative mt-5">
          <div className="mb-1.5 flex items-baseline justify-between text-caption">
            <span className="text-ink-2">
              {next ? `${levelInfo.xpIntoLevel} / ${levelInfo.xpForLevel} ${t('profileXP')}` : t('profileMaxLevel')}
            </span>
            {next && (
              <span className="text-ink-3">
                {levelInfo.xpToNext} {t('profileXPTO')} {next.level}
              </span>
            )}
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full bg-surface-sunken"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${t('profileLevel')} ${level.level}`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
              className={`h-full rounded-full ${levelAccent.fill}`}
            />
          </div>
        </div>

        {/* The shop is a fact of the account, not a control. */}
        <div className="relative mt-4 flex items-center gap-2 rounded-chip bg-surface-sunken px-3 py-2">
          <MapPin size={14} className="shrink-0 text-ink-3" aria-hidden />
          <span className="text-caption text-ink-2">
            {locationName} · {currency}
          </span>
          <span className="ml-auto text-caption text-ink-3">{c('yourShop')}</span>
        </div>
      </header>

      <div className="space-y-8 px-5 pt-6">
        {/* ── Today ── */}
        <section>
          <SectionHeading icon={Sparkles} title={t('homeDailyChallenge')} />
          <DailyChallengeCard
            isCompleted={progress.isDailyChallengeCompleted()}
            onComplete={progress.completeDailyChallenge}
          />
        </section>

        {/* ── Numbers ── */}
        <section>
          <SectionHeading icon={Zap} title={c('progressTitle')} />
          <div className="surface-raised p-4">
            <div className="grid grid-cols-3 divide-x divide-line">
              {[
                { label: t('profileTotalXP'), value: String(xp) },
                { label: t('profileLessons'), value: String(lessonsCompleted) },
                { label: t('profileStreak'), value: `${currentStreak}d` },
              ].map((stat) => (
                <div key={stat.label} className="px-1 text-center">
                  <p className="text-h2 text-ink">{stat.value}</p>
                  <p className="mt-0.5 text-caption text-ink-3">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
              {[
                { label: t('profileBestStreak'), value: `${bestStreak}d` },
                { label: t('profileQuizzesPassed'), value: String(quizzesPassed) },
                { label: t('profileAccuracy'), value: `${accuracy}%` },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-body font-semibold text-ink">{stat.value}</p>
                  <p className="text-caption leading-4 text-ink-3">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Progress never leaves this phone, so sending it is a copy-paste. */}
            <button type="button" onClick={handleShareStats} className="btn-secondary mt-4 w-full">
              {statsCopied ? <Check size={16} aria-hidden /> : <Share2 size={16} aria-hidden />}
              <span aria-live="polite">{statsCopied ? c('shareCopied') : c('shareStats')}</span>
            </button>
            <p className="mt-2 text-caption leading-5 text-ink-3">{c('shareHint')}</p>
          </div>
        </section>

        {/* ── Trophy case ── */}
        <section>
          <SectionHeading
            icon={Trophy}
            title={t('profileAchievements')}
            meta={`${unlockedCount}/${ACHIEVEMENTS.length} ${c('artefacts')}`}
          />
          <div className="grid grid-cols-2 gap-3">
            {ACHIEVEMENTS.map((ach) => {
              const unlocked = unlockedIds.includes(ach.id);
              const name = t(ach.nameKey);
              return (
                <motion.button
                  key={ach.id}
                  type="button"
                  onClick={() => setDetailId(ach.id)}
                  whileTap={{ scale: 0.97 }}
                  aria-label={`${name} — ${unlocked ? t('unlocked') : t('locked')}`}
                  className={[
                    'flex h-full flex-col items-center gap-2 p-4 text-center transition-shadow',
                    unlocked ? 'surface-feature feature-gold' : 'surface-flat bg-surface-sunken',
                  ].join(' ')}
                >
                  <Artefact achievement={ach} unlocked={unlocked} label={name} />
                  <p className={`text-caption font-semibold ${unlocked ? 'text-ink' : 'text-ink-2'}`}>{name}</p>
                  {unlocked ? (
                    <span className="inline-flex items-center gap-1 text-caption text-gold-strong">
                      <Check size={12} aria-hidden />
                      {t('unlocked')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-caption text-ink-3">
                      <Lock size={12} aria-hidden />
                      {t('locked')}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ── Category progress ── */}
        <section>
          <SectionHeading icon={Target} title={t('profileCategoryProgress')} />
          <div className="surface-raised space-y-4 p-4">
            {categories.map((cat) => {
              const pct = progress.getCategoryCompletion(cat.id);
              const accent = ACCENT[CATEGORY_ACCENT[cat.id] ?? 'teal'];
              return (
                <div key={cat.id}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <span className="truncate text-caption text-ink">{isEs ? cat.titleEs : cat.title}</span>
                    <span className="shrink-0 text-caption text-ink-3">{pct}%</span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-surface-sunken"
                    role="progressbar"
                    aria-valuenow={pct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={isEs ? cat.titleEs : cat.title}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                      className={`h-full rounded-full ${accent.fill}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Activity ── */}
        <section>
          <SectionHeading icon={Calendar} title={t('profileRecentActivity')} />
          <div className="surface-raised p-4">
            {activityLog.length === 0 ? (
              <div className="py-6 text-center">
                <Calendar size={28} className="mx-auto mb-2 text-line-strong" aria-hidden />
                <p className="text-body-small text-ink-2">{t('profileNoActivity')}</p>
                <p className="mt-1 text-caption text-ink-3">{t('profileNoActivitySub')}</p>
              </div>
            ) : (
              <ul className="divide-y divide-line">
                {activityLog.slice(0, 8).map((item) => {
                  const accent =
                    item.type === 'lesson' ? ACCENT.violet : item.type === 'quiz' ? ACCENT.gold : ACCENT.teal;
                  const Icon = item.type === 'lesson' ? BookOpen : item.type === 'quiz' ? Brain : Flame;
                  const title =
                    item.type === 'lesson'
                      ? c('activityLesson')
                      : item.type === 'quiz'
                        ? item.title.includes('Perfect')
                          ? c('activityQuizPerfect')
                          : c('activityQuiz')
                        : c('activityChallenge');
                  const lesson = item.type === 'lesson' && item.detail ? getLesson(item.detail) : undefined;
                  const detail = lesson ? (isEs ? lesson.titleEs : lesson.title) : item.detail;
                  const when = formatDate(item.timestamp, locale, true);
                  return (
                    <li key={item.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-chip ${accent.tint}`}
                      >
                        <Icon size={16} className={accent.text} aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-body-small text-ink">{title}</p>
                        {detail && <p className="truncate text-caption text-ink-3">{detail}</p>}
                        {when && <p className="mt-0.5 text-caption text-ink-3">{when}</p>}
                      </div>
                      {item.xpEarned > 0 && (
                        <span className="shrink-0 text-caption font-semibold text-teal-strong">
                          +{item.xpEarned} {t('profileXP')}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        {/* ── Shortcuts ── */}
        <section>
          <SectionHeading icon={ChevronRight} title={c('tools')} />
          <div className="surface-raised divide-y divide-line overflow-hidden">
            <NavRow
              icon={Sparkles}
              accent="teal"
              title={c('firstDay')}
              subtitle={c('firstDayDesc')}
              onClick={() => navigate('/first-day')}
            />
            {authCtx.isManager && (
              <NavRow
                icon={Briefcase}
                accent="coral"
                title={c('managerDash')}
                subtitle={c('managerDashDesc')}
                onClick={() => navigate('/manager')}
              />
            )}
            {authCtx.isAdmin && (
              <NavRow
                icon={Shield}
                accent="violet"
                title={c('adminPanel')}
                subtitle={c('adminPanelDesc')}
                onClick={() => navigate('/admin')}
              />
            )}
            {/* Only offered where there is somewhere to save it to. */}
            {isDatabaseConfigured && (
              <NavRow
                icon={KeyRound}
                accent="gold"
                title={c('changePassword')}
                subtitle={c('changePasswordDesc')}
                onClick={() => navigate('/set-password')}
              />
            )}
          </div>
        </section>

        {/* ── Account ── */}
        {authUser && (
          <section>
            <SectionHeading icon={Briefcase} title={c('yourAccount')} />
            <div className="surface-raised divide-y divide-line">
              <FactRow
                icon={AtSign}
                label={c('username')}
                value={authUser.username}
                note={c('usernameNote')}
                mono
              />
              <FactRow icon={Briefcase} label={c('role')} value={roleLabel} />
              {/* An admin belongs to no single shop, so instead of stating one
                  they get to switch — which is the only way to check that a
                  Gibraltar seller is really being shown £. */}
              {isLocked ? (
                <FactRow
                  icon={MapPin}
                  label={c('yourShop')}
                  value={`${locationName} · ${currency}`}
                  note={c('shopExplainer')}
                />
              ) : (
                <div className="p-4">
                  <p id="shop-label" className="text-body-small font-semibold text-ink">
                    {c('viewingShop')}
                  </p>
                  <p className="mt-0.5 text-caption leading-5 text-ink-3">{c('viewingShopNote')}</p>
                  <div
                    role="group"
                    aria-labelledby="shop-label"
                    className="mt-3 grid grid-cols-2 gap-2 rounded-full bg-surface-sunken p-1"
                  >
                    {(['andorra', 'gibraltar'] as const).map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setLocation(loc)}
                        aria-pressed={shopLocation === loc}
                        className={`min-h-touch rounded-full text-body-small font-semibold transition-colors ${
                          shopLocation === loc ? 'bg-teal text-on-teal' : 'text-ink-2'
                        }`}
                      >
                        {loc === 'andorra' ? 'Andorra · €' : 'Gibraltar · £'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {/* The roster does not record join dates, so this row simply is not
                  there rather than printing an empty or invalid one. */}
              {joined && <FactRow icon={Calendar} label={c('joined')} value={joined} />}
            </div>
          </section>
        )}

        {/* ── Settings ── */}
        <section>
          <SectionHeading icon={Palette} title={t('profileSettings')} />
          <div className="surface-raised divide-y divide-line">
            {/* Appearance */}
            <div className="p-4">
              <p id="theme-label" className="text-body-small font-semibold text-ink">
                {c('appearance')}
              </p>
              <div
                role="group"
                aria-labelledby="theme-label"
                className="mt-3 grid grid-cols-3 gap-2 rounded-full bg-surface-sunken p-1"
              >
                {(
                  [
                    { key: 'light', label: c('themeLight'), icon: Sun },
                    { key: 'dark', label: c('themeDark'), icon: Moon },
                    { key: 'system', label: c('themeSystem'), icon: Monitor },
                  ] as { key: ThemePreference; label: string; icon: LucideIcon }[]
                ).map((opt) => {
                  const active = preference === opt.key;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setPreference(opt.key)}
                      aria-pressed={active}
                      className={[
                        'flex min-h-touch items-center justify-center gap-1.5 rounded-full px-2 text-caption font-semibold transition-colors',
                        active ? 'bg-teal text-on-teal' : 'text-ink-2',
                      ].join(' ')}
                    >
                      <Icon size={15} aria-hidden />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-caption text-ink-3">{c('themeHint')}</p>
            </div>

            {/* Language */}
            <div className="p-4">
              <p id="lang-label" className="text-body-small font-semibold text-ink">
                {c('language')}
              </p>
              <div
                role="group"
                aria-labelledby="lang-label"
                className="mt-3 grid grid-cols-2 gap-2 rounded-full bg-surface-sunken p-1"
              >
                {(
                  [
                    { key: 'en', label: t('authEnglish') },
                    { key: 'es', label: t('authSpanish') },
                  ] as { key: 'en' | 'es'; label: string }[]
                ).map((opt) => {
                  const active = language === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => !active && setPendingLang(opt.key)}
                      aria-pressed={active}
                      className={[
                        'flex min-h-touch items-center justify-center gap-1.5 rounded-full px-3 text-caption font-semibold transition-colors',
                        active ? 'bg-teal text-on-teal' : 'text-ink-2',
                      ].join(' ')}
                    >
                      <Languages size={15} aria-hidden />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily reminder */}
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-surface-sunken">
                  <Bell size={16} className="text-ink-2" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="text-body-small font-semibold text-ink">{t('profileDailyReminder')}</p>
                  <p className="text-caption text-ink-3">{t('profileRemindMe')}</p>
                </div>
              </div>
              {/* 56x32 track inside a 56x44 hit area — the switch itself was
                  below the 44px touch minimum. */}
              <button
                type="button"
                role="switch"
                aria-checked={reminderEnabled}
                aria-label={t('profileDailyReminder')}
                onClick={toggleReminder}
                className="flex h-touch w-14 shrink-0 items-center justify-center"
              >
                <span
                  className={`relative block h-8 w-14 rounded-full border transition-colors ${
                    reminderEnabled ? 'border-teal bg-teal' : 'border-line-strong bg-surface-sunken'
                  }`}
                >
                  <span
                    className={`absolute top-1 block h-6 w-6 rounded-full bg-surface shadow-raised transition-transform ${
                      reminderEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Careful zone ── */}
        <section>
          <SectionHeading icon={AlertTriangle} title={c('dangerZone')} />
          <div className="space-y-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="flex min-h-touch w-full items-center justify-between gap-3 rounded-card border border-danger/30 bg-danger-tint px-4 py-3 text-left"
                >
                  <span className="flex items-center gap-3">
                    <RotateCcw size={16} className="shrink-0 text-danger" aria-hidden />
                    <span>
                      <span className="block text-body-small font-semibold text-ink">
                        {t('profileResetProgress')}
                      </span>
                      <span className="block text-caption text-ink-2">{t('profileResetDesc')}</span>
                    </span>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-ink-3" aria-hidden />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-feature border-line bg-surface">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2 text-h4 text-ink">
                    <AlertTriangle size={18} className="text-danger" aria-hidden />
                    {t('profileResetTitle')}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-body-small text-ink-2">
                    {t('profileResetWarning')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="btn-quiet min-h-touch border-line">
                    {t('profileCancel')}
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    className="min-h-touch rounded-full bg-danger px-6 font-semibold text-destructive-foreground"
                  >
                    {t('profileResetEverything')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {authUser && (
              <button
                type="button"
                onClick={() => {
                  authCtx.logout();
                  navigate('/auth', { replace: true });
                }}
                className="btn-quiet w-full"
              >
                <LogOut size={16} aria-hidden />
                {c('signOut')}
              </button>
            )}
          </div>
        </section>

        <div className="pb-safe" />
      </div>

      {/* ── Language confirmation (Radix: focus-trapped, Escape closes) ── */}
      <AlertDialog open={pendingLang !== null} onOpenChange={(open) => !open && setPendingLang(null)}>
        <AlertDialogContent className="rounded-feature border-line bg-surface">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-h4 text-ink">
              {pendingLang === 'es' ? COPY.langConfirmTitle.es : COPY.langConfirmTitle.en}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-body-small text-ink-2">
              {pendingLang === 'es' ? COPY.langConfirmBody.es : COPY.langConfirmBody.en}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="btn-quiet min-h-touch border-line">
              {pendingLang === 'es' ? 'Cancelar' : 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!pendingLang) return;
                setLanguage(pendingLang);
                setPendingLang(null);
                setTimeout(() => window.location.reload(), 120);
              }}
              className="btn-secondary min-h-touch"
            >
              {pendingLang === 'es' ? COPY.confirm.es : COPY.confirm.en}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Artefact detail ── */}
      <Dialog open={detailAchievement !== undefined} onOpenChange={(open) => !open && setDetailId(null)}>
        <DialogContent showCloseButton={false} className="rounded-feature border-line bg-surface">
          {/* Radix ships a 16px close affordance; this one meets the 44px minimum. */}
          <button
            type="button"
            onClick={() => setDetailId(null)}
            aria-label={t('close')}
            className="btn-icon absolute right-3 top-3"
          >
            <X size={18} aria-hidden />
          </button>
          {detailAchievement && (
            <div className="flex flex-col items-center gap-3 pt-6 text-center">
              <Artefact
                achievement={detailAchievement}
                unlocked={unlockedIds.includes(detailAchievement.id)}
                size="lg"
                label={t(detailAchievement.nameKey)}
              />
              <span className="text-overline text-ink-3">{rarityLabel(detailAchievement)}</span>
              <DialogTitle className="text-h3 text-ink">{t(detailAchievement.nameKey)}</DialogTitle>
              <DialogDescription className="text-body-small text-ink-2">
                {unlockedIds.includes(detailAchievement.id)
                  ? t(detailAchievement.descKey)
                  : `${c('howToUnlock')}: ${t(detailAchievement.descKey)}`}
              </DialogDescription>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ── Unlock celebration ── */}
      <Dialog
        open={unlockedNow !== undefined}
        onOpenChange={(open) => {
          if (!open && celebratingId) setDismissedUnlocks((prev) => [...prev, celebratingId]);
        }}
      >
        <DialogContent className="rounded-feature border-gold/40 bg-surface" showCloseButton={false}>
          {unlockedNow && (
            <div className="flex flex-col items-center gap-3 text-center">
              <span className="text-overline text-gold-strong">{c('unlockedTitle')}</span>
              <motion.div
                initial={{ scale: 0.4, rotate: -12, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              >
                <Artefact
                  achievement={unlockedNow}
                  unlocked
                  size="lg"
                  label={t(unlockedNow.nameKey)}
                />
              </motion.div>
              <DialogTitle className="text-h2 text-ink">{t(unlockedNow.nameKey)}</DialogTitle>
              <DialogDescription className="text-body-small text-ink-2">
                {t(unlockedNow.descKey)}
              </DialogDescription>
              <button
                type="button"
                onClick={() => setDismissedUnlocks((prev) => [...prev, unlockedNow.id])}
                className="btn-primary mt-2 w-full"
              >
                {c('keepGoing')}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfettiCelebration trigger={wantsConfetti} onComplete={() => setConfettiDone(true)} />
      <XPToast
        visible={showLevelToast}
        amount={baseline ? Math.max(0, xp - baseline.xp) : 0}
        message={`${t('profileLevel')} ${level.level} · ${levelName}`}
        onDismiss={() => setLevelToastDone(true)}
        duration={3600}
      />
    </div>
  );
}

/* ── Rows ── */

function NavRow({
  icon: Icon,
  accent,
  title,
  subtitle,
  onClick,
}: {
  icon: LucideIcon;
  accent: AccentToken;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  const a = ACCENT[accent];
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-touch w-full items-center gap-3 p-4 text-left transition-colors active:bg-surface-sunken"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-chip ${a.tint}`}>
        <Icon size={18} className={a.text} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-body-small font-semibold text-ink">{title}</p>
        <p className="truncate text-caption text-ink-3">{subtitle}</p>
      </div>
      <ChevronRight size={18} className="shrink-0 text-ink-3" aria-hidden />
    </button>
  );
}

function FactRow({
  icon: Icon,
  label,
  value,
  note,
  mono = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  note?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chip bg-surface-sunken">
        <Icon size={16} className="text-ink-2" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-caption text-ink-3">{label}</p>
        <p className={`break-words text-body-small text-ink ${mono ? 'font-mono' : ''}`}>{value}</p>
        {note && <p className="mt-1 text-caption leading-5 text-ink-3">{note}</p>}
      </div>
    </div>
  );
}
