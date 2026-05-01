/** Event names emitted by the scena widget event bus. */
export enum ScenaEvent {
	/** Fired when the scena component is mounted in the DOM. */
	ON_SCENA_MOUNT = 'scena:on-mount',
	/** Fired when the scena instance is destroyed. */
	ON_SCENA_DESTROY = 'scena:on-destroy',

	/** Fired when the video element is ready for playback. */
	ON_VIDEO_READY = 'video:on-ready',
	/** Fired when video playback starts. */
	ON_VIDEO_PLAY = 'video:on-play',
	/** Fired when the browser can start playing the video. */
	ON_VIDEO_CAN_PLAY = 'video:on-can-play',
	/** Fired when video playback is paused. */
	ON_VIDEO_PAUSE = 'video:on-pause',
	/** Fired while the video is seeking to a new position. */
	ON_VIDEO_SEEKING = 'video:on-seeking',
	/** Fired when a seek operation completes. */
	ON_VIDEO_SEEKED = 'video:on-seeked',
	/** Fired when the user begins a seek interaction. */
	ON_VIDEO_SEEK_START = 'video:on-seek-start',
	/** Fired when the user ends a seek interaction. */
	ON_VIDEO_SEEK_END = 'video:on-seek-end',
	/** Fired when the video reaches the end. */
	ON_VIDEO_ENDED = 'video:on-ended',
	/** Fired when the browser begins loading video data. */
	ON_VIDEO_LOAD_START = 'video:on-load-start',
	/** Fired when video metadata has been loaded. */
	ON_VIDEO_LOADED = 'video:on-loaded',
	/** Fired periodically as video playback progresses. */
	ON_VIDEO_TIME_UPDATE = 'video:on-time-update',
	/** Fired when the volume or muted state changes. */
	ON_VIDEO_VOLUME_CHANGE = 'video:on-volume-change',
	/** Fired when the video playback state changes (e.g. playing → paused). */
	ON_VIDEO_STATE_CHANGE = 'video:on-state-change',
	/** Fired when the video stalls and starts buffering. */
	ON_VIDEO_WAITING = 'video:on-waiting',
	/** Fired when the video download progresses. */
	ON_VIDEO_PROGRESSED = 'video:on-progressed',
	/** Fired when a video playback error occurs. */
	ON_VIDEO_ERROR = 'video:on-error',

	/** Fired when the video container area is clicked. */
	ON_VIDEO_CONTAINER_CLICK = 'video-container:click',
	/** Fired when the CTA button is clicked. */
	ON_CTA_CLICK = 'cta:click',
	/** Fired when the close button is clicked. */
	ON_CLOSE_CLICK = 'close:click',

	/** Fired when preview mode is activated. */
	ON_PREVIEW_START = 'preview:start',
	/** Fired when preview mode is deactivated. */
	ON_PREVIEW_STOP = 'preview:stop',

	/** Fired when the widget becomes visible. */
	ON_VISIBILITY_SHOW = 'visibility:show',
	/** Fired when the widget becomes hidden. */
	ON_VISIBILITY_HIDE = 'visibility:hide'
}
