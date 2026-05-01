import type { ScenaEvent } from '../enums';

/** Callback invoked when a subscribed event is emitted. */
export type ScenaEventHandler<T = unknown> = (data: T) => void;

/** Internal storage: event name → set of handlers. */
export type ScenaEventMap<T = unknown> = Map<ScenaEvent, Set<ScenaEventHandler<T>>>;

/** Pub/sub event bus for communication between scena components. */
export interface ScenaEventEmitter {
	/** Subscribe a handler to an event. */
	on(eventName: ScenaEvent, handler: ScenaEventHandler): void;
	/** Unsubscribe a specific handler from an event. */
	off(eventName: ScenaEvent, handler: ScenaEventHandler): void;
	/** Emit an event, calling all subscribed handlers with optional data. */
	emit<T>(eventName: ScenaEvent, data?: T): void;
	/** Remove all handlers for a specific event. */
	remove(eventName: ScenaEvent): void;
	/** Remove all handlers for all events. */
	clear(): void;
}
