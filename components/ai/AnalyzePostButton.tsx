'use client'

import { Loader } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { analyzeVideoMetadata } from '@/server/ai/actions/analyzeVideoMetadata'

type AnalyzePostButtonProps = {
	postId: number
}

type UiStatus = 'idle' | 'loading' | 'success' | 'error'

export const AnalyzePostButton = ({ postId }: AnalyzePostButtonProps) => {
	const [message, setMessage] = useState<string>('')
	const [uiStatus, setUiStatus] = useState<UiStatus>('idle')

	const onClick = async () => {
		setUiStatus('loading')
		setMessage('')

		try {
			const result = await analyzeVideoMetadata({ postId })

			if (!result.ok || !result.video) {
				setMessage(result.error ?? 'Failed to analyze')
				setUiStatus('error')
				return
			}
			setUiStatus('success')
			setMessage(`Saved: ${result.video?.moderationStatus}`)
		} catch {
			setMessage('Something went wrong')
			setUiStatus('error')
		}
	}

	return (
		<div className="space-y-2">
			<Button className="w-full" disabled={uiStatus === 'loading'} onClick={onClick}>
				{uiStatus === 'loading' ? <Loader className="h-4 w-4 animate-spin" /> : 'Analyze'}
			</Button>
			{message !== '' && <span>{message}</span>}
		</div>
	)
}
