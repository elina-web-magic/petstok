import Image from 'next/image'
import Link from 'next/link'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { extractRepresentativeFrames } from '@/server/video/services/extractRepresentativeFrames'

type ProfileGridItemProps = {
	id: number
	title: string
	thumbnailUrl: string
	views: number
	postUrl: string
}

export const ProfileGridItem = (props: ProfileGridItemProps) => {
	const { id, title, thumbnailUrl, views, postUrl } = props

	const thumbnailUrlImg = extractRepresentativeFrames(thumbnailUrl)

	return (
		<Link href={postUrl} className="ProfileGridItem block group" id={id.toString()}>
			<div className="flex flex-col gap-2">
				<AspectRatio
					className="ProfileGridItem_ImageWrapper  w-full overflow-hidden rounded-md bg-muted"
					ratio={9 / 16}
				>
					<Image src={thumbnailUrlImg[0]?.url} alt={title} fill className="object-cover" />
				</AspectRatio>

				<div className="flex flex-col">
					<p className="text-sm font-medium line-clamp-2">{title}</p>

					<p className="text-xs text-muted-foreground">{views} views</p>
				</div>
			</div>
		</Link>
	)
}
