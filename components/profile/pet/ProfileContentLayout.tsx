import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileVideosQuerySection } from './ProfileVideosQuerySection'

type ProfileContentLayoutProps = {
	petId: number
}

const ProfileContentLayout = ({ petId }: ProfileContentLayoutProps) => {
	return (
		<div className="flex flex-col gap-4 ProfileContentLayout">
			<Card className="w-full border-border/60 shadow-sm">
				<CardHeader>
					<CardTitle>Videos</CardTitle>
				</CardHeader>

				<CardContent>
					<ProfileVideosQuerySection petId={petId} />
				</CardContent>
			</Card>
		</div>
	)
}

export default ProfileContentLayout
