import type { ReactNode } from 'react'

type PostDetailLayoutProps = {
	videoSlot: ReactNode
	commentsSlot: ReactNode
}

export const PostDetailLayout = (props: PostDetailLayoutProps) => {
	const { videoSlot, commentsSlot } = props

	return (
		<section className="mx-auto flex w-full max-w-7xl flex-col overflow-hidden rounded-2xl border bg-background lg:h-[calc(100vh-120px)] lg:flex-row">
			<div className="min-w-0 flex-1 border-b bg-black lg:border-b-0 lg:border-r">{videoSlot}</div>

			<aside className="w-full shrink-0 bg-background lg:w-[420px] xl:w-[460px]">
				{commentsSlot}
			</aside>
		</section>
	)
}
