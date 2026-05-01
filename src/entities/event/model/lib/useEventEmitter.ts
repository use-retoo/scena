import type { ScenaEvent } from '../enums';
import type { ScenaEventMap, ScenaEventHandler, ScenaEventEmitter } from '../types';

/** Creates a pub/sub event emitter instance. */
export function useEventEmitter(): ScenaEventEmitter {
	const events: ScenaEventMap = new Map();

	function on(eventName: ScenaEvent, handler: ScenaEventHandler) {
		if (!events.has(eventName)) {
			events.set(eventName, new Set());
		}

		events.get(eventName)?.add(handler);
	}

	function off(eventName: ScenaEvent, handler: ScenaEventHandler) {
		const handlers = events.get(eventName);

		if (handlers) {
			handlers.delete(handler);
		}
	}

	function emit<T>(eventName: ScenaEvent, data?: T) {
		const handlers = events.get(eventName);

		if (handlers) {
			handlers.forEach((handler) => handler(data));
		}
	}

	function remove(eventName: ScenaEvent) {
		events.get(eventName)?.clear();
	}

	function clear() {
		events.clear();
	}

	return { on, off, emit, remove, clear };
}
