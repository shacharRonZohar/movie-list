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
