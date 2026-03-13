import { getProfileVideosPage } from '@/server/profile/petProfile/actions/getProfileVideosPage'
import { isPositiveNumber } from '@/server/utils/guards'

export const runtime = 'nodejs'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	const petIdParam = searchParams.get('petId')
	const cursorParam = searchParams.get('cursor')
	const limitParam = searchParams.get('limit')

	const petId = petIdParam ? Number(petIdParam) : null
	const cursor = cursorParam ? Number(cursorParam) : null
	const limit = limitParam ? Number(limitParam) : 6

	if (!isPositiveNumber(petId)) {
		return Response.json({ error: 'Invalid petId' }, { status: 400 })
	}

	if (cursor !== null && !isPositiveNumber(cursor)) {
		return Response.json({ error: 'Invalid cursor' }, { status: 400 })
	}

	if (!isPositiveNumber(limit)) {
		return Response.json({ error: 'Invalid limit' }, { status: 400 })
	}

	const videosPage = await getProfileVideosPage({ petId, cursor, limit })

	return Response.json(videosPage)
}
