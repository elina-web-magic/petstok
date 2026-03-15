import type { ReactNode } from 'react'

type PostDetailLayoutProps = {
	videoSlot: ReactNode
	commentsSlot: ReactNode
}

export const PostDetailLayout = (props: PostDetailLayoutProps) => {
	const { videoSlot, commentsSlot } = props

	return (
		<section className="PostDetailLayout mx-auto flex w-full p-0 flex-col h-full overflow-hidden rounded-2xl bg-background md:flex-row">
			<div className="w-full  px-2 min-w-0 bg-black max-h-3/5 md:max-h-full">{videoSlot}</div>

			<aside className="w-full w-20 shrink-0 bg-background md:w-[320px] lg:w-[460px] md:max-h-full">
				{commentsSlot}
			</aside>
		</section>
	)
}
