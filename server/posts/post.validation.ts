import { isNonEmptyString, isOptionalString, isPositiveNumber, isRecord } from '../utils/guards'
import type { CreatePostBody } from './types'

export const isCreatePostBody = (value: unknown): value is CreatePostBody => {
	if (!isRecord(value)) return false
	if (!isNonEmptyString(value.videoUrl)) return false
	if (!isOptionalString(value.caption)) return false
	if (!isPositiveNumber(value.petId)) return false
	return true
}
