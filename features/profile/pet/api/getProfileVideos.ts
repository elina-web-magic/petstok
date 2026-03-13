import { isNotNullOrUndefined } from '@/server/utils/guards'
import type { GetProfileVideosParams, GetProfileVideosResponse } from '../../types'

export const getProfileVideos = async (
	params: GetProfileVideosParams
): Promise<GetProfileVideosResponse> => {
	const { petId, cursor } = params

	const searchParams = new URLSearchParams()

	searchParams.set('petId', String(petId))

	if (!isNotNullOrUndefined(cursor)) searchParams.set('cursor', String(cursor))

	const response = await fetch(`/api/profile/videos?${searchParams.toString()}`)

	if (!response.ok) throw new Error('Failed to load profile videos')

	return (await response.json()) as GetProfileVideosResponse
}
