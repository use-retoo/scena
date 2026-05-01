<script lang="ts">
	import { ComponentSize } from '@/shared/enums';
	import { formatComponentStyles } from '@/shared/utils';

	import type { ScenaIconProps, ScenaIconSnippets } from '../model';

	let {
		id,
		viewBox = '0 0 16 16',
		size = ComponentSize.MD,
		customClasses,
		customStyles,
		children
	}: Partial<ScenaIconProps & ScenaIconSnippets> = $props();

	let rootElement: SVGSVGElement;

	const rootClasses = $derived(['rs-icon', `rs-icon--${size}`, customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements() {
		return { root: rootElement };
	}
</script>

<svg
	{id}
	bind:this={rootElement}
	class={rootClasses}
	style={rootStyles}
	{viewBox}
	fill="none"
	focusable="false"
	aria-hidden="true"
	xmlns="http://www.w3.org/2000/svg"
>
	{@render children?.()}
</svg>
