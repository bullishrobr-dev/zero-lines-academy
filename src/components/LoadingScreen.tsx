import { Sparkles } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-[#0ABAB5]/15 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-[#0ABAB5]" />
          </div>
          <div className="absolute inset-0 rounded-2xl border border-[#0ABAB5]/30 animate-ping opacity-30" />
        </div>
        <p className="text-sm text-[#8A8A8A] font-medium animate-pulse">
          Loading...
        </p>
      </div>

      {/* Skeleton cards to show something while loading */}
      <div className="w-full max-w-[380px] mt-10 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2A2A2A] animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#2A2A2A]" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 bg-[#2A2A2A] rounded w-3/4" />
                <div className="h-2.5 bg-[#2A2A2A] rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
