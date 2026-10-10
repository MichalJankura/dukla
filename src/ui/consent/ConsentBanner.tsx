'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { CONSENT_OPEN_EVENT } from '@/features/consent/consent';
import { readConsent, saveConsent, useConsent } from '@/features/consent/useConsent';
import { cn } from '@/lib/cn';

const button =
  'inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-medium transition-colors duration-200';

/**
 * Cookie bar shared by both variants. Shown until the visitor decides; reopened from the footer
 * or the cookie policy. Rejecting is exactly as easy as accepting (same size, same step).
 */
export function ConsentBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const onOpen = () => {
      setAnalytics(readConsent()?.analytics ?? false);
      setShowDetails(true);
      setReopened(true);
      requestAnimationFrame(() => panelRef.current?.focus());
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  if (!reopened && consent !== null) return null;

  const decide = (granted: boolean) => {
    saveConsent(granted);
    setReopened(false);
    setShowDetails(false);
  };

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      tabIndex={-1}
      className="fixed inset-x-3 bottom-3 z-[70] flex flex-col gap-4 rounded-[20px] bg-[#111111]/95 p-5 font-ag-text text-[15px] leading-relaxed text-white shadow-2xl ring-1 ring-white/12 backdrop-blur-md outline-none sm:right-auto sm:bottom-4 sm:left-4 sm:max-w-[440px]"
    >
      <div className="flex flex-col gap-1.5">
        <h2 id={titleId} className="m-0 text-base font-semibold">
          Cookies
        </h2>
        <p className="m-0 text-white/75">
          Nevyhnutné úložisko si pamätá vašu voľbu. S vaším súhlasom použijeme aj Google Analytics na
          štatistiku návštevnosti. Viac v{' '}
          <Link href="/cookies/" className="text-dukla-cyan underline-offset-2 hover:underline">
            zásadách cookies
          </Link>
          .
        </p>
      </div>

      {showDetails && (
        <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
          <legend className="sr-only">Kategórie cookies</legend>
          <div className="flex items-start justify-between gap-4 rounded-xl bg-white/6 p-3">
            <span>
              <span className="block font-medium">Nevyhnutné</span>
              <span className="block text-sm text-white/65">Zapamätanie vašej voľby cookies.</span>
            </span>
            <span className="shrink-0 text-sm text-white/65">Vždy aktívne</span>
          </div>
          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl bg-white/6 p-3">
            <span>
              <span className="block font-medium">Analytické</span>
              <span className="block text-sm text-white/65">
                Google Analytics 4: štatistika návštevnosti.
              </span>
            </span>
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
              className="mt-1 size-5 shrink-0 cursor-pointer accent-dukla-cyan"
            />
          </label>
        </fieldset>
      )}

      <div className="flex flex-wrap gap-2">
        {showDetails ? (
          <button
            type="button"
            onClick={() => decide(analytics)}
            className={cn(button, 'bg-dukla-cyan text-black hover:bg-dukla-glow')}
          >
            Uložiť výber
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => decide(true)}
              className={cn(button, 'bg-dukla-cyan text-black hover:bg-dukla-glow')}
            >
              Prijať všetko
            </button>
            <button
              type="button"
              onClick={() => decide(false)}
              className={cn(button, 'border border-white/35 text-white hover:border-white hover:bg-white/10')}
            >
              Odmietnuť
            </button>
          </>
        )}
      </div>
      {!showDetails && (
        <button
          type="button"
          onClick={() => {
            setAnalytics(readConsent()?.analytics ?? false);
            setShowDetails(true);
          }}
          className="-mt-1 cursor-pointer self-start p-1 text-sm text-white/75 underline-offset-2 hover:text-white hover:underline"
        >
          Nastavenia
        </button>
      )}
    </div>
  );
}
