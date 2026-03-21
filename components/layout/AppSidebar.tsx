'use client'

import { Home, LineSquiggle, Plus, User, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type ChangeEvent, useState } from 'react'
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
	useSidebar,
} from '@/components/ui/sidebar'
import { SearchPostsSection } from '@/features/search/components/search-posts-section'
import { USER_ID } from '@/globalConstants'
import { Logger } from '@/lib/logger/logger'
import { ConsoleSink } from '@/lib/logger/sinks'
import { Spinner } from '../ui/spinner'
import { SearchPanel } from './ui/SearchPanel'
import { SubSidePanel } from './ui/SubSidePanel'

const logger = new Logger({
	scope: 'layout:appsidebar',
	minLevel: 'info',
	sinks: [new ConsoleSink()],
})

const items = [
	{
		title: 'Create Post',
		url: '/create',
		icon: Plus,
	},
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
	{
		title: 'Transport Search',
		url: '/transport-search',
		icon: LineSquiggle,
	},
]

export default function AppSidebar() {
	const [showDevTools, setShowDevTools] = useState(false)
	const [isDevActionLoading, setIsDevActionLoading] = useState<boolean>(false)
	const [searchQuery, setSearchQuery] = useState('')
	const { iconCollapsed, setIconCollapsed } = useSidebar()

	const isDevelopment = process.env.NODE_ENV === 'development'

	const handleOpenSearch = () => {
		setIconCollapsed(true)
	}

	const handleCloseSearch = () => {
		setIconCollapsed(false)
	}

	const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	const onSearchSubmit = () => {}

	const handleCollapseTrigger = () => {
		setIconCollapsed(false)
	}

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
		<div className="SidebarWrapper flex flex-row">
			<Sidebar className="Sidebar" collapsible="iconCollapsed">
				<SidebarHeader>
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
								<SearchPanel
									onInputClick={handleOpenSearch}
									onSearchClick={handleOpenSearch}
									collapsed={iconCollapsed}
									onCollapseTrigger={handleCollapseTrigger}
								/>
								{items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											asChild
											size="lg"
											className="w-full justify-start gap-3 py-2 px-3 hover:bg-accent hover:text-foreground text-foreground rounded-md transition-colors font-medium"
										>
											<Link href={item.url}>
												<item.icon className="w-5 h-5 shrink-0" />
												{!iconCollapsed && <span className="hidden sm:inline">{item.title}</span>}
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
			{iconCollapsed && (
				<SubSidePanel title="Search" onClose={handleCloseSearch}>
					<SearchPanel
						onSearchClick={onSearchSubmit}
						onInputChange={handleSearchInput}
						className="Search__Submit"
					/>
					<SearchPostsSection filters={{ query: searchQuery }} />
				</SubSidePanel>
			)}
		</div>
	)
}
