type ModerationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED'

export type CreatePostBody = {
	videoUrl: string
	caption?: string
	petId: number
}

export type CreatePostResponse = {
	ok: true
	post: {
		id: number
		videoUrl: string
		caption: string
		petId: number
	}
}

export type PostDetails = {
	id: number
	videoUrl: string
	petId: number
	caption?: string
	aiTags?: string[]
	aiConfidence?: number
	aiDescription?: string
	moderationStatus?: ModerationStatus
	moderationReason?: string | null
}
