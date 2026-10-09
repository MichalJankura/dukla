import { byDateAsc, byDateDesc, isUpcoming } from './status';
import type { PartyView } from './types';

export const EVENT_FILTERS = ['all', 'next', 'past'] as const;
export type EventFilter = (typeof EVENT_FILTERS)[number];

/** Upcoming nights soonest first, then the archive latest first. */
export function filterEvents(events: readonly PartyView[], filter: EventFilter): PartyView[] {
  const upcoming = events.filter(isUpcoming).sort(byDateAsc);
  const past = events.filter((event) => !isUpcoming(event)).sort(byDateDesc);
  if (filter === 'next') return upcoming;
  if (filter === 'past') return past;
  return [...upcoming, ...past];
}

export function countByFilter(events: readonly PartyView[]): Record<EventFilter, number> {
  const next = events.filter(isUpcoming).length;
  return { all: events.length, next, past: events.length - next };
}
