import { lazy, Suspense, useEffect, type ReactElement } from 'react';
import { Routes, Route, Navigate, useLocation as useRouterLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import PwaPrompts from './components/PwaPrompts';
import ShiftNudges from './components/ShiftNudges';
import OnboardingPage from './pages/OnboardingPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocationProvider } from './contexts/LocationContext';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';

/* ── Lazy-loaded pages for code splitting ── */
const AuthPage          = lazy(() => import('./pages/AuthPage'));
const HomeDashboard     = lazy(() => import('./pages/HomeDashboard'));
const TrainingHub       = lazy(() => import('./pages/TrainingHub'));
const CategoryHub       = lazy(() => import('./pages/CategoryHub'));
const LessonView        = lazy(() => import('./pages/LessonView'));
const LessonQuiz        = lazy(() => import('./pages/LessonQuiz'));
const SyringePage       = lazy(() => import('./pages/SyringePage'));
const PeelingPage       = lazy(() => import('./pages/PeelingPage'));
const ScrubPage         = lazy(() => import('./pages/ScrubPage'));
const NailKitPage       = lazy(() => import('./pages/NailKitPage'));
const ExercisesPage     = lazy(() => import('./pages/ExercisesPage'));
const QuizzesPage       = lazy(() => import('./pages/QuizzesPage'));
const CheatSheetsPage   = lazy(() => import('./pages/CheatSheetsPage'));
const ProfilePage       = lazy(() => import('./pages/ProfilePage'));
const FirstDayTrack     = lazy(() => import('./pages/FirstDayTrack'));
const ManagerDashboard  = lazy(() => import('./pages/ManagerDashboard'));
const AdminPanel        = lazy(() => import('./pages/AdminPanel'));
const FlashcardsPage    = lazy(() => import('./pages/FlashcardsPage'));
const FlashcardDeckPage = lazy(() => import('./pages/FlashcardDeckPage'));
const ShiftCheckIn      = lazy(() => import('./pages/ShiftCheckIn'));
const EndOfShift        = lazy(() => import('./pages/EndOfShift'));
const LeaderboardPage   = lazy(() => import('./pages/LeaderboardPage'));
const StreetTrackerPage = lazy(() => import('./pages/StreetTrackerPage'));
const SetPasswordPage   = lazy(() => import('./pages/SetPasswordPage'));
const SettingsPage      = lazy(() => import('./pages/SettingsPage'));

/* ── Warm the bottom-nav chunks ──
   Every destination is its own JS chunk, so the first tap on a tab has to
   download one before it can paint. The page transition used to cover that gap
   — badly, at the cost of a quarter-second of blank screen on EVERY tap (see
   the note in Layout.tsx). With the transition gone the download is exposed,
   so fetch the five for real while the phone is idle and the seller is still
   reading the screen they are on.

   Identical specifiers to the lazy() calls above, so Rollup emits one chunk per
   page and the browser's module cache makes the later real import instant.

   Signed-in only, and one at a time: a first-time visitor on a shop's 4G should
   not spend their connection on pages they have not reached, and five parallel
   requests would compete with whatever the current page is still loading. */
const NAV_CHUNKS: Array<() => Promise<unknown>> = [
  () => import('./pages/HomeDashboard'),
  () => import('./pages/TrainingHub'),
  () => import('./pages/StreetTrackerPage'),
  () => import('./pages/CheatSheetsPage'),
  () => import('./pages/ProfilePage'),
];

function PrefetchNavRoutes() {
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;
    const run = async () => {
      for (const load of NAV_CHUNKS) {
        if (cancelled) return;
        try {
          await load();
        } catch {
          /* Offline, or the chunk 404s after a redeploy. Either way the real
             navigation will surface it — a warm-up must never break the app,
             and one failure must not stop the rest warming. */
        }
      }
    };

    const idle = 'requestIdleCallback' in window;
    const handle = idle
      ? window.requestIdleCallback(run, { timeout: 3000 })
      : window.setTimeout(run, 1200);

    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [isAuthenticated]);

  return null;
}

/* ── Route guards ──
   Every route used to be reachable by anyone: a plain seller could open
   /manager by editing the URL fragment and read the whole roster, including
   colleagues' email addresses and scores. ───────────────────────────────── */

function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const routerLocation = useRouterLocation();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) {
    // Remember where they were headed so sign-in can return them there.
    return <Navigate to="/auth" replace state={{ from: routerLocation.pathname }} />;
  }
  /* Somebody else picked the password they are using — their account was just
     made, or an admin reset it. Nothing else opens until they replace it. */
  if (user?.mustChangePassword) return <Navigate to="/set-password" replace />;
  return children;
}

