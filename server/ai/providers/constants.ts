import type { QuickVideoAiResult } from '../types'

export const fallback: QuickVideoAiResult = {
	animal: 'unknown',
	title: 'unkown',
	activity: 'unknown activity',
	location: 'unknown',
	hashtags: [],
	description: 'Unable to analyze the video',
	confidence: 0,
}
