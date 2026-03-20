import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SubSidePanelProps {
	title: string
	onClose: () => void
	children?: ReactNode
	className?: string
}

export function SubSidePanel({ title, onClose, children, className }: SubSidePanelProps) {
	return (
		<div
			className={cn(
				'SubSidePanel border border-l border-sidebar-border bg-background p-4 h-full',
				className
			)}
		>
			<div className="flex items-center justify-between">
				<h2 className="text-sm font-semibold">{title}</h2>
				<Button type="button" variant="ghost" size="sm" onClick={onClose}>
					<X />
				</Button>
			</div>
			{children}
		</div>
	)
}
