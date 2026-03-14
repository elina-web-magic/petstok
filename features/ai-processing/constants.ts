import type { ProcessingState, ProcessingStep } from './types'

export const stepLabels: Record<ProcessingStep, string> = {
	queued: 'Queued',
	processing_started: 'Processing started',
	frames_extracted: 'Frames extracted',
	title_generated: 'Title generated',
	hashtags_generated: 'Hashtags generated',
	moderation_completed: 'Moderation completed',
	completed: 'Completed',
	error: 'Error',
}

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

export const initialProcessingState: ProcessingState = {
	status: null,
	events: [],
	isStreaming: false,
	error: null,
}
