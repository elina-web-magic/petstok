import { NextResponse } from 'next/server'
import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { getPrisma } from '@/lib/prisma'
import { isCreatePostBody } from '@/server/posts/post.validation'
import type { CreatePostBody } from '@/server/posts/types'

export const runtime = 'nodejs'

const logger = new Logger({
	scope: 'api:posts',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

export async function POST(req: Request): Promise<Response> {
	const prisma = getPrisma()

	if (!prisma) {
		return NextResponse.json({ error: 'Database not available' }, { status: 503 })
	}

	const requestId = crypto.randomUUID()
	const log = logger.child({ requestId })

	log.info('POST /api/posts called')

	try {
		const rawBody: unknown = await req.json()

		if (!isCreatePostBody(rawBody)) {
			log.warn('Invalid request body post', { rawBody })

			return Response.json({ error: 'Error while request body post' }, { status: 400 })
		}

		const { title, videoUrl, petId } = rawBody as CreatePostBody
		const videoUrlTrimmed = videoUrl.trim()
		const titleTrimmed = title?.trim() ?? ''

		log.info('Body validated', {
			videoUrl: videoUrlTrimmed,
			title: titleTrimmed,
			petId: petId,
		})

		const created = await prisma.post.create({
			data: {
				title: titleTrimmed,
				videoUrl: videoUrlTrimmed,
				petId: petId,
			},
			select: {
				id: true,
				videoUrl: true,
				title: true,
				petId: true,
			},
		})

		log.info('Post created', { id: created.id, postId: created.id })

		return Response.json({
			ok: true,
			post: created,
		})
	} catch (error) {
		log.error('Unhandled error in POST', undefined, error)

		return Response.json({ error: 'Internal server error while creating post' }, { status: 500 })
	}
}
