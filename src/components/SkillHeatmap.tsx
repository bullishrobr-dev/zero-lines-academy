import React, { useState, useCallback } from 'react';
import {
  COMPETENCIES,
  getScoreColorIntensity,
  getCompetencyColorWithOpacity,
  getCompetencyById,
  getLevelInfo,
} from '../data/competencies';
import type { CompetencyId, ProficiencyLevel } from '../data/competencies';
import type { CompetencyScores, CompetencyScore } from '../hooks/useCompetencies';

// ─── Types ────────────────────────────────────────────────────────────────────

export type HeatmapVariant = 'compact' | 'full';

export interface SkillHeatmapProps {
  /** Competency scores from useCompetencies hook */
  scores: CompetencyScores;
  /** Visual variant */
  variant?: HeatmapVariant;
  /** Optional title override */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Overall average score to display */
  overallAverage?: number;
  /** Called when a competency cell is tapped */
  onCompetencyPress?: (competencyId: CompetencyId) => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether scores are still loading */
  isLoading?: boolean;
  /** If true, show Spanish labels */
  useSpanish?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LEVEL_DOT_COLORS: Record<ProficiencyLevel, string> = {
  weak: '#DC2626',
  developing: '#F59E0B',
  strong: '#10B981',
  expert: '#047857',
};

function getCellBorderColor(baseColor: string, score: number): string {
  const intensity = Math.max(0.3, score / 100);
  return getCompetencyColorWithOpacity(baseColor, intensity);
}

// ─── Compact Cell ─────────────────────────────────────────────────────────────

interface CompactCellProps {
  competencyId: CompetencyId;
  score: CompetencyScore;
  onPress?: (id: CompetencyId) => void;
}

const CompactCell: React.FC<CompactCellProps> = ({ competencyId, score, onPress }) => {
  const competency = getCompetencyById(competencyId);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  if (!competency) return null;

  const bgColor = getScoreColorIntensity(competency.color, score.score);
  const borderColor = getCellBorderColor(competency.color, score.score);
  const levelInfo = getLevelInfo(score.level);

  const handleEnter = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTooltipPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
      setShowTooltip(true);
    },
    []
  );

  const handleLeave = useCallback(() => {
    setShowTooltip(false);
  }, []);

  return (
    <div className="relative inline-flex flex-col items-center">
      <button
        type="button"
        onClick={() => onPress?.(competencyId)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onTouchStart={handleEnter}
        onTouchEnd={handleLeave}
        className="flex flex-col items-center gap-1 transition-transform active:scale-95 focus:outline-none"
        aria-label={`${competency.name}: ${score.score}% - ${levelInfo.label}`}
      >
        {/* Colored square cell */}
        <div
          className="relative flex items-center justify-center rounded-lg transition-shadow"
          style={{
            width: 48,
            height: 48,
            backgroundColor: bgColor,
            border: `2px solid ${borderColor}`,
            boxShadow: score.score > 60
              ? `0 0 12px ${getCompetencyColorWithOpacity(competency.color, 0.25)}`
              : 'none',
          }}
        >
          <span
            className="text-lg font-bold"
            style={{
              color: score.score > 40
                ? competency.color
                : '#6B7280',
            }}
          >
            {score.score}
          </span>

          {/* Level indicator dot */}
          <div
            className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#0A0A0A]"
            style={{ backgroundColor: LEVEL_DOT_COLORS[score.level] }}
          />
        </div>

        {/* Abbreviated label */}
        <span
          className="mt-1 text-center text-[10px] font-medium leading-tight text-white/60"
          style={{ maxWidth: 52 }}
        >
          {competency.name.split(' ')[0]}
        </span>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-white/10 bg-[#1A1A1A] px-3 py-2 shadow-2xl"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: 'translate(-50%, -100%)',
            minWidth: 160,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: competency.color }}
            />
            <span className="text-sm font-semibold text-white">
              {competency.name}
            </span>
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="text-xl font-bold text-white">{score.score}%</span>
            <span
              className="text-xs font-medium"
              style={{ color: levelInfo.color }}
            >
              {levelInfo.label}
            </span>
          </div>
          <div className="mt-1 space-y-0.5 text-xs text-white/50">
            <div className="flex justify-between gap-4">
              <span>Lessons</span>
              <span>{score.lessonCompletion}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Quizzes</span>
              <span>{score.quizAccuracy}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Flashcards</span>
              <span>{score.flashcardMastery}%</span>
            </div>
          </div>
          {/* Arrow */}
          <div
            className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-[#1A1A1A]"
          />
        </div>
      )}
    </div>
  );
};

// ─── Full Cell ────────────────────────────────────────────────────────────────

interface FullCellProps {
  competencyId: CompetencyId;
  score: CompetencyScore;
  useSpanish?: boolean;
  onPress?: (id: CompetencyId) => void;
}

