import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  TrendingUp, Award, Zap, BookOpen, Microscope, Brain,
  Dumbbell, ChevronLeft, ChevronRight,
} from 'lucide-react';
import {
  format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval,
  addMonths, subMonths, eachMonthOfInterval,
  isAfter, addDays, startOfWeek, endOfWeek,
  eachWeekOfInterval, subWeeks, isBefore,
} from 'date-fns';
import { useApp } from '../../context/AppContext';
import { minToHHMM } from '../../utils/time';
import { RESEARCH_BLOCK_IDS, DAILY_TARGETS } from '../../data/schedule';
import clsx from 'clsx';

// ─── Constants ───────────────────────────────────────────────────────────────

const VIEWS = [
  { id: '7d',      label: '7 Days'   },
  { id: 'month',   label: 'Month'    },
  { id: 'quarter', label: 'Quarter'  },
  { id: 'year',    label: 'Year'     },
  { id: 'alltime', label: 'All Time' },
];

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDayStats(logs, key) {
  const dayLogs = logs[key] || [];
  const gate       = dayLogs.filter(l => l.blockId === 'gate').reduce((a, l) => a + (l.durationMinutes || 0), 0);
  const research   = dayLogs.filter(l => RESEARCH_BLOCK_IDS.includes(l.blockId)).reduce((a, l) => a + (l.durationMinutes || 0), 0);
  const conceptual = dayLogs.filter(l => l.blockId === 'conceptual').reduce((a, l) => a + (l.durationMinutes || 0), 0);
  const exercise   = dayLogs.filter(l => l.blockId === 'exercise').reduce((a, l) => a + (l.durationMinutes || 0), 0);
  return { gate, research, conceptual, exercise, total: gate + research + conceptual + exercise };
}

function sumStatsArr(stats) {
  return stats.reduce(
    (acc, s) => ({
      gate:       acc.gate       + s.gate,
      research:   acc.research   + s.research,
      conceptual: acc.conceptual + s.conceptual,
      exercise:   acc.exercise   + s.exercise,
      total:      acc.total      + s.total,
    }),
    { gate: 0, research: 0, conceptual: 0, exercise: 0, total: 0 }
  );
}

function heatColor(minutes) {
  if (!minutes || minutes === 0) return 'rgba(255,255,255,0.06)';
  if (minutes < 60)  return 'rgba(75,123,236,0.22)';
  if (minutes < 150) return 'rgba(75,123,236,0.42)';
  if (minutes < 270) return 'rgba(75,123,236,0.64)';
  if (minutes < 360) return 'rgba(75,123,236,0.83)';
  return '#4b7bec';
}

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-xs border border-white/[0.1] shadow-xl">
      <p className="font-semibold text-[var(--text-primary)] mb-1.5">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="flex justify-between gap-4">
          <span>{p.name}</span>
          <span className="font-mono font-semibold">{minToHHMM(p.value)}</span>
        </p>
      ))}
    </div>
  );
};


