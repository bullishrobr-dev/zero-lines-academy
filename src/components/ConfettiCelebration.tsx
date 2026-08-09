// ─────────────────────────────────────────────────────────────
// ConfettiCelebration.tsx — four-burst celebration
//
// Particle colours are pulled from the live design tokens rather than hardcoded
// hexes, so the burst matches whichever theme is on screen. Respects
// prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────

import { useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiCelebrationProps {
  trigger?: boolean;
  onComplete?: () => void;
}

/** Read a `--token` (stored as "R G B") and return a hex canvas-confetti accepts. */
function tokenHex(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/[\s,]+/).map(Number);
  if (parts.length < 3 || parts.some((n) => !Number.isFinite(n))) return fallback;
  return `#${parts
    .slice(0, 3)
    .map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0'))
    .join('')}`;
}

function palette(): string[] {
  return [
    tokenHex('--teal', '#0ABAB5'),
    tokenHex('--coral', '#FF6A7A'),
    tokenHex('--gold', '#E3B54A'),
    tokenHex('--violet', '#7A54D6'),
    tokenHex('--success', '#15803D'),
  ];
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function burst() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    colors: palette(),
    disableForReducedMotion: true,
  };

  confetti({ ...defaults, origin: { x: 0.5, y: 0.5 }, particleCount: 80, scalar: 1.2 });

  setTimeout(() => {
    confetti({ ...defaults, origin: { x: 0.2, y: 0.6 }, particleCount: 40, scalar: 0.8 });
  }, 150);

  setTimeout(() => {
    confetti({ ...defaults, origin: { x: 0.8, y: 0.6 }, particleCount: 40, scalar: 0.8 });
  }, 300);

  setTimeout(() => {
    confetti({
      ...defaults,
      origin: { x: 0.5, y: 0.3 },
      particleCount: 50,
      spread: 180,
      gravity: 1.2,
      scalar: 0.9,
    });
  }, 450);
}

/**
 * Renders nothing; fires a celebration when `trigger` flips to true and calls
 * `onComplete` once the burst has settled so the caller can reset the flag.
 */
export default function ConfettiCelebration({ trigger, onComplete }: ConfettiCelebrationProps) {
  const done = useCallback(() => onComplete?.(), [onComplete]);

  useEffect(() => {
    if (!trigger) return;

    if (!prefersReducedMotion()) burst();

    const timer = setTimeout(done, 2000);
    return () => clearTimeout(timer);
  }, [trigger, done]);

  return null;
}
