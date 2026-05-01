<script lang="ts">
	import { ComponentPlacement, ComponentPosition } from '@/shared/enums';
	import { formatComponentStyles } from '@/shared/utils';

	import type { ScenaContainerProps, ScenaContainerSnippets } from '../model';

	let {
		id,
		position = ComponentPosition.FIXED,
		placement = ComponentPlacement.BOTTOM_END,
		customClasses,
		customStyles,
		children
	}: Partial<ScenaContainerProps & ScenaContainerSnippets> = $props();

	let rootElement: HTMLDivElement;

	const customPlacements = [ComponentPosition.ABSOLUTE, ComponentPosition.FIXED];

	const isCustomPlacement = $derived(customPlacements.includes(position));

	const rootClasses = $derived([
		'rs-container',
		`rs-container--${position}`,
		isCustomPlacement && `rs-container--${placement}`,
		customClasses?.root
	]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements() {
		return { root: rootElement };
	}
</script>

<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
	{#if children}
		{@render children()}
	{/if}
</div>
