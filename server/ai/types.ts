export type SceneLocation = 'indoors' | 'outdoors' | 'unknown'
export type PetType = 'cat' | 'dog' | 'unknown'

export type QuickVideoAiResult = {
	animal: PetType
	activity: string
	location: SceneLocation
	hashtags: string[]
	description: string
	title: string
	confidence: number
}

export type QuickVideoAiInput = {
	videoUrl: string
	animalReferenceImageUrls: string[]
}

export type QuickVideoAiGuardResult = { ok: true } | { ok: false; reason: string }

export type RunQuickVideoAiCheckResult =
	| { ok: true; result: QuickVideoAiResult }
	| { ok: false; error: string }

export type PetTagsRequestBody = {
	videoUrl: string
	animalReferenceImageUrls: string[]
}
