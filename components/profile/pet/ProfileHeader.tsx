import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import type { PetProfileDetails } from '@/server/profile/types'

type PetProfileHeaderProps = {
	profile: PetProfileDetails
}

const getPetInitials = (name: string): string => {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.join('')
}

const PetProfileHeader = ({ profile }: PetProfileHeaderProps) => {
	const initials = getPetInitials(profile.name)

	return (
		<Card className="w-full border-border/60 shadow-sm ProfileHeader">
			<CardContent className="flex flex-col gap-4 p-4 sm:p-5">
				<div className="flex items-start gap-4">
					<Avatar className="h-16 w-16 shrink-0 sm:h-20 sm:w-20">
						<AvatarFallback className="text-base font-semibold">{initials}</AvatarFallback>
					</Avatar>

					<div className="min-w-0 flex-1">
						<div className="flex flex-col gap-1">
							<h1 className="truncate text-xl font-semibold tracking-tight">{profile.name}</h1>

							<p className="text-sm text-muted-foreground">{profile.species}</p>

							<p className="text-sm text-muted-foreground">
								{profile.ownerName ? `Owner: ${profile.ownerName}` : 'Owner: Unknown'}
							</p>
						</div>
					</div>
				</div>

				<div>
					<p className="text-sm leading-6 text-foreground">{profile.bio ?? 'No bio yet.'}</p>
				</div>

				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span className="font-medium text-foreground">{profile.postsCount}</span>
					<span>{profile.postsCount === 1 ? 'post' : 'posts'}</span>
				</div>
			</CardContent>
		</Card>
	)
}

export default PetProfileHeader
