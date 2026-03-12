import { Home, Plus, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'

const items = [
	{
		title: 'Feed',
		url: '/embed/feed',
		icon: Home,
	},
	{
		title: 'Profile',
		url: '/profile/1',
		icon: User,
	},
]

export default function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader className="p-4">
				<Link
					href="/embed/feed"
					className="font-bold text-xl text-foreground flex items-center justify-center sm:justify-start"
				>
					<Image src="/logos/petstok-logo.png" alt="Petstok Logo" width={40} height={40} />
					<span className="sm:hidden font-extrabold text-2xl">P</span>
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
		</Sidebar>
	)
}
