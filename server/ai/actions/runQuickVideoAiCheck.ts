import type { Logger } from '@/lib/logger/logger'
import { runQuickVideoAiGuard } from '@/server/ai/guards/quickVideoAiGuard'
import {
	type QuickVideoAiInput,
	type QuickVideoAiResult,
	runQuickVideoAiProvider,
} from '@/server/ai/providers/quickVideoAiProvider'

export type RunQuickVideoAiCheckResult =
	| { ok: true; result: QuickVideoAiResult }
	| { ok: false; error: string }

export const runQuickVideoAiCheck = async (
	input: QuickVideoAiInput,
	log: Logger
): Promise<RunQuickVideoAiCheckResult> => {
	const guardResult = runQuickVideoAiGuard(input)

	if (!guardResult.ok) {
		log.warn('Quick AI guard rejected input', { reason: guardResult.reason })

		return {
			ok: false,
			error: guardResult.reason,
		}
	}

	const result = await runQuickVideoAiProvider(input, log)

	return {
		ok: true,
		result,
	}
}
