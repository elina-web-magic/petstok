import type { ReactNode } from 'react'

type PostDetailLayoutProps = {
	videoSlot: ReactNode
	commentsSlot: ReactNode
}

export const PostDetailLayout = (props: PostDetailLayoutProps) => {
	const { videoSlot, commentsSlot } = props

	return (
		<section className="PostDetailLayout mx-auto flex w-full p-0 flex-col h-full overflow-hidden rounded-2xl bg-background lg:flex-row">
			<div className="min-w-0 bg-black max-h-3/5 lg:max-h-full">{videoSlot}</div>

			<aside className="w-full shrink-0 bg-background lg:w-[420px] xl:w-[460px] lg:max-h-full">
				{commentsSlot}
			</aside>
		</section>
	)
}
