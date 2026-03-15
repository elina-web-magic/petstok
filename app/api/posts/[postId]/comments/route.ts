import { NextResponse } from 'next/server'
import { USER_ID } from '@/globalConstants'
import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { getPrisma } from '@/lib/prisma'
import { parseId } from '@/server/utils/guards'

type RouteContext = {
	params: Promise<{
		postId: string
	}>
}

type CreateCommentBody = {
	message: string
}

const logger = new Logger({
	scope: 'api:posts:postId:comments',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

export const POST = async (request: Request, context: RouteContext) => {
	const prisma = getPrisma()
	if (!prisma) return NextResponse.json({ error: 'Database not available' }, { status: 503 })

	const requestId = crypto.randomUUID()
	const log = logger.child({ requestId })

	try {
		log.info('Sent request')
		const { postId } = await context.params

		const parsedPostId = parseId(postId)

		if (!parsedPostId) return NextResponse.json({ error: 'Invalid post id' }, { status: 400 })

		const body = (await request.json()) as CreateCommentBody

		log.info('Get post body: ', body)

		const trimmedMessage = body.message.trim()

		if (trimmedMessage.length === 0)
			return NextResponse.json({ error: 'Message is required' }, { status: 400 })

		const comment = await prisma.comment.create({
			data: {
				message: trimmedMessage,
				postId: parsedPostId,
				authorId: USER_ID,
			},
			select: {
				id: true,
				message: true,
				createdAt: true,
			},
		})

		return NextResponse.json(
			{
				id: String(comment.id),
				message: comment.message,
				createdAt: comment.createdAt.toISOString(),
				authorName: 'You',
			},
			{ status: 201 }
		)
	} catch {
		return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
	}
}
