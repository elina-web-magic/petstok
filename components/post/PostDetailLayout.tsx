import type { ReactNode } from 'react'

type PostDetailLayoutProps = {
	videoSlot: ReactNode
	commentsSlot: ReactNode
}

export const PostDetailLayout = (props: PostDetailLayoutProps) => {
	const { videoSlot, commentsSlot } = props

	return (
		<section className="PostDetailLayout mx-auto flex h-full w-full flex-col overflow-hidden rounded-2xl bg-background md:flex-row">
			<div className="PostDetailLayout_Video min-h-0 flex-[3] bg-black md:flex-1">{videoSlot}</div>

			<aside className="PostDetailLayout_Comments min-h-0 flex-[2] border-white/10 bg-background md:w-[320px] md:flex-none lg:w-[460px]">
				{commentsSlot}
			</aside>
		</section>
	)
}
