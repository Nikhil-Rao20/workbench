import { format, formatDistanceToNow, parseISO, differenceInDays } from 'date-fns';
import { TIME_BLOCKS } from '../data/schedule';

// ─── Time string helpers ──────────────────────────────────────────────────────

/** Convert "HH:MM" string → total minutes from midnight */
export function timeStrToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

/** Get current time in minutes from midnight */
export function nowInMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/** Format milliseconds → "HH:MM:SS" */
export function msToHHMMSS(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Format minutes → "Xh Ym" or "Ym" */
export function minToHHMM(minutes) {
  if (!minutes || minutes <= 0) return '0m';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
}

/** Format total seconds → "Xh Ym" condensed */
export function secToHHMM(seconds) {
  return minToHHMM(Math.floor(seconds / 60));
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

/** Today as "YYYY-MM-DD" */
export function todayKey() {
  return format(new Date(), 'yyyy-MM-dd');
}

/** Any date → "YYYY-MM-DD" */
export function dateToKey(date) {
  return format(date, 'yyyy-MM-dd');
}

/** "YYYY-MM-DD" → Date object */
export function keyToDate(key) {
  return parseISO(key);
}

/** Human-friendly date: "Friday, March 12" */
export function friendlyDate(date = new Date()) {
  return format(date, 'EEEE, MMMM d');
}

/** Short date: "Mar 12" */
export function shortDate(date = new Date()) {
  return format(date, 'MMM d');
}

/** Deadline relative text e.g. "5 days left" */
export function deadlineRelative(deadlineStr) {
  if (!deadlineStr) return null;
  const d = parseISO(deadlineStr);
  const days = differenceInDays(d, new Date());
  if (days < 0) return 'Overdue';
  if (days === 0) return 'Due today';
  if (days === 1) return '1 day left';
  return `${days} days left`;
}

/** Is the deadline urgent? (≤7 days) */
export function isUrgent(deadlineStr) {
  if (!deadlineStr) return false;
  const days = differenceInDays(parseISO(deadlineStr), new Date());
  return days >= 0 && days <= 7;
}

// ─── Schedule helpers ─────────────────────────────────────────────────────────

/**
 * Get the currently active time block based on wall clock.
 * Returns null if no block matches (e.g. in a gap).
 */
export function getCurrentBlock() {
  const now = nowInMinutes();
  for (const block of TIME_BLOCKS) {
    const start = timeStrToMinutes(block.start);
    let end = timeStrToMinutes(block.end);
    // Handle blocks that cross midnight (e.g. wind-down 23:00 → 06:00)
    if (end < start) {
      // Block crosses midnight
      if (now >= start || now < end) return block;
    } else {
      if (now >= start && now < end) return block;
    }
  }
  return null;
}

/**
 * Minutes remaining until the current block ends.
 */
export function minutesRemainingInBlock(block) {
  if (!block) return 0;
  const now = nowInMinutes();
  let end = timeStrToMinutes(block.end);
  const start = timeStrToMinutes(block.start);
  // Handle overnight blocks
  if (end < start && now >= start) {
    end += 24 * 60; // add a day
  }
  const remaining = end - now;
  return Math.max(0, remaining);
}

/**
 * Progress through the current block (0–1).
 */
export function blockProgress(block) {
  if (!block) return 0;
  const now = nowInMinutes();
  let start = timeStrToMinutes(block.start);
  let end = timeStrToMinutes(block.end);
  if (end < start) end += 24 * 60;
  let adjustedNow = now;
  if (end > 24 * 60 && now < start) adjustedNow += 24 * 60;
  const total = end - start;
  const elapsed = adjustedNow - start;
  return Math.min(1, Math.max(0, elapsed / total));
}

/**
 * Get the next upcoming block from now.
 */
export function getNextBlock() {
  const now = nowInMinutes();
  const upcoming = TIME_BLOCKS.filter(b => {
    const start = timeStrToMinutes(b.start);
    return start > now;
  }).sort((a, b) => timeStrToMinutes(a.start) - timeStrToMinutes(b.start));
  return upcoming[0] || TIME_BLOCKS[0];
}

/** Last 7 day keys (newest first) */
export function last7DayKeys() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return dateToKey(d);
  });
}

/** Day-of-week name for a date key */
export function dayOfWeekLabel(dateKey) {
  return format(parseISO(dateKey), 'EEE');
}

/** Generate a unique short ID */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}
