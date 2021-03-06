import {
  Actor,
  Flow,
  Path,
  PathType,
  PrismaClient,
  Task,
  TaskType,
} from '@prisma/client';

const prisma = new PrismaClient();

type seedDataOmit<T> = Omit<T, 'createdAt' | 'updatedAt'>;

type seedDataType = {
  taskTypes: seedDataOmit<TaskType>[];
  pathTypes: seedDataOmit<PathType>[];
  flows: seedDataOmit<Flow>[];
  actors: seedDataOmit<Actor>[];
  tasks: seedDataOmit<Task>[];
  paths: seedDataOmit<Path>[];
};

const seedData: seedDataType = {
  taskTypes: [
    {
      id: 1,
      name: 'トリガ',
    },
    {
      id: 2,
      name: '入出力',
    },
    {
      id: 3,
      name: 'システムへの入力',
    },
    {
      id: 4,
      name: 'システムからの出力',
    },
    {
      id: 5,
      name: 'データストア',
    },
    {
      id: 6,
      name: '処理',
    },
    {
      id: 7,
      name: '受領',
    },
  ],
  pathTypes: [
    {
      id: 1,
      name: '遷移',
    },
    {
      id: 2,
      name: '通信',
    },
  ],
  flows: [
    {
      id: 1,
      name: '標準PM業務_再契約_退去',
    },
  ],
  actors: [
    {
      id: 1,
      name: 'テナント',
      flowId: 1,
    },
    {
      id: 2,
      name: 'BM',
      flowId: 1,
    },
    {
      id: 3,
      name: 'PM/LM担当',
      flowId: 1,
    },
    {
      id: 4,
      name: 'PM/受付担当',
      flowId: 1,
    },
    {
      id: 5,
      name: 'PM/バック担当',
      flowId: 1,
    },
    {
      id: 6,
      name: 'オーナ/AM',
      flowId: 1,
    },
    {
      id: 7,
      name: '情報システム',
      flowId: 1,
    },
  ],
  tasks: [
    {
      id: 1,
      name: '月末',
      x: 50,
      y: 50,
      flowId: 1,
      typeId: 1,
      actorId: 3,
      label: null,
    },
    {
      id: 2,
      name: '契約一覧',
      x: 350,
      y: 50,
      flowId: 1,
      typeId: 3,
      actorId: 3,
      label: null,
    },
    {
      id: 3,
      name: '契約',
      x: 350,
      y: 50,
      flowId: 1,
      typeId: 5,
      actorId: 7,
      label: null,
    },
    {
      id: 4,
      name: '4ヶ月前通知作成',
      x: 650,
      y: 50,
      flowId: 1,
      typeId: 6,
      actorId: 7,
      label: null,
    },
    {
      id: 5,
      name: '6ヶ月前通知',
      x: 950,
      y: 50,
      flowId: 1,
      typeId: 4,
      actorId: 7,
      label: null,
    },
    {
      id: 6,
      name: '',
      x: 950,
      y: 50,
      flowId: 1,
      typeId: 7,
      actorId: 1,
      label: null,
    },
    {
      id: 7,
      name: '6ヶ月前通知確認',
      x: 1250,
      y: 50,
      flowId: 1,
      typeId: 3,
      actorId: 1,
      label: null,
    },
    {
      id: 8,
      name: '',
      x: 1250,
      y: 50,
      flowId: 1,
      typeId: 7,
      actorId: 7,
      label: null,
    },
    {
      id: 9,
      name: 'テナント確認更新',
      x: 1550,
      y: 50,
      flowId: 1,
      typeId: 6,
      actorId: 7,
      label: null,
    },
    {
      id: 10,
      name: '都度',
      x: 1850,
      y: 50,
      flowId: 1,
      typeId: 1,
      actorId: 3,
      label: null,
    },
    {
      id: 11,
      name: '契約',
      x: 1850,
      y: 50,
      flowId: 1,
      typeId: 5,
      actorId: 7,
      label: null,
    },
    {
      id: 12,
      name: '',
      x: 2150,
      y: 50,
      flowId: 1,
      typeId: 7,
      actorId: 7,
      label: null,
    },
    {
      id: 13,
      name: '契約一覧',
      x: 2150,
      y: 50,
      flowId: 1,
      typeId: 3,
      actorId: 3,
      label: null,
    },
    {
      id: 14,
      name: '再契約誘導記録',
      label: '紙',
      x: 2750,
      y: 50,
      flowId: 1,
      typeId: 4,
      actorId: 3,
    },
    {
      id: 15,
      name: '問合せ記録入力',
      label: 'RPA',
      x: 3050,
      y: 50,
      flowId: 1,
      typeId: 6,
      actorId: 3,
    },
    {
      id: 16,
      name: '問合せ記録入力',
      x: 3350,
      y: 50,
      flowId: 1,
      typeId: 3,
      actorId: 3,
      label: null,
    },
    {
      id: 17,
      name: '問合せ記録',
      x: 3350,
      y: 50,
      flowId: 1,
      typeId: 5,
      actorId: 7,
      label: null,
    },
    {
      id: 18,
      name: '再契約誘導',
      x: 2450,
      y: 50,
      flowId: 1,
      typeId: 2,
      actorId: 3,
      label: null,
    },
    {
      id: 19,
      name: '再契約検討',
      x: 2450,
      y: 50,
      flowId: 1,
      typeId: 2,
      actorId: 1,
      label: null,
    },
  ],
  paths: [
    {
      id: 1,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 1,
      toTaskId: 2,
      label: null,
    },
    {
      id: 2,
      flowId: 1,
      pathTypeId: 2,
      fromTaskId: 2,
      toTaskId: 3,
      label: null,
    },
    {
      id: 3,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 3,
      toTaskId: 4,
      label: null,
    },
    {
      id: 4,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 4,
      toTaskId: 5,
      label: null,
    },
    {
      id: 5,
      flowId: 1,
      pathTypeId: 2,
      fromTaskId: 5,
      toTaskId: 6,
      label: null,
    },
    {
      id: 6,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 6,
      toTaskId: 7,
      label: null,
    },
    {
      id: 7,
      flowId: 1,
      pathTypeId: 2,
      fromTaskId: 7,
      toTaskId: 8,
      label: null,
    },
    {
      id: 8,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 8,
      toTaskId: 9,
      label: null,
    },
    {
      id: 9,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 9,
      toTaskId: 11,
      label: null,
    },
    {
      id: 10,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 11,
      toTaskId: 12,
      label: null,
    },
    {
      id: 11,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 10,
      toTaskId: 13,
      label: null,
    },
    {
      id: 12,
      flowId: 1,
      pathTypeId: 2,
      fromTaskId: 12,
      toTaskId: 13,
      label: null,
    },
    {
      id: 13,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 13,
      toTaskId: 18,
      label: null,
    },
    {
      id: 14,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 18,
      toTaskId: 14,
      label: null,
    },
    {
      id: 15,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 14,
      toTaskId: 15,
      label: null,
    },
    {
      id: 16,
      flowId: 1,
      pathTypeId: 1,
      fromTaskId: 15,
      toTaskId: 16,
      label: null,
    },
    {
      id: 17,
      flowId: 1,
      pathTypeId: 2,
      fromTaskId: 16,
      toTaskId: 17,
      label: null,
    },
    {
      id: 18,
      label: '電話',
      flowId: 1,
      pathTypeId: 2,
      fromTaskId: 18,
      toTaskId: 19,
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
