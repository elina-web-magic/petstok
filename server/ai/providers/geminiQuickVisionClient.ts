import { GoogleGenAI } from '@google/genai'
import promptData from '@/server/ai/promts/quickVideoPrompt.v1.json'
import { buildQuickVideoPrompt } from '../promts/buildQuickVideoPrompt'

const client = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
})

export const analyzeFramesWithGemini = async (frameUrls: string[]): Promise<string> => {
	const frames = frameUrls.slice(0, 3)
	const finalPromptString = buildQuickVideoPrompt(promptData)

	const response = await client.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: [
			finalPromptString,
			...frames.map((url) => ({
				fileData: {
					fileUri: url,
				},
			})),
		],
	})

	return response.text ?? ''
}
