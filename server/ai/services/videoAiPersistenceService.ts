import type { ModerationStatus as PrismaModerationStatus } from '@prisma/client'
import { getPrisma } from '@/lib/prisma'
import type { VideoAiAnalysisResult } from '@/server/ai/services/types'

const clamp01 = (value: number): number => {
	if (Number.isNaN(value)) return 0
	if (value < 0) return 0
	if (value > 1) return 1

	return value
}

const normalizeTags = (tags: string[]): string[] => {
	if (tags.length === 0) return []

	const filtered = tags.map((tag) => tag.trim().toLowerCase()).filter((tag) => tag !== '')
	return Array.from(new Set(filtered)).slice(0, 20)
}

const toPrismaModerationStatus = (
	status: VideoAiAnalysisResult['moderation']['status']
): PrismaModerationStatus => {
	return status as PrismaModerationStatus
}

export const persistVideoAiAnalysis = async (input: {
	postId: number
	result: VideoAiAnalysisResult
}) => {
	const prisma = getPrisma()

	const post = await prisma.post.findUnique({
		where: { id: input.postId },
		select: { id: true, videoUrl: true },
	})

	if (!post) {
		throw new Error('Post not found')
	}

	const tags = normalizeTags(input.result.tags)
	const confidence = clamp01(input.result.confidence)
	const description = input.result.description.trim()
	const reason = input.result.moderation.reason.trim()
	const status = toPrismaModerationStatus(input.result.moderation.status)

	const video = await prisma.video.upsert({
		where: { postId: input.postId },
		create: {
			postId: input.postId,
			url: post.videoUrl,
			title: null,
			aiTags: tags,
			aiConfidence: confidence,
			aiDescription: description,
			moderationStatus: status,
			moderationReason: reason,
		},
		update: {
			url: post.videoUrl,
			aiTags: tags,
			aiConfidence: confidence,
			aiDescription: description,
			moderationStatus: status,
			moderationReason: reason,
		},
		select: {
			id: true,
			postId: true,
			moderationStatus: true,
		},
	})

	return video
}