// ─── Main component ───────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { state } = useApp();
  const targets   = state.targets || DAILY_TARGETS;
  const todayDate = new Date();

  const [view,           setView]           = useState('7d');
  const [selectedMonth,  setSelectedMonth]  = useState({ year: todayDate.getFullYear(), month: todayDate.getMonth() });
  const [selectedYear,   setSelectedYear]   = useState(todayDate.getFullYear());

  // ── 7-day keys ──────────────────────────────────────────────────────────
  const weekKeys = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(todayDate); d.setDate(d.getDate() - 6 + i);
      return format(d, 'yyyy-MM-dd');
    })
  , []);

  // ── Chart data per view ──────────────────────────────────────────────────
  const weekChartData = useMemo(() =>
    weekKeys.map(k => ({ day: format(parseISO(k), 'EEE'), date: k, ...getDayStats(state.logs, k) }))
  , [state.logs, weekKeys]);

  const monthChartData = useMemo(() => {
    const start = new Date(selectedMonth.year, selectedMonth.month, 1);
    const end   = new Date(selectedMonth.year, selectedMonth.month + 1, 0);
    return eachDayOfInterval({ start, end }).map(d => {
      const k = format(d, 'yyyy-MM-dd');
      return { day: format(d, 'd'), date: k, ...getDayStats(state.logs, k) };
    });
  }, [state.logs, selectedMonth]);

  const quarterChartData = useMemo(() => {
    const end   = endOfWeek(todayDate, { weekStartsOn: 1 });
    const start = startOfWeek(subWeeks(todayDate, 12), { weekStartsOn: 1 });
    return eachWeekOfInterval({ start, end }, { weekStartsOn: 1 }).map(ws => {
      const days  = eachDayOfInterval({ start: ws, end: endOfWeek(ws, { weekStartsOn: 1 }) });
      return { week: format(ws, 'MMM d'), ...sumStatsArr(days.map(d => getDayStats(state.logs, format(d, 'yyyy-MM-dd')))) };
    });
  }, [state.logs]);

  const yearChartData = useMemo(() =>
    eachMonthOfInterval({ start: new Date(selectedYear, 0, 1), end: new Date(selectedYear, 11, 31) }).map(ms => {
      const me = endOfMonth(ms);
      const ce = isAfter(me, todayDate) ? todayDate : me;
      if (isBefore(ce, ms)) return { month: format(ms, 'MMM'), gate: 0, research: 0, conceptual: 0, exercise: 0, total: 0 };
      const days = eachDayOfInterval({ start: ms, end: ce });
      return { month: format(ms, 'MMM'), ...sumStatsArr(days.map(d => getDayStats(state.logs, format(d, 'yyyy-MM-dd')))) };
    })
  , [state.logs, selectedYear]);

  // ── All-time heatmap ─────────────────────────────────────────────────────
  const heatmapWeeks = useMemo(() => {
    const end   = endOfWeek(todayDate, { weekStartsOn: 1 });
    const start = startOfWeek(subWeeks(todayDate, 52), { weekStartsOn: 1 });
    return eachWeekOfInterval({ start, end }, { weekStartsOn: 1 }).map(ws =>
      Array.from({ length: 7 }, (_, i) => {
        const d = addDays(ws, i);
        const k = format(d, 'yyyy-MM-dd');
        const s = getDayStats(state.logs, k);
        return { date: d, key: k, total: s.total, isFuture: isAfter(d, todayDate) };
      })
    );
  }, [state.logs]);

  const heatmapRows = useMemo(() =>
    Array.from({ length: 7 }, (_, di) => heatmapWeeks.map(w => w[di]))
  , [heatmapWeeks]);

  const heatmapMonthLabels = useMemo(() => {
    const labels = []; let lastMonth = -1;
    heatmapWeeks.forEach((week, wi) => {
      const m = week[0].date.getMonth();
      if (m !== lastMonth) { labels.push({ weekIndex: wi, label: format(week[0].date, 'MMM') }); lastMonth = m; }
    });
    return labels;
  }, [heatmapWeeks]);

  // ── Active period keys ────────────────────────────────────────────────────
  const activePeriodKeys = useMemo(() => {
    switch (view) {
      case '7d':    return weekKeys;
      case 'month': return monthChartData.map(d => d.date);
      case 'quarter': {
        const end   = endOfWeek(todayDate, { weekStartsOn: 1 });
        const start = startOfWeek(subWeeks(todayDate, 12), { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end }).map(d => format(d, 'yyyy-MM-dd'));
      }
      case 'year': {
        const ye = new Date(selectedYear, 11, 31);
        const end = isAfter(ye, todayDate) ? todayDate : ye;
        return eachDayOfInterval({ start: new Date(selectedYear, 0, 1), end }).map(d => format(d, 'yyyy-MM-dd'));
      }
      case 'alltime': return Object.keys(state.logs);
      default: return weekKeys;
    }
  }, [view, weekKeys, monthChartData, state.logs, selectedYear]);

  // ── Period stats ──────────────────────────────────────────────────────────
  const periodStats = useMemo(() => {
    const stats         = activePeriodKeys.map(k => getDayStats(state.logs, k));
    const totals        = sumStatsArr(stats);
    const daysOnTarget  = activePeriodKeys.filter(k => {
      const s = getDayStats(state.logs, k);
      return s.gate >= targets.gate && s.research >= targets.research;
    }).length;
    const daysWithData  = activePeriodKeys.filter(k => (state.logs[k]?.length || 0) > 0).length;
    const totalSessions = activePeriodKeys.reduce((a, k) => a + (state.logs[k]?.length || 0), 0);
    return { ...totals, daysOnTarget, daysWithData, totalSessions, totalDays: activePeriodKeys.length };
  }, [activePeriodKeys, state.logs, targets]);

  // ── Project distribution ──────────────────────────────────────────────────
  const projectDist = useMemo(() => {
    const byProject = {};
    activePeriodKeys.flatMap(k => state.logs[k] || []).forEach(l => {
      if (l.projectId) byProject[l.projectId] = (byProject[l.projectId] || 0) + (l.durationMinutes || 0);
    });
    return Object.entries(byProject)
      .map(([id, minutes]) => { const p = state.projects.find(p => p.id === id); return { id, name: p?.name || id, minutes, color: p?.color || '#6b7280' }; })
      .sort((a, b) => b.minutes - a.minutes).slice(0, 8);
  }, [activePeriodKeys, state.logs, state.projects]);

  // ── All-time monthly chart ────────────────────────────────────────────────
  const allTimeMonthlyData = useMemo(() => {
    if (view !== 'alltime') return [];
    const keys = Object.keys(state.logs).sort();
    if (!keys.length) return [];
    const months = eachMonthOfInterval({ start: startOfMonth(parseISO(keys[0])), end: endOfMonth(todayDate) });
    return months.map(ms => {
      const ce   = isAfter(endOfMonth(ms), todayDate) ? todayDate : endOfMonth(ms);
      const days = eachDayOfInterval({ start: ms, end: ce });
      return { month: format(ms, 'MMM yy'), ...sumStatsArr(days.map(d => getDayStats(state.logs, format(d, 'yyyy-MM-dd')))) };
    });
  }, [state.logs, view]);

  // ── Navigation ────────────────────────────────────────────────────────────
  const canGoForward = view === 'month'
    ? !(selectedMonth.year === todayDate.getFullYear() && selectedMonth.month === todayDate.getMonth())
    : view === 'year' ? selectedYear < todayDate.getFullYear() : false;

  const goBack = () => {
    if (view === 'month') { const d = subMonths(new Date(selectedMonth.year, selectedMonth.month), 1); setSelectedMonth({ year: d.getFullYear(), month: d.getMonth() }); }
    else if (view === 'year') setSelectedYear(y => y - 1);
  };
  const goForward = () => {
    if (view === 'month' && canGoForward) { const d = addMonths(new Date(selectedMonth.year, selectedMonth.month), 1); setSelectedMonth({ year: d.getFullYear(), month: d.getMonth() }); }
    else if (view === 'year' && canGoForward) setSelectedYear(y => y + 1);
  };

  // ── Chart config ──────────────────────────────────────────────────────────
  const chartData = view === '7d' ? weekChartData : view === 'month' ? monthChartData : view === 'quarter' ? quarterChartData : view === 'year' ? yearChartData : allTimeMonthlyData;
  const chartXKey = view === 'month' ? 'day' : view === 'quarter' ? 'week' : view === 'year' ? 'month' : view === 'alltime' ? 'month' : 'day';
  const barSize   = view === 'month' ? 6 : view === 'quarter' ? 14 : view === 'alltime' ? 10 : 22;

  const statCards = [
    { label: 'GATE',          value: minToHHMM(periodStats.gate),       sub: `${minToHHMM(targets.gate)}/day`,       icon: BookOpen,   color: '#f59e0b' },
    { label: 'Research',      value: minToHHMM(periodStats.research),   sub: `${minToHHMM(targets.research)}/day`,   icon: Microscope, color: '#4b7bec' },
    { label: 'Conceptual',    value: minToHHMM(periodStats.conceptual), sub: `${minToHHMM(targets.conceptual)}/day`, icon: Brain,      color: '#06b6d4' },
    { label: 'Exercise',      value: minToHHMM(periodStats.exercise),   sub: `${minToHHMM(targets.exercise)}/day`,   icon: Dumbbell,   color: '#22c55e' },
    { label: 'Days on Target',value: `${periodStats.daysOnTarget}/${periodStats.totalDays}`, sub: 'GATE + Research ✓', icon: Award, color: '#f43f5e' },
    { label: 'Sessions',      value: periodStats.totalSessions,          sub: `${periodStats.daysWithData} active days`, icon: Zap, color: '#8b5cf6' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="page-container"
    >
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Analytics</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Track your progress over time</p>
      </div>

      {/* View switcher */}
      <div className="mb-4 flex flex-col items-center gap-3">
        <div className="flex items-center bg-[var(--bg-card)] rounded-2xl p-1 border border-[var(--border)] w-fit">
          {VIEWS.map(v => (
            <motion.button
              key={v.id}
              onClick={() => setView(v.id)}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                'px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
                view === v.id
                  ? 'bg-[var(--accent)] text-white shadow-sm'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              )}
            >
              {v.label}
            </motion.button>
          ))}
        </div>

        {/* Month/Year navigator */}
        <AnimatePresence mode="wait">
          {(view === 'month' || view === 'year') && (
            <motion.div
              key={view}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <button onClick={goBack} className="p-1.5 rounded-xl hover:bg-white/[0.07] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-bold text-[var(--text-primary)] min-w-[130px] text-center">
                {view === 'month' ? format(new Date(selectedMonth.year, selectedMonth.month), 'MMMM yyyy') : selectedYear}
              </span>
              <button onClick={goForward} disabled={!canGoForward} className="p-1.5 rounded-xl hover:bg-white/[0.07] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-25 disabled:cursor-not-allowed">
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        {statCards.map(s => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${s.color}18` }}>
                <s.icon size={15} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5">{s.label}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* All-time: heatmap + monthly totals */}
      {view === 'alltime' ? (
        <div className="space-y-5">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">Contribution Heatmap</h3>
            <p className="text-[11px] text-[var(--text-muted)] mb-4">Last 52 weeks — color = productive hours per day</p>
            <div className="overflow-x-auto pb-1">
              <div>
                <div className="relative h-5 ml-8 mb-0.5">
                  {heatmapMonthLabels.map(({ weekIndex, label }) => (
                    <span key={label + weekIndex} className="absolute text-[9px] text-[var(--text-muted)] font-medium" style={{ left: weekIndex * 14 }}>{label}</span>
                  ))}
                </div>
                <div className="flex flex-col gap-[2px]">
                  {heatmapRows.map((row, di) => (
                    <div key={di} className="flex items-center gap-[2px]">
                      <span className="w-7 text-[9px] text-[var(--text-muted)] text-right pr-1.5 shrink-0">{di % 2 === 0 ? DAY_LABELS[di].slice(0, 3) : ''}</span>
                      {row.map((cell, wi) => (
                        <div
                          key={wi}
                          title={cell.isFuture ? '' : `${format(cell.date, 'MMM d, yyyy')}: ${minToHHMM(cell.total)}`}
                          style={{ width: 11, height: 11, borderRadius: 2, flexShrink: 0, backgroundColor: cell.isFuture ? 'transparent' : heatColor(cell.total) }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 mt-3 ml-8">
                  <span className="text-[9px] text-[var(--text-muted)] mr-1">Less</span>
                  {[0, 30, 90, 200, 300, 420].map(v => (
                    <div key={v} style={{ width: 11, height: 11, borderRadius: 2, backgroundColor: heatColor(v) }} />
                  ))}
                  <span className="text-[9px] text-[var(--text-muted)] ml-1">More</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Monthly Breakdown (All Time)</h3>
            {allTimeMonthlyData.length === 0 ? (
              <div className="flex items-center justify-center h-40 text-[var(--text-muted)] text-sm">No data yet</div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={allTimeMonthlyData} barSize={10} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `${Math.round(v / 60)}h`} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={28} />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
                  <Bar dataKey="gate"       name="GATE"       stackId="a" fill="#f59e0b" />
                  <Bar dataKey="research"   name="Research"   stackId="a" fill="#4b7bec" />
                  <Bar dataKey="conceptual" name="Conceptual" stackId="a" fill="#06b6d4" />
                  <Bar dataKey="exercise"   name="Exercise"   stackId="a" fill="#22c55e" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <ProjectDistCard projectDist={projectDist} />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 glass-card p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
                {view === '7d'      ? 'Daily Breakdown — Last 7 Days' :
                 view === 'month'   ? `Daily Breakdown — ${format(new Date(selectedMonth.year, selectedMonth.month), 'MMMM yyyy')}` :
                 view === 'quarter' ? 'Weekly Breakdown — Last 13 Weeks' :
                                     `Monthly Breakdown — ${selectedYear}`}
              </h3>
              {periodStats.totalSessions === 0 ? (
                <div className="flex items-center justify-center h-48 text-[var(--text-muted)] text-sm">No data for this period — start logging sessions!</div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={chartData} barSize={barSize} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey={chartXKey} tick={{ fontSize: view === 'month' ? 9 : 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} interval={view === 'month' ? 2 : 0} />
                    <YAxis tickFormatter={v => `${Math.round(v / 60)}h`} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={28} />
                    <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Legend wrapperStyle={{ fontSize: 11, color: 'var(--text-muted)' }} />
                    <Bar dataKey="gate"       name="GATE"       stackId="a" fill="#f59e0b" />
                    <Bar dataKey="research"   name="Research"   stackId="a" fill="#4b7bec" />
                    <Bar dataKey="conceptual" name="Conceptual" stackId="a" fill="#06b6d4" />
                    <Bar dataKey="exercise"   name="Exercise"   stackId="a" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <ProjectDistCard projectDist={projectDist} />
          </div>

          {view === 'quarter' && <QuarterMonthComparison logs={state.logs} todayDate={todayDate} />}
          {view === 'year'    && <YearBestMonth data={yearChartData} />}
        </div>
      )}
    </motion.div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProjectDistCard({ projectDist }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Project Distribution</h3>
      {projectDist.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-[var(--text-muted)] text-xs text-center px-4">
          No project data yet.<br />Assign projects when logging sessions.
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={projectDist} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="minutes">
                {projectDist.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={v => [minToHHMM(v), '']} contentStyle={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
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
  );
}

function QuarterMonthComparison({ logs, todayDate }) {
  const months = useMemo(() =>
    [-2, -1, 0].map(offset => {
      const ms  = addMonths(startOfMonth(todayDate), offset);
      const ce  = isAfter(endOfMonth(ms), todayDate) ? todayDate : endOfMonth(ms);
      const days = eachDayOfInterval({ start: ms, end: ce });
      return { label: format(ms, 'MMMM'), ...sumStatsArr(days.map(d => getDayStats(logs, format(d, 'yyyy-MM-dd')))) };
    })
  , [logs]);

  const maxTotal = Math.max(...months.map(m => m.total), 1);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">3-Month Comparison</h3>
      <div className="grid grid-cols-3 gap-4">
        {months.map(m => (
          <div key={m.label}>
            <p className="text-xs font-semibold text-[var(--text-secondary)] mb-2">{m.label}</p>
            {[
              { label: 'GATE', value: m.gate, color: '#f59e0b' },
              { label: 'Research', value: m.research, color: '#4b7bec' },
              { label: 'Conceptual', value: m.conceptual, color: '#06b6d4' },
              { label: 'Exercise', value: m.exercise, color: '#22c55e' },
            ].map(row => (
              <div key={row.label} className="mb-2">
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="text-[var(--text-muted)]">{row.label}</span>
                  <span style={{ color: row.color }} className="font-mono">{minToHHMM(row.value)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (row.value / maxTotal) * 100)}%`, backgroundColor: row.color }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function YearBestMonth({ data }) {
  const best = data.reduce((a, b) => b.total > a.total ? b : a, { total: 0 });
  if (!best.total) return null;
  return (
    <div className="glass-card p-4 flex items-center gap-4 border border-[var(--accent)]/20">
      <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center shrink-0">
        <TrendingUp size={18} className="text-[var(--accent)]" />
      </div>
      <div>
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Best Month</p>
        <p className="text-sm font-bold text-[var(--text-primary)]">{best.month} — {minToHHMM(best.total)} total</p>
        <p className="text-[11px] text-[var(--text-muted)]">
          GATE {minToHHMM(best.gate)} · Research {minToHHMM(best.research)} · Exercise {minToHHMM(best.exercise)}
        </p>
      </div>
    </div>
  );
}