const FullCell: React.FC<FullCellProps> = ({ competencyId, score, useSpanish, onPress }) => {
  const competency = getCompetencyById(competencyId);
  if (!competency) return null;

  const bgColor = getScoreColorIntensity(competency.color, score.score);
  const borderColor = getCellBorderColor(competency.color, score.score);
  const levelInfo = getLevelInfo(score.level);

  // Color bar width based on score
  const barWidth = `${score.score}%`;

  return (
    <button
      type="button"
      onClick={() => onPress?.(competencyId)}
      className="flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all active:scale-[0.98] focus:outline-none"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      {/* Competency color indicator */}
      <div
        className="h-10 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: competency.color }}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {/* Name and score row */}
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-white">
            {useSpanish ? competency.nameEs : competency.name}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            <span className="text-base font-bold" style={{ color: competency.color }}>
              {score.score}%
            </span>
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                backgroundColor: `${levelInfo.color}22`,
                color: levelInfo.color,
              }}
            >
              {useSpanish ? levelInfo.labelEs : levelInfo.label}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: barWidth,
              backgroundColor: competency.color,
              boxShadow: `0 0 8px ${getCompetencyColorWithOpacity(competency.color, 0.4)}`,
            }}
          />
        </div>

        {/* Sub-scores */}
        <div className="flex gap-3 text-[10px] text-white/40">
          <span>
            {useSpanish ? 'Lecciones' : 'Lessons'}:{' '}
            <span className="text-white/70">{score.lessonCompletion}%</span>
          </span>
          <span>
            {useSpanish ? 'Cuestionarios' : 'Quizzes'}:{' '}
            <span className="text-white/70">{score.quizAccuracy}%</span>
          </span>
          <span>
            {useSpanish ? 'Tarjetas' : 'Cards'}:{' '}
            <span className="text-white/70">{score.flashcardMastery}%</span>
          </span>
        </div>
      </div>
    </button>
  );
};

// ─── Legend ───────────────────────────────────────────────────────────────────

interface LegendProps {
  useSpanish?: boolean;
}

const HeatmapLegend: React.FC<LegendProps> = ({ useSpanish }) => {
  const levels: Array<{ key: ProficiencyLevel; label: string; color: string }> = [
    { key: 'weak', label: useSpanish ? 'Débil' : 'Weak', color: '#DC2626' },
    { key: 'developing', label: useSpanish ? 'En Desarrollo' : 'Developing', color: '#F59E0B' },
    { key: 'strong', label: useSpanish ? 'Fuerte' : 'Strong', color: '#10B981' },
    { key: 'expert', label: useSpanish ? 'Experto' : 'Expert', color: '#047857' },
  ];

  return (
    <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-white/30">
        {useSpanish ? 'Niveles de Competencia' : 'Proficiency Levels'}
      </span>
      <div className="flex flex-wrap items-center gap-3">
        {levels.map((l) => (
          <div key={l.key} className="flex items-center gap-1.5">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: l.color }}
            />
            <span className="text-xs text-white/50">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Intensity scale */}
      <div className="mt-2.5 flex items-center gap-2">
        <span className="text-[10px] text-white/30">0%</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gradient-to-r from-white/5 via-white/20 to-white/50" />
        <span className="text-[10px] text-white/30">100%</span>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const SkillHeatmap: React.FC<SkillHeatmapProps> = ({
  scores,
  variant = 'full',
  title,
  subtitle,
  overallAverage,
  onCompetencyPress,
  className = '',
  isLoading = false,
  useSpanish = false,
}) => {
  const displayTitle = title ?? (useSpanish ? 'Mapa de Competencias' : 'Skill Heatmap');
  const displaySubtitle =
    subtitle ??
    (useSpanish
      ? 'Haz clic en cualquier competencia para ver el detalle'
      : 'Tap any competency for details');

  if (isLoading) {
    return (
      <div className={`mx-auto w-full max-w-[430px] animate-pulse ${className}`}>
        <div className="h-5 w-32 rounded bg-white/5" />
        <div className="mt-3 flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-12 flex-1 rounded-lg bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  // Compact variant: horizontal row of 7 colored cells
  if (variant === 'compact') {
    return (
      <div className={`mx-auto w-full max-w-[430px] ${className}`}>
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">{displayTitle}</h3>
            {overallAverage !== undefined && (
              <span className="text-xs text-white/40">
                {useSpanish ? 'Promedio' : 'Avg'}: {' '}
                <span className="font-semibold text-[#0ABAB5]">{overallAverage}%</span>
              </span>
            )}
          </div>
        </div>

        {/* Compact grid: 7 cells */}
        <div className="flex items-start justify-between gap-1">
          {COMPETENCIES.map((comp) => (
            <CompactCell
              key={comp.id}
              competencyId={comp.id}
              score={scores[comp.id]}
              onPress={onCompetencyPress}
            />
          ))}
        </div>
      </div>
    );
  }

  // Full variant: detailed vertical list
  return (
    <div className={`mx-auto w-full max-w-[430px] ${className}`}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{displayTitle}</h2>
          {overallAverage !== undefined && (
            <div className="flex items-center gap-2 rounded-full border border-[#0ABAB5]/30 bg-[#0ABAB5]/10 px-3 py-1">
              <span className="text-xs text-white/50">
                {useSpanish ? 'Promedio' : 'Overall'}
              </span>
              <span className="text-sm font-bold text-[#0ABAB5]">{overallAverage}%</span>
            </div>
          )}
        </div>
        <p className="mt-0.5 text-xs text-white/40">{displaySubtitle}</p>
      </div>

      {/* Full competency list */}
      <div className="flex flex-col gap-2.5">
        {COMPETENCIES.map((comp) => (
          <FullCell
            key={comp.id}
            competencyId={comp.id}
            score={scores[comp.id]}
            useSpanish={useSpanish}
            onPress={onCompetencyPress}
          />
        ))}
      </div>

      {/* Legend */}
      <HeatmapLegend useSpanish={useSpanish} />
    </div>
  );
};

export default SkillHeatmap;
