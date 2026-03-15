'use client'

import { useMemo, useState } from 'react'
import CommentsPanel from '@/components/post/CommentsPanel'
import { PostDetailLayout } from '@/components/post/PostDetailLayout'
import { VideoSection } from '@/components/post/VideoSection'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ProfileVideoGridButton } from './ProfileVideoGridButton'
import type { ProfilePostItem, ProfileVideoItem, ProfileVideosGridProps } from './types'

export const ProfileVideosGrid = ({ items }: ProfileVideosGridProps) => {
	const defaultPost = useMemo(() => items[0] ?? null, [items])

	const [selectedPost, setSelectedPost] = useState<ProfilePostItem | null>(defaultPost)
	const [isOpen, setIsOpen] = useState(false)

	const handleOpenClick = (item: ProfileVideoItem) => {
		setSelectedPost(item)
		setIsOpen(true)
	}

	return (
		<>
			<div className="ProfileVideosGrid grid gap-3 lg:grid-cols-5 grid-cols-1 sm:grid-cols-3">
				{items.map((item) => (
					<ProfileVideoGridButton key={item.id} item={item} onClick={() => handleOpenClick(item)} />
				))}
			</div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
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
