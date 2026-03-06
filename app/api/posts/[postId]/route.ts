import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const parseId = (value: string): number | null => {
	const n = Number(value)
	return Number.isFinite(n) && n > 0 ? n : null
}

const logger = new Logger({
	scope: 'api:post',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

export const GET = async (
	_req: Request,
	ctx: { params: Promise<{ postId: string }> }
): Promise<Response> => {
	const prisma = getPrisma()

	const { postId } = await ctx.params
	const id = parseId(postId)

	const requestId = crypto.randomUUID()
	const log = logger.child({ requestId })

	log.info('GET /api/posts/[postId] called')

	if (!id) {
		log.error('Invalid get post')
		return Response.json({ error: 'Invalid post' }, { status: 400 })
	}

	const post = await prisma.post.findUnique({
		where: { id },
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

	if (!post) {
		log.error('Post not found')
		return Response.json({ error: 'Post not found' }, { status: 404 })
	}

	return Response.json({ ok: true, post }, { status: 200 })
}
