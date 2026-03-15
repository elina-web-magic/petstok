import { Preview } from '@/components/video/Preview'

type VideoSectionProps = {
	videoUrl: string
	thumbnailUrl?: string | null
	title: string | null
	description: string | null
	tags: string[]
}

export const VideoSection = ({ videoUrl, title, description, tags }: VideoSectionProps) => {
	return (
		<div className="VideoSection flex h-full flex-col bg-black text-white">
			<div className="flex min-h-0 flex-1 items-center justify-center bg-black">
				<div className="w-auto md:w-full overflow-hidden rounded-2xl bg-zinc-950 aspect-video max-h-9/10">
					<div className="space-y-2 h-full flex items-center justify-center">
						<Preview
							className="overflow-hidden rounded-lg h-full flex items-center justify-center bg-[var(--ps-muted)] aspect-video"
							videoUrl={videoUrl}
							muted
							controls
							preload="metadata"
							playsInline
						/>
					</div>
				</div>
			</div>

			<div className="space-y-3 border-t border-white/10 bg-zinc-950/95 p-4 hidden lg:block">
				<div className="space-y-1">
					<h1 className="text-lg font-semibold leading-tight">{title || 'Untitled post'}</h1>

					{description ? <p className="text-sm leading-6 text-zinc-300">{description}</p> : null}
				</div>

				{tags.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{tags.map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-200"
							>
								#{tag}
							</span>
						))}
					</div>
				) : null}
			</div>
		</div>
	)
}
