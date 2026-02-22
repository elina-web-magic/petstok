'use client'

import { useEffect } from 'react'
import { MESSAGE_TYPE, TARGET_ORIGIN } from './constants'

type EmbedResizeBridgeProps = {
	messageType?: typeof MESSAGE_TYPE
	targetOrigin?: string
	channelId: string
}

const EmbedResizeBridge = ({
	messageType = MESSAGE_TYPE,
	targetOrigin = TARGET_ORIGIN,
	channelId,
}: EmbedResizeBridgeProps) => {
	useEffect(() => {
		const postHeight = () => {
			const bodyHeight = document.body ? document.body.scrollHeight : 0
			const docHeight = document.documentElement ? document.documentElement.scrollHeight : 0
			const height = Math.max(bodyHeight, docHeight)

			window.parent.postMessage({ type: messageType, height, channelId }, targetOrigin)
		}

		postHeight()
		window.addEventListener('resize', postHeight)

		return () => {
			window.removeEventListener('resize', postHeight)
		}
	}, [messageType, targetOrigin, channelId])

	return null
}

export default EmbedResizeBridge
