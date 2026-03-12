export type ProfileVideoItem = {
	id: number
	title: string
	thumbnailUrl: string
	views: number
	postUrl: string
}

export type ProfileVideosGridProps = {
	items: ProfileVideoItem[]
}
