import { KyInstance } from 'ky/distribution/types/ky';

import { ActorType } from '@/lib/models/Actor';
import { FirstArgument } from '@/type';

export interface IActorRepo {
  getActors: () => Promise<ActorType[]>;
  getActorById: (obj: Pick<ActorType, 'id'>) => Promise<ActorType>;
  deleteActorById: (obj: Pick<ActorType, 'id'>) => Promise<ActorType>;
  updateActorById: (
    obj: Omit<ActorType, 'createdAt' | 'updatedAt'>
  ) => Promise<ActorType[]>;
}

export class ActorRepo implements IActorRepo {
  private api: KyInstance;

  constructor(instance: KyInstance) {
    this.api = instance;
  }

  public async getActors(): ReturnType<IActorRepo['getActors']> {
    return await this.api.get('/actors').json();
  }

  public async getActorById({
    id,
  }: FirstArgument<IActorRepo['getActorById']>): ReturnType<
    IActorRepo['getActorById']
  > {
    return await this.api.get(`/actors/${id}`).json();
  }

  public async deleteActorById({
    id,
  }: FirstArgument<IActorRepo['deleteActorById']>): ReturnType<
    IActorRepo['deleteActorById']
  > {
    return await this.api.delete(`/actors/${id}`).json();
  }

  public async updateActorById({
    id,
    ...rest
  }: FirstArgument<IActorRepo['updateActorById']>): ReturnType<
    IActorRepo['updateActorById']
  > {
    return await this.api.put(`/actors/${id}`, { json: rest }).json();
  }
}
