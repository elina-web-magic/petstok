type ModerationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED'

export type CreatePostBody = {
	videoUrl: string
	title?: string
	petId: number
}

export type CreatePostResponse = {
	ok: true
	post: {
		id: number
		videoUrl: string
		title: string
		petId: number
	}
}

export type PostDetails = {
	id: number
	videoUrl: string
	petId: number
	title: string
	aiTitle?: string
	aiTags?: string[]
	aiConfidence?: number
	aiDescription?: string
	moderationStatus?: ModerationStatus
	moderationReason?: string | null
}
