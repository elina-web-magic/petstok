'use client'

import { useMemo, useState } from 'react'
import CommentsPanel from '@/components/post/CommentsPanel'
import { PostDetailLayout } from '@/components/post/PostDetailLayout'
import { VideoSection } from '@/components/post/VideoSection'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ProfileGridItem } from './ProfileGridItem'
import type { ProfileVideosGridProps } from './types'

type ProfilePostItem = {
	id: number
	title: string | null
	thumbnailUrl: string | null
	views: number
	postUrl: string
	videoUrl: string
	description?: string | null
	tags?: string[]
}

export const ProfileVideosGrid = ({ items }: ProfileVideosGridProps) => {
	const defaultPost = useMemo(() => items[0] ?? null, [items])

	const [selectedPost, setSelectedPost] = useState<ProfilePostItem | null>(defaultPost)
	const [isOpen, setIsOpen] = useState(true)

	return (
		<>
			<div className="ProfileVideosGrid grid grid-cols-2 gap-3 md:grid-cols-3">
				{items.map((item) => (
					<button
						key={item.id}
						type="button"
						className="text-left ProfileVideosGrid_Button"
						onClick={() => {
							setSelectedPost(item)
							setIsOpen(true)
						}}
					>
						<ProfileGridItem
							id={item.id}
							title={item.title}
							thumbnailUrl={item.thumbnailUrl}
							views={item.views}
							postUrl={item.postUrl}
							videoUrl={item.videoUrl}
						/>
					</button>
				))}
			</div>
			<Dialog open={true} onOpenChange={setIsOpen}>
				<DialogContent className="DialogContent ProfileVideo_DialogContent border-none bg-transparent px-8 shadow-none Dialog OpenedPost max-w-full h-screen flex flex-col items-center justify-center">
					<DialogTitle className="sr-only">Post detail</DialogTitle>
					{selectedPost ? (
						<PostDetailLayout
							videoSlot={
								<VideoSection
									videoUrl={selectedPost.videoUrl}
									title={selectedPost.title}
									description={selectedPost.description ?? null}
									tags={selectedPost.tags ?? []}
								/>
							}
							commentsSlot={<CommentsPanel initialComments={[]} />}
						/>
					) : null}
				</DialogContent>
			</Dialog>
		</>
	)
}
