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

type TaskType = {
  id: number;
  x: number;
  y: number;
  type: string;
  label: string;
  description: string;
};

export class Task {
  readonly id: TaskType['id'];
  readonly x: TaskType['x'];
  readonly y: TaskType['y'];
  readonly type: TaskType['type'];
  readonly label: TaskType['label'];
  readonly description: TaskType['description'];

  constructor({ id, x, y, type, label, description }: TaskType) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.label = label;
    this.description = description;
    makeAutoObservable(this);
  }
}
