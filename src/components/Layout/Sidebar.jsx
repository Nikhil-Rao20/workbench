import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Timer, BookOpen, FolderKanban,
  BarChart3, Settings, ChevronLeft, ChevronRight, CalendarDays,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { friendlyDate, todayKey } from '../../utils/time';
import { WEEKLY_ROTATION } from '../../data/schedule';
import clsx from 'clsx';

const NAV_ITEMS = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/timer',     icon: Timer,           label: 'Timer'     },
  { to: '/log',       icon: BookOpen,        label: 'Log'       },
  { to: '/projects',  icon: FolderKanban,    label: 'Projects'  },
  { to: '/analytics', icon: BarChart3,       label: 'Analytics' },
  { to: '/day',       icon: CalendarDays,    label: 'Day Report'},
  { to: '/settings',  icon: Settings,        label: 'Settings'  },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const collapsed = state.sidebarCollapsed;
  const todayRotation = WEEKLY_ROTATION[new Date().getDay()];

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 border-r border-white/[0.06] bg-[var(--bg-sidebar)] z-20 overflow-hidden"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Profile"
            className="w-9 h-9 rounded-xl shrink-0 object-cover ring-1 ring-white/10"
          />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-sm font-bold text-[var(--text-primary)] leading-tight whitespace-nowrap">Lab Tracker</p>
                <p className="text-[10px] text-[var(--text-muted)] whitespace-nowrap">Personal Productivity</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ x: collapsed ? 0 : 2 }}
                  whileTap={{ scale: 0.97 }}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors cursor-pointer select-none',
                    isActive
                      ? 'bg-[var(--accent-subtle)] text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:bg-white/[0.05] hover:text-[var(--text-primary)]'
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={clsx(
                          'text-sm font-medium whitespace-nowrap overflow-hidden',
                          isActive && 'font-semibold'
                        )}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0"
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Today's focus */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-2 mb-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.03]"
            >
              <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1.5 font-semibold">Today's Focus</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: todayRotation.color }}
                />
                <p className="text-xs font-medium text-[var(--text-secondary)] leading-tight">{todayRotation.label}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse toggle */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          className="flex items-center justify-center gap-2 mx-2 mb-4 py-2 rounded-xl border border-white/[0.06] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-white/[0.05] transition-colors text-xs"
        >
          {collapsed ? <ChevronRight size={14} /> : <><ChevronLeft size={14} /><span>Collapse</span></>}
        </button>
      </motion.aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-white/[0.06] bg-[var(--bg-sidebar)] backdrop-blur-xl flex">
        {NAV_ITEMS.slice(0, 5).map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'} className="flex-1">
            {({ isActive }) => (
              <div className={clsx(
                'flex flex-col items-center gap-1 py-2.5 transition-colors',
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              )}>
                <Icon size={18} />
                <span className="text-[9px] font-medium">{label}</span>
                {isActive && (
                  <motion.div layoutId="mobile-indicator" className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
