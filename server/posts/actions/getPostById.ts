import { getPrisma } from '@/lib/prisma'
import type { PostDetails } from '../types'

export const getPostById = async (postId: number): Promise<PostDetails | null> => {
	const prisma = getPrisma()

	const post = await prisma.post.findUnique({
		where: { id: postId },
		select: {
			id: true,
			title: true,
			videoUrl: true,
			petId: true,
			video: {
				select: {
					id: true,
					aiTags: true,
					aiConfidence: true,
					aiTitle: true,
					aiDescription: true,
					moderationStatus: true,
					moderationReason: true,
				},
			},
		},
	})

	if (!post) return null

	return {
		id: post.id,
		title: post.title,
		videoUrl: post.videoUrl,
		petId: post.petId,
		aiTitle: post.video?.aiTitle ?? '',
		aiDescription: post.video?.aiDescription ?? '',
		aiTags: post.video?.aiTags,
		aiConfidence: post.video?.aiConfidence ?? 0,
		moderationStatus: post.video?.moderationStatus,
		moderationReason: post.video?.moderationReason,
	}
}
