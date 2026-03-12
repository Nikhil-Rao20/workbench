import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PROJECT_CATEGORIES } from '../../data/projects';
import { generateId } from '../../utils/time';

const COLORS = [
  '#6366f1', '#8b5cf6', '#a78bfa',
  '#06b6d4', '#0ea5e9', '#38bdf8',
  '#10b981', '#22c55e', '#34d399',
  '#f59e0b', '#f97316', '#fb923c',
  '#f43f5e', '#ec4899', '#e879f9',
  '#64748b', '#94a3b8',
];

export default function EditProjectModal({ project = null, onClose }) {
  const { dispatch } = useApp();
  const isNew = !project;

  const [form, setForm] = useState({
    name: project?.name || '',
    categories: project?.categories || (project?.category ? [project.category] : ['research']),
    color: project?.color || '#4b7bec',
    deadline: project?.deadline || '',
    description: project?.description || '',
    tags: project?.tags?.join(', ') || '',
    status: project?.status || (project?.active === false ? 'inactive' : 'active'),
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const data = {
      ...form,
      name: form.name.trim(),
      categories: form.categories.length ? form.categories : ['other'],
      deadline: form.deadline || null,
      description: form.description.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      active: form.status === 'active',
      completedAt: form.status === 'completed'
        ? (project?.completedAt || new Date().toISOString().split('T')[0])
        : null,
    };
    // Remove legacy single-category field if it existed
    delete data.category;

    if (isNew) {
      dispatch({
        type: 'ADD_PROJECT',
        payload: { id: generateId(), priority: 99, ...data },
      });
    } else {
      dispatch({
        type: 'UPDATE_PROJECT',
        payload: { id: project.id, ...data },
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
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative z-10 w-full max-w-md glass-card p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            {isNew ? 'New Project' : 'Edit Project'}
          </h2>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="input-label">Project Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Geospatial Hackathon"
              className={`input-field ${errors.name ? 'border-rose-500/60' : ''}`}
              autoFocus
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>

          {/* Categories — multi-select chips */}
          <div>
            <label className="input-label">Categories (select one or more)</label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {Object.entries(PROJECT_CATEGORIES).map(([k, v]) => {
                const active = form.categories.includes(k);
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => {
                      const next = active
                        ? form.categories.filter(c => c !== k)
                        : [...form.categories, k];
                      set('categories', next);
                    }}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all"
                    style={{
                      color: active ? v.color : 'var(--text-muted)',
                      backgroundColor: active ? v.bg : 'transparent',
                      borderColor: active ? v.color + '55' : 'var(--border)',
                    }}
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
            {form.categories.length === 0 && (
              <p className="error-text mt-1">Select at least one category</p>
            )}
          </div>

          {/* Color picker */}
          <div>
            <label className="input-label">Color</label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {COLORS.map(c => (
                <button
                  key={c}
                  onClick={() => set('color', c)}
                  className={`w-6 h-6 rounded-full transition-transform ${form.color === c ? 'scale-125 ring-2 ring-white/30' : 'hover:scale-110'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="input-label">Deadline (optional)</label>
            <input
              type="date"
              value={form.deadline}
              onChange={e => set('deadline', e.target.value)}
              className="input-field"
            />
          </div>

          {/* Description */}
          <div>
            <label className="input-label">Description</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Brief description of this project…"
              rows={2}
              className="input-field resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="input-label">Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
              placeholder="e.g. research, medical, deep-learning"
              className="input-field"
            />
          </div>

          {/* Status */}
          <div>
            <label className="input-label">Status</label>
            <div className="flex gap-2 mt-1.5">
              {[
                { value: 'active',    label: '⚡ Active',     color: '#6366f1' },
                { value: 'completed', label: '✓ Completed',   color: '#10b981' },
                { value: 'inactive',  label: '📦 Archived',   color: '#64748b' },
              ].map(s => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => set('status', s.value)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold border transition-all"
                  style={{
                    color: form.status === s.value ? s.color : 'var(--text-muted)',
                    backgroundColor: form.status === s.value ? `${s.color}15` : 'transparent',
                    borderColor: form.status === s.value ? `${s.color}55` : 'var(--border)',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary flex-1 justify-center">
            <Save size={14} />
            {isNew ? 'Create' : 'Save'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
