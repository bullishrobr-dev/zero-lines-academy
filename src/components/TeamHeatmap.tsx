import React, { useMemo } from 'react';
import {
  COMPETENCIES,
  getCompetencyById,
  getScoreColorIntensity,
  getCompetencyColorWithOpacity,
  getLevelInfo,
} from '../data/competencies';
import type { CompetencyId } from '../data/competencies';
import type { CompetencyScores, CompetencyScore, EmployeeScores } from '../hooks/useCompetencies';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TeamHeatmapProps {
  /** Average competency scores across the team */
  teamAverages: CompetencyScores;
  /** Number of employees with data per competency */
  employeeCounts: Record<CompetencyId, number>;
  /** Total number of employees on the team */
  totalEmployees: number;
  /** Team overall average score */
  teamOverallAverage: number;
  /** Strongest competency info */
  teamStrongest: { id: CompetencyId; score: number } | null;
  /** Weakest competency info */
  teamWeakest: { id: CompetencyId; score: number } | null;
  /** Detailed scores per employee (optional, for expandable rows) */
  employeeScores?: EmployeeScores[];
  /** Optional title override */
  title?: string;
  /** Called when a competency cell is tapped */
  onCompetencyPress?: (competencyId: CompetencyId) => void;
  /** Additional CSS classes */
  className?: string;
  /** Whether scores are loading */
  isLoading?: boolean;
  /** If true, show Spanish labels */
  useSpanish?: boolean;
}

// ─── Insight Badge ────────────────────────────────────────────────────────────

interface InsightBadgeProps {
  type: 'strongest' | 'weakest';
  competencyId: CompetencyId;
  score: number;
  useSpanish?: boolean;
}

