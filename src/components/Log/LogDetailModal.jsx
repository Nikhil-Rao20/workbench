import { motion } from 'framer-motion';
import { X, Clock, Folder, BookOpen, FileText, Calendar, Pencil } from 'lucide-react';
import { minToHHMM } from '../../utils/time';
import { format, parseISO } from 'date-fns';

export default function LogDetailModal({ entry, project, block, dateKey, isToday, onClose, onEdit }) {
  const dateObj = parseISO(dateKey);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative z-10 w-full max-w-md glass-card overflow-hidden"
      >
        {/* Color accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: project
              ? `linear-gradient(90deg, ${project.color}, ${project.color}40)`
              : 'linear-gradient(90deg, #6366f1, #6366f140)',
          }}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center text-base mt-0.5"
                style={{
                  backgroundColor: project ? `${project.color}18` : 'rgba(99,102,241,0.12)',
                  border: `1px solid ${project ? project.color + '30' : 'rgba(99,102,241,0.2)'}`,
                }}
              >
                {block?.icon || '📝'}
              </div>
              <div className="min-w-0">
                <h2 className="text-base font-bold text-[var(--text-primary)] leading-snug">
                  {entry.taskName || 'Work session'}
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  {format(dateObj, 'EEEE, MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {isToday && (
                <button
                  onClick={() => { onClose(); onEdit(entry); }}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-indigo-400 hover:bg-indigo-400/10 transition-colors"
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.08] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {/* Duration */}
            <div className="glass-card p-3 flex flex-col items-center gap-1">
              <Clock size={13} className="text-emerald-400" />
              <span className="font-mono text-lg font-bold text-emerald-400">
                {minToHHMM(entry.durationMinutes)}
              </span>
              <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Duration</span>
            </div>

            {/* Block */}
            <div className="glass-card p-3 flex flex-col items-center gap-1">
              <BookOpen size={13} style={{ color: block?.color || '#6366f1' }} />
              <span
                className="text-xs font-bold text-center leading-tight"
                style={{ color: block?.color || '#6366f1' }}
              >
                {block?.label || entry.blockId}
              </span>
              <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Block</span>
            </div>

            {/* Project */}
            <div className="glass-card p-3 flex flex-col items-center gap-1">
              <Folder size={13} style={{ color: project?.color || '#6b7280' }} />
              <span
                className="text-xs font-bold text-center leading-tight truncate w-full text-center"
                style={{ color: project?.color || 'var(--text-muted)' }}
              >
                {project?.name || '—'}
              </span>
              <span className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">Project</span>
            </div>
          </div>

          {/* Block time range */}
          {block && (
            <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.05]">
              <Calendar size={12} className="text-[var(--text-muted)] shrink-0" />
              <span className="text-xs text-[var(--text-muted)]">
                Scheduled block:
              </span>
              <span className="text-xs font-semibold text-[var(--text-secondary)]">
                {block.start} – {block.end}
              </span>
              {block.description && (
                <span className="text-[10px] text-[var(--text-muted)] ml-auto truncate hidden sm:block">
                  {block.description}
                </span>
              )}
            </div>
          )}

          {/* Notes */}
          {entry.notes ? (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <FileText size={12} className="text-[var(--text-muted)]" />
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Notes</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.05]">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                  {entry.notes}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.02] border border-dashed border-white/[0.08]">
              <FileText size={12} className="text-[var(--text-muted)] opacity-40" />
              <span className="text-xs text-[var(--text-muted)] opacity-60">No notes added</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
