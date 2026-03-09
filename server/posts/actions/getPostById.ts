import { getPrisma } from '@/lib/prisma'
import type { PostDetails } from '../types'

export const getPostById = async (postId: number): Promise<PostDetails | null> => {
	const prisma = getPrisma()

	const post = await prisma.post.findUnique({
		where: { id: postId },
		select: {
			id: true,
			caption: true,
			videoUrl: true,
			petId: true,
			video: {
				select: {
					id: true,
					aiTags: true,
					aiConfidence: true,
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
		caption: post.caption,
		videoUrl: post.videoUrl,
		petId: post.petId,
		aiTags: post.video?.aiTags,
		aiConfidence: post.video?.aiConfidence ?? 0,
		moderationStatus: post.video?.moderationStatus,
		moderationReason: post.video?.moderationReason,
	}
}
