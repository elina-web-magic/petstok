export const getStringParam = (value: unknown, fallback = ''): string => {
	return typeof value === 'string' ? value : fallback
}
