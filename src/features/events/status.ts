import { addDays } from './date';
import type { PartyView, TimelineStatus } from './types';

export function timelineStatus(date: string, today: string): TimelineStatus {
  if (date === today) return 'today';
  if (date === addDays(today, 1)) return 'tomorrow';
  return date > today ? 'upcoming' : 'past';
}

export function isUpcoming(event: Pick<PartyView, 'status'>): boolean {
  return event.status !== 'past';
}

export function byDateAsc(a: { date: string }, b: { date: string }): number {
  return a.date.localeCompare(b.date);
}

export function byDateDesc(a: { date: string }, b: { date: string }): number {
  return b.date.localeCompare(a.date);
}
