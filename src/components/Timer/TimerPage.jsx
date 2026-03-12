import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Square, RotateCcw, Clock, ChevronDown, AlertCircle } from 'lucide-react';
import { msToHHMMSS, minToHHMM, minutesRemainingInBlock, blockProgress, todayKey } from '../../utils/time';
import { TIME_BLOCKS, WEEKLY_ROTATION } from '../../data/schedule';
import { useApp, addLog } from '../../context/AppContext';
import { useTimer } from '../../hooks/useTimer';
import { useCurrentBlock } from '../../hooks/useCurrentBlock';
import clsx from 'clsx';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// ─── Block countdown ─────────────────────────────────────────────────────────
function BlockCountdown() {
  const { currentBlock, nextBlock, minutesLeft } = useCurrentBlock();
  const [msLeft, setMsLeft] = useState(minutesLeft * 60 * 1000);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const tick = () => {
      if (currentBlock) {
        setMsLeft(minutesRemainingInBlock(currentBlock) * 60 * 1000);
        setPct(blockProgress(currentBlock));
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [currentBlock]);

  if (!currentBlock) {
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
        <Clock size={40} className="text-[var(--text-muted)] mb-3 opacity-50" />
        <p className="text-[var(--text-secondary)] font-medium">No active block right now</p>
        {nextBlock && (
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Next: <span className="font-semibold" style={{ color: nextBlock.color }}>{nextBlock.label}</span> @ {nextBlock.start}
          </p>
        )}
      </div>
    );
  }

  const circ = 2 * Math.PI * 54;

  return (
    <div className="glass-card p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: `radial-gradient(circle at center, ${currentBlock.color}, transparent 70%)` }}
      />
      <div className="relative flex flex-col items-center">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-5">
          Block Countdown
        </p>

        {/* Ring */}
        <div className="relative mb-5">
          <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
            <circle cx="70" cy="70" r="54" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/[0.06]" />
            <motion.circle
              cx="70" cy="70" r="54"
              fill="none"
              stroke={currentBlock.color}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct)}
              style={{
                transition: 'stroke-dashoffset 1s linear',
                filter: `drop-shadow(0 0 8px ${currentBlock.color}88)`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-3xl font-bold text-[var(--text-primary)] tabular-nums tracking-tight leading-none">
              {msToHHMMSS(msLeft)}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] mt-1 uppercase tracking-wider">remaining</span>
          </div>
        </div>

        {/* Block info */}
        <p className="text-base font-bold text-[var(--text-primary)] mb-1">{currentBlock.label}</p>
        <p className="text-xs text-[var(--text-muted)]">{currentBlock.start} – {currentBlock.end}</p>

        {msLeft <= 10 * 60 * 1000 && msLeft > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center gap-1.5 text-amber-400 text-xs font-semibold"
          >
            <AlertCircle size={13} />
            Ending soon — wrap up!
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Stopwatch ────────────────────────────────────────────────────────────────
function Stopwatch() {
  const { state, dispatch } = useApp();
  const timer = useTimer();
  const { currentBlock } = useCurrentBlock();

  const [selectedBlock, setSelectedBlock] = useState(currentBlock?.id || 'research1');
  const [selectedProject, setSelectedProject] = useState('');
  const [taskName, setTaskName] = useState('');
  const [notes, setNotes] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lastSession, setLastSession] = useState(null);

  // Sync selected block with current block when timer is NOT running
  useEffect(() => {
    if (!timer.isRunning && currentBlock) {
      setSelectedBlock(currentBlock.id);
    }
  }, [currentBlock, timer.isRunning]);

  const activeProjects = state.projects.filter(p => p.active);
  const trackableBlocks = TIME_BLOCKS.filter(b => b.trackable);

  const handleStart = () => {
    timer.start({
      blockId: selectedBlock,
      projectId: selectedProject || null,
      taskName,
      notes,
    });
  };

  const handleStop = () => {
    const session = timer.stop();
    setLastSession(session);
    if (session.durationMinutes >= 1) {
      setShowSaveModal(true);
    }
  };

  const handleSave = () => {
    if (!lastSession) return;
    addLog(dispatch, {
      blockId: lastSession.blockId,
      projectId: lastSession.projectId || null,
      taskName: lastSession.taskName || 'Work session',
      notes: lastSession.notes || '',
      durationMinutes: lastSession.durationMinutes,
      startedAt: lastSession.startTime,
      endedAt: lastSession.endTime,
    });
    setShowSaveModal(false);
    setLastSession(null);
    setTaskName('');
    setNotes('');
  };

  const elapsedMs = timer.elapsed;

  return (
    <div className="glass-card p-8 flex flex-col items-center">
      <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-5">
        Stopwatch
      </p>

      {/* Big timer display */}
      <motion.div
        animate={timer.isRunning && !timer.isPaused ? { scale: [1, 1.01, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="font-mono text-5xl font-bold text-[var(--text-primary)] tabular-nums tracking-tight mb-6"
      >
        {msToHHMMSS(elapsedMs)}
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-7">
        {!timer.isRunning ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
          >
            <Play size={22} className="text-white ml-0.5" />
          </motion.button>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={timer.isPaused ? timer.resume : timer.pause}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
            >
              {timer.isPaused
                ? <Play size={22} className="text-white ml-0.5" />
                : <Pause size={22} className="text-white" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30"
            >
              <Square size={20} className="text-white" />
            </motion.button>
          </>
        )}

        {!timer.isRunning && elapsedMs === 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={timer.reset}
            className="w-10 h-10 rounded-full border border-white/[0.1] text-[var(--text-muted)] flex items-center justify-center hover:bg-white/[0.06]"
          >
            <RotateCcw size={15} />
          </motion.button>
        )}
      </div>

      {/* Status */}
      {timer.isRunning && (
        <div className="mb-5 flex items-center gap-2">
          <div className={clsx(
            'w-2 h-2 rounded-full',
            timer.isPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'
          )} />
          <span className="text-xs text-[var(--text-muted)]">
            {timer.isPaused ? 'Paused' : 'Running'}
          </span>
        </div>
      )}

      {/* Config (only show when not running) */}
      {!timer.isRunning && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full space-y-3"
        >
          <div>
            <label className="input-label">Time Block</label>
            <select
              value={selectedBlock}
              onChange={e => setSelectedBlock(e.target.value)}
              className="input-field"
            >
              {trackableBlocks.map(b => (
                <option key={b.id} value={b.id}>{b.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label">Project (optional)</label>
            <select
              value={selectedProject}
              onChange={e => setSelectedProject(e.target.value)}
              className="input-field"
            >
              <option value="">— None —</option>
              {activeProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="input-label">Task name (optional)</label>
            <input
              type="text"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              placeholder="What are you working on?"
              className="input-field"
            />
          </div>
        </motion.div>
      )}

      {/* Running session info */}
      {timer.isRunning && (timer.taskName || timer.projectId) && (
        <div className="mt-4 w-full p-3 rounded-xl bg-white/[0.04] border border-white/[0.05] text-center">
          {timer.taskName && <p className="text-sm font-medium text-[var(--text-primary)]">{timer.taskName}</p>}
          {timer.projectId && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {state.projects.find(p => p.id === timer.projectId)?.name}
            </p>
          )}
        </div>
      )}

      {/* Save modal */}
      <AnimatePresence>
        {showSaveModal && lastSession && (
          <SaveSessionModal
            session={lastSession}
            projects={state.projects}
            onSave={handleSave}
            onDiscard={() => { setShowSaveModal(false); setLastSession(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SaveSessionModal({ session, projects, onSave, onDiscard }) {
  const project = projects.find(p => p.id === session.projectId);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onDiscard}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative z-10 w-full max-w-sm glass-card p-6"
      >
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Save session?</h3>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          You tracked {minToHHMM(session.durationMinutes)} — save to your log?
        </p>

        <div className="p-3 rounded-xl bg-white/[0.05] mb-4 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-muted)]">Duration</span>
            <span className="font-semibold text-emerald-400">{minToHHMM(session.durationMinutes)}</span>
          </div>
          {session.taskName && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Task</span>
              <span className="text-[var(--text-secondary)] text-right max-w-[180px] truncate">{session.taskName}</span>
            </div>
          )}
          {project && (
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Project</span>
              <span className="font-medium" style={{ color: project.color }}>{project.name}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button onClick={onDiscard} className="btn-secondary flex-1 justify-center">Discard</button>
          <button onClick={onSave} className="btn-primary flex-1 justify-center">Save Log</button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Timer Page ───────────────────────────────────────────────────────────────
export default function TimerPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="page-container"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Timer</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Track your time — block countdown & manual stopwatch</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BlockCountdown />
        <Stopwatch />
      </div>
    </motion.div>
  );
}
