import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ScenaProgressCircle from '../ScenaProgressCircle.svelte';

describe('ScenaProgressCircle', () => {
	describe('rendering', () => {
		it('renders a slider element', () => {
			render(ScenaProgressCircle);

			expect(screen.getByRole('slider')).toBeInTheDocument();
		});

		it('has rs-progress and rs-progress--circle classes', () => {
			render(ScenaProgressCircle);

			expect(screen.getByRole('slider')).toHaveClass('rs-progress', 'rs-progress--circle');
		});

		it('has default aria-label Progress', () => {
			render(ScenaProgressCircle);

			expect(screen.getByRole('slider', { name: 'Progress' })).toBeInTheDocument();
		});

		it('sets aria-valuenow as progress * 100', () => {
			render(ScenaProgressCircle, { props: { progress: 0.5 } });

			expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
		});

		it('sets aria-valuemin to 0 and aria-valuemax to 100', () => {
			render(ScenaProgressCircle);

			const slider = screen.getByRole('slider');

			expect(slider).toHaveAttribute('aria-valuemin', '0');
			expect(slider).toHaveAttribute('aria-valuemax', '100');
		});

		it('renders buffer circle when hasBuffer is true', () => {
			const { container } = render(ScenaProgressCircle, { props: { hasBuffer: true } });

			expect(container.querySelector('.rs-progress__buffer')).toBeInTheDocument();
		});

		it('does not render buffer circle by default', () => {
			const { container } = render(ScenaProgressCircle);

			expect(container.querySelector('.rs-progress__buffer')).not.toBeInTheDocument();
		});

		it('applies custom class', () => {
			render(ScenaProgressCircle, { props: { customClasses: { root: 'my-progress' } } });

			expect(screen.getByRole('slider')).toHaveClass('my-progress');
		});
	});

	describe('keyboard interaction', () => {
		it('calls onSeek with progress + step on ArrowRight', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressCircle, { props: { progress: 0.5, step: 0.1, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowRight}');

			expect(onSeek).toHaveBeenCalledWith(expect.closeTo(0.6), expect.any(KeyboardEvent));
		});

		it('calls onSeek with progress - step on ArrowLeft', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressCircle, { props: { progress: 0.5, step: 0.1, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowLeft}');

			expect(onSeek).toHaveBeenCalledWith(expect.closeTo(0.4), expect.any(KeyboardEvent));
		});

		it('clamps seek to 0 at minimum', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressCircle, { props: { progress: 0, step: 0.1, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowLeft}');

			expect(onSeek).toHaveBeenCalledWith(0, expect.any(KeyboardEvent));
		});

		it('clamps seek to 1 at maximum', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressCircle, { props: { progress: 1, step: 0.1, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowRight}');

			expect(onSeek).toHaveBeenCalledWith(1, expect.any(KeyboardEvent));
		});

		it('calls onSeekStart and onSeekEnd alongside onSeek', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();
			const onSeekStart = vi.fn();
			const onSeekEnd = vi.fn();

			render(ScenaProgressCircle, { props: { onSeek, onSeekStart, onSeekEnd } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowRight}');

			expect(onSeekStart).toHaveBeenCalledOnce();
			expect(onSeek).toHaveBeenCalledOnce();
			expect(onSeekEnd).toHaveBeenCalledOnce();
		});

		it('seeks to 0 on Home key', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressCircle, { props: { progress: 0.7, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{Home}');

			expect(onSeek).toHaveBeenCalledWith(0, expect.any(KeyboardEvent));
		});

		it('seeks to 1 on End key', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressCircle, { props: { progress: 0.3, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{End}');

			expect(onSeek).toHaveBeenCalledWith(1, expect.any(KeyboardEvent));
		});
	});
});
