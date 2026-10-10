'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { VideoAsset } from '@/features/events/types';
import { cn } from '@/lib/cn';
import { useMediaQuery, useSaveData } from '@/lib/useMediaQuery';
import { PauseIcon, PlayIcon } from '@/ui/icons';

interface LoopVideoProps {
  video: VideoAsset;
  /** Media query in which this slot plays the clip; elsewhere (and before hydration) it shows the poster. */
  media: string;
  /** `sizes` for the poster image. */
  sizes: string;
  /** Extra classes for the video/poster (object-position, filters). */
  className?: string;
  /** Position of the pause button inside the slot. */
  controlClassName?: string;
}

/**
 * Silent, endlessly looping clip that fills a `relative` parent.
 * - Plays only in its own media query, so a phone and a desktop slot never both download it.
 * - Pauses while off screen; stays a still image with reduced motion or Data Saver.
 * - Has a visible pause button (WCAG 2.2.2: moving content longer than 5 s must be pausable).
 */
export function LoopVideo({ video, media, sizes, className, controlClassName }: LoopVideoProps) {
  const inSlot = useMediaQuery(media);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const saveData = useSaveData();
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const playable = inSlot && !reduceMotion && !saveData;

  useEffect(() => {
    const element = ref.current;
    if (!element || !playable) return;
    if (paused) {
      element.pause();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) element.play().catch(() => undefined);
        else element.pause();
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [playable, paused]);

  if (!playable) {
    return <Image src={video.poster} alt="" fill sizes={sizes} className={cn('object-cover', className)} />;
  }

  return (
    <>
      <video
        ref={ref}
        className={cn('absolute inset-0 size-full object-cover', className)}
        poster={video.poster}
        width={video.width}
        height={video.height}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        {video.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? 'Prehrať video' : 'Pozastaviť video'}
        className={cn(
          'absolute z-10 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/75',
          controlClassName ?? 'right-3 bottom-3',
        )}
      >
        {paused ? <PlayIcon size={18} /> : <PauseIcon size={18} />}
      </button>
    </>
  );
}
