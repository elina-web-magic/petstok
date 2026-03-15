'use client'

import { useRef, useState } from 'react'
import { ProfileGridItem } from './ProfileGridItem'
import type { ProfileVideoItem } from './types'

type ProfileVideoGridButtonProps = {
	item: ProfileVideoItem
	onClick: () => void
}

export const ProfileVideoGridButton = (props: ProfileVideoGridButtonProps) => {
	const { item, onClick } = props

	const [isHovered, setIsHovered] = useState(false)

	const buttonRef = useRef<HTMLButtonElement>(null)
	const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const startPlaybackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const handleMouseEnter = () => {
		if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
		if (startPlaybackTimeoutRef.current) clearTimeout(startPlaybackTimeoutRef.current)

		setIsHovered(true)

		startPlaybackTimeoutRef.current = setTimeout(() => {
			const video = buttonRef.current?.querySelector('video')
			if (!video) return

			video.currentTime = 0
			const playPromise = video.play()

			if (playPromise) {
				void playPromise.catch(() => setIsHovered(false))
			}

			hoverTimeoutRef.current = setTimeout(() => {
				video.pause()
				video.currentTime = 0
				setIsHovered(false)
			}, 10000)
		}, 200)
	}

	const handleMouseLeave = () => {
		if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
		if (startPlaybackTimeoutRef.current) clearTimeout(startPlaybackTimeoutRef.current)

		const video = buttonRef.current?.querySelector('video')
		if (video) {
			video.pause()
			video.currentTime = 0
		}
		setIsHovered(false)
	}

	return (
		<button
			ref={buttonRef}
			type="button"
			className="text-left ProfileVideosGrid_Button"
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<ProfileGridItem
				id={item.id}
				title={item.title}
				thumbnailUrl={item.thumbnailUrl}
				views={item.views}
				postUrl={item.postUrl}
				videoUrl={item.videoUrl}
				isHovered={isHovered}
			/>
		</button>
	)
}
