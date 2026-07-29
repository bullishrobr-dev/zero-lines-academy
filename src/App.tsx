import { lazy, Suspense, type ReactElement } from 'react';
import { Routes, Route, Navigate, useLocation as useRouterLocation } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
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

/* ── Route guards ──
   Every route used to be reachable by anyone: a plain seller could open
   /manager by editing the URL fragment and read the whole roster, including
   colleagues' email addresses and scores. ───────────────────────────────── */

function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const routerLocation = useRouterLocation();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) {
    // Remember where they were headed so sign-in can return them there.
    return <Navigate to="/auth" replace state={{ from: routerLocation.pathname }} />;
  }
  return children;
}

function RequireRole({ children, role }: { children: ReactElement; role: 'manager' | 'admin' }) {
  const { isAuthenticated, isAdmin, isManager, isLoading } = useAuthContext();

  if (isLoading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  const allowed = role === 'admin' ? isAdmin : isManager;
  if (!allowed) return <Navigate to="/home" replace />;
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
              </Layout>
            </ErrorBoundary>
          </LocationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
