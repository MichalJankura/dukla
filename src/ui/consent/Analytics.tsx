'use client';

import Script from 'next/script';
import { useConsent } from '@/features/consent/useConsent';

/**
 * Loads gtag.js only once the visitor has granted analytics consent. The consent defaults and the
 * GA4 config are already queued by the inline bootstrap in app/layout.tsx, so loading the library
 * is enough; GA4 then tracks page changes on its own (enhanced measurement).
 */
export function Analytics({ measurementId }: { measurementId: string }) {
  const consent = useConsent();
  if (!consent?.analytics) return null;
  return (
    <Script
      id="ga4"
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
      strategy="afterInteractive"
    />
  );
}
