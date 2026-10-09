/** Joins class names, skipping falsy parts. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Opens absolute http(s) links in a new tab; hash and relative links stay in place. */
export function linkTargetProps(href: string): { target?: '_blank'; rel?: string } {
  return /^https?:\/\//.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
