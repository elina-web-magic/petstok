'use client'

type VideoPreview = {
	videoUrl: string
	preload: string
	muted: boolean
	onError?: () => void
	className?: string
	controls?: boolean
	playsInline?: boolean
}

export function Preview(props: VideoPreview) {
	const { videoUrl, onError, className, muted, preload, playsInline, controls } = props

	return (
		<div className={className}>
			<video
				className="h-full object-cover"
				src={videoUrl}
				muted={muted}
				controls={controls}
				playsInline={playsInline}
				preload={preload}
				onError={onError}
			>
				<track kind="captions" />
			</video>
		</div>
	)
}
