'use client'

import { Home, Plus, User, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { USER_ID } from '@/globalConstants'
import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { Spinner } from '../ui/spinner'

const logger = new Logger({
	scope: 'layout:appsidebar',
	minLevel: 'info',
	sinks: [new ConsoleSink()],
})

const items = [
	{
		title: 'Feed',
		url: '/feed',
		icon: Home,
	},
	{
		title: 'Profile',
		url: `/profile/${USER_ID}`,
		icon: User,
	},
]

export default function AppSidebar() {
	const [isDevActionLoading, setIsDevActionLoading] = useState(false)

	const isDevelopment = process.env.NODE_ENV === 'development'
	const [showDevTools, setShowDevTools] = useState(false)
	const handleDevBootstrap = async () => {
		setIsDevActionLoading(true)

		try {
			const response = await fetch('/api/dev/bootstrap-media', {
				method: 'POST',
			})

			if (!response.ok) {
				const text = await response.text()
				throw new Error(text || 'Failed to run dev bootstrap')
			}

			const data = await response.json()
			logger.info('Dev bootstrap result:', data)
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown dev bootstrap error'

			logger.error(`Dev bootstrap failed: ${errorMessage}`)
		} finally {
			setIsDevActionLoading(false)
		}
	}
	return (
		<Sidebar>
			<SidebarHeader className="p-4 flex justify-center flex-row">
				<Link
					href="/feed"
					className="font-bold text-xl text-foreground flex items-center justify-center sm:justify-start cursor-pointer"
				>
					<Image
						src="/logos/petstok-logo.png"
						alt="Petstok Logo"
						width={60}
						height={60}
						loading="eager"
					/>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className="gap-4">
							<SidebarMenuItem>
								<Button asChild className="w-full justify-start gap-3 py-2 px-3" size="lg">
									<Link href="/create">
										<Plus className="w-5 h-5 shrink-0" />
										<span className="hidden sm:inline font-semibold">Create Post</span>
									</Link>
								</Button>
							</SidebarMenuItem>

							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										asChild
										size="lg"
										className="w-full justify-start gap-3 py-2 px-3 hover:bg-accent hover:text-foreground text-foreground rounded-md transition-colors font-medium"
									>
										<Link href={item.url}>
											<item.icon className="w-5 h-5 shrink-0" />
											<span className="hidden sm:inline">{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				{isDevelopment ? (
					<div className="cursor-pointer mt-auto border-t border-border p-4 flex flex-col gap-3">
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => setShowDevTools((v) => !v)}
							className="self-end"
						>
							<Wrench className="h-4 w-4" />
						</Button>

						{showDevTools ? (
							<Button
								type="button"
								onClick={handleDevBootstrap}
								disabled={isDevActionLoading}
								className="w-full cursor-pointer justify-start gap-3 bg-indigo-600 text-white hover:bg-indigo-500"
							>
								{isDevActionLoading ? (
									<Spinner className="h-4 w-4 animate-spin" />
								) : (
									<Wrench className="h-4 w-4 shrink-0" />
								)}

								<span className="hidden sm:inline font-semibold">
									{isDevActionLoading ? 'Running dev bootstrap...' : 'DEV · Seed + Import'}
								</span>
							</Button>
						) : null}
					</div>
				) : null}
			</SidebarFooter>
		</Sidebar>
	)
}
