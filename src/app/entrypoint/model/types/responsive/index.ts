import type { ScenaOverrides } from '../config';

/** Public API for the responsive feature. */
export interface ScenaResponsiveApi {
	/** The currently active breakpoint (max-width in px), or `null` if none matched. */
	activeBreakpoint: number | null;
}

/** Return value of {@link useScenaResponsive}. */
export interface UseScenaResponsiveReturns {
	/** Set up matchMedia listeners and apply the initial breakpoint. */
	apply: () => void;
	/** Remove all listeners and clear responsive overrides. */
	destroy: () => void;
	/** Reactive responsive API. */
	api: ScenaResponsiveApi;
}

/** Responsive config — object of breakpoints mapped to partial overrides. */
export type ScenaResponsiveConfig = Record<number, Partial<ScenaOverrides>>;
