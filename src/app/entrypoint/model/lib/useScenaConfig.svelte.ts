import { deepClone, deepMerge } from '@/shared/utils';

import type { ScenaConfig, UseScenaConfigReturns } from '../types';

/**
 * Creates a reactive config store for the scena widget.
 *
 * Provides getter, setter, and deep-merge methods for managing
 * the widget configuration at runtime.
 *
 * @param initial - The initial widget configuration.
 * @returns A reactive config store with `current`, `getConfig`, `setConfig`, and `mergeConfig`.
 */
export default function useScenaConfig(initial: ScenaConfig): UseScenaConfigReturns {
	let config: ScenaConfig = $state(deepClone(initial));

	function getConfig(): ScenaConfig {
		return config;
	}

	function setConfig(value: ScenaConfig) {
		config = deepClone(value);
	}

	function mergeConfig(partial: Partial<ScenaConfig>) {
		setConfig(deepMerge(config, partial) as ScenaConfig);
	}

	return {
		get current() {
			return config;
		},
		getConfig,
		setConfig,
		mergeConfig
	};
}
