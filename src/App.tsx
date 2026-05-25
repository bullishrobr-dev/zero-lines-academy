import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import OnboardingPage from './pages/OnboardingPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocationProvider } from './contexts/LocationContext';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';

/* ── Lazy-loaded pages for code splitting ── */
const AuthPage         = lazy(() => import('./pages/AuthPage'));
const HomeDashboard    = lazy(() => import('./pages/HomeDashboard'));
const TrainingHub      = lazy(() => import('./pages/TrainingHub'));
const CategoryHub      = lazy(() => import('./pages/CategoryHub'));
const LessonView       = lazy(() => import('./pages/LessonView'));
const LessonQuiz       = lazy(() => import('./pages/LessonQuiz'));
const MindsetPage      = lazy(() => import('./pages/MindsetPage'));
const StoppingPage     = lazy(() => import('./pages/StoppingPage'));
const ConnectingPage   = lazy(() => import('./pages/ConnectingPage'));
const SyringePage      = lazy(() => import('./pages/SyringePage'));
const PeelingPage      = lazy(() => import('./pages/PeelingPage'));
const ScrubPage        = lazy(() => import('./pages/ScrubPage'));
const NailKitPage      = lazy(() => import('./pages/NailKitPage'));
const WorkflowPage     = lazy(() => import('./pages/WorkflowPage'));
const ExercisesPage    = lazy(() => import('./pages/ExercisesPage'));
const QuizzesPage      = lazy(() => import('./pages/QuizzesPage'));
const CheatSheetsPage  = lazy(() => import('./pages/CheatSheetsPage'));
const ProfilePage      = lazy(() => import('./pages/ProfilePage'));
const FirstDayTrack    = lazy(() => import('./pages/FirstDayTrack'));
const ManagerDashboard = lazy(() => import('./pages/ManagerDashboard'));
const AdminPanel       = lazy(() => import('./pages/AdminPanel'));
const FlashcardsPage   = lazy(() => import('./pages/FlashcardsPage'));
const FlashcardDeckPage= lazy(() => import('./pages/FlashcardDeckPage'));
const ShiftCheckIn     = lazy(() => import('./pages/ShiftCheckIn'));
const EndOfShift       = lazy(() => import('./pages/EndOfShift'));
const LeaderboardPage  = lazy(() => import('./pages/LeaderboardPage'));
const StreetTrackerPage= lazy(() => import('./pages/StreetTrackerPage'));

function RootRoute() {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <OnboardingPage />;
}

function AuthRoute() {
  const { isAuthenticated } = useAuthContext();
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <AuthPage />;
}

/* Wrapper that fixes LeaderboardPage navigation */
function LeaderboardRoute() {
  return <LeaderboardPage onNavigateHome={() => { window.location.hash = '#/home'; }} />;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LocationProvider>
          <ErrorBoundary>
            <Layout>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<RootRoute />} />
                  <Route path="/auth" element={<AuthRoute />} />
                  <Route path="/home" element={<HomeDashboard />} />
                  <Route path="/training" element={<TrainingHub />} />
                  <Route path="/category/:id" element={<CategoryHub />} />
                  <Route path="/lesson/:lessonId" element={<LessonView />} />
                  <Route path="/lesson/:lessonId/quiz" element={<LessonQuiz />} />
                  <Route path="/mindset" element={<MindsetPage />} />
                  <Route path="/stopping" element={<StoppingPage />} />
                  <Route path="/connecting" element={<ConnectingPage />} />
                  <Route path="/syringe" element={<SyringePage />} />
                  <Route path="/peeling" element={<PeelingPage />} />
                  <Route path="/scrub" element={<ScrubPage />} />
                  <Route path="/nail-kit" element={<NailKitPage />} />
                  <Route path="/workflow" element={<WorkflowPage />} />
                  <Route path="/exercises" element={<ExercisesPage />} />
                  <Route path="/quizzes" element={<QuizzesPage />} />
                  <Route path="/cheat-sheets" element={<CheatSheetsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/first-day" element={<FirstDayTrack />} />
                  <Route path="/manager" element={<ManagerDashboard />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/flashcards" element={<FlashcardsPage />} />
                  <Route path="/flashcard-decks" element={<FlashcardDeckPage />} />
                  <Route path="/shift-checkin" element={<ShiftCheckIn />} />
                  <Route path="/end-of-shift" element={<EndOfShift />} />
                  <Route path="/leaderboard" element={<LeaderboardRoute />} />
                  <Route path="/street-tracker" element={<StreetTrackerPage />} />
                  {/* ── 404 catch-all ── */}
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </Suspense>
            </Layout>
          </ErrorBoundary>
        </LocationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
