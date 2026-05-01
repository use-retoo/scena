import { SvelteMap } from 'svelte/reactivity';

import { OverrideLayer } from '@/shared/enums';
import { deepMerge } from '@/shared/utils';

import type { ScenaConfig, UseScenaConfigReturns, UseScenaOverridesReturns } from '../types';

/** Fixed merge order — layers are applied left-to-right on top of the base config. */
const LAYER_ORDER = [OverrideLayer.RESPONSIVE, OverrideLayer.PREVIEW];

/**
 * Manages runtime config overrides via named layers and a deep-merge strategy.
 *
 * Each layer is identified by name and merged in a fixed order
 * (responsive → preview), so higher-priority layers always win.
 *
 * @param config - The reactive config store to overlay overrides on.
 * @returns A reactive `resolved` config and methods to `set`/`resolve` overrides.
 */
export default function useScenaOverrides(config: UseScenaConfigReturns): UseScenaOverridesReturns {
	const layers = new SvelteMap<OverrideLayer, () => Partial<ScenaConfig>>();

	function set(layer: OverrideLayer, value: (() => Partial<ScenaConfig>) | null) {
		if (value === null) {
			layers.delete(layer);
		} else {
			layers.set(layer, value);
		}
	}

	function resolve(): ScenaConfig {
		let result = config.current;

		for (const name of LAYER_ORDER) {
			const fn = layers.get(name);

			if (fn) {
				result = deepMerge(result, fn() as ScenaConfig);
			}
		}

		return result;
	}

	const resolved = $derived(resolve());

	return {
		get resolved() {
			return resolved;
		},
		resolve,
		set
	};
}
