import { Routes, Route, Navigate } from 'react-router-dom';
import { useMemo } from 'react';
import Layout from './components/Layout';
import OnboardingPage from './pages/OnboardingPage';
import AuthPage from './pages/AuthPage';
import HomeDashboard from './pages/HomeDashboard';
import CategoryHub from './pages/CategoryHub';
import LessonView from './pages/LessonView';
import LessonQuiz from './pages/LessonQuiz';
import MindsetPage from './pages/MindsetPage';
import StoppingPage from './pages/StoppingPage';
import ConnectingPage from './pages/ConnectingPage';
import SyringePage from './pages/SyringePage';
import PeelingPage from './pages/PeelingPage';
import ScrubPage from './pages/ScrubPage';
import NailKitPage from './pages/NailKitPage';
import WorkflowPage from './pages/WorkflowPage';
import ExercisesPage from './pages/ExercisesPage';
import QuizzesPage from './pages/QuizzesPage';
import CheatSheetsPage from './pages/CheatSheetsPage';
import ProfilePage from './pages/ProfilePage';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocationProvider } from './contexts/LocationContext';

function checkAuth(): boolean {
  try {
    const userData = localStorage.getItem('zl_user');
    if (userData) {
      const parsed = JSON.parse(userData);
      return !!parsed.name;
    }
  } catch {
    // ignore
  }
  return false;
}

function RootRoute() {
  const isAuthenticated = useMemo(() => checkAuth(), []);
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return <OnboardingPage />;
}

export default function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<RootRoute />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/home" element={<HomeDashboard />} />
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
          </Routes>
        </Layout>
      </LocationProvider>
    </LanguageProvider>
  );
}
