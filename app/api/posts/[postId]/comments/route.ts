import { NextResponse } from 'next/server'
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

export const POST = async (request: Request, context: RouteContext) => {
	const prisma = getPrisma()
	if (!prisma) {
		return NextResponse.json({ error: 'Database not available' }, { status: 503 })
	}

	try {
		const { postId } = await context.params

		const parsedPostId = parseId(postId)

		if (!parsedPostId) {
			return NextResponse.json({ error: 'Invalid post id' }, { status: 400 })
		}

		const body = (await request.json()) as CreateCommentBody

		const trimmedMessage = body.message.trim()

		if (trimmedMessage.length === 0) {
			return NextResponse.json({ error: 'Message is required' }, { status: 400 })
		}

		const post = await prisma.post.findUnique({
			where: {
				id: parsedPostId,
			},
			select: {
				id: true,
			},
		})

		if (!post) {
			return NextResponse.json({ error: 'Post not found' }, { status: 404 })
		}

		const authorId = 22

		const comment = await prisma.comment.create({
			data: {
				message: trimmedMessage,
				postId: parsedPostId,
				authorId,
			},
			select: {
				id: true,
				message: true,
				createdAt: true,
				author: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		})

		return NextResponse.json(comment, { status: 201 })
	} catch {
		return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
	}
}
