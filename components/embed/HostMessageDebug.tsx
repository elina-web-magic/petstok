'use client'

import { useEffect } from 'react'
import { ALLOWED_ORIGINS, MESSAGE_TYPE } from './constants'

type ResizeMessage = {
	type: typeof MESSAGE_TYPE
	height: number
	version?: number
	channelId: string
}

const HostMessageDebug = ({ expectedChannelId }: { expectedChannelId: string }) => {
	useEffect(() => {
		const allowedOrigins = new Set<string>(ALLOWED_ORIGINS)

		const isResizeMessage = (value: unknown): value is ResizeMessage => {
			if (typeof value !== 'object' || value === null) return false

			const record = value as Record<string, unknown>

			return (
				record.type === MESSAGE_TYPE &&
				typeof record.height === 'number' &&
				Number.isFinite(record.height)
			)
		}

		const onMessage = (event: MessageEvent<unknown>) => {
			if (!allowedOrigins.has(event.origin)) return
			if (!isResizeMessage(event.data)) return
			if (event.data.channelId !== expectedChannelId) return

			// biome-ignore lint/suspicious/noConsole: logging widget size for debug purposes
			console.log('HOST accepted size', event.data.height)
		}

		window.addEventListener('message', onMessage)

		return () => {
			window.removeEventListener('message', onMessage)
		}
	}, [expectedChannelId])

	return null
}

export default HostMessageDebug
