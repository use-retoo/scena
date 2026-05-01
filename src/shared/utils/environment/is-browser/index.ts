/**
 * `true` when the module is evaluated in a browser-like environment (DOM available).
 *
 * Use as an SSR guard for code that touches `window`, `document`, `customElements`, etc.
 * Resolved once at module load — bundlers can dead-code-eliminate the inactive branch.
 */
export const isBrowser: boolean = typeof window !== 'undefined' && typeof document !== 'undefined';
