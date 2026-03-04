export type CreatePostBody = {
	videoUrl: string
	caption?: string
	petId: number
}

export type PetTagsRequestBody = {
	videoUrl: string
	animalReferenceImageUrls: string[]
}
