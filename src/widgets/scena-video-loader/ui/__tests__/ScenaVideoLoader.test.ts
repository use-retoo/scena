import { render } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getScenaVideoContext, ScenaVideoState } from '@/entities/video';
import type { ScenaVideoContext } from '@/entities/video';
import { ComponentSize } from '@/shared/enums';

import ScenaVideoLoader from '../ScenaVideoLoader.svelte';

vi.mock('@/entities/video', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/entities/video')>();
	return { ...actual, getScenaVideoContext: vi.fn() };
});

function mockVideoContext(state: ScenaVideoState): ScenaVideoContext {
	return { state } as ScenaVideoContext;
}

beforeEach(() => {
	vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.IDLE));
});

describe('ScenaVideoLoader', () => {
	describe('rendering', () => {
		it('always renders root div', () => {
			const { container } = render(ScenaVideoLoader);

			expect(container.querySelector('.rs-video-loader')).toBeInTheDocument();
		});

		it('has rs-video-loader base class', () => {
			const { container } = render(ScenaVideoLoader);

			expect(container.querySelector('div')).toHaveClass('rs-video-loader');
		});

		it('does not render loader when state is idle', () => {
			const { container } = render(ScenaVideoLoader);

			expect(container.querySelector('svg')).not.toBeInTheDocument();
		});

		it('does not render loader when state is playing', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.PLAYING));

			const { container } = render(ScenaVideoLoader);

			expect(container.querySelector('svg')).not.toBeInTheDocument();
		});

		it('renders loader when state is loading', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.LOADING));

			const { container } = render(ScenaVideoLoader);

			expect(container.querySelector('svg')).toBeInTheDocument();
		});

		it('applies default md size class to loader', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.LOADING));

			const { container } = render(ScenaVideoLoader);

			expect(container.querySelector('svg')).toHaveClass('rs-loader--md');
		});

		it('applies size class to loader', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext(ScenaVideoState.LOADING));

			const { container } = render(ScenaVideoLoader, { props: { size: ComponentSize.LG } });

			expect(container.querySelector('svg')).toHaveClass('rs-loader--lg');
		});

		it('applies custom class to root', () => {
			const { container } = render(ScenaVideoLoader, {
				props: { customClasses: { root: 'my-loader' } }
			});

			expect(container.querySelector('div')).toHaveClass('my-loader');
		});
	});
});
