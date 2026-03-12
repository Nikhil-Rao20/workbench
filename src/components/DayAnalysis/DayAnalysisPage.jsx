import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';
import {
  ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  BookOpen, Microscope, Brain, Dumbbell, Clock, BarChart2,
  Flame, ListChecks,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  todayKey, dateToKey, keyToDate, minToHHMM, friendlyDate,
} from '../../utils/time';
import { RESEARCH_BLOCK_IDS, DAILY_TARGETS, TIME_BLOCKS } from '../../data/schedule';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Block label helper
function blockLabel(blockId) {
  const b = TIME_BLOCKS.find(b => b.id === blockId);
  return b?.label || blockId;
}

// Custom tooltip for pie chart
function CustomPieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-2.5 text-xs shadow-lg">
      <p className="font-semibold text-[var(--text-primary)]">{payload[0].name}</p>
      <p style={{ color: payload[0].payload.fill }}>{minToHHMM(payload[0].value)}</p>
    </div>
  );
}

// Target card with progress ring SVG
function TargetCard({ label, icon: Icon, actual, target, color, met }) {
  const pct = Math.min(1, actual / (target || 1));
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card p-4 flex flex-col gap-2 border ${met ? 'border-[var(--accent)]/30' : 'border-[var(--border)]'}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}18` }}
          >
            <Icon size={13} style={{ color }} />
          </div>
          <span className="text-xs font-semibold text-[var(--text-secondary)]">{label}</span>
        </div>
        {met ? (
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
        ) : (
          <XCircle size={15} className="text-[var(--text-muted)] shrink-0" />
        )}
      </div>

      {/* Progress ring */}
      <div className="flex items-center gap-3">
        <svg width={64} height={64} viewBox="0 0 64 64">
          <circle cx={32} cy={32} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth={5} fill="none" />
          <circle
            cx={32} cy={32} r={r}
            stroke={met ? '#10b981' : color}
            strokeWidth={5} fill="none"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
          <text x={32} y={36} textAnchor="middle" fontSize={10} fontWeight={600} fill={met ? '#10b981' : color}>
            {Math.round(pct * 100)}%
          </text>
        </svg>
        <div>
          <p className="text-lg font-bold" style={{ color: met ? '#10b981' : color }}>
            {minToHHMM(actual)}
          </p>
          <p className="text-[10px] text-[var(--text-muted)]">
            of {minToHHMM(target)} target
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct * 100}%`, backgroundColor: met ? '#10b981' : color }}
        />
      </div>
    </motion.div>
  );
}

