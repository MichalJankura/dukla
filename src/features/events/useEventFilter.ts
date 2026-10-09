'use client';

import { useMemo, useState } from 'react';
import { countByFilter, filterEvents, type EventFilter } from './filter';
import type { PartyView } from './types';

/** Filter state for a program listing. Pure logic lives in ./filter; this only holds the selection. */
export function useEventFilter(events: readonly PartyView[], initial: EventFilter = 'all') {
  const [filter, setFilter] = useState<EventFilter>(initial);
  const visible = useMemo(() => filterEvents(events, filter), [events, filter]);
  const counts = useMemo(() => countByFilter(events), [events]);
  return { filter, setFilter, visible, counts };
}
