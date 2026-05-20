import { motion } from 'framer-motion';
import { Clock, Layers } from 'lucide-react';

interface ProductHeroProps {
  icon: string;
  overline: string;
  title: string;
  subtitle: string;
  sections: number;
  readTime: string;
  badge?: string;
  progress?: number;
}

export default function ProductHero({
  icon,
  overline,
  title,
  subtitle,
  sections,
  readTime,
  badge,
  progress,
}: ProductHeroProps) {
  return (
    <div className="mb-6">
      {/* Progress bar */}
      {progress !== undefined && (
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#0ABAB5] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
              />
            </div>
            <span className="text-caption text-[#8A8A8A] font-mono">{progress}%</span>
          </div>
        </div>
      )}

      {/* Hero card */}
      <div className="px-5">
        <motion.div
          className="dark-card-gradient rounded-2xl p-6 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
        >
          {/* Decorative watermark */}
          <div className="absolute top-3 right-3 opacity-[0.05] w-24 h-24 pointer-events-none">
            <img src={icon} alt="" className="w-full h-full object-contain" />
          </div>

          {/* Badge */}
          {badge && (
            <span className="inline-block bg-[#0ABAB5] text-black text-overline px-3 py-1 rounded-full mb-4">
              {badge}
            </span>
          )}

          {/* Icon */}
          <div className="w-16 h-16 mb-4 rounded-xl bg-[#0ABAB5]/15 flex items-center justify-center">
            <img src={icon} alt={title} className="w-10 h-10 object-contain" />
          </div>

          {/* Overline */}
          <p className="text-overline text-[#0ABAB5] mb-2">{overline}</p>

          {/* Title */}
          <h1 className="text-h1 text-white mb-2">{title}</h1>

          {/* Subtitle */}
          <p className="text-body-small text-[#8A8A8A] mb-4">{subtitle}</p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-caption text-[#6B6B6B]">
            <div className="flex items-center gap-1.5">
              <Layers size={14} />
              <span>{sections} sections</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{readTime}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
