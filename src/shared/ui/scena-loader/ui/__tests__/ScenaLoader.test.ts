import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import { ComponentSize } from '@/shared/enums';

import ScenaLoader from '../ScenaLoader.svelte';

describe('ScenaLoader', () => {
	describe('rendering', () => {
		it('renders an svg element', () => {
			const { container } = render(ScenaLoader);

			expect(container.querySelector('svg')).toBeInTheDocument();
		});

		it('always has rs-loader base class', () => {
			const { container } = render(ScenaLoader);

			expect(container.querySelector('svg')).toHaveClass('rs-loader');
		});

		it('applies default md size class', () => {
			const { container } = render(ScenaLoader);

			expect(container.querySelector('svg')).toHaveClass('rs-loader--md');
		});

		it('applies size class', () => {
			const { container } = render(ScenaLoader, { props: { size: ComponentSize.LG } });

			expect(container.querySelector('svg')).toHaveClass('rs-loader--lg');
		});

		it('applies custom class', () => {
			const { container } = render(ScenaLoader, {
				props: { customClasses: { root: 'my-loader' } }
			});

			expect(container.querySelector('svg')).toHaveClass('my-loader');
		});
	});
});
