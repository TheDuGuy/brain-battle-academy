import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('santi123', 10)

  const santi = await prisma.user.upsert({
    where: { name: 'Santi' },
    update: {},
    create: {
      name: 'Santi',
      password: hashedPassword,
      color: '#9333EA',
      avatar: '🚀',
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
    },
  })

  console.log({ santi, william })
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
