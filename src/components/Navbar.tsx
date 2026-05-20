import { NavLink, useLocation } from 'react-router-dom';
import { Home, GraduationCap, Dumbbell, Brain, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/training', label: 'Training', icon: GraduationCap },
  { to: '/exercises', label: 'Exercises', icon: Dumbbell },
  { to: '/quizzes', label: 'Quizzes', icon: Brain },
  { to: '/profile', label: 'Profile', icon: Trophy },
];

export default function Navbar() {
  const location = useLocation();

  // Don't render on onboarding route
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[430px] bg-[#0F0F0F] border-t border-[#1A1A1A]">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 w-14 h-full relative select-none transition-colors duration-200 ${
                  isActive ? 'text-[#0ABAB5]' : 'text-[#8A8A8A]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -top-[1px] w-6 h-[3px] bg-[#0ABAB5] rounded-b-full"
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                  <span className="text-[10px] font-medium leading-3">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
        {/* Safe area padding for iOS */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </nav>
  );
}
