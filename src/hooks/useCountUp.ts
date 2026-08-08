import { useState, useEffect, useRef } from 'react';

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(target: number, duration: number = 800): number {
  const [display, setDisplay] = useState(0);
  /* The number the animation is actually on, mirrored outside React state.
     The effect below needs to know where to count FROM when the target changes
     mid-flight, and it used to read `display` for that — state, read inside an
     effect that did not list it as a dependency. It happened to be right, but
     it is the exact shape of a stale-closure bug, and it was the one lint
     warning left in the repo. A ref is the honest way to say "the live value,
     not the one from the render that created this closure". */
  const displayRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const fromRef = useRef(0);
  const toRef = useRef(target);

  useEffect(() => {
    fromRef.current = displayRef.current;
    toRef.current = target;
    startTimeRef.current = null;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(fromRef.current + (toRef.current - fromRef.current) * eased);

      displayRef.current = current;
      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  return display;
}
