'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Preview } from '@/components/video/Preview'

type ProfileGridItemProps = {
	id: number
	title: string
	thumbnailUrl: string
	views: number
	postUrl: string
	videoUrl: string
}

export const ProfileGridItem = (props: ProfileGridItemProps) => {
	const { id, title, thumbnailUrl, views, postUrl, videoUrl } = props

	const [isHovered, setIsHovered] = useState(false)
	const [isVideoReady, setIsVideoReady] = useState(false)

	const previewWrapperRef = useRef<HTMLDivElement | null>(null)
	const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const startPlaybackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleMouseEnter = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current)
			hoverTimeoutRef.current = null
		}

		if (startPlaybackTimeoutRef.current) {
			clearTimeout(startPlaybackTimeoutRef.current)
			startPlaybackTimeoutRef.current = null
		}

		setIsHovered(true)

		startPlaybackTimeoutRef.current = setTimeout(() => {
			const video = previewWrapperRef.current?.querySelector('video')

			if (!video) return

			video.currentTime = 0

			const playPromise = video.play()

			if (playPromise) {
				void playPromise.catch(() => {
					setIsHovered(false)
				})
			}

			hoverTimeoutRef.current = setTimeout(() => {
				video.pause()
				video.currentTime = 0
				setIsHovered(false)
			}, 10000)
		}, 200)
	}

	const handleMouseLeave = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current)
			hoverTimeoutRef.current = null
		}

		if (startPlaybackTimeoutRef.current) {
			clearTimeout(startPlaybackTimeoutRef.current)
			startPlaybackTimeoutRef.current = null
		}

		const video = previewWrapperRef.current?.querySelector('video')

		if (video) {
			video.pause()
			video.currentTime = 0
		}

		setIsHovered(false)
	}

	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current)
			}

			if (startPlaybackTimeoutRef.current) {
				clearTimeout(startPlaybackTimeoutRef.current)
			}
		}
	}, [])

	useEffect(() => {
		const video = previewWrapperRef.current?.querySelector('video')

		if (!video) return

		const handleLoadedData = () => {
			setIsVideoReady(true)
		}

		video.addEventListener('loadeddata', handleLoadedData)

		return () => {
			video.removeEventListener('loadeddata', handleLoadedData)
		}
	}, [])

	return (
		<Link
			id={String(id)}
			href={postUrl}
			className="ProfileVideo_GridItem group relative flex cursor-pointer flex-col gap-2"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<AspectRatio
				className="ProfileGridItem_ImageWrapper w-full overflow-hidden rounded-md bg-muted"
				ratio={9 / 16}
			>
				<div
					ref={previewWrapperRef}
					className="relative h-full w-full overflow-hidden rounded-md bg-muted"
				>
					<div
						className={`absolute inset-0 ${
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
						className={`absolute inset-0 ${
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
		</Link>
	)
}
