import type { QuickVideoAiInput } from '../providers/quickVideoAiProvider'

export type QuickVideoAiGuardResult = { ok: true } | { ok: false; reason: string }

export const runQuickVideoAiGuard = (input: QuickVideoAiInput): QuickVideoAiGuardResult => {
	const { videoUrl, animalReferenceImageUrls } = input
	const normalizedVideoUrl = videoUrl.trim().toLowerCase()

	if (!normalizedVideoUrl || normalizedVideoUrl.length === 0) {
		return { ok: false, reason: 'videoUrl is empty' }
	}

	if (!normalizedVideoUrl.startsWith('http')) {
		return { ok: false, reason: 'videoUrl must be a valid URL' }
	}

	if (animalReferenceImageUrls.length > 10) {
		return { ok: false, reason: 'Too many reference images' }
	}

	return { ok: true }
}
