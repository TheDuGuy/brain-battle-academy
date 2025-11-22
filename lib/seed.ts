import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const santi = await prisma.user.upsert({
    where: { name: 'Santi' },
    update: {},
    create: {
      name: 'Santi',
      password: await bcrypt.hash('santi123', 10),
      color: '#9333EA',
      avatar: '🚀',
      role: 'PLAYER',
    },
  })

  const william = await prisma.user.upsert({
    where: { name: 'William' },
    update: {},
    create: {
      name: 'William',
      password: await bcrypt.hash('william123', 10),
      color: '#3B82F6',
      avatar: '⚡',
      role: 'PLAYER',
    },
  })

  // Optional parent user for future use
  const parent = await prisma.user.upsert({
    where: { name: 'Parent' },
    update: {},
    create: {
      name: 'Parent',
      email: 'parent@brainbattle.com',
      password: await bcrypt.hash('parent123', 10),
      color: '#10B981',
      avatar: '👨‍👩‍👧‍👦',
      role: 'PARENT',
    },
  })

  console.log({ santi, william, parent })

  // Summary
  console.log('\n✅ Seed complete!')
  console.log('Created users:')
  console.log('  - Santi / santi123')
  console.log('  - William / william123')
  console.log('  - Parent / parent123')
  console.log('\nYou can now log in with any of these accounts.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
