'use client'

import { Search } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type SearchPanelProps = {
	onSearchClick: () => void
	onInputClick?: () => void
	onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
	collapsed?: boolean
	className?: string
	onCollapseTrigger?: () => void
}

export const SearchPanel = (props: SearchPanelProps) => {
	const { onSearchClick, onInputClick, onInputChange, onCollapseTrigger, collapsed, className } =
		props

	return (
		<Field className={`SearchPanel ${className}`} orientation="horizontal">
			{collapsed ? (
				<div className="SearchPanel__Input flex flex-row gap-3 py-3">
					<Button variant="ghost" onClick={onCollapseTrigger} />
				</div>
			) : (
				<div className="SearchPanel__Input flex flex-row gap-3 py-3">
					<Input
						type="search"
						placeholder="Search..."
						onFocus={onInputClick}
						onChange={onInputChange}
					/>

					<Button onClick={onSearchClick}>
						<Search />
					</Button>
				</div>
			)}
		</Field>
	)
}
