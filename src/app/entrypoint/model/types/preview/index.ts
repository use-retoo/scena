import type { ScenaOverrides, UseScenaConfigReturns } from '../config';
import type { UseScenaOverridesReturns } from '../overrides';

/** Public API for controlling preview mode at runtime. */
export interface ScenaPreviewApi {
	/** Whether preview mode is currently active. */
	isPreviewing: boolean;
	/** Whether video position is preserved when expanding from preview. */
	isKeepTimeOnExpand: boolean;
	/** Whether mute state is preserved when expanding from preview. */
	isKeepMuteOnExpand: boolean;
	/** Activate preview mode, applying preview overrides. */
	start: () => void;
	/** Deactivate preview mode, removing preview overrides. */
	stop: () => void;
}

/** Return value of {@link useScenaPreview}. */
export interface UseScenaPreviewReturns {
	/** Apply initial preview state from config. */
	apply: () => void;
	/** Reactive public API for controlling preview mode. */
	api: ScenaPreviewApi;
}

/** Behavioral options for preview mode. */
export interface ScenaPreviewBehavior {
	/** When true, preserves video playback position when expanding from preview. */
	keepTimeOnExpand: boolean;
	/** When true, preserves mute state when expanding from preview. */
	keepMuteOnExpand: boolean;
}

/** Preview config — same shape as {@link ScenaOverrides}. */
export type ScenaPreviewConfig = ScenaOverrides & ScenaPreviewBehavior;

/** Options for constructing the preview feature. */
export interface UseScenaPreviewOptions {
	config: UseScenaConfigReturns;
	configOverrides: UseScenaOverridesReturns;
}
