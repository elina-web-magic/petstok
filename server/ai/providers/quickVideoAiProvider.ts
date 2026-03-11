import type { Logger } from '@/lib/logger/logger'
import { extractFrames } from '@/server/video/extractFrames'
import type { QuickVideoAiInput, QuickVideoAiResult } from '../types'
import { fallback } from './constants'
import { analyzeFramesWithGemini } from './geminiQuickVisionClient'
import { mapQuickVideoAiResult } from './mapQuickVideoAiResult'
import { parseQuickVideoAiResponse } from './parseQuickVideoAiResponse'

export const runQuickVideoAiProvider = async (
	input: QuickVideoAiInput,
	log: Logger
): Promise<QuickVideoAiResult> => {
	const normalizedUrl = input.videoUrl.trim()
	const frames = extractFrames(normalizedUrl)

	if (frames.length === 0) {
		throw new Error('No frames extracted from video')
	}

	try {
		log.info('Prepared frames for Gemini', {
			normalizedUrl,
			frameCount: frames.length,
			frames,
		})

		const geminiResponse = await analyzeFramesWithGemini(frames, log)

		if (geminiResponse.trim() === '') {
			throw new Error('Gemini response is empty')
		}

		const parsedResponse = parseQuickVideoAiResponse(geminiResponse)
		const result = mapQuickVideoAiResult(parsedResponse)

		log.info('Quick AI result mapped', { result })

		return result
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error'

		log.error(`Cannot get AI result: ${message}`)

		return fallback
	}
}
