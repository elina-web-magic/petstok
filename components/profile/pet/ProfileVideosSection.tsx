import { ProfileVideosGrid } from './ProfileVideosGrid'
import { ProfileVideosStateMessage } from './ProfileVideosStateMessage'
import { ProfileVideosGridSkeleton } from './skeleton/ProfileVideosGridSkeleton'

import type { ProfileVideoItem } from './types'

type ProfileVideosSectionProps = {
	items: ProfileVideoItem[]
	isLoading: boolean
	isError: boolean
}

export const ProfileVideosSection = (props: ProfileVideosSectionProps) => {
	const { items, isLoading, isError } = props

	if (isLoading) {
		return <ProfileVideosGridSkeleton />
	} else if (isError) {
		return (
			<ProfileVideosStateMessage
				size="default"
				textColor="destructive"
				message="Unable to load videos."
			/>
		)
	} else if (items.length === 0)
		return (
			<ProfileVideosStateMessage
				size="default"
				textColor="muted-foreground"
				message="No videos uploaded yet."
			/>
		)

	return <ProfileVideosGrid items={items} />
}
