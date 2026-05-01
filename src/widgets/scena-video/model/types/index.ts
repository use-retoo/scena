import type { ScenaEventEmitter } from '@/entities/event';
import { ScenaVideoPreload, ScenaVideoCrossOrigin } from '@/entities/video';
import type { ScenaVideoData, ScenaVideoMethods, ScenaVideoCallbacks } from '@/entities/video';
import type { ComponentSnippet, ComponentClasses, ComponentStyles } from '@/shared/types';

/** Custom CSS class overrides for the video widget. */
export interface ScenaVideoComponentClasses {
	/** Classes for the wrapper `<div>`. */
	root: ComponentClasses;
	/** Classes for the `<video>` element. */
	video: ComponentClasses;
}

/** Custom inline style overrides for the video widget. */
export interface ScenaVideoComponentStyles {
	/** Styles for the wrapper `<div>`. */
	root: ComponentStyles;
	/** Styles for the `<video>` element. */
	video: ComponentStyles;
}

/** Configuration props for the `<video>` element and its wrapper. */
export interface ScenaVideoProps {
	id: string;
	src: string;
	type: string;
	media: string;
	poster: string;
	preload: ScenaVideoPreload;
	crossorigin: ScenaVideoCrossOrigin;
	autoplay: boolean;
	playsinline: boolean;
	loop: boolean;
	muted: boolean;
	controls: boolean;
	volume: number;
	startTime: number;
	customClasses: Partial<ScenaVideoComponentClasses>;
	customStyles: Partial<ScenaVideoComponentStyles>;
}

/** Snippet slots for the video widget. */
export interface ScenaVideoSnippets {
	children: ComponentSnippet;
}

/** Options for creating the video controller. */
export interface UseVideoControllerOptions {
	/** Getter that returns the underlying `<video>` DOM element. */
	getVideoElement: () => HTMLVideoElement;
	/** Event emitter to broadcast video lifecycle events. */
	eventEmitter: ScenaEventEmitter;
}

/** Return value of `useVideoController` — combines reactive data, methods, and callbacks. */
export type UseVideoControllerReturns = ScenaVideoData & ScenaVideoMethods & ScenaVideoCallbacks;

/** Component ref for the video widget. */
export interface ScenaVideoRef {
	/** Video playback controller. */
	controller: UseVideoControllerReturns;
	/** Returns references to the root wrapper and video DOM elements. */
	getElements: () => { root: HTMLDivElement; video: HTMLVideoElement };
}
