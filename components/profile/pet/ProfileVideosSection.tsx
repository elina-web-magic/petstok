import { ProfileVideosGrid } from './ProfileVideosGrid'
import { ProfileVideosStateMessage } from './ProfileVideosStateMessage'
import { ProfileVideosGridSkeleton } from './skeleton/ProfileVideosGridSkeleton'

import type { ProfileVideoItem, ProfileVideosStatus } from './types'

type ProfileVideosSectionProps = {
	items: ProfileVideoItem[]
	status: ProfileVideosStatus
}

export const ProfileVideosSection = (props: ProfileVideosSectionProps) => {
	const { items, status } = props

	if (status === 'loading') {
		return <ProfileVideosGridSkeleton />
	} else if (status === 'error') {
		return (
			<ProfileVideosStateMessage
				size="default"
				textColor="destructive"
				message="Unable to load videos."
			/>
		)
	} else if (status === 'success')
		return items.length === 0 ? (
			<ProfileVideosStateMessage
				size="default"
				textColor="muted-foreground"
				message="No videos uploaded yet."
			/>
		) : (
			<ProfileVideosGrid items={items} />
		)
}