function RequireRole({ children, role }: { children: ReactElement; role: 'manager' | 'admin' }) {
  const { isAuthenticated, isAdmin, isManager, isLoading, user } = useAuthContext();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (user?.mustChangePassword) return <Navigate to="/set-password" replace />;

  const allowed = role === 'admin' ? isAdmin : isManager;
  if (!allowed) return <Navigate to="/home" replace />;
  return children;
}

/** Signed in, but deliberately reachable while a password still needs changing. */
function RequireSignedIn({ children }: { children: ReactElement }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
}

function RootRoute() {
  const { isAuthenticated, isLoading } = useAuthContext();
  if (isLoading) return <LoadingScreen />;
  return isAuthenticated ? <Navigate to="/home" replace /> : <OnboardingPage />;
}

function AuthRoute() {
  const { isAuthenticated, isLoading } = useAuthContext();
  if (isLoading) return <LoadingScreen />;
  return isAuthenticated ? <Navigate to="/home" replace /> : <AuthPage />;
}

export default function App() {
  return (
    // "user" makes every Framer animation honour the phone's Reduce Motion
    // setting — the page-slide, the tap-scale, the card reveals — instead of
    // only the confetti. Someone who gets motion sick, or just turned it off,
    // now gets a still app.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
        <AuthProvider>
          {/* LocationProvider reads the signed-in user, so it must sit inside AuthProvider. */}
          <LocationProvider>
            <ErrorBoundary>
              <Layout>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    {/* ── Public ── */}
                    <Route path="/" element={<RootRoute />} />
                    <Route path="/auth" element={<AuthRoute />} />

                    {/* ── Signed-in ── */}
                    {/* Not RequireAuth: this is the one place a person on a
                        borrowed password is allowed to be. */}
                    <Route
                      path="/set-password"
                      element={<RequireSignedIn><SetPasswordPage /></RequireSignedIn>}
                    />
                    <Route path="/home" element={<RequireAuth><HomeDashboard /></RequireAuth>} />
                    <Route path="/training" element={<RequireAuth><TrainingHub /></RequireAuth>} />
                    <Route path="/category/:id" element={<RequireAuth><CategoryHub /></RequireAuth>} />
                    <Route path="/lesson/:lessonId" element={<RequireAuth><LessonView /></RequireAuth>} />
                    <Route path="/lesson/:lessonId/quiz" element={<RequireAuth><LessonQuiz /></RequireAuth>} />
                    <Route path="/syringe" element={<RequireAuth><SyringePage /></RequireAuth>} />
                    <Route path="/peeling" element={<RequireAuth><PeelingPage /></RequireAuth>} />
                    <Route path="/scrub" element={<RequireAuth><ScrubPage /></RequireAuth>} />
                    <Route path="/nail-kit" element={<RequireAuth><NailKitPage /></RequireAuth>} />
                    <Route path="/exercises" element={<RequireAuth><ExercisesPage /></RequireAuth>} />
                    <Route path="/quizzes" element={<RequireAuth><QuizzesPage /></RequireAuth>} />
                    <Route path="/cheat-sheets" element={<RequireAuth><CheatSheetsPage /></RequireAuth>} />
                    <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
                    <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
                    <Route path="/first-day" element={<RequireAuth><FirstDayTrack /></RequireAuth>} />
                    <Route path="/flashcards" element={<RequireAuth><FlashcardsPage /></RequireAuth>} />
                    <Route path="/flashcard-decks" element={<RequireAuth><FlashcardDeckPage /></RequireAuth>} />
                    <Route path="/shift-checkin" element={<RequireAuth><ShiftCheckIn /></RequireAuth>} />
                    <Route path="/end-of-shift" element={<RequireAuth><EndOfShift /></RequireAuth>} />
                    <Route path="/leaderboard" element={<RequireAuth><LeaderboardPage /></RequireAuth>} />
                    <Route path="/street-tracker" element={<RequireAuth><StreetTrackerPage /></RequireAuth>} />

                    {/* ── Restricted ── */}
                    <Route
                      path="/manager"
                      element={<RequireRole role="manager"><ManagerDashboard /></RequireRole>}
                    />
                    <Route
                      path="/admin"
                      element={<RequireRole role="admin"><AdminPanel /></RequireRole>}
                    />

                    {/* ── 404 ── */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </Suspense>
                <PwaPrompts />
                <ShiftNudges />
                <PrefetchNavRoutes />
              </Layout>
            </ErrorBoundary>
          </LocationProvider>
        </AuthProvider>
      </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
