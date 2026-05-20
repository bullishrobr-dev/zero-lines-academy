import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface TipCardProps {
  children: React.ReactNode;
}

export default function TipCard({ children }: TipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="bg-[#EDFCFB] rounded-xl px-5 py-4 my-5"
    >
      <div className="flex gap-3">
        <Lightbulb size={20} className="text-[#0ABAB5] shrink-0 mt-0.5" />
        <div className="text-[#2A2A2A] text-body-small leading-5">
          <span className="font-semibold text-[#065B58]">Pro Tip: </span>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
