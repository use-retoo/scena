import { render, screen } from '@testing-library/svelte';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getScenaVideoContext, ScenaVideoState } from '@/entities/video';
import type { ScenaVideoContext } from '@/entities/video';
import { ComponentShape } from '@/shared/enums';

import ScenaVideoProgress from '../ScenaVideoProgress.svelte';

vi.mock('@/entities/video', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/entities/video')>();
	return { ...actual, getScenaVideoContext: vi.fn() };
});

function mockVideoContext(overrides: Partial<ScenaVideoContext> = {}): ScenaVideoContext {
	return {
		state: ScenaVideoState.IDLE,
		progress: 0,
		buffer: 0,
		currentTime: 0,
		duration: 0,
		seek: vi.fn(),
		handleSeekStart: vi.fn(),
		handleSeekEnd: vi.fn(),
		...overrides
	} as unknown as ScenaVideoContext;
}

beforeEach(() => {
	vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext());
});

describe('ScenaVideoProgress', () => {
	describe('rendering', () => {
		it('renders circle progress when shape is circle', () => {
			render(ScenaVideoProgress, { props: { shape: ComponentShape.CIRCLE } });

			expect(screen.getByRole('slider')).toBeInTheDocument();
			expect(screen.getByRole('slider')).toHaveClass('rs-progress--circle');
		});

		it('renders line progress when shape is portrait', () => {
			render(ScenaVideoProgress, { props: { shape: ComponentShape.PORTRAIT } });

			expect(screen.getByRole('slider')).toHaveClass('rs-progress--line');
		});

		it('renders line progress when shape is landscape', () => {
			render(ScenaVideoProgress, { props: { shape: ComponentShape.LANDSCAPE } });

			expect(screen.getByRole('slider')).toHaveClass('rs-progress--line');
		});

		it('renders line progress when shape is square', () => {
			render(ScenaVideoProgress, { props: { shape: ComponentShape.SQUARE } });

			expect(screen.getByRole('slider')).toHaveClass('rs-progress--line');
		});

		it('reflects progress from context as aria-valuenow', () => {
			vi.mocked(getScenaVideoContext).mockReturnValue(mockVideoContext({ progress: 0.4 }));

			render(ScenaVideoProgress, { props: { shape: ComponentShape.CIRCLE } });

			expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '40');
		});

		it('renders buffer indicator when hasBuffer is true', () => {
			render(ScenaVideoProgress, { props: { shape: ComponentShape.CIRCLE, hasBuffer: true } });

			const { container } = render(ScenaVideoProgress, {
				props: { shape: ComponentShape.CIRCLE, hasBuffer: true }
			});

			expect(container.querySelector('.rs-progress__buffer')).toBeInTheDocument();
		});
	});
});
