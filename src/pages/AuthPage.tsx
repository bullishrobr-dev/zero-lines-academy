// ─────────────────────────────────────────────────────────────
// AuthPage.tsx — Login / Signup Screen
// Supports both modes with toggle. Uses backend auth context.
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, LogIn, UserPlus, HelpCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

type AuthMode = 'login' | 'signup';
type UserLocation = 'andorra' | 'gibraltar';
type UserRole = 'employee' | 'manager' | 'admin';

export default function AuthPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { login, signup } = useAuthContext();

  const [mode, setMode] = useState<AuthMode>('login');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Signup fields
  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suLocation, setSuLocation] = useState<UserLocation>('andorra');
  const [suRole, setSuRole] = useState<UserRole>('employee');
  const [suError, setSuError] = useState('');
  const [suLoading, setSuLoading] = useState(false);

  // Triple-tap dev gesture to reveal default accounts
  const [devTapCount, setDevTapCount] = useState(0);
  const [showDevAccounts, setShowDevAccounts] = useState(false);
  const logoTapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTap = useCallback(() => {
    const nextCount = devTapCount + 1;
    setDevTapCount(nextCount);

    if (logoTapTimerRef.current) {
      clearTimeout(logoTapTimerRef.current);
    }

    // Reset counter after 1.5s of inactivity
    logoTapTimerRef.current = setTimeout(() => setDevTapCount(0), 1500);

    // Triple-tap triggers reveal
    if (nextCount >= 3) {
      setShowDevAccounts(true);
      setDevTapCount(0);
      if (logoTapTimerRef.current) clearTimeout(logoTapTimerRef.current);
    }
  }, [devTapCount]);

  const t = (en: string, es: string) => (language === 'es' ? es : en);

  const handleLogin = async () => {
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError(t('Please fill in all fields', 'Por favor complete todos los campos'));
      return;
    }
    setLoginLoading(true);
    const result = await login(loginEmail.trim(), loginPassword);
    setLoginLoading(false);
    if (result.success) {
      navigate('/home', { replace: true });
    } else {
      setLoginError(result.error || t('Invalid credentials', 'Credenciales inválidas'));
    }
  };

  const handleSignup = async () => {
    setSuError('');
    if (!suName.trim() || !suEmail.trim() || !suPassword.trim()) {
      setSuError(t('Please fill in all fields', 'Por favor complete todos los campos'));
      return;
    }
    setSuLoading(true);
    const result = await signup({
      email: suEmail.trim(),
      name: suName.trim(),
      password: suPassword,
      role: suRole,
      location: suLocation,
    });
    setSuLoading(false);
    if (result.success) {
      navigate('/home', { replace: true });
    } else {
      setSuError(result.error || t('Something went wrong', 'Algo salió mal'));
    }
  };

  const pillBase = 'px-4 py-2 rounded-full border text-xs font-semibold transition-all';
  const pillInactive = 'border-[#2A2A2A] bg-[#111] text-[#8A8A8A]';
  const pillActive = 'border-[#0ABAB5] bg-[#0ABAB5]/10 text-[#0ABAB5]';

  return (
    <div className="min-h-[100dvh] w-full bg-[#0A0A0A] flex justify-center relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10">
          <img src="/hero-glow.png" alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
      </div>

      <div className="w-full max-w-[430px] relative z-10 flex flex-col min-h-[100dvh] px-6 py-8">
        {/* Back button */}
        <button onClick={() => navigate('/')} className="flex items-center gap-1 text-[#8A8A8A] hover:text-white transition-colors mb-6 w-fit">
          <ArrowLeft size={18} /> {t('Back', 'Atrás')}
        </button>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 flex flex-col">
          {/* Logo — triple-tap to reveal dev accounts */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <button onClick={handleLogoTap} className="relative">
              <img src="/logo-white.png" alt="Zero Lines" className="w-20 mx-auto" />
              {!showDevAccounts && (
                <HelpCircle
                  size={14}
                  className="absolute -bottom-1 -right-3 text-[#3A3A3A]"
                />
              )}
            </button>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div variants={itemVariants} className="flex gap-2 mb-8 bg-[#111] rounded-full p-1 border border-[#1A1A1A]">
            <button
              onClick={() => { setMode('login'); setLoginError(''); setSuError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${
                mode === 'login' ? 'bg-[#0ABAB5] text-black' : 'text-[#8A8A8A]'
              }`}
            >
              <LogIn size={16} /> {t('Sign In', 'Iniciar Sesión')}
            </button>
            <button
              onClick={() => { setMode('signup'); setLoginError(''); setSuError(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all ${
                mode === 'signup' ? 'bg-[#0ABAB5] text-black' : 'text-[#8A8A8A]'
              }`}
            >
              <UserPlus size={16} /> {t('New Account', 'Nueva Cuenta')}
            </button>
          </motion.div>

          {/* ── LOGIN MODE ── */}
          {mode === 'login' && (
            <>
              <motion.div variants={itemVariants}>
                <h1 className="text-2xl font-bold text-white mb-2">{t('Welcome Back', 'Bienvenido de Nuevo')}</h1>
                <p className="text-sm text-[#8A8A8A] mb-6">{t('Sign in to your account', 'Inicia sesión en tu cuenta')}</p>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@zerolines.com"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="bg-[#111] border-[#2A2A2A] text-white h-12 rounded-xl"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-1.5 block">{t('Password', 'Contraseña')}</label>
                <Input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••"
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="bg-[#111] border-[#2A2A2A] text-white h-12 rounded-xl"
                />
              </motion.div>

              {loginError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mb-4">{loginError}</motion.p>
              )}

              {/* Default accounts — hidden behind triple-tap dev gesture */}
              {showDevAccounts ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 card-elevation-1 p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] text-[#8A8A8A] uppercase tracking-wider">{t('Dev Accounts', 'Cuentas de Desarrollo')}</p>
                    <button
                      onClick={() => setShowDevAccounts(false)}
                      className="text-[10px] text-[#5A5A5A] hover:text-[#8A8A8A] transition-colors"
                    >
                      {t('Hide', 'Ocultar')}
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => { setLoginEmail('admin@zerolines.com'); setLoginPassword('admin123'); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#0ABAB5]/30 transition-colors"
                    >
                      <p className="text-xs text-[#8A8A8A] font-medium">Admin</p>
                      <p className="text-[10px] text-[#5A5A5A]">admin@zerolines.com / admin123</p>
                    </button>
                    <button
                      onClick={() => { setLoginEmail('manager.andorra@zerolines.com'); setLoginPassword('manager1'); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
                    >
                      <p className="text-xs text-[#8A8A8A] font-medium">Manager Andorra</p>
                      <p className="text-[10px] text-[#5A5A5A]">manager.andorra@zerolines.com / manager1</p>
                    </button>
                    <button
                      onClick={() => { setLoginEmail('manager.gibraltar@zerolines.com'); setLoginPassword('manager2'); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-colors"
                    >
                      <p className="text-xs text-[#8A8A8A] font-medium">Manager Gibraltar</p>
                      <p className="text-[10px] text-[#5A5A5A]">manager.gibraltar@zerolines.com / manager2</p>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={itemVariants}
                  className="mb-6 flex items-center justify-center gap-1.5 py-2"
                >
                  <p className="text-[11px] text-[#3A3A3A]">{t('Demo accounts available', 'Cuentas de demo disponibles')}</p>
                  <HelpCircle size={12} className="text-[#3A3A3A]" />
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="mt-auto pb-4">
                <Button
                  onClick={handleLogin}
                  disabled={loginLoading}
                  className="w-full bg-[#0ABAB5] text-black font-semibold h-14 rounded-2xl text-base hover:bg-[#09a9a4]"
                >
                  {loginLoading ? t('Signing in...', 'Iniciando...') : t('Sign In', 'Iniciar Sesión')}
                </Button>
              </motion.div>
            </>
          )}

          {/* ── SIGNUP MODE ── */}
          {mode === 'signup' && (
            <>
              <motion.div variants={itemVariants}>
                <h1 className="text-2xl font-bold text-white mb-2">{t('Create Account', 'Crear Cuenta')}</h1>
                <p className="text-sm text-[#8A8A8A] mb-6">{t('Join your team on Zero Lines', 'Únete a tu equipo en Zero Lines')}</p>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-1.5 block">{t('Full Name', 'Nombre Completo')}</label>
                <Input value={suName} onChange={(e) => setSuName(e.target.value)} placeholder="Maria Garcia" className="bg-[#111] border-[#2A2A2A] text-white h-12 rounded-xl" />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-1.5 block">Email</label>
                <Input type="email" value={suEmail} onChange={(e) => setSuEmail(e.target.value)} placeholder="maria@zerolines.com" className="bg-[#111] border-[#2A2A2A] text-white h-12 rounded-xl" />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-1.5 block">{t('Password', 'Contraseña')}</label>
                <Input type="password" value={suPassword} onChange={(e) => setSuPassword(e.target.value)} placeholder="••••••" className="bg-[#111] border-[#2A2A2A] text-white h-12 rounded-xl" />
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <label className="text-xs text-[#8A8A8A] mb-2 block">{t('Location', 'Ubicación')}</label>
                <div className="flex gap-2">
                  <button onClick={() => setSuLocation('andorra')} className={`flex-1 ${pillBase} ${suLocation === 'andorra' ? pillActive : pillInactive}`}>Andorra</button>
                  <button onClick={() => setSuLocation('gibraltar')} className={`flex-1 ${pillBase} ${suLocation === 'gibraltar' ? pillActive : pillInactive}`}>Gibraltar</button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="text-xs text-[#8A8A8A] mb-2 block">Role</label>
                <div className="flex gap-2">
                  <button onClick={() => setSuRole('employee')} className={`flex-1 ${pillBase} ${suRole === 'employee' ? pillActive : pillInactive}`}>{t('Employee', 'Empleado')}</button>
                  <button onClick={() => setSuRole('manager')} className={`flex-1 ${pillBase} ${suRole === 'manager' ? pillActive : pillInactive}`}>{t('Manager', 'Manager')}</button>
                  <button onClick={() => setSuRole('admin')} className={`flex-1 ${pillBase} ${suRole === 'admin' ? pillActive : pillInactive}`}>{t('Admin', 'Admin')}</button>
                </div>
              </motion.div>

              {suError && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mb-4">{suError}</motion.p>
              )}

              <motion.div variants={itemVariants} className="mt-auto pb-4">
                <Button
                  onClick={handleSignup}
                  disabled={suLoading}
                  className="w-full bg-[#0ABAB5] text-black font-semibold h-14 rounded-2xl text-base hover:bg-[#09a9a4]"
                >
                  {suLoading ? t('Creating...', 'Creando...') : t('Create Account', 'Crear Cuenta')}
                </Button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
