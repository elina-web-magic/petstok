import type { ProfileVideoItem } from '@/components/profile/pet/types'

export type GetProfileVideosResponse = {
	items: ProfileVideoItem[]
	nextCursor: number | null
}

export type GetProfileVideosParams = {
	petId: number
	cursor?: number | null
}
