export const parseQuickVideoAiResponse = (raw: string): object => {
	try {
		const parsedRaw = JSON.parse(raw)

		if (parsedRaw === null || typeof parsedRaw !== 'object')
			throw new Error('Invalid Gemini JSON response')

		return parsedRaw
	} catch {
		throw new Error('Invalid Gemini JSON response')
	}
}
