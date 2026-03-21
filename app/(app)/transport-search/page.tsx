'use client'

import { type ChangeEvent, useState } from 'react'
import { SearchPanel } from '@/components/layout/ui/SearchPanel'
import { TransportSearchWorkbench } from '@/features/transport-search/components/TransportSearchWorkbench'

const TransportSearchPage = () => {
	const [searchQuery, setSearchQuery] = useState('')

	const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	const handleSearchSubmit = () => {
		// TODO: connect transport search submit logic
	}

	return (
		<div className="TransportSearchPage mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-6 py-8">
			<div className="TransportSearchPage__Header flex flex-col gap-2">
				<h1 className="TransportSearchPage__Title text-2xl font-semibold tracking-tight">
					Transport Search Practice
				</h1>
				<p className="TransportSearchPage__Description text-sm text-muted-foreground">
					White-label transport search sandbox for multi-provider API practice.
				</p>
			</div>

			<div className="TransportSearchPage__Panel rounded-xl border border-border bg-card p-4 shadow-sm">
				<SearchPanel
					onSearchClick={handleSearchSubmit}
					onInputChange={handleSearchInput}
					className="SearchPanel__Submit"
				/>
			</div>

			<div className="TransportSearchPage__Workbench">
				<TransportSearchWorkbench query={searchQuery} />
			</div>
		</div>
	)
}

export default TransportSearchPage
