'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { QuickVideoAiResult } from '@/server/ai/types'
import { Button } from '../ui/button'
import { Preview } from '../video/Preview'

interface SuccessPostProps {
	result: QuickVideoAiResult
	videoUrl: string
	onError?: () => void
	openDetails: () => void
	showDetails: boolean
}

export default function SuccessPost(props: SuccessPostProps) {
	const { result, videoUrl, onError, openDetails, showDetails } = props

	const { description, animal, confidence, hashtags, activity, location } = result

	return (
		<AspectRatio className="Post SuccessPost" ratio={9 / 16}>
			<div className="PostHeader">
				<div className="flex items-center justify-between">
					<span className="font-medium">Animal:</span> {animal === 'cat' && <span>Cat 😺</span>}
					{animal === 'dog' && <span>Dog 🐶</span>}
					{animal === 'unknown' && <span>Unknown 🥺</span>}
				</div>
			</div>
			<div className="mt-3 space-y-2 h-64 relative">
				<Preview
					className="overflow-hidden rounded-lg h-full flex content-center items-center justify-center bg-[var(--ps-muted)]"
					videoUrl={videoUrl}
					onError={onError}
					muted
					controls
					preload="metadata"
					playsInline
				/>
			</div>
			<div className="PostBottom">
				{result && (
					<div className="rounded-md border border-[var(--ps-border)] bg-[var(--ps-card)] p-3 text-xs space-y-2">
						<div className="text-muted-foreground">
							<span className="font-medium text-foreground">Description</span> {description}
						</div>
						<div className="Hashtags">
							{hashtags.map((tag) => (
								<span key={tag}>{tag}</span>
							))}
						</div>
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="w-full"
							onClick={openDetails}
						>
							{showDetails ? 'Hide details' : 'Show details'}
						</Button>

						{showDetails && (
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
				)}
			</div>
		</AspectRatio>
	)
}
