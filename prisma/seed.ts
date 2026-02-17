import { PrismaPg } from '@prisma/adapter-pg'
import { type Prisma, PrismaClient } from '@prisma-client'
import { Pool } from 'pg'
import 'dotenv/config'

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined')
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
	adapter,
	log: ['query', 'error'],
})

const userData: Prisma.UserCreateInput[] = [
	{
		name: 'Harry',
		email: 'harry@prisma.io',
		password: 'password1',
		pets: {
			create: [
				{
					name: 'Hedwig',
					species: 'snowy owl',
					bio: 'Hedwig is a close friend of Harry, and is a very loyal owl.',
					posts: {
						create: [
							{
								caption: 'Hedwig brings post!',
								videoUrl: 'https://petstok.com/video/1',
								likes: 1563,
								views: 1234,
							},
							{
								caption: 'Hedwig eats mouse!',
								videoUrl: 'https://petstok.com/video/2',
								likes: 5663,
								views: 1034,
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'Hermione',
		email: 'hermione@prisma.io',
		password: 'password2',
		pets: {
			create: [
				{
					name: 'Crookshanks',
					species: 'cat',
					bio: 'He was half-Kneazle, as evidenced by his lion-like appearance, ability to solve problems on his own without aid or teaching, and clear dislike of and ability at recognising untrustworthy persons (even if they were in their Animagus forms)',
					posts: {
						create: [
							{
								caption: 'Crookshanks walk with his friend Sirius',
								videoUrl: 'https://petstok.com/video/21',
								likes: 1563,
								views: 1234,
							},
							{
								caption: 'Crookshanks eats rat!',
								videoUrl: 'https://petstok.com/video/22',
								likes: 5663,
								views: 1034,
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'Ron',
		email: 'ron@prisma.io',
		password: 'password3',
		pets: {
			create: [
				{
					name: 'Scabbers',
					species: 'rat',
					bio: 'Scabbers is a rat, who was an Animagus Peter Pettigrew, who lived for 13 years with Weasley family',
					posts: {
						create: [
							{
								caption: 'Scabbers tries to escape from Hogwarts',
								videoUrl: 'https://petstok.com/video/21',
								likes: 1563,
								views: 1234,
							},
							{
								caption: 'Look, Scrabbers transform to Peter Pettigrew!',
								videoUrl: 'https://petstok.com/video/22',
								likes: 5663,
								views: 1034,
							},
						],
					},
				},
			],
		},
	},
	{
		name: 'Tom Riddle',
		email: 'tomriddle@prisma.io',
		password: 'password4',
		pets: {
			create: [
				{
					name: 'Nagini',
					species: 'snake',
					bio: 'Nagini is a snake, As a human, Nagini was the opposite of the monster that she became known as. She was very kind and caring towards Credence Barebone and did not want to see him join Gellert Grindelwald.',
				},
			],
		},
	},
	{
		name: 'Neville Longbottom',
		email: 'neville@prisma.io',
		password: 'password5',
		pets: {
			create: [
				{
					name: 'Trevor',
					species: 'toad',
					bio: 'Trevor was a gift from Neville’s Great Uncle Algie in recognition of the first time Neville showed magical ability and thus gaining admission to Hogwarts School of Witchcraft and Wizardry.',
				},
			],
		},
	},
	{
		name: 'Hagrid',
		email: 'hagrid@prisma.io',
		password: 'password6',
		pets: {
			create: [
				{
					name: 'Norberta',
					species: 'dragon',
					bio: 'Ridgeback Dragon hatched by Rubeus Hagrid in his hut at Hogwarts School of Witchcraft and Wizardry.',
					birthday: new Date('1992-04-01'),
				},
				{
					name: 'Aragog',
					species: 'spider',
					bio: 'was an Acromantula owned by Rubeus Hagrid. Like the rest of his species, Aragog had a taste for human flesh and was able to communicate with humans vocally. In his youth, he was the size of a Pekingese and near the end of his life was about the size of a small elephant with an eighteen-foot leg span',
					birthday: new Date('1942-09-18'),
				},
				{
					name: 'Fluffy',
					species: 'three-headed dog',
					bio: "A giant three-headed dog.[8] Purchased from a `Greek chappie` in a pub, Hagrid lent Fluffy to Albus Dumbledore in 1991 to help protect the Philosopher's Stone. ",
				},
				{
					name: 'Fang',
					species: 'wolfhound',
					bio: 'Like Hagrid himself, Fang the boarhound was not nearly as fierce as he looked.[1] Fang had often been described as a `coward.`',
				},
			],
		},
	},
	{
		name: 'Luna',
		email: 'luna@prisma.io',
		password: 'password6',
		pets: {
			create: [
				{
					name: 'Thestral',
					species: 'thestral',
					bio: '',
				},
			],
		},
	},
]

export async function main() {
	await prisma.pet.deleteMany()
	await prisma.user.deleteMany()

	for (const u of userData) {
		await prisma.user.create({ data: u })
	}
}

main()
	.catch(() => {
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
