import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Pencil } from 'lucide-react';
import { useApp, addLogForDate } from '../../context/AppContext';
import { TIME_BLOCKS } from '../../data/schedule';
import { todayKey, generateId } from '../../utils/time';
import { format } from 'date-fns';

// editEntry: existing log object to edit (null = add mode)
export default function AddEntryModal({ onClose, prefillBlock = null, prefillProject = null, editEntry = null, editDateKey = null }) {
  const { state, dispatch } = useApp();
  const activeProjects = state.projects.filter(p => p.active);
  const trackableBlocks = TIME_BLOCKS.filter(b => b.trackable);
  const isEditMode = !!editEntry;

  const [form, setForm] = useState({
    blockId: editEntry?.blockId || prefillBlock || trackableBlocks[0]?.id || '',
    projectId: editEntry?.projectId || prefillProject || '',
    taskName: editEntry?.taskName || '',
    notes: editEntry?.notes || '',
    durationMinutes: editEntry?.durationMinutes || '',
    dateKey: editDateKey || todayKey(),
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.blockId) e.blockId = 'Select a block';
    if (!form.durationMinutes || form.durationMinutes <= 0) e.duration = 'Enter duration';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    if (isEditMode) {
      dispatch({
        type: 'EDIT_LOG',
        payload: {
          dateKey: editDateKey,
          id: editEntry.id,
          updates: {
            blockId: form.blockId,
            projectId: form.projectId || null,
            taskName: form.taskName || 'Work session',
            notes: form.notes,
            durationMinutes: Number(form.durationMinutes),
          },
        },
      });
    } else {
      addLogForDate(dispatch, form.dateKey, {
        blockId: form.blockId,
        projectId: form.projectId || null,
        taskName: form.taskName || 'Work session',
        notes: form.notes,
        durationMinutes: Number(form.durationMinutes),
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative z-10 w-full max-w-md glass-card p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-[var(--text-primary)]">{isEditMode ? 'Edit Log Entry' : 'Add Log Entry'}</h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Date — hidden in edit mode since entry date is fixed */}
          {!isEditMode && (
            <div>
              <label className="input-label">Date</label>
              <input
                type="date"
                value={form.dateKey}
                onChange={e => set('dateKey', e.target.value)}
                className="input-field"
              />
            </div>
          )}

          {/* Block */}
          <div>
            <label className="input-label">Time Block *</label>
            <select
              value={form.blockId}
              onChange={e => set('blockId', e.target.value)}
              className={`input-field ${errors.blockId ? 'border-rose-500/60' : ''}`}
            >
              <option value="">Select block…</option>
              {trackableBlocks.map(b => (
                <option key={b.id} value={b.id}>{b.label}</option>
              ))}
            </select>
            {errors.blockId && <p className="error-text">{errors.blockId}</p>}
          </div>

          {/* Project */}
          <div>
            <label className="input-label">Project</label>
            <select
              value={form.projectId}
              onChange={e => set('projectId', e.target.value)}
              className="input-field"
            >
              <option value="">— None —</option>
              {activeProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Task name */}
          <div>
            <label className="input-label">Task Name</label>
            <input
              type="text"
              value={form.taskName}
              onChange={e => set('taskName', e.target.value)}
              placeholder="e.g. Implementing geospatial model"
              className="input-field"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="input-label">Duration (minutes) *</label>
            <input
              type="number"
              min="1"
              max="480"
              value={form.durationMinutes}
              onChange={e => set('durationMinutes', e.target.value)}
              placeholder="e.g. 90"
              className={`input-field ${errors.duration ? 'border-rose-500/60' : ''}`}
            />
            {errors.duration && <p className="error-text">{errors.duration}</p>}
          </div>

          {/* Notes */}
          <div>
            <label className="input-label">Notes</label>
            <textarea
              value={form.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Any notes, experiment results, references…"
              rows={2}
              className="input-field resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary flex-1 justify-center">
            {isEditMode ? <Pencil size={15} /> : <Plus size={15} />}
            {isEditMode ? 'Save Changes' : 'Add Entry'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
