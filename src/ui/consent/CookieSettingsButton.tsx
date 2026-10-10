'use client';

import type { ReactNode } from 'react';
import { openConsentPreferences } from '@/features/consent/useConsent';

/** Reopens the cookie preferences; styled by the caller to match its surroundings. */
export function CookieSettingsButton({
  className,
  children = 'Nastavenia cookies',
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      {children}
    </button>
  );
}
