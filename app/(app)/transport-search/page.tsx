'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { TransportSearchForm } from '@/features/transport-search/components/TransportSearchForm'
import { TransportSearchWorkbench } from '@/features/transport-search/components/TransportSearchWorkbench'
import { useTransportSearch } from '@/features/transport-search/hooks/use-transport-search'
import { getSearchParamsFromUrl } from '@/features/transport-search/lib/get-search-params-from-url'
import { setSearchParamsToUrl } from '@/features/transport-search/lib/set-search-params-to-url'

const DEFAULT_SEARCH = {
	from: 'Berlin',
	to: 'Paris',
	date: '2026-05-10',
	passengers: 1,
}

const TransportSearchPage = () => {
	const browserSearchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()

	const initialParams = {
		...DEFAULT_SEARCH,
		...getSearchParamsFromUrl(browserSearchParams),
	}

	const [draftSearch, setDraftSearch] = useState(initialParams)
	const [submittedSearch, setSubmittedSearch] = useState(initialParams)

	const handleSearchFieldChange = (field: 'from' | 'to' | 'date' | 'passengers', value: string) => {
		setDraftSearch((prev) => ({
			...prev,
			[field]: value,
		}))
	}
	const { from, to, date, passengers } = draftSearch

	const handleSearchSubmit = () => {
		setSubmittedSearch({ ...draftSearch })

		const nextUrl = setSearchParamsToUrl({
			params: draftSearch,
			searchParams: browserSearchParams,
			pathname,
		})
		router.replace(nextUrl, { scroll: false })
	}

	const { data, isLoading, isError } = useTransportSearch(submittedSearch)

	return (
		<div className="TransportSearchPage flex h-screen flex-col gap-6 px-6 py-8">
			<div className="TransportSearchPage__Content flex flex-1 flex-col gap-6">
				<h1 className="TransportSearchPage__Title text-2xl font-semibold tracking-tight">
					Transport Search
				</h1>
				<div className="TransportSearchPage__Panel shrink-0 rounded-xl border border-border bg-card p-4 shadow-sm">
					<TransportSearchForm
						value={{
							from,
							to,
							date,
							passengers,
						}}
						onChange={handleSearchFieldChange}
						onSubmit={handleSearchSubmit}
					/>
				</div>

				<div className="TransportSearchPage__Workbench flex overflow-hidden">
					<TransportSearchWorkbench
						results={data?.results ?? []}
						isLoading={isLoading}
						isError={isError}
					/>
				</div>
			</div>
		</div>
	)
}

export default TransportSearchPage
