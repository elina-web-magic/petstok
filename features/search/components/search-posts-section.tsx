import { useSearchPosts } from '../hooks/use-search-posts'
import type { SearchFilters } from '../types'
import { getSearchViewState } from '../ui/search-view-state'

type SearchPostsSectionProps = {
	filters: SearchFilters
}

export const SearchPostsSection = ({ filters }: SearchPostsSectionProps) => {
	const { data, isLoading, isError } = useSearchPosts(filters)

	const hasItems = Boolean(data?.items.length)
	const viewState = getSearchViewState({
		isLoading,
		isError,
		hasItems,
	})

	if (viewState === 'loading') {
		return <div>Loading...</div>
	}

	if (viewState === 'error') {
		return <div>Something went wrong</div>
	}

	if (viewState === 'empty') {
		return <div>No results found</div>
	}

	return (
		<section>
			{/* TODO: render search results list */}
			{/* TODO: connect item click handlers */}
		</section>
	)
}
