import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  total: number;
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  animate?: boolean;
}

export default function ScoreCircle({
  score,
  total,
  percentage: propPercentage,
  size = 140,
  strokeWidth = 10,
  label,
  sublabel,
  animate = true,
}: ScoreCircleProps) {
  const percentage = propPercentage ?? (total > 0 ? Math.round((score / total) * 100) : 0);
  const [displayPct, setDisplayPct] = useState(animate ? 0 : percentage);
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayPct / 100) * circumference;

  // Color based on score
  let strokeColor = '#EF4444';
  if (percentage >= 80) strokeColor = '#22C55E';
  else if (percentage >= 50) strokeColor = '#F59E0B';

  useEffect(() => {
    if (!animate) return;

    const duration = 1200;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      setDisplayPct(Math.round(percentage * eased));
      setDisplayScore(Math.round(score * eased));

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [animate, percentage, score]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2A2A2A"
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-h1 text-white">{displayScore}/{total}</span>
        </div>
      </div>
      <span className="text-h3 text-white">{displayPct}%</span>
      {label && <span className="text-body text-white mt-1">{label}</span>}
      {sublabel && <span className="text-body-small text-[#8A8A8A]">{sublabel}</span>}
    </div>
  );
}
