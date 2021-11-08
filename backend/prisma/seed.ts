import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  await prisma.flow.upsert({
    where: {id: 1},
    update: {},
    create: {
      name: "curry rice recipe",
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
