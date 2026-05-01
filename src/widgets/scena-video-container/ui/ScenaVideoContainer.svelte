<script lang="ts">
	import { ScenaEvent } from '@/entities/event';
	import { getScenaContext } from '@/entities/scena';
	import { ComponentSize, ComponentShape } from '@/shared/enums';
	import { formatComponentStyles } from '@/shared/utils';

	import type { ScenaVideoContainerProps, ScenaVideoContainerSnippets } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		shape = ComponentShape.CIRCLE,
		aria,
		customClasses,
		customStyles,
		children
	}: Partial<ScenaVideoContainerProps & ScenaVideoContainerSnippets> = $props();

	const { eventEmitter } = getScenaContext();

	let rootElement: HTMLDivElement;

	const rootClasses = $derived([
		'rs-video-container',
		`rs-video-container--${size}`,
		`rs-video-container--${shape}`,
		customClasses?.root
	]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	function onVideoContainerClick(event: MouseEvent) {
		eventEmitter.emit(ScenaEvent.ON_VIDEO_CONTAINER_CLICK, event);
	}

	function onVideoContainerKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			eventEmitter.emit(ScenaEvent.ON_VIDEO_CONTAINER_CLICK, event);
		}
	}

	export function getElements() {
		return { root: rootElement };
	}
</script>

<div
	{id}
	bind:this={rootElement}
	class={rootClasses}
	style={rootStyles}
	aria-label={aria?.ariaLabel}
	aria-labelledby={aria?.ariaLabelledby}
	aria-describedby={aria?.ariaDescribedby}
	aria-disabled={aria?.ariaDisabled}
	aria-expanded={aria?.ariaExpanded}
	aria-controls={aria?.ariaControls}
	aria-haspopup={aria?.ariaHaspopup}
	aria-pressed={aria?.ariaPressed}
	role="button"
	tabindex="0"
	onclick={onVideoContainerClick}
	onkeydown={onVideoContainerKeydown}
>
	{#if children}
		{@render children()}
	{/if}
</div>
