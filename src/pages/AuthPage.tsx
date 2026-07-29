// ─────────────────────────────────────────────────────────────────────────────
// AuthPage — sign in / create account.
//
// SECURITY: the public signup form used to offer Employee / Manager / Admin
// role pills with no verification whatsoever, so anyone who could reach this
// screen could mint themselves an admin account and read the whole roster.
// Self-registration now creates an `employee`, full stop. Managers and admins
// are provisioned from the Admin Panel.
//
// Also fixed here:
//   • There was no <form> and no submit button — only an Enter keypress in one
//     of the two login inputs actually submitted anything, and signup had no
//     keyboard path at all. Both modes are real forms now.
//   • 0 of 5 inputs were label-associated. Every field has id/htmlFor,
//     autoComplete, and the password fields have a visibility toggle.
//   • The dev-account panel published admin and manager credentials in the UI
//     behind a triple-tap. It is now behind `import.meta.env.DEV` so it cannot
//     ship to production at all.
//   • "Demo accounts available" was #3A3A3A on #0A0A0A — 1.74:1, invisible.
//   • hero-glow.png was a 1.13 MB image rendered at opacity-10. It is a CSS
//     gradient now (and the file has since been deleted).
//   • A local `const t = (en, es) => …` shadowed the real t() from useLanguage.
//     The local helper is `tx` and the real keys are used wherever they exist.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef, useCallback, type ReactNode } from 'react';
import { useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

type AuthMode = 'login' | 'signup';
type UserLocation = 'andorra' | 'gibraltar';

/* ── Field primitives ────────────────────────────────────────────────────── */

const FIELD =
  'h-[52px] w-full rounded-card border border-line-strong bg-surface px-4 text-body text-ink placeholder:text-ink-3';

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1.5 block text-caption font-semibold text-ink-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete,
  showLabel,
  hideLabel,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete: 'current-password' | 'new-password';
  showLabel: string;
  hideLabel: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <Field id={id} label={label}>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="••••••"
          className={`${FIELD} pr-14`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          className="absolute right-1 top-1/2 grid h-touch w-touch -translate-y-1/2 place-items-center rounded-full text-ink-2"
        >
          {visible ? <EyeOff size={19} aria-hidden="true" /> : <Eye size={19} aria-hidden="true" />}
        </button>
      </div>
    </Field>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function AuthPage() {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const { language, setLanguage, t } = useLanguage();
  const { login, signup } = useAuthContext();

  const navState = routerLocation.state as { mode?: AuthMode; from?: string } | null;
  const [mode, setMode] = useState<AuthMode>(navState?.mode === 'signup' ? 'signup' : 'login');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup fields. There is deliberately no role field: see the header note.
  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suLocation, setSuLocation] = useState<UserLocation>('andorra');
  const [suError, setSuError] = useState('');
  const [suLoading, setSuLoading] = useState(false);

  // Dev-only shortcut to the seeded accounts.
  const [devTapCount, setDevTapCount] = useState(0);
  const [showDevAccounts, setShowDevAccounts] = useState(false);
  const logoTapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTap = useCallback(() => {
    const nextCount = devTapCount + 1;
    setDevTapCount(nextCount);
    if (logoTapTimerRef.current) clearTimeout(logoTapTimerRef.current);
    logoTapTimerRef.current = setTimeout(() => setDevTapCount(0), 1500);
    if (nextCount >= 3) {
      setShowDevAccounts(true);
      setDevTapCount(0);
      if (logoTapTimerRef.current) clearTimeout(logoTapTimerRef.current);
    }
  }, [devTapCount]);

  /** Inline copy that has no key in translations.ts. Named `tx` so it cannot
   *  shadow the real t() from useLanguage the way the old helper did. */
  const tx = (en: string, es: string) => (language === 'es' ? es : en);

  const landing = navState?.from || '/home';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError(tx('Please fill in all fields', 'Rellena todos los campos'));
      return;
    }
    setLoginLoading(true);
    const result = await login(loginEmail.trim(), loginPassword);
    setLoginLoading(false);
    if (result.success) navigate(landing, { replace: true });
    else setLoginError(result.error || tx('Invalid credentials', 'Credenciales incorrectas'));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuError('');
    if (!suName.trim() || !suEmail.trim() || !suPassword.trim()) {
      setSuError(tx('Please fill in all fields', 'Rellena todos los campos'));
      return;
    }
    setSuLoading(true);
    const result = await signup({
      email: suEmail.trim(),
      name: suName.trim(),
      password: suPassword,
      // Never anything else. Elevated roles come from the Admin Panel.
      role: 'employee',
      location: suLocation,
    });
    setSuLoading(false);
    if (result.success) navigate('/home', { replace: true });
    else setSuError(result.error || tx('Something went wrong', 'Algo ha ido mal'));
  };

  const showPw = tx('Show password', 'Mostrar contraseña');
  const hidePw = tx('Hide password', 'Ocultar contraseña');

  const tabClass = (active: boolean) =>
    `relative flex-1 inline-flex min-h-touch items-center justify-center gap-2 rounded-full text-button transition-colors ${
      active ? 'text-ink' : 'text-ink-2'
    }`;

  const locationPill = (value: UserLocation, label: string) => (
    <button
      key={value}
      type="button"
      onClick={() => setSuLocation(value)}
      aria-pressed={suLocation === value}
      className={`flex-1 min-h-touch rounded-full border px-4 text-button transition-colors ${
        suLocation === value
          ? 'border-teal bg-teal-tint text-teal-strong'
          : 'border-line bg-surface text-ink-2'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden bg-background">
      {/* Warm brand wash. Was a 1.13 MB PNG at opacity-10. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            'radial-gradient(90% 55% at 12% 0%, rgb(var(--coral) / 0.22) 0%, transparent 60%),' +
            'radial-gradient(85% 55% at 96% 10%, rgb(var(--gold) / 0.22) 0%, transparent 58%),' +
            'radial-gradient(90% 60% at 50% 42%, rgb(var(--teal) / 0.14) 0%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-app flex-col px-6 pb-8">
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="-ml-2 inline-flex min-h-touch items-center gap-1 pr-3 text-body-small font-medium text-ink-2"
          >
            <ArrowLeft size={18} aria-hidden="true" /> {t('lessonBack')}
          </button>

          {/* The language toggle otherwise lives behind sign-in, which is no use
              to a Spanish-speaking seller looking at an English front door. */}
          <div
            className="flex items-center rounded-full border border-line bg-surface p-0.5"
            role="group"
            aria-label={t('authLanguage')}
          >
            {(['en', 'es'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={`min-h-[36px] rounded-full px-3 text-caption font-semibold transition-colors ${
                  language === lang ? 'bg-teal text-on-teal' : 'text-ink-2'
                }`}
              >
                {lang === 'en' ? t('authEnglish') : t('authSpanish')}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col"
        >
          {/* ── Brand ── */}
          <motion.div variants={itemVariants} className="mt-5 flex justify-center">
            {import.meta.env.DEV ? (
              <button type="button" onClick={handleLogoTap} aria-label="Zero Lines">
                <img
                  src="/logo-white.webp"
                  alt="Zero Lines"
                  width={448}
                  height={550}
                  className="h-auto w-[108px] rounded-card shadow-feature"
                />
              </button>
            ) : (
              <img
                src="/logo-white.webp"
                alt="Zero Lines"
                width={448}
                height={550}
                className="h-auto w-[108px] rounded-card shadow-feature"
              />
            )}
          </motion.div>

          {/* ── Mode toggle ── */}
          <motion.div
            variants={itemVariants}
            className="mt-7 flex gap-1 rounded-full border border-line bg-surface-sunken p-1"
          >
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setLoginError('');
                  setSuError('');
                }}
                aria-pressed={mode === m}
                className={tabClass(mode === m)}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-tab"
                    className="absolute inset-0 rounded-full bg-surface shadow-raised"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  {m === 'login' ? (
                    <LogIn size={17} aria-hidden="true" />
                  ) : (
                    <UserPlus size={17} aria-hidden="true" />
                  )}
                  {m === 'login'
                    ? tx('Sign in', 'Iniciar sesión')
                    : tx('New account', 'Nueva cuenta')}
                </span>
              </button>
            ))}
          </motion.div>

          {/* ── LOGIN ── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-1 flex-col">
              <motion.div variants={itemVariants} className="mb-7 mt-8">
                <h1 className="font-brand text-display text-ink">
                  {tx('Welcome back', 'Hola de nuevo')}
                </h1>
                <p className="mt-2 text-body text-ink-2">
                  {tx('Sign in to pick up where you left off.', 'Inicia sesión y sigue donde lo dejaste.')}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Field id="login-email" label={tx('Email', 'Correo electrónico')}>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    autoComplete="username"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="maria@zerolines.com"
                    className={FIELD}
                  />
                </Field>

                <PasswordField
                  id="login-password"
                  label={tx('Password', 'Contraseña')}
                  value={loginPassword}
                  onChange={setLoginPassword}
                  autoComplete="current-password"
                  showLabel={showPw}
                  hideLabel={hidePw}
                />
              </motion.div>

              {loginError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="alert"
                  className="rounded-chip bg-danger-tint px-3 py-2 text-body-small font-medium text-danger"
                >
                  {loginError}
                </motion.p>
              )}

              {/* Seeded credentials must never reach a production bundle. */}
              {import.meta.env.DEV && (
                <div className="mt-5">
                  {showDevAccounts ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="surface-flat p-3"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-overline text-ink-3">
                          {tx('Dev accounts', 'Cuentas de desarrollo')}
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowDevAccounts(false)}
                          className="min-h-touch px-2 text-caption text-ink-2"
                        >
                          {tx('Hide', 'Ocultar')}
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {[
                          ['Seller', 'maria@zerolines.com', 'emp1'],
                          ['Manager', 'manager.andorra@zerolines.com', 'manager1'],
                          ['Admin', 'admin@zerolines.com', 'admin123'],
                        ].map(([role, email, pw]) => (
                          <button
                            key={email}
                            type="button"
                            onClick={() => {
                              setLoginEmail(email);
                              setLoginPassword(pw);
                            }}
                            className="w-full rounded-chip border border-line bg-surface-sunken px-3 py-2 text-left"
                          >
                            <p className="text-caption font-semibold text-ink">{role}</p>
                            <p className="text-caption text-ink-3">
                              {email} / {pw}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <p className="text-center text-caption text-ink-3">
                      {tx(
                        'Development build — triple-tap the logo for test accounts.',
                        'Compilación de desarrollo — toca el logo tres veces para las cuentas de prueba.',
                      )}
                    </p>
                  )}
                </div>
              )}

              <motion.div variants={itemVariants} className="mt-auto pt-8">
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="btn-primary h-14 w-full text-button disabled:opacity-60"
                >
                  {loginLoading
                    ? tx('Signing in…', 'Iniciando sesión…')
                    : tx('Sign in', 'Iniciar sesión')}
                </button>
              </motion.div>
            </form>
          )}

          {/* ── SIGNUP ── */}
          {mode === 'signup' && (
            <form onSubmit={handleSignup} className="flex flex-1 flex-col">
              <motion.div variants={itemVariants} className="mb-7 mt-8">
                <h1 className="font-brand text-display text-ink">
                  {tx('Create your account', 'Crea tu cuenta')}
                </h1>
                <p className="mt-2 text-body text-ink-2">
                  {tx('Join your team on Zero Lines.', 'Únete a tu equipo en Zero Lines.')}
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Field id="signup-name" label={tx('Full name', 'Nombre completo')}>
                  <input
                    id="signup-name"
                    name="name"
                    type="text"
                    value={suName}
                    onChange={(e) => setSuName(e.target.value)}
                    autoComplete="name"
                    placeholder={t('authNamePlaceholder')}
                    className={FIELD}
                  />
                </Field>

                <Field id="signup-email" label={tx('Email', 'Correo electrónico')}>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    value={suEmail}
                    onChange={(e) => setSuEmail(e.target.value)}
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="maria@zerolines.com"
                    className={FIELD}
                  />
                </Field>

                <PasswordField
                  id="signup-password"
                  label={tx('Password', 'Contraseña')}
                  value={suPassword}
                  onChange={setSuPassword}
                  autoComplete="new-password"
                  showLabel={showPw}
                  hideLabel={hidePw}
                />

                <fieldset className="mb-4">
                  <legend className="mb-1.5 block text-caption font-semibold text-ink-2">
                    {t('authSelectLocation')}
                  </legend>
                  <div className="flex gap-2">
                    {locationPill('andorra', t('authAndorra'))}
                    {locationPill('gibraltar', t('authGibraltar'))}
                  </div>
                </fieldset>

                {/* Replaces the Employee / Manager / Admin pills. */}
                <p className="text-caption text-ink-3">
                  {tx(
                    'New accounts are created as sellers. Managers and admins are set up by an administrator.',
                    'Las cuentas nuevas se crean como vendedor. Los responsables y administradores los da de alta un administrador.',
                  )}
                </p>
              </motion.div>

              {suError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="alert"
                  className="mt-4 rounded-chip bg-danger-tint px-3 py-2 text-body-small font-medium text-danger"
                >
                  {suError}
                </motion.p>
              )}

              <motion.div variants={itemVariants} className="mt-auto pt-8">
                <button
                  type="submit"
                  disabled={suLoading}
                  className="btn-primary h-14 w-full text-button disabled:opacity-60"
                >
                  {suLoading ? tx('Creating…', 'Creando…') : tx('Create account', 'Crear cuenta')}
                </button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
