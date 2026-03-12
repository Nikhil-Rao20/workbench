import { createContext, useContext, useReducer, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';
import { DEFAULT_PROJECTS } from '../data/projects';
import { getItem, setItem } from '../utils/storage';
import { generateId, todayKey } from '../utils/time';

// ─── Context ──────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

// ─── Initial state ────────────────────────────────────────────────────────────
const INITIAL_STATE = {
  theme: 'light',
  projects: DEFAULT_PROJECTS,
  logs: {},           // { 'YYYY-MM-DD': LogEntry[] }
  movieDays: {},      // { 'YYYY-MM-DD': boolean }
  conceptualType: {}, // { 'YYYY-MM-DD': 'A' | 'B' }
  notifications: {
    enabled: true,
    permission: 'default',
    warningMinutes: 10,
  },
  sidebarCollapsed: false,
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {

    case 'HYDRATE':
      return { ...INITIAL_STATE, ...action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };

    // ── Projects ──
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };

    case 'ADD_PROJECT':
      return { ...state, projects: [action.payload, ...state.projects] };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
      };

    // ── Logs ──
    case 'ADD_LOG': {
      const { dateKey, entry } = action.payload;
      return {
        ...state,
        logs: {
          ...state.logs,
          [dateKey]: [...(state.logs[dateKey] || []), entry],
        },
      };
    }

    case 'UPDATE_LOG': {
      const { dateKey, id, updates } = action.payload;
      return {
        ...state,
        logs: {
          ...state.logs,
          [dateKey]: (state.logs[dateKey] || []).map(e =>
            e.id === id ? { ...e, ...updates } : e
          ),
        },
      };
    }

    case 'DELETE_LOG': {
      const { dateKey, id } = action.payload;
      return {
        ...state,
        logs: {
          ...state.logs,
          [dateKey]: (state.logs[dateKey] || []).filter(e => e.id !== id),
        },
      };
    }

    // ── Movie days ──
    case 'TOGGLE_MOVIE_DAY': {
      const key = action.payload;
      return {
        ...state,
        movieDays: {
          ...state.movieDays,
          [key]: !state.movieDays[key],
        },
      };
    }

    // ── Conceptual type (A/B) ──
    case 'SET_CONCEPTUAL_TYPE': {
      const { dateKey, type } = action.payload;
      return {
        ...state,
        conceptualType: { ...state.conceptualType, [dateKey]: type },
      };
    }

    // ── Notifications ──
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: { ...state.notifications, ...action.payload },
      };

    default:
      return state;
  }
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [user, setUser] = useState(undefined); // undefined=loading, null=signed out
  const syncEnabledRef = useRef(false);
  const userUidRef = useRef(null);
  const debounceRef = useRef(null);

  // ── Auth state + initial Firestore load ───────────────────────────────────
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      syncEnabledRef.current = false;
      setUser(u);
      if (u) {
        userUidRef.current = u.uid;
        try {
          const snap = await getDoc(doc(db, 'users', u.uid, 'data', 'appState'));
          const payload = snap.exists() ? snap.data() : (getItem('app_state', null) || {});
          dispatch({ type: 'HYDRATE', payload });
        } catch {
          const local = getItem('app_state', null);
          if (local) dispatch({ type: 'HYDRATE', payload: local });
        }
        // Enable sync after hydration settles
        setTimeout(() => { syncEnabledRef.current = true; }, 200);
      } else {
        userUidRef.current = null;
        dispatch({ type: 'HYDRATE', payload: INITIAL_STATE });
      }
    });
    return unsub;
  }, []);

  // ── Persist to localStorage (always, even offline) ────────────────────────
  useEffect(() => {
    const { theme, projects, logs, movieDays, conceptualType, notifications } = state;
    setItem('app_state', { theme, projects, logs, movieDays, conceptualType, notifications });
  }, [state.theme, state.projects, state.logs, state.movieDays, state.conceptualType, state.notifications]);

  // ── Debounced Firestore sync ──────────────────────────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (!syncEnabledRef.current || !userUidRef.current) return;
      try {
        const { theme, projects, logs, movieDays, conceptualType, notifications } = state;
        await setDoc(
          doc(db, 'users', userUidRef.current, 'data', 'appState'),
          { theme, projects, logs, movieDays, conceptualType, notifications }
        );
      } catch (err) {
        console.warn('Firestore sync failed (offline?):', err.message);
      }
    }, 1500);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [state.theme, state.projects, state.logs, state.movieDays, state.conceptualType, state.notifications]);

  // ── Apply theme class to <html> ───────────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [state.theme]);

  const signIn = () => signInWithPopup(auth, googleProvider);
  const logOut = () => signOut(auth);

  return (
    <AppContext.Provider value={{ state, dispatch, user, signIn, logOut }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

// ─── Action helpers ───────────────────────────────────────────────────────────
export function addLog(dispatch, entry) {
  const dateKey = todayKey();
  dispatch({
    type: 'ADD_LOG',
    payload: {
      dateKey,
      entry: { id: generateId(), createdAt: Date.now(), ...entry },
    },
  });
}

export function addLogForDate(dispatch, dateKey, entry) {
  dispatch({
    type: 'ADD_LOG',
    payload: {
      dateKey,
      entry: { id: generateId(), createdAt: Date.now(), ...entry },
    },
  });
}
