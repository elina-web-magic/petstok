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

export type ProfilePostItem = {
	id: number
	title: string | null
	thumbnailUrl: string | null
	views: number
	postUrl: string
	videoUrl: string
	description?: string | null
	tags?: string[]
}
