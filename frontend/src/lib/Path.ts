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
    return this.paths.find((path) => path.getId() === id);
  }
}

type PathType = {
  id: number;
  from: number;
  type: string;
};

export class Path {
  private id: number;
  private from: number;
  private to: number | null = null;
  private type: string;

  constructor({ id, from, type }: PathType) {
    this.id = id;
    this.from = from;
    this.type = type;
  }

  public getId() {
    return this.id;
  }
  public getFrom() {
    return this.from;
  }
  public getTo() {
    return this.to;
  }
  public getType() {
    return this.type;
  }
  public setToTask(taskId: number) {
    this.to = taskId;
  }
}
