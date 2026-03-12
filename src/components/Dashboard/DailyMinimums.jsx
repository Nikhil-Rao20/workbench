import { motion } from 'framer-motion';
import { BookOpen, Microscope, Dumbbell, Brain, TrendingUp } from 'lucide-react';
import { DAILY_TARGETS, RESEARCH_BLOCK_IDS } from '../../data/schedule';
import { minToHHMM } from '../../utils/time';
import clsx from 'clsx';

function Ring({ value, total, color, size = 56, stroke = 5 }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(1, total > 0 ? value / total : 0);
  const offset = circ * (1 - pct);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="currentColor"
        strokeWidth={stroke}
        className="text-white/[0.07]"
      />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{ filter: `drop-shadow(0 0 4px ${color}66)` }}
      />
    </svg>
  );
}

function MinimumCard({ icon: Icon, label, current, target, color, unit = 'min' }) {
  const pct = Math.min(100, target > 0 ? Math.round((current / target) * 100) : 0);
  const achieved = current >= target;

  const displayCurrent = unit === 'min' ? minToHHMM(current) : `${current}${unit}`;
  const displayTarget = unit === 'min' ? minToHHMM(target) : `${target}${unit}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-4 flex items-center gap-4"
    >
      {/* Progress ring */}
      <div className="relative shrink-0">
        <Ring value={current} total={target} color={color} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={14} style={{ color }} />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-[var(--text-secondary)]">{label}</p>
          {achieved && (
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded-full">
              ✓ Done
            </span>
          )}
        </div>

        {/* Bar */}
        <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden mb-1.5">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
          />
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-sm font-bold" style={{ color }}>
            {displayCurrent}
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">/ {displayTarget}</span>
          <span className="text-[10px] text-[var(--text-muted)] ml-auto">{pct}%</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DailyMinimums({ todayLogs = [] }) {
  // Calculate totals from today's logs
  const gateMin = todayLogs
    .filter(l => l.blockId === 'gate')
    .reduce((a, l) => a + (l.durationMinutes || 0), 0);

  const researchMin = todayLogs
    .filter(l => RESEARCH_BLOCK_IDS.includes(l.blockId))
    .reduce((a, l) => a + (l.durationMinutes || 0), 0);

  const conceptualMin = todayLogs
    .filter(l => l.blockId === 'conceptual')
    .reduce((a, l) => a + (l.durationMinutes || 0), 0);

  const exerciseMin = todayLogs
    .filter(l => l.blockId === 'exercise')
    .reduce((a, l) => a + (l.durationMinutes || 0), 0);

  const nightMin = todayLogs
    .filter(l => l.blockId === 'night')
    .reduce((a, l) => a + (l.durationMinutes || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">Daily Minimums</h3>
        <TrendingUp size={14} className="text-[var(--text-muted)]" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <MinimumCard
          icon={BookOpen}
          label="GATE"
          current={gateMin}
          target={DAILY_TARGETS.gate}
          color="#f59e0b"
        />
        <MinimumCard
          icon={Microscope}
          label="Research"
          current={researchMin}
          target={DAILY_TARGETS.research}
          color="#6366f1"
        />
        <MinimumCard
          icon={Brain}
          label="Conceptual"
          current={conceptualMin}
          target={DAILY_TARGETS.conceptual}
          color="#06b6d4"
        />
        <MinimumCard
          icon={Dumbbell}
          label="Exercise"
          current={exerciseMin}
          target={DAILY_TARGETS.exercise}
          color="#22c55e"
        />
      </div>
    </div>
  );
}
