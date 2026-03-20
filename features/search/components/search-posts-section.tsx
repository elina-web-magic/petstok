import { Button } from '@/components/ui/button'
import { Preview } from '@/components/video/Preview'
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

	if (viewState === 'loading')
		return (
			<div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
				Loading...
			</div>
		)

	if (viewState === 'error')
		return (
			<div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
				<p className="text-sm text-destructive font-medium">Something went wrong</p>
				<p className="text-xs text-muted-foreground">Please try again later</p>
			</div>
		)

	if (viewState === 'empty')
		return (
			<div className="flex flex-col items-center justify-center py-10 gap-2 text-center">
				<p className="text-sm font-medium">No results found</p>
				<p className="text-xs text-muted-foreground">Try a different search query</p>
			</div>
		)

	return (
		<section>
			<ul>
				{data?.items.map((item) => (
					<li key={item.id}>
						<article>
							<h3>{item.title}</h3>
							<p>{item.petId}</p>
							<Preview
								className="overflow-hidden rounded-lg h-full flex content-center items-center justify-center bg-[var(--ps-muted)]"
								videoUrl={item.videoUrl}
								muted
								controls
								preload="metadata"
								playsInline
							/>
							<Button variant="default" type="button">
								Open post
							</Button>
						</article>
					</li>
				))}
			</ul>
		</section>
	)
}
