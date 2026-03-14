'use client'

import { useCallback, useEffect, useReducer, useRef } from 'react'
import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { initialProcessingState } from '../constants'
import type { ProcessingEvent } from '../types'
import { processingReducer } from './processing/reducer'

const logger = new Logger({
	scope: 'useProcessingStream',
	minLevel: 'info',
	sinks: [new ConsoleSink()],
})

type UseProcessingStreamParams = {
	enabled: boolean
	streamUrl: string
}

const parsedData = (data: string): ProcessingEvent => JSON.parse(data) as ProcessingEvent

export const useProcessingStream = ({ enabled, streamUrl }: UseProcessingStreamParams) => {
	const [state, dispatch] = useReducer(processingReducer, initialProcessingState)

	const eventSourceRef = useRef<EventSource | null>(null)

	const closeStream = useCallback(() => {
		eventSourceRef.current?.close()
		eventSourceRef.current = null
	}, [])

	useEffect(() => {
		if (!enabled) {
			logger.info('Stream reset, not enabled')

			closeStream()

			dispatch({ type: 'STREAM_RESET' })
			return
		}

		const eventSource = new EventSource(streamUrl)
		eventSourceRef.current = eventSource

		logger.info('Stream started')

		dispatch({ type: 'STREAM_STARTED' })

		eventSource.onmessage = (event) => {
			logger.info('Message received')

			if (!event.data) return

			logger.info('Message data: ', event.data)

			try {
				const data = parsedData(event.data)

				dispatch({
					type: 'EVENT_RECEIVED',
					payload: data,
				})

				const isFinished = data.step === 'completed' || data.step === 'error'

				if (isFinished) {
					closeStream()

					logger.info(`Streaming closed on step ${data.step}`)
				}
			} catch (error) {
				logger.error(`Invalid stream payload ${String(error)}`)

				dispatch({
					type: 'STREAM_FAILED',
					payload: 'Invalid stream payload',
				})

				closeStream()
			}
		}

		eventSource.onerror = (err) => {
			logger.error(`Stream connection error ${String(err)}`)

			dispatch({
				type: 'STREAM_FAILED',
				payload: 'Stream connection failed',
			})

			closeStream()
		}

		return () => {
			logger.info('Streaming closed')

			closeStream()
		}
	}, [enabled, streamUrl, closeStream])

	return {
		state,
	}
}
