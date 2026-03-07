export type ModerationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED'

export type VideoAiAnalysisResult = {
	tags: string[]
	confidence: number
	description: string
	moderation: { status: ModerationStatus; reason: string }
}

export type QuickVideoAiResult = {
	tags: string[]
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
