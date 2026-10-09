import type { Transition, Variants } from 'motion/react';

/** Shared easing: fast start, long soft landing. Mirrors --ease-dukla in globals.css. */
export const EASE_OUT = [0.2, 0.7, 0.2, 1] as const;

export const STAGGER_SECONDS = 0.08;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0 },
};

export const revealTransition: Transition = { duration: 0.6, ease: EASE_OUT };

/** Trigger once, when the element is 10 % inside the viewport. */
export const inViewOnce = { once: true, margin: '0px 0px -10% 0px' } as const;
