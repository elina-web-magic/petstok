import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

function createPrismaClient(): PrismaClient {
	if (!process.env.DATABASE_URL) {
		throw new Error('DATABASE_URL is not defined')
	}

	const pool = new Pool({ connectionString: process.env.DATABASE_URL })
	const adapter = new PrismaPg(pool)

	return new PrismaClient({
		adapter,
		log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
	})
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}