const InsightBadge: React.FC<InsightBadgeProps> = ({
  type,
  competencyId,
  score,
  useSpanish,
}) => {
  const competency = getCompetencyById(competencyId);
  if (!competency) return null;

  const label =
    type === 'strongest'
      ? useSpanish
        ? 'Más Fuerte'
        : 'Strongest'
      : useSpanish
        ? 'Necesita Trabajo'
        : 'Needs Work';

  const bgColor =
    type === 'strongest'
      ? 'bg-emerald-500/10 border-emerald-500/30'
      : 'bg-red-500/10 border-red-500/30';

  const textColor =
    type === 'strongest' ? 'text-emerald-400' : 'text-red-400';

  const scoreColor =
    type === 'strongest' ? 'text-emerald-300' : 'text-red-300';

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${bgColor}`}
    >
      <div
        className="h-3 w-3 rounded-sm"
        style={{ backgroundColor: competency.color }}
      />
      <div className="flex flex-col">
        <span className={`text-[10px] font-medium uppercase tracking-wider ${textColor}`}>
          {label}
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-semibold text-white">
            {competency.name}
          </span>
          <span className={`text-xs font-bold ${scoreColor}`}>{score}%</span>
        </div>
      </div>
    </div>
  );
};

// ─── Team Cell ────────────────────────────────────────────────────────────────

interface TeamCellProps {
  competencyId: CompetencyId;
  score: CompetencyScore;
  employeeCount: number;
  totalEmployees: number;
  useSpanish?: boolean;
  onPress?: (id: CompetencyId) => void;
}

const TeamCell: React.FC<TeamCellProps> = ({
  competencyId,
  score,
  employeeCount,
  totalEmployees,
  useSpanish,
  onPress,
}) => {
  const competency = getCompetencyById(competencyId);
  if (!competency) return null;

  const bgColor = getScoreColorIntensity(competency.color, score.score);
  const borderColor =
    score.score > 0
      ? getCompetencyColorWithOpacity(competency.color, 0.5)
      : 'rgba(255,255,255,0.05)';
  const levelInfo = getLevelInfo(score.level);

  return (
    <button
      type="button"
      onClick={() => onPress?.(competencyId)}
      className="relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all active:scale-95 focus:outline-none"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        flex: '1 1 0%',
        minWidth: 0,
      }}
    >
      {/* Competency color indicator */}
      <div
        className="h-1 w-full rounded-full"
        style={{ backgroundColor: competency.color }}
      />

      {/* Score */}
      <div className="flex flex-col items-center">
        <span
          className="text-2xl font-bold"
          style={{ color: score.score > 0 ? competency.color : '#6B7280' }}
        >
          {score.score}
        </span>
        <span className="text-[10px] text-white/30">
          {useSpanish ? 'Promedio' : 'Avg'}%
        </span>
      </div>

      {/* Employee count */}
      <div className="flex items-center gap-1 text-[10px] text-white/40">
        <svg
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
        <span>
          {employeeCount} / {totalEmployees}
        </span>
      </div>

      {/* Level badge */}
      {score.score > 0 && (
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
          style={{
            backgroundColor: `${levelInfo.color}22`,
            color: levelInfo.color,
          }}
        >
          {useSpanish ? levelInfo.labelEs : levelInfo.label}
        </span>
      )}
    </button>
  );
};

// ─── Distribution Bar ─────────────────────────────────────────────────────────

interface DistributionBarProps {
  employeeScores: EmployeeScores[];
  competencyId: CompetencyId;
  useSpanish?: boolean;
}

const ScoreDistribution: React.FC<DistributionBarProps> = ({
  employeeScores,
  competencyId,
}) => {
  const distribution = useMemo(() => {
    const ranges = {
      weak: { count: 0, color: '#DC2626', label: '0–30' },
      developing: { count: 0, color: '#F59E0B', label: '31–55' },
      strong: { count: 0, color: '#10B981', label: '56–75' },
      expert: { count: 0, color: '#047857', label: '76–100' },
    };

    employeeScores.forEach((emp) => {
      const score = emp.scores[competencyId]?.score ?? 0;
      if (score <= 30) ranges.weak.count++;
      else if (score <= 55) ranges.developing.count++;
      else if (score <= 75) ranges.strong.count++;
      else ranges.expert.count++;
    });

    return ranges;
  }, [employeeScores, competencyId]);

  const total = employeeScores.length;
  if (total === 0) return null;

  return (
    <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/5">
      {(Object.entries(distribution) as [string, { count: number; color: string; label: string }][]).map(([key, data]) => {
        const pct = (data.count / total) * 100;
        if (pct === 0) return null;
        return (
          <div
            key={key}
            className="h-full transition-all"
            style={{
              width: `${pct}%`,
              backgroundColor: data.color,
            }}
            title={`${data.label}: ${data.count}`}
          />
        );
      })}
    </div>
  );
};

// ─── Employee Row ─────────────────────────────────────────────────────────────

interface EmployeeRowProps {
  employee: EmployeeScores;
  useSpanish?: boolean;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, useSpanish: _useSpanish }) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
      {/* Avatar placeholder */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0ABAB5]/20 text-xs font-bold text-[#0ABAB5]">
        {employee.employeeName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)}
      </div>

      {/* Name */}
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-white/80">
        {employee.employeeName}
      </span>

      {/* Mini competency dots */}
      <div className="flex gap-1">
        {COMPETENCIES.map((comp) => {
          const score = employee.scores[comp.id]?.score ?? 0;
          const opacity = 0.15 + (score / 100) * 0.85;
          return (
            <div
              key={comp.id}
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: getCompetencyColorWithOpacity(comp.color, opacity),
                boxShadow:
                  score > 75
                    ? `0 0 4px ${getCompetencyColorWithOpacity(comp.color, 0.4)}`
                    : 'none',
              }}
              title={`${comp.name}: ${score}%`}
            />
          );
        })}
      </div>

      {/* Overall */}
      <span className="ml-2 text-xs font-bold text-[#0ABAB5]">
        {employee.overallAverage}%
      </span>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const TeamHeatmap: React.FC<TeamHeatmapProps> = ({
  teamAverages,
  employeeCounts,
  totalEmployees,
  teamOverallAverage,
  teamStrongest,
  teamWeakest,
  employeeScores = [],
  title,
  onCompetencyPress,
  className = '',
  isLoading = false,
  useSpanish = false,
}) => {
  const displayTitle = title ?? (useSpanish ? 'Mapa de Calor del Equipo' : 'Team Heatmap');

  if (isLoading) {
    return (
      <div className={`mx-auto w-full max-w-[430px] animate-pulse ${className}`}>
        <div className="h-5 w-36 rounded bg-white/5" />
        <div className="mt-3 flex gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-24 flex-1 rounded-lg bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full max-w-[430px] ${className}`}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">{displayTitle}</h2>
          <div className="flex items-center gap-2 rounded-full border border-[#0ABAB5]/30 bg-[#0ABAB5]/10 px-3 py-1">
            <span className="text-xs text-white/50">
              {useSpanish ? 'Promedio' : 'Team Avg'}
            </span>
            <span className="text-sm font-bold text-[#0ABAB5]">
              {teamOverallAverage}%
            </span>
          </div>
        </div>
        <p className="mt-0.5 text-xs text-white/40">
          {useSpanish
            ? `${totalEmployees} empleados en el equipo`
            : `${totalEmployees} employees on team`}
        </p>
      </div>

      {/* ── Insights ────────────────────────────────────────────────────── */}
      {(teamStrongest || teamWeakest) && (
        <div className="mb-4 flex flex-col gap-2">
          {teamStrongest && (
            <InsightBadge
              type="strongest"
              competencyId={teamStrongest.id}
              score={teamStrongest.score}
              useSpanish={useSpanish}
            />
          )}
          {teamWeakest && (
            <InsightBadge
              type="weakest"
              competencyId={teamWeakest.id}
              score={teamWeakest.score}
              useSpanish={useSpanish}
            />
          )}
        </div>
      )}

      {/* ── Team Grid: 7 cells in a row ────────────────────────────────── */}
      <div className="flex gap-2">
        {COMPETENCIES.map((comp) => (
          <TeamCell
            key={comp.id}
            competencyId={comp.id}
            score={teamAverages[comp.id]}
            employeeCount={employeeCounts[comp.id]}
            totalEmployees={totalEmployees}
            useSpanish={useSpanish}
            onPress={onCompetencyPress}
          />
        ))}
      </div>

      {/* ── Competency Labels Row ──────────────────────────────────────── */}
      <div className="mt-2 flex gap-2">
        {COMPETENCIES.map((comp) => (
          <div
            key={comp.id}
            className="flex-1 text-center text-[9px] font-medium leading-tight text-white/30"
            style={{ minWidth: 0 }}
          >
            {comp.name.split(' ')[0]}
          </div>
        ))}
      </div>

      {/* ── Distribution Bars (if employee scores provided) ────────────── */}
      {employeeScores.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
            {useSpanish ? 'Distribución por Competencia' : 'Score Distribution'}
          </h3>
          <div className="flex flex-col gap-3">
            {COMPETENCIES.map((comp) => (
              <div key={comp.id} className="flex items-center gap-3">
                <div className="flex w-28 shrink-0 items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: comp.color }}
                  />
                  <span className="truncate text-xs text-white/60">
                    {useSpanish ? comp.nameEs : comp.name}
                  </span>
                </div>
                <div className="flex-1">
                  <ScoreDistribution
                    employeeScores={employeeScores}
                    competencyId={comp.id}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold text-white/70">
                  {teamAverages[comp.id]?.score ?? 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Legend ─────────────────────────────────────────────────────── */}
      <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3">
        <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-white/30">
          {useSpanish ? 'Niveles de Competencia' : 'Proficiency Levels'}
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {(
            [
              { label: useSpanish ? 'Débil' : 'Weak', color: '#DC2626' },
              { label: useSpanish ? 'En Desarrollo' : 'Developing', color: '#F59E0B' },
              { label: useSpanish ? 'Fuerte' : 'Strong', color: '#10B981' },
              { label: useSpanish ? 'Experto' : 'Expert', color: '#047857' },
            ] as { label: string; color: string }[]
          ).map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: l.color }}
              />
              <span className="text-xs text-white/50">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Employee List (if provided) ────────────────────────────────── */}
      {employeeScores.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/30">
            {useSpanish ? 'Desglose por Empleado' : 'Employee Breakdown'}
          </h3>
          <div className="flex flex-col gap-2">
            {employeeScores.map((emp) => (
              <EmployeeRow
                key={emp.employeeId}
                employee={emp}
                useSpanish={useSpanish}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamHeatmap;
