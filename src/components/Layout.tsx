import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import Navbar from './Navbar';
import OfflineBanner from './OfflineBanner';

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const pageTransition = {
  type: 'tween' as const,
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

      {/* Offline / Online indicator */}
      <OfflineBanner />

      {/* Mobile frame */}
      <div
        className={
          isOnboarding
            ? 'w-full max-w-[430px] relative z-10 flex flex-col min-h-[100dvh]'
            : 'w-full max-w-[430px] relative z-10 flex flex-col min-h-[100dvh] border-x border-[#1A1A1A] md:rounded-[24px] md:border md:shadow-2xl overflow-hidden bg-[#0A0A0A]'
        }
      >
        {/* Main content area */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative pb-24"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              className="min-h-full pb-20"
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
