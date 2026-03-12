import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useApp } from './context/AppContext';
import LoginPage from './components/Auth/LoginPage';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import DashboardPage from './components/Dashboard/DashboardPage';
import TimerPage from './components/Timer/TimerPage';
import LogPage from './components/Log/LogPage';
import ProjectsPage from './components/Projects/ProjectsPage';
import AnalyticsPage from './components/Analytics/AnalyticsPage';
import SettingsPage from './components/Settings/SettingsPage';
import DayAnalysisPage from './components/DayAnalysis/DayAnalysisPage';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4"
      >
        <img
          src={`${import.meta.env.BASE_URL}profile.png`}
          alt="Workbench"
          className="w-12 h-12 rounded-xl object-cover animate-pulse"
        />
        <div className="flex gap-1.5">
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, delay, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const { user } = useApp();

  if (user === undefined) return <LoadingScreen />;
  if (user === null) return <LoginPage />;

  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="main-area">
        <TopBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/log" element={<LogPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/day" element={<DayAnalysisPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
