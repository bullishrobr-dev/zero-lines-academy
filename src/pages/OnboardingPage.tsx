// ─────────────────────────────────────────────────────────────────────────────
// OnboardingPage — the app's front door.
//
// This is the only screen a seller sees before they have an account, and on a
// phone it is the whole first impression. It leads with photography, the app's
// only use of `text-display`, and directional slide transitions.
//
// ── THE FACELIFT ────────────────────────────────────────────────────────────
//   • The photographs were broken on the live site — see the note on `image`
//     below. Everything else here was designed around pictures that never
//     loaded, which is why the screen read as empty.
//   • The hero now runs edge to edge, under the status bar, instead of starting
//     below a safe-area gutter with a visible seam above it. Layout.tsx no
//     longer applies `pt-safe` on this route; the page insets its own controls.
//   • A slow push-in on the active photograph (9s, no loop) gives the screen a
//     pulse. `MotionConfig reducedMotion="user"` in main.tsx disables it for
//     anyone who has asked the OS for less motion.
//   • The scrim is two layers deep and 160px tall, so the picture dissolves into
//     the page instead of ending on a hard horizontal cut.
//   • The overline is a tinted chip, the pagination is a progress track rather
//     than three identical dots, and the primary action carries an arrow and a
//     real shadow. Small things, but this screen is judged in two seconds.
//
// ── EARLIER FIXES WORTH KEEPING ─────────────────────────────────────────────
//   • The page was 100% English regardless of the language toggle. It runs
//     through useLanguage() and the eleven Onboarding keys in translations.ts.
//   • The title was an <h2>, so the front door had no <h1>.
//   • The CTA was `text-white` on teal — 2.41:1. It is coral with the dark ink
//     the system pairs with a coloured fill.
//   • "Skip for now" navigated to /auth, exactly where "Get Started" went, so
//     the choice was fake. The second action is "Sign in", which opens the same
//     screen in login mode instead of signup — a real difference.
//   • Each slide has real alt text in both languages.
//   • The three 1.3-1.7 MB PNGs are WebP (~50-90 KB), slides 2 and 3 lazy.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { TranslationKey } from '../data/translations';

