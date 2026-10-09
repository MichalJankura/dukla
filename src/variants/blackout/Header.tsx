import Image from 'next/image';
import { formatShortDate } from '@/features/events/date';
import { formatLineup } from '@/features/events/format';
import type { EventsSnapshot } from '@/features/events/types';
import type { Venue } from '@/features/venue/types';
import { cn, linkTargetProps } from '@/lib/cn';
import { InstagramIcon } from '@/ui/icons';
import { dividerBottom, page, Pill, sectionLinks } from './ui';

const WHEN = { today: 'Dnes', tomorrow: 'Zajtra' } as const;

/** Promo banner with the next night, then the sticky bar. */
export function Header({ venue, events }: { venue: Venue; events: EventsSnapshot }) {
  const next = events.tonight ?? events.upcoming[0] ?? null;
  const when = next && (next.status === 'today' || next.status === 'tomorrow') ? WHEN[next.status] : null;

  return (
    <>
      {next && (
        <p className="m-0 bg-bo-black px-4 py-2 text-center text-bo-small text-white">
          {when ?? formatShortDate(next.date)}:{' '}
          {[next.title, formatLineup(next.lineup)].filter(Boolean).join(' · ')} · od {next.startTime} ·{' '}
          <a href="#program" className="underline underline-offset-2 hover:text-dukla-cyan">
            Pozrieť program
          </a>
        </p>
      )}
      <header className={cn('sticky top-0 z-50 bg-bo-grey-900', dividerBottom)}>
        <nav
          aria-label="Hlavná navigácia"
          className={cn(page, 'flex min-h-[60px] flex-wrap items-center justify-between gap-x-4 md:gap-x-6')}
        >
          <a
            href="#top"
            aria-label={`${venue.shortName}, na začiatok`}
            className="flex items-center gap-3 py-2.5"
          >
            <Image src="/brand/dukla-mark.webp" alt="" width={36} height={30} priority />
            <Image
              src="/brand/dukla-wordtype.webp"
              alt=""
              width={102}
              height={17}
              priority
              className="h-auto w-[84px] sm:w-[102px]"
            />
          </a>
          <ul className="order-3 -mx-4 flex w-[calc(100%+2rem)] gap-8 overflow-x-auto px-4 text-bo-link md:order-none md:mx-0 md:w-auto md:overflow-visible md:px-0">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative block py-3 whitespace-nowrap text-white after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-dukla-cyan after:transition-transform after:duration-200 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={venue.links.instagram}
              {...linkTargetProps(venue.links.instagram)}
              aria-label={`Instagram ${venue.links.instagramHandle}`}
              className="flex size-11 items-center justify-center rounded-full bg-bo-grey-800 text-white transition-colors duration-200 hover:bg-bo-grey-700"
            >
              <InstagramIcon size={22} />
            </a>
            <Pill href={venue.links.instagram} tone="cyan" size="sm">
              Rezervovať
            </Pill>
          </div>
        </nav>
      </header>
    </>
  );
}
