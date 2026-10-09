'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { businessDay } from './date';
import { snapshotForBusinessDay } from './events.repo';
import type { EventsSnapshot } from './types';

const CHECK_INTERVAL_MS = 60_000;

/** Re-reads the clock every minute and whenever the tab comes back into view. */
function subscribeToClock(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, CHECK_INTERVAL_MS);
  document.addEventListener('visibilitychange', onChange);
  return () => {
    window.clearInterval(timer);
    document.removeEventListener('visibilitychange', onChange);
  };
}

/**
 * The program for the visitor's current business day.
 *
 * The static HTML is rendered with `buildDay`; after hydration the browser's clock takes over,
 * so "Dnes / Zajtra / Archív" stay correct without a rebuild. Re-renders only when the day changes.
 */
export function useLiveEvents(buildDay: string): EventsSnapshot {
  const today = useSyncExternalStore(
    subscribeToClock,
    () => businessDay(),
    () => buildDay,
  );
  return useMemo(() => snapshotForBusinessDay(today), [today]);
}
