import { useScena } from '@/app/entrypoint';
import type { ScenaConfig, ScenaInstance, UseScenaReturns } from '@/app/entrypoint';

import { TAG_NAME, SAFE_HTML_ELEMENT } from '../model';

/**
 * Custom HTML element that wraps the scena video widget.
 *
 * Register via {@link defineScenaElement}, then use as `<scena-video-widget>` in HTML.
 * Dispatches `scena:mount` and `scena:unmount` custom events on the element.
 *
 * @example
 * ```ts
 * defineScenaElement();
 * const el = document.createElement('scena-video-widget');
 * document.body.appendChild(el);
 * const instance = await el.mount({ video: { src: 'video.mp4' } });
 * ```
 */
export class ScenaElement extends SAFE_HTML_ELEMENT {
	static readonly tagName = TAG_NAME;

	private _instance: ScenaInstance | null = null;
	private _scena: UseScenaReturns | null = null;

	private _connected = false;

	/** Mount promise; concurrent calls share this instead of racing. */
	private _mountPending: Promise<ScenaInstance> | null = null;

	/** Unmount promise; concurrent calls share this instead of racing. */
	private _unmountPending: Promise<void> | null = null;

	/** The scena factory used to create and destroy the widget. */
	get scena(): UseScenaReturns | null {
		return this._scena;
	}

	/** The mounted widget instance, or `null` if not yet mounted. */
	get instance(): ScenaInstance | null {
		return this._instance;
	}

	connectedCallback() {
		this._connected = true;
	}

	disconnectedCallback() {
		this._connected = false;

		void this.unmount().catch((error) => {
			console.error('[scena] unmount failed on disconnect:', error);
		});
	}

	/**
	 * Mounts the scena widget inside this custom element.
	 *
	 * If already mounted, updates the config instead.
	 * If a mount or unmount is in flight, waits for it before proceeding —
	 * concurrent calls share the same promise instead of racing.
	 * Dispatches a `scena:mount` CustomEvent with the instance as `detail`.
	 *
	 * @param config - Widget configuration.
	 * @returns A promise resolving with the {@link ScenaInstance}.
	 */
	mount(config: ScenaConfig): Promise<ScenaInstance> {
		if (this._mountPending) {
			return this._mountPending;
		}

		this._mountPending = this._mount(config).finally(() => {
			this._mountPending = null;
		});

		return this._mountPending;
	}

	private async _mount(config: ScenaConfig): Promise<ScenaInstance> {
		if (this._unmountPending) {
			await this._unmountPending;
		}

		if (this._instance) {
			this._instance.config.setConfig(config);
			return this._instance;
		}

		const scena = useScena();
		const instance = await scena.mount(config);

		this._scena = scena;
		this._instance = instance;

		this.dispatchEvent(
			new CustomEvent<ScenaInstance>('scena:mount', {
				detail: instance,
				bubbles: true,
				composed: true
			})
		);

		return instance;
	}

	/**
	 * Unmounts the scena widget and dispatches a `scena:unmount` event.
	 * No-op if the widget is not currently mounted.
	 * Concurrent calls share the same in-flight promise.
	 */
	unmount(): Promise<void> {
		if (this._unmountPending) {
			return this._unmountPending;
		}

		if (!this._scena || !this._instance) {
			return Promise.resolve();
		}

		this._unmountPending = this._unmount().finally(() => {
			this._unmountPending = null;
		});

		return this._unmountPending;
	}

	private async _unmount(): Promise<void> {
		if (this._mountPending) {
			await this._mountPending;
		}

		if (!this._scena || !this._instance) {
			return;
		}

		const scena = this._scena;
		const instance = this._instance;

		this._scena = null;
		this._instance = null;

		await scena.unmount(instance);

		this.dispatchEvent(
			new CustomEvent<void>('scena:unmount', {
				bubbles: true,
				composed: true
			})
		);
	}
}
