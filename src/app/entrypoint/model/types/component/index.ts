import type { ScenaEventEmitter } from '@/entities/event';
import type { ScenaContainerRef } from '@/widgets/scena-container';
import type { ScenaCloseButtonRef } from '@/widgets/scena-controls';
import type { ScenaCtaButtonRef } from '@/widgets/scena-cta';
import type { UseVideoControllerReturns, ScenaVideoRef } from '@/widgets/scena-video';
import type { ScenaVideoContainerRef } from '@/widgets/scena-video-container';
import type { ScenaVideoControlsRef } from '@/widgets/scena-video-controls';
import type { ScenaVideoLoaderRef } from '@/widgets/scena-video-loader';
import type { ScenaVideoProgressRef } from '@/widgets/scena-video-progress';
import type { ScenaVideoVolumeRef } from '@/widgets/scena-video-volume';

import type { ScenaConfig, UseScenaConfigReturns } from '../config';
import type { ScenaPreviewApi } from '../preview';
import type { ScenaResponsiveApi } from '../responsive';
import type { ScenaVisibilityApi } from '../visibility';

/** Mount target — a regular DOM element or a Shadow DOM root. */
export type ScenaTarget = HTMLElement | ShadowRoot;

/** Handle returned after mounting; provides runtime access to the widget. */
export interface ScenaInstance {
	/** Public widget API (e.g. play, pause, destroy). */
	api: ScenaApi;
	/** Reference to the mounted Svelte component. */
	component: ScenaRef;
	/** Reactive config store for reading and updating the widget config. */
	config: UseScenaConfigReturns;
	/** Preview feature API (start, stop, isPreviewing). */
	preview: ScenaPreviewApi;
	/** Responsive feature API (activeBreakpoint). */
	responsive: ScenaResponsiveApi;
	/** Visibility feature API (show, hide, isHidden). */
	visibility: ScenaVisibilityApi;
}

/** Registry of all component refs within a mounted scena widget. Nullable refs correspond to optional components. */
export interface ScenaComponents {
	container: ScenaContainerRef;
	video: ScenaVideoRef;
	videoContainer: ScenaVideoContainerRef;
	videoLoader: ScenaVideoLoaderRef | null;
	videoProgress: ScenaVideoProgressRef | null;
	videoControls: ScenaVideoControlsRef | null;
	videoVolume: ScenaVideoVolumeRef | null;
	closeButton: ScenaCloseButtonRef | null;
	ctaButton: ScenaCtaButtonRef | null;
}

/** Top-level API returned by {@link useScena}. */
export interface UseScenaReturns {
	/** Library name. */
	NAME: string;
	/** Library version. */
	VERSION: string;
	/** Mount the widget into a target element with the given config. */
	mount: (config: ScenaConfig, target?: ScenaTarget) => Promise<ScenaInstance>;
	/** Unmount a previously mounted widget instance. */
	unmount: (instance: ScenaInstance) => Promise<void>;
}

/** Internal props passed to the root Scena Svelte component. */
export interface ScenaProps {
	/** Resolved widget config (with overrides applied). */
	config: ScenaConfig;
	/** Shared event bus created by the factory. */
	eventEmitter: ScenaEventEmitter;
	/** Callback invoked when the component is mounted. */
	mount: () => void;
	/** Callback invoked when the component requests unmount. */
	unmount: () => void;
}

/** Top-level API surface exposed by a mounted scena widget. */
export interface ScenaApi {
	/** Video playback controller (play, pause, seek, volume, etc.). */
	controller: UseVideoControllerReturns;
	/** References to all child component instances. */
	components: ScenaComponents;
	/** Pub/sub event bus for widget events. */
	events: ScenaEventEmitter;
}

/** Reference to the root Scena Svelte component. */
export interface ScenaRef {
	/** Top-level widget API. */
	api: ScenaApi;
}
