import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, ExternalLink, Clock, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { last7DayKeys, minToHHMM, deadlineRelative, isUrgent } from '../../utils/time';
import { PROJECT_CATEGORIES } from '../../data/projects';
import EditProjectModal from './EditProjectModal';
import clsx from 'clsx';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function ProjectCard({ project, totalMinutes, onEdit, onDelete }) {
  const primaryCatKey = project.categories?.[0] || project.category || 'other';
  const urgency = isUrgent(project.deadline);
  const deadlineText = deadlineRelative(project.deadline);
  const cats = (project.categories || (project.category ? [project.category] : ['other']))
    .map(k => PROJECT_CATEGORIES[k] || PROJECT_CATEGORIES.other);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="glass-card p-5 group cursor-default"
    >
      {/* Color bar */}
      <div
        className="w-full h-1 rounded-full mb-4"
        style={{
          background: `linear-gradient(90deg, ${project.color}, ${project.color}40)`,
          boxShadow: `0 0 8px ${project.color}44`,
        }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <h3 className="text-sm font-bold text-[var(--text-primary)] leading-tight truncate">
            {project.name}
          </h3>
          {!project.active && (
            <span className="text-[9px] text-[var(--text-muted)] bg-white/[0.06] px-1.5 py-0.5 rounded-full shrink-0">
              Inactive
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button onClick={() => onEdit(project)} className="p-1.5 rounded-lg hover:bg-white/[0.08] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <Pencil size={13} />
          </button>
          <button onClick={() => onDelete(project.id)} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-400 transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Category badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        {cats.map((cat, i) => (
          <span
            key={i}
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ color: cat.color, backgroundColor: cat.bg }}
          >
            {cat.label}
          </span>
        ))}
      </div>

      {/* Description */}
      {project.description && (
        <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      )}

      {/* Stats row */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-1 text-[var(--text-muted)]">
          <Clock size={11} />
          <span className="text-xs font-medium text-[var(--text-secondary)]">
            {minToHHMM(totalMinutes)} logged
          </span>
        </div>

        {deadlineText && (
          <span className={clsx(
            'text-[10px] font-semibold px-2 py-0.5 rounded-full',
            urgency ? 'text-rose-400 bg-rose-400/10' : 'text-amber-400 bg-amber-400/10'
          )}>
            {deadlineText}
          </span>
        )}
      </div>

      {/* Tags */}
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-[9px] text-[var(--text-muted)] border border-white/[0.08] px-1.5 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { state, dispatch } = useApp();
  const [editProject, setEditProject] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  // Calculate total logged minutes per project across last 30 days
  const allLogs = Object.values(state.logs).flat();
  const minutesByProject = allLogs.reduce((acc, log) => {
    if (log.projectId) {
      acc[log.projectId] = (acc[log.projectId] || 0) + (log.durationMinutes || 0);
    }
    return acc;
  }, {});

  const filtered = state.projects.filter(p => {
    if (!showInactive && !p.active) return false;
    const projCats = p.categories || (p.category ? [p.category] : []);
    if (filterCat && !projCats.includes(filterCat)) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleDelete = (id) => {
    if (confirm('Delete this project? All log entries will remain.')) {
      dispatch({ type: 'DELETE_PROJECT', payload: id });
    }
  };

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
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Projects</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">{filtered.length} projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowNew(true)}
          className="btn-primary"
        >
          <Plus size={15} />
          New Project
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects…"
            className="input-field pl-8 py-2 text-sm"
          />
        </div>
        <select
          value={filterCat}
          onChange={e => setFilterCat(e.target.value)}
          className="input-field py-2 text-sm w-auto"
        >
          <option value="">All categories</option>
          {Object.entries(PROJECT_CATEGORIES).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <button
          onClick={() => setShowInactive(v => !v)}
          className={clsx(
            'text-xs font-medium px-3 py-2 rounded-lg border transition-colors',
            showInactive
              ? 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400'
              : 'border-white/[0.08] text-[var(--text-muted)] hover:border-white/[0.15]'
          )}
        >
          {showInactive ? 'Hide inactive' : 'Show inactive'}
        </button>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 flex flex-col items-center text-center"
          >
            <p className="text-[var(--text-secondary)] font-medium mb-2">No projects found</p>
            <p className="text-xs text-[var(--text-muted)]">Try adjusting filters or create a new project</p>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                totalMinutes={minutesByProject[project.id] || 0}
                onEdit={setEditProject}
                onDelete={handleDelete}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNew && <EditProjectModal onClose={() => setShowNew(false)} />}
        {editProject && <EditProjectModal project={editProject} onClose={() => setEditProject(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
