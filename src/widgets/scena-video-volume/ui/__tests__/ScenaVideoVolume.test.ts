import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getScenaVideoContext } from '@/entities/video';
import type { ScenaVideoContext } from '@/entities/video';
import { ComponentShape } from '@/shared/enums';

import ScenaVideoVolume from '../ScenaVideoVolume.svelte';

vi.mock('@/entities/video', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/entities/video')>();
	return { ...actual, getScenaVideoContext: vi.fn() };
});

let mockMute: ReturnType<typeof vi.fn>;
let mockUnmute: ReturnType<typeof vi.fn>;

function mockVideoContext(isMuted: boolean, isSeeking = false): ScenaVideoContext {
	return { isMuted, isSeeking, mute: mockMute, unmute: mockUnmute } as unknown as ScenaVideoContext;
}

beforeEach(() => {
	mockMute = vi.fn();
	mockUnmute = vi.fn();

	vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(false));
});

describe('ScenaVideoVolume', () => {
	describe('rendering', () => {
		it('does not render when isSeeking is true', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(false, true));

			const { container } = render(ScenaVideoVolume);

			expect(container.querySelector('.rs-video-volume')).not.toBeInTheDocument();
		});

		it('renders when isSeeking is false', () => {
			const { container } = render(ScenaVideoVolume);

			expect(container.querySelector('.rs-video-volume')).toBeInTheDocument();
		});

		it('has rs-video-volume base class', () => {
			const { container } = render(ScenaVideoVolume);

			expect(container.querySelector('div')).toHaveClass('rs-video-volume');
		});

		it('applies default circle shape class', () => {
			const { container } = render(ScenaVideoVolume);

			expect(container.querySelector('.rs-video-volume')).toHaveClass('rs-video-volume--circle');
		});

		it('applies shape class', () => {
			const { container } = render(ScenaVideoVolume, {
				props: { shape: ComponentShape.SQUARE }
			});

			expect(container.querySelector('.rs-video-volume')).toHaveClass('rs-video-volume--square');
		});

		it('shows mute button when not muted', () => {
			render(ScenaVideoVolume);

			expect(screen.getByRole('button', { name: 'Mute' })).toBeInTheDocument();
		});

		it('shows unmute button when muted', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(true));

			render(ScenaVideoVolume);

			expect(screen.getByRole('button', { name: 'Unmute' })).toBeInTheDocument();
		});

		it('does not show unmute button when not muted', () => {
			render(ScenaVideoVolume);

			expect(screen.queryByRole('button', { name: 'Unmute' })).not.toBeInTheDocument();
		});

		it('applies custom class', () => {
			const { container } = render(ScenaVideoVolume, {
				props: { customClasses: { root: 'my-volume' } }
			});

			expect(container.querySelector('.rs-video-volume')).toHaveClass('my-volume');
		});
	});

	describe('interaction', () => {
		it('calls mute when mute button is clicked', async () => {
			const user = userEvent.setup();

			render(ScenaVideoVolume);

			await user.click(screen.getByRole('button', { name: 'Mute' }));

			expect(mockMute).toHaveBeenCalledOnce();
		});

		it('calls unmute when unmute button is clicked', async () => {
			const user = userEvent.setup();

			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(true));

			render(ScenaVideoVolume);

			await user.click(screen.getByRole('button', { name: 'Unmute' }));

			expect(mockUnmute).toHaveBeenCalledOnce();
		});
	});
});
