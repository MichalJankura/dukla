'use client';

import { useSyncExternalStore } from 'react';

/** Live result of a CSS media query; `false` while rendering the static HTML. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const noSubscription = () => () => {};

/** The visitor asked their browser to save data (Data Saver / Lite mode). */
export function useSaveData(): boolean {
  return useSyncExternalStore(
    noSubscription,
    () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true,
    () => false,
  );
}
