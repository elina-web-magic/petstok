import type { Logger } from '@/lib/logger/logger'
import type { QuickVideoAiInput, QuickVideoAiResult } from '../types'

export const runQuickVideoAiProvider = async (
	input: QuickVideoAiInput,
	log: Logger
): Promise<QuickVideoAiResult> => {
	const normalizedUrl = input.videoUrl.trim().toLowerCase()

	log.info('Running quick AI provider', { normalizedUrl })

	if (normalizedUrl.includes('cat')) {
		log.info('AI classification result', { animal: 'cat' })

		return {
			aiTags: ['#cat'],
			animal: 'cat',
			isBlind: true,
			confidence: { animal: 0.85, blind: 0.95 },
			rationale: 'Mock response for cat video',
		}
	}

	if (normalizedUrl.includes('dog')) {
		log.info('AI classification result', { animal: 'dog' })

		return {
			aiTags: ['#dog'],
			animal: 'dog',
			isBlind: false,
			confidence: { animal: 0.88, blind: 0.1 },
			rationale: 'Mock response for dog video',
		}
	}

	log.warn('AI returned low confidence')

	return {
		aiTags: ['#pet'],
		animal: 'unknown',
		isBlind: false,
		confidence: { animal: 0.4, blind: 0.1 },
		rationale: 'Mock fallback response',
	}
}
