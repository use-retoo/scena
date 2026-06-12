import { render } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import { ComponentSize } from '@/shared/enums';

import ScenaIcon from '../ScenaIcon.svelte';

describe('ScenaIcon', () => {
	describe('rendering', () => {
		it('renders an svg element', () => {
			const { container } = render(ScenaIcon);

			expect(container.querySelector('svg')).toBeInTheDocument();
		});

		it('always has rs-icon base class', () => {
			const { container } = render(ScenaIcon);

			expect(container.querySelector('svg')).toHaveClass('rs-icon');
		});

		it('applies default md size class', () => {
			const { container } = render(ScenaIcon);

			expect(container.querySelector('svg')).toHaveClass('rs-icon--md');
		});

		it('applies size class', () => {
			const { container } = render(ScenaIcon, { props: { size: ComponentSize.SM } });

			expect(container.querySelector('svg')).toHaveClass('rs-icon--sm');
		});

		it('has default viewBox of 0 0 16 16', () => {
			const { container } = render(ScenaIcon);

			expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 16 16');
		});

		it('applies custom viewBox', () => {
			const { container } = render(ScenaIcon, { props: { viewBox: '0 0 24 24' } });

			expect(container.querySelector('svg')).toHaveAttribute('viewBox', '0 0 24 24');
		});

		it('is hidden from the accessibility tree', () => {
			const { container } = render(ScenaIcon);

			expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
		});

		it('applies custom class', () => {
			const { container } = render(ScenaIcon, { props: { customClasses: { root: 'my-icon' } } });

			expect(container.querySelector('svg')).toHaveClass('my-icon');
		});
	});
});
