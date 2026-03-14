import { initialProcessingState } from '../../constants'
import type { ProcessingEvent, ProcessingState } from '../../types'

type ProcessingAction =
	| { type: 'STREAM_RESET' }
	| { type: 'STREAM_STARTED' }
	| { type: 'EVENT_RECEIVED'; payload: ProcessingEvent }
	| { type: 'STREAM_FAILED'; payload: string }

export const processingReducer = (
	state: ProcessingState,
	action: ProcessingAction
): ProcessingState => {
	switch (action.type) {
		case 'STREAM_RESET':
			return initialProcessingState

		case 'STREAM_STARTED':
			return {
				status: null,
				events: [],
				isStreaming: true,
				error: null,
			}

		case 'EVENT_RECEIVED': {
			const nextEvent = action.payload
			const isFinished = nextEvent.step === 'completed' || nextEvent.step === 'error'

			return {
				status: nextEvent.step,
				events: [...state.events, nextEvent],
				isStreaming: !isFinished,
				error: nextEvent.step === 'error' ? 'Error while streaming' : null,
			}
		}

		case 'STREAM_FAILED':
			return {
				...state,
				isStreaming: false,
				error: action.payload,
			}

		default:
			return state
	}
}
