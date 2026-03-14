'use client'

import { useState } from 'react'
import type { SearchParams, ValidationgErrors } from '@/app/(app)/create/page'
import DevUploadPage from '@/app/dev/ai/page'
import { AiProcessingPanelContainer } from '@/features/ai-processing/ui/AiProcessingPanelContainer'

type CreatePostContentProps = {
	searchParams: SearchParams
	errors?: ValidationgErrors
}

const CreatePostContent = ({ searchParams, errors }: CreatePostContentProps) => {
	const [isProcessingStarted, setIsProcessingStarted] = useState(false)

	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
			<DevUploadPage
				searchParams={searchParams}
				errors={errors}
				onProcessingStarted={() => setIsProcessingStarted(true)}
				onProcessingReset={() => setIsProcessingStarted(false)}
			/>

			<AiProcessingPanelContainer
				enabled={isProcessingStarted}
				streamUrl="/api/ai/video-processing-stream"
			/>
		</div>
	)
}

export default CreatePostContent
