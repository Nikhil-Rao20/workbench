import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import { TrendingUp, Award, Zap, BookOpen, Microscope, Brain, Dumbbell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  last7DayKeys, dayOfWeekLabel, minToHHMM, todayKey,
} from '../../utils/time';
import { RESEARCH_BLOCK_IDS, DAILY_TARGETS } from '../../data/schedule';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-xs border border-white/[0.1]">
      <p className="font-semibold text-[var(--text-primary)] mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {minToHHMM(p.value)}</p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  const { state } = useApp();
  const keys = last7DayKeys().reverse(); // oldest → newest for chart

  // ── Weekly data ────────────────────────────────────────────────────────────
  const weeklyData = useMemo(() => keys.map(k => {
    const logs = state.logs[k] || [];
    const gate = logs.filter(l => l.blockId === 'gate').reduce((a, l) => a + (l.durationMinutes || 0), 0);
    const research = logs.filter(l => RESEARCH_BLOCK_IDS.includes(l.blockId)).reduce((a, l) => a + (l.durationMinutes || 0), 0);
    const conceptual = logs.filter(l => l.blockId === 'conceptual').reduce((a, l) => a + (l.durationMinutes || 0), 0);
    const exercise = logs.filter(l => l.blockId === 'exercise').reduce((a, l) => a + (l.durationMinutes || 0), 0);
    return {
      day: dayOfWeekLabel(k),
      gate,
      research,
      conceptual,
      exercise,
      total: gate + research + conceptual + exercise,
    };
  }), [state.logs]);

  // ── Project distribution ────────────────────────────────────────────────────
  const projectDist = useMemo(() => {
    const allLogs = keys.flatMap(k => state.logs[k] || []);
    const byProject = {};
    allLogs.forEach(l => {
      if (l.projectId) {
        byProject[l.projectId] = (byProject[l.projectId] || 0) + (l.durationMinutes || 0);
      }
    });
    return Object.entries(byProject)
      .map(([id, minutes]) => {
        const proj = state.projects.find(p => p.id === id);
        return { id, name: proj?.name || id, minutes, color: proj?.color || '#6b7280' };
      })
      .sort((a, b) => b.minutes - a.minutes)
      .slice(0, 8);
  }, [state.logs, state.projects]);

  // ── Summary stats ──────────────────────────────────────────────────────────
  const allLogsWeek = keys.flatMap(k => state.logs[k] || []);
  const totalGate = allLogsWeek.filter(l => l.blockId === 'gate').reduce((a, l) => a + (l.durationMinutes || 0), 0);
  const totalResearch = allLogsWeek.filter(l => RESEARCH_BLOCK_IDS.includes(l.blockId)).reduce((a, l) => a + (l.durationMinutes || 0), 0);
  const totalConceptual = allLogsWeek.filter(l => l.blockId === 'conceptual').reduce((a, l) => a + (l.durationMinutes || 0), 0);
  const totalExercise = allLogsWeek.filter(l => l.blockId === 'exercise').reduce((a, l) => a + (l.durationMinutes || 0), 0);

  // Days achieving daily minimums
  const daysAchieved = keys.filter(k => {
    const logs = state.logs[k] || [];
    const g = logs.filter(l => l.blockId === 'gate').reduce((a, l) => a + (l.durationMinutes || 0), 0);
    const r = logs.filter(l => RESEARCH_BLOCK_IDS.includes(l.blockId)).reduce((a, l) => a + (l.durationMinutes || 0), 0);
    return g >= DAILY_TARGETS.gate && r >= DAILY_TARGETS.research;
  }).length;

  const statCards = [
    { label: 'GATE this week', value: minToHHMM(totalGate), target: minToHHMM(14 * 60), icon: BookOpen, color: '#f59e0b' },
    { label: 'Research this week', value: minToHHMM(totalResearch), target: '35–40h target', icon: Microscope, color: '#6366f1' },
    { label: 'Conceptual', value: minToHHMM(totalConceptual), target: '5h target', icon: Brain, color: '#06b6d4' },
    { label: 'Exercise', value: minToHHMM(totalExercise), target: '5h target', icon: Dumbbell, color: '#22c55e' },
    { label: 'Days on target', value: `${daysAchieved}/7`, target: 'GATE + Research ✓', icon: Award, color: '#f43f5e' },
    { label: 'Total sessions', value: allLogsWeek.length, target: 'This week', icon: Zap, color: '#8b5cf6' },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="page-container"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Analytics</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Last 7 days overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {statCards.map(s => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${s.color}18` }}
              >
                <s.icon size={15} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">{s.label}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{s.target}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Stacked bar chart */}
        <div className="lg:col-span-2 glass-card p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Daily Breakdown (last 7 days)</h3>
          {allLogsWeek.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-[var(--text-muted)] text-sm">
              No data yet — start logging sessions!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={weeklyData} barSize={22} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => minToHHMM(v)} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={45} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
                <Bar dataKey="gate" name="GATE" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="research" name="Research" stackId="a" fill="#6366f1" />
                <Bar dataKey="conceptual" name="Conceptual" stackId="a" fill="#06b6d4" />
                <Bar dataKey="exercise" name="Exercise" stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Project distribution */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Project Distribution</h3>
          {projectDist.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-[var(--text-muted)] text-xs text-center">
              No project data yet
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={projectDist}
                    cx="50%" cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="minutes"
                  >
                    {projectDist.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => [minToHHMM(v), '']}
                    contentStyle={{
                      background: 'var(--bg-card)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="space-y-1.5 mt-2">
                {projectDist.map(p => (
                  <div key={p.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      <span className="text-[var(--text-muted)] truncate">{p.name}</span>
                    </div>
                    <span className="font-mono text-[var(--text-secondary)] shrink-0 ml-2">{minToHHMM(p.minutes)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Daily total line chart */}
      <div className="glass-card p-5 mt-5">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Productive Hours Trend</h3>
        {allLogsWeek.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-[var(--text-muted)] text-sm">
            Start logging to see your trend
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `${Math.round(v / 60)}h`} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={28} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)' }} />
              <Line dataKey="gate" name="GATE" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} activeDot={{ r: 5 }} />
              <Line dataKey="research" name="Research" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: '#6366f1' }} activeDot={{ r: 5 }} />
              <Line dataKey="total" name="Total" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 2" dot={false} />
              <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}
