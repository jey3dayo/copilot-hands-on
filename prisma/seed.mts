import { PrismaClient } from '@prisma/client';
import { parse } from 'date-fns';

const prisma = new PrismaClient()

async function main() {
  await prisma.article.create({
    data: {
      seedId: 1,
      no: '第1話',
      title: 'title',
      date: parse('2022/07/15', 'yyyy/MM/dd', new Date()),
      createdAt: new Date('2022/07/15 11:00:00'),
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
