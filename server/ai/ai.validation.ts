import { isNonEmptyString, isRecord, isStringArray } from '@/server/utils/guards'

type PetTagsRequestBody = {
	videoUrl: string
	animalReferenceImageUrls: string[]
}

export const isPetTagsRequestBody = (value: unknown): value is PetTagsRequestBody => {
	if (!isRecord(value)) return false
	if (!isNonEmptyString(value.videoUrl)) return false
	if (!isStringArray(value.animalReferenceImageUrls)) return false
	return true
}
