export const extractFrames = (videoUrl: string): string[] => {
	const cleanUrl = videoUrl.trim()

	const base = cleanUrl.replace('.mp4', '.jpg')

	if (!cleanUrl) return []

	const frame1 = base.replace('/video/upload/', '/video/upload/so_1/')
	const frame2 = base.replace('/video/upload/', '/video/upload/so_3/')
	const frame3 = base.replace('/video/upload/', '/video/upload/so_5/')

	return [frame1, frame2, frame3]
}
