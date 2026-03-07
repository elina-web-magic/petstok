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
