import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.article.create({
    data: {
      title: 'title',
      date: new Date('2022/07/15 11:00:00'),
      createdAt: new Date('2022/07/15 11:00:00'),
      createdBy: 'ore',
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
