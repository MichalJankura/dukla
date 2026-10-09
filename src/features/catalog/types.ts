import type { ImageAsset } from '@/features/events/types';

export interface GalleryItem extends ImageAsset {
  caption: string;
  /** CSS object-position for the crop, e.g. "50% 55%". */
  focus?: string;
}

export interface MenuItem {
  id: string;
  category: string;
  name: string;
  note: string;
  /** null until the price is confirmed. */
  price: number | null;
  promo?: boolean;
  image?: ImageAsset;
  instagramUrl?: string;
}
