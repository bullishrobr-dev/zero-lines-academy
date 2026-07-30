// ─────────────────────────────────────────────────────────────────────────────
// SetPasswordPage — choosing your own password.
//
// Two ways in, one screen:
//
//   Forced      Somebody else picked the password you are using — either your
//               account was just made, or an admin reset it. That password has
//               been read out loud, sent over WhatsApp, or written on a scrap
//               of paper, so it is not really yours yet. The app will not let
//               you past this until you replace it. See App.tsx.
//
//   Voluntary   From Profile, whenever you feel like it. Same screen, but with
//               a way back out.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import * as db from '../backend/db';
import { isDatabaseConfigured } from '../backend/supabaseClient';

const MIN_LENGTH = 8;

const COPY = {
  en: {
    forcedTitle: 'Choose your password',
    forcedIntro:
      'The password you signed in with was given to you by someone else. Pick one only you know — you will use it from now on.',
    ownTitle: 'Change your password',
    ownIntro: 'Pick a new password. You will use it the next time you sign in.',
    newPassword: 'New password',
    confirm: 'Type it again',
    placeholder: 'at least 8 characters',
    save: 'Save password',
    saving: 'Saving…',
    show: 'Show password',
    hide: 'Hide password',
    back: 'Back',
    tooShort: `Use at least ${MIN_LENGTH} characters.`,
    mismatch: 'The two passwords are not the same.',
    hint: 'Something you can type quickly on a phone, but nobody could guess.',
    done: 'Password changed.',
  },
  es: {
    forcedTitle: 'Elige tu contraseña',
    forcedIntro:
      'La contraseña con la que has entrado te la dio otra persona. Elige una que solo sepas tú — la usarás a partir de ahora.',
    ownTitle: 'Cambiar tu contraseña',
    ownIntro: 'Elige una contraseña nueva. La usarás la próxima vez que entres.',
    newPassword: 'Contraseña nueva',
    confirm: 'Escríbela otra vez',
    placeholder: 'mínimo 8 caracteres',
    save: 'Guardar contraseña',
    saving: 'Guardando…',
    show: 'Mostrar contraseña',
    hide: 'Ocultar contraseña',
    back: 'Volver',
    tooShort: `Usa al menos ${MIN_LENGTH} caracteres.`,
    mismatch: 'Las dos contraseñas no coinciden.',
    hint: 'Algo que puedas escribir rápido en el móvil, pero que nadie pueda adivinar.',
    done: 'Contraseña cambiada.',
  },
} as const;

export default function SetPasswordPage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuthContext();
  const { language } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];

  const forced = !!user?.mustChangePassword;

  const [password, setPassword] = useState('');
  const [again, setAgain] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (busy) return;
      setError('');

      if (password.length < MIN_LENGTH) return setError(c.tooShort);
      if (password !== again) return setError(c.mismatch);

      setBusy(true);
      const result = await db.changeOwnPassword(password);
      setBusy(false);

      if (!result.success) return setError(result.error);

      // Pull the cleared flag back down before leaving, or the guard in App.tsx
      // sends them straight back here.
      refreshUser();
      navigate(forced ? '/home' : '/profile', { replace: true });
    },
    [busy, password, again, c.tooShort, c.mismatch, refreshUser, navigate, forced]
  );

  // Without a database there is nowhere to save a password to.
  if (!isDatabaseConfigured) return <Navigate to="/profile" replace />;

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background">
      <div aria-hidden="true" className="hero-dawn pointer-events-none absolute inset-x-0 top-0 h-[52vh]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[52vh] bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-app flex-col px-6 pt-safe">
        {/* Leaving is only an option when they are not on a borrowed password. */}
        <div className="flex h-touch items-center pt-4">
          {!forced && (
            <button
              type="button"
              onClick={() => navigate('/profile')}
              className="btn-quiet -ml-2 text-body-small"
            >
              <ArrowLeft size={18} aria-hidden />
              {c.back}
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-1 flex-col justify-center py-8"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-tint">
            <ShieldCheck size={22} className="text-teal-strong" aria-hidden />
          </span>
          <h1 className="mt-4 font-brand text-h1 leading-tight text-ink">
            {forced ? c.forcedTitle : c.ownTitle}
          </h1>
          <p className="mt-3 max-w-[34ch] text-body text-ink-2">{forced ? c.forcedIntro : c.ownIntro}</p>

          <form onSubmit={handleSubmit} noValidate className="surface-raised mt-7 flex flex-col gap-4 p-5">
            {/* A hidden username field so a password manager knows whose
                password this is, and offers to update the right one. */}
            <input
              type="text"
              name="username"
              autoComplete="username"
              value={user?.username ?? ''}
              readOnly
              hidden
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="new-password" className="text-caption font-semibold text-ink-2">
                {c.newPassword}
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  name="new-password"
                  type={show ? 'text' : 'password'}
                  autoComplete="new-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={c.placeholder}
                  aria-invalid={!!error}
                  className="min-h-touch w-full rounded-chip border border-line-strong bg-surface-sunken px-4 pr-14 text-body text-ink placeholder:text-ink-3"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? c.hide : c.show}
                  aria-pressed={show}
                  className="absolute right-1 top-1/2 flex h-touch w-touch -translate-y-1/2 items-center justify-center rounded-full text-ink-2"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm-password" className="text-caption font-semibold text-ink-2">
                {c.confirm}
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={show ? 'text' : 'password'}
                autoComplete="new-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={again}
                onChange={(e) => setAgain(e.target.value)}
                placeholder={c.placeholder}
                aria-invalid={!!error}
                className="min-h-touch w-full rounded-chip border border-line-strong bg-surface-sunken px-4 text-body text-ink placeholder:text-ink-3"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-chip bg-danger-tint px-3 py-2.5 text-body-small text-danger"
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </p>
            )}

            <button type="submit" disabled={busy} className="btn-primary mt-1 w-full disabled:opacity-70">
              {busy ? (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                  {c.saving}
                </>
              ) : (
                <>
                  {c.save}
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-body-small text-ink-3">{c.hint}</p>
        </motion.div>

        <div className="pb-safe" />
      </div>
    </div>
  );
}
