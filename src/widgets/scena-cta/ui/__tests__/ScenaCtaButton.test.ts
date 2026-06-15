import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ScenaEvent } from '@/entities/event';
import { getScenaContext } from '@/entities/scena';
import type { ScenaContext } from '@/entities/scena';
import { ComponentSize } from '@/shared/enums';

import { ScenaCtaButtonPlacement } from '../../model';
import ScenaCtaButton from '../ScenaCtaButton.svelte';

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

describe('ScenaCtaButton', () => {
	describe('rendering', () => {
		it('renders a button element', () => {
			render(ScenaCtaButton);

			expect(screen.getByRole('button')).toBeInTheDocument();
		});

		it('renders default text', () => {
			render(ScenaCtaButton);

			expect(screen.getByRole('button', { name: 'Get in touch' })).toBeInTheDocument();
		});

		it('renders custom text', () => {
			render(ScenaCtaButton, { props: { text: 'Buy now' } });

			expect(screen.getByRole('button', { name: 'Buy now' })).toBeInTheDocument();
		});

		it('has rs-cta-button base class', () => {
			const { container } = render(ScenaCtaButton);

			expect(container.querySelector('.rs-cta-button')).toBeInTheDocument();
		});

		it('applies default inside placement class', () => {
			const { container } = render(ScenaCtaButton, { props: { size: ComponentSize.MD } });

			expect(container.querySelector('.rs-cta-button')).toHaveClass('rs-cta-button--inside');
		});

		it('applies outside placement class when set explicitly', () => {
			const { container } = render(ScenaCtaButton, {
				props: { placement: ScenaCtaButtonPlacement.OUTSIDE, adaptive: false }
			});

			expect(container.querySelector('.rs-cta-button')).toHaveClass('rs-cta-button--outside');
		});

		it('applies adaptive placement when size is in adaptive sizes', () => {
			const { container } = render(ScenaCtaButton, { props: { size: ComponentSize.XS } });

			expect(container.querySelector('.rs-cta-button')).toHaveClass('rs-cta-button--outside');
		});

		it('ignores adaptive when adaptive is false', () => {
			const { container } = render(ScenaCtaButton, {
				props: { size: ComponentSize.XS, adaptive: false }
			});

			expect(container.querySelector('.rs-cta-button')).toHaveClass('rs-cta-button--inside');
		});

		it('applies custom class', () => {
			const { container } = render(ScenaCtaButton, {
				props: { customClasses: { root: 'my-cta' } }
			});

			expect(container.querySelector('.rs-cta-button')).toHaveClass('my-cta');
		});
	});

	describe('interaction', () => {
		it('emits ON_CTA_CLICK on click', async () => {
			const user = userEvent.setup();

			render(ScenaCtaButton);

			await user.click(screen.getByRole('button'));

			expect(mockEmit).toHaveBeenCalledWith(ScenaEvent.ON_CTA_CLICK, expect.any(Event));
		});

		it('calls onClick callback on click', async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();

			render(ScenaCtaButton, { props: { onClick } });

			await user.click(screen.getByRole('button'));

			expect(onClick).toHaveBeenCalledOnce();
		});
	});
});
