import type { GalleryItem, MenuItem } from '@/features/catalog/types';
import type { EventsSnapshot } from '@/features/events/types';
import type { Venue } from '@/features/venue/types';

/** Everything a variant renders. Variants never fetch or compute dates themselves. */
export interface VariantPageProps {
  events: EventsSnapshot;
  venue: Venue;
  gallery: readonly GalleryItem[];
  menu: readonly MenuItem[];
}
