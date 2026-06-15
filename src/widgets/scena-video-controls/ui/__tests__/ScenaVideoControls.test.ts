import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getScenaVideoContext, ScenaVideoState } from '@/entities/video';
import type { ScenaVideoContext } from '@/entities/video';

import ScenaVideoControls from '../ScenaVideoControls.svelte';

vi.mock('@/entities/video', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/entities/video')>();
	return { ...actual, getScenaVideoContext: vi.fn() };
});

let mockPlay: ReturnType<typeof vi.fn>;
let mockPause: ReturnType<typeof vi.fn>;

function mockVideoContext(state: ScenaVideoState, isSeeking = false): ScenaVideoContext {
	return { state, isSeeking, play: mockPlay, pause: mockPause } as unknown as ScenaVideoContext;
}

beforeEach(() => {
	mockPlay = vi.fn();
	mockPause = vi.fn();

	vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.IDLE));
});

describe('ScenaVideoControls', () => {
	describe('rendering', () => {
		it('does not render when isSeeking is true', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(
				mockVideoContext(ScenaVideoState.PLAYING, true)
			);

			const { container } = render(ScenaVideoControls);

			expect(container.querySelector('.rs-video-controls')).not.toBeInTheDocument();
		});

		it('renders when isSeeking is false', () => {
			const { container } = render(ScenaVideoControls);

			expect(container.querySelector('.rs-video-controls')).toBeInTheDocument();
		});

		it('has rs-video-controls base class', () => {
			const { container } = render(ScenaVideoControls);

			expect(container.querySelector('div')).toHaveClass('rs-video-controls');
		});

		it('shows play button when state is idle', () => {
			render(ScenaVideoControls);

			expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
		});

		it('shows play button when state is paused', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.PAUSED));

			render(ScenaVideoControls);

			expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
		});

		it('shows pause button when state is playing', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.PLAYING));

			render(ScenaVideoControls);

			expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
		});

		it('does not show pause button when state is idle', () => {
			render(ScenaVideoControls);

			expect(screen.queryByRole('button', { name: 'Pause' })).not.toBeInTheDocument();
		});

		it('has a live region for screen readers', () => {
			render(ScenaVideoControls);

			expect(screen.getByRole('status')).toBeInTheDocument();
		});

		it('applies custom class', () => {
			const { container } = render(ScenaVideoControls, {
				props: { customClasses: { root: 'my-controls' } }
			});

			expect(container.querySelector('.rs-video-controls')).toHaveClass('my-controls');
		});
	});

	describe('interaction', () => {
		it('calls play when play button is clicked', async () => {
			const user = userEvent.setup();

			render(ScenaVideoControls);

			await user.click(screen.getByRole('button', { name: 'Play' }));

			expect(mockPlay).toHaveBeenCalledOnce();
		});

		it('calls pause when pause button is clicked', async () => {
			const user = userEvent.setup();

			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.PLAYING));

			render(ScenaVideoControls);

			await user.click(screen.getByRole('button', { name: 'Pause' }));

			expect(mockPause).toHaveBeenCalledOnce();
		});
	});
});
