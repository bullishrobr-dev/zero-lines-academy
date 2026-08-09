// ─────────────────────────────────────────────────────────────────────────────
// SettingsPage.tsx — everything on the seller's own screen that is a *control*.
//
// Split out of ProfilePage, which had grown into two screens wearing one coat:
// a trophy cabinet (numbers, artefacts, activity) and a settings drawer. What
// lives here is the drawer — the account facts, the preferences, the way out,
// and the one button that can undo a month of work.
//
// The helper components (SectionHeading, NavRow, FactRow, the accent table) are
// deliberately duplicated from ProfilePage rather than shared: two page files
// that never import each other can be edited, moved or deleted independently,
// and these are twenty lines of markup, not a design system.
//
// Behaviour is carried over unchanged — the same `useTheme()` setters, the same
// `setLanguage` + reload, the same shop switcher gated on `isLocked`, the same
// confirm-then-`resetProgress()`, the same `logout()` then `/auth`.
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShiftNudges } from '@/hooks/useShiftNudges';
import {
  AlertTriangle,
  ArrowLeft,
  AtSign,
  Bell,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  KeyRound,
  Languages,
  LogOut,
  MapPin,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Share2,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import { isDatabaseConfigured } from '@/backend/supabaseClient';
import { useProgress } from '@/hooks/useProgress';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme, type ThemePreference } from '@/contexts/ThemeContext';
import { useCurrency } from '@/utils/currency';
import { useLocation as useShop } from '@/contexts/LocationContext';
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
import { getLevelProgress, type AccentToken } from '@/data/gamification';

/* Strings with no key in src/data/translations.ts. Same pattern the rest of the
   app uses — that file is owned elsewhere, so new copy lives with its screen. */
const COPY = {
  back: { en: 'Back', es: 'Volver' },
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
  yourLogin: { en: 'Your login', es: 'Tu acceso' },
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
  nudgeHint: {
    en: 'A short prompt every half hour or so while you are on shift — a line to have ready, a quick drill, a reset. Only between 9am and 10pm, and never while someone is in front of you.',
    es: 'Un aviso corto cada media hora mientras estás de turno — una frase lista, un ejercicio rápido, un respiro. Solo entre las 9:00 y las 22:00, y nunca mientras tienes a alguien delante.',
  },
  nudgeTry: { en: 'Show me one now', es: 'Enséñame uno ahora' },
  nudgeBlocked: {
    en: 'Your phone is blocking notifications for this app. You will still get the prompts inside the app.',
    es: 'Tu móvil está bloqueando las notificaciones de esta app. Seguirás viendo los avisos dentro de la app.',
  },
} as const;

type CopyKey = keyof typeof COPY;

/* ── Accent plumbing ──
   Tailwind needs whole class names at build time, so accents are looked up in a
   table rather than assembled from a string. */
const ACCENT: Record<AccentToken, { tint: string; text: string }> = {
  teal: { tint: 'bg-teal-tint', text: 'text-teal-strong' },
  coral: { tint: 'bg-coral-tint', text: 'text-coral-strong' },
  gold: { tint: 'bg-gold-tint', text: 'text-gold-strong' },
  violet: { tint: 'bg-violet-tint', text: 'text-violet-strong' },
};

/* Profile celebrates anything earned since the last visit by diffing against
   this snapshot. A reset that did not move it would replay the whole trophy
   cabinet as "new" the next time /profile opened, so the wipe writes it too. */
const SNAPSHOT_KEY = 'zl_profile_seen';

function writeSnapshot(next: { xp: number; level: number; unlocked: string[] }) {
  try {
    localStorage.setItem(SNAPSHOT_KEY, JSON.stringify(next));
  } catch {
    // Storage full or blocked — the worst case is a celebration replaying once.
  }
}

/** `createdAt` used to be dropped from the session, which printed "Invalid Date". */
function formatDate(value: string | undefined, locale: string): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
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

/* ── Page ── */

