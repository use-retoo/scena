import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ComponentSize } from '@/shared/enums';

import { ScenaButtonShape, ScenaButtonType, ScenaButtonVariant } from '../../model';
import ScenaButton from '../ScenaButton.svelte';

describe('ScenaButton', () => {
	describe('rendering', () => {
		it('renders a button element', () => {
			render(ScenaButton);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('always has rs-button base class', () => {
			render(ScenaButton);

			expect(screen.getByRole('button')).toHaveClass('rs-button');
		});

		it('applies size class', () => {
			render(ScenaButton, { props: { size: ComponentSize.SM } });

			expect(screen.getByRole('button')).toHaveClass('rs-button--sm');
		});

		it('applies shape class', () => {
			render(ScenaButton, { props: { shape: ScenaButtonShape.CIRCLE } });

			expect(screen.getByRole('button')).toHaveClass('rs-button--circle');
		});

		it('applies variant class', () => {
			render(ScenaButton, { props: { variant: ScenaButtonVariant.TEXT } });

			expect(screen.getByRole('button')).toHaveClass('rs-button--text');
		});

		it('applies autosize class instead of size class when autosize is true', () => {
			render(ScenaButton, { props: { size: ComponentSize.LG, autosize: true } });

			const button = screen.getByRole('button');

			expect(button).toHaveClass('rs-button--autosize');
			expect(button).not.toHaveClass('rs-button--lg');
		});

		it('applies custom class', () => {
			render(ScenaButton, { props: { customClasses: { root: 'my-custom-class' } } });

			expect(screen.getByRole('button')).toHaveClass('my-custom-class');
		});

		it('sets type attribute', () => {
			render(ScenaButton, { props: { type: ScenaButtonType.SUBMIT } });

			expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
		});

		it('sets aria-label', () => {
			render(ScenaButton, { props: { aria: { ariaLabel: 'Close' } } });

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
		});
	});

	describe('interaction', () => {
		it('calls onclick handler on click', async () => {
			const user = userEvent.setup();
			const onclick = vi.fn();

			render(ScenaButton, { props: { onclick } });

			await user.click(screen.getByRole('button'));

			expect(onclick).toHaveBeenCalledOnce();
		});
	});
});
