'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { PostDetails } from '@/server/posts/types'
import { Preview } from '../video/Preview'

interface SuccessPostProps {
	result: PostDetails
	onError?: () => void
}

export default function SuccessPost(props: SuccessPostProps) {
	const { result, onError } = props

	const { videoUrl, aiTitle, aiDescription, aiTags } = result

	return (
		<AspectRatio className="Post SuccessPost" ratio={9 / 16}>
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
						{aiTitle && (
							<h1 className="text-muted-foreground">
								<span className="font-medium text-foreground">Title</span> {aiTitle}
							</h1>
						)}
						{aiDescription && (
							<div className="text-muted-foreground">
								<span className="font-medium text-foreground">Description</span> {aiDescription}
							</div>
						)}
						{aiTags && (
							<div className="aiTags grid gap-4">
								{aiTags.map((tag) => (
									<div key={tag}>{tag}</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</AspectRatio>
	)
}
