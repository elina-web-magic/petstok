import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import ProfileContentLayout from '@/components/profile/pet/ProfileContentLayout'
import PetProfileHeader from '@/components/profile/pet/ProfileHeader'
import { getProfileById } from '@/server/profile/petProfile/actions/getProfileById'
import { parseId } from '@/server/utils/guards'

type PetProfilePageProps = {
	params: Promise<{
		petId: string
	}>
}

export default async function PetProfilePage({ params }: PetProfilePageProps): Promise<ReactNode> {
	const { petId } = await params
	const id = parseId(petId)

	if (!id) notFound()

	const petProfile = await getProfileById(id)

	if (!petProfile) notFound()

	return (
		<div className="mx-auto flex w-full flex-col gap-4 px-4 py-6">
			<PetProfileHeader profile={petProfile} />
			<ProfileContentLayout />
		</div>
	)
}
