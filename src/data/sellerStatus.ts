// ─────────────────────────────────────────────────────────────────────────────
// sellerStatus.ts — how a manager's screen decides who needs help.
//
// ── WHY THIS IS ITS OWN FILE ────────────────────────────────────────────────
// This rule was written twice: once on the seller's card (conversion over the
// last seven days) and once in the headline tiles (fraction of the whole lesson
// corpus completed). They gave different answers about the same person on the
// same screen — a seller's card could read "On track" in green while the tile
// above counted her in "2 Behind".
//
// A manager cannot use a screen that argues with itself. So the rule lives
// here, once, and both callers import it.
//
// ── WHAT IT MEASURES, AND WHY THAT ORDER ────────────────────────────────────
// The shift is measured on what got sold. So the FLOOR comes first: conversion
// over the last seven days, which is who is getting the people they brought in
// to actually buy. That is the number a manager coaches on, and it is already
// in the data.
//
// Lessons are the fallback, not the measure. Ranking on lessons read produced
// the original bug: a brand-new hire was mathematically red on day one however
// well they sold, and someone who had finished both tiers open to her — twelve
// lessons, 92% average — came back "Falling behind" because there were 44 more
// she could not reach yet. A red dot everybody wears is a red dot nobody reads.
//
// ── THE FIRST TWO WEEKS ─────────────────────────────────────────────────────
// A new seller only stops people and passes them to a colleague. They do not
// demo and they do not close, so they have stops and no sales, and judging them
// on conversion would call the best beginner on the floor a failure. Anyone
// with no sales at all is therefore read as still learning, not as at risk.
// ─────────────────────────────────────────────────────────────────────────────

export type SellerStatus = 'onTrack' | 'needsPush' | 'atRisk' | 'notStarted';

/** Seven days on the street. All zeros when there is no server to ask. */
export interface FloorNumbers {
  stops: number;
  sales: number;
  /** sales ÷ stops as a percentage. */
  conversion: number;
}

export interface StatusInput {
  hasData: boolean;
  completedLessons: number;
  /** Percentage of the lesson corpus completed. */
  progress: number;
  street: FloorNumbers;
}

/** Sold to at least one in five they got inside — a working seller. */
export const CONVERSION_ON_TRACK = 20;
/** Bringing people in and not closing them: the case this screen exists for. */
export const CONVERSION_NEEDS_PUSH = 8;

export function sellerStatus(emp: StatusInput): SellerStatus {
  const working = emp.street.stops > 0;
  const closing = working && emp.street.sales > 0;

  if (closing) {
    if (emp.street.conversion >= CONVERSION_ON_TRACK) return 'onTrack';
    if (emp.street.conversion >= CONVERSION_NEEDS_PUSH) return 'needsPush';
    return 'atRisk';
  }

  /* Stopping people and closing none of them. That is two different people:
     the week-one hire doing exactly what the job asks — stop, bring in, hand
     to a colleague — and the seller who has gone cold. The app cannot tell
     them apart and should not pretend to, so both come out amber: worth the
     manager's eye, never a red flag, and never grey.

     Grey would be the worse mistake of the two. Somebody who stopped forty
     strangers this week has emphatically started, and reading "Not started"
     next to their name is how a manager learns to stop trusting the screen. */
  if (working) return 'needsPush';

  // Never worked a logged shift. Judge on movement through the training alone.
  if (!emp.hasData && emp.completedLessons === 0) return 'notStarted';
  if (emp.completedLessons === 0) return 'needsPush';
  if (emp.progress >= 40) return 'onTrack';
  return 'needsPush';
}

/** True once anyone on the team has worked a logged shift. */
export function hasFloorData(team: { street: FloorNumbers }[]): boolean {
  return team.some((e) => e.street.stops > 0 || e.street.sales > 0);
}

/* Below this, a conversion percentage is a coin toss wearing a statistic's
   clothes: one stop and one sale reads 100%. Enough to keep it off a headline
   that is meant to tell a manager who is actually closing. */
export const MIN_STOPS_TO_RANK = 5;

export interface HeadlineInput extends StatusInput {
  name: string;
}

export interface Headline {
  /** Fraction of the lesson corpus completed, averaged. The fallback measure. */
  avgCompletion: number;
  /** Best closer's first name, or whoever is furthest through the training. */
  topPerformer: string;
  atRiskCount: number;
  /** Null until somebody has worked a logged shift — see below. */
  teamConversion: number | null;
  topConversion: number | null;
}

/**
 * The three numbers across the top of the manager's screen.
 *
 * Pure, and separate from the backend, for the same reason the status rule is:
 * these have to agree with the dots on the cards underneath, and the only
 * reliable way to make two things agree is to have one of them.
 *
 * `teamConversion` is null rather than 0 when nobody has logged a shift. A
 * headline reading "0%" is a claim that the team sold nothing; null lets the
 * screen fall back to the training numbers and say something true instead.
 */
export function teamHeadline(team: HeadlineInput[]): Headline {
  const measured = team.filter((e) => e.hasData || e.street.stops > 0);
  if (measured.length === 0) {
    return {
      avgCompletion: 0,
      topPerformer: '—',
      atRiskCount: 0,
      teamConversion: null,
      topConversion: null,
    };
  }

  const first = (e: HeadlineInput) => e.name.split(' ')[0];
  const onFloor = measured.filter((e) => e.street.stops > 0);

  /* Recomputed from the totals rather than averaging each seller's percentage —
     averaging percentages lets somebody who stopped three people carry the same
     weight as somebody who stopped ninety. */
  const stops = onFloor.reduce((n, e) => n + e.street.stops, 0);
  const sales = onFloor.reduce((n, e) => n + e.street.sales, 0);

  const rankable = onFloor.filter(
    (e) => e.street.sales > 0 && e.street.stops >= MIN_STOPS_TO_RANK
  );
  const best = rankable.length
    ? rankable.reduce((b, e) => (e.street.conversion > b.street.conversion ? e : b))
    : null;

  return {
    avgCompletion: Math.round(measured.reduce((s, e) => s + e.progress, 0) / measured.length),
    topPerformer: best
      ? first(best)
      : first(measured.reduce((b, e) => (e.progress > b.progress ? e : b), measured[0])),
    atRiskCount: measured.filter((e) => sellerStatus(e) === 'atRisk').length,
    teamConversion: stops > 0 ? Math.round((sales / stops) * 100) : null,
    topConversion: best ? best.street.conversion : null,
  };
}
