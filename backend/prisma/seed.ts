import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = {
  taskTypes: [
    {
      id: 1,
      name: 'task_type1',
    },
    {
      id: 2,
      name: 'task_type2',
    },
  ],
  pathTypes: [
    {
      id: 1,
      name: 'task_type1',
    },
    {
      id: 2,
      name: 'task_type2',
    },
  ],
  flows: [
    {
      id: 1,
      name: 'flow1',
    },
  ],
  actors: [
    {
      name: 'actor1',
      flowId: 1,
    },
    {
      name: 'actor2',
      flowId: 1,
    },
  ],
  tasks: [
    {
      flowId: 1,
      name: 'task1',
      typeId: 1,
      actorId: 1,
    },
    {
      flowId: 1,
      name: 'task2',
      typeId: 1,
      actorId: 1,
    },
    {
      flowId: 1,
      name: 'task3',
      typeId: 2,
      actorId: 2,
    },
  ],
  paths: [
    {
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 1,
      toTaskId: 2,
    },
    {
      flowId: 1,
      pathTypeId: 2,
      fromTaskId: 2,
      toTaskId: 3,
    },
  ],
};

async function main() {
  await prisma.taskType.createMany({
    data: seedData['taskTypes'],
    skipDuplicates: true,
  });

  await prisma.pathType.createMany({
    data: seedData['pathTypes'],
    skipDuplicates: true,
  });

  await prisma.flow.createMany({
    data: seedData['flows'],
    skipDuplicates: true,
  });

  await prisma.actor.createMany({
    data: seedData['actors'],
    skipDuplicates: true,
  });

  await prisma.task.createMany({
    data: seedData['tasks'],
    skipDuplicates: true,
  });

  await prisma.path.createMany({
    data: seedData['paths'],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
