import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Timer, Plus, TrendingUp, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { todayKey, last7DayKeys, friendlyDate } from '../../utils/time';
import CurrentBlockCard from './CurrentBlockCard';
import DayTimeline from './DayTimeline';
import DailyMinimums from './DailyMinimums';
import WeeklyProjectCard from './WeeklyProjectCard';
import { useState } from 'react';
import AddEntryModal from '../Log/AddEntryModal';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

function StreakBadge({ streak }) {
  if (streak < 2) return null;
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
      <Flame size={13} className="text-amber-400" />
      <span className="text-xs font-semibold text-amber-400">{streak} day streak</span>
    </div>
  );
}

/** Calculate how many consecutive days have at least one log entry */
function calcStreak(logs) {
  const keys = last7DayKeys(); // newest first
  let streak = 0;
  for (const k of keys) {
    if (logs[k] && logs[k].length > 0) streak++;
    else break;
  }
  return streak;
}

export default function DashboardPage() {
  const { state } = useApp();
  const dateKey = todayKey();
  const todayLogs = state.logs[dateKey] || [];
  const [showAddModal, setShowAddModal] = useState(false);
  const streak = calcStreak(state.logs);

  // Group by blockId for timeline
  const logsByBlock = todayLogs.reduce((acc, log) => {
    if (!acc[log.blockId]) acc[log.blockId] = [];
    acc[log.blockId].push(log);
    return acc;
  }, {});

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="page-container"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{friendlyDate()}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StreakBadge streak={streak} />
          <Link to="/timer">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              <Timer size={15} />
              Start Timer
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowAddModal(true)}
            className="btn-secondary"
          >
            <Plus size={15} />
            Log Entry
          </motion.button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Left column (spans 2 on lg) */}
        <div className="lg:col-span-2 space-y-5">
          <CurrentBlockCard />
          <DailyMinimums todayLogs={todayLogs} />

          {/* Recent logs today */}
          {todayLogs.length > 0 && (
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Today's Logged Sessions
                  <span className="ml-2 text-[10px] text-[var(--text-muted)] bg-white/[0.06] px-1.5 py-0.5 rounded-full">
                    {todayLogs.length}
                  </span>
                </h3>
                <Link to="/log" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                  View all →
                </Link>
              </div>
              <div className="space-y-2">
                {todayLogs.slice(-4).reverse().map(log => {
                  const project = state.projects.find(p => p.id === log.projectId);
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] transition-colors"
                    >
                      {project && (
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: project.color }}
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[var(--text-primary)] truncate">
                          {log.taskName || 'Work session'}
                        </p>
                        {project && (
                          <p className="text-[10px] text-[var(--text-muted)] truncate">{project.name}</p>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 shrink-0">
                        {log.durationMinutes}m
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <WeeklyProjectCard />
          <DayTimeline logsByBlock={logsByBlock} />

          {/* Quick weekly stats */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">This Week</h3>
              <Link to="/analytics" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">
                Full analytics →
              </Link>
            </div>
            <WeekStats logs={state.logs} />
          </div>
        </div>
      </div>

      {showAddModal && <AddEntryModal onClose={() => setShowAddModal(false)} />}
    </motion.div>
  );
}

function WeekStats({ logs }) {
  const keys = last7DayKeys();
  const allLogs = keys.flatMap(k => logs[k] || []);

  const totalResearch = allLogs
    .filter(l => ['research1', 'research2', 'research3'].includes(l.blockId))
    .reduce((a, l) => a + (l.durationMinutes || 0), 0);

  const totalGate = allLogs
    .filter(l => l.blockId === 'gate')
    .reduce((a, l) => a + (l.durationMinutes || 0), 0);

  const totalH = Math.round((totalResearch + totalGate) / 6) / 10;

  const stats = [
    { label: 'GATE hrs', value: `${(totalGate / 60).toFixed(1)}h`, color: '#f59e0b' },
    { label: 'Research hrs', value: `${(totalResearch / 60).toFixed(1)}h`, color: '#6366f1' },
    { label: 'Sessions', value: allLogs.length, color: '#06b6d4' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map(s => (
        <div key={s.label} className="p-2 rounded-xl bg-white/[0.04] text-center border border-white/[0.04]">
          <p className="text-base font-bold" style={{ color: s.color }}>{s.value}</p>
          <p className="text-[9px] text-[var(--text-muted)] font-medium mt-0.5 leading-tight">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
