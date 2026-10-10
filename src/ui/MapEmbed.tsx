import { cn } from '@/lib/cn';

interface MapEmbedProps {
  /** Google Maps "Share → Embed a map" URL (https://www.google.com/maps/embed?pb=…). */
  src: string;
  title: string;
  className?: string;
}

/**
 * Google map of the venue, shown straight away (lazy-loaded when it nears the viewport).
 * Loading it sends the visitor's IP to Google, which may set its own cookies — the cookie
 * policy (/cookies/) says so.
 */
export function MapEmbed({ src, title, className }: MapEmbedProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <iframe
        title={title}
        src={src}
        className="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
