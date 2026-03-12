import { motion } from 'framer-motion';
import clsx from 'clsx';
import { TIME_BLOCKS } from '../../data/schedule';
import { timeStrToMinutes, nowInMinutes } from '../../utils/time';

function getBlockStatus(block) {
  const now = nowInMinutes();
  const start = timeStrToMinutes(block.start);
  let end = timeStrToMinutes(block.end);
  if (end < start) end += 24 * 60;
  let adjustedNow = now;
  if (end > 24 * 60 && now < start) adjustedNow += 24 * 60;

  if (adjustedNow >= start && adjustedNow < end) return 'active';
  if (adjustedNow >= end) return 'done';
  return 'upcoming';
}

export default function DayTimeline({ logsByBlock = {} }) {
  // Filter to daytime blocks only (skip wind-down/sleep for display)
  const blocks = TIME_BLOCKS.filter(b => b.id !== 'wind-down');

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Today's Schedule</h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-3 bottom-3 w-px bg-white/[0.06]" />

        <div className="space-y-1">
          {blocks.map((block, idx) => {
            const status = getBlockStatus(block);
            const logs = logsByBlock[block.id] || [];
            const loggedMin = logs.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);

            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={clsx(
                  'flex items-start gap-3 py-2 px-2 rounded-xl transition-colors group',
                  status === 'active' && 'bg-white/[0.05]',
                  status !== 'active' && 'hover:bg-white/[0.03]'
                )}
              >
                {/* Dot */}
                <div className="relative z-10 mt-1 shrink-0">
                  {status === 'active' ? (
                    <div className="relative">
                      <div
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: block.color, boxShadow: `0 0 8px ${block.color}` }}
                      />
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-40"
                        style={{ backgroundColor: block.color }}
                      />
                    </div>
                  ) : (
                    <div
                      className={clsx('w-3 h-3 rounded-full border-2', status === 'done' ? 'opacity-40' : 'opacity-60')}
                      style={{
                        borderColor: block.color,
                        backgroundColor: status === 'done' ? block.color : 'transparent',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[10px] text-[var(--text-muted)] font-mono tabular-nums shrink-0">
                        {block.start}
                      </span>
                      <span
                        className={clsx(
                          'text-xs font-medium truncate',
                          status === 'active'
                            ? 'text-[var(--text-primary)]'
                            : status === 'done'
                            ? 'text-[var(--text-muted)] line-through decoration-1'
                            : 'text-[var(--text-secondary)]'
                        )}
                      >
                        {block.label}
                      </span>
                      {status === 'active' && (
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0"
                          style={{ color: block.color, backgroundColor: `${block.color}20` }}
                        >
                          Now
                        </span>
                      )}
                    </div>

                    {/* Logged time */}
                    {block.trackable && loggedMin > 0 && (
                      <span className="text-[10px] text-emerald-400 font-mono shrink-0">
                        +{loggedMin}m
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
