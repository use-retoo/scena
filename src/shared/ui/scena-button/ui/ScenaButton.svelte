<script lang="ts">
	import { ComponentSize } from '@/shared/enums';
	import { formatComponentStyles } from '@/shared/utils';

	import { ScenaButtonShape, ScenaButtonType, ScenaButtonVariant } from '../model';
	import type { ScenaButtonProps, ScenaButtonEvents, ScenaButtonSnippets } from '../model';

	let {
		id,
		autosize,
		size = ComponentSize.MD,
		shape = ScenaButtonShape.RECTANGLE,
		variant = ScenaButtonVariant.FILLED,
		type = ScenaButtonType.BUTTON,
		aria,
		customClasses,
		customStyles,
		children,
		...rest
	}: Partial<ScenaButtonProps & ScenaButtonEvents & ScenaButtonSnippets> = $props();

	const rootClasses = $derived([
		'rs-button',
		`rs-button--${shape}`,
		`rs-button--${variant}`,
		autosize ? 'rs-button--autosize' : `rs-button--${size}`,
		customClasses?.root
	]);

	let rootElement: HTMLButtonElement;

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements() {
		return { root: rootElement };
	}
</script>

<button
	bind:this={rootElement}
	{id}
	{type}
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
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</button>
