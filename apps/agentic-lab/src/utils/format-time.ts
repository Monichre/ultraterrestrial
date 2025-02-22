export function formatTime(isoString: string): string {
	const date = new Date(isoString);
	return date.toLocaleTimeString("en-US", {
		hour12: false,
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
}
