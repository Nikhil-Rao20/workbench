import { useState, useEffect, useRef, useCallback } from 'react';
import { getItem, setItem } from '../utils/storage';

const STORAGE_KEY = 'active_timer';

/**
 * Persistent stopwatch timer.
 * Survives page refresh — stores startTime in localStorage.
 */
export function useTimer() {
  const [state, setState] = useState(() => {
    const saved = getItem(STORAGE_KEY, null);
    if (saved && saved.isRunning && !saved.isPaused) {
      return saved;
    }
    return saved || {
      isRunning: false,
      isPaused: false,
      startTime: null,       // unix ms when started
      pausedAt: null,        // unix ms when paused
      totalPausedMs: 0,      // accumulated paused duration
      blockId: null,
      projectId: null,
      taskName: '',
      notes: '',
    };
  });

  const [elapsed, setElapsed] = useState(0); // ms
  const rafRef = useRef(null);

  // Animate elapsed display
  useEffect(() => {
    const tick = () => {
      if (state.isRunning && !state.isPaused && state.startTime) {
        const now = Date.now();
        setElapsed(now - state.startTime - state.totalPausedMs);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    if (state.isRunning && !state.isPaused) {
      rafRef.current = requestAnimationFrame(tick);
    } else if (state.isPaused && state.startTime) {
      setElapsed(state.pausedAt - state.startTime - state.totalPausedMs);
    } else {
      setElapsed(0);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state.isRunning, state.isPaused, state.startTime, state.pausedAt, state.totalPausedMs]);

  // Persist state changes
  useEffect(() => {
    setItem(STORAGE_KEY, state);
  }, [state]);

  const start = useCallback(({ blockId, projectId, taskName = '', notes = '' } = {}) => {
    setState({
      isRunning: true,
      isPaused: false,
      startTime: Date.now(),
      pausedAt: null,
      totalPausedMs: 0,
      blockId,
      projectId,
      taskName,
      notes,
    });
  }, []);

  const pause = useCallback(() => {
    setState(s => ({
      ...s,
      isPaused: true,
      pausedAt: Date.now(),
    }));
  }, []);

  const resume = useCallback(() => {
    setState(s => ({
      ...s,
      isPaused: false,
      totalPausedMs: s.totalPausedMs + (Date.now() - s.pausedAt),
      pausedAt: null,
    }));
  }, []);

  /** Stop and return session data for logging */
  const stop = useCallback(() => {
    const now = Date.now();
    const durationMs = state.isPaused
      ? state.pausedAt - state.startTime - state.totalPausedMs
      : now - state.startTime - state.totalPausedMs;

    const session = {
      blockId: state.blockId,
      projectId: state.projectId,
      taskName: state.taskName,
      notes: state.notes,
      durationMs,
      durationMinutes: Math.round(durationMs / 60000),
      startTime: state.startTime,
      endTime: now,
    };

    setState({
      isRunning: false,
      isPaused: false,
      startTime: null,
      pausedAt: null,
      totalPausedMs: 0,
      blockId: null,
      projectId: null,
      taskName: '',
      notes: '',
    });

    return session;
  }, [state]);

  const reset = useCallback(() => {
    setState({
      isRunning: false,
      isPaused: false,
      startTime: null,
      pausedAt: null,
      totalPausedMs: 0,
      blockId: null,
      projectId: null,
      taskName: '',
      notes: '',
    });
    setElapsed(0);
  }, []);

  const updateMeta = useCallback((updates) => {
    setState(s => ({ ...s, ...updates }));
  }, []);

  return {
    isRunning: state.isRunning,
    isPaused: state.isPaused,
    elapsed,
    blockId: state.blockId,
    projectId: state.projectId,
    taskName: state.taskName,
    notes: state.notes,
    start,
    pause,
    resume,
    stop,
    reset,
    updateMeta,
  };
}
