import { QUICK_AI_FRAME_TIMESTAMPS } from '../constants'

export type VideoFrame = {
	url: string
	timestamp: number
}

export const extractRepresentativeFrames = (videoUrl: string): VideoFrame[] => {
	const cleanUrl = videoUrl.trim()

	if (!cleanUrl) return []
	const base = cleanUrl.replace('.mp4', '.jpg')

	return QUICK_AI_FRAME_TIMESTAMPS.map((frame) => ({
		timestamp: frame,
		url: base.replace('/video/upload/', `/video/upload/so_${frame}/`),
	}))
}
