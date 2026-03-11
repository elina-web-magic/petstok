import { Button } from '../ui/button'

interface InsertSuggestionButtonProps {
	handleInsertSuggestion: () => void
	text: string
}

export default function InsertSuggestionButton(props: InsertSuggestionButtonProps) {
	const { handleInsertSuggestion, text } = props

	return (
		<Button
			type="button"
			variant="outline"
			size="sm"
			className="InsertSuggestionButton text-secondary hover:bg-secondary hover:text-secondary-foreground border-secondary relative"
			onClick={handleInsertSuggestion}
		>
			<span className="InsertSuggestionButton_Text">{text}</span>
			<span className="InsertSuggestionButton_Ping absolute -top-1 -right-1">
				<span className="relative flex size-3">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
					<span className="relative inline-flex size-3 rounded-full bg-secondary"></span>
				</span>
			</span>
		</Button>
	)
}
