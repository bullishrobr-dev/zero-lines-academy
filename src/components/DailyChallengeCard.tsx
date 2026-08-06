// ─────────────────────────────────────────────────────────────
// DailyChallengeCard.tsx — one challenge a day, worth XP
// Champagne-gold feature surface: this is an achievement, not navigation.
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, Target } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Challenge {
  id: string;
  text: string;
  textEs: string;
  xpReward: number;
}

const ALL_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    text: 'Practice the Syringe pitch out loud 3 times',
    textEs: 'Practica el pitch de la Jeringa en voz alta 3 veces',
    xpReward: 20,
  },
  {
    id: 'c2',
    text: 'Use a compliment-based stop on 5 people today',
    textEs: 'Para a 5 personas hoy usando un cumplido',
    xpReward: 20,
  },
  {
    id: 'c3',
    text: 'Close a sale using the two-choice framework',
    textEs: 'Cierra una venta con la técnica de las dos opciones',
    xpReward: 30,
  },
  {
    id: 'c4',
    text: 'Demo the Peeling to 3 customers with full routine',
    textEs: 'Haz la demo del Peeling completa a 3 clientes',
    xpReward: 20,
  },
  {
    id: 'c5',
    text: 'Practice handling the "I need to think about it" objection',
    textEs: 'Practica cómo rebatir el "me lo tengo que pensar"',
    xpReward: 20,
  },
  {
    id: 'c6',
    text: "Apply Cialdini's reciprocity principle in 3 interactions",
    textEs: 'Aplica el principio de reciprocidad de Cialdini en 3 interacciones',
    xpReward: 25,
  },
  {
    id: 'c7',
    text: 'Read 3 buying signals and act on them',
    textEs: 'Detecta 3 señales de compra y actúa sobre ellas',
    xpReward: 20,
  },
  {
    id: 'c8',
    text: 'Use the Nail Kit upsell on every sale today',
    textEs: 'Ofrece el Kit de Uñas como extra en cada venta de hoy',
    xpReward: 25,
  },
  {
    id: 'c9',
    text: 'Complete the Scrub full-body demo for a customer',
    textEs: 'Haz la demo completa del Exfoliante a un cliente',
    xpReward: 20,
  },
  {
    id: 'c10',
    text: 'Name 5 features and benefits of the Syringe from memory',
    textEs: 'Di de memoria 5 características y beneficios de la Jeringa',
    xpReward: 20,
  },
  {
    id: 'c11',
    text: 'Use urgency language in 5 closing attempts',
    textEs: 'Usa lenguaje de urgencia en 5 intentos de cierre',
    xpReward: 20,
  },
  {
    id: 'c12',
    text: 'Practice the voucher close on a hesitant customer',
    textEs: 'Practica el cierre con vale en un cliente indeciso',
    xpReward: 25,
  },
  {
    id: 'c13',
    text: 'Identify a couple dynamic and adapt your pitch',
    textEs: 'Identifica la dinámica de una pareja y adapta tu pitch',
    xpReward: 20,
  },
  {
    id: 'c14',
    text: 'Go 1 hour without saying "No problem" or "Sure"',
    textEs: 'Aguanta 1 hora sin decir "sin problema" ni "vale"',
    xpReward: 20,
  },
  {
    id: 'c15',
    text: 'Get 2 customer referrals using the referral script',
    textEs: 'Consigue 2 recomendaciones usando el guion de referidos',
    xpReward: 30,
  },
];

function getDailySeed(): number {
  // LOCAL date, not toISOString() (which is UTC). Completion is tracked by local
  // day, so a UTC seed served yesterday's challenge between midnight and ~02:00
  // local — and that stale challenge could be completed again for more XP.
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getTodaysChallenge(): Challenge {
  const seed = getDailySeed();
  return ALL_CHALLENGES[seed % ALL_CHALLENGES.length];
}

interface DailyChallengeCardProps {
  isCompleted: boolean;
  onComplete: (xpReward: number) => void;
}

export default function DailyChallengeCard({
  isCompleted,
  onComplete,
}: DailyChallengeCardProps) {
  const [justCompleted, setJustCompleted] = useState(false);
  const challenge = useMemo(() => getTodaysChallenge(), []);
  const { t, language } = useLanguage();
  const isEs = language === 'es';

  const handleComplete = () => {
    if (isCompleted || justCompleted) return;
    setJustCompleted(true);
    // Pay exactly what the card promised (challenges are worth 20–30), not a
    // flat 20 the caller used to hardcode.
    onComplete(challenge.xpReward);
  };

  const isDone = isCompleted || justCompleted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
      className="surface-feature feature-gold relative overflow-hidden p-5"
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-chip bg-gold-tint">
          <Flame size={20} className="text-gold-strong" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h3 className="text-h4 text-ink">{t('homeDailyChallenge')}</h3>
          <p className="text-caption text-ink-3">
            {new Date().toLocaleDateString(isEs ? 'es-ES' : 'en-GB', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        {isDone && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="ml-auto flex shrink-0 items-center gap-1 rounded-full bg-success-tint px-3 py-1 text-caption text-success"
          >
            <Check size={14} strokeWidth={2.5} aria-hidden="true" />
            {t('homeDone')}
          </motion.span>
        )}
      </div>

      {/* Challenge text */}
      <div className="mb-5 flex items-start gap-3">
        <Target size={20} className="mt-0.5 shrink-0 text-gold-strong" aria-hidden="true" />
        <p className="text-body text-ink">{isEs ? challenge.textEs : challenge.text}</p>
      </div>

      {/* Reward + action */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-caption text-ink-2">
          {t('reward')}:{' '}
          <span className="font-bold text-gold-strong">+{challenge.xpReward} XP</span>
        </span>

        {!isDone ? (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleComplete}
            className="btn-primary text-button"
          >
            <Check size={18} strokeWidth={2.5} aria-hidden="true" />
            {t('dailyChallengeMarkComplete')}
          </motion.button>
        ) : (
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-caption text-ink-2"
          >
            {t('dailyChallengeResetsTomorrow')}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
