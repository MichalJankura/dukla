'use client';

import Image from 'next/image';
import type { ImageAsset } from '@/features/events/types';
import { cn } from '@/lib/cn';
import { useParallax } from './useParallax';

interface ParallaxImageProps {
  image: ImageAsset;
  sizes: string;
  priority?: boolean;
  amount?: number;
  objectPosition?: string;
  className?: string;
}

/** Fills a `relative overflow-hidden` parent and drifts with the scroll. */
export function ParallaxImage({
  image,
  sizes,
  priority,
  amount,
  objectPosition,
  className,
}: ParallaxImageProps) {
  const ref = useParallax<HTMLDivElement>(amount);
  return (
    <div ref={ref} className="absolute inset-0 will-change-transform">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className={cn('object-cover', className)}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
