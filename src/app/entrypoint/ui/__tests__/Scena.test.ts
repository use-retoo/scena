import { render, screen } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import type { ScenaEventEmitter } from '@/entities/event';
import { ComponentShape, ComponentSize } from '@/shared/enums';

import Scena from '../Scena.svelte';

import type { ScenaConfig } from '../../model';

function createEventEmitter(): ScenaEventEmitter {
	return {
		emit: vi.fn(),
		on: vi.fn(),
		off: vi.fn(),
		once: vi.fn(),
		remove: vi.fn(),
		clear: vi.fn()
	};
}

function createProps(config: ScenaConfig = { video: { src: 'test.mp4' } }) {
	return {
		config,
		eventEmitter: createEventEmitter(),
		mount: vi.fn(),
		unmount: vi.fn()
	};
}

describe('Scena', () => {
	describe('rendering', () => {
		it('renders root div with rs class', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('.rs')).toBeInTheDocument();
		});

		it('renders video element', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('video')).toBeInTheDocument();
		});

		it('renders VideoLoader by default', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('.rs-video-loader')).toBeInTheDocument();
		});

		it('hides VideoLoader when videoLoader is false', () => {
			const { container } = render(Scena, {
				props: createProps({ video: { src: 'test.mp4' }, videoLoader: false })
			});

			expect(container.querySelector('.rs-video-loader')).not.toBeInTheDocument();
		});

		it('renders VideoProgress by default', () => {
			render(Scena, { props: createProps() });

			expect(screen.getByRole('slider')).toBeInTheDocument();
		});

		it('hides VideoProgress when videoProgress is false', () => {
			render(Scena, {
				props: createProps({ video: { src: 'test.mp4' }, videoProgress: false })
			});

			expect(screen.queryByRole('slider')).not.toBeInTheDocument();
		});

		it('renders VideoControls by default', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('.rs-video-controls')).toBeInTheDocument();
		});

		it('hides VideoControls when videoControls is false', () => {
			const { container } = render(Scena, {
				props: createProps({ video: { src: 'test.mp4' }, videoControls: false })
			});

			expect(container.querySelector('.rs-video-controls')).not.toBeInTheDocument();
		});

		it('renders VideoVolume by default', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('.rs-video-volume')).toBeInTheDocument();
		});

		it('hides VideoVolume when videoVolume is false', () => {
			const { container } = render(Scena, {
				props: createProps({ video: { src: 'test.mp4' }, videoVolume: false })
			});

			expect(container.querySelector('.rs-video-volume')).not.toBeInTheDocument();
		});

		it('renders CloseButton by default', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('.rs-close-button')).toBeInTheDocument();
		});

		it('hides CloseButton when closeButton is false', () => {
			const { container } = render(Scena, {
				props: createProps({ video: { src: 'test.mp4' }, closeButton: false })
			});

			expect(container.querySelector('.rs-close-button')).not.toBeInTheDocument();
		});

		it('renders CtaButton by default', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('.rs-cta-button')).toBeInTheDocument();
		});

		it('hides CtaButton when ctaButton is false', () => {
			const { container } = render(Scena, {
				props: createProps({ video: { src: 'test.mp4' }, ctaButton: false })
			});

			expect(container.querySelector('.rs-cta-button')).not.toBeInTheDocument();
		});
	});

	describe('lifecycle', () => {
		it('calls mount on component mount', () => {
			const props = createProps();

			render(Scena, { props });

			expect(props.mount).toHaveBeenCalledOnce();
		});
	});

	describe('visibility', () => {
		it('container is visible by default', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('.rs-container')).not.toHaveClass('rs-container--hidden');
		});

		it('container has rs-container--hidden when isHidden is true', () => {
			const { container } = render(Scena, {
				props: createProps({
					video: { src: 'test.mp4' },
					visibility: { isHidden: true }
				})
			});

			expect(container.querySelector('.rs-container')).toHaveClass('rs-container--hidden');
		});

		it('container has rs-pop-in class when isShownOnReady and isAnimated are true', () => {
			const { container } = render(Scena, {
				props: createProps({
					video: { src: 'test.mp4' },
					visibility: { isShownOnReady: true, isAnimated: true }
				})
			});

			expect(container.querySelector('.rs-container')).toHaveClass('rs-pop-in');
		});

		it('container does not have rs-pop-in when isAnimated is false', () => {
			const { container } = render(Scena, {
				props: createProps({
					video: { src: 'test.mp4' },
					visibility: { isShownOnReady: true, isAnimated: false }
				})
			});

			expect(container.querySelector('.rs-container')).not.toHaveClass('rs-pop-in');
		});
	});

	describe('preview', () => {
		it('VideoContainer gets preview class when config sets it', () => {
			const { container } = render(Scena, {
				props: createProps({
					video: { src: 'test.mp4' },
					videoContainer: {
						customClasses: { root: 'rs-video-container--preview' }
					}
				})
			});

			expect(container.querySelector('.rs-video-container')).toHaveClass(
				'rs-video-container--preview'
			);
		});

		it('VideoContainer is interactive when isInteractive is true', () => {
			const { container } = render(Scena, {
				props: createProps({
					video: { src: 'test.mp4' },
					videoContainer: { isInteractive: true }
				})
			});

			expect(container.querySelector('.rs-video-container')).toHaveAttribute('tabindex', '0');
		});

		it('VideoContainer is not interactive by default', () => {
			const { container } = render(Scena, { props: createProps() });

			expect(container.querySelector('.rs-video-container')).toHaveAttribute('tabindex', '-1');
		});
	});

	describe('overrides', () => {
		it('global size propagates to CloseButton', () => {
			const { container } = render(Scena, {
				props: createProps({ video: { src: 'test.mp4' }, size: ComponentSize.SM })
			});

			expect(container.querySelector('.rs-close-button')).toHaveClass('rs-close-button--sm');
		});

		it('global shape propagates to VideoVolume', () => {
			const { container } = render(Scena, {
				props: createProps({ video: { src: 'test.mp4' }, shape: ComponentShape.SQUARE })
			});

			expect(container.querySelector('.rs-video-volume')).toHaveClass('rs-video-volume--square');
		});

		it('per-component closeButton customClasses apply', () => {
			const { container } = render(Scena, {
				props: createProps({
					video: { src: 'test.mp4' },
					closeButton: { customClasses: { root: 'my-close' } }
				})
			});

			expect(container.querySelector('.rs-close-button')).toHaveClass('my-close');
		});

		it('per-component size overrides global size', () => {
			const { container } = render(Scena, {
				props: createProps({
					video: { src: 'test.mp4' },
					size: ComponentSize.SM,
					closeButton: { size: ComponentSize.XL }
				})
			});

			expect(container.querySelector('.rs-close-button')).toHaveClass('rs-close-button--xl');
			expect(container.querySelector('.rs-close-button')).not.toHaveClass('rs-close-button--sm');
		});
	});
});
