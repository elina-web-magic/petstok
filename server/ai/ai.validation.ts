import { isNonEmptyString, isRecord, isStringArray } from '@/server/utils/guards'
import type { PetTagsRequestBody } from './types'

export const isPetTagsRequestBody = (value: unknown): value is PetTagsRequestBody => {
	if (!isRecord(value)) return false
	if (!isNonEmptyString(value.videoUrl)) return false
	if (!isStringArray(value.animalReferenceImageUrls)) return false
	return true
}
