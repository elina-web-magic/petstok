import { processingSteps } from '@/features/ai-processing/constants'
import type { ProcessingStep } from '@/features/ai-processing/types'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const createSSEMsg = (step: ProcessingStep): string => {
	return `data: ${JSON.stringify({
		step,
		timestamp: Date.now(),
	})}\n\n`
}

export const GET = async () => {
	const encoder = new TextEncoder()

	const stream = new ReadableStream({
		start(controller) {
			const run = async () => {
				for (const step of processingSteps) {
					const msg = createSSEMsg(step)
					controller.enqueue(encoder.encode(msg))

					await wait(800)
				}

				controller.close()
			}

			run().catch(() => {
				const errorMessage = createSSEMsg('error')

				controller.enqueue(encoder.encode(errorMessage))
				controller.close()
			})
		},
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		},
	})
}
