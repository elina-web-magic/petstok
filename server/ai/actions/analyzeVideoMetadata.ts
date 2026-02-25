'use server'

import type { VideoAiAnalysisResult } from '@/server/ai/types'
import { persistVideoAiAnalysis } from '@/server/ai/videoAiService'

export const analyzeVideoMetadata = async (input: { postId: number }) => {
	const postId = input.postId

	if (Number.isNaN(postId) || postId <= 0) {
		return { ok: false, error: 'postId is required' }
	}

	const resultMock = {
		tags: ['cat', 'cute', 'kitty'],
		confidence: 0.9,
		description: 'Cute cat sleeps on the couch',
		moderation: {
			status: 'APPROVED',
			reason: 'No restricted content detected',
		},
	} satisfies VideoAiAnalysisResult

	try {
		const result = await persistVideoAiAnalysis({ postId, result: resultMock })
		return { ok: true, video: result }
	} catch {
		return { ok: false, error: 'Failed to analyze video metadata' }
	}
}
