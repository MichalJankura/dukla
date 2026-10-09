'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { inViewOnce, revealTransition, revealVariants } from './presets';

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  figure: motion.figure,
  li: motion.li,
} as const;

interface RevealProps {
  children: ReactNode;
  as?: keyof typeof tags;
  /** Seconds; use multiples of STAGGER_SECONDS for sequences. */
  delay?: number;
  className?: string;
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, as = 'div', delay = 0, className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Tag = tags[as];
  return (
    <Tag
      className={className}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="shown"
      viewport={inViewOnce}
      variants={revealVariants}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </Tag>
  );
}
