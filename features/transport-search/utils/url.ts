export const cleanQueryParams = (
	params: Record<string, string | number | undefined | null>
): URLSearchParams => {
	const searchParams = new URLSearchParams()
	const entries = Object.entries(params)

	for (const [key, value] of entries) {
		if (value !== undefined && value !== null && value !== '') {
			searchParams.set(key, String(value))
		}
	}
	return searchParams
}
