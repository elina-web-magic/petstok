'use client'

import { ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type TransportSearchFormValue = {
	from: string
	to: string
	date: string
}

type TransportSearchFormProps = {
	value: TransportSearchFormValue
	onChange: (field: keyof TransportSearchFormValue, value: string) => void
	onSubmit: () => void
}

export const TransportSearchForm = (props: TransportSearchFormProps) => {
	const { value, onChange, onSubmit } = props

	const handleSwap = () => {
		onChange('from', value.to)
		onChange('to', value.from)
	}

	return (
		<div className="TransportSearchForm flex flex-col gap-3">
			<div className="TransportSearchForm__RouteLabel text-xs text-muted-foreground">From — To</div>

			<div className="TransportSearchForm__Row grid items-center gap-2 md:grid-cols-[1fr_auto_1fr_220px_auto]">
				<Input
					className="TransportSearchForm__From"
					placeholder="From"
					value={value.from}
					onChange={(event) => onChange('from', event.target.value)}
				/>

				<Button
					type="button"
					variant="outline"
					size="icon"
					className="TransportSearchForm__Swap"
					onClick={handleSwap}
				>
					<ArrowLeftRight className="h-4 w-4" />
				</Button>

				<Input
					className="TransportSearchForm__To"
					placeholder="To"
					value={value.to}
					onChange={(event) => onChange('to', event.target.value)}
				/>

				<Input
					className="TransportSearchForm__Date"
					type="date"
					value={value.date}
					onChange={(event) => onChange('date', event.target.value)}
				/>

				<Button type="button" className="TransportSearchForm__Submit" onClick={onSubmit}>
					Search
				</Button>
			</div>
		</div>
	)
}
