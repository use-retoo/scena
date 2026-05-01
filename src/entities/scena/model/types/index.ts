import type { ScenaEventEmitter } from '@/entities/event';

/** Svelte context shared across all scena child components. */
export interface ScenaContext {
	/** Widget-wide event bus. */
	eventEmitter: ScenaEventEmitter;
	/** Trigger the component mount lifecycle. */
	mount: () => void;
	/** Trigger the component unmount lifecycle. */
	unmount: () => void;
}
