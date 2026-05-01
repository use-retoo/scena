import type { ScenaVideoState } from '../enums';

/** Reactive state data of the video player. */
export interface ScenaVideoData {
	/** Current playback state. */
	state: ScenaVideoState;
	/** Current playback position in seconds. */
	currentTime: number;
	/** Total video duration in seconds. */
	duration: number;
	/** Playback progress as a fraction (0–1). */
	progress: number;
	/** Active `requestAnimationFrame` ID for progress tracking, if any. */
	progressAnimationFrameId: number | null;
	/** Current volume level (0–1). */
	volume: number;
	/** Buffered amount as a fraction (0–1). */
	buffer: number;
	/** Raw `TimeRanges` from the video element. */
	buffered: TimeRanges | null;
	/** Whether the video is currently buffering. */
	isBuffering: boolean;
	/** Whether a seek operation is in progress. */
	isSeeking: boolean;
	/** Whether the video is muted. */
	isMuted: boolean;
}

/** Imperative methods for controlling video playback. */
export interface ScenaVideoMethods {
	/** Start or resume playback. */
	play: () => Promise<void>;
	/** Pause playback. */
	pause: () => void;
	/** Stop playback and reset to the beginning. */
	stop: () => void;
	/** Seek to a specific time in seconds. */
	seek: (value: number) => void;
	/** Set the volume level (0–1). */
	setVolume: (value: number) => void;
	/** Mute the video. */
	mute: () => void;
	/** Unmute the video. */
	unmute: () => void;
	/** Toggle between muted and unmuted. */
	toggleMute: () => void;
}

/** Event handler callbacks bound to native `<video>` element events. */
export interface ScenaVideoCallbacks {
	handleLoadedMetadata: (event: Event) => void;
	handlePlay: (event: Event) => void;
	handlePause: (event: Event) => void;
	handleSeeking: (event: Event) => void;
	handleSeeked: (event: Event) => void;
	handleSeekStart: (event: Event, state: ScenaVideoState) => void;
	handleSeekEnd: (event: Event, state: ScenaVideoState) => Promise<void>;
	handleEnded: (event: Event) => void;
	handleLoadStart: (event: Event) => void;
	handleLoaded: (event: Event) => void;
	handleWaiting: (event: Event) => void;
	handleCanPlay: (event: Event) => void;
	handleTimeUpdate: (event: Event) => void;
	handleVolumeChange: (event: Event) => void;
	handleProgress: (event: Event) => void;
	handleError: (event: Event) => void;
}

/** Full video context combining reactive data, methods, and callbacks. */
export type ScenaVideoContext = ScenaVideoData & ScenaVideoMethods & ScenaVideoCallbacks;

/** Event options carrying the original DOM event. */
export interface ScenaVideoEventOptionsWithEvent {
	state: ScenaVideoState;
	event: Event;
}

/** Event options carrying an error payload. */
export interface ScenaVideoEventOptionsWithError {
	state: ScenaVideoState;
	error: unknown;
}

/** Discriminated union of video event option types. */
export type ScenaVideoEventOptions =
	| ScenaVideoEventOptionsWithEvent
	| ScenaVideoEventOptionsWithError;
