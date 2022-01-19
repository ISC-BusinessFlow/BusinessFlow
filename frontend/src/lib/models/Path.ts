import { makeAutoObservable } from 'mobx';

import { Aggregate } from './Aggregate';

export class PathAggregate implements Aggregate<Path> {
  public paths: Path[];

  constructor() {
    this.paths = [];
    makeAutoObservable(this);
  }

  public add(path: Path) {
    if (this.find(path.id)) {
      return;
    }
    this.paths.push(path);
  }
  public find(id: number) {
    return this.paths.find((path) => path.id === id);
  }
}

export type PathType = {
  id: number;
  fromTaskId: number;
  toTaskId: number | null;
  flowId: number;
  pathTypeId: number;
  createdAt: string;
  updatedAt: string;
};

export class Path {
  readonly id: PathType['id'];
  readonly fromTaskId: PathType['fromTaskId'];
  readonly toTaskId: PathType['toTaskId'] = null;
  readonly flowId: PathType['flowId'];
  readonly pathTypeId: PathType['pathTypeId'];
  readonly createdAt: PathType['createdAt'];
  readonly updatedAt: PathType['updatedAt'];

  constructor({
    id,
    fromTaskId,
    toTaskId = null,
    flowId,
    pathTypeId,
    createdAt,
    updatedAt,
  }: PathType) {
    this.id = id;
    this.fromTaskId = fromTaskId;
    this.toTaskId = toTaskId;
    this.flowId = flowId;
    this.pathTypeId = pathTypeId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    makeAutoObservable(this);
  }
}
