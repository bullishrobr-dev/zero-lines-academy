// ─────────────────────────────────────────────────────────────────────────────
// PeerShoutout — recognise a teammate.
//
// The sender is whoever is signed in (LeaderboardPage reads it from
// useAuthContext), and the list handed to this sheet has already had that
// person removed — so shouting yourself out is impossible by construction. The
// hook rejects `from === to` as well, in case another caller forgets.
//
// It also no longer claims delivery. With no server the message is queued on
// this device, and the success state says so.
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, Check, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export interface ShoutoutTeammate {
  id: string;
  name: string;
  initials: string;
  flag: string;
}

export interface PeerShoutoutProps {
  /** Everyone the signed-in seller may recognise — never includes themselves. */
  teammates: ShoutoutTeammate[];
  onSubmit: (to: string, message: string, reaction: string) => void;
  onClose: () => void;
}

const COPY = {
  en: {
    title: 'Shout out a teammate',
    subtitle: 'Recognise great work on the door',
    select: 'Who was great today?',
    message: 'What did they do well?',
    placeholder: 'She turned a hard no into a demo…',
    reaction: 'Quick reaction',
    send: 'Send shout-out',
    later: 'Maybe later',
    close: 'Close',
    sentTitle: 'Shout-out queued',
    sentBody: 'It reaches them once the shops are connected to a server.',
    empty: 'There is nobody else on the roster yet.',
    reactions: ['Great stop', 'Amazing energy', 'Nailed the close', 'Team player'],
  },
  es: {
    title: 'Reconoce a un compañero',
    subtitle: 'Valora el buen trabajo en la puerta',
    select: '¿Quién ha estado genial hoy?',
    message: '¿Qué ha hecho bien?',
    placeholder: 'Convirtió un no rotundo en una demo…',
    reaction: 'Reacción rápida',
    send: 'Enviar reconocimiento',
    later: 'Ahora no',
    close: 'Cerrar',
    sentTitle: 'Reconocimiento en cola',
    sentBody: 'Le llegará cuando las tiendas estén conectadas a un servidor.',
    empty: 'Aún no hay nadie más en la plantilla.',
    reactions: ['Gran parada', 'Energía increíble', 'Cierre perfecto', 'Buen compañero'],
  },
} as const;

const REACTION_EMOJI = ['🔥', '💪', '🎯', '⭐'];

export default function PeerShoutout({ teammates, onSubmit, onClose }: PeerShoutoutProps) {
  const { language } = useLanguage();
  const t = COPY[language === 'es' ? 'es' : 'en'];

  const [selectedTeammate, setSelectedTeammate] = useState('');
  const [message, setMessage] = useState('');
  const [selectedReaction, setSelectedReaction] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = selectedTeammate !== '' && message.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(selectedTeammate, message.trim(), selectedReaction);
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      <motion.div
        initial={{ y: 400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 400, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        className="max-h-[88vh] w-full max-w-app overflow-y-auto rounded-t-feature border border-line bg-surface p-5 pb-safe shadow-feature sm:rounded-feature"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-line-strong/50" />
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center py-10 text-center"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal text-on-teal">
                <Check className="h-9 w-9" aria-hidden="true" />
              </div>
              <h3 className="mb-1 text-h3 text-ink">{t.sentTitle}</h3>
              <p className="max-w-[280px] text-body-small text-ink-2">{t.sentBody}</p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Header */}
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral text-on-coral">
                  <Megaphone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-h4 text-ink">{t.title}</h3>
                  <p className="text-caption text-ink-2">{t.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-icon shrink-0"
                  aria-label={t.close}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {teammates.length === 0 ? (
                <p className="rounded-card bg-surface-sunken p-4 text-center text-body-small text-ink-2">
                  {t.empty}
                </p>
              ) : (
                <>
                  {/* Teammate */}
                  <p className="mb-2 text-overline text-ink-3">{t.select}</p>
                  <div className="mb-5 grid grid-cols-2 gap-2">
                    {teammates.map((mate) => {
                      const active = selectedTeammate === mate.id;
                      return (
                        <button
                          key={mate.id}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedTeammate(mate.id)}
                          className={`flex min-h-touch items-center gap-2 rounded-card border p-2.5 text-left transition-colors ${
                            active
                              ? 'border-teal bg-teal-tint'
                              : 'border-line bg-surface-sunken'
                          }`}
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                              active ? 'bg-teal text-on-teal' : 'border border-line bg-surface text-ink-2'
                            }`}
                          >
                            {mate.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-caption font-semibold text-ink">{mate.name}</p>
                            <p className="text-caption text-ink-3" aria-hidden="true">
                              {mate.flag}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Message */}
                  <label htmlFor="shoutout-message" className="mb-2 block text-overline text-ink-3">
                    {t.message}
                  </label>
                  <textarea
                    id="shoutout-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.placeholder}
                    rows={3}
                    className="mb-5 w-full resize-none rounded-card border border-line-strong bg-surface-sunken p-3 text-body-small text-ink placeholder:text-ink-3 focus:border-teal-strong"
                  />

                  {/* Reactions */}
                  <p className="mb-2 text-overline text-ink-3">{t.reaction}</p>
                  <div className="mb-6 flex gap-2">
                    {t.reactions.map((label, i) => {
                      const active = selectedReaction === label;
                      return (
                        <button
                          key={label}
                          type="button"
                          aria-pressed={active}
                          onClick={() => setSelectedReaction(label)}
                          className={`flex min-h-touch flex-1 flex-col items-center justify-center gap-0.5 rounded-card border px-1 py-2 transition-colors ${
                            active ? 'border-teal bg-teal-tint' : 'border-line bg-surface-sunken'
                          }`}
                        >
                          <span className="text-lg leading-none" aria-hidden="true">
                            {REACTION_EMOJI[i]}
                          </span>
                          <span
                            className={`text-center text-caption leading-tight ${
                              active ? 'text-teal-strong' : 'text-ink-2'
                            }`}
                          >
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit */}
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`w-full ${
                      canSubmit ? 'btn-primary' : 'btn-quiet cursor-not-allowed opacity-60'
                    }`}
                  >
                    {t.send}
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={onClose}
                className="mt-2 min-h-touch w-full text-caption text-ink-3"
              >
                {t.later}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
