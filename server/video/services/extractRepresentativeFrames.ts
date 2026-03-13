import { QUICK_AI_FRAME_TIMESTAMPS } from '../constants'

export type VideoFrames = {
	url: string
	timestamp: number
}

export const extractRepresentativeFrames = (videoUrl: string): VideoFrames[] => {
	const cleanUrl = videoUrl.trim()

	if (!cleanUrl) return []
	if (!cleanUrl.endsWith('.mp4') && !cleanUrl.endsWith('.mov')) return []
	const base = cleanUrl.replace('.mp4', '.jpg').replace('.mov', '.jpg')

	return QUICK_AI_FRAME_TIMESTAMPS.map((frame) => ({
		timestamp: frame,
		url: base.replace('/video/upload/', `/video/upload/so_${frame}/`),
	}))
}
