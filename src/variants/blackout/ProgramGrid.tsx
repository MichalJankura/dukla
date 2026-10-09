'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { formatShortDate } from '@/features/events/date';
import { EVENT_FILTERS, type EventFilter } from '@/features/events/filter';
import { formatPartyMeta } from '@/features/events/format';
import type { PartyView } from '@/features/events/types';
import { useEventFilter } from '@/features/events/useEventFilter';
import { cn, linkTargetProps } from '@/lib/cn';
import { EASE_OUT } from '@/ui/motion/presets';
import { display } from './ui';

const FILTER_LABELS: Record<EventFilter, string> = { all: 'Všetko', next: 'Najbližšie', past: 'Archív' };

/** Dense poster grid with Všetko / Najbližšie / Archív filter pills. */
export function ProgramGrid({ events, fallbackHref }: { events: PartyView[]; fallbackHref: string }) {
  const { filter, setFilter, visible, counts } = useEventFilter(events);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h2 className={display}>Program</h2>
          <p className="m-0 text-bo-body text-bo-grey-400">Plagáty a termíny z nášho Instagramu.</p>
        </div>
        <div role="group" aria-label="Filter programu" className="flex flex-wrap gap-2">
          {EVENT_FILTERS.map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
              className={cn(
                'min-h-11 cursor-pointer rounded-bo-pill border-[1.5px] px-5 text-bo-button-small transition-colors duration-200',
                filter === id
                  ? 'border-white bg-white text-bo-black'
                  : 'border-bo-grey-700 bg-bo-grey-800 text-white hover:border-white hover:bg-bo-grey-700',
              )}
            >
              {FILTER_LABELS[id]} ({counts[id]})
            </button>
          ))}
        </div>
      </div>

      <motion.ul layout={!reduceMotion} className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((event) => (
            <motion.li
              key={event.id}
              layout={!reduceMotion}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE_OUT }}
            >
              <EventCard event={event} fallbackHref={fallbackHref} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}

function EventCard({ event, fallbackHref }: { event: PartyView; fallbackHref: string }) {
  const past = event.status === 'past';
  const href = event.instagramUrl ?? fallbackHref;

  return (
    <a href={href} {...linkTargetProps(href)} className="group flex flex-col text-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-bo-grey-800">
        {event.poster ? (
          <Image
            src={event.poster.src}
            alt={event.poster.alt}
            fill
            sizes="(min-width: 1280px) 340px, (min-width: 640px) 50vw, 100vw"
            className={cn(
              'object-cover transition-[transform,filter] duration-600 ease-dukla group-hover:scale-[1.04]',
              past && 'grayscale group-hover:grayscale-0',
            )}
            style={{ objectPosition: '50% 40%' }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <Image src="/brand/dukla-mark.webp" alt="" width={84} height={70} className="opacity-45" />
            <span className="text-bo-caption text-bo-grey-300">Plagát čoskoro</span>
          </div>
        )}
      </div>
      <span
        className={cn(
          'block h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-dukla group-hover:scale-x-100',
          past ? 'bg-bo-grey-400' : 'bg-dukla-cyan',
        )}
      />
      <div className="flex flex-col gap-0.5 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <span className={cn('text-bo-caption', past ? 'text-bo-grey-400' : 'text-dukla-cyan')}>
            {formatShortDate(event.date)}
            {past && ' · Archív'}
          </span>
          {event.status === 'today' && (
            <span className="rounded-bo-pill bg-dukla-cyan px-2.5 text-bo-small text-bo-black">Dnes</span>
          )}
          {event.status === 'tomorrow' && (
            <span className="rounded-bo-pill border border-dukla-cyan px-2.5 text-bo-small text-dukla-cyan">
              Zajtra
            </span>
          )}
        </div>
        <span className="text-bo-heading-3 decoration-2 underline-offset-4 group-hover:underline">
          {event.title}
        </span>
        <span className="text-bo-body text-bo-grey-400">
          {event.tba ? 'Ohlásime čoskoro' : formatPartyMeta(event)}
        </span>
      </div>
    </a>
  );
}
