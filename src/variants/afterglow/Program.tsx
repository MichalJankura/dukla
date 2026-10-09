import Image from 'next/image';
import { formatShortDate } from '@/features/events/date';
import { formatPartyMeta } from '@/features/events/format';
import type { EventsSnapshot, PartyView } from '@/features/events/types';
import type { Venue } from '@/features/venue/types';
import { cn, linkTargetProps } from '@/lib/cn';
import { ChevronRightIcon } from '@/ui/icons';
import { Reveal } from '@/ui/motion/Reveal';
import { ProgramSpotlight } from './ProgramSpotlight';
import { container, Eyebrow, sectionTitle } from './ui';

const CHIP_LABEL = { today: 'Dnes', tomorrow: 'Zajtra', upcoming: 'Čoskoro', past: 'Archív' } as const;

export function Program({ events, venue }: { events: EventsSnapshot; venue: Venue }) {
  const listed = [...events.upcoming.filter((event) => event.status !== 'today'), ...events.past];

  return (
    <section id="program" className="bg-ag-black px-6 py-20 md:py-32">
      <div className={container}>
        <ProgramSpotlight
          slides={events.featured}
          reserveUrl={venue.links.instagram}
          header={
            <div className="flex flex-col gap-3">
              <Eyebrow>Program</Eyebrow>
              <h2 className={sectionTitle}>Tento víkend v Dukle.</h2>
            </div>
          }
        />
        {listed.length > 0 && <EventRows events={listed} fallbackHref={venue.links.instagram} />}
      </div>
    </section>
  );
}

function EventRows({ events, fallbackHref }: { events: PartyView[]; fallbackHref: string }) {
  return (
    <Reveal className="mt-14">
      <h3 className="m-0 mb-4 font-ag-display text-ag-utility-heading">Ďalšie a minulé večery</h3>
      <ul className="border-t border-ag-gray-700">
        {events.map((event) => {
          const past = event.status === 'past';
          const href = event.instagramUrl ?? fallbackHref;
          return (
            <li key={event.id}>
              <a
                href={href}
                {...linkTargetProps(href)}
                className="group flex flex-wrap items-center gap-x-8 gap-y-1.5 border-b border-ag-gray-700 px-4 py-5 text-ag-pale-gray transition-colors duration-200 hover:bg-ag-graphite-a"
              >
                <Thumb event={event} />
                <span
                  className={cn(
                    'w-[110px] text-ag-body-emphasis',
                    past ? 'text-ag-gray-500' : 'text-dukla-cyan',
                  )}
                >
                  {formatShortDate(event.date)}
                </span>
                <span className="flex-[1_1_220px] font-ag-display text-[21px] font-semibold">
                  {event.title}
                </span>
                <span className="flex-[0_1_280px] text-ag-control text-ag-gray-500">
                  {event.tba ? 'Ohlásime čoskoro' : formatPartyMeta(event)}
                </span>
                <span
                  className={cn(
                    'rounded-ag-pill border px-3 py-1 text-xs font-semibold',
                    past ? 'border-ag-gray-700 text-ag-gray-500' : 'border-dukla-cyan text-dukla-cyan',
                  )}
                >
                  {CHIP_LABEL[event.status]}
                </span>
                <ChevronRightIcon
                  size={22}
                  className={cn(
                    'ml-auto transition-transform duration-300 ease-dukla group-hover:translate-x-1.5',
                    past ? 'text-ag-gray-500' : 'text-dukla-cyan',
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </Reveal>
  );
}

function Thumb({ event }: { event: PartyView }) {
  if (event.poster) {
    return (
      <Image
        src={event.poster.src}
        alt=""
        width={48}
        height={60}
        className="h-[60px] w-12 shrink-0 rounded-ag-sm object-cover"
      />
    );
  }
  return (
    <span className="flex h-[60px] w-12 shrink-0 items-center justify-center rounded-ag-sm bg-ag-graphite-d">
      <Image src="/brand/dukla-mark.webp" alt="" width={24} height={20} className="opacity-60" />
    </span>
  );
}
