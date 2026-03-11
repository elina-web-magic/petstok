import type { QuickVideoAiResult } from '@/server/ai/types'
import { isRecord, isStringArray } from '@/server/utils/guards'

export const isQuickVideoAiResult = (value: unknown): value is QuickVideoAiResult => {
	if (!isRecord(value)) return false

	return (
		['cat', 'dog', 'unknown'].includes(String(value.animal)) &&
		typeof value.activity === 'string' &&
		['indoors', 'outdoors', 'unknown'].includes(String(value.location)) &&
		isStringArray(value.hashtags) &&
		typeof value.description === 'string' &&
		typeof value.confidence === 'number'
	)
}
