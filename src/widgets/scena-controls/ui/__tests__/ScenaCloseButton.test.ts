import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ScenaEvent } from '@/entities/event';
import { getScenaContext } from '@/entities/scena';
import type { ScenaContext } from '@/entities/scena';
import { ComponentShape, ComponentSize } from '@/shared/enums';

import ScenaCloseButton from '../ScenaCloseButton.svelte';

vi.mock('@/entities/scena', () => ({ getScenaContext: vi.fn() }));

let mockEmit: ReturnType<typeof vi.fn>;
let mockUnmount: ReturnType<typeof vi.fn>;

beforeEach(() => {
	mockEmit = vi.fn();
	mockUnmount = vi.fn();

	vi.mocked(getScenaContext).mockReturnValue({
		eventEmitter: {
			emit: mockEmit,
			on: vi.fn(),
			off: vi.fn(),
			once: vi.fn(),
			remove: vi.fn(),
			clear: vi.fn()
		},
		mount: vi.fn(),
		unmount: mockUnmount
	} as ScenaContext);
});

describe('ScenaCloseButton', () => {
	describe('rendering', () => {
		it('renders a button element', () => {
			render(ScenaCloseButton);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('has default aria-label Close', () => {
			render(ScenaCloseButton);

			expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
		});

		it('has rs-close-button base class', () => {
			const { container } = render(ScenaCloseButton);

			expect(container.querySelector('.rs-close-button')).toBeInTheDocument();
		});

		it('applies default md size class', () => {
			const { container } = render(ScenaCloseButton);

			expect(container.querySelector('.rs-close-button')).toHaveClass('rs-close-button--md');
		});

		it('applies default circle shape class', () => {
			const { container } = render(ScenaCloseButton);

			expect(container.querySelector('.rs-close-button')).toHaveClass('rs-close-button--circle');
		});

		it('applies size class', () => {
			const { container } = render(ScenaCloseButton, { props: { size: ComponentSize.LG } });

			expect(container.querySelector('.rs-close-button')).toHaveClass('rs-close-button--lg');
		});

		it('applies shape class', () => {
			const { container } = render(ScenaCloseButton, {
				props: { shape: ComponentShape.SQUARE }
			});

			expect(container.querySelector('.rs-close-button')).toHaveClass('rs-close-button--square');
		});

		it('applies custom class', () => {
			const { container } = render(ScenaCloseButton, {
				props: { customClasses: { root: 'my-close' } }
			});

			expect(container.querySelector('.rs-close-button')).toHaveClass('my-close');
		});
	});

	describe('interaction', () => {
		it('emits ON_CLOSE_CLICK on click', async () => {
			const user = userEvent.setup();

			render(ScenaCloseButton);

			await user.click(screen.getByRole('button'));

			expect(mockEmit).toHaveBeenCalledWith(ScenaEvent.ON_CLOSE_CLICK, expect.any(Event));
		});

		it('calls unmount by default on click', async () => {
			const user = userEvent.setup();

			render(ScenaCloseButton);

			await user.click(screen.getByRole('button'));

			expect(mockUnmount).toHaveBeenCalledOnce();
		});

		it('calls onClick instead of unmount when onClick is provided', async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();

			render(ScenaCloseButton, { props: { onClick } });

			await user.click(screen.getByRole('button'));

			expect(onClick).toHaveBeenCalledOnce();
			expect(mockUnmount).not.toHaveBeenCalled();
		});
	});
});
