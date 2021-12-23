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

type PathType = {
  id: number;
  from: number;
  to: number | null;
  type: string;
};

export class Path {
  readonly id: PathType['id'];
  readonly from: PathType['from'];
  readonly to: PathType['to'] = null;
  readonly type: PathType['type'];

  constructor({ id, from, to = null, type }: PathType) {
    makeAutoObservable(this);
    this.id = id;
    this.from = from;
    this.to = to;
    this.type = type;
  }
}
