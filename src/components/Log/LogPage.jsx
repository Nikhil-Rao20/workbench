import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Filter, Calendar, Clock, Tag, Pencil } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { last7DayKeys, todayKey, dayOfWeekLabel, minToHHMM, dateToKey } from '../../utils/time';
import { TIME_BLOCKS } from '../../data/schedule';
import { format, parseISO } from 'date-fns';
import AddEntryModal from './AddEntryModal';
import LogDetailModal from './LogDetailModal';
import clsx from 'clsx';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function LogEntryCard({ entry, project, block, onDelete, onEdit, onView, isToday }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onClick={() => onView(entry)}
      className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors group cursor-pointer"
    >
      {/* Project dot */}
      <div
        className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
        style={{ backgroundColor: project?.color || '#6b7280' }}
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
          {entry.taskName || 'Work session'}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {project && (
            <span className="text-[10px] font-medium" style={{ color: project.color }}>
              {project.name}
            </span>
          )}
          {block && (
            <>
              <span className="text-[var(--text-muted)] text-[10px]">·</span>
              <span className="text-[10px] text-[var(--text-muted)]">{block.label}</span>
            </>
          )}
        </div>
        {entry.notes && (
          <p className="text-xs text-[var(--text-muted)] mt-1.5 line-clamp-2">{entry.notes}</p>
        )}
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="font-mono text-sm font-bold text-emerald-400">
          {minToHHMM(entry.durationMinutes)}
        </span>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
          {isToday && (
            <button
              onClick={e => { e.stopPropagation(); onEdit(entry); }}
              className="text-[var(--text-muted)] hover:text-indigo-400 transition-colors"
              title="Edit"
            >
              <Pencil size={13} />
            </button>
          )}
          <button
            onClick={e => { e.stopPropagation(); onDelete(entry.id); }}
            className="text-[var(--text-muted)] hover:text-rose-400 transition-colors"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function LogPage() {
  const { state, dispatch } = useApp();
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [filterBlock, setFilterBlock] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [viewEntry, setViewEntry] = useState(null);

  const dayLogs = state.logs[selectedDate] || [];

  const filtered = dayLogs.filter(l => {
    if (filterBlock && l.blockId !== filterBlock) return false;
    if (filterProject && l.projectId !== filterProject) return false;
    return true;
  });

  const totalMin = filtered.reduce((a, l) => a + (l.durationMinutes || 0), 0);

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_LOG', payload: { dateKey: selectedDate, id } });
  };

  // Recent dates with logs
  const recentDates = last7DayKeys().filter(k => (state.logs[k] || []).length > 0);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="page-container"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Work Log</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">All logged sessions and tasks</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAdd(true)}
          className="btn-primary"
        >
          <Plus size={15} />
          Add Entry
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Date picker sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <div className="glass-card p-4">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-3">Date</p>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="input-field text-sm"
            />
          </div>

          {/* Days with activity */}
          {recentDates.length > 0 && (
            <div className="glass-card p-4">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold mb-3">Recent Activity</p>
              <div className="space-y-1">
                {recentDates.map(k => {
                  const count = (state.logs[k] || []).length;
                  const mins = (state.logs[k] || []).reduce((a, l) => a + (l.durationMinutes || 0), 0);
                  return (
                    <button
                      key={k}
                      onClick={() => setSelectedDate(k)}
                      className={clsx(
                        'w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors',
                        selectedDate === k
                          ? 'bg-indigo-500/15 text-indigo-400'
                          : 'text-[var(--text-secondary)] hover:bg-white/[0.05]'
                      )}
                    >
                      <span className="font-medium">{format(parseISO(k), 'EEE, MMM d')}</span>
                      <span className="text-[10px] text-[var(--text-muted)]">{minToHHMM(mins)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Main log view */}
        <div className="lg:col-span-3">
          {/* Stats + filters */}
          <div className="glass-card p-4 mb-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Total time</p>
                  <p className="text-lg font-bold text-indigo-400 font-mono">{minToHHMM(totalMin)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Sessions</p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{filtered.length}</p>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={filterBlock}
                  onChange={e => setFilterBlock(e.target.value)}
                  className="input-field text-xs py-1.5 w-auto"
                >
                  <option value="">All blocks</option>
                  {TIME_BLOCKS.filter(b => b.trackable).map(b => (
                    <option key={b.id} value={b.id}>{b.label}</option>
                  ))}
                </select>
                <select
                  value={filterProject}
                  onChange={e => setFilterProject(e.target.value)}
                  className="input-field text-xs py-1.5 w-auto"
                >
                  <option value="">All projects</option>
                  {state.projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Log entries */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card p-10 flex flex-col items-center justify-center text-center"
              >
                <Calendar size={36} className="text-[var(--text-muted)] mb-3 opacity-40" />
                <p className="text-[var(--text-secondary)] font-medium">No entries for this day</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">Start a timer or add a manual entry</p>
                <button onClick={() => setShowAdd(true)} className="btn-primary mt-4 text-xs">
                  <Plus size={13} />
                  Add Entry
                </button>
              </motion.div>
            ) : (
              <div className="space-y-2">
                {filtered.slice().reverse().map(entry => {
                  const project = state.projects.find(p => p.id === entry.projectId);
                  const block = TIME_BLOCKS.find(b => b.id === entry.blockId);
                  return (
                    <LogEntryCard
                      key={entry.id}
                      entry={entry}
                      project={project}
                      block={block}
                      onDelete={handleDelete}
                      onEdit={setEditEntry}
                      onView={setViewEntry}
                      isToday={selectedDate === todayKey()}
                    />
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showAdd && <AddEntryModal onClose={() => setShowAdd(false)} />}
        {editEntry && (
          <AddEntryModal
            onClose={() => setEditEntry(null)}
            editEntry={editEntry}
            editDateKey={selectedDate}
          />
        )}
        {viewEntry && (() => {
          const vProject = state.projects.find(p => p.id === viewEntry.projectId);
          const vBlock = TIME_BLOCKS.find(b => b.id === viewEntry.blockId);
          return (
            <LogDetailModal
              entry={viewEntry}
              project={vProject}
              block={vBlock}
              dateKey={selectedDate}
              isToday={selectedDate === todayKey()}
              onClose={() => setViewEntry(null)}
              onEdit={setEditEntry}
            />
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
}
