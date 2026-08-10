// ─────────────────────────────────────────────────────────────────────────────
// ShiftNudges.tsx — mounts the nudge engine app-wide.
//
// A nudge only fires when the seller is actually on shift (they checked in
// today) and is NOT mid-encounter — a buzz while someone is standing in front of
// them is a lost sale, which is the opposite of helping.
// ─────────────────────────────────────────────────────────────────────────────

import { useShiftNudges } from '../hooks/useShiftNudges';
import NudgeCard from './NudgeCard';

export default function ShiftNudges() {
  /* "On shift and not mid-encounter" is decided inside ShiftNudgesProvider now,
     from the daily flow and the street log, so every screen agrees about it. */
  const { current, dismiss } = useShiftNudges();

  return <NudgeCard nudge={current} onDismiss={dismiss} />;
}
