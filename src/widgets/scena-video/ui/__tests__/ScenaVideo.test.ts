import { render } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getScenaContext } from '@/entities/scena';
import type { ScenaContext } from '@/entities/scena';
import { ScenaVideoPreload, ScenaVideoCrossOrigin } from '@/entities/video';

import ScenaVideo from '../ScenaVideo.svelte';

vi.mock('@/entities/scena', () => ({ getScenaContext: vi.fn() }));

beforeEach(() => {
	vi.mocked(getScenaContext).mockReturnValue({
		eventEmitter: {
			emit: vi.fn(),
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

describe('ScenaVideo', () => {
	describe('rendering', () => {
		it('renders a div wrapper', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('div')).toBeInTheDocument();
		});

		it('has rs-video base class', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('div')).toHaveClass('rs-video');
		});

		it('renders a video element', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('video')).toBeInTheDocument();
		});

		it('video has rs-video__media class', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('video')).toHaveClass('rs-video__media');
		});

		it('applies custom class to root', () => {
			const { container } = render(ScenaVideo, {
				props: { customClasses: { root: 'my-video' } }
			});

			expect(container.querySelector('div')).toHaveClass('my-video');
		});

		it('applies custom class to video element', () => {
			const { container } = render(ScenaVideo, {
				props: { customClasses: { video: 'my-media' } }
			});

			expect(container.querySelector('video')).toHaveClass('my-media');
		});

		it('passes src to source element', () => {
			const { container } = render(ScenaVideo, {
				props: { src: 'https://example.com/video.mp4' }
			});

			expect(container.querySelector('source')).toHaveAttribute(
				'src',
				'https://example.com/video.mp4'
			);
		});

		it('passes type to source element', () => {
			const { container } = render(ScenaVideo, { props: { type: 'video/mp4' } });

			expect(container.querySelector('source')).toHaveAttribute('type', 'video/mp4');
		});

		it('has default preload metadata', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('video')).toHaveAttribute(
				'preload',
				ScenaVideoPreload.METADATA
			);
		});

		it('has default crossorigin anonymous', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('video')).toHaveAttribute(
				'crossorigin',
				ScenaVideoCrossOrigin.ANONYMOUS
			);
		});

		it('is muted by default', () => {
			const { container } = render(ScenaVideo);

			expect((container.querySelector('video') as HTMLVideoElement).muted).toBe(true);
		});

		it('has autoplay by default', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('video')).toHaveAttribute('autoplay');
		});

		it('has loop by default', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('video')).toHaveAttribute('loop');
		});

		it('does not show native controls by default', () => {
			const { container } = render(ScenaVideo);

			expect(container.querySelector('video')).not.toHaveAttribute('controls');
		});
	});
});
