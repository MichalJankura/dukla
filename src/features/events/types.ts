export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** One price tier of the door fee, e.g. 3 € until 22:00, then 5 €. */
export interface EntryTier {
  price: number;
  /** Local time (HH:mm) until which this tier applies; the last tier has none. */
  until?: string;
}

export interface PriceHighlight {
  label: string;
  price: number;
}

interface EventBase {
  id: string;
  title: string;
  description?: string;
  poster?: ImageAsset;
  instagramUrl?: string;
}

/** A dated night in the program. */
export interface PartyRecord extends EventBase {
  kind: 'party';
  /** Local calendar date (Europe/Bratislava), YYYY-MM-DD. */
  date: string;
  /** Start of the party (HH:mm). */
  startTime: string;
  /** Doors, when they open earlier than the party starts (HH:mm). */
  doorsTime?: string;
  lineup?: string[];
  entry?: EntryTier[];
  /** Night is on the calendar but its line-up has not been announced yet. */
  tba?: boolean;
}

/** An undated bar offer, e.g. a beer promotion. */
export interface PromoRecord extends EventBase {
  kind: 'promo';
  highlights: PriceHighlight[];
}

export type EventRecord = PartyRecord | PromoRecord;

export type TimelineStatus = 'today' | 'tomorrow' | 'upcoming' | 'past';

export type PartyView = PartyRecord & { status: TimelineStatus };
export type PromoView = PromoRecord & { status: 'promo' };
export type EventView = PartyView | PromoView;

export interface EventsSnapshot {
  /** Business day the snapshot was taken for (a night counts until 05:00). */
  businessDay: string;
  tonight: PartyView | null;
  /** Today and later, soonest first. */
  upcoming: PartyView[];
  /** Before today, latest first. */
  past: PartyView[];
  promos: PromoView[];
  /** Upcoming parties plus promos, in that order, for spotlight carousels. */
  featured: EventView[];
}
