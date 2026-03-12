import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Moon, Sun, Download, Trash2, RefreshCw, LogOut, BookOpen, Microscope, Brain, Dumbbell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNotifications } from '../../hooks/useNotifications';
import { clearAll } from '../../utils/storage';
import { DAILY_TARGETS } from '../../data/schedule';
import clsx from 'clsx';

const pageVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={clsx(
        'relative inline-flex items-center rounded-full transition-colors focus:outline-none',
        checked ? 'bg-indigo-500' : 'bg-white/10',
        disabled && 'opacity-40 cursor-not-allowed'
      )}
      style={{ width: 40, height: 22 }}
    >
      <motion.span
        animate={{ x: checked ? 18 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="inline-block w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Row({ label, description, right }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.05] last:border-0">
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
        {description && <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { state, dispatch, user, logOut } = useApp();
  const { permission, requestPermission } = useNotifications({
    enabled: state.notifications.enabled,
    warningMinutes: state.notifications.warningMinutes,
  });
  const [resetConfirm, setResetConfirm] = useState(false);

  const setNotif = (updates) => dispatch({ type: 'SET_NOTIFICATIONS', payload: updates });

  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      projects: state.projects,
      logs: state.logs,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lab-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (resetConfirm) {
      clearAll();
      window.location.reload();
    } else {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
    }
  };

  const handleRequestNotif = async () => {
    const p = await requestPermission();
    if (p === 'granted') {
      setNotif({ enabled: true, permission: p });
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="page-container max-w-2xl"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Preferences & configuration</p>
      </div>

      <div className="space-y-4">
        {/* Daily Targets */}
        <Section title="Daily Targets">
          <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
            Minimum daily goals used in Day Report &amp; Analytics. Enter values in minutes.
          </p>
          {[
            { key: 'gate',       label: 'GATE Prep',   icon: BookOpen,   color: '#f59e0b' },
            { key: 'research',   label: 'Research',    icon: Microscope, color: '#4b7bec' },
            { key: 'conceptual', label: 'Conceptual',  icon: Brain,      color: '#06b6d4' },
            { key: 'exercise',   label: 'Exercise',    icon: Dumbbell,   color: '#22c55e' },
          ].map(({ key, label, icon: Icon, color }) => {
            const val = state.targets?.[key] ?? DAILY_TARGETS[key];
            const hrs = Math.floor(val / 60);
            const mins = val % 60;
            return (
              <div key={key} className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.05] last:border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                    <Icon size={13} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      {hrs > 0 ? `${hrs}h ` : ''}{mins > 0 ? `${mins}m` : hrs === 0 ? '0m' : ''} per day
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={720}
                    step={5}
                    value={val}
                    onChange={e => dispatch({ type: 'SET_TARGETS', payload: { [key]: Math.max(0, Math.min(720, Number(e.target.value))) } })}
                    className="input-field text-sm py-1.5 w-20 text-center"
                  />
                  <span className="text-[10px] text-[var(--text-muted)] shrink-0">min</span>
                </div>
              </div>
            );
          })}
        </Section>

        {/* Appearance */}
        <Section title="Appearance">
          <Row
            label="Theme"
            description="Choose your preferred interface theme"
            right={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch({ type: 'SET_THEME', payload: 'light' })}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                    state.theme === 'light'
                      ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      : 'text-[var(--text-muted)] hover:bg-white/[0.06] border border-transparent'
                  )}
                >
                  <Sun size={12} /> Light
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_THEME', payload: 'dark' })}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                    state.theme === 'dark'
                      ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                      : 'text-[var(--text-muted)] hover:bg-white/[0.06] border border-transparent'
                  )}
                >
                  <Moon size={12} /> Dark
                </button>
              </div>
            }
          />
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          {permission === 'denied' ? (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 mb-3">
              Browser notifications are blocked. Please allow them in your browser settings.
            </div>
          ) : permission === 'default' ? (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-3">
              <p className="text-xs text-amber-400 mb-2">Grant permission to receive block-end reminders.</p>
              <button onClick={handleRequestNotif} className="btn-primary text-xs">
                <Bell size={12} /> Enable Notifications
              </button>
            </div>
          ) : null}

          <Row
            label="Block end warnings"
            description="Get notified before a time block ends"
            right={
              <Toggle
                checked={state.notifications.enabled}
                onChange={() => setNotif({ enabled: !state.notifications.enabled })}
                disabled={permission !== 'granted'}
              />
            }
          />

          <Row
            label="Warning time"
            description="How many minutes before the block ends"
            right={
              <select
                value={state.notifications.warningMinutes}
                onChange={e => setNotif({ warningMinutes: Number(e.target.value) })}
                className="input-field text-xs py-1.5 w-24"
              >
                {[5, 10, 15, 20].map(n => (
                  <option key={n} value={n}>{n} min</option>
                ))}
              </select>
            }
          />
        </Section>

        {/* Data */}
        <Section title="Data Management">
          <Row
            label="Export data"
            description="Download all your projects & logs as JSON"
            right={
              <button onClick={handleExport} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5">
                <Download size={12} /> Export
              </button>
            }
          />
          <Row
            label="Reset all data"
            description="Clear everything — projects, logs, settings. Cannot be undone."
            right={
              <button
                onClick={handleReset}
                className={clsx(
                  'text-xs py-1.5 px-3 rounded-lg border font-medium transition-colors',
                  resetConfirm
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'text-[var(--text-muted)] border-white/[0.08] hover:text-rose-400 hover:border-rose-500/30'
                )}
              >
                {resetConfirm ? '⚠ Confirm Reset' : 'Reset'}
              </button>
            }
          />
        </Section>

        {/* About */}
        <Section title="About">
          <div className="text-xs text-[var(--text-muted)] space-y-1">
            <p className="font-semibold text-[var(--text-secondary)]">Workbench v1.0</p>
            <p>Personal productivity tracker built for research lab routines.</p>
            <p className="mt-2">Built with React, Tailwind CSS, Framer Motion &amp; Recharts.</p>
            <p className="text-[10px] mt-2 opacity-60">Data synced to Firestore &bull; localStorage offline cache.</p>
          </div>
        </Section>

        {/* Account */}
        {user && (
          <Section title="Account">
            <div className="flex items-center gap-3 mb-4">
              {user.photoURL && (
                <img src={user.photoURL} alt={user.displayName} className="w-9 h-9 rounded-full" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user.displayName}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logOut}
              className="flex items-center gap-2 text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </Section>
        )}
      </div>
    </motion.div>
  );
}