/*
 * Image paths are RELATIVE ('./x.webp'), never absolute ('/x.webp').
 *
 * The site is served from a sub-path — bullishrobr-dev.github.io/zero-lines-
 * academy/ — so a leading slash resolves to the domain root and 404s. Every
 * onboarding photograph was a broken-image icon on the live site, which is the
 * first thing anyone saw. Vite rewrites bundled imports but not string paths to
 * files in public/, so these have to be relative by hand. vite.config.ts already
 * sets `base: './'` for the same reason.
 */
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
    image: './onboarding-1.webp',
    // Framed on the wordmark: this photograph carries the brand for the whole
    // sequence, which is why no logo is overlaid on top of it.
    focus: '50% 42%',
    alt: {
      en: 'The Zero Lines wordmark set among dark green botanical leaves.',
      es: 'El logotipo de Zero Lines entre hojas botánicas verde oscuro.',
    },
  },
  {
    overlineKey: 'onboardingOverline2',
    titleKey: 'onboardingTitle2',
    descKey: 'onboardingDesc2',
    image: './onboarding-2.webp',
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
    image: './onboarding-3.webp',
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
    /* `overflow-x-clip` rather than `overflow-hidden`: the slide transitions
       translate ±60px and must not add a horizontal scrollbar, but on a short
       screen (a 667px iPhone SE in Spanish, where the copy runs longer) the
       column has to be allowed to grow and scroll rather than be cut off. */
    <div
      className="relative flex min-h-[100dvh] select-none flex-col overflow-x-clip bg-background"
      onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
      onTouchEnd={(e) => swipe(touchStart.current - e.changedTouches[0].clientX)}
      onPointerDown={(e) => (pointerStart.current = e.clientX)}
      onPointerUp={(e) => swipe(pointerStart.current - e.clientX)}
    >
      {/* ── Hero ─────────────────────────────────────────────────────────────
          Runs to the very top of the screen, behind the status bar. Capped at
          430px so it does not swallow a tall phone or a desktop window. */}
      <div className="relative h-[48vh] max-h-[430px] min-h-[248px] w-full shrink-0 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {/* Three nested transforms, each owning one job: the wrapper slides,
              the inner layer pushes in, the <img> holds its own crop. Framer
              would otherwise overwrite whichever one shared its element. */}
          <motion.div
            key={current}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.09 }}
              animate={{ scale: 1 }}
              transition={{ duration: 9, ease: 'linear' }}
              className="h-full w-full"
            >
              <img
                src={slide.image}
                alt={isEs ? slide.alt.es : slide.alt.en}
                loading={current === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
                style={{ objectPosition: slide.focus }}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Keeps the language switch legible on a bright photograph. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 via-black/18 to-transparent"
        />
        {/* Dissolve the photograph into the page rather than cutting it off.
            Two stops: a long soft ramp, then a short opaque one that guarantees
            the seam lands on solid background whatever the photo is doing. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            background:
              'linear-gradient(to bottom, rgb(var(--background) / 0) 0%, rgb(var(--background) / 0.55) 62%, rgb(var(--background)) 100%)',
          }}
        />
        {/* Corner vignette — stops the crop reading as a flat rectangle. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 85% at 50% 25%, transparent 45%, rgb(20 12 8 / 0.28) 100%)',
          }}
        />

        {/* No logo is overlaid here on purpose: the logo asset is an opaque
            black tile, and slide 1's photograph already carries the wordmark —
            two of them on one screen read as a mistake. The mark appears at
            real scale on the very next screen. */}

        {/* Half the sellers are Spanish-first, and the language control
            otherwise sits behind sign-in, three screens away. Offset by the
            status-bar inset now that the hero runs underneath it. */}
        <div
          className="absolute right-3 flex items-center rounded-full bg-black/40 p-0.5 ring-1 ring-white/15 backdrop-blur-sm"
          style={{ top: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)' }}
        >
          {(['en', 'es'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              aria-pressed={language === lang}
              aria-label={lang === 'en' ? t('authEnglish') : t('authSpanish')}
              className={`min-h-touch rounded-full px-3.5 text-caption font-semibold transition-colors ${
                language === lang ? 'bg-teal text-on-teal' : 'text-white/85'
              }`}
            >
              {lang === 'en' ? 'EN' : 'ES'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Copy ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col px-6">
        {/* Ambient wash so the lower half is not a flat slab under a photo.
            Pure CSS, using the brand tokens — costs nothing to download. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[-3rem] -z-10"
          style={{
            background:
              'radial-gradient(85% 55% at 12% 8%, rgb(var(--teal) / 0.12) 0%, transparent 62%), radial-gradient(75% 50% at 95% 78%, rgb(var(--coral) / 0.12) 0%, transparent 65%)',
          }}
        />

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
              <motion.p variants={overlineVariants}>
                <span className="inline-flex items-center rounded-full bg-teal-tint px-3 py-1 text-overline text-teal-strong">
                  {t(slide.overlineKey)}
                </span>
              </motion.p>
              <motion.h1
                variants={titleVariants}
                className="mt-3.5 font-brand text-display font-bold tracking-[-0.015em] text-ink [text-wrap:balance]"
              >
                {t(slide.titleKey)}
              </motion.h1>
              <motion.p variants={descVariants} className="mt-3.5 text-body text-ink-2">
                {t(slide.descKey)}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          {/* Pagination reads as progress, not as three interchangeable dots:
              the track behind is 6px, the target around it is 44px. */}
          <div className="flex justify-center gap-1.5 pt-2">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => goTo(i)}
                className="grid min-h-touch place-items-center px-1"
                aria-label={
                  isEs
                    ? `Ir a la diapositiva ${i + 1} de ${slides.length}`
                    : `Go to slide ${i + 1} of ${slides.length}`
                }
                aria-current={i === current ? 'true' : undefined}
              >
                <span
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    i === current
                      ? 'w-10 bg-teal'
                      : i < current
                        ? 'w-6 bg-teal/40'
                        : 'w-6 bg-line-strong/35'
                  }`}
                />
              </button>
            ))}
          </div>

          <motion.div className="pb-6 pt-1" variants={ctaVariants} initial="hidden" animate="visible">
            <button
              type="button"
              onClick={() => navigate('/auth', { state: { mode: 'signup' } })}
              className="btn-primary h-14 w-full text-button shadow-feature"
            >
              {t('getStarted')}
              <ArrowRight size={20} strokeWidth={2.4} aria-hidden="true" />
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
                  ¿Ya tienes cuenta?{' '}
                  <span className="font-semibold text-teal-strong">Inicia sesión</span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span className="font-semibold text-teal-strong">Sign in</span>
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
