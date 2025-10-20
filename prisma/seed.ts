import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create sample users
  const password = await bcrypt.hash('password123', 10)

  const user1 = await prisma.user.upsert({
    where: { username: 'alice' },
    update: {},
    create: {
      username: 'alice',
      passwordHash: password,
      displayName: 'Alice',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { username: 'bob' },
    update: {},
    create: {
      username: 'bob',
      passwordHash: password,
      displayName: 'Bob',
    },
  })

  console.log(`Created users: ${user1.username}, ${user2.username}`)

  // Create sample content
  const content = await prisma.content.createMany({
    data: [
      {
        title: 'The Notebook',
        status: 'WATCHED',
        createdById: user1.id,
        requestedById: user2.id,
        order: 1,
      },
      {
        title: 'La La Land',
        status: 'WATCHING',
        createdById: user1.id,
        requestedById: user1.id,
        order: 2,
      },
      {
        title: 'Your Name (Kimi no Na wa)',
        status: 'WANT_TO_WATCH',
        createdById: user2.id,
        requestedById: user2.id,
        order: 3,
      },
      {
        title: 'Pride and Prejudice (2005)',
        status: 'WATCHED',
        createdById: user1.id,
        requestedById: user1.id,
        order: 4,
      },
      {
        title: 'Eternal Sunshine of the Spotless Mind',
        status: 'WANT_TO_WATCH',
        createdById: user2.id,
        requestedById: user1.id,
        order: 5,
      },
      {
        title: 'About Time',
        status: 'WANT_TO_WATCH',
        createdById: user1.id,
        requestedById: user2.id,
        order: 6,
      },
      {
        title: 'Before Sunrise',
        status: 'WATCHED',
        createdById: user2.id,
        requestedById: user2.id,
        order: 7,
      },
      {
        title: 'Spirited Away',
        status: 'WATCHING',
        createdById: user1.id,
        requestedById: user1.id,
        order: 8,
      },
      {
        title: 'The Grand Budapest Hotel',
        status: 'ON_HOLD',
        createdById: user2.id,
        requestedById: user1.id,
        order: 9,
      },
      {
        title: 'Amélie',
        status: 'WANT_TO_WATCH',
        createdById: user1.id,
        requestedById: user2.id,
        order: 10,
      },
    ],
    skipDuplicates: true,
  })

  console.log(`Created ${content.count} content items`)

  console.log('Database seed completed successfully!')
  console.log('\nTest credentials:')
  console.log('Username: alice or bob')
  console.log('Password: password123')
}

main()
  .catch(e => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
