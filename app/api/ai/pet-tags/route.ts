import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { isPetTagsRequestBody } from '@/server/utils/validation'

export const runtime = 'nodejs'

const logger = new Logger({
	scope: 'api:ai:pet-tags',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

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
			referenceCount: body.animalReferenceImageUrls.length,
		})

		const mock = {
			tags: ['#cat'],
			animal: 'cat',
			isBlind: true,
			confidence: { animal: 0.85, blind: 0.95 },
			rationale: 'Mock response',
		}

		log.info('Returning mock success')

		return Response.json(mock, { status: 200 })
	} catch (error) {
		log.error('Unhandled error in POST', undefined, error)

		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
