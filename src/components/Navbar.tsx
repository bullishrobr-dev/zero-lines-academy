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

import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  FileText,
  Trophy,
  NotebookPen,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { haptic } from '../utils/haptics';

interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  /** The journal. Coral rather than teal, because it is the one you tap with
      a customer walking away rather than between customers. */
  accent?: boolean;
}

/* Routes that own the whole screen — onboarding, sign-in, the guided track. */
const HIDE_NAV_ON = ['/', '/auth', '/first-day'];

export default function Navbar() {
  const location = useLocation();
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  if (HIDE_NAV_ON.includes(location.pathname)) return null;

  /*
   * SIX SLOTS, ONE ROW.
   *
   * The owner: "I do want the flashcards to go back to the footer… make the
   * footer just six things, including the flashcards, on the bottom."
   *
   * It was five, with the journal as a raised coral disc in the middle. A
   * sixth item cannot be added to that shape without going lopsided — three
   * either side of a protruding centre is seven, not six — so the disc is
   * gone and all six sit flat and equal. The journal keeps the coral, so it
   * still reads as the thing you tap during a shift rather than between them;
   * it just does not stick out of the bar any more.
   *
   * Labels stay short because six of them have to fit a 320px screen in
   * Spanish. That is why Training is "Formación" and not "Entrenamiento", and
   * why the type drops to 10px below 360px. Measured at 320/360/390 before
   * this shipped — see the note on the label span.
   */
  const items: NavItem[] = [
    { to: '/home', label: t('navHome'), icon: Home },
    { to: '/training', label: t('navTraining'), icon: GraduationCap },
    { to: '/flashcards', label: isEs ? 'Tarjetas' : 'Cards', icon: Layers },
    { to: '/street-tracker', label: isEs ? 'Diario' : 'Journal', icon: NotebookPen, accent: true },
    { to: '/cheat-sheets', label: isEs ? 'Chuletas' : 'Cheats', icon: FileText },
    { to: '/profile', label: t('navProfile'), icon: Trophy },
  ];

  /* Every slot is `justify-end`, so the five labels sit on one baseline even
     though the centre icon is a taller coral disc. */
  const renderItem = (item: NavItem) => (
    <NavLink
      key={item.to}
      to={item.to}
      onClick={() => haptic('light')}
      className={({ isActive }) =>
        `relative flex-1 min-w-0 flex flex-col items-center justify-end gap-1 rounded-card px-0.5 py-1 select-none transition-colors duration-200 ${
          isActive
            ? item.accent
              ? 'text-coral-strong'
              : 'text-teal-strong'
            : item.accent
              ? 'text-coral-strong/80'
              : 'text-ink-3'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="nav-indicator"
              className={`absolute inset-0 rounded-card ${item.accent ? 'bg-coral-tint' : 'bg-teal-tint'}`}
              transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              aria-hidden="true"
            />
          )}
          <item.icon
            size={21}
            strokeWidth={isActive || item.accent ? 2.3 : 1.8}
            className="relative z-10"
            aria-hidden="true"
          />
          {/* Six Spanish labels leave ~52px a slot at 320px and ~59px at 360px,
              and "Formación" is the one that decides this: it fits 10px at both
              and 12px only from about 380px up. Measured at 320/360/390 in both
              languages — do not raise the type without re-measuring, and treat
              truncate as the backstop rather than the plan. */}
          <span className="relative z-10 w-full truncate text-center text-[10px] min-[380px]:text-[12px] font-semibold leading-4 tracking-tight">
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
        <div className="flex h-full items-end gap-0 px-1 pt-1 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
          {items.map(renderItem)}
        </div>
      </div>
    </nav>
  );
}
