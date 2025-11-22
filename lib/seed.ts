import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create parent first
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

  // Create children linked to parent
  const santi = await prisma.user.upsert({
    where: { name: 'Santi' },
    update: {
      parentId: parent.id,
    },
    create: {
      name: 'Santi',
      password: await bcrypt.hash('santi123', 10),
      color: '#9333EA',
      avatar: '🚀',
      role: 'PLAYER',
      parentId: parent.id,
    },
  })

  const william = await prisma.user.upsert({
    where: { name: 'William' },
    update: {
      parentId: parent.id,
    },
    create: {
      name: 'William',
      password: await bcrypt.hash('william123', 10),
      color: '#3B82F6',
      avatar: '⚡',
      role: 'PLAYER',
      parentId: parent.id,
    },
  })

  // Create admin user (global oversight)
  const admin = await prisma.user.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@brainbattle.com',
      password: await bcrypt.hash('admin123', 10),
      color: '#7C3AED',
      avatar: '🧠',
      role: 'ADMIN',
    },
  })

  console.log({ parent, santi, william, admin })

  // Summary
  console.log('\n✅ Seed complete!')
  console.log('Created users:')
  console.log('  - Santi / santi123 (player)')
  console.log('  - William / william123 (player)')
  console.log('  - Parent / parent123 (parent)')
  console.log('  - Admin / admin123 (admin)')
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
