import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { getPostById } from '@/server/posts/actions/getPostById'
import { parseId } from '@/server/utils/guards'

export const runtime = 'nodejs'

const logger = new Logger({
	scope: 'api:post',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

export const GET = async (
	_req: Request,
	ctx: { params: Promise<{ postId: string }> }
): Promise<Response> => {
	const { postId } = await ctx.params
	const id = parseId(postId)

	const requestId = crypto.randomUUID()
	const log = logger.child({ requestId })

	log.info('GET /api/posts/[postId] called')

	if (!id) {
		log.error('Invalid get post')
		return Response.json({ error: 'Invalid post' }, { status: 400 })
	}

	const post = await getPostById(id)

	if (!post) {
		log.error('Post not found')
		return Response.json({ error: 'Post not found' }, { status: 404 })
	}

	return Response.json({ ok: true, post }, { status: 200 })
}
