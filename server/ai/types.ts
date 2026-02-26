export type ModerationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED'

export type VideoAiAnalysisResult = {
	tags: string[]
	confidence: number
	description: string
	moderation: { status: ModerationStatus; reason: string }
}
