// ─────────────────────────────────────────────────────────────
// AuthPage.tsx — Signup / Onboarding Screen
// First-time user registration with name, location, role, language
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface UserData {
  name: string;
  location: 'andorra' | 'gibraltar';
  role: 'salesperson' | 'manager';
  language: 'en' | 'es';
  joinedAt: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function AuthPage() {
  const navigate = useNavigate();

  // Check if user already exists — redirect to home
  useEffect(() => {
    try {
      const existing = localStorage.getItem('zl_user');
      if (existing) {
        const parsed = JSON.parse(existing) as UserData;
        if (parsed.name) {
          navigate('/home', { replace: true });
        }
      }
    } catch {
      // ignore
    }
  }, [navigate]);

  const [name, setName] = useState('');
  const [location, setLocation] = useState<'andorra' | 'gibraltar' | null>(null);
  const [role, setRole] = useState<'salesperson' | 'manager' | null>(null);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // All fields must be filled to enable the CTA
  const canSubmit = name.trim().length > 0 && location !== null && role !== null;

  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (!location) newErrors.location = true;
    if (!role) newErrors.role = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const userData: UserData = {
      name: name.trim(),
      location: location!,
      role: role!,
      language,
      joinedAt: new Date().toISOString(),
    };

    // Store user data
    localStorage.setItem('zl_user', JSON.stringify(userData));
    localStorage.setItem('zl_language', language);
    localStorage.setItem('zl_location', location!);

    navigate('/home', { replace: true });
  };

  // Skip / continue as guest — navigates to home with defaults
  const handleSkip = () => {
    navigate('/home', { replace: true });
  };

  const pillBtnBase =
    'px-5 py-3 rounded-full border text-sm font-semibold transition-all duration-200 select-none';
  const pillBtnInactive = 'border-[#2A2A2A] bg-[#111111] text-[#8A8A8A] hover:border-[#3A3A3A] hover:text-white';
  const pillBtnActive = 'border-[#0ABAB5] bg-[#0ABAB5]/10 text-[#0ABAB5]';

  return (
    <div className="min-h-[100dvh] w-full bg-[#0A0A0A] flex justify-center relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10">
          <img src="/hero-glow.png" alt="" className="w-full h-full object-contain" aria-hidden="true" />
        </div>
      </div>

      <div className="w-full max-w-[430px] relative z-10 flex flex-col min-h-[100dvh] px-6 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <img src="/logo-white.png" alt="Zero Lines" className="w-24 mx-auto" />
          </motion.div>

          {/* Welcome text */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <h1 className="text-h1 text-white mb-3">Welcome to Zero Lines Academy</h1>
            <p className="text-body-small text-[#8A8A8A] leading-relaxed">
              Your journey to becoming a master seller starts here
            </p>
          </motion.div>

          {/* Name input */}
          <motion.div variants={itemVariants} className="mb-6">
            <label className="text-sm font-semibold text-white mb-2 block">
              What&apos;s your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setErrors((p) => ({ ...p, name: false }));
              }}
              placeholder="Enter your name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}
              className={`w-full bg-[#111111] border rounded-2xl px-5 py-4 text-white placeholder:text-[#5A5A5A] outline-none transition-colors text-base ${
                errors.name ? 'border-red-500' : 'border-[#2A2A2A] focus:border-[#0ABAB5]'
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">Please enter your name</p>}
          </motion.div>

          {/* Location picker */}
          <motion.div variants={itemVariants} className="mb-6">
            <label className="text-sm font-semibold text-white mb-3 block">Select your location</label>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setLocation('andorra');
                  setErrors((p) => ({ ...p, location: false }));
                }}
                className={`flex-1 ${pillBtnBase} ${location === 'andorra' ? pillBtnActive : pillBtnInactive}`}
              >
                <span className="mr-2">🇦🇩</span>Andorra
              </button>
              <button
                onClick={() => {
                  setLocation('gibraltar');
                  setErrors((p) => ({ ...p, location: false }));
                }}
                className={`flex-1 ${pillBtnBase} ${location === 'gibraltar' ? pillBtnActive : pillBtnInactive}`}
              >
                <span className="mr-2">🇬🇮</span>Gibraltar
              </button>
            </div>
            {errors.location && <p className="text-red-500 text-xs mt-1.5 ml-1">Please select a location</p>}
          </motion.div>

          {/* Role */}
          <motion.div variants={itemVariants} className="mb-6">
            <label className="text-sm font-semibold text-white mb-3 block">What&apos;s your role?</label>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setRole('salesperson');
                  setErrors((p) => ({ ...p, role: false }));
                }}
                className={`flex-1 ${pillBtnBase} ${role === 'salesperson' ? pillBtnActive : pillBtnInactive}`}
              >
                Salesperson
              </button>
              <button
                onClick={() => {
                  setRole('manager');
                  setErrors((p) => ({ ...p, role: false }));
                }}
                className={`flex-1 ${pillBtnBase} ${role === 'manager' ? pillBtnActive : pillBtnInactive}`}
              >
                Manager
              </button>
            </div>
            {errors.role && <p className="text-red-500 text-xs mt-1.5 ml-1">Please select a role</p>}
          </motion.div>

          {/* Language */}
          <motion.div variants={itemVariants} className="mb-8">
            <label className="text-sm font-semibold text-white mb-3 block">Choose language</label>
            <div className="flex gap-3">
              <button
                onClick={() => setLanguage('en')}
                className={`flex-1 ${pillBtnBase} ${language === 'en' ? pillBtnActive : pillBtnInactive}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`flex-1 ${pillBtnBase} ${language === 'es' ? pillBtnActive : pillBtnInactive}`}
              >
                Español
              </button>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* CTA */}
          <motion.div variants={itemVariants} className="pb-4">
            <motion.button
              whileTap={canSubmit ? { scale: 0.97 } : undefined}
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`w-full py-4 rounded-full text-button font-semibold transition-all duration-200 ${
                canSubmit
                  ? 'bg-[#0ABAB5] text-white hover:bg-[#09a9a4] cursor-pointer'
                  : 'bg-[#1A3A3A] text-[#5A7A7A] cursor-not-allowed'
              }`}
            >
              Get Started
            </motion.button>

            {/* Skip / guest option */}
            <button
              onClick={handleSkip}
              className="w-full mt-4 text-center text-sm text-[#8A8A8A] hover:text-[#0ABAB5] transition-colors"
            >
              Already have an account? Continue as guest
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
