import { useState, useEffect, useCallback, useRef } from 'react';
import { getCurrentBlock, minutesRemainingInBlock } from '../utils/time';

/**
 * Manages browser notification permissions and fires block-end warnings.
 */
export function useNotifications({ enabled, warningMinutes = 10 }) {
  const [permission, setPermission] = useState(() =>
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );
  const notifiedRef = useRef(new Set());

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') return 'denied';
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const sendNotification = useCallback((title, body, options = {}) => {
    if (!enabled || permission !== 'granted') return;
    try {
      const n = new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: options.tag || 'ptracker',
        ...options,
      });
      setTimeout(() => n.close(), 8000);
    } catch {
      // Notifications blocked or unavailable
    }
  }, [enabled, permission]);

  useEffect(() => {
    if (!enabled || permission !== 'granted') return;

    const checkBlock = () => {
      const block = getCurrentBlock();
      if (!block) return;

      const minsLeft = minutesRemainingInBlock(block);
      const key = `${block.id}-${warningMinutes}`;

      if (minsLeft <= warningMinutes && minsLeft > warningMinutes - 1.5) {
        if (!notifiedRef.current.has(key)) {
          notifiedRef.current.add(key);
          sendNotification(
            `⏱ ${block.label} ending in ${Math.ceil(minsLeft)} min`,
            `Current block: ${block.label}\nNext up: wrap up and transition.`,
            { tag: `block-end-${block.id}` }
          );
        }
      } else if (minsLeft > warningMinutes) {
        notifiedRef.current.delete(key);
      }
    };

    checkBlock();
    const interval = setInterval(checkBlock, 60_000);
    return () => clearInterval(interval);
  }, [enabled, permission, warningMinutes, sendNotification]);

  return { permission, requestPermission, sendNotification };
}
