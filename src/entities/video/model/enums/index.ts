/** Preload strategy for the `<video>` element. */
export enum ScenaVideoPreload {
	NONE = 'none',
	AUTO = 'auto',
	METADATA = 'metadata'
}

/** CORS setting for the `<video>` element. */
export enum ScenaVideoCrossOrigin {
	ANONYMOUS = 'anonymous',
	USE_CREDENTIALS = 'use-credentials'
}

/** Playback state of the video player. */
export enum ScenaVideoState {
	IDLE = 'idle',
	LOADING = 'loading',
	PLAYING = 'playing',
	PAUSED = 'paused',
	ENDED = 'ended',
	ERROR = 'error'
}
