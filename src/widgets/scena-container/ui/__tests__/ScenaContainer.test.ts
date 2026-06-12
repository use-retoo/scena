import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import { ComponentPlacement, ComponentPosition } from '@/shared/enums';

import ScenaContainer from '../ScenaContainer.svelte';

describe('ScenaContainer', () => {
	describe('rendering', () => {
		it('renders a div element', () => {
			const { container } = render(ScenaContainer);

			expect(container.querySelector('div')).toBeInTheDocument();
		});

		it('always has rs-container base class', () => {
			const { container } = render(ScenaContainer);

			expect(container.querySelector('div')).toHaveClass('rs-container');
		});

		it('applies default fixed position class', () => {
			const { container } = render(ScenaContainer);

			expect(container.querySelector('div')).toHaveClass('rs-container--fixed');
		});

		it('applies position class', () => {
			const { container } = render(ScenaContainer, {
				props: { position: ComponentPosition.ABSOLUTE }
			});

			expect(container.querySelector('div')).toHaveClass('rs-container--absolute');
		});

		it('applies default placement class when position is fixed', () => {
			const { container } = render(ScenaContainer);

			expect(container.querySelector('div')).toHaveClass('rs-container--bottom-end');
		});

		it('applies placement class when position is absolute', () => {
			const { container } = render(ScenaContainer, {
				props: {
					position: ComponentPosition.ABSOLUTE,
					placement: ComponentPlacement.TOP_START
				}
			});

			expect(container.querySelector('div')).toHaveClass('rs-container--top-start');
		});

		it('does not apply placement class when position is static', () => {
			const { container } = render(ScenaContainer, {
				props: { position: ComponentPosition.STATIC }
			});

			expect(container.querySelector('div')).not.toHaveClass('rs-container--bottom-end');
		});

		it('applies custom class', () => {
			const { container } = render(ScenaContainer, {
				props: { customClasses: { root: 'my-container' } }
			});

			expect(container.querySelector('div')).toHaveClass('my-container');
		});
	});
});
