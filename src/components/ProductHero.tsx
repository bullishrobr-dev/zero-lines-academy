// ─────────────────────────────────────────────────────────────────────────────
// ProductHero — the masthead of a product deep-dive.
//
// This file was written for exactly this job and then never imported; the four
// pages each drew their own hero instead, in the near-black palette, and none
// of them opened with an <h1> — every page started at <h2>, so the heading
// outline of the whole app was broken. There is now one hero, it carries the
// page's only <h1>, and it takes its hue from the --pa custom properties that
// <ProductPage> sets.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export interface HeroStat {
  icon: ReactNode;
  label: string;
  value: string;
}

interface ProductHeroProps {
  backLabel: string;
  badge: string;
  badgeIcon: ReactNode;
  title: string;
  subtitle: string;
  subtitleIcon?: ReactNode;
  stats: HeroStat[];
}

/* A soft accent wash instead of the old #0D1F1F → #0A0A0A gradient. */
const wash: CSSProperties = {
  background:
    'radial-gradient(120% 88% at 8% 0%, rgb(var(--pa) / 0.20) 0%, transparent 62%),' +
    'radial-gradient(100% 70% at 96% 4%, rgb(var(--pa) / 0.12) 0%, transparent 60%)',
};

export default function ProductHero({
  backLabel,
  badge,
  badgeIcon,
  title,
  subtitle,
  subtitleIcon,
  stats,
}: ProductHeroProps) {
  const navigate = useNavigate();

  return (
    <header className="relative overflow-hidden px-5 pt-4 pb-6">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={wash} />

      <div className="relative">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-quiet flex w-fit px-4 text-caption"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          {backLabel}
        </button>

        <motion.p
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-[rgb(var(--pa-tint))] text-[rgb(var(--pa-strong))]"
        >
          <span aria-hidden="true" className="flex">
            {badgeIcon}
          </span>
          <span className="text-overline">{badge}</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="text-display font-brand text-ink mt-3"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex items-center gap-2 text-body text-[rgb(var(--pa-strong))] font-semibold mt-1.5"
        >
          {subtitleIcon && (
            <span aria-hidden="true" className="flex shrink-0">
              {subtitleIcon}
            </span>
          )}
          {subtitle}
        </motion.p>

        {stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="grid grid-cols-3 gap-2 mt-5"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="surface-flat px-2 py-3 text-center flex flex-col items-center gap-1"
              >
                <span aria-hidden="true" className="text-[rgb(var(--pa-strong))]">
                  {stat.icon}
                </span>
                <dt className="text-caption text-ink-2 leading-tight w-full break-words">
                  {stat.label}
                </dt>
                <dd className="text-body-small font-bold text-ink leading-tight w-full break-words">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </header>
  );
}
