import type { ProcessingStep } from '../model/processing/types'

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
