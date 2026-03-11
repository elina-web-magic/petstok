import { GoogleGenAI } from '@google/genai'
import type { Logger } from '@/lib/logger/logger'
import promptData from '@/server/ai/promts/quickVideoPrompt.v1.json'
import type { VideoFrames } from '@/server/video/services/extractRepresentativeFrames'
import { buildQuickVideoPrompt } from '../promts/buildQuickVideoPrompt'

const client = new GoogleGenAI({
	apiKey: process.env.GEMINI_API_KEY,
})

export const analyzeFramesWithGemini = async (
	frameUrls: VideoFrames[],
	log: Logger
): Promise<string> => {
	const frames = frameUrls.slice(0, 3)
	const finalPromptString = buildQuickVideoPrompt(promptData)

	const imageParts = await Promise.all(
		frames.map(async (frame) => {
			const response = await fetch(frame.url)

			if (!response.ok) throw new Error(`Cannot fetch frame: ${frame}`)

			const arrayBuffer = await response.arrayBuffer()
			const base64 = Buffer.from(arrayBuffer).toString('base64')

			log.info('Gemini raw response received', { response })

			return {
				inlineData: {
					mimeType: 'image/jpeg',
					data: base64,
				},
			}
		})
	)

	const response = await client.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: [finalPromptString, ...imageParts],
	})

	const text = response.text ?? ''
	log.info('Gemini raw text received', { text })
	return text
}
