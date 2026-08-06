// ─────────────────────────────────────────────────────────────────────────────
// ShiftNudges.tsx — mounts the nudge engine app-wide.
//
// A nudge only fires when the seller is actually on shift (they checked in
// today) and is NOT mid-encounter — a buzz while someone is standing in front of
// them is a lost sale, which is the opposite of helping.
// ─────────────────────────────────────────────────────────────────────────────

import { useDailyFlow } from '../hooks/useDailyFlow';
import { useStreetTracker } from '../hooks/useStreetTracker';
import { useShiftNudges } from '../hooks/useShiftNudges';
import NudgeCard from './NudgeCard';

export default function ShiftNudges() {
  const { getTodayProgress } = useDailyFlow();
  const { openEncounter } = useStreetTracker();

  const onShift = getTodayProgress().checkedIn;
  const active = onShift && !openEncounter;

  const { current, dismiss } = useShiftNudges(active);

  return <NudgeCard nudge={current} onDismiss={dismiss} />;
}
