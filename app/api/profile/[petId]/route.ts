import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { getProfileById } from '@/server/profile/petProfile/actions/getProfileById'
import { parseId } from '@/server/utils/guards'

export const runtime = 'nodejs'

const logger = new Logger({
	scope: 'api:profile:petId',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

export const GET = async (
	_req: Request,
	ctx: { params: Promise<{ petId: string }> }
): Promise<Response> => {
	const { petId } = await ctx.params
	const id = parseId(petId)

	const requestId = crypto.randomUUID()
	const log = logger.child({ requestId })

	log.info('GET /api/profile/[petId] called')

	if (!id) {
		log.error('Invalid get Pet Profile')
		return Response.json({ error: 'Invalid Pet Profile' }, { status: 400 })
	}

	const petProfile = await getProfileById(id)

	if (!petProfile) {
		log.error('Profile not found')

		return Response.json({ error: 'Pet Profile not found' }, { status: 404 })
	}

	return Response.json({ ok: true, petProfile }, { status: 200 })
}
