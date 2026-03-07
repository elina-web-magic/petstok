export const getStringParam = (value: unknown, fallback = ''): string => {
	return typeof value === 'string' ? value : fallback
}

export const getOptionalStringParam = (value: unknown): string | undefined => {
	return typeof value === 'string' ? value : undefined
}
