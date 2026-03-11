'use client'

import type { QuickVideoAiResult } from '@/server/ai/types'

interface AnalyzeResultProps {
	result: QuickVideoAiResult
	videoUrl: string
	onError?: () => void
	openDetails: () => void
	showDetails: boolean
}

export default function AnalyzeResult(props: AnalyzeResultProps) {
	const { result } = props

	const { animal, confidence, activity, location } = result

	return (
		<div className="AnalyzeResult grid gap-4">
			<div className="flex items-center justify-between">
				<span className="font-medium">Animal:</span> {animal === 'cat' && <span>Cat 😺</span>}
				{animal === 'dog' && <span>Dog 🐶</span>}
				{animal === 'unknown' && <span>Unknown 🥺</span>}
			</div>
			{result && (
				<div className="rounded-md border border-[var(--ps-border)] bg-[var(--ps-muted)] p-2 space-y-2">
					<div className="flex items-center justify-between">
						<span className="font-medium">Animal confidence:</span>
						<span className="text-muted-foreground">{confidence}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="font-medium">Activity:</span>
						<span className="text-muted-foreground">{activity}</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="font-medium">Location:</span>
						<span className="text-muted-foreground">{location}</span>
					</div>
				</div>
			)}
		</div>
	)
}
