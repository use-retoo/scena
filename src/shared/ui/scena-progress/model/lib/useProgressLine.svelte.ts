import type { UseProgressLineEvents, UseProgressLineProps, UseProgressLineReturn } from '../types';

export default function useProgressLine({
	getRootElement,
	getSize,
	getStep,
	getProgress,
	getCustomThickness,
	onSeek,
	onSeekStart,
	onSeekEnd
}: UseProgressLineProps & Partial<UseProgressLineEvents>): UseProgressLineReturn {
	let isFocused = $state(false);

	let isDragging = $state(false);

	let isDisabledTransition = $state(false);

	let previousProgress = $state<number | null>(null);

	const thicknessMap = $derived(getCustomThickness()[getSize()]);

	const thickness = $derived(isFocused ? thicknessMap.hover : thicknessMap.default);

	const transition = $derived(isDisabledTransition ? 'none' : undefined);

	function getRootElementSafe(): HTMLElement {
		const root = getRootElement();

		if (!root) {
			throw new Error('Progress root element is not available');
		}

		return root;
	}

	function getEventProgress(event: PointerEvent, element: Element): number {
		const rect = element.getBoundingClientRect();

		const x = event.clientX - rect.left;
		const percent = x / rect.width;

		return Math.max(0, Math.min(1, percent));
	}

	function onMouseEnterRootElement() {
		isFocused = true;
	}

	function onMouseLeaveRootElement() {
		if (isDragging) return;
		isFocused = false;
	}

	function onFocus() {
		isFocused = true;
	}

	function onBlur() {
		if (isDragging) return;
		isFocused = false;
	}

	function onKeyDown(event: KeyboardEvent): void {
		const current = getProgress();

		let next: number | null = null;

		switch (event.key) {
			case 'ArrowLeft':
			case 'ArrowDown':
				next = Math.max(0, current - getStep());
				break;
			case 'ArrowRight':
			case 'ArrowUp':
				next = Math.min(1, current + getStep());
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = 1;
				break;
		}

		if (next === null) return;

		event.preventDefault();
		onSeekStart?.(event);
		onSeek?.(next, event);
		onSeekEnd?.(event);
	}

	function capturePointer(event: PointerEvent): void {
		const element = event.currentTarget as Element;

		element.setPointerCapture(event.pointerId);
	}

	function releasePointer(event: PointerEvent): void {
		const element = event.currentTarget as Element;

		element.releasePointerCapture(event.pointerId);
	}

	function onPointerDown(event: PointerEvent): void {
		getRootElementSafe().focus();

		isDragging = true;

		onSeekStart?.(event);

		capturePointer(event);

		const element = event.currentTarget as Element;
		const nextProgress = getEventProgress(event, element);

		onSeek?.(nextProgress, event);

		event.preventDefault();
	}

	function onPointerMove(event: PointerEvent): void {
		if (!isDragging) return;

		const element = event.currentTarget as Element;
		const nextProgress = getEventProgress(event, element);

		onSeek?.(nextProgress, event);

		event.preventDefault();
	}

	function onPointerUp(event: PointerEvent): void {
		if (!isDragging) return;

		isDragging = false;
		onSeekEnd?.(event);

		releasePointer(event);
	}

	function onPointerCancel(event: PointerEvent): void {
		if (!isDragging) return;

		isDragging = false;
		onSeekEnd?.(event);

		releasePointer(event);
	}

	$effect(() => {
		const progress = getProgress();
		let outerFrameId: number;
		let innerFrameId: number;

		if (previousProgress !== null && progress < previousProgress) {
			isDisabledTransition = true;

			outerFrameId = requestAnimationFrame(() => {
				innerFrameId = requestAnimationFrame(() => {
					isDisabledTransition = false;
				});
			});
		}

		previousProgress = progress;

		return () => {
			cancelAnimationFrame(outerFrameId);
			cancelAnimationFrame(innerFrameId);
		};
	});

	return {
		get isFocused() {
			return isFocused;
		},
		get isDragging() {
			return isDragging;
		},
		get isDisabledTransition() {
			return isDisabledTransition;
		},
		get thickness() {
			return thickness;
		},
		get transition() {
			return transition;
		},
		events: {
			onpointerup: onPointerUp,
			onpointermove: onPointerMove,
			onpointerdown: onPointerDown,
			onpointercancel: onPointerCancel,
			onmouseenter: onMouseEnterRootElement,
			onmouseleave: onMouseLeaveRootElement,
			onfocus: onFocus,
			onblur: onBlur,
			onkeydown: onKeyDown
		}
	};
}
