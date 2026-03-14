'use client'

import { useProcessingStream } from '../model/useProcessingStream'
import { AiProcessingPanel } from './AiProcessingPanel'

type AiProcessingPanelContainerProps = {
	enabled: boolean
	streamUrl: string
}

export const AiProcessingPanelContainer = ({
	enabled,
	streamUrl,
}: AiProcessingPanelContainerProps) => {
	const { state } = useProcessingStream({
		enabled,
		streamUrl,
	})

	return <AiProcessingPanel state={state} />
}
