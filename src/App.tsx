import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import OnboardingPage from './pages/OnboardingPage';
import HomeDashboard from './pages/HomeDashboard';
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

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/home" element={<HomeDashboard />} />
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
  );
}
