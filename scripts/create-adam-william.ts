import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Creating Adam (parent) and William (child)...')

  // Create Adam (parent)
  const adamPassword = await bcrypt.hash('adam123', 10)
  const adam = await prisma.user.upsert({
    where: { name: 'Adam' },
    update: {},
    create: {
      name: 'Adam',
      password: adamPassword,
      avatar: '👨',
      color: 'from-blue-500 to-cyan-500',
      role: 'PARENT'
    }
  })
  console.log('✓ Created Adam (parent):', adam.id)

  // Create William (child) linked to Adam
  const williamPassword = await bcrypt.hash('william123', 10)
  const william = await prisma.user.upsert({
    where: { name: 'William' },
    update: {},
    create: {
      name: 'William',
      password: williamPassword,
      avatar: '👦',
      color: 'from-green-500 to-emerald-500',
      role: 'CHILD',
      parentId: adam.id
    }
  })
  console.log('✓ Created William (child):', william.id)

  console.log('\n✅ All accounts created successfully!')
  console.log('\n📋 Login Credentials:')
  console.log('Parent: Adam / adam123')
  console.log('Child: William / william123')
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
