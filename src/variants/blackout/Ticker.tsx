import { formatDayMonth } from '@/features/events/date';
import { formatPrice } from '@/features/events/format';
import type { EventsSnapshot } from '@/features/events/types';
import { formatNightSummary } from '@/features/venue/hours';
import type { Venue } from '@/features/venue/types';
import { Marquee } from '@/ui/motion/Marquee';

/** Ticker copy from the data: next nights, their DJs, bar offers, hours, handle. */
export function tickerItems(events: EventsSnapshot, venue: Venue): string[] {
  const nights = events.upcoming.filter((event) => !event.tba).slice(0, 2);
  return [
    ...nights.flatMap((event) => [
      `${event.title} ${formatDayMonth(event.date).slice(0, -1)}`,
      ...(event.lineup ?? []),
    ]),
    ...events.promos.flatMap((promo) => promo.highlights.map((h) => `${h.label} ${formatPrice(h.price)}`)),
    formatNightSummary(venue.hours.night).replace(' · ', ' '),
    venue.links.instagramHandle,
  ];
}

export function Ticker({ items }: { items: string[] }) {
  return (
    <div className="border-t border-bo-black bg-dukla-cyan py-3.5 font-bo-display text-[1.5rem] leading-none font-medium text-bo-black uppercase md:text-[2.25rem]">
      <Marquee items={items} />
    </div>
  );
}
