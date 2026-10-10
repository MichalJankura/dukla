export {};

declare global {
  interface Window {
    /** Google tag queue, created by the consent bootstrap in app/layout.tsx. */
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
