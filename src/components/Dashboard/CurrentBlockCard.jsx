import { motion } from 'framer-motion';
import { useCurrentBlock } from '../../hooks/useCurrentBlock';
import { msToHHMMSS, minutesRemainingInBlock, blockProgress, minToHHMM } from '../../utils/time';
import { CATEGORIES } from '../../data/schedule';
import { Clock, ArrowRight, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function CurrentBlockCard() {
  const { currentBlock, nextBlock, minutesLeft } = useCurrentBlock();

  // Live millisecond countdown
  const [msLeft, setMsLeft] = useState(minutesLeft * 60 * 1000);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = () => {
      if (currentBlock) {
        const newMs = minutesRemainingInBlock(currentBlock) * 60 * 1000;
        setMsLeft(newMs);
        setProgress(blockProgress(currentBlock));
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [currentBlock]);

  if (!currentBlock) {
    return (
      <div className="glass-card p-6 flex flex-col items-center justify-center min-h-[180px] text-center">
        <Clock size={32} className="text-[var(--text-muted)] mb-3" />
        <p className="text-[var(--text-secondary)] font-medium">Schedule gap</p>
        {nextBlock && (
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Next: <span className="font-semibold" style={{ color: nextBlock.color }}>{nextBlock.label}</span> at {nextBlock.start}
          </p>
        )}
      </div>
    );
  }

  const cat = CATEGORIES[currentBlock.category] || CATEGORIES.personal;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 animate-glow-pulse relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-[0.04] rounded-2xl"
        style={{ background: `radial-gradient(circle at 30% 50%, ${currentBlock.color}, transparent 70%)` }}
      />

      <div className="relative flex items-start justify-between gap-4">
        {/* Left: Block info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{currentBlock.icon}</span>
            <span
              className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ color: cat.color, backgroundColor: cat.bg }}
            >
              Active Block
            </span>
          </div>

          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1 leading-tight">
            {currentBlock.label}
          </h2>

          {currentBlock.description && (
            <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2">
              {currentBlock.description}
            </p>
          )}

          {/* Time range */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Clock size={11} />
            <span>{currentBlock.start}</span>
            <ArrowRight size={10} />
            <span>{currentBlock.end}</span>
          </div>

          {/* Next block */}
          {nextBlock && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Next</span>
              <span className="text-xs font-medium" style={{ color: nextBlock.color }}>
                {nextBlock.label}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">@ {nextBlock.start}</span>
            </div>
          )}
        </div>

        {/* Right: Countdown ring */}
        <div className="flex flex-col items-center shrink-0">
          <div className="relative w-28 h-28">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Track */}
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                className="text-white/[0.06]"
              />
              {/* Progress */}
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke={currentBlock.color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{
                  transition: 'stroke-dashoffset 1s linear',
                  filter: `drop-shadow(0 0 6px ${currentBlock.color}88)`,
                }}
              />
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-base font-bold text-[var(--text-primary)] tabular-nums leading-none">
                {msToHHMMSS(msLeft)}
              </span>
              <span className="text-[9px] text-[var(--text-muted)] mt-0.5 uppercase tracking-wider">
                remaining
              </span>
            </div>
          </div>

          {/* Min target */}
          {currentBlock.minTarget && currentBlock.trackable && (
            <div className="flex items-center gap-1 mt-1">
              <Zap size={10} className="text-amber-400" />
              <span className="text-[10px] text-[var(--text-muted)]">
                Target: {minToHHMM(currentBlock.minTarget)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar (block elapsed) */}
      <div className="mt-4 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: currentBlock.color }}
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
