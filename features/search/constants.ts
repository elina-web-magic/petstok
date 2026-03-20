import type { SearchFilters } from './types'

export const SEARCH_QUERY_KEYS = {
	all: ['search'] as const,
	list: (filters: SearchFilters) => ['search', filters] as const,
} as const
