'use client'

import { AspectRatio } from '@/components/ui/aspect-ratio'

type VideoPreview = {
	videoUrl: string
	preload: string
	muted: boolean
	onError?: () => void
	className?: string
	controls?: boolean
	playsInline?: boolean
	aspectRatio?: number
}

export function Preview(props: VideoPreview) {
	const { videoUrl, onError, className, muted, preload, playsInline, controls, aspectRatio } = props

	return (
		<div className={className}>
			<AspectRatio ratio={aspectRatio ?? 9 / 16}>
				<video
					className="h-full w-full object-cover"
					src={videoUrl}
					muted={muted}
					controls={controls}
					playsInline={playsInline}
					preload={preload}
					onError={onError}
				>
					<track kind="captions" />
				</video>
			</AspectRatio>
		</div>
	)
}
