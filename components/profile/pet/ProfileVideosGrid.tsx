import { ProfileGridItem } from './ProfileGridItem'
import type { ProfileVideosGridProps } from './types'

export const ProfileVideosGrid = ({ items }: ProfileVideosGridProps) => {
	return (
		<div className="ProfileVideosGrid grid grid-cols-3 gap-3">
			{items.map((item) => (
				<ProfileGridItem
					key={item.id}
					id={item.id}
					title={item.title}
					thumbnailUrl={item.thumbnailUrl}
					views={item.views}
					postUrl={item.postUrl}
				/>
			))}
		</div>
	)
}
