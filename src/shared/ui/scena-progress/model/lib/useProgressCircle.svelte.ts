import { onDestroy, onMount } from 'svelte';

import type {
	UseProgressCircleEvents,
	UseProgressCircleProps,
	UseProgressCircleReturn
} from '../types';

export default function useProgressCircle({
	getRootElement,
	getSize,
	getBuffer,
	getProgress,
	getCustomThickness,
	onSeek,
	onSeekStart,
	onSeekEnd
}: UseProgressCircleProps & Partial<UseProgressCircleEvents>): UseProgressCircleReturn {
	let isFocused = $state(false);

	let isDragging = $state(false);

	let radialSize = $state(0);

	let activePointerId = $state<number | null>(null);

	let isResizing = $state(false);

	const thicknessMap = $derived(getCustomThickness()[getSize()]);

	const thickness = $derived(isFocused ? thicknessMap.hover : thicknessMap.default);

	const maxThickness = $derived(Math.max(thicknessMap.default, thicknessMap.hover));

	const hitAreaThickness = $derived(Math.max(maxThickness * 3, 20));

	const radialRadius = $derived((radialSize - maxThickness) / 2);

	const radialCircumference = $derived(radialRadius * Math.PI * 2);

	const radialProgressOffset = $derived(radialCircumference * (1 - getProgress()));

	const radialBufferOffset = $derived(radialCircumference * (1 - getBuffer()));

	function getPercentFromClientPoint(clientX: number, clientY: number, element: Element): number {
		const rect = element.getBoundingClientRect();

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const x = clientX - rect.left - centerX;
		const y = clientY - rect.top - centerY;

		let angle = Math.atan2(y, x) + Math.PI / 2;
		if (angle < 0) angle += 2 * Math.PI;

		return angle / (2 * Math.PI);
	}

	function onMouseEnterRootElement() {
		isFocused = true;
	}

	function onMouseLeaveRootElement() {
		if (isDragging) return;
		isFocused = false;
	}

	function onTrackClick(event: MouseEvent): void {
		if (isDragging) return;

		const element = event.currentTarget as Element;

		onSeek?.(getPercentFromClientPoint(event.clientX, event.clientY, element), event);
	}

	function onTrackPointerDown(event: PointerEvent): void {
		getRootElement().focus();

		isFocused = true;
		isDragging = true;

		activePointerId = event.pointerId;

		onSeekStart?.(event);

		const element = event.currentTarget as Element;

		if ('setPointerCapture' in element) {
			element.setPointerCapture(event.pointerId);
		}

		onSeek?.(getPercentFromClientPoint(event.clientX, event.clientY, element), event);

		event.preventDefault();
	}

	function onTrackPointerMove(event: PointerEvent): void {
		if (!isDragging) return;

		if (activePointerId !== event.pointerId) return;

		const element = event.currentTarget as Element;

		onSeek?.(getPercentFromClientPoint(event.clientX, event.clientY, element), event);

		event.preventDefault();
	}

	function stopDragging(event: PointerEvent): void {
		if (!isDragging) return;
		if (activePointerId !== event.pointerId) return;

		isDragging = false;
		activePointerId = null;

		onSeekEnd?.(event);

		const element = event.currentTarget as Element;

		if ('releasePointerCapture' in element) {
			element.releasePointerCapture(event.pointerId);
		}
	}

	const transition = $derived(isResizing ? 'none' : undefined);

	const resizeObserver = new ResizeObserver((entries) => {
		for (const entry of entries) {
			radialSize = entry.contentRect.width;
		}

		isResizing = true;

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				isResizing = false;
			});
		});
	});

	onMount(() => {
		resizeObserver.observe(getRootElement());
	});

	onDestroy(() => {
		resizeObserver.disconnect();
	});

	return {
		get isFocused() {
			return isFocused;
		},
		get isDragging() {
			return isDragging;
		},
		get radialSize() {
			return radialSize;
		},
		get radialRadius() {
			return radialRadius;
		},
		get radialCircumference() {
			return radialCircumference;
		},
		get radialProgressOffset() {
			return radialProgressOffset;
		},
		get radialBufferOffset() {
			return radialBufferOffset;
		},
		get thickness() {
			return thickness;
		},
		get hitAreaThickness() {
			return hitAreaThickness;
		},
		get transition() {
			return transition;
		},
		events: {
			onclick: onTrackClick,
			onpointerdown: onTrackPointerDown,
			onpointermove: onTrackPointerMove,
			onpointerup: stopDragging,
			onpointercancel: stopDragging,
			onmouseenter: onMouseEnterRootElement,
			onmouseleave: onMouseLeaveRootElement
		}
	};
}
