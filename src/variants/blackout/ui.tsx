import type { ComponentPropsWithoutRef } from 'react';
import { cn, linkTargetProps } from '@/lib/cn';

/** Variant B building blocks, mapped to the Nike-inspired system (dark theme) with Dukla cyan. */

/** Page padding steps 16 → 24 → 48 px; content capped at the system's content-max. */
export const page = 'mx-auto w-full max-w-[1440px] px-4 md:px-6 lg:px-12';

/** Section padding steps 48 → 64 → 80 px. */
export const sectionY = 'py-12 md:py-16 lg:py-20';

/**
 * Condensed uppercase display, 48 → 64 → 96 px.
 * Leading 1.05 instead of the system's 0.90: accents on Slovak capitals (Á, Š, Í) would hit the line above.
 */
export const display =
  'm-0 font-bo-display text-[3rem] leading-[1.05] font-medium uppercase sm:text-[4rem] lg:text-bo-display';

/** The system's single divider, on the dark ground. */
export const dividerBottom = 'shadow-[inset_0_-1px_0_0_var(--color-bo-grey-700)]';
export const dividerTop = 'shadow-[inset_0_1px_0_0_var(--color-bo-grey-700)]';

export const sectionLinks = [
  { href: '#program', label: 'Program' },
  { href: '#bar', label: 'Bar' },
  { href: '#galeria', label: 'Galéria' },
  { href: '#kontakt', label: 'Kontakt' },
] as const;

const pillBase =
  'inline-flex items-center justify-center rounded-bo-pill text-bo-button no-underline transition-[background-color,border-color,color] duration-200 ease-out';

const pillTones = {
  solid: 'bg-bo-button-fill-dark text-bo-button-text-dark hover:bg-bo-button-hover-dark',
  cyan: 'bg-dukla-cyan text-bo-black hover:bg-dukla-glow',
  outline: 'border-[1.5px] border-bo-grey-400 text-white hover:border-white hover:bg-bo-grey-700',
} as const;

const pillSizes = { md: 'min-h-12 px-7', sm: 'min-h-11 px-5' } as const;

type PillProps = ComponentPropsWithoutRef<'a'> & {
  href: string;
  tone?: keyof typeof pillTones;
  size?: keyof typeof pillSizes;
};

/** Title-case, two or three words, always a pill. */
export function Pill({ href, tone = 'solid', size = 'md', className, ...props }: PillProps) {
  return (
    <a
      href={href}
      {...linkTargetProps(href)}
      className={cn(pillBase, pillTones[tone], pillSizes[size], className)}
      {...props}
    />
  );
}
