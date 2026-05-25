import React from 'react';
import { motion } from 'framer-motion';

interface BetweenShiftsCardProps {
  onFlashcardSprint: () => void;
  onScenarioDrill: () => void;
  onTechniqueReminder: () => void;
  onDismiss: () => void;
  lang: 'en' | 'es';
}

const t = {
  en: {
    headline: 'You have a few minutes — perfect for quick practice!',
    subheadline: 'Make the most of your off-door time',
    flashcard: 'Flashcard Sprint',
    flashcardTime: '1 min',
    flashcardDesc: 'Rapid-fire product facts',
    scenario: 'Scenario Drill',
    scenarioTime: '2 min',
    scenarioDesc: 'Practice common objections',
    technique: 'Technique Reminder',
    techniqueTime: '30 sec',
    techniqueDesc: 'A quick refresher tip',
    dismiss: "I'm ready for the door!",
    dismissSub: 'Get back out there and crush it',
  },
  es: {
    headline: 'Tienes unos minutos — ¡perfecto para practicar!',
    subheadline: 'Aprovecha tu tiempo fuera de la puerta',
    flashcard: 'Sprint de Fichas',
    flashcardTime: '1 min',
    flashcardDesc: 'Datos de producto rápidos',
    scenario: 'Simulacro de Escenario',
    scenarioTime: '2 min',
    scenarioDesc: 'Practica objeciones comunes',
    technique: 'Consejo de Técnica',
    techniqueTime: '30 seg',
    techniqueDesc: 'Un consejo rápido',
    dismiss: '¡Estoy listo para la puerta!',
    dismissSub: 'Vuelve allí y arrasa',
  },
};

const BetweenShiftsCard: React.FC<BetweenShiftsCardProps> = ({
  onFlashcardSprint,
  onScenarioDrill,
  onTechniqueReminder,
  onDismiss,
  lang,
}) => {
  const txt = t[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ type: 'spring', damping: 24, stiffness: 300 }}
      className="mx-4 mb-5"
    >
      <div className="bg-gradient-to-br from-[#141414] to-[#1A1A1A] rounded-2xl border border-[#0ABAB5]/20 overflow-hidden shadow-[0_0_30px_rgba(10,186,181,0.08)]">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">⏱️</span>
            <span className="text-xs font-medium text-[#0ABAB5] uppercase tracking-wider">
              {lang === 'en' ? 'Between Shifts' : 'Entre Turnos'}
            </span>
          </div>
          <h3 className="text-base font-bold text-white leading-snug">
            {txt.headline}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{txt.subheadline}</p>
        </div>

        {/* Exercise Options */}
        <div className="px-5 pb-3 space-y-2">
          {/* Flashcard Sprint */}
          <motion.button
            onClick={onFlashcardSprint}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0A] border border-gray-800/60 hover:border-[#0ABAB5]/30 transition-colors text-left"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 text-lg">
              🔥
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{txt.flashcard}</span>
                <span className="text-[10px] font-medium text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded-full">
                  {txt.flashcardTime}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">{txt.flashcardDesc}</p>
            </div>
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Scenario Drill */}
          <motion.button
            onClick={onScenarioDrill}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0A] border border-gray-800/60 hover:border-[#0ABAB5]/30 transition-colors text-left"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#0ABAB5] to-[#088A87] flex items-center justify-center flex-shrink-0 text-lg">
              🎯
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{txt.scenario}</span>
                <span className="text-[10px] font-medium text-[#0ABAB5] bg-[#0ABAB5]/10 px-1.5 py-0.5 rounded-full">
                  {txt.scenarioTime}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">{txt.scenarioDesc}</p>
            </div>
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Technique Reminder */}
          <motion.button
            onClick={onTechniqueReminder}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#0A0A0A] border border-gray-800/60 hover:border-[#0ABAB5]/30 transition-colors text-left"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0 text-lg">
              💡
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{txt.technique}</span>
                <span className="text-[10px] font-medium text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded-full">
                  {txt.techniqueTime}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">{txt.techniqueDesc}</p>
            </div>
            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Dismiss */}
        <div className="px-5 pb-5 pt-1">
          <motion.button
            onClick={onDismiss}
            whileTap={{ scale: 0.97 }}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#0ABAB5]/20 to-[#0ABAB5]/5 border border-[#0ABAB5]/20 flex items-center justify-center gap-2"
          >
            <span className="text-sm font-bold text-[#0ABAB5]">{txt.dismiss}</span>
          </motion.button>
          <p className="text-[10px] text-gray-600 text-center mt-1.5">{txt.dismissSub}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BetweenShiftsCard;
