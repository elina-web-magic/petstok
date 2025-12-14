import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(): Promise<Response> {
	const posts = await prisma.post.findMany({
		include: {
			pet: true,
		},
	})
	return NextResponse.json(posts)
}
