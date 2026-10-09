'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

interface DriftProps {
  children: ReactNode;
  /** Horizontal travel in percent while the element crosses the viewport. */
  distance?: number;
  /** Direction of travel as the page scrolls down. */
  direction?: 'left' | 'right';
  className?: string;
}

/** Slides oversized type sideways with the scroll. */
export function Drift({ children, distance = 6, direction = 'left', className }: DriftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const sign = direction === 'left' ? 1 : -1;
  const x = useTransform(scrollYProgress, [0, 1], [`${sign * distance}%`, `${-sign * distance}%`]);

  return (
    <motion.div ref={ref} style={reduceMotion ? undefined : { x }} className={className}>
      {children}
    </motion.div>
  );
}
