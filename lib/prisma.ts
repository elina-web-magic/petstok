import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma-client'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient | null }

function createPrismaClient(): PrismaClient | null {
	if (!process.env.DATABASE_URL) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.warn('DATABASE_URL is not defined, skipping Prisma client creation')
		return null
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL })
	const adapter = new PrismaPg(pool)

	return new PrismaClient({
		adapter,
		log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
	})
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production' && prisma) {
	globalForPrisma.prisma = prisma
}
