// ─────────────────────────────────────────────────────────────────────────────
// AuthPage — sign in.
//
// There is no sign-up. Accounts live in src/data/accounts.ts, committed to the
// repository, because a static site has no server to hold a user table — an
// account created in the browser would exist only on the phone that made it.
// The Admin Panel generates the line to commit. See src/data/accounts.ts.
//
// This screen previously: had no <form> and no submit button (only an Enter
// keypress in one field did anything), had no label associated with any input,
// shipped admin credentials in the UI behind a triple-tap, and could render
// completely invisible when arriving from onboarding because a layoutId
// collision left it stuck at its exit opacity.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuthContext } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const COPY = {
  en: {
    welcome: 'Welcome back',
    tagline: 'Everything you need on the street, in your pocket.',
    username: 'Username',
    usernamePlaceholder: 'your username',
    password: 'Password',
    passwordPlaceholder: 'your password',
    signIn: 'Sign in',
    signingIn: 'Signing in…',
    show: 'Show password',
    hide: 'Hide password',
    noAccount: 'No account yet?',
    askManager: 'Ask your manager to set one up for you.',
    missing: 'Enter your username and password.',
    language: 'Language',
  },
  es: {
    welcome: 'Bienvenido de nuevo',
    tagline: 'Todo lo que necesitas en la calle, en tu bolsillo.',
    username: 'Usuario',
    usernamePlaceholder: 'tu usuario',
    password: 'Contraseña',
    passwordPlaceholder: 'tu contraseña',
    signIn: 'Entrar',
    signingIn: 'Entrando…',
    show: 'Mostrar contraseña',
    hide: 'Ocultar contraseña',
    noAccount: '¿Aún no tienes cuenta?',
    askManager: 'Pídele a tu responsable que te cree una.',
    missing: 'Escribe tu usuario y tu contraseña.',
    language: 'Idioma',
  },
} as const;

export default function AuthPage() {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const { login, isAuthenticated } = useAuthContext();
  const { language, setLanguage } = useLanguage();
  const c = COPY[language === 'es' ? 'es' : 'en'];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  // Where RequireAuth wanted to send them before it redirected here.
  const from = (routerLocation.state as { from?: string } | null)?.from ?? '/home';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (busy) return;
      setError('');

      if (!username.trim() || !password) {
        setError(c.missing);
        usernameRef.current?.focus();
        return;
      }

      setBusy(true);
      const result = await login(username, password);
      setBusy(false);

      if (result.success) navigate(from, { replace: true });
      else setError(result.error || c.missing);
    },
    [busy, username, password, login, navigate, from, c.missing]
  );

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background">
      {/* Warm wash — replaces a 1.13 MB PNG that rendered at 10% opacity. */}
      <div aria-hidden="true" className="hero-dawn pointer-events-none absolute inset-x-0 top-0 h-[62vh]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[62vh] bg-gradient-to-b from-transparent to-background"
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-app flex-col px-6 pt-safe">
        {/* Language — the one control someone may need before they can read anything else. */}
        <div className="flex justify-end pt-4">
          <div
            role="group"
            aria-label={c.language}
            className="flex gap-1 rounded-full bg-surface/70 p-1 backdrop-blur-sm"
          >
            {(['en', 'es'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={`min-h-touch rounded-full px-4 text-caption font-semibold transition-colors ${
                  language === lang ? 'bg-teal text-on-teal' : 'text-ink-2'
                }`}
              >
                {lang === 'en' ? 'English' : 'Español'}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-1 flex-col justify-center py-10"
        >
          <p className="text-overline text-teal-strong">Zero Lines</p>
          <h1 className="mt-2 font-brand text-display leading-tight text-ink">{c.welcome}</h1>
          <p className="mt-3 max-w-[30ch] text-body text-ink-2">{c.tagline}</p>

          <form onSubmit={handleSubmit} noValidate className="surface-raised mt-8 flex flex-col gap-4 p-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-caption font-semibold text-ink-2">
                {c.username}
              </label>
              <input
                ref={usernameRef}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={c.usernamePlaceholder}
                aria-invalid={!!error}
                className="min-h-touch rounded-chip border border-line-strong bg-surface-sunken px-4 text-body text-ink placeholder:text-ink-3"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-caption font-semibold text-ink-2">
                {c.password}
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={c.passwordPlaceholder}
                  aria-invalid={!!error}
                  className="min-h-touch w-full rounded-chip border border-line-strong bg-surface-sunken px-4 pr-14 text-body text-ink placeholder:text-ink-3"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? c.hide : c.show}
                  aria-pressed={showPassword}
                  className="absolute right-1 top-1/2 flex h-touch w-touch -translate-y-1/2 items-center justify-center rounded-full text-ink-2"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
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
                  {c.signingIn}
                </>
              ) : (
                <>
                  {c.signIn}
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-body-small text-ink-3">
            {c.noAccount} <span className="text-ink-2">{c.askManager}</span>
          </p>
        </motion.div>

        <div className="pb-safe" />
      </div>
    </div>
  );
}
