import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import DashboardPage from './components/Dashboard/DashboardPage';
import TimerPage from './components/Timer/TimerPage';
import LogPage from './components/Log/LogPage';
import ProjectsPage from './components/Projects/ProjectsPage';
import AnalyticsPage from './components/Analytics/AnalyticsPage';
import SettingsPage from './components/Settings/SettingsPage';
import DayAnalysisPage from './components/DayAnalysis/DayAnalysisPage';

export default function App() {
  const location = useLocation();

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
