import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export default function LoginPage() {
  const { signIn } = useApp();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await signIn();
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Sign-in failed. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full max-w-sm"
      >
        {/* Card */}
        <div className="glass-card p-8 flex flex-col items-center text-center">
          {/* Profile / logo */}
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Workbench"
            className="w-16 h-16 rounded-2xl object-cover mb-5 ring-2 ring-[var(--border)]"
          />

          <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-1">
            Workbench
          </h1>
          <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed">
            Your personal research productivity tracker.<br />Sign in to sync your data across all devices.
          </p>

          {/* Google sign-in button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card-h)] hover:bg-[var(--bg-card)] hover:border-[var(--border-hover)] transition-colors font-semibold text-sm text-[var(--text-primary)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              /* Google SVG logo */
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.5 30.3 0 24 0 14.6 0 6.6 5.5 2.7 13.5l7.9 6.1C12.5 13.2 17.8 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.8-2.1 5.1-4.4 6.7l7 5.4C43.4 37.1 46.5 31.3 46.5 24.5z"/>
                <path fill="#FBBC05" d="M10.6 28.4A14.6 14.6 0 0 1 9.5 24c0-1.5.3-3 .7-4.4l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.5 10.8l8.1-6.4z"/>
                <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7-5.4c-2.1 1.4-4.8 2.2-8.9 2.2-6.2 0-11.5-3.7-13.4-9.1l-8.1 6.4C6.6 42.5 14.6 48 24 48z"/>
              </svg>
            )}
            {loading ? 'Signing in…' : 'Continue with Google'}
          </motion.button>

          {error && (
            <p className="mt-3 text-xs text-rose-500">{error}</p>
          )}

          <p className="mt-6 text-[10px] text-[var(--text-muted)] leading-relaxed">
            Data is stored securely in your personal Firestore database.<br />
            Only you can access it.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
