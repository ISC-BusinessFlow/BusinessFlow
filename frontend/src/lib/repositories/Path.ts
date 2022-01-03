import { KyInstance } from 'ky/distribution/types/ky';

import { PathType } from '@/lib/models/Path';
import { FirstArgument } from '@/type';

export interface IPathRepo {
  getPaths: () => Promise<PathType[]>;
  getPathById: (obj: Pick<PathType, 'id'>) => Promise<PathType>;
  deletePathById: (obj: Pick<PathType, 'id'>) => Promise<PathType>;
  updatePathById: (
    obj: Omit<PathType, 'createdAt' | 'updatedAt'>
  ) => Promise<PathType[]>;
}

export class PathRepo implements IPathRepo {
  private api: KyInstance;

  constructor(instance: KyInstance) {
    this.api = instance;
  }

  public async getPaths(): ReturnType<IPathRepo['getPaths']> {
    return await this.api.get('/paths').json();
  }

  public async getPathById({
    id,
  }: FirstArgument<IPathRepo['getPathById']>): ReturnType<
    IPathRepo['getPathById']
  > {
    return await this.api.get(`/paths/${id}`).json();
  }

  public async deletePathById({
    id,
  }: FirstArgument<IPathRepo['deletePathById']>): ReturnType<
    IPathRepo['deletePathById']
  > {
    return await this.api.delete(`/paths/${id}`).json();
  }

  public async updatePathById({
    id,
    ...rest
  }: FirstArgument<IPathRepo['updatePathById']>): ReturnType<
    IPathRepo['updatePathById']
  > {
    return await this.api.put(`/paths/${id}`, { json: rest }).json();
  }
}
