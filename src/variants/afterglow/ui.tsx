import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn, linkTargetProps } from '@/lib/cn';

/** Variant A building blocks, mapped to the Apple-inspired system with Dukla cyan as the action colour. */

export const container = 'mx-auto w-full max-w-[1120px]';

export const sectionTitle =
  'm-0 font-ag-display text-[2.25rem] leading-[1.08] font-semibold tracking-[-0.003em] md:text-ag-section';

export const sectionLinks = [
  { href: '#program', label: 'Program' },
  { href: '#den-noc', label: 'Deň & Noc' },
  { href: '#bar', label: 'Bar' },
  { href: '#galeria', label: 'Galéria' },
  { href: '#kontakt', label: 'Kontakt' },
] as const;

/** Hover lift shared by cards: one step up, cyan edge, card shadow. */
export const liftOnHover =
  'transition-[transform,border-color,box-shadow] duration-500 ease-dukla hover:-translate-y-1 hover:border-dukla-cyan/65 hover:shadow-ag-card-hover';

const pillBase =
  'inline-flex items-center justify-center gap-2 rounded-ag-pill font-medium no-underline transition-[background-color,box-shadow,transform,color,border-color] duration-200 ease-out active:scale-[0.97]';

const pillTones = {
  primary:
    'bg-dukla-cyan text-ag-black hover:bg-dukla-glow hover:shadow-[0_0_0_1px_rgb(51_243_254/0.4),0_8px_32px_rgb(48_226_227/0.45)]',
  ghost: 'border border-ag-gray-700 text-dukla-cyan hover:border-dukla-cyan hover:bg-dukla-cyan/12',
  ink: 'bg-ag-ink-900 text-ag-white hover:bg-ag-black hover:shadow-ag-overlay',
  'ghost-light':
    'border border-ag-gray-500 text-dukla-cyan-ink hover:border-dukla-cyan-ink hover:bg-dukla-cyan-ink/8',
} as const;

const pillSizes = {
  md: 'min-h-12 px-7 text-[17px]',
  sm: 'min-h-8 px-4 text-xs',
} as const;

type PillLinkProps = ComponentPropsWithoutRef<'a'> & {
  href: string;
  tone?: keyof typeof pillTones;
  size?: keyof typeof pillSizes;
};

/** Showcase CTA: the system's pill, in pairs. */
export function PillLink({ href, tone = 'primary', size = 'md', className, ...props }: PillLinkProps) {
  return (
    <a
      href={href}
      {...linkTargetProps(href)}
      className={cn(pillBase, pillTones[tone], pillSizes[size], className)}
      {...props}
    />
  );
}

export function Eyebrow({ children, onLight = false }: { children: ReactNode; onLight?: boolean }) {
  return (
    <p
      className={cn(
        'm-0 text-sm font-semibold tracking-[0.16em] uppercase',
        onLight ? 'text-dukla-cyan-ink' : 'text-dukla-cyan',
      )}
    >
      {children}
    </p>
  );
}
