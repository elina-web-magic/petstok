import type { ProfileVideoItem } from '@/components/profile/pet/types'

export type PetProfileDetails = {
	id: number
	name: string
	species: string
	bio: string | null
	ownerName: string | null
	postsCount: number
}

export type GetProfileVideosResponse = {
	items: ProfileVideoItem[]
	nextCursor: number | null
}
