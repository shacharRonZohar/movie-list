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

async function changePassword() {
  try {
    console.log('🔒 Change User Password 💕\n')

    const username = await question('Username: ')
    const newPassword = await question('New Password: ')

    // Validate
    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      throw new Error(`User "${username}" not found`)
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10)

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    })

    console.log('\n✨ Password updated successfully! 💕')
    console.log(`\nUser: ${user.username} (${user.displayName})`)
    console.log('You can now log in with the new password! ❤️')
  } catch (error) {
    console.error('\n❌ Error:', error)
    process.exit(1)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

changePassword()
