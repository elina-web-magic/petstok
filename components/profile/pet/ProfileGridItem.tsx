'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Preview } from '@/components/video/Preview'

type ProfileGridItemProps = {
	id: number
	title: string
	thumbnailUrl: string
	views: number
	videoUrl: string
	isHovered: boolean
	postUrl: string
}

export const ProfileGridItem = (props: ProfileGridItemProps) => {
	const { title, thumbnailUrl, views, videoUrl, isHovered, postUrl } = props
	const [isVideoReady, setIsVideoReady] = useState(false)
	const videoWrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const video = videoWrapperRef.current?.querySelector('video')
		if (!video) return

		const handleLoadedData = () => setIsVideoReady(true)
		video.addEventListener('loadeddata', handleLoadedData)
		return () => video.removeEventListener('loadeddata', handleLoadedData)
	}, [])

	return (
		<div className="ProfileGridItem flex flex-col gap-2 text-left" data-posturl={postUrl}>
			<AspectRatio
				className="ProfileGridItem_ImageWrapper w-full overflow-hidden rounded-md bg-muted"
				ratio={9 / 16}
			>
				<div
					ref={videoWrapperRef}
					className="relative h-full w-full overflow-hidden rounded-md bg-muted"
				>
					<div
						className={`absolute inset-0 transition-opacity duration-300 ${
							isHovered && isVideoReady ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<Preview
							className="overflow-hidden rounded-lg h-full flex content-center items-center justify-center bg-[var(--ps-muted)]"
							videoUrl={videoUrl}
							muted
							controls={false}
							preload="metadata"
							playsInline
						/>
					</div>

					<div
						className={`absolute inset-0 transition-opacity duration-300 ${
							isHovered && isVideoReady ? 'opacity-0' : 'opacity-100'
						}`}
					>
						{thumbnailUrl !== '' ? (
							<Image
								src={thumbnailUrl}
								alt={title}
								fill
								sizes="(max-width: 550px) 50vw, 275px"
								className="object-cover"
								loading="eager"
							/>
						) : (
							<div className="flex h-full items-center justify-center text-sm text-muted-foreground">
								Sorry, cannot get thumbnailUrl
							</div>
						)}
					</div>
				</div>
			</AspectRatio>

			<div className="flex flex-col">
				<p className="line-clamp-2 text-sm font-medium">{title}</p>
				<p className="text-xs text-muted-foreground">{views} views</p>
			</div>
		</div>
	)
}
