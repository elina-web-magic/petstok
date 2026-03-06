import { isNonEmptyString, isOptionalString, isPositiveNumber, isRecord } from '../utils/guards'

type CreatePostBody = {
	videoUrl: string
	caption?: string
	petId: number
}

export const isCreatePostBody = (value: unknown): value is CreatePostBody => {
	if (!isRecord(value)) return false
	if (!isNonEmptyString(value.videoUrl)) return false
	if (!isOptionalString(value.caption)) return false
	if (!isPositiveNumber(value.petId)) return false
	if (!isPositiveNumber(value.id)) return false
	return true
}
