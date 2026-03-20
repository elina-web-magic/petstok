import { useQuery } from '@tanstack/react-query'
import { SEARCH_QUERY_KEYS } from '../constants'
import { searchPosts } from '../services/search.service'
import type { SearchFilters } from '../types'

export const useSearchPosts = (filters: SearchFilters) => {
	return useQuery({
		queryKey: SEARCH_QUERY_KEYS.list(filters),
		queryFn: ({ signal }) => searchPosts(filters, signal),
		enabled: Boolean(filters.query),
	})
}
