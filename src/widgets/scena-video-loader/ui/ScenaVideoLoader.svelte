<script lang="ts">
	import { getScenaVideoContext, ScenaVideoState } from '@/entities/video';
	import { ComponentSize } from '@/shared/enums';
	import { ScenaLoader } from '@/shared/ui/scena-loader';
	import { formatComponentStyles } from '@/shared/utils';

	import type { ScenaVideoLoaderProps } from '../model';

	let {
		id,
		size = ComponentSize.MD,
		customClasses,
		customStyles
	}: Partial<ScenaVideoLoaderProps> = $props();

	const scenaVideoContext = getScenaVideoContext();

	let rootElement: HTMLDivElement;

	let loaderElement: ScenaLoader | null = $state(null);

	const rootClasses = $derived(['rs-video-loader', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements() {
		return {
			root: rootElement,
			loader: loaderElement?.getElements()
		};
	}
</script>

<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
	{#if scenaVideoContext.state === ScenaVideoState.LOADING}
		<ScenaLoader
			bind:this={loaderElement}
			{size}
			customClasses={{ root: customClasses?.loader }}
			customStyles={{ root: customStyles?.loader }}
		/>
	{/if}
</div>
