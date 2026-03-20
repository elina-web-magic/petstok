import type { SearchFilters } from '../types'

type SearchFiltersFormProps = {
	value: SearchFilters
	onChange: (nextValue: SearchFilters) => void
	onSubmit: () => void
}

export const SearchFiltersForm = ({ value, onChange, onSubmit }: SearchFiltersFormProps) => {
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault()
				onSubmit()
			}}
		>
			{/* TODO: add query input */}
			{/* TODO: add filter controls */}
			{/* TODO: call onChange with updated filters */}
			<button type="submit">Search</button>
		</form>
	)
}
