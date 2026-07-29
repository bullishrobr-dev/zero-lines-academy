// ─────────────────────────────────────────────────────────────
// Layout.tsx — app shell
//
// Two things were quietly costing every user:
//
//  1. Bottom padding was stacked three deep — `pb-24` on <main>, `pb-20` on the
//     inner motion div, plus each page's own `pb-24`/`pb-20`. That is 176-240px
//     of dead space at the end of every single screen. There is now exactly one
//     source of truth for it, right here, sized to the floating nav pill plus
//     the iPhone home indicator.
//
//  2. `/hero-glow.png` is 1.13 MB and lived inside `hidden md:block`.
//     `display:none` does not stop the download, so every phone on a shop's
//     4G paid for an image it could never see. It is gone; the ambient wash is
//     now a CSS gradient that costs nothing.
// ─────────────────────────────────────────────────────────────

import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import Navbar from './Navbar';
import OfflineBanner from './OfflineBanner';

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
  duration: 0.3,
};

/* Routes where Navbar renders nothing, so no bottom clearance is needed. */
const NAVLESS_ROUTES = ['/', '/auth', '/first-day'];

/* The single source of bottom padding in the app:
   nav pill (60px) + its 12px lift + 24px breathing room + the home indicator. */
const CONTENT_BOTTOM_PADDING = 'pb-[calc(6rem+env(safe-area-inset-bottom,0px))]';

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isOnboarding = location.pathname === '/';
  const hasNav = !NAVLESS_ROUTES.includes(location.pathname);

  // Reset scroll on route change
  useEffect(() => {
    const contentEl = document.getElementById('main-content');
    if (contentEl) {
      contentEl.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-[100dvh] w-full justify-center overflow-hidden bg-background">
      {/* Ambient wash behind the phone frame on wide screens. Pure CSS — the
          1.13 MB PNG that used to do this job downloaded on phones too. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hidden md:block"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 30%, rgb(var(--teal) / 0.14) 0%, transparent 70%), radial-gradient(45% 45% at 85% 85%, rgb(var(--coral) / 0.10) 0%, transparent 70%)',
        }}
      />

      {/* Offline / online indicator */}
      <OfflineBanner />

      {/* Phone frame. `pt-safe` keeps content clear of the notch now that the
          PWA status bar style is `default`. */}
      <div
        className={
          isOnboarding
            ? 'relative z-10 flex min-h-[100dvh] w-full max-w-app flex-col pt-safe'
            : 'relative z-10 flex min-h-[100dvh] w-full max-w-app flex-col overflow-hidden border-line bg-background pt-safe md:rounded-feature md:border md:shadow-feature'
        }
      >
        <main
          id="main-content"
          className={`no-scrollbar relative flex-1 overflow-y-auto overflow-x-hidden ${
            hasNav ? CONTENT_BOTTOM_PADDING : ''
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="min-h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <Navbar />
      </div>
    </div>
  );
}
