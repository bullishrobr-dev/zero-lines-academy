// ─────────────────────────────────────────────────────────────
// Navbar.tsx — the docked bottom bar
//
// Phone-first. Four destinations plus one centre action ("Journal"), which is
// the only entry point in the whole app to /street-tracker.
//
// ── WHY THIS IS A BAR AND NOT A FLOATING PILL ────────────────
// It used to be a translucent rounded pill lifted 12px off the bottom edge with
// `bg-surface/85 backdrop-blur-xl`. Two problems, both visible on a real phone:
// the page kept scrolling through the gap underneath it, so the bar read as a
// loose object drifting over the content rather than as the edge of the app;
// and on iOS, where the browser toolbar animates in and out on scroll, a lifted
// bar appears to bob up and down.
//
// It is now a proper footer: full width of the app frame, flush to the bottom
// edge, opaque, with a hairline on top and the upward `shadow-nav`. Nothing
// passes behind it. `pb-safe` on the row keeps the labels clear of the iPhone
// home indicator, and the bar's own background fills that strip so the bottom
// edge of the screen is never bare.
//
// The centre action sits INSIDE the bar rather than being raised above it. A
// raised button needs a ring in the page's background colour to separate it
// from the bar, and that ring sits on top of scrolling content — which is the
// exact "floating over the page" look this rewrite removes. Its coral fill and
// larger footprint carry the emphasis instead.
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

  /* Every slot is `justify-end`, so the five labels sit on one baseline even
     though the centre icon is a taller coral disc. */
  const renderItem = (item: NavItem) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={() => haptic('light')}
      className={({ isActive }) =>
        `relative flex-1 min-w-touch flex flex-col items-center justify-end gap-1 rounded-card px-1 py-1 select-none transition-colors duration-200 ${
          isActive ? 'text-teal-strong' : 'text-ink-3'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="nav-indicator"
              className="absolute inset-0 rounded-card bg-teal-tint"
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
          {/* 11px below 360px: five Spanish labels ("Formación", "Tarjetas")
              collide at the 13px caption size on a 320px screen. */}
          <span className="relative z-10 text-[11px] min-[360px]:text-[13px] font-semibold leading-4 tracking-tight">
            {item.label}
          </span>
        </>
      )}
    </NavLink>
  );

  return (
    <nav
      aria-label={isEs ? 'Navegación principal' : 'Main navigation'}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center"
    >
      {/* Constrained to the app frame so the bar lines up with the phone-width
          column on a desktop screen instead of spanning the whole window. */}
      {/* The height comes from --nav-h (src/index.css) rather than from the
          content, so the four things that reserve space for this bar cannot end
          up reserving the wrong amount. The safe-area strip is added on top and
          filled by this element's own background, which is what keeps the very
          bottom edge of the screen from going bare on a notched iPhone. */}
      <div
        className="pointer-events-auto w-full max-w-app border-t border-line bg-surface shadow-nav"
        style={{ height: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px))' }}
      >
        {/* pb-safe alone is 0px on a device with no home indicator, which would
            leave the labels sitting on the very edge — hence the 6px floor. */}
        <div className="flex h-full items-end gap-0.5 px-1.5 pt-1 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
          {leftItems.map(renderItem)}

          {/* ── Centre action — the app's only link to the journal ── */}
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              haptic('medium');
              navigate('/street-tracker');
            }}
            aria-current={isTracking ? 'page' : undefined}
            className={`relative flex-1 min-w-touch flex flex-col items-center justify-end gap-1 rounded-card px-1 py-1 transition-colors ${
              isTracking ? 'text-coral-strong' : 'text-ink-3'
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-on-coral shadow-raised transition-colors ${
                isTracking ? 'bg-coral-strong' : 'bg-coral'
              }`}
            >
              <NotebookPen size={20} strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="text-[11px] min-[360px]:text-[13px] font-semibold leading-4 tracking-tight">
              {journalLabel}
            </span>
          </motion.button>

          {rightItems.map(renderItem)}
        </div>
      </div>
    </nav>
  );
}
