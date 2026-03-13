import type { globalSize } from '@/app/global.types'

type ProfileVideosStateMessage = {
	message: string
	textColor: 'destructive' | 'muted-foreground' | string
	size: globalSize
}

export const ProfileVideosStateMessage = (props: ProfileVideosStateMessage) => {
	const { message, textColor, size = 'default' } = props

	return (
		<p
			className={`ProfileVideosStateMessage text-${textColor} text-${size === 'default' ? 'sm' : size}`}
		>
			{message}
		</p>
	)
}
