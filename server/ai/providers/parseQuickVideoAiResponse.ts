export const parseQuickVideoAiResponse = (raw: string): object => {
	const cleanedRaw = raw
		.replace(/^```json\s*/i, '')
		.replace(/^```\s*/i, '')
		.replace(/\s*```$/, '')
		.trim()
	try {
		const parsedRaw = JSON.parse(cleanedRaw)

		if (parsedRaw === null || typeof parsedRaw !== 'object')
			throw new Error('Invalid Gemini JSON response')

		return parsedRaw
	} catch {
		throw new Error('Invalid Gemini JSON response')
	}
}
