'use client';

import { useRef } from 'react';
import { gsap, NO_REDUCED_MOTION, useGSAP } from './gsap';

/**
 * Scroll-scrubbed parallax: the element drifts `amount` percent against the scroll while its
 * parent crosses the viewport. Scaled up slightly so the edges never show.
 */
export function useParallax<T extends HTMLElement>(amount = 6) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      const media = gsap.matchMedia();
      media.add(NO_REDUCED_MOTION, () => {
        gsap.fromTo(
          element,
          { yPercent: -amount, scale: 1.12 },
          {
            yPercent: amount,
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentElement ?? element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: ref, dependencies: [amount] },
  );

  return ref;
}
