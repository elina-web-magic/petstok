export const processingSteps = [
	'queued',
	'processing_started',
	'frames_extracted',
	'title_generated',
	'hashtags_generated',
	'moderation_completed',
	'completed',
	'error',
] as const

export type ProcessingStep = (typeof processingSteps)[number]

export type ProcessingEvent = {
	step: ProcessingStep
	timestamp: number
}

export type ProcessingState = {
	status: ProcessingStep | null
	events: ProcessingEvent[]
	isStreaming: boolean
	error: string | null
}
