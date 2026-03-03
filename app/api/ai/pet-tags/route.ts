import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'

export const runtime = 'nodejs'

const logger = new Logger({
	scope: 'api:ai:pet-tags',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

type PetTagsRequestBody = {
	videoUrl: string
	aliceReferenceImageUrls: string[]
}

const isPetTagsRequestBody = (value: unknown): value is PetTagsRequestBody => {
	if (typeof value !== 'object' || value === null) return false

	const obj = value as Record<string, unknown>

	if (typeof obj.videoUrl !== 'string') return false
	if (obj.videoUrl.length === 0) return false

	if (!Array.isArray(obj.aliceReferenceImageUrls)) return false

	for (const item of obj.aliceReferenceImageUrls) {
		if (typeof item !== 'string') return false
	}

	return true
}

export const POST = async (req: Request): Promise<Response> => {
	const requestId = String(Date.now())
	const log = logger.child({ requestId })

	log.info('Sent request')
	try {
		const rawBody: unknown = await req.json()

		if (!isPetTagsRequestBody(rawBody)) {
			log.warn('Invalid request body', { rawBody })

			return Response.json({ error: 'Invalid request body' }, { status: 400 })
		}

		const body = rawBody

		log.info('Body validated', {
			videoUrl: body.videoUrl,
			referenceCount: body.aliceReferenceImageUrls.length,
		})
		const mock = {
			tags: ['#cat'],
			isAlice: false,
			isBlindCat: false,
			confidence: {
				alice: 0,
				blindcat: 0,
			},
			rationale: 'Mock response',
		}

		log.info('Returning mock success')

		return Response.json(mock, { status: 200 })
	} catch (error) {
		log.error('Unhandled error in POST', undefined, error)

		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
