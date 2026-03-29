'use client'

import { useState } from 'react'
import { TransportSearchForm } from '@/features/transport-search/components/TransportSearchForm'
import { TransportSearchWorkbench } from '@/features/transport-search/components/TransportSearchWorkbench'
import { useTransportSearch } from '@/features/transport-search/hooks/use-transport-search'

const TransportSearchPage = () => {
	const [draftSearch, setDraftSearch] = useState({
		query: '',
		from: 'Berlin',
		to: 'Paris',
		date: '2026-05-10',
		passengers: 1,
	})

	const [submittedSearch, setSubmittedSearch] = useState({
		from: '',
		to: '',
		date: '',
		passengers: 0,
	})

	const transportSearch = useTransportSearch(submittedSearch)

	const handleSearchFieldChange = (field: 'from' | 'to' | 'date', value: string) => {
		setDraftSearch((prev) => ({
			...prev,
			[field]: value,
		}))
	}

	const handleSearchSubmit = () => {
		setSubmittedSearch({
			from: draftSearch.from,
			to: draftSearch.to,
			date: draftSearch.date,
			passengers: draftSearch.passengers,
		})
	}

	return (
		<div className="TransportSearchPage flex h-screen flex-col gap-6 px-6 py-8">
			<div className="TransportSearchPage__Content flex flex-1 flex-col gap-6">
				<h1 className="TransportSearchPage__Title text-2xl font-semibold tracking-tight">
					Transport Search
				</h1>
				<div className="TransportSearchPage__Panel shrink-0 rounded-xl border border-border bg-card p-4 shadow-sm">
					<TransportSearchForm
						value={{
							from: draftSearch.from,
							to: draftSearch.to,
							date: draftSearch.date,
						}}
						onChange={handleSearchFieldChange}
						onSubmit={handleSearchSubmit}
					/>
				</div>

				<div className="TransportSearchPage__Workbench flex overflow-hidden">
					<TransportSearchWorkbench
						results={transportSearch.data?.results ?? []}
						isLoading={transportSearch.isLoading}
						isError={transportSearch.isError}
					/>
				</div>
			</div>
		</div>
	)
}

export default TransportSearchPage
