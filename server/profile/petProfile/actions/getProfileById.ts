import { getPrisma } from '@/lib/prisma'
import type { PetProfileDetails } from '../../types'

export const getProfileById = async (petId: number): Promise<PetProfileDetails | null> => {
	const prisma = getPrisma()

	const petProfile = await prisma.pet.findUnique({
		where: { id: petId },
		select: {
			id: true,
			name: true,
			species: true,
			bio: true,
			user: {
				select: {
					name: true,
				},
			},
			_count: {
				select: {
					posts: true,
				},
			},
		},
	})

	if (!petProfile) return null

	return {
		id: petProfile.id,
		name: petProfile.name,
		species: petProfile.species,
		bio: petProfile.bio,
		ownerName: petProfile.user.name,
		postsCount: petProfile._count.posts,
	}
}
