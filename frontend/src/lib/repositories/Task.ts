import { KyInstance } from 'ky/distribution/types/ky';

import { TaskType } from '@/lib/models/Task';
import { FirstArgument } from '@/type';

export interface ITaskRepo {
  getTasks: () => Promise<TaskType[]>;
  getTaskById: (obj: Pick<TaskType, 'id'>) => Promise<TaskType>;
  deleteTaskById: (obj: Pick<TaskType, 'id'>) => Promise<TaskType>;
  updateTaskById: (
    obj: Omit<TaskType, 'createdAt' | 'updatedAt'>
  ) => Promise<TaskType[]>;
}

export class TaskRepo implements ITaskRepo {
  private api: KyInstance;

  constructor(instance: KyInstance) {
    this.api = instance;
  }

  public async getTasks(): ReturnType<ITaskRepo['getTasks']> {
    return await this.api.get('/tasks').json();
  }

  public async getTaskById({
    id,
  }: FirstArgument<ITaskRepo['getTaskById']>): ReturnType<
    ITaskRepo['getTaskById']
  > {
    return await this.api.get(`/tasks/${id}`).json();
  }

  public async deleteTaskById({
    id,
  }: FirstArgument<ITaskRepo['deleteTaskById']>): ReturnType<
    ITaskRepo['deleteTaskById']
  > {
    return await this.api.delete(`/tasks/${id}`).json();
  }

  public async updateTaskById({
    id,
    ...rest
  }: FirstArgument<ITaskRepo['updateTaskById']>): ReturnType<
    ITaskRepo['updateTaskById']
  > {
    return await this.api.put(`/tasks/${id}`, { json: rest }).json();
  }
}
