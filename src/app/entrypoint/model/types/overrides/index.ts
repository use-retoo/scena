import type { OverrideLayer } from '@/shared/enums';

import type { ScenaConfig } from '../config';

/** Return value of {@link useScenaOverrides}. */
export interface UseScenaOverridesReturns {
	/** The resolved config with all override layers applied (reactive). */
	resolved: ScenaConfig;
	/** Compute and return the resolved config snapshot. */
	resolve: () => ScenaConfig;
	/** Set an override factory function for a named layer, or `null` to clear that layer. */
	set: (layer: OverrideLayer, value: (() => Partial<ScenaConfig>) | null) => void;
}
