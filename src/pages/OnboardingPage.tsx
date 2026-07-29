// ─────────────────────────────────────────────────────────────────────────────
// OnboardingPage — the app's front door.
//
// The confident parts are kept: full-bleed photography, directional slide
// transitions, and the app's only use of `text-display`. What was fixed:
//
//   • The page was 100% English regardless of the language toggle. It now runs
//     through useLanguage() and the eleven Onboarding keys that already existed
//     in translations.ts and had never been referenced.
//   • The title was an <h2>, so the front door had no <h1> at all.
//   • The CTA was `text-white` on teal — 2.41:1. Primary action is now coral
//     with the dark ink the system pairs with a coloured fill.
//   • "Skip for now" navigated to /auth, exactly where "Get Started" went, so
//     the choice was fake. The second action is now "Sign in", which opens the
//     same screen in login mode instead of signup — a real difference.
//   • alt={slide.overline} described nothing and duplicated visible text. Each
//     slide now has real alt text in both languages.
//   • The three 1.3-1.7 MB PNGs are WebP (~50-90 KB), slides 2 and 3 lazy.
//
// The logo tile has an opaque black background, so it is composited with
// `mix-blend-screen` over the hero scrim — black disappears, the mark floats.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import type { TranslationKey } from '../data/translations';

interface SlideData {
  overlineKey: TranslationKey;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  image: string;
  /** Where to hold the crop — these are tall portraits in a wide hero. */
  focus: string;
  alt: { en: string; es: string };
}

const slides: SlideData[] = [
  {
    overlineKey: 'onboardingOverline1',
    titleKey: 'onboardingTitle1',
    descKey: 'onboardingDesc1',
    image: '/onboarding-1.webp',
    // Held low so the wordmark printed in the photograph does not sit directly
    // under the wordmark we overlay.
    focus: '50% 88%',
    alt: {
      en: 'Dark green botanical leaves lit from the side, the Zero Lines house style.',
      es: 'Hojas botánicas verde oscuro iluminadas de lado, el estilo de Zero Lines.',
    },
  },
  {
    overlineKey: 'onboardingOverline2',
    titleKey: 'onboardingTitle2',
    descKey: 'onboardingDesc2',
    image: '/onboarding-2.webp',
    focus: '50% 32%',
    alt: {
      en: "A woman's face split down the middle: deeply lined skin on one side, smooth skin on the other.",
      es: 'El rostro de una mujer dividido por la mitad: piel muy marcada en un lado, piel lisa en el otro.',
    },
  },
  {
    overlineKey: 'onboardingOverline3',
    titleKey: 'onboardingTitle3',
    descKey: 'onboardingDesc3',
    image: '/onboarding-3.webp',
    focus: '50% 42%',
    alt: {
      en: 'A seller demonstrating a product to a smiling customer across a Zero Lines counter.',
      es: 'Una vendedora mostrando un producto a una clienta sonriente en un mostrador de Zero Lines.',
    },
  },
];

// ── Animation Variants ──────────────────────────────────────
const imageVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const overlineVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const descVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' as const, delay: 0.15 } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.35 },
  },
};

// ── Component ───────────────────────────────────────────────
export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStart = useRef(0);
  const pointerStart = useRef(0);
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const isEs = language === 'es';

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current],
  );

  const goNext = useCallback(() => {
    setCurrent((c) => {
      if (c >= slides.length - 1) return c;
      setDirection(1);
      return c + 1;
    });
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => {
      if (c <= 0) return c;
      setDirection(-1);
      return c - 1;
    });
  }, []);

  const swipe = (delta: number) => {
    if (Math.abs(delta) <= 50) return;
    if (delta > 0) goNext();
    else goPrev();
  };

  const slide = slides[current];

  return (
    <div
      className="relative flex min-h-[100dvh] select-none flex-col overflow-hidden bg-background"
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => swipe(touchStart.current - e.changedTouches[0].clientX)}
      onPointerDown={(e) => (pointerStart.current = e.clientX)}
      onPointerUp={(e) => swipe(pointerStart.current - e.clientX)}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[48vh] min-h-[280px] w-full shrink-0 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={current}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            src={slide.image}
            alt={isEs ? slide.alt.es : slide.alt.en}
            loading={current === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            style={{ objectPosition: slide.focus }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Scrim so the wordmark reads over any of the three photographs. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 via-black/25 to-transparent"
        />
        {/* Dissolve the photograph into the page rather than cutting it off. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgb(var(--background)))',
          }}
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-center">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src="/logo-white.webp"
            alt="Zero Lines"
            width={448}
            height={550}
            draggable={false}
            className="mt-5 h-auto w-[84px] mix-blend-screen"
          />

          {/* Half the sellers are Spanish-first and the language control
              otherwise sits behind sign-in, three screens away. */}
          <div className="absolute right-2 top-2 flex items-center rounded-full bg-black/40 p-0.5 backdrop-blur-sm">
            {(['en', 'es'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                aria-label={lang === 'en' ? t('authEnglish') : t('authSpanish')}
                className={`min-h-[34px] rounded-full px-2.5 text-caption font-semibold transition-colors ${
                  language === lang ? 'bg-teal text-on-teal' : 'text-white/85'
                }`}
              >
                {lang === 'en' ? 'EN' : 'ES'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copy ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col px-6">
        {/* The wrapper owns the space so the CTA never jumps while a slide
            swaps out underneath it. */}
        <div className="flex flex-1 items-center py-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="w-full"
            >
              <motion.p variants={overlineVariants} className="text-overline text-teal-strong">
                {t(slide.overlineKey)}
              </motion.p>
              <motion.h1
                variants={titleVariants}
                className="mt-3 font-brand text-display font-bold tracking-[-0.015em] text-ink"
              >
                {t(slide.titleKey)}
              </motion.h1>
              <motion.p variants={descVariants} className="mt-4 text-body text-ink-2">
                {t(slide.descKey)}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          {/* Pagination — the dot is 8px, the target around it is 44px. */}
          <div className="flex justify-center gap-1 pt-2">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => goTo(i)}
                className="grid min-h-touch min-w-touch place-items-center"
                aria-label={
                  isEs ? `Ir a la diapositiva ${i + 1} de ${slides.length}` : `Go to slide ${i + 1} of ${slides.length}`
                }
                aria-current={i === current ? 'true' : undefined}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ease-out ${
                    i === current ? 'w-6 bg-teal' : 'w-2 bg-line-strong/60'
                  }`}
                />
              </button>
            ))}
          </div>

          <motion.div
            className="pb-8 pt-2"
            variants={ctaVariants}
            initial="hidden"
            animate="visible"
          >
            <button
              type="button"
              onClick={() => navigate('/auth', { state: { mode: 'signup' } })}
              className="btn-primary h-14 w-full text-button"
            >
              {t('getStarted')}
            </button>

            {/* Was "Skip for now", which went to the same place as Get Started.
                This opens the same screen already switched to sign-in. */}
            <button
              type="button"
              onClick={() => navigate('/auth', { state: { mode: 'login' } })}
              className="mt-2 min-h-touch w-full text-body-small text-ink-2 transition-colors active:text-teal-strong"
            >
              {isEs ? (
                <>
                  ¿Ya tienes cuenta? <span className="font-semibold text-teal-strong">Inicia sesión</span>
                </>
              ) : (
                <>
                  Already have an account? <span className="font-semibold text-teal-strong">Sign in</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      <div className="pb-safe" />
    </div>
  );
}
