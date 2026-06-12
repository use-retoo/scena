import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ScenaProgressLine from '../ScenaProgressLine.svelte';

describe('ScenaProgressLine', () => {
	describe('rendering', () => {
		it('renders a slider element', () => {
			render(ScenaProgressLine);

			expect(screen.getByRole('slider')).toBeInTheDocument();
		});

		it('has rs-progress and rs-progress--line classes', () => {
			render(ScenaProgressLine);

			expect(screen.getByRole('slider')).toHaveClass('rs-progress', 'rs-progress--line');
		});

		it('has default aria-label Progress', () => {
			render(ScenaProgressLine);

			expect(screen.getByRole('slider', { name: 'Progress' })).toBeInTheDocument();
		});

		it('sets aria-valuenow as progress * 100', () => {
			render(ScenaProgressLine, { props: { progress: 0.75 } });

			expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
		});

		it('sets aria-valuemin to 0 and aria-valuemax to 100', () => {
			render(ScenaProgressLine);

			const slider = screen.getByRole('slider');

			expect(slider).toHaveAttribute('aria-valuemin', '0');
			expect(slider).toHaveAttribute('aria-valuemax', '100');
		});

		it('renders buffer element when hasBuffer is true', () => {
			const { container } = render(ScenaProgressLine, { props: { hasBuffer: true } });

			expect(container.querySelector('.rs-progress__buffer')).toBeInTheDocument();
		});

		it('does not render buffer element by default', () => {
			const { container } = render(ScenaProgressLine);

			expect(container.querySelector('.rs-progress__buffer')).not.toBeInTheDocument();
		});

		it('applies custom class', () => {
			render(ScenaProgressLine, { props: { customClasses: { root: 'my-progress' } } });

			expect(screen.getByRole('slider')).toHaveClass('my-progress');
		});
	});

	describe('keyboard interaction', () => {
		it('calls onSeek with progress + step on ArrowRight', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressLine, { props: { progress: 0.5, step: 0.1, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowRight}');

			expect(onSeek).toHaveBeenCalledWith(expect.closeTo(0.6), expect.any(KeyboardEvent));
		});

		it('calls onSeek with progress - step on ArrowLeft', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressLine, { props: { progress: 0.5, step: 0.1, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowLeft}');

			expect(onSeek).toHaveBeenCalledWith(expect.closeTo(0.4), expect.any(KeyboardEvent));
		});

		it('clamps seek to 0 at minimum', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressLine, { props: { progress: 0, step: 0.1, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowLeft}');

			expect(onSeek).toHaveBeenCalledWith(0, expect.any(KeyboardEvent));
		});

		it('clamps seek to 1 at maximum', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressLine, { props: { progress: 1, step: 0.1, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowRight}');

			expect(onSeek).toHaveBeenCalledWith(1, expect.any(KeyboardEvent));
		});

		it('calls onSeekStart and onSeekEnd alongside onSeek', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();
			const onSeekStart = vi.fn();
			const onSeekEnd = vi.fn();

			render(ScenaProgressLine, { props: { onSeek, onSeekStart, onSeekEnd } });

			screen.getByRole('slider').focus();
			await user.keyboard('{ArrowRight}');

			expect(onSeekStart).toHaveBeenCalledOnce();
			expect(onSeek).toHaveBeenCalledOnce();
			expect(onSeekEnd).toHaveBeenCalledOnce();
		});

		it('seeks to 0 on Home key', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressLine, { props: { progress: 0.7, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{Home}');

			expect(onSeek).toHaveBeenCalledWith(0, expect.any(KeyboardEvent));
		});

		it('seeks to 1 on End key', async () => {
			const user = userEvent.setup();
			const onSeek = vi.fn();

			render(ScenaProgressLine, { props: { progress: 0.3, onSeek } });

			screen.getByRole('slider').focus();
			await user.keyboard('{End}');

			expect(onSeek).toHaveBeenCalledWith(1, expect.any(KeyboardEvent));
		});
	});
});
