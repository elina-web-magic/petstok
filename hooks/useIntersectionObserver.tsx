'use client'

import { type RefObject, useEffect } from 'react'

type useIntersectionObserverProps = {
	target: RefObject<HTMLDivElement | null>
	root?: RefObject<HTMLDivElement | null>
	disabled: boolean
	callback: () => void
	rootMargin?: string
	threshold?: number | number[] | undefined
}

export const useIntersectionObserver = ({
	target,
	root,
	disabled,
	callback,
	rootMargin,
	threshold,
}: useIntersectionObserverProps) => {
	useEffect(() => {
		const { current: currentTarget } = target

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]
				if (!entry) return
				if (!entry.isIntersecting) return
				if (disabled) return

				callback()
			},
			{
				root: root?.current ?? null,
				rootMargin,
				threshold,
			}
		)
		if (currentTarget) observer.observe(currentTarget)

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget)
				observer.disconnect()
			}
		}
	}, [target, root, disabled, callback, rootMargin, threshold])
}
