import type { QuickVideoAiResult } from '@/server/ai/types'
import { fallback } from './constants'
import { isQuickVideoAiResult } from './isQuickVideoAiResult'

export const mapQuickVideoAiResult = (value: unknown): QuickVideoAiResult =>
	isQuickVideoAiResult(value) ? value : fallback
