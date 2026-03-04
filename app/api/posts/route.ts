import { NextResponse } from 'next/server'
import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { getPrisma } from '@/lib/prisma'
import { isCreatePostBody } from '@/server/utils/validation'

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
			log.warn('Invalid request body', { rawBody })

			return Response.json({ error: 'Invalid request body' }, { status: 400 })
		}

		const { caption, videoUrl, petId } = rawBody
		const videoUrlTrimmed = videoUrl.trim()
		const captionTrimmed = caption?.trim() ?? ''

		log.info('Body validated', {
			videoUrl: videoUrlTrimmed,
			caption: captionTrimmed,
		})

		const created = await prisma.post.create({
			data: {
				caption: captionTrimmed,
				videoUrl: videoUrlTrimmed,
				petId: petId,
			},
			select: {
				id: true,
				videoUrl: true,
				caption: true,
				petId: true,
			},
		})

		log.info('Post created', { postId: created.id })

		return Response.json({
			ok: true,
			post: created,
		})
	} catch (error) {
		log.error('Unhandled error in POST', undefined, error)

		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
