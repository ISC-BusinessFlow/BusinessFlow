import { Path, Task } from '@prisma/client';

import { prisma } from '../app';

export type TaskOmit<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export type PathOmit<T> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt' | 'fromTaskId' | 'toTaskId'
>;

export interface CreateRelationType {
  from: TaskOmit<Task>;
  to: TaskOmit<Task>;
  path: PathOmit<Path>;
}

export interface RelationType {
  from: Task;
  to: Task;
  path: Path;
}

export interface RelationProtocol {
  createRelation(relation: CreateRelationType): Promise<RelationType | Error>;
}

export default class RelationRepository implements RelationProtocol {
  constructor() {}

  async createRelation(
    relation: CreateRelationType
  ): Promise<RelationType | Error> {
    try {
      const from = await prisma.task.create({ data: relation.from });
      const to = await prisma.task.create({ data: relation.to });
      const path = await prisma.path.create({
        data: {
          flowId: relation.path.flowId,
          pathTypeId: relation.path.pathTypeId,
          fromTaskId: from.id,
          toTaskId: to.id,
          label: relation.path.label || null,
        },
      });
      const returnRelation: RelationType = {
        from: from,
        to: to,
        path: path,
      };
      return returnRelation;
    } catch (e) {
      console.log(e);
      return new Error(`${e}`);
    }
  }
}
