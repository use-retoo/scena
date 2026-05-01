/** Return value of {@link useScenaVisibility}. */
export interface UseScenaVisibilityReturns {
	/** Apply initial visibility state from config defaults. */
	apply: () => void;
	/** Reactive public API for controlling widget visibility. */
	api: ScenaVisibilityApi;
}

/** Public API for controlling widget visibility at runtime. */
export interface ScenaVisibilityApi {
	/** Whether the widget is currently hidden. */
	isHidden: boolean;
	/** Whether the widget should auto-show when the video is ready. */
	isShownOnReady: boolean;
	/** Show the widget (set `isHidden` to `false`). */
	show: () => void;
	/** Hide the widget (set `isHidden` to `true`). */
	hide: () => void;
}

/** Visibility feature configuration options. */
export interface ScenaVisibilityConfig {
	/** Start the widget in a hidden state. */
	isHidden?: boolean;
	/** Enable CSS animations for show/hide transitions. */
	isAnimated?: boolean;
	/** Automatically show the widget when the video is ready. Defaults to `true`. */
	isShownOnReady?: boolean;
}
