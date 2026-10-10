'use client';

import { useMemo, useSyncExternalStore } from 'react';
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_OPEN_EVENT,
  CONSENT_STORAGE_KEY,
  createConsent,
  parseConsent,
  type ConsentChoice,
} from './consent';

/** Used when localStorage is unavailable (private mode, blocked storage): the choice lasts for the visit. */
let memoryFallback: string | null = null;

function readRaw(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return memoryFallback;
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('storage', onChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  };
}

/**
 * The visitor's current choice.
 * - `undefined` while rendering the static HTML (unknown, nothing shown yet)
 * - `null` when they have not decided (or the choice expired)
 * - the choice otherwise
 */
export function useConsent(): ConsentChoice | null | undefined {
  const raw = useSyncExternalStore(subscribe, readRaw, () => undefined);
  return useMemo(() => (raw === undefined ? undefined : parseConsent(raw)), [raw]);
}

export function readConsent(): ConsentChoice | null {
  return parseConsent(readRaw());
}

/** Removes Google Analytics cookies from this host and its parent domain. */
function clearAnalyticsCookies(): void {
  const names = document.cookie
    .split(';')
    .map((part) => part.split('=')[0]?.trim() ?? '')
    .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid');
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

export function saveConsent(analytics: boolean): void {
  const serialized = JSON.stringify(createConsent(analytics));
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
  } catch {
    memoryFallback = serialized;
  }
  window.gtag?.('consent', 'update', { analytics_storage: analytics ? 'granted' : 'denied' });
  if (!analytics) clearAnalyticsCookies();
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** Reopens the cookie preferences (footer link, cookie policy page). */
export function openConsentPreferences(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
