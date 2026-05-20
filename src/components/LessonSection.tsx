import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface LessonSectionProps {
  sectionNumber: number;
  totalSections: number;
  title: string;
  children: ReactNode;
}

export default function LessonSection({
  sectionNumber,
  totalSections,
  title,
  children,
}: LessonSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
      className="mb-8"
    >
      {/* Section divider */}
      <p className="text-caption text-[#6B6B6B] text-center my-8 tracking-[0.08em]">
        &mdash;&mdash; Section {sectionNumber} of {totalSections} &mdash;&mdash;
      </p>

      {/* Section title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay: 0.05, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
        className="text-h2 text-white mb-4"
      >
        {title}
      </motion.h2>

      {/* Section content */}
      <div>{children}</div>
    </motion.section>
  );
}
