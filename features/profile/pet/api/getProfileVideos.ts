import type { GetProfileVideosResponse } from '@/server/profile/types'
import type { GetProfileVideosParams } from '../../types'

const PROFILE_VIDEOS_PAGE_SIZE = 6

export const getProfileVideos = async (
	params: GetProfileVideosParams
): Promise<GetProfileVideosResponse> => {
	const { petId, cursor } = params

	const searchParams = new URLSearchParams()

	searchParams.set('petId', String(petId))
	searchParams.set('limit', String(PROFILE_VIDEOS_PAGE_SIZE))

	if (cursor !== null && cursor !== undefined) {
		searchParams.set('cursor', String(cursor))
	}

	const response = await fetch(`/api/profile/videos?${searchParams.toString()}`)

	if (!response.ok) throw new Error('Failed to load profile videos')

	return (await response.json()) as GetProfileVideosResponse
}
