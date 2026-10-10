import type { ImageAsset, VideoAsset } from '@/features/events/types';

/** 0 = Sunday … 6 = Saturday, matching Date#getDay. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface OpeningSlot {
  day: Weekday;
  /** HH:mm local time. */
  opens: string;
  /** HH:mm local time; earlier than `opens` means after midnight. */
  closes: string;
}

export interface Venue {
  name: string;
  shortName: string;
  tagline: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
    countryCode: string;
  };
  links: {
    instagram: string;
    instagramHandle: string;
    facebook: string;
    maps: string;
    /** Google Maps embed URL (Share → Embed a map). */
    mapEmbed: string;
    /** Drinks menu PDF; hidden until it exists. */
    drinksMenu: string | null;
  };
  hours: {
    /** Party nights. */
    night: OpeningSlot[];
    /** Day bar: label is always shown, times once they are confirmed. */
    day: { label: string; opens: string | null; closes: string | null };
    closedLabel: string;
  };
  heroImage: ImageAsset;
  /** Portrait loop: hero background on phones, story card on desktop. */
  heroVideo: VideoAsset;
}
