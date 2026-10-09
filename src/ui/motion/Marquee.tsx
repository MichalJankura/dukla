'use client';

import { Fragment, useRef } from 'react';
import { cn } from '@/lib/cn';
import { gsap, NO_REDUCED_MOTION, ScrollTrigger, useGSAP } from './gsap';

interface MarqueeProps {
  items: readonly string[];
  separator?: string;
  /** Seconds for one full loop at rest. */
  duration?: number;
  className?: string;
}

/**
 * Endless ticker. Two copies of the track slide by half their width; scrolling the page
 * briefly speeds the loop up, hovering pauses it.
 */
export function Marquee({ items, separator = '/', duration = 36, className }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      const media = gsap.matchMedia();
      media.add(NO_REDUCED_MOTION, () => {
        const loop = gsap.to(track, { xPercent: -50, ease: 'none', duration, repeat: -1 });
        tweenRef.current = loop;
        const boost = ScrollTrigger.create({
          onUpdate: (self) => {
            const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 800, 3);
            gsap.to(loop, { timeScale: speed, duration: 0.25, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.25 });
          },
        });
        return () => {
          boost.kill();
          loop.kill();
          tweenRef.current = null;
        };
      });
      return () => media.revert();
    },
    { dependencies: [duration] },
  );

  const group = (copy: number) => (
    <div aria-hidden={copy > 0 || undefined} className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item, index) => (
        <Fragment key={`${copy}-${index}`}>
          <span>{item}</span>
          <span aria-hidden="true">{separator}</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
