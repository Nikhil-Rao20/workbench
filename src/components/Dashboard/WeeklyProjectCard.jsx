import { motion } from 'framer-motion';
import { Calendar, Clapperboard, ChevronRight } from 'lucide-react';
import { WEEKLY_ROTATION } from '../../data/schedule';
import { useApp } from '../../context/AppContext';
import { todayKey } from '../../utils/time';

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function WeeklyProjectCard() {
  const { state, dispatch } = useApp();
  const dayIndex = new Date().getDay();
  const today = WEEKLY_ROTATION[dayIndex];
  const dateKey = todayKey();
  const isMovieDay = today.movieNight;
  const movieUsed = state.movieDays[dateKey];

  const projects = today.projectIds
    .map(id => state.projects.find(p => p.id === id))
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar size={14} className="text-[var(--text-muted)]" />
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
              {DAY_NAMES[dayIndex]}'s Focus
            </span>
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">{today.label}</h3>
        </div>

        <div
          className="w-3 h-3 rounded-full shrink-0 mt-1"
          style={{ backgroundColor: today.color, boxShadow: `0 0 8px ${today.color}66` }}
        />
      </div>

      {/* Projects */}
      <div className="space-y-2 mb-4">
        {projects.map(proj => (
          <div
            key={proj.id}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.05]"
          >
            <div
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: proj.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{proj.name}</p>
              {proj.deadline && (
                <p className="text-[10px] text-amber-400">
                  Due {proj.deadline}
                </p>
              )}
            </div>
            <ChevronRight size={12} className="text-[var(--text-muted)] shrink-0" />
          </div>
        ))}
      </div>

      {/* Movie night indicator */}
      {isMovieDay && (
        <div className="border-t border-white/[0.06] pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clapperboard size={13} className="text-violet-400" />
              <span className="text-xs text-[var(--text-secondary)]">Movie Night available</span>
              <span className="text-[10px] text-[var(--text-muted)]">10–11:30 PM</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => dispatch({ type: 'TOGGLE_MOVIE_DAY', payload: dateKey })}
              className={`text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
                movieUsed
                  ? 'bg-violet-500/20 text-violet-300'
                  : 'bg-white/[0.06] text-[var(--text-muted)] hover:bg-violet-500/10 hover:text-violet-400'
              }`}
            >
              {movieUsed ? '✓ Marked' : 'Mark used'}
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