export default function DayAnalysisPage() {
  const { state } = useApp();
  const targets = state.targets || DAILY_TARGETS;
  const [selectedKey, setSelectedKey] = useState(todayKey());

  const navigate = (delta) => {
    const d = keyToDate(selectedKey);
    d.setDate(d.getDate() + delta);
    const next = dateToKey(d);
    // Don't go into future
    if (next <= todayKey()) setSelectedKey(next);
  };

  const dayLogs = useMemo(() => state.logs[selectedKey] || [], [state.logs, selectedKey]);

  // ── Totals by category ────────────────────────────────────────────────────
  const totalGate = useMemo(
    () => dayLogs.filter(l => l.blockId === 'gate').reduce((a, l) => a + (l.durationMinutes || 0), 0),
    [dayLogs]
  );
  const totalResearch = useMemo(
    () => dayLogs.filter(l => RESEARCH_BLOCK_IDS.includes(l.blockId)).reduce((a, l) => a + (l.durationMinutes || 0), 0),
    [dayLogs]
  );
  const totalConceptual = useMemo(
    () => dayLogs.filter(l => l.blockId === 'conceptual').reduce((a, l) => a + (l.durationMinutes || 0), 0),
    [dayLogs]
  );
  const totalExercise = useMemo(
    () => dayLogs.filter(l => l.blockId === 'exercise').reduce((a, l) => a + (l.durationMinutes || 0), 0),
    [dayLogs]
  );
  const totalMinutes = totalGate + totalResearch + totalConceptual + totalExercise;

  const gateOk  = totalGate      >= targets.gate;
  const resOk   = totalResearch   >= targets.research;
  const concOk  = totalConceptual >= targets.conceptual;
  const exOk    = totalExercise   >= targets.exercise;
  const targetsMetCount = [gateOk, resOk, concOk, exOk].filter(Boolean).length;
  const allMet = targetsMetCount === 4;

  // ── Per-block breakdown ────────────────────────────────────────────────────
  const blockBreakdown = useMemo(() => {
    const map = {};
    dayLogs.forEach(l => {
      map[l.blockId] = (map[l.blockId] || 0) + (l.durationMinutes || 0);
    });
    return Object.entries(map)
      .map(([id, mins]) => ({
        id,
        name: blockLabel(id),
        minutes: mins,
        fill: TIME_BLOCKS.find(b => b.id === id)?.color || '#6b7280',
      }))
      .sort((a, b) => b.minutes - a.minutes);
  }, [dayLogs]);

  // ── Per-project breakdown ──────────────────────────────────────────────────
  const projectBreakdown = useMemo(() => {
    const map = {};
    dayLogs.forEach(l => {
      if (l.projectId) {
        map[l.projectId] = (map[l.projectId] || 0) + (l.durationMinutes || 0);
      }
    });
    return Object.entries(map)
      .map(([id, mins]) => {
        const proj = state.projects.find(p => p.id === id);
        return { id, name: proj?.name || id, minutes: mins, color: proj?.color || '#6b7280' };
      })
      .sort((a, b) => b.minutes - a.minutes);
  }, [dayLogs, state.projects]);

  const isToday = selectedKey === todayKey();
  const isYesterday = (() => {
    const y = new Date(); y.setDate(y.getDate() - 1);
    return selectedKey === dateToKey(y);
  })();

  const dateLabel = isToday
    ? 'Today'
    : isYesterday
    ? 'Yesterday'
    : friendlyDate(keyToDate(selectedKey));

  const TARGETS_CONFIG = [
    { label: 'GATE',       icon: BookOpen,    actual: totalGate,       target: targets.gate,       color: '#f59e0b',  met: gateOk },
    { label: 'Research',   icon: Microscope,  actual: totalResearch,   target: targets.research,   color: '#4b7bec',  met: resOk  },
    { label: 'Conceptual', icon: Brain,       actual: totalConceptual, target: targets.conceptual, color: '#06b6d4',  met: concOk },
    { label: 'Exercise',   icon: Dumbbell,    actual: totalExercise,   target: targets.exercise,   color: '#10b981',  met: exOk   },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="page-container"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Day Report</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Detailed breakdown of a single day
          </p>
        </div>

        {/* Date navigation */}
        <div className="flex items-center gap-2 glass-card px-3 py-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-lg hover:bg-white/[0.06] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="text-center px-2">
            <p className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap">{dateLabel}</p>
            <p className="text-[10px] text-[var(--text-muted)]">{selectedKey}</p>
          </div>
          <button
            onClick={() => navigate(1)}
            disabled={isToday}
            className="p-1 rounded-lg hover:bg-white/[0.06] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* ── Summary banner ── */}
      <motion.div
        key={selectedKey}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-card p-4 mb-5 flex items-center gap-4 flex-wrap border ${allMet ? 'border-emerald-500/30 bg-emerald-500/[0.04]' : 'border-[var(--border)]'}`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {allMet
            ? <Flame size={20} className="text-emerald-400 shrink-0" />
            : <ListChecks size={20} className="text-[var(--text-muted)] shrink-0" />
          }
          <div>
            <p className={`text-sm font-bold ${allMet ? 'text-emerald-400' : 'text-[var(--text-primary)]'}`}>
              {allMet
                ? 'All targets completed! Perfect day.'
                : `${targetsMetCount} / 4 targets met`
              }
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Total focused time: {minToHHMM(totalMinutes)} &bull; {dayLogs.length} sessions logged
            </p>
          </div>
        </div>
        {/* Mini target status chips */}
        <div className="flex gap-1.5 flex-wrap">
          {TARGETS_CONFIG.map(t => (
            <span
              key={t.label}
              className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                color: t.met ? '#10b981' : t.color,
                backgroundColor: t.met ? 'rgba(16,185,129,0.1)' : `${t.color}15`,
              }}
            >
              {t.met ? <CheckCircle2 size={9} /> : <XCircle size={9} />}
              {t.label}
            </span>
          ))}
        </div>
      </motion.div>

      {dayLogs.length === 0 ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center gap-3 text-center">
          <BarChart2 size={32} className="text-[var(--text-muted)]" />
          <p className="text-sm font-medium text-[var(--text-secondary)]">No sessions logged for this day</p>
          <p className="text-xs text-[var(--text-muted)]">Use the Timer or Log page to record your work sessions.</p>
        </div>
      ) : (
        <>
          {/* ── Target Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {TARGETS_CONFIG.map(t => (
              <TargetCard key={t.label} {...t} />
            ))}
          </div>

          {/* ── Charts Row ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {/* Time by block — horizontal bars */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Clock size={14} className="text-[var(--text-muted)]" />
                Time by Block
              </h3>
              <div className="space-y-3">
                {blockBreakdown.map(b => {
                  const pct = totalMinutes > 0 ? (b.minutes / totalMinutes) * 100 : 0;
                  return (
                    <div key={b.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[var(--text-secondary)] font-medium">{b.name}</span>
                        <span className="text-xs font-mono font-semibold" style={{ color: b.fill }}>
                          {minToHHMM(b.minutes)}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: b.fill }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project pie chart */}
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Microscope size={14} className="text-[var(--text-muted)]" />
                Time by Project
              </h3>
              {projectBreakdown.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-xs text-[var(--text-muted)]">
                  No project tags on sessions
                </div>
              ) : (
                <>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={projectBreakdown}
                        dataKey="minutes"
                        nameKey="name"
                        cx="50%" cy="50%"
                        innerRadius={38}
                        outerRadius={60}
                        paddingAngle={3}
                      >
                        {projectBreakdown.map((p, i) => (
                          <Cell key={i} fill={p.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1.5 mt-1">
                    {projectBreakdown.map(p => (
                      <div key={p.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                          <span className="text-[var(--text-muted)] truncate">{p.name}</span>
                        </div>
                        <span className="font-mono text-[var(--text-secondary)] shrink-0 ml-2">
                          {minToHHMM(p.minutes)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Session Log ── */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <ListChecks size={14} className="text-[var(--text-muted)]" />
              Sessions ({dayLogs.length})
            </h3>
            <div className="space-y-2">
              {[...dayLogs].reverse().map((log) => {
                const block = TIME_BLOCKS.find(b => b.id === log.blockId);
                const proj = state.projects.find(p => p.id === log.projectId);
                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.025] border border-[var(--border)] hover:bg-white/[0.04] transition-colors"
                  >
                    {/* Block color dot */}
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: block?.color || '#6b7280' }}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                          {log.taskName || '—'}
                        </span>
                        {proj && (
                          <span
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full truncate"
                            style={{ color: proj.color, backgroundColor: `${proj.color}18` }}
                          >
                            {proj.name}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                        {block?.label || log.blockId}
                        {log.notes && ` · ${log.notes}`}
                      </p>
                    </div>

                    <span
                      className="text-xs font-mono font-semibold shrink-0 px-2 py-0.5 rounded-lg"
                      style={{
                        color: block?.color || '#6b7280',
                        backgroundColor: `${block?.color || '#6b7280'}15`,
                      }}
                    >
                      {minToHHMM(log.durationMinutes || 0)}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
