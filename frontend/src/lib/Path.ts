import { Aggregate } from './Aggregate';

export class PathAggregate implements Aggregate<Path> {
  public paths: Path[];

  constructor() {
    this.paths = [];
  }

  public add(path: Path) {
    this.paths.push(path);
  }
  public find(id: number) {
    return this.paths.find((path) => path.id === id);
  }
}

type PathType = {
  id: number;
  from: number;
  type: string;
};

export class Path {
  readonly id: number;
  readonly from: number;
  readonly to: number | null = null;
  readonly type: string;

  constructor({ id, from, type }: PathType) {
    this.id = id;
    this.from = from;
    this.type = type;
  }
}
