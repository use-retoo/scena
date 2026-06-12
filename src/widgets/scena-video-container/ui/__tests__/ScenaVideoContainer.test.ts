import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ScenaEvent } from '@/entities/event';
import { getScenaContext } from '@/entities/scena';
import type { ScenaContext } from '@/entities/scena';
import { ComponentShape, ComponentSize } from '@/shared/enums';

import ScenaVideoContainer from '../ScenaVideoContainer.svelte';

vi.mock('@/entities/scena', () => ({ getScenaContext: vi.fn() }));

let mockEmit: ReturnType<typeof vi.fn>;

beforeEach(() => {
	mockEmit = vi.fn();

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
		unmount: vi.fn()
	} as ScenaContext);
});

describe('ScenaVideoContainer', () => {
	describe('rendering', () => {
		it('renders a button element', () => {
			render(ScenaVideoContainer);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('always has rs-video-container base class', () => {
			render(ScenaVideoContainer);

			expect(screen.getByRole('button')).toHaveClass('rs-video-container');
		});

		it('applies default md size class', () => {
			render(ScenaVideoContainer);

			expect(screen.getByRole('button')).toHaveClass('rs-video-container--md');
		});

		it('applies default circle shape class', () => {
			render(ScenaVideoContainer);

			expect(screen.getByRole('button')).toHaveClass('rs-video-container--circle');
		});

		it('applies size class', () => {
			render(ScenaVideoContainer, { props: { size: ComponentSize.LG } });

			expect(screen.getByRole('button')).toHaveClass('rs-video-container--lg');
		});

		it('applies shape class', () => {
			render(ScenaVideoContainer, { props: { shape: ComponentShape.SQUARE } });

			expect(screen.getByRole('button')).toHaveClass('rs-video-container--square');
		});

		it('has tabindex -1 by default', () => {
			render(ScenaVideoContainer);

			expect(screen.getByRole('button')).toHaveAttribute('tabindex', '-1');
		});

		it('has tabindex 0 when isInteractive is true', () => {
			render(ScenaVideoContainer, { props: { isInteractive: true } });

			expect(screen.getByRole('button')).toHaveAttribute('tabindex', '0');
		});

		it('sets aria-label', () => {
			render(ScenaVideoContainer, { props: { aria: { ariaLabel: 'Play video' } } });

			expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument();
		});

		it('applies custom class', () => {
			render(ScenaVideoContainer, { props: { customClasses: { root: 'my-video' } } });

			expect(screen.getByRole('button')).toHaveClass('my-video');
		});
	});

	describe('interaction', () => {
		it('emits ON_VIDEO_CONTAINER_CLICK on click', async () => {
			const user = userEvent.setup();

			render(ScenaVideoContainer);

			await user.click(screen.getByRole('button'));

			expect(mockEmit).toHaveBeenCalledWith(
				ScenaEvent.ON_VIDEO_CONTAINER_CLICK,
				expect.any(MouseEvent)
			);
		});

		it('emits ON_VIDEO_CONTAINER_CLICK on Enter key', async () => {
			const user = userEvent.setup();

			render(ScenaVideoContainer, { props: { isInteractive: true } });

			screen.getByRole('button').focus();
			await user.keyboard('{Enter}');

			expect(mockEmit).toHaveBeenCalledWith(
				ScenaEvent.ON_VIDEO_CONTAINER_CLICK,
				expect.any(KeyboardEvent)
			);
		});

		it('emits ON_VIDEO_CONTAINER_CLICK on Space key', async () => {
			const user = userEvent.setup();

			render(ScenaVideoContainer, { props: { isInteractive: true } });

			screen.getByRole('button').focus();
			await user.keyboard(' ');

			expect(mockEmit).toHaveBeenCalledWith(
				ScenaEvent.ON_VIDEO_CONTAINER_CLICK,
				expect.any(KeyboardEvent)
			);
		});
	});
});
