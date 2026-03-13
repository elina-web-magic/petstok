import { v2 as cloudinary } from 'cloudinary'
import { getPrisma } from '@/lib/prisma'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
})

type ImportCloudinaryVideosByTagParams = {
	tag: string
	petId: number
}

export const importCloudinaryVideosByTag = async ({
	tag,
	petId,
}: ImportCloudinaryVideosByTagParams) => {
	const prisma = getPrisma()

	const result = await cloudinary.api.resources_by_tag(tag, {
		resource_type: 'video',
		max_results: 500,
	})

	const resources = (result.resources as Record<string, unknown>[]) ?? []

	if (resources.length === 0)
		return {
			imported: 0,
		}

	const existingPosts = await prisma.post.findMany({
		where: { petId },
		select: { videoUrl: true },
	})

	const existingVideoUrls = new Set(existingPosts.map((post) => post.videoUrl))

	const postsToCreate = resources
		.filter((resource) => {
			return typeof resource.secure_url === 'string' && !existingVideoUrls.has(resource.secure_url)
		})
		.map((resource, index) => ({
			title:
				typeof resource.display_name === 'string' && resource.display_name.trim().length > 0
					? resource.display_name
					: `Imported video ${index + 1}`,
			videoUrl: resource.secure_url as string,
			views: 0,
			petId,
		}))

	if (postsToCreate.length === 0)
		return {
			imported: 0,
		}

	await prisma.post.createMany({
		data: postsToCreate,
	})

	return {
		imported: postsToCreate.length,
	}
}
