export const withTimeout = async <T>(
	request: Promise<T>,
	timeoutMs: number,
	errorMessage: string
): Promise<T> => {
	const timeoutPromise = new Promise<never>((_, reject) => {
		const timeoutId = window.setTimeout(() => {
			reject(new Error(errorMessage))
		}, timeoutMs)

		request.finally(() => {
			window.clearTimeout(timeoutId)
		})
	})

	return Promise.race([request, timeoutPromise])
}
