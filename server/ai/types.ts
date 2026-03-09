export type QuickVideoAiResult = {
	aiTags: string[]
	animal: 'cat' | 'dog' | 'unknown'
	isBlind: boolean
	confidence: {
		animal: number
		blind: number
	}
	rationale: string
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
