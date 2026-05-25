import confetti from 'canvas-confetti';

export function celebrateLessonComplete() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#0ABAB5', '#F59E0B', '#8B5CF6'],
  });
}

export function celebrateChallengeComplete() {
  confetti({
    particleCount: 60,
    spread: 50,
    origin: { y: 0.7 },
    colors: ['#0ABAB5', '#10B981'],
  });
}

export function celebrateSaleLogged() {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.5 },
    colors: ['#F59E0B', '#EF4444', '#0ABAB5'],
  });
}
