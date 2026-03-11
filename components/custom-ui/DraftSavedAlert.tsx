'use client'
import { cva } from 'class-variance-authority'
import { CheckCircle2Icon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

type DraftSavedAlertProps = {
	title: string
	description?: string
	variant?: 'default' | 'secondary' | 'destructive'
	size?: 'default' | 'xs' | 'sm' | 'lg'
	className?: string
}

const buttonVariants = cva('max-w-md', {
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground',
			destructive: 'bg-destructive text-white hover:bg-destructive/90 dark:bg-destructive/60',
			outline: 'border bg-background shadow-xs dark:border-input dark:bg-input/30',
			secondary: 'bg-secondary/80 text-secondary-foreground',
		},
		size: {
			default: 'px-4 py-2 has-[>svg]:px-3',
			xs: "gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: 'gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
			lg: 'rounded-md px-6 has-[>svg]:px-4',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
})

export default function DraftSavedAlert(props: DraftSavedAlertProps) {
	const { title, description, variant = 'default', size = 'sm', className } = props

	return (
		<div className="fixed top-6 left-1/2 -translate-x-1/2 z-1000">
			<Alert className={cn(buttonVariants({ variant, size, className }))}>
				<CheckCircle2Icon />
				<AlertTitle>{title}</AlertTitle>
				{description && <AlertDescription>{description}</AlertDescription>}
			</Alert>
		</div>
	)
}
