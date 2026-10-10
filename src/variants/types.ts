import type { GalleryItem, MenuItem } from '@/features/catalog/types';
import type { Operator } from '@/features/legal/operator';
import type { Venue } from '@/features/venue/types';

/**
 * Everything a variant renders. Variants never fetch or compute dates themselves: they turn
 * `buildDay` into the live program with useLiveEvents and pass the snapshot down.
 */
export interface VariantPageProps {
  /** Business day the static HTML was generated for (YYYY-MM-DD). */
  buildDay: string;
  venue: Venue;
  gallery: readonly GalleryItem[];
  menu: readonly MenuItem[];
  operator: Operator;
}
