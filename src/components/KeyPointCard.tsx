import { motion } from 'framer-motion';
import { KeyRound } from 'lucide-react';

interface KeyPointCardProps {
  children: React.ReactNode;
}

export default function KeyPointCard({ children }: KeyPointCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="bg-[#1A1A1A] rounded-xl px-5 py-4 my-5 border border-[#0ABAB5]/20"
    >
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#0ABAB5]/15 flex items-center justify-center shrink-0">
          <KeyRound size={18} className="text-[#0ABAB5]" />
        </div>
        <div className="text-[#D1D1D1] text-body leading-6">
          <span className="font-semibold text-[#0ABAB5]">Key Point: </span>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
