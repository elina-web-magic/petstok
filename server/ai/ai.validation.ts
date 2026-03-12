import { isNonEmptyString, isRecord, isStringArray } from '@/server/utils/guards'
import type { HashtagsRequestBody } from './types'

export const isHashtagsRequestBody = (value: unknown): value is HashtagsRequestBody => {
	if (!isRecord(value)) return false
	if (!isNonEmptyString(value.videoUrl)) return false
	if (!isStringArray(value.animalReferenceImageUrls)) return false
	return true
}
