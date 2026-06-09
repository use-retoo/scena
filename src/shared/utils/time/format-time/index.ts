/**
 * Formats a duration in seconds as a clock string.
 *
 * Negative, `NaN` or `Infinity` inputs are treated as `0`.
 *
 * @example
 * formatTime(45) // "0:45"
 * formatTime(150) // "2:30"
 * formatTime(3661) // "1:01:01"
 */
export function formatTime(seconds: number): string {
	const safeSeconds = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;

	const hours = Math.floor(safeSeconds / 3600);
	const minutes = Math.floor((safeSeconds % 3600) / 60);
	const secs = safeSeconds % 60;

	const paddedSecs = secs.toString().padStart(2, '0');

	if (hours > 0) {
		const paddedMinutes = minutes.toString().padStart(2, '0');

		return `${hours}:${paddedMinutes}:${paddedSecs}`;
	}

	return `${minutes}:${paddedSecs}`;
}
