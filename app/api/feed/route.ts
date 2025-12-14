import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(): Promise<Response> {
	if (!prisma) {
		return NextResponse.json({ error: 'Database not available' }, { status: 503 })
	}
	const posts = await prisma?.post.findMany({
		include: {
			pet: true,
		},
	})
	return NextResponse.json(posts)
}
