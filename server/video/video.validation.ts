export const isVideoUrl = (value: string): boolean =>
	value.trim().startsWith('http://') || value.trim().startsWith('https://')
