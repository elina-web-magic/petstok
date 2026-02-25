import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const getErrorMessage = (error: unknown) => {
	if (error instanceof Error) return error.message
	return 'Unknown error'
}

export const GET = async (): Promise<Response> => {
	try {
		const pet = await prisma.pet.create({
			data: {
				name: 'Alisa',
				species: 'cat',
				user: {
					create: {
						email: `alisa-${Date.now()}@example.com`,
						password: 'dev-only',
					},
				},
			},
			select: { id: true },
		})

		const post = await prisma.post.create({
			data: {
				caption: 'Alisa post test',
				videoUrl: 'https://example.com',
				petId: pet.id,
			},
			select: { id: true, videoUrl: true },
		})

		const videoCreated = await prisma.video.create({
			data: {
				postId: post.id,
				url: post.videoUrl,
				title: 'Alisa Video',
				aiTags: ['cat', 'cute'],
				aiConfidence: 0.9,
				aiDescription: 'A cute cat.',
				moderationStatus: 'APPROVED',
				moderationReason: 'No restricted content detected.',
			},
			select: { id: true, postId: true, moderationStatus: true },
		})

		const readBack = await prisma.post.findUnique({
			where: { id: post.id },
			select: {
				id: true,
				videoUrl: true,
				video: {
					select: {
						id: true,
						aiTags: true,
						aiConfidence: true,
						moderationStatus: true,
						moderationReason: true,
					},
				},
			},
		})
		return Response.json({ ok: true, post: readBack, videoCreated })
	} catch (error) {
		return Response.json({ ok: false, error: getErrorMessage(error) }, { status: 500 })
	}
}
