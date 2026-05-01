<script lang="ts">
	import { onMount } from 'svelte';

	import { getScenaContext } from '@/entities/scena';
	import { ScenaVideoPreload, ScenaVideoCrossOrigin, setScenaVideoContext } from '@/entities/video';
	import { formatComponentStyles } from '@/shared/utils';

	import { useVideoController } from '../model';
	import type { ScenaVideoProps, ScenaVideoSnippets } from '../model';

	let {
		id,
		src,
		type,
		media,
		poster,
		preload = ScenaVideoPreload.METADATA,
		crossorigin = ScenaVideoCrossOrigin.ANONYMOUS,
		autoplay = true,
		playsinline = true,
		loop = true,
		muted = true,
		controls = false,
		volume = 1,
		startTime = 0,
		customClasses,
		customStyles,
		children
	}: Partial<ScenaVideoProps & ScenaVideoSnippets> = $props();

	const { eventEmitter } = getScenaContext();

	let rootElement: HTMLDivElement;

	let mediaElement: HTMLVideoElement;

	export const controller = useVideoController({
		getVideoElement: () => mediaElement,
		eventEmitter
	});

	setScenaVideoContext(controller);

	const rootClasses = $derived(['rs-video', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const mediaClasses = $derived(['rs-video__media', customClasses?.video]);

	const mediaStyles = $derived(formatComponentStyles(customStyles?.video));

	onMount(() => {
		if (mediaElement) {
			mediaElement.currentTime = startTime;
			mediaElement.volume = volume;
			mediaElement.muted = muted;
		}
	});

	export function getElements() {
		return { root: rootElement, video: mediaElement };
	}
</script>

<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
	<video
		bind:this={mediaElement}
		class={mediaClasses}
		style={mediaStyles}
		{poster}
		{preload}
		{autoplay}
		{loop}
		{muted}
		{controls}
		{playsinline}
		{crossorigin}
		onloadedmetadata={controller.handleLoadedMetadata}
		onplay={controller.handlePlay}
		onpause={controller.handlePause}
		onseeking={controller.handleSeeking}
		onseeked={controller.handleSeeked}
		onended={controller.handleEnded}
		onloadstart={controller.handleLoadStart}
		onload={controller.handleLoaded}
		onwaiting={controller.handleWaiting}
		oncanplay={controller.handleCanPlay}
		ontimeupdate={controller.handleTimeUpdate}
		onvolumechange={controller.handleVolumeChange}
		onprogress={controller.handleProgress}
		onerror={controller.handleError}
	>
		<source {src} {type} {media} />
	</video>

	{#if children}
		{@render children()}
	{/if}
</div>
