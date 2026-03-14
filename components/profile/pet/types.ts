export type ProfileVideoItem = {
	id: number
	title: string
	thumbnailUrl: string
	views: number
	postUrl: string
	videoUrl: string
}

export type ProfileVideosGridProps = {
	items: ProfileVideoItem[]
}

export type ProfileVideosStatus = 'pending' | 'error' | 'success'
