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
  id: number;
  from: number;
  to: number | null = null;
  type: string;

  constructor({ id, from, type }: PathType) {
    this.id = id;
    this.from = from;
    this.type = type;
  }
}
