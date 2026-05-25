import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import TrendArrow from './TrendArrow';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface VelocityGaugeProps {
  /** 0-100 Learning Velocity Score */
  score: number;
  /** Human-readable label */
  label: string;
  /** Week-over-week trend direction */
  trend: 'up' | 'down' | 'stable';
  /** How much the score changed */
  trendPercent: number;
  /** Width in pixels (default 180) */
  size?: number;
  /** Optional additional className */
  className?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Color zones for the gauge arc */
const COLOR_ZONES = [
  { min: 0,  max: 30,  color: '#EF4444' }, // red
  { min: 31, max: 55,  color: '#F59E0B' }, // orange
  { min: 56, max: 75,  color: '#22C55E' }, // green
  { min: 76, max: 100, color: '#0ABAB5' }, // emerald / brand turquoise
];

const GAUGE_CONFIG = {
  startAngle: -180,   // left side
  endAngle: 0,        // right side  (180° arc total)
  strokeWidth: 14,
  trackColor: '#1F1F1F',
  needleColor: '#E5E5E5',
  needlePivotColor: '#2A2A2A',
};

// ---------------------------------------------------------------------------
// SVG geometry helpers
// ---------------------------------------------------------------------------

/** Convert polar coordinates (angle in degrees, radius) to cartesian (x, y) */
function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

/**
 * Build an SVG arc path definition.
 * @param cx        center x
 * @param cy        center y
 * @param radius    arc radius
 * @param startAngle  start angle in degrees
 * @param endAngle    end angle in degrees
 */
function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(' ');
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const VelocityGauge: React.FC<VelocityGaugeProps> = ({
  score,
  label,
  trend,
  trendPercent,
  size = 180,
  className = '',
}) => {
  // Derive geometry from size
  const padding = 18;
  const cx = size / 2;
  const cy = size / 2 + 4; // slight downward offset so arc sits nicely
  const radius = (size - padding * 2) / 2;

  // Clamp score 0-100
  const clampedScore = Math.min(100, Math.max(0, score));

  // Target angle for the needle (mapped from score to arc range)
  const { startAngle, endAngle } = GAUGE_CONFIG;
  const angleRange = endAngle - startAngle; // 180 degrees
  const targetAngle = startAngle + (clampedScore / 100) * angleRange;

  // Needle tip position
  const needleLength = radius - 6;
  const needleTip = polarToCartesian(cx, cy, needleLength, targetAngle);

  // Zone arcs
  const zoneArcs = useMemo(() => {
    return COLOR_ZONES.map((zone) => {
      const zoneStart = startAngle + (zone.min / 100) * angleRange;
      const zoneEnd = startAngle + (zone.max / 100) * angleRange;
      return {
        ...zone,
        d: describeArc(cx, cy, radius, zoneStart, zoneEnd),
      };
    });
  }, [cx, cy, radius, startAngle, angleRange]);

  // Tick marks every 10%
  const ticks = useMemo(() => {
    const items: { angle: number; isMajor: boolean }[] = [];
    for (let i = 0; i <= 100; i += 10) {
      const angle = startAngle + (i / 100) * angleRange;
      items.push({ angle, isMajor: i % 20 === 0 });
    }
    return items;
  }, [startAngle, angleRange]);

  // Determine label color based on score
  const labelColor = useMemo(() => {
    if (clampedScore >= 76) return '#0ABAB5';
    if (clampedScore >= 56) return '#22C55E';
    if (clampedScore >= 31) return '#F59E0B';
    return '#EF4444';
  }, [clampedScore]);

  return (
    <div
      className={`flex flex-col items-center select-none ${className}`}
      style={{ width: size }}
      role="img"
      aria-label={`Learning Velocity Score: ${clampedScore}, ${label}`}
    >
      <svg
        width={size}
        height={size / 2 + 16}
        viewBox={`0 0 ${size} ${size / 2 + 16}`}
        className="overflow-visible"
      >
        {/* Background track */}
        <path
          d={describeArc(cx, cy, radius, startAngle, endAngle)}
          fill="none"
          stroke={GAUGE_CONFIG.trackColor}
          strokeWidth={GAUGE_CONFIG.strokeWidth}
          strokeLinecap="butt"
        />

        {/* Colored zones */}
        {zoneArcs.map((zone) => (
          <path
            key={`zone-${zone.min}-${zone.max}`}
            d={zone.d}
            fill="none"
            stroke={zone.color}
            strokeWidth={GAUGE_CONFIG.strokeWidth}
            strokeLinecap="butt"
            opacity={0.9}
          />
        ))}

        {/* Tick marks */}
        {ticks.map((tick, idx) => {
          const inner = polarToCartesian(cx, cy, radius - 10, tick.angle);
          const outer = polarToCartesian(cx, cy, radius + 2, tick.angle);
          return (
            <line
              key={`tick-${idx}`}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#555"
              strokeWidth={tick.isMajor ? 1.5 : 0.8}
              opacity={0.6}
            />
          );
        })}

        {/* Tick labels (0, 50, 100) */}
        {[0, 50, 100].map((val) => {
          const angle = startAngle + (val / 100) * angleRange;
          const pos = polarToCartesian(cx, cy, radius + 14, angle);
          return (
            <text
              key={`label-${val}`}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#888"
              fontSize={9}
              fontFamily="system-ui, sans-serif"
            >
              {val}
            </text>
          );
        })}

        {/* Needle (animated with Framer Motion spring) */}
        <motion.line
          x1={cx}
          y1={cy}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke={GAUGE_CONFIG.needleColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={false}
          animate={{ x2: needleTip.x, y2: needleTip.y }}
          transition={{
            type: 'spring',
            stiffness: 60,
            damping: 15,
            duration: 1,
          }}
        />

        {/* Needle pivot circle */}
        <circle
          cx={cx}
          cy={cy}
          r={5}
          fill={GAUGE_CONFIG.needlePivotColor}
          stroke={GAUGE_CONFIG.needleColor}
          strokeWidth={1.5}
        />

        {/* Score number (above the arc, left side) + trend */}
        <text
          x={cx - 18}
          y={cy - 8}
          textAnchor="end"
          dominantBaseline="central"
          fill="#E5E5E5"
          fontSize={22}
          fontWeight="700"
          fontFamily="system-ui, sans-serif"
        >
          {clampedScore}
        </text>
      </svg>

      {/* Bottom row: label + trend arrow */}
      <div className="flex items-center gap-2 -mt-1">
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: labelColor }}
        >
          {label}
        </span>
        <TrendArrow trend={trend} percent={trendPercent} size="sm" />
      </div>
    </div>
  );
};

export default VelocityGauge;
