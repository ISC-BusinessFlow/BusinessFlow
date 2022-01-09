import { makeAutoObservable } from 'mobx';

import { Aggregate } from './Aggregate';

export class TaskAggregate implements Aggregate<Task> {
  public tasks: Task[];

  constructor() {
    this.tasks = [];
    makeAutoObservable(this);
  }

  public add(task: Task) {
    if (this.find(task.id)) {
      return;
    }
    this.tasks.push(task);
  }
  public find(id: number) {
    return this.tasks.find((task) => task.id === id);
  }
}

export type TaskType = {
  id: number;
  actorId: number;
  flowId: number;
  x: number;
  y: number;
  type: string;
  label: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export class Task {
  readonly id: TaskType['id'];
  readonly actorId: TaskType['actorId'];
  readonly flowId: TaskType['flowId'];
  readonly x: TaskType['x'];
  readonly y: TaskType['y'];
  readonly type: TaskType['type'];
  readonly label: TaskType['label'];
  readonly description: TaskType['description'];
  readonly createdAt: TaskType['createdAt'];
  readonly updatedAt: TaskType['updatedAt'];

  constructor({
    id,
    actorId,
    flowId,
    x,
    y,
    type,
    label,
    description,
    createdAt,
    updatedAt,
  }: TaskType) {
    this.id = id;
    this.actorId = actorId;
    this.flowId = flowId;
    this.x = x;
    this.y = y;
    this.type = type;
    this.label = label;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    makeAutoObservable(this);
  }
}
