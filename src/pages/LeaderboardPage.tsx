import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeaderboard, type Timeframe } from "../hooks/useLeaderboard";
import PeerShoutout from "../components/PeerShoutout";

interface LeaderboardPageProps {
  currentUserId?: string;
  onNavigateHome: () => void;
}

const TIMEFRAME_TABS: { label: string; value: Timeframe }[] = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All Time", value: "allTime" },
];

function getRankStyle(rank: number): { bg: string; text: string; glow?: boolean } {
  if (rank === 1) return { bg: "bg-amber-500", text: "text-amber-500", glow: true };
  if (rank === 2) return { bg: "bg-gray-300", text: "text-gray-300", glow: true };
  if (rank === 3) return { bg: "bg-amber-600", text: "text-amber-600", glow: true };
  return { bg: "bg-[#1A1A1A]", text: "text-[#888]" };
}

function RankBadge({ rank }: { rank: number }) {
  const style = getRankStyle(rank);
  if (rank <= 3) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center ${
          style.glow ? "shadow-lg" : ""
        }`}
        style={
          rank === 1
            ? { boxShadow: "0 0 12px rgba(245,158,11,0.4)" }
            : rank === 2
            ? { boxShadow: "0 0 12px rgba(209,213,219,0.3)" }
            : { boxShadow: "0 0 12px rgba(217,119,6,0.3)" }
        }
      >
        <span className="text-xs font-bold text-black">
          {rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"}
        </span>
      </motion.div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center">
      <span className="text-xs font-bold text-[#888]">{rank}</span>
    </div>
  );
}

function WeeklyChange({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="flex items-center gap-0.5 text-xs font-medium text-emerald-400">
        <span>↑</span>
        <span>+{change}</span>
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="flex items-center gap-0.5 text-xs font-medium text-red-400">
        <span>↓</span>
        <span>{change}</span>
      </span>
    );
  }
  return <span className="text-xs text-[#555]">—</span>;
}

export default function LeaderboardPage({
  currentUserId = "u7",
  onNavigateHome,
}: LeaderboardPageProps) {
  const { entries, getLeaderboard, getStoreStats, getUserRank, addShoutout } = useLeaderboard();
  const [timeframe, setTimeframe] = useState<Timeframe>("week");
  const [showShoutout, setShowShoutout] = useState(false);

  const leaderboard = useMemo(() => getLeaderboard(timeframe), [getLeaderboard, timeframe]);
  const storeStats = useMemo(() => getStoreStats(), [getStoreStats]);
  const userRank = useMemo(
    () => getUserRank(currentUserId, timeframe),
    [getUserRank, currentUserId, timeframe]
  );

  const totalStoreXP = storeStats.andorra + storeStats.gibraltar;
  const andorraPct = totalStoreXP > 0 ? (storeStats.andorra / totalStoreXP) * 100 : 50;
  const gibraltarPct = totalStoreXP > 0 ? (storeStats.gibraltar / totalStoreXP) * 100 : 50;

  // Find user entry and the person ahead
  const userEntry = entries.find((e) => e.id === currentUserId);
  const personAhead = leaderboard[userRank - 2]; // 0-indexed, so -2 for person ahead
  const xpGap = personAhead
    ? (timeframe === "week"
        ? personAhead.xpThisWeek
        : timeframe === "month"
        ? personAhead.xpThisMonth
        : personAhead.xpAllTime) -
      (timeframe === "week"
        ? (userEntry?.xpThisWeek ?? 0)
        : timeframe === "month"
        ? (userEntry?.xpThisMonth ?? 0)
        : (userEntry?.xpAllTime ?? 0))
    : 0;

  const handleShoutoutSubmit = (to: string, message: string, reaction: string) => {
    addShoutout(currentUserId, to, message, reaction);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white max-w-[430px] mx-auto relative">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#1A1A1A]">
        <div className="flex items-center px-4 py-3 gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onNavigateHome}
            className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#AAA] hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
          <div className="flex-1">
            <h1 className="text-base font-bold">Leaderboard</h1>
            <p className="text-[10px] text-[#888]">Andorra 🇦🇩 vs Gibraltar 🇬🇮</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowShoutout(true)}
            className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center text-lg"
          >
            👏
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex px-4 pb-3 gap-1">
          {TIMEFRAME_TABS.map((tab) => (
            <motion.button
              key={tab.value}
              whileTap={{ scale: 0.97 }}
              onClick={() => setTimeframe(tab.value)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                timeframe === tab.value
                  ? "bg-[#0ABAB5] text-black"
                  : "bg-[#1A1A1A] text-[#888] hover:text-white"
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Store vs Store Header */}
      <div className="px-4 py-4">
        <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇦🇩</span>
              <div>
                <p className="text-xs font-semibold text-white">Andorra</p>
                <p className="text-[10px] text-[#0ABAB5]">{storeStats.andorra.toLocaleString()} XP</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#444] uppercase tracking-wider">VS</span>
            <div className="flex items-center gap-2 text-right">
              <div>
                <p className="text-xs font-semibold text-white">Gibraltar</p>
                <p className="text-[10px] text-[#0ABAB5]">{storeStats.gibraltar.toLocaleString()} XP</p>
              </div>
              <span className="text-xl">🇬🇮</span>
            </div>
          </div>

          {/* Animated bar race */}
          <div className="relative h-4 bg-[#1A1A1A] rounded-full overflow-hidden flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${andorraPct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#0ABAB5] rounded-full relative"
            >
              {andorraPct > gibraltarPct && (
                <motion.div
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  👑
                </motion.div>
              )}
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${gibraltarPct}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
              className="h-full rounded-full relative"
              style={{ backgroundColor: "#2A4B7C" }}
            >
              {gibraltarPct > andorraPct && (
                <motion.div
                  className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  👑
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Winning indicator */}
          <div className="flex justify-center mt-2">
            <span className="text-[10px] text-[#888]">
              {storeStats.andorra > storeStats.gibraltar
                ? "🇦🇩 Andorra leads by " + (storeStats.andorra - storeStats.gibraltar).toLocaleString() + " XP"
                : storeStats.gibraltar > storeStats.andorra
                ? "🇬🇮 Gibraltar leads by " + (storeStats.gibraltar - storeStats.andorra).toLocaleString() + " XP"
                : "It's a tie!"}
            </span>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-4 pb-4">
        <div className="flex items-end justify-center gap-3 h-36">
          {leaderboard.slice(0, 3).map((entry, idx) => {
            const heights = ["h-20", "h-28", "h-24"]; // 2nd, 1st, 3rd
            const positions = [0, 1, 2]; // visual order: 2nd, 1st, 3rd
            const actualRank = positions[idx] + 1;
            const heightClass = heights[idx];
            const style = getRankStyle(actualRank);

            return (
              <motion.div
                key={entry.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ delay: idx * 0.15, duration: 0.5, type: "spring" }}
                className="flex flex-col items-center gap-2 flex-1"
              >
                {/* Avatar */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.15, type: "spring" }}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${style.bg} ${
                    actualRank === 1 ? "ring-2 ring-amber-500/50" : ""
                  }`}
                >
                  <span className={actualRank <= 3 ? "text-black" : "text-white"}>
                    {entry.initials}
                  </span>
                  {actualRank === 1 && (
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.6, type: "spring" }}
                      className="absolute -top-1 -right-1 text-lg"
                    >
                      👑
                    </motion.span>
                  )}
                </motion.div>

                {/* Name */}
                <p className="text-[10px] font-medium text-white text-center truncate w-full">
                  {entry.name.split(" ")[0]}
                </p>

                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
                  className={`w-full ${heightClass} rounded-t-xl ${style.bg} flex items-end justify-center pb-2 min-h-[60px]`}
                  style={
                    actualRank === 1
                      ? { boxShadow: "0 0 20px rgba(245,158,11,0.2)" }
                      : undefined
                  }
                >
                  <span className="text-[10px] font-bold text-black">
                    {timeframe === "week"
                      ? entry.xpThisWeek
                      : timeframe === "month"
                      ? entry.xpThisMonth
                      : entry.xpAllTime}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Individual Rankings List */}
      <div className="px-4 pb-32">
        <h3 className="text-xs font-semibold text-[#888] uppercase tracking-wider mb-3">
          Rankings
        </h3>
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {leaderboard.map((entry, index) => {
              const rank = index + 1;
              const isCurrentUser = entry.id === currentUserId;
              const xpValue =
                timeframe === "week"
                  ? entry.xpThisWeek
                  : timeframe === "month"
                  ? entry.xpThisMonth
                  : entry.xpAllTime;

              return (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.03 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                    isCurrentUser
                      ? "border-[#0ABAB5]/40 bg-[#0ABAB5]/5"
                      : "border-[#1A1A1A] bg-[#111]"
                  }`}
                >
                  {/* Rank */}
                  <RankBadge rank={rank} />

                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrentUser ? "bg-[#0ABAB5] text-black" : "bg-[#1A1A1A] text-[#0ABAB5]"
                    }`}
                  >
                    {entry.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-white truncate">{entry.name}</p>
                      <span className="text-xs">{entry.flag}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <WeeklyChange change={entry.weeklyChange} />
                    </div>
                  </div>

                  {/* XP */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0ABAB5]">{xpValue.toLocaleString()}</p>
                    <p className="text-[10px] text-[#666]">XP</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Your Rank Card — Sticky Bottom */}
      {userEntry && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200, delay: 0.5 }}
          className="fixed bottom-0 left-0 right-0 z-20 flex justify-center"
        >
          <div className="w-full max-w-[430px] bg-[#0A0A0A]/98 backdrop-blur-lg border-t border-[#0ABAB5]/30 px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Your rank */}
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold text-[#0ABAB5]">#{userRank}</span>
                <span className="text-[9px] text-[#888]">YOUR RANK</span>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-[#1A1A1A]" />

              {/* Avatar + Name */}
              <div className="flex items-center gap-2 flex-1">
                <div className="w-9 h-9 rounded-full bg-[#0ABAB5] flex items-center justify-center text-xs font-bold text-black">
                  {userEntry.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{userEntry.name}</p>
                  <p className="text-[10px] text-[#888]">
                    {timeframe === "week"
                      ? userEntry.xpThisWeek.toLocaleString()
                      : timeframe === "month"
                      ? userEntry.xpThisMonth.toLocaleString()
                      : userEntry.xpAllTime.toLocaleString()}{" "}
                    XP
                  </p>
                </div>
              </div>

              {/* XP to next */}
              {personAhead && xpGap > 0 && (
                <div className="text-right">
                  <p className="text-[10px] text-[#888]">Beat {personAhead.name.split(" ")[0]}</p>
                  <p className="text-xs font-semibold text-amber-400">+{xpGap} XP</p>
                </div>
              )}
              {userRank === 1 && (
                <div className="text-right">
                  <span className="text-lg">👑</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Peer Shoutout Modal */}
      <AnimatePresence>
        {showShoutout && (
          <PeerShoutout
            employees={entries.map((e) => ({
              id: e.id,
              name: e.name,
              initials: e.initials,
              flag: e.flag,
            }))}
            currentUserId={currentUserId}
            onSubmit={handleShoutoutSubmit}
            onClose={() => setShowShoutout(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
