import { eventRecords } from '@/content/events';
import { businessDay } from './date';
import { byDateAsc, byDateDesc, timelineStatus } from './status';
import type { EventRecord, EventsSnapshot, PartyView, PromoView } from './types';

/**
 * Builds the program as seen at `now`. Pages are statically generated and revalidated,
 * so "today" is recomputed at most once per revalidation window.
 */
export function getEventsSnapshot(
  now: Date = new Date(),
  records: readonly EventRecord[] = eventRecords,
): EventsSnapshot {
  const today = businessDay(now);
  const parties: PartyView[] = [];
  const promos: PromoView[] = [];

  for (const record of records) {
    if (record.kind === 'party') parties.push({ ...record, status: timelineStatus(record.date, today) });
    else promos.push({ ...record, status: 'promo' });
  }

  const upcoming = parties.filter((event) => event.status !== 'past').sort(byDateAsc);
  const past = parties.filter((event) => event.status === 'past').sort(byDateDesc);

  return {
    businessDay: today,
    tonight: upcoming.find((event) => event.status === 'today') ?? null,
    upcoming,
    past,
    promos,
    featured: [...upcoming.slice(0, 2), ...promos],
  };
}
