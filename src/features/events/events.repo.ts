import { eventRecords } from '@/content/events';
import { businessDay } from './date';
import { byDateAsc, byDateDesc, timelineStatus } from './status';
import type { EventRecord, EventsSnapshot, PartyView, PromoView } from './types';

/** The program as seen on a given business day (YYYY-MM-DD). */
export function snapshotForBusinessDay(
  today: string,
  records: readonly EventRecord[] = eventRecords,
): EventsSnapshot {
  const parties: PartyView[] = [];
  const promos: PromoView[] = [];

  for (const record of records) {
    if (record.kind === 'party') parties.push({ ...record, status: timelineStatus(record.date, today) });
    else promos.push({ ...record, status: 'promo' });
  }

  const upcoming = parties.filter((event) => event.status !== 'past').sort(byDateAsc);
  // A night that passed without ever being announced has nothing to show in the archive.
  const past = parties.filter((event) => event.status === 'past' && !event.tba).sort(byDateDesc);

  return {
    businessDay: today,
    tonight: upcoming.find((event) => event.status === 'today') ?? null,
    upcoming,
    past,
    promos,
    featured: [...upcoming.slice(0, 2), ...promos],
  };
}

/**
 * The program as seen at `now`. The site is exported as static HTML, so this runs at build time
 * for the initial markup; useLiveEvents recomputes it in the visitor's browser.
 */
export function getEventsSnapshot(
  now: Date = new Date(),
  records: readonly EventRecord[] = eventRecords,
): EventsSnapshot {
  return snapshotForBusinessDay(businessDay(now), records);
}
