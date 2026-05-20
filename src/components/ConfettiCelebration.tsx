import { useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiCelebrationProps {
  trigger?: boolean;
  onComplete?: () => void;
}

export default function ConfettiCelebration({ trigger, onComplete }: ConfettiCelebrationProps) {
  const firedRef = useRef(false);

  const fire = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#0ABAB5', '#D4A843', '#FFFFFF', '#F59E0B', '#22C55E'],
    };

    // Center burst
    confetti({
      ...defaults,
      origin: { x: 0.5, y: 0.5 },
      particleCount: 80,
      scalar: 1.2,
    });

    // Left burst
    setTimeout(() => {
      confetti({
        ...defaults,
        origin: { x: 0.2, y: 0.6 },
        particleCount: 40,
        scalar: 0.8,
      });
    }, 150);

    // Right burst
    setTimeout(() => {
      confetti({
        ...defaults,
        origin: { x: 0.8, y: 0.6 },
        particleCount: 40,
        scalar: 0.8,
      });
    }, 300);

    // Top rain
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

    setTimeout(() => {
      firedRef.current = false;
      onComplete?.();
    }, 2000);
  }, [onComplete]);

  // Fire automatically when trigger becomes true
  if (trigger && !firedRef.current) {
    fire();
  }

  return null;
}

export function useConfetti() {
  const fire = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#0ABAB5', '#D4A843', '#FFFFFF', '#F59E0B', '#22C55E'],
    };

    confetti({
      ...defaults,
      origin: { x: 0.5, y: 0.5 },
      particleCount: 80,
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        origin: { x: 0.2, y: 0.6 },
        particleCount: 40,
        scalar: 0.8,
      });
    }, 150);

    setTimeout(() => {
      confetti({
        ...defaults,
        origin: { x: 0.8, y: 0.6 },
        particleCount: 40,
        scalar: 0.8,
      });
    }, 300);
  }, []);

  return fire;
}
