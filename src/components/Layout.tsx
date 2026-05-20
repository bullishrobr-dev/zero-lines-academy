import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const pageTransition = {
  type: 'tween',
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
  duration: 0.3,
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isOnboarding = location.pathname === '/';

  // Reset scroll on route change
  useEffect(() => {
    const contentEl = document.getElementById('main-content');
    if (contentEl) {
      contentEl.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-[100dvh] w-full bg-[#0A0A0A] flex justify-center relative overflow-hidden">
      {/* Desktop glow background */}
      <div className="hidden md:block fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20">
          <img
            src="/hero-glow.png"
            alt=""
            className="w-full h-full object-contain"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Mobile frame */}
      <div
        className={
          isOnboarding
            ? 'w-full max-w-[430px] relative z-10 flex flex-col min-h-[100dvh]'
            : 'w-full max-w-[430px] relative z-10 flex flex-col min-h-[100dvh] border-x border-[#1A1A1A] md:rounded-[24px] md:border md:shadow-2xl overflow-hidden bg-[#0A0A0A]'
        }
      >
        {/* Status Bar - only show on non-onboarding pages */}
        {!isOnboarding && (
          <div className="h-11 bg-black flex items-center justify-between px-6 shrink-0 z-40 select-none">
            <span className="text-sm font-semibold text-white">9:41</span>
            <div className="flex items-center gap-1.5">
              {/* Signal */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path
                  d="M1 8.5C1 8.5 2.5 7 4 7C5.5 7 7 8.5 7 8.5V11H1V8.5Z"
                  fill="white"
                />
                <path
                  d="M9 5.5C9 5.5 10.5 4 12 4C13.5 4 15 5.5 15 5.5V11H9V5.5Z"
                  fill="white"
                  fillOpacity="0.4"
                />
                <rect x="9" y="7" width="6" height="4" rx="0.5" fill="white" />
              </svg>
              {/* WiFi */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.5 0L14 6H1L7.5 0Z"
                  fill="white"
                />
                <path
                  d="M5 8.5C5 8.5 6.5 7 7.5 7C8.5 7 10 8.5 10 8.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {/* Battery */}
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect
                  x="0.5"
                  y="0.5"
                  width="21"
                  height="11"
                  rx="2.5"
                  stroke="white"
                />
                <rect x="2" y="2" width="17" height="8" rx="1.5" fill="white" />
                <path
                  d="M23 4V8C23.8047 7.66122 24.328 6.87313 24.328 6C24.328 5.12687 23.8047 4.33878 23 4Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Main content area */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative"
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

        {/* Bottom nav */}
        <Navbar />
      </div>
    </div>
  );
}
