/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

/* Colour tokens live in src/index.css as space-separated RGB channels, so the
   `<alpha-value>` slot below keeps opacity modifiers (bg-teal/20) working. */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ── Surfaces ── */
        background: token('background'),
        surface: {
          DEFAULT: token('surface'),
          sunken: token('surface-sunken'),
          raised: token('surface-raised'),
        },

        /* ── Text ── */
        foreground: token('ink'),
        ink: {
          DEFAULT: token('ink'),
          2: token('ink-2'),
          3: token('ink-3'),
        },

        /* ── Lines ── */
        line: {
          DEFAULT: token('line'),
          strong: token('line-strong'),
        },

        /* ── Accents ──
           `teal`/`coral`/`gold` are FILLS. The `-strong` variants are the only
           ones safe for text; `on-*` are the ink colours to place on a fill. */
        teal: {
          DEFAULT: token('teal'),
          strong: token('teal-strong'),
          tint: token('teal-tint'),
        },
        'on-teal': token('on-teal'),
        coral: {
          DEFAULT: token('coral'),
          strong: token('coral-strong'),
          tint: token('coral-tint'),
        },
        'on-coral': token('on-coral'),
        gold: {
          DEFAULT: token('gold'),
          strong: token('gold-strong'),
          tint: token('gold-tint'),
        },
        'on-gold': token('on-gold'),
        violet: {
          DEFAULT: token('violet'),
          strong: token('violet-strong'),
          tint: token('violet-tint'),
        },

        /* ── Status ── */
        success: { DEFAULT: token('success'), tint: token('success-tint') },
        'on-success': token('on-success'),
        warning: { DEFAULT: token('warning'), tint: token('warning-tint') },
        'on-warning': token('on-warning'),
        danger: { DEFAULT: token('danger'), tint: token('danger-tint') },

        /* ── shadcn/ui compatibility ── */
        border: token('border'),
        input: token('input'),
        ring: token('ring'),
        primary: { DEFAULT: token('primary'), foreground: token('primary-foreground') },
        secondary: { DEFAULT: token('secondary'), foreground: token('secondary-foreground') },
        destructive: { DEFAULT: token('destructive'), foreground: token('destructive-foreground') },
        muted: { DEFAULT: token('muted'), foreground: token('muted-foreground') },
        accent: { DEFAULT: token('accent'), foreground: token('accent-foreground') },
        popover: { DEFAULT: token('popover'), foreground: token('popover-foreground') },
        card: { DEFAULT: token('card'), foreground: token('card-foreground') },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        brand: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      /* Four radii, not eleven. */
      borderRadius: {
        chip: 'var(--r-chip)',
        card: 'var(--r-card)',
        feature: 'var(--r-feature)',
        sm: 'calc(var(--r-chip) - 2px)',
        md: 'var(--r-chip)',
        lg: 'var(--r-card)',
        xl: 'var(--r-card)',
        '2xl': 'var(--r-feature)',
        '3xl': 'var(--r-feature)',
        full: '9999px',
      },

      /* 44px — the iOS/WCAG minimum touch target. */
      spacing: { touch: '44px' },
      minHeight: { touch: '44px' },
      minWidth: { touch: '44px' },
      width: { touch: '44px' },
      height: { touch: '44px' },

      maxWidth: { app: '480px' },

      boxShadow: {
        raised: 'var(--shadow-raised)',
        feature: 'var(--shadow-feature)',
        nav: 'var(--shadow-nav)',
      },

      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.35s ease-out forwards',
        shimmer: 'shimmer 2.4s linear infinite',
        float: 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
