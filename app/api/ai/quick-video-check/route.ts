import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { runQuickVideoAiCheck } from '@/server/ai/actions/runQuickVideoAiCheck'
import { isPetTagsRequestBody } from '@/server/ai/ai.validation'

export const runtime = 'nodejs'

const logger = new Logger({
	scope: 'api:ai:quick-video-check',
	minLevel: 'debug',
	sinks: [new ConsoleSink()],
})

export const POST = async (req: Request): Promise<Response> => {
	const requestId = crypto.randomUUID()
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

		const actionResult = await runQuickVideoAiCheck(body, log)

		if (!actionResult.ok) {
			log.warn('Quick AI action failed', { error: actionResult.error })

			return Response.json({ error: actionResult.error }, { status: 400 })
		}

		log.info('Returning quick AI result')

		return Response.json(actionResult.result, { status: 200 })
	} catch (error) {
		log.error('Unhandled error in POST', undefined, error)

		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
