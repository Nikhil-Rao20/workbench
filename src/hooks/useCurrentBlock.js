import { useState, useEffect, useRef } from 'react';
import { getCurrentBlock, getNextBlock, minutesRemainingInBlock } from '../utils/time';

/**
 * Returns the current time block, auto-refreshing every 30 seconds.
 */
export function useCurrentBlock() {
  const [currentBlock, setCurrentBlock] = useState(() => getCurrentBlock());
  const [nextBlock, setNextBlock] = useState(() => getNextBlock());
  const [minutesLeft, setMinutesLeft] = useState(() =>
    minutesRemainingInBlock(getCurrentBlock())
  );

  useEffect(() => {
    const tick = () => {
      const block = getCurrentBlock();
      setCurrentBlock(block);
      setNextBlock(getNextBlock());
      setMinutesLeft(minutesRemainingInBlock(block));
    };

    // Refresh every 30s
    const interval = setInterval(tick, 30_000);
    return () => clearInterval(interval);
  }, []);

  return { currentBlock, nextBlock, minutesLeft };
}
