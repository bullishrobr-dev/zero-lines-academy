// ─────────────────────────────────────────────────────────────
// ProfilePage.tsx — Enhanced profile dashboard with XP, levels,
// achievements, stats, activity timeline, settings, language & location
// ─────────────────────────────────────────────────────────────

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Target,
  BookOpen,
  Brain,
  Zap,
  Award,
  Star,
  TrendingUp,
  RotateCcw,
  Edit2,
  Check,
  X,
  AlertTriangle,
  Lock,
  Unlock,
  Calendar,
  ChevronRight,
  Settings,
  Bell,
  Globe,
  LogOut,
  LogIn,
  MapPin,
  Briefcase,
  Shield,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';
import DailyChallengeCard from '@/components/DailyChallengeCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { categories } from '@/data/lessons';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from '@/contexts/LocationContext';

// ── Level Configuration ──
interface LevelConfig {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
  color: string;
  icon: LucideIcon;
}

const LEVELS: LevelConfig[] = [
  { level: 1, name: 'Trainee', minXP: 0, maxXP: 199, color: '#8A8A8A', icon: Target },
  { level: 2, name: 'Rookie', minXP: 200, maxXP: 499, color: '#0ABAB5', icon: Zap },
  { level: 3, name: 'Seller', minXP: 500, maxXP: 999, color: '#8B5CF6', icon: Star },
  { level: 4, name: 'Pro', minXP: 1000, maxXP: 1999, color: '#F59E0B', icon: Trophy },
  { level: 5, name: 'Master', minXP: 2000, maxXP: 999999, color: '#EF4444', icon: Award },
];

function getLevelForXP(xp: number): LevelConfig {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

function getNextLevel(xp: number): LevelConfig | null {
  const current = getLevelForXP(xp);
  const idx = LEVELS.findIndex((l) => l.level === current.level);
  return LEVELS[idx + 1] ?? null;
}

// ── Achievement Configuration ──
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  condition: (progress: ReturnType<typeof useProgress>) => boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete 1 lesson',
    icon: BookOpen,
    condition: (p) => p.getLessonsCompletedCount() >= 1,
  },
  {
    id: 'getting-warm',
    name: 'Getting Warm',
    description: 'Complete 5 lessons',
    icon: Flame,
    condition: (p) => p.getLessonsCompletedCount() >= 5,
  },
  {
    id: 'on-fire',
    name: 'On Fire',
    description: 'Complete 10 lessons',
    icon: Zap,
    condition: (p) => p.getLessonsCompletedCount() >= 10,
  },
  {
    id: 'syringe-pro',
    name: 'Syringe Pro',
    description: 'Complete all Syringe-related lessons',
    icon: Target,
    condition: (p) => {
      const syringeLessons = ['syringe-intro', 'syringe-demo', 'syringe-close'];
      return syringeLessons.every((id) => p.getLessonCompletion(id));
    },
  },
  {
    id: 'quiz-whiz',
    name: 'Quiz Whiz',
    description: 'Score 100% on any quiz',
    icon: Brain,
    condition: (p) => Object.values(p.quizScores).some((s) => s === 100),
  },
  {
    id: 'streak-keeper',
    name: 'Streak Keeper',
    description: 'Maintain a 3-day streak',
    icon: Flame,
    condition: (p) => p.getCurrentStreak() >= 3,
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintain a 7-day streak',
    icon: TrendingUp,
    condition: (p) => p.getCurrentStreak() >= 7,
  },
  {
    id: 'closer',
    name: 'Closer',
    description: 'Complete all closing technique lessons',
    icon: Award,
    condition: (p) => {
      const closingLessons = ['closing-intro', 'closing-two-choice', 'closing-voucher', 'closing-urgency'];
      return closingLessons.every((id) => p.getLessonCompletion(id));
    },
  },
  {
    id: 'people-reader',
    name: 'People Reader',
    description: 'Complete all connecting lessons',
    icon: Star,
    condition: (p) => {
      const connectingCategory = categories.find((c) => c.id === 'connecting');
      if (!connectingCategory) return false;
      return connectingCategory.lessonOrder.every((id) => p.getLessonCompletion(id));
    },
  },
  {
    id: 'master-seller',
    name: 'Master Seller',
    description: 'Complete ALL lessons',
    icon: Trophy,
    condition: (p) => p.getTotalCompletion() === 100,
  },
];

