import type { processingSteps } from './constants'

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
