/**
 * Cookie consent: what the visitor chose and how it is stored.
 * Pure functions only — the browser glue lives in useConsent.ts, the pre-hydration
 * bootstrap in bootstrap.ts. Both read the same key, version and lifetime from here.
 */

export const CONSENT_STORAGE_KEY = 'dukla-consent';

/** Bump when categories change; older choices are then asked for again. */
export const CONSENT_VERSION = 1;

/** A choice is asked for again after 12 months. */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/** Fired on window when the choice changes in this tab. */
export const CONSENT_CHANGE_EVENT = 'dukla:consent-change';

/** Fired on window to reopen the preferences (footer, cookie policy). */
export const CONSENT_OPEN_EVENT = 'dukla:consent-open';

export interface ConsentChoice {
  version: number;
  /** Google Analytics 4 (analytics_storage). Necessary storage needs no consent. */
  analytics: boolean;
  /** ISO timestamp of the decision. */
  decidedAt: string;
}

export function createConsent(analytics: boolean, now: Date = new Date()): ConsentChoice {
  return { version: CONSENT_VERSION, analytics, decidedAt: now.toISOString() };
}

/** Stored JSON → a valid, current choice, or null when the visitor has to be asked (again). */
export function parseConsent(raw: string | null, now: Date = new Date()): ConsentChoice | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== 'object' || value === null) return null;
  const { version, analytics, decidedAt } = value as Record<string, unknown>;
  if (version !== CONSENT_VERSION || typeof analytics !== 'boolean' || typeof decidedAt !== 'string') {
    return null;
  }
  const decided = Date.parse(decidedAt);
  if (Number.isNaN(decided) || now.getTime() - decided > CONSENT_MAX_AGE_MS) return null;
  return { version, analytics, decidedAt };
}

/** GA4 measurement IDs look like G-XXXXXXXXXX; anything else is rejected before it reaches a script. */
export function isMeasurementId(value: string | undefined): value is string {
  return typeof value === 'string' && /^G-[A-Z0-9]{4,20}$/.test(value);
}