export default function SettingsPage() {
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
  /*
   * The shift nudges. This switch used to write a localStorage flag and do
   * nothing whatsoever — no permission request, nothing scheduled. It is now
   * wired to the real engine: it asks the OS for notification permission and
   * turns on the every-35-minutes prompt during shift hours.
   */
  const nudges = useShiftNudges(false);
  const reminderEnabled = nudges.enabled;

  const displayName = authUser?.name || progress.getUserName() || t('profileSalesTrainee');

  const xp = progress.getTotalXP();
  const { level } = useMemo(() => getLevelProgress(xp), [xp]);
  const levelName = isEs ? level.name.es : level.name.en;

  const lessonsCompleted = progress.getLessonsCompletedCount();
  const quizzesPassed = progress.getQuizzesPassedCount();
  const currentStreak = progress.getCurrentStreak();
  const accuracy = progress.getAccuracyRate();

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
  };

  const toggleReminder = () => {
    if (nudges.enabled) nudges.disable();
    else void nudges.enable();
  };

  const roleLabel =
    authUser?.role === 'admin' ? c('roleAdmin') : authUser?.role === 'manager' ? c('roleManager') : c('roleSeller');

  const joined = formatDate(authUser?.createdAt, locale);

  return (
    <div className="min-h-full bg-background pb-10">
      {/* Not sticky: the app frame in Layout.tsx is `overflow-hidden`, which makes
          every descendant's `position: sticky` silently do nothing. */}
      <header className="border-b border-line bg-surface px-5 pb-3 pt-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            aria-label={c('back')}
            className="btn-icon shrink-0"
          >
            <ArrowLeft size={18} aria-hidden />
          </button>
          <div className="min-w-0">
            <p className="truncate text-overline text-teal-strong">{displayName}</p>
            <h1 className="text-h2 text-ink">{t('profileSettings')}</h1>
          </div>
        </div>
      </header>

      <div className="space-y-8 px-5 pt-6">
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

            {/* What the switch actually does, and a way to see it immediately —
                a toggle whose effect is 35 minutes away is a toggle nobody
                trusts. */}
            <div className="px-4 pb-4">
              <p className="text-caption leading-5 text-ink-3">{c('nudgeHint')}</p>
              {reminderEnabled && nudges.permission === 'denied' && (
                <p className="mt-2 text-caption leading-5 text-warning">{c('nudgeBlocked')}</p>
              )}
              {reminderEnabled && (
                <button
                  type="button"
                  onClick={nudges.sendNow}
                  className="btn-quiet mt-3 min-h-touch w-full text-body-small"
                >
                  {c('nudgeTry')}
                </button>
              )}
            </div>

            {/* Share — progress never leaves this phone, so sending it is a copy-paste. */}
            <div className="p-4">
              <button type="button" onClick={handleShareStats} className="btn-secondary w-full">
                {statsCopied ? <Check size={16} aria-hidden /> : <Share2 size={16} aria-hidden />}
                <span aria-live="polite">{statsCopied ? c('shareCopied') : c('shareStats')}</span>
              </button>
              <p className="mt-2 text-caption leading-5 text-ink-3">{c('shareHint')}</p>
            </div>
          </div>
        </section>

        {/* ── Login ── */}
        {(isDatabaseConfigured || authUser) && (
          <section>
            <SectionHeading icon={KeyRound} title={c('yourLogin')} />
            <div className="space-y-3">
              {/* Only offered where there is somewhere to save it to. */}
              {isDatabaseConfigured && (
                <div className="surface-raised divide-y divide-line overflow-hidden">
                  <NavRow
                    icon={KeyRound}
                    accent="gold"
                    title={c('changePassword')}
                    subtitle={c('changePasswordDesc')}
                    onClick={() => navigate('/set-password')}
                  />
                </div>
              )}

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
        )}

        {/* ── Careful zone ── */}
        <section>
          <SectionHeading icon={AlertTriangle} title={c('dangerZone')} />
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
