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

import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import Navbar from './Navbar';
import OfflineBanner from './OfflineBanner';

interface LayoutProps {
  children: ReactNode;
}

/* There is no `exit` here, and there is no <AnimatePresence> below. That is
   deliberate, and it is the fix for "the app feels jumpy, on-off-on-off".

   <Routes> is handed to this component as `children` (see App.tsx), so it lived
   INSIDE the element AnimatePresence was holding open to play an exit
   animation on. But <Routes> reads the router's location from context, not from
   the props it was rendered with — so the moment the URL changed, the subtree
   that was supposed to be showing the OLD page re-rendered as the NEW one and
   then faded it away to nothing. `mode="wait"` then unmounted it and mounted
   the very same page a second time to fade it back in.

   The seller saw: new page, blank screen, new page again. 274ms of blank and
   750ms from tap to settled content, every single tap. Measured, on a 4x-slowed
   phone; without it, 12ms blank and 242ms to settled, and the route tree is
   built once instead of twice.

   A page that arrives in one motion needs no exit, so the enter is also shorter
   now — 180ms reads as instant, 300ms reads as a transition. */
const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
  duration: 0.18,
};

/* Routes where Navbar renders nothing, so no bottom clearance is needed. */
const NAVLESS_ROUTES = ['/', '/auth', '/first-day'];

/* The single source of bottom padding in the app: the height of the docked
   footer, plus the home-indicator inset the footer also covers, plus 20px of
   air so the last line of a page does not sit against the hairline. `--nav-h`
   is defined in src/index.css and the footer sets its own height from it. */
const CONTENT_BOTTOM_PADDING =
  'pb-[calc(var(--nav-h)+1.25rem+env(safe-area-inset-bottom,0px))]';

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isOnboarding = location.pathname === '/';
  const hasNav = !NAVLESS_ROUTES.includes(location.pathname);

  /* Reset scroll on route change.
     The document is the scroller — see the note on <main> below — so this must
     be `window.scrollTo`, not `#main-content.scrollTop`, which is permanently
     0. `instant` skips the animation that `html { scroll-behavior: smooth }`
     would otherwise apply to the jump. */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
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
          PWA status bar style is `default`.

          Onboarding is the exception: its hero photograph is meant to run to
          the very top of the screen, and a safe-area gutter here put a strip of
          flat background above it with a visible seam. That route insets its own
          controls instead — see the language switch in OnboardingPage.tsx. */}
      <div
        className={
          isOnboarding
            ? 'relative z-10 flex min-h-[100dvh] w-full max-w-app flex-col'
            : 'relative z-10 flex min-h-[100dvh] w-full max-w-app flex-col overflow-hidden border-line bg-background pt-safe md:rounded-feature md:border md:shadow-feature'
        }
      >
        {/*
          The DOCUMENT is the scroller, not this element.

          <main> is `flex-1` inside a `min-h-[100dvh]` column, so it grows with
          its content and can never overflow itself. It previously carried
          `overflow-y-auto`, which made it *look* like the scroll container
          without ever behaving as one: `position: sticky` inside any page
          silently did nothing, and `main.scrollTop` was permanently 0, so any
          page reading it for scroll progress got a frozen value.

          `overflow-x-clip` rather than `overflow-x-hidden` is deliberate: per
          CSS overflow rules, setting one axis to `hidden` computes the other
          axis to `auto`, which would re-create exactly the phantom scroll
          container this is meant to remove. `clip` contains horizontal bleed
          without establishing a scroll container.
        */}
        <main
          id="main-content"
          className={`relative flex-1 overflow-x-clip ${hasNav ? CONTENT_BOTTOM_PADDING : ''}`}
        >
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            transition={pageTransition}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </main>

        <Navbar />
      </div>
    </div>
  );
}
