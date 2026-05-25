import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ── Slide Data ──────────────────────────────────────────────
interface SlideData {
  overline: string;
  title: string;
  description: string;
  image: string;
}

const slides: SlideData[] = [
  {
    overline: 'CLEAN.  PURE.  CONSCIOUS.',
    title: 'Welcome to Zero Lines',
    description:
      'Premium skincare born from nature. Join the team that brings clean beauty to the streets of Gibraltar and Andorra.',
    image: '/onboarding-1.png',
  },
  {
    overline: 'INSTANT RESULTS',
    title: 'See It. Believe It. Sell It.',
    description:
      'Every product has a visible demo. When customers see wrinkles disappear in 60 seconds, selling becomes easy.',
    image: '/onboarding-2.png',
  },
  {
    overline: 'EARN MORE',
    title: 'From €1,500 to €8,000/Month',
    description:
      'Base salary is just the start. Top performers earn 5x their base through commission. Your skills directly determine your paycheck.',
    image: '/onboarding-3.png',
  },
];

// ── Animation Variants ──────────────────────────────────────
const logoVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const, delay: 0.2 },
  },
};

const imageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
  }),
};

const textContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const overlineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

const descVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const, delay: 0.2 },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.4 },
  },
};

// ── Component ───────────────────────────────────────────────
export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef<number>(0);
  const navigate = useNavigate();

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  const goNext = useCallback(() => {
    if (current < slides.length - 1) {
      setDirection(1);
      setCurrent((c) => c + 1);
    }
  }, [current]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  }, [current]);

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Pointer handlers for desktop swipe
  const pointerStart = useRef<number>(0);
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const diff = pointerStart.current - e.clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const slide = slides[current];

  return (
    <div
      className="min-h-[100dvh] bg-[#0A0A0A] flex flex-col relative overflow-hidden select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* Logo */}
      <motion.div
        className="flex justify-center mt-10"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/logo-white.png"
          alt="Zero Lines"
          className="w-28 h-auto"
          draggable={false}
        />
      </motion.div>

      {/* Carousel Area */}
      <div className="flex-1 flex flex-col mt-8">
        {/* Image */}
        <div className="px-4 relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full aspect-[2/1] rounded-2xl overflow-hidden"
            >
              <img
                src={slide.image}
                alt={slide.overline}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Text Content */}
        <div className="px-6 mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.p
                variants={overlineVariants}
                className="text-overline text-[#0ABAB5] mb-3"
              >
                {slide.overline}
              </motion.p>
              <motion.h2
                variants={titleVariants}
                className="text-display text-white"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                variants={descVariants}
                className="text-body text-[#B0B0B0] mt-4"
              >
                {slide.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              i === current
                ? 'w-6 bg-[#0ABAB5]'
                : 'w-2 bg-[#4A4A4A]'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* CTA Buttons */}
      <motion.div
        className="px-6 mt-8 mb-8"
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
      >
        <button
          onClick={handleGetStarted}
          className="w-full h-14 bg-[#0ABAB5] text-white text-button font-semibold rounded-full active:scale-[0.97] active:brightness-90 transition-all duration-100"
        >
          Get Started
        </button>
        <button
          onClick={handleGetStarted}
          className="w-full mt-4 text-body-small text-[#8A8A8A] text-center active:text-[#0ABAB5] transition-colors duration-150"
        >
          Skip for now
        </button>
      </motion.div>

      {/* Bottom safe area */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}
