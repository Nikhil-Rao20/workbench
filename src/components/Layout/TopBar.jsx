import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Bell, BellOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { friendlyDate } from '../../utils/time';
import { useNotifications } from '../../hooks/useNotifications';

export default function TopBar() {
  const { state, dispatch } = useApp();
  const { permission, requestPermission } = useNotifications({
    enabled: state.notifications.enabled,
    warningMinutes: state.notifications.warningMinutes,
  });

  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 10_000);
    return () => clearInterval(t);
  }, []);

  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' });

  const toggleNotifications = async () => {
    if (!state.notifications.enabled) {
      const p = await requestPermission();
      if (p === 'granted') {
        dispatch({ type: 'SET_NOTIFICATIONS', payload: { enabled: true, permission: p } });
      }
    } else {
      dispatch({ type: 'SET_NOTIFICATIONS', payload: { enabled: false } });
    }
  };

  return (
    <header className="sticky top-0 z-10 h-14 flex items-center justify-between px-5 border-b border-white/[0.06] bg-[var(--bg-topbar)] backdrop-blur-xl">
      {/* Date */}
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--text-primary)]">{friendlyDate()}</p>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Live clock */}
        <span className="font-mono text-sm font-medium text-[var(--text-secondary)] tabular-nums hidden sm:block">
          {time}
        </span>

        {/* Notification toggle */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleNotifications}
          title={state.notifications.enabled ? 'Notifications on' : 'Notifications off'}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
            state.notifications.enabled
              ? 'text-[var(--accent)] bg-[var(--accent-subtle)] hover:bg-[var(--accent-glow)]'
              : 'text-[var(--text-muted)] hover:bg-white/[0.06]'
          }`}
        >
          {state.notifications.enabled ? <Bell size={15} /> : <BellOff size={15} />}
        </motion.button>

        {/* Theme toggle */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          title="Toggle theme"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.06] transition-colors"
        >
          <motion.div
            key={state.theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {state.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </motion.div>
        </motion.button>
      </div>
    </header>
  );
}
