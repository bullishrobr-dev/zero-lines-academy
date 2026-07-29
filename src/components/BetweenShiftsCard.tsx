import React from 'react';
import { motion } from 'framer-motion';
import { Timer, Flame, Target, Lightbulb, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BetweenShiftsCardProps {
  onFlashcardSprint: () => void;
  onScenarioDrill: () => void;
  onTechniqueReminder: () => void;
  onDismiss: () => void;
}

const COPY = {
  en: {
    eyebrow: 'Between shifts',
    headline: 'A few minutes free — perfect for a quick drill',
    subheadline: 'Make the off-door time count',
    flashcard: 'Flashcard sprint',
    flashcardTime: '1 min',
    flashcardDesc: 'Rapid-fire product facts',
    scenario: 'Scenario drill',
    scenarioTime: '2 min',
    scenarioDesc: 'Practise common objections',
    technique: 'Technique reminder',
    techniqueTime: '30 sec',
    techniqueDesc: 'One quick refresher',
    dismiss: "I'm ready for the door",
    dismissSub: 'Get back out there',
  },
  es: {
    eyebrow: 'Entre turnos',
    headline: 'Tienes unos minutos — perfecto para practicar',
    subheadline: 'Aprovecha el rato fuera de la puerta',
    flashcard: 'Sprint de fichas',
    flashcardTime: '1 min',
    flashcardDesc: 'Datos de producto a toda velocidad',
    scenario: 'Simulacro de escenario',
    scenarioTime: '2 min',
    scenarioDesc: 'Practica las objeciones más comunes',
    technique: 'Recordatorio de técnica',
    techniqueTime: '30 seg',
    techniqueDesc: 'Un repaso rápido',
    dismiss: 'Listo para la puerta',
    dismissSub: 'Vuelve ahí fuera',
  },
};

const DrillRow: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  time: string;
  desc: string;
  tint: string;
  ink: string;
}> = ({ onClick, icon, title, time, desc, tint, ink }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileTap={{ scale: 0.985 }}
    className="flex w-full items-center gap-3 rounded-card border border-line bg-surface p-3 text-left"
  >
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-card ${tint} ${ink}`}>
      {icon}
    </span>
    <span className="min-w-0 flex-1">
      <span className="flex items-center gap-2">
        <span className="truncate text-body-small font-semibold text-ink">{title}</span>
        <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-caption font-semibold ${tint} ${ink}`}>
          {time}
        </span>
      </span>
      <span className="block truncate text-caption text-ink-2">{desc}</span>
    </span>
    <ChevronRight className="h-5 w-5 shrink-0 text-ink-3" aria-hidden="true" />
  </motion.button>
);

const BetweenShiftsCard: React.FC<BetweenShiftsCardProps> = ({
  onFlashcardSprint,
  onScenarioDrill,
  onTechniqueReminder,
  onDismiss,
}) => {
  const { language } = useLanguage();
  const t = COPY[language === 'es' ? 'es' : 'en'];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: 'spring', damping: 24, stiffness: 300 }}
      className="surface-feature overflow-hidden"
      aria-label={t.eyebrow}
    >
      <div className="px-5 pb-3 pt-5">
        <div className="mb-1 flex items-center gap-2">
          <Timer className="h-4 w-4 text-teal-strong" aria-hidden="true" />
          <span className="text-overline text-teal-strong">{t.eyebrow}</span>
        </div>
        <h3 className="text-h4 leading-snug text-ink">{t.headline}</h3>
        <p className="mt-1 text-caption text-ink-2">{t.subheadline}</p>
      </div>

      <div className="space-y-2 px-5 pb-3">
        <DrillRow
          onClick={onFlashcardSprint}
          icon={<Flame className="h-5 w-5" aria-hidden="true" />}
          title={t.flashcard}
          time={t.flashcardTime}
          desc={t.flashcardDesc}
          tint="bg-coral-tint"
          ink="text-coral-strong"
        />
        <DrillRow
          onClick={onScenarioDrill}
          icon={<Target className="h-5 w-5" aria-hidden="true" />}
          title={t.scenario}
          time={t.scenarioTime}
          desc={t.scenarioDesc}
          tint="bg-teal-tint"
          ink="text-teal-strong"
        />
        <DrillRow
          onClick={onTechniqueReminder}
          icon={<Lightbulb className="h-5 w-5" aria-hidden="true" />}
          title={t.technique}
          time={t.techniqueTime}
          desc={t.techniqueDesc}
          tint="bg-violet-tint"
          ink="text-violet-strong"
        />
      </div>

      <div className="px-5 pb-5 pt-1">
        <button type="button" onClick={onDismiss} className="btn-secondary w-full">
          {t.dismiss}
        </button>
        <p className="mt-1.5 text-center text-caption text-ink-3">{t.dismissSub}</p>
      </div>
    </motion.section>
  );
};

export default BetweenShiftsCard;
