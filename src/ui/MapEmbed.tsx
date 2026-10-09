'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/cn';

interface MapEmbedProps {
  /** Free-text place query for Google Maps. */
  query: string;
  title: string;
  address: string;
  tone: 'light' | 'dark';
  className?: string;
}

/**
 * Click-to-load map. Google Maps sets third-party cookies, so the iframe only loads after the
 * visitor asks for it (GDPR-friendly, and faster first paint).
 */
export function MapEmbed({ query, title, address, tone, className }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const dark = tone === 'dark';

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {loaded ? (
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <Image
            src={dark ? '/brand/dukla-mark.webp' : '/brand/dukla-mark-ink.webp'}
            alt=""
            width={72}
            height={60}
          />
          <p className={cn('m-0 text-[17px] font-semibold', dark ? 'text-white' : 'text-ag-ink-900')}>
            {address}
          </p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className={cn(
              'min-h-11 cursor-pointer rounded-full border px-5 text-sm font-medium transition-colors duration-200',
              dark
                ? 'border-bo-grey-400 text-white hover:border-white hover:bg-bo-grey-700'
                : 'border-ag-gray-500 text-dukla-cyan-ink hover:border-dukla-cyan-ink hover:bg-dukla-cyan-ink/10',
            )}
          >
            Zobraziť mapu
          </button>
          <p className={cn('m-0 max-w-xs text-xs', dark ? 'text-bo-grey-400' : 'text-ag-gray-600')}>
            Načíta Google Maps, ktoré môžu ukladať cookies.
          </p>
        </div>
      )}
    </div>
  );
}
