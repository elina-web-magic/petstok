import { GoogleGenAI } from '@google/genai'
import prompt from '@/server/ai/prompts/quickVideoPrompt.v1.json'

const client = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
})

export const analyzeFramesWithGemini = async (frameUrls: string[]): Promise<string> => {
	const frames = frameUrls.slice(0, 3)

	const response = await client.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: [
			JSON.stringify(prompt),
			...frames.map((url) => ({
				fileData: {
					fileUri: url,
				},
			})),
		],
	})

	return response.text ?? ''
}
