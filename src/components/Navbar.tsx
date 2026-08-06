// ─────────────────────────────────────────────────────────────
// Navbar.tsx — floating bottom navigation pill
//
// Phone-first. Four destinations plus one raised centre action ("Journal"),
// which is the only entry point in the whole app to /street-tracker.
//
// The old bar sat flush on the bottom edge with no safe-area padding, so on a
// notched iPhone installed as a PWA the labels rendered under the home
// indicator. The wrapper now carries `pb-safe` and the pill floats above it.
// ─────────────────────────────────────────────────────────────

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  Layers,
  Trophy,
  NotebookPen,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { haptic } from '../utils/haptics';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

/* Routes that own the whole screen — onboarding, sign-in, the guided track. */
const HIDE_NAV_ON = ['/', '/auth', '/first-day'];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  if (HIDE_NAV_ON.includes(location.pathname)) return null;

  /* Labels stay short on purpose: at the 13px type floor a longer Spanish word
     ("Cuestionarios") cannot fit a bottom-nav slot on a 390px screen. Quizzes
     and Exercises are surfaced from the Home feed and Training hub instead. */
  const leftItems: NavItem[] = [
    { to: '/home', label: t('navHome'), icon: Home },
    { to: '/training', label: t('navTraining'), icon: GraduationCap },
  ];
  const rightItems: NavItem[] = [
    // Was hardcoded English while its four siblings were translated.
    { to: '/flashcard-decks', label: isEs ? 'Tarjetas' : 'Cards', icon: Layers },
    { to: '/profile', label: t('navProfile'), icon: Trophy },
  ];

  // The centre action is the journal, not a till. It is where a seller records
  // who came in, who bought, and why the others walked.
  const journalLabel = isEs ? 'Diario' : 'Journal';
  const isTracking = location.pathname === '/street-tracker';

  const renderItem = (item: NavItem) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={() => haptic('light')}
      className={({ isActive }) =>
        `relative flex-1 min-w-touch min-h-touch flex flex-col items-center justify-center gap-1 rounded-full select-none transition-colors duration-200 ${
          isActive ? 'text-teal-strong' : 'text-ink-3'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="nav-indicator"
              className="absolute inset-0 rounded-full bg-teal-tint"
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              aria-hidden="true"
            />
          )}
          <item.icon
            size={22}
            strokeWidth={isActive ? 2.4 : 1.8}
            className="relative z-10"
            aria-hidden="true"
          />
          <span className="relative z-10 text-caption font-semibold tracking-tight">
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    <nav
      aria-label={isEs ? 'Navegación principal' : 'Main navigation'}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe pointer-events-none"
    >
      <div className="w-full max-w-app px-3 pb-3 pointer-events-auto">
        <div className="relative flex items-stretch gap-1 rounded-full border border-line bg-surface/85 px-2 py-2 shadow-feature backdrop-blur-xl">
          {leftItems.map(renderItem)}

          {/* ── Raised centre action — the app's only link to the journal ── */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              haptic('medium');
              navigate('/street-tracker');
            }}
            className={`relative flex-1 min-w-touch min-h-touch flex flex-col items-center justify-end rounded-full transition-colors ${
              isTracking ? 'text-coral-strong' : 'text-ink-3'
            }`}
          >
            <span
              className={`absolute -top-7 flex h-14 w-14 items-center justify-center rounded-full bg-coral text-on-coral shadow-feature ring-4 ${
                isTracking ? 'ring-coral-tint' : 'ring-background'
              }`}
            >
              <NotebookPen size={26} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="text-caption font-semibold tracking-tight">{journalLabel}</span>
          </motion.button>

          {rightItems.map(renderItem)}
        </div>
      </div>
    </nav>
  );
}
