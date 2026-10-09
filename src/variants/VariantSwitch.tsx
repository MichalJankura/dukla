import Link from 'next/link';
import { cn } from '@/lib/cn';

interface VariantSwitchProps {
  current: string;
  options: { id: string; label: string }[];
}

/** Floating switch for presenting both concepts side by side. Enabled via env flag. */
export function VariantSwitch({ current, options }: VariantSwitchProps) {
  return (
    <nav
      aria-label="Varianty dizajnu"
      className="fixed right-4 bottom-4 z-[60] flex gap-1 rounded-full bg-black/80 p-1 font-sans text-xs shadow-lg ring-1 ring-white/15 backdrop-blur-md"
    >
      {options.map((option) => (
        <Link
          key={option.id}
          href={`/${option.id}`}
          aria-current={option.id === current ? 'page' : undefined}
          className={cn(
            'inline-flex min-h-9 items-center rounded-full px-3 font-medium transition-colors',
            option.id === current ? 'bg-dukla-cyan text-black' : 'text-white/80 hover:text-white',
          )}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
