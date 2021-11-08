import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {

  await prisma.taskType.createMany({
    data: [
      {
        name: "task_type1",
      },
      {
        name: "task_type2",
      }
    ],
    skipDuplicates: true,
  })

  await prisma.pathType.createMany({
    data: [
      {
        name: "path_type1",
      },
      {
        name: "path_type2",
      }
    ],
    skipDuplicates: true,
  })

  const task_types = await prisma.taskType.findMany()
  const path_types = await prisma.pathType.findMany()

  const flow1 = await prisma.flow.upsert({
    where: {id: 1},
    update: {},
    create: {
      name: "flow1",
    },
  })

  await prisma.actor.createMany({
    data: [
      {
        name: "actor1",
        flowId: flow1.id
      },
      {
        name: "actor2",
        flowId: flow1.id
      }
    ],
    skipDuplicates: true,
  })

  const actors = await prisma.actor.findMany()

  await prisma.task.createMany({
    data: [
      {
        flowId: flow1.id,
        name: "task1",
        typeId: task_types[0].id,
        actorId: actors[0].id,
      },
      {
        flowId: flow1.id,
        name: "task2",
        typeId: task_types[1].id,
        actorId: actors[1].id,
      },
      {
        flowId: flow1.id,
        name: "task3",
        typeId: task_types[1].id,
        actorId: actors[1].id,
      }
    ],
    skipDuplicates: true,
  })

  const tasks = await prisma.task.findMany()


  await prisma.path.createMany({
    data: [
      {
        flowId: flow1.id,
        pathTypeId: path_types[0].id,
        fromTaskId: tasks[0].id,
        toTaskId: tasks[1].id,
      },
      {
        flowId: flow1.id,
        pathTypeId: path_types[1].id,
        fromTaskId: tasks[1].id,
        toTaskId: tasks[2].id,
      }
    ],
    skipDuplicates: true,
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
