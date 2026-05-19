<script lang="ts">
	import { getScenaVideoContext, ScenaVideoState } from '@/entities/video';
	import { ComponentSize } from '@/shared/enums';
	import { ScenaLoader } from '@/shared/ui/scena-loader';
	import { formatComponentStyles, resolveElements } from '@/shared/utils';

	import type { ScenaVideoLoaderElements, ScenaVideoLoaderProps } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		customClasses,
		customStyles,
		customHtml
	}: Partial<ScenaVideoLoaderProps> = $props();

	const scenaVideoContext = getScenaVideoContext();

	let rootElement: HTMLDivElement | null = $state(null);

	let loaderElement: ScenaLoader | null = $state(null);

	const rootClasses = $derived(['rs-video-loader', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements(): ScenaVideoLoaderElements {
		return {
			root: rootElement,
			loader: resolveElements(loaderElement)
		};
	}
</script>

<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
	{#if scenaVideoContext.state === ScenaVideoState.LOADING}
		{#if customHtml?.loader}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html customHtml.loader}
		{:else}
			<ScenaLoader
				bind:this={loaderElement}
				{size}
				customClasses={{ root: customClasses?.loader }}
				customStyles={{ root: customStyles?.loader }}
			/>
		{/if}
	{/if}
</div>
