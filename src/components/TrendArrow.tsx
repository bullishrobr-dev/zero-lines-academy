import React from 'react';

export interface TrendArrowProps {
  /** Direction of the trend */
  trend: 'up' | 'down' | 'stable';
  /** Percentage change (absolute value shown) */
  percent: number;
  /** Optional size variant */
  size?: 'sm' | 'md';
  /** Optional additional className */
  className?: string;
}

/**
 * Compact inline trend indicator.
 *
 * - Up:   green ↑  with +X%
 * - Down: red  ↓  with -X%
 * - Stable: gray → with "stable"
 */
export const TrendArrow: React.FC<TrendArrowProps> = ({
  trend,
  percent,
  size = 'sm',
  className = '',
}) => {
  const sizeClasses = size === 'sm'
    ? 'text-xs gap-0.5'
    : 'text-sm gap-1';

  if (trend === 'up') {
    return (
      <span
        className={`inline-flex items-center font-semibold text-emerald-400 ${sizeClasses} ${className}`}
        aria-label={`Trending up ${percent}%`}
      >
        <svg
          width={size === 'sm' ? 12 : 14}
          height={size === 'sm' ? 12 : 14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
        <span>+{percent}%</span>
      </span>
    );
  }

  if (trend === 'down') {
    return (
      <span
        className={`inline-flex items-center font-semibold text-red-400 ${sizeClasses} ${className}`}
        aria-label={`Trending down ${percent}%`}
      >
        <svg
          width={size === 'sm' ? 12 : 14}
          height={size === 'sm' ? 12 : 14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14" />
          <path d="M19 12l-7 7-7-7" />
        </svg>
        <span>-{percent}%</span>
      </span>
    );
  }

  // stable
  return (
    <span
      className={`inline-flex items-center font-medium text-gray-500 ${sizeClasses} ${className}`}
      aria-label="Trend stable"
    >
      <svg
        width={size === 'sm' ? 12 : 14}
        height={size === 'sm' ? 12 : 14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </svg>
      <span>stable</span>
    </span>
  );
};

export default TrendArrow;
