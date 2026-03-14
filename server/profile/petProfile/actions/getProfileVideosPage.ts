import type { ProfileVideoItem } from '@/components/profile/pet/types'
import { getPrisma } from '@/lib/prisma'
import { extractRepresentativeFrames } from '@/server/video/services/extractRepresentativeFrames'
import type { GetProfileVideosResponse } from '../../types'

type GetProfileVideosPageParams = {
	petId: number
	cursor: number | null
	limit: number
}

export const getProfileVideosPage = async (
	params: GetProfileVideosPageParams
): Promise<GetProfileVideosResponse> => {
	const prisma = getPrisma()

	const { petId, cursor, limit } = params
	let nextCursor: number | null = null

	const posts = await prisma.post.findMany({
		where: {
			petId: petId,
		},
		orderBy: {
			id: 'desc',
		},
		take: limit + 1,
		cursor: cursor ? { id: cursor } : undefined,
		skip: cursor ? 1 : 0,

		select: {
			id: true,
			title: true,
			videoUrl: true,
			views: true,
		},
	})

	if (!posts)
		return {
			items: [],
			nextCursor: null,
		}

	if (posts.length > limit) nextCursor = posts[limit].id
	if (posts.length <= limit) nextCursor = null

	const slicedPosts = posts.slice(0, limit)

	const items: ProfileVideoItem[] = slicedPosts.map((post) => {
		const frames = extractRepresentativeFrames(post.videoUrl)

		return {
			id: post.id,
			title: post.title,
			views: post.views,
			thumbnailUrl: frames[0]?.url ?? '',
			postUrl: `/post/${post.id}`,
			videoUrl: post.videoUrl,
		}
	})

	return {
		items,
		nextCursor,
	}
}
