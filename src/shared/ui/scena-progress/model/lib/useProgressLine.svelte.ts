import type { UseProgressLineEvents, UseProgressLineProps, UseProgressLineReturn } from '../types';

export default function useProgressLine({
	getRootElement,
	getSize,
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

	function capturePointer(event: PointerEvent): void {
		const element = event.currentTarget as Element;

		element.setPointerCapture(event.pointerId);
	}

	function releasePointer(event: PointerEvent): void {
		const element = event.currentTarget as Element;

		element.releasePointerCapture(event.pointerId);
	}

	function onPointerDown(event: PointerEvent): void {
		getRootElement().focus();

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
			onmouseleave: onMouseLeaveRootElement
		}
	};
}
