import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(prompt, resolve)
  })
}

async function createUser() {
  try {
    console.log('💕 Create a new user for Our Movie Collection ✨\n')

    const username = await question('Username: ')
    const password = await question('Password: ')
    const displayName = await question('Display Name: ')

    // Validate
    if (!username || username.length < 3) {
      throw new Error('Username must be at least 3 characters')
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }
    if (!displayName) {
      throw new Error('Display name is required')
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    })

    if (existingUser) {
      throw new Error(`User "${username}" already exists`)
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        passwordHash,
        displayName,
      },
    })

    console.log('\n✨ User created successfully! 💕')
    console.log(`\nID: ${user.id}`)
    console.log(`Username: ${user.username}`)
    console.log(`Display Name: ${user.displayName}`)
    console.log(`\nYou can now log in with these credentials! ❤️`)
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

createUser()
