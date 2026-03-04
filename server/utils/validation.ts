import type { CreatePostBody, PetTagsRequestBody } from '../types'

type UnknownRecord = Record<string, unknown>

const isRecord = (value: unknown): value is UnknownRecord =>
	typeof value === 'object' && value !== null

const isNonEmptyString = (value: unknown): value is string =>
	typeof value === 'string' && value.trim().length > 0

const isStringArray = (value: unknown): value is string[] =>
	Array.isArray(value) && value.every((v) => typeof v === 'string')

const isPositiveNumber = (value: unknown): value is number => typeof value === 'number' && value > 0

const isOptionalString = (value: unknown): value is string =>
	value === '' || typeof value === 'string'

export const isCreatePostBody = (value: unknown): value is CreatePostBody => {
	if (!isRecord(value)) return false
	if (!isNonEmptyString(value.videoUrl)) return false
	if (!isOptionalString(value.caption)) return false
	if (!isPositiveNumber(value.petId)) return false
	return true
}

export const isPetTagsRequestBody = (value: unknown): value is PetTagsRequestBody => {
	if (!isRecord(value)) return false
	if (!isNonEmptyString(value.videoUrl)) return false
	if (!isStringArray(value.animalReferenceImageUrls)) return false
	return true
}
