import { KyInstance } from 'ky/distribution/types/ky';

import { ActorType } from '@/lib/models/Actor';
import { FlowType } from '@/lib/models/Flow';
import { PathType } from '@/lib/models/Path';
import { TaskType } from '@/lib/models/Task';
import { FirstArgument } from '@/type';

export interface IFlowRepo {
  getFlows: () => Promise<FlowType[]>;
  createFlow: (obj: Pick<FlowType, 'name'>) => Promise<FlowType>;
  getFlowById: (obj: Pick<FlowType, 'id'>) => Promise<FlowType>;
  deleteFlowById: (obj: Pick<FlowType, 'id'>) => Promise<void>;
  updateFlowById: (obj: Pick<FlowType, 'id' | 'name'>) => Promise<FlowType>;
  getFlowTasks: (obj: Pick<FlowType, 'id'>) => Promise<TaskType[]>;
  getFlowPaths: (obj: Pick<FlowType, 'id'>) => Promise<PathType[]>;
  getFlowActors: (obj: Pick<FlowType, 'id'>) => Promise<ActorType[]>;
}

export class FlowRepo implements IFlowRepo {
  private api: KyInstance;

  constructor(instance: KyInstance) {
    this.api = instance;
  }

  public async getFlows(): ReturnType<IFlowRepo['getFlows']> {
    return await this.api.get('/flows').json();
  }

  public async createFlow({
    name,
  }: FirstArgument<IFlowRepo['createFlow']>): ReturnType<
    IFlowRepo['createFlow']
  > {
    return await this.api.post('/flows', { json: { name } }).json();
  }

  public async getFlowById({
    id,
  }: FirstArgument<IFlowRepo['getFlowById']>): ReturnType<
    IFlowRepo['getFlowById']
  > {
    return await this.api.get(`flows/${id}`).json();
  }

  public async deleteFlowById({
    id,
  }: FirstArgument<IFlowRepo['deleteFlowById']>): ReturnType<
    IFlowRepo['deleteFlowById']
  > {
    return await this.api.delete(`flows/${id}`).json();
  }

  public async updateFlowById({
    id,
    name,
  }: FirstArgument<IFlowRepo['updateFlowById']>): ReturnType<
    IFlowRepo['updateFlowById']
  > {
    return await this.api.put(`flows/${id}`, { json: { name } }).json();
  }

  public async getFlowTasks({
    id,
  }: FirstArgument<IFlowRepo['getFlowTasks']>): ReturnType<
    IFlowRepo['getFlowTasks']
  > {
    return await this.api.get(`flows/${id}/tasks`).json();
  }

  public async getFlowPaths({
    id,
  }: FirstArgument<IFlowRepo['getFlowPaths']>): ReturnType<
    IFlowRepo['getFlowPaths']
  > {
    return await this.api.get(`flows/${id}/paths`).json();
  }

  public async getFlowActors({
    id,
  }: FirstArgument<IFlowRepo['getFlowActors']>): ReturnType<
    IFlowRepo['getFlowActors']
  > {
    return await this.api.get(`flows/${id}/actors`).json();
  }
}