// ── Animation helpers ──
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
};

export default function ProfilePage() {
  const navigate = useNavigate();
  const progress = useProgress();
  const { language, setLanguage } = useLanguage();
  const [pendingLang, setPendingLang] = useState<'en' | 'es' | null>(null);
  const { location, setLocation } = useLocation();
  const authCtx = useAuthContext();

  // Read authenticated user data from new auth context
  const authUser = authCtx.user;

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(progress.getUserName());
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const xp = progress.getTotalXP();
  const level = useMemo(() => getLevelForXP(xp), [xp]);
  const nextLevel = useMemo(() => getNextLevel(xp), [xp]);
  const levelProgress = useMemo(() => {
    if (!nextLevel) return 100;
    const range = nextLevel.minXP - level.minXP;
    const earned = xp - level.minXP;
    return Math.min(100, Math.round((earned / range) * 100));
  }, [xp, level, nextLevel]);

  const lessonsCompleted = progress.getLessonsCompletedCount();
  const quizzesPassed = progress.getQuizzesPassedCount();
  const currentStreak = progress.getCurrentStreak();
  const bestStreak = progress.getBestStreak();
  const accuracy = progress.getAccuracyRate();
  const activityLog = progress.getActivityLog();

  const unlockedAchievements = useMemo(
    () => ACHIEVEMENTS.filter((a) => a.condition(progress)),
    [progress, lessonsCompleted, quizzesPassed, currentStreak, xp]
  );

  const handleSaveName = () => {
    if (nameInput.trim()) {
      progress.setUserName(nameInput.trim());
    }
    setEditingName(false);
  };

  const handleCancelName = () => {
    setNameInput(progress.getUserName());
    setEditingName(false);
  };

  const pillBtnBase = 'px-4 py-2 rounded-full border text-xs font-semibold transition-all duration-200 select-none';
  const pillBtnInactive = 'border-[#2A2A2A] bg-[#111111] text-[#8A8A8A] hover:border-[#3A3A3A] hover:text-white';
  const pillBtnActive = 'border-[#0ABAB5] bg-[#0ABAB5]/10 text-[#0ABAB5]';

  return (
    <div className="min-h-full bg-[#0A0A0A] pb-24">
      {/* Header Background */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0ABAB5]/10 to-transparent pt-8 pb-6 px-5">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#0ABAB5]/5 rounded-full blur-3xl pointer-events-none" />

        {/* User Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{ backgroundColor: level.color }}
            >
              {(authUser?.name || progress.getUserName() || 'S').charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 min-w-0">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveName();
                      if (e.key === 'Escape') handleCancelName();
                    }}
                    placeholder="Your name"
                    className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-[#8A8A8A] outline-none focus:border-[#0ABAB5]"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="w-8 h-8 rounded-lg bg-[#0ABAB5]/10 flex items-center justify-center text-[#0ABAB5]"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={handleCancelName}
                    className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center text-[#8A8A8A]"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-h3 text-white truncate">
                    {authUser?.name || progress.getUserName() || 'Sales Trainee'}
                  </h1>
                  <button
                    onClick={() => {
                      setNameInput(progress.getUserName());
                      setEditingName(true);
                    }}
                    className="text-[#8A8A8A] hover:text-[#0ABAB5] transition-colors"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>
              )}

              {/* Level badge */}
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: level.color + '30', color: level.color }}
                >
                  <level.icon size={12} />
                  Lv.{level.level} {level.name}
                </span>
                <span className="text-xs text-[#8A8A8A]">
                  {xp} XP
                </span>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-[#8A8A8A] mb-1.5">
              <span>Level {level.level}</span>
              {nextLevel ? (
                <span>
                  {nextLevel.minXP - xp} XP to Level {nextLevel.level}
                </span>
              ) : (
                <span>Max Level</span>
              )}
            </div>
            <div className="h-2.5 bg-[#1A1A1A] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
                className="h-full rounded-full"
                style={{ backgroundColor: level.color }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="px-5 space-y-6">
        {/* Daily Challenge */}
        <motion.div variants={fadeUp} initial="initial" animate="animate">
          <DailyChallengeCard
            isCompleted={progress.isDailyChallengeCompleted()}
            onComplete={progress.completeDailyChallenge}
          />
        </motion.div>

        {/* ── Location & Language Settings ── */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="card-elevation-1 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Globe size={16} className="text-[#8A8A8A]" />
            <h2 className="text-h4 text-white">Region & Language</h2>
          </div>

          <div className="space-y-5">
            {/* Location — READ ONLY (locked after signup) */}
            <div>
              <label className="text-xs text-[#8A8A8A] font-medium mb-2 block">
                {language === 'es' ? 'Ubicación (asignada)' : 'Location (assigned)'}
              </label>
              {authUser ? (
                <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#0ABAB5]/10 border border-[#0ABAB5]/30">
                  <MapPin size={14} className="text-[#0ABAB5]" />
                  <span className="text-sm text-[#0ABAB5] font-medium capitalize">
                    {authUser.location === 'andorra' ? '🇦🇩 Andorra' : '🇬🇮 Gibraltar'}
                  </span>
                  <span className="text-[10px] text-[#8A8A8A] ml-auto">
                    {language === 'es' ? 'Bloqueado' : 'Locked'}
                  </span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setLocation('andorra')}
                    className={`flex-1 ${pillBtnBase} ${location === 'andorra' ? pillBtnActive : pillBtnInactive}`}
                  >
                    🇦🇩 Andorra
                  </button>
                  <button
                    onClick={() => setLocation('gibraltar')}
                    className={`flex-1 ${pillBtnBase} ${location === 'gibraltar' ? pillBtnActive : pillBtnInactive}`}
                  >
                    🇬🇮 Gibraltar
                  </button>
                </div>
              )}
            </div>

            {/* Language switcher */}
            <div>
              <label className="text-xs text-[#8A8A8A] font-medium mb-2 block">Language / Idioma</label>
              <div className="flex gap-3">
                <button
                  onClick={() => language !== 'en' && setPendingLang('en')}
                  className={`flex-1 ${pillBtnBase} ${language === 'en' ? pillBtnActive : pillBtnInactive}`}
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => language !== 'es' && setPendingLang('es')}
                  className={`flex-1 ${pillBtnBase} ${language === 'es' ? pillBtnActive : pillBtnInactive}`}
                >
                  🇪🇸 Español
                </button>
              </div>
            </div>

            {/* Language Change Confirmation Dialog */}
            {pendingLang && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1A1A1A] rounded-2xl p-6 w-full max-w-sm border border-[#2A2A2A]"
                >
                  <h3 className="text-h4 text-white text-center">
                    {pendingLang === 'es' ? 'Cambiar idioma a Español?' : 'Change language to English?'}
                  </h3>
                  <p className="text-body-small text-[#8A8A8A] text-center mt-2">
                    {pendingLang === 'es'
                      ? 'La aplicación se actualizará para mostrar todo en Español.'
                      : 'The app will refresh to display everything in English.'}
                  </p>
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => setPendingLang(null)}
                      className="flex-1 h-12 rounded-full border border-[#2A2A2A] text-white text-sm font-medium active:scale-[0.97] transition-transform"
                    >
                      {pendingLang === 'es' ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      onClick={() => {
                        setLanguage(pendingLang);
                        setPendingLang(null);
                        setTimeout(() => window.location.reload(), 100);
                      }}
                      className="flex-1 h-12 rounded-full bg-[#0ABAB5] text-white text-sm font-semibold active:scale-[0.97] transition-transform"
                    >
                      {pendingLang === 'es' ? 'Confirmar' : 'Confirm'}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── First Day Track Quick Link ── */}
        <motion.div variants={fadeUp} initial="initial" animate="animate" className="card-elevation-1 p-5">
          <button
            onClick={() => navigate('/first-day')}
            className="w-full flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0ABAB5]/10 flex items-center justify-center">
                <Sparkles size={20} className="text-[#0ABAB5]" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white group-hover:text-[#0ABAB5] transition-colors">
                  {language === 'es' ? 'Track de Primer Día' : 'First Day Track'}
                </p>
                <p className="text-[11px] text-[#8A8A8A]">
                  {language === 'es' ? 'Guía rápida para nuevos' : 'Quick-start guide for new hires'}
                </p>
              </div>
            </div>
            <ChevronRight size={18} className="text-[#8A8A8A] group-hover:text-[#0ABAB5] transition-colors" />
          </button>
        </motion.div>

        {/* ── NOT Logged In → Show Login CTA ── */}
        {!authUser && (
          <motion.div variants={fadeUp} initial="initial" animate="animate" className="rounded-xl border border-[#0ABAB5]/30 bg-[#0ABAB5]/5 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#0ABAB5]/10 flex items-center justify-center">
                <LogIn size={20} className="text-[#0ABAB5]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {language === 'es' ? 'Iniciar Sesión' : 'Sign In'}
                </p>
                <p className="text-[11px] text-[#8A8A8A]">
                  {language === 'es' ? 'Accede a tu cuenta' : 'Access your account'}
                </p>
              </div>
            </div>
            <Button onClick={() => navigate('/auth')} className="w-full bg-[#0ABAB5] text-black font-semibold h-12 rounded-xl hover:bg-[#08a89e]">
              {language === 'es' ? 'Iniciar Sesión / Crear Cuenta' : 'Login / Create Account'}
            </Button>
          </motion.div>
        )}

        {/* ── Manager Dashboard Link ── */}
        {authCtx.isManager && (
          <motion.div variants={fadeUp} initial="initial" animate="animate" className="card-elevation-1 p-5">
            <button onClick={() => navigate('/manager')} className="w-full flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0ABAB5]/10 flex items-center justify-center">
                  <Briefcase size={20} className="text-[#0ABAB5]" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-[#0ABAB5] transition-colors">
                    {language === 'es' ? 'Panel del Manager' : 'Manager Dashboard'}
                  </p>
                  <p className="text-[11px] text-[#8A8A8A]">
                    {language === 'es' ? 'Ver progreso de tu equipo' : 'View your team\'s progress'}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#8A8A8A] group-hover:text-[#0ABAB5] transition-colors" />
            </button>
          </motion.div>
        )}

        {/* ── Admin Panel Link ── */}
        {authCtx.isAdmin && (
          <motion.div variants={fadeUp} initial="initial" animate="animate" className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-5">
            <button onClick={() => navigate('/admin')} className="w-full flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Shield size={20} className="text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {language === 'es' ? 'Panel de Admin' : 'Admin Panel'}
                  </p>
                  <p className="text-[11px] text-[#8A8A8A]">
                    {language === 'es' ? 'Gestionar usuarios y ubicaciones' : 'Manage users and locations'}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#8A8A8A] group-hover:text-purple-400 transition-colors" />
            </button>
          </motion.div>
        )}

        {/* ── Authenticated User Info ── */}
        {authUser && (
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="card-elevation-1 p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-[#8A8A8A]" />
              <h2 className="text-h4 text-white">Your Account</h2>
            </div>

            <div className="space-y-3">
              {/* Name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0ABAB5]/10 flex items-center justify-center">
                    <Target size={14} className="text-[#0ABAB5]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#8A8A8A]">Name</p>
                    <p className="text-sm text-white">{authUser.name}</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                    <MapPin size={14} className="text-[#8B5CF6]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#8A8A8A]">Location</p>
                    <p className="text-sm text-white">
                      {authUser.location === 'andorra' ? '🇦🇩 Andorra' : '🇬🇮 Gibraltar'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                    <Briefcase size={14} className="text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#8A8A8A]">Role</p>
                    <p className="text-sm text-white">
                      {authUser.role === 'admin' ? 'Admin' : authUser.role === 'manager' ? 'Manager' : 'Salesperson'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Joined date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <Calendar size={14} className="text-[#10B981]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-[#8A8A8A]">Joined</p>
                    <p className="text-sm text-white">
                      {new Date(authUser.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={() => {
                authCtx.logout();
                navigate('/auth', { replace: true });
              }}
              className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-3.5 transition-colors hover:bg-[#EF4444]/10"
            >
              <LogOut size={14} className="text-[#EF4444]" />
              <span className="text-sm text-[#EF4444] font-medium">Logout</span>
            </button>
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 gap-3"
        >
          <motion.div variants={fadeUp} className="card-elevation-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#0ABAB5]/10 flex items-center justify-center">
                <Zap size={14} className="text-[#0ABAB5]" />
              </div>
              <span className="text-[11px] text-[#8A8A8A] font-medium">Total XP</span>
            </div>
            <span className="text-h2 text-white">{xp}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="card-elevation-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                <BookOpen size={14} className="text-[#8B5CF6]" />
              </div>
              <span className="text-[11px] text-[#8A8A8A] font-medium">Lessons</span>
            </div>
            <span className="text-h2 text-white">{lessonsCompleted}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="card-elevation-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                <Brain size={14} className="text-[#F59E0B]" />
              </div>
              <span className="text-[11px] text-[#8A8A8A] font-medium">Quizzes Passed</span>
            </div>
            <span className="text-h2 text-white">{quizzesPassed}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="card-elevation-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                <Flame size={14} className="text-[#EF4444]" />
              </div>
              <span className="text-[11px] text-[#8A8A8A] font-medium">Streak</span>
            </div>
            <span className="text-h2 text-white">{currentStreak}d</span>
          </motion.div>

          <motion.div variants={fadeUp} className="card-elevation-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                <TrendingUp size={14} className="text-[#10B981]" />
              </div>
              <span className="text-[11px] text-[#8A8A8A] font-medium">Best Streak</span>
            </div>
            <span className="text-h2 text-white">{bestStreak}d</span>
          </motion.div>

          <motion.div variants={fadeUp} className="card-elevation-1 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#EC4899]/10 flex items-center justify-center">
                <Target size={14} className="text-[#EC4899]" />
              </div>
              <span className="text-[11px] text-[#8A8A8A] font-medium">Accuracy</span>
            </div>
            <span className="text-h2 text-white">{accuracy}%</span>
          </motion.div>
        </motion.div>

        {/* Category Progress */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="card-elevation-1 p-5"
        >
          <h2 className="text-h4 text-white mb-4">Category Progress</h2>
          <div className="space-y-4">
            {categories.map((cat) => {
              const pct = progress.getCategoryCompletion(cat.id);
              return (
                <div key={cat.id}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/80">{cat.title}</span>
                    <span className="text-[#8A8A8A]">{pct}%</span>
                  </div>
                  <div className="h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat.accentColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="card-elevation-1 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h4 text-white">Achievements</h2>
            <span className="text-[11px] text-[#8A8A8A]">
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {ACHIEVEMENTS.map((ach) => {
              const unlocked = unlockedAchievements.some((a) => a.id === ach.id);
              const Icon = ach.icon;
              return (
                <motion.div
                  key={ach.id}
                  whileTap={unlocked ? undefined : { scale: 0.98 }}
                  className={`relative rounded-xl border p-3 transition-colors ${
                    unlocked
                      ? 'border-[#0ABAB5]/30 bg-[#0ABAB5]/5'
                      : 'border-[#1A1A1A] bg-[#0F0F0F] opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        unlocked ? 'bg-[#0ABAB5]/10' : 'bg-[#1A1A1A]'
                      }`}
                    >
                      {unlocked ? (
                        <Icon size={14} className="text-[#0ABAB5]" />
                      ) : (
                        <Lock size={14} className="text-[#8A8A8A]" />
                      )}
                    </div>
                    {unlocked && (
                      <Unlock size={12} className="text-[#0ABAB5] absolute top-2 right-2" />
                    )}
                  </div>
                  <p className={`text-xs font-semibold ${unlocked ? 'text-white' : 'text-[#8A8A8A]'}`}>
                    {ach.name}
                  </p>
                  <p className="text-[10px] text-[#8A8A8A] mt-0.5 leading-tight">{ach.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="card-elevation-1 p-5"
        >
          <h2 className="text-h4 text-white mb-4">Recent Activity</h2>
          {activityLog.length === 0 ? (
            <div className="text-center py-6">
              <Calendar size={32} className="text-[#2A2A2A] mx-auto mb-2" />
              <p className="text-sm text-[#8A8A8A]">No activity yet</p>
              <p className="text-xs text-[#8A8A8A] mt-1">Complete lessons to see your progress</p>
            </div>
          ) : (
            <div className="space-y-3">
              {activityLog.slice(0, 10).map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      item.type === 'lesson'
                        ? 'bg-[#8B5CF6]/10'
                        : item.type === 'quiz'
                        ? 'bg-[#F59E0B]/10'
                        : 'bg-[#0ABAB5]/10'
                    }`}
                  >
                    {item.type === 'lesson' ? (
                      <BookOpen size={14} className="text-[#8B5CF6]" />
                    ) : item.type === 'quiz' ? (
                      <Brain size={14} className="text-[#F59E0B]" />
                    ) : (
                      <Target size={14} className="text-[#0ABAB5]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/90">{item.title}</p>
                    {item.detail && (
                      <p className="text-xs text-[#8A8A8A] truncate">{item.detail}</p>
                    )}
                    <p className="text-[10px] text-[#8A8A8A] mt-0.5">
                      {new Date(item.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {item.xpEarned > 0 && (
                    <span className="text-xs font-semibold text-[#0ABAB5] shrink-0">
                      +{item.xpEarned} XP
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Settings */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          className="card-elevation-1 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <Settings size={16} className="text-[#8A8A8A]" />
            <h2 className="text-h4 text-white">Settings</h2>
          </div>

          <div className="space-y-4">
            {/* Daily Reminder Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] flex items-center justify-center">
                  <Bell size={14} className="text-[#8A8A8A]" />
                </div>
                <div>
                  <p className="text-sm text-white">Daily Reminder</p>
                  <p className="text-[11px] text-[#8A8A8A]">Remind me to practice</p>
                </div>
              </div>
              <button
                onClick={() => setReminderEnabled(!reminderEnabled)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  reminderEnabled ? 'bg-[#0ABAB5]' : 'bg-[#2A2A2A]'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    reminderEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Reset Progress */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="w-full flex items-center justify-between rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-4 transition-colors hover:bg-[#EF4444]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                      <RotateCcw size={14} className="text-[#EF4444]" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-[#EF4444] font-medium">Reset Progress</p>
                      <p className="text-[11px] text-[#8A8A8A]">Clear all data permanently</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-[#8A8A8A]" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-[#1A1A1A] border-[#2A2A2A]">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white flex items-center gap-2">
                    <AlertTriangle size={18} className="text-[#F59E0B]" />
                    Reset All Progress?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[#8A8A8A]">
                    This will permanently delete all your lessons, quiz scores, XP, streaks, and achievements. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-[#2A2A2A] text-white border-[#3A3A3A] hover:bg-[#3A3A3A]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={progress.resetProgress}
                    className="bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  >
                    Reset Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>

        {/* Spacer for bottom nav */}
        <div className="h-4" />
      </div>
    </div>
  );
}
