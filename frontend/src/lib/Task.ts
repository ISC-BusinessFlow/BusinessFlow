import { Aggregate } from './Aggregate';

export class TaskAggregate implements Aggregate<Task> {
  public tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  public add(task: Task) {
    this.tasks.push(task);
  }
  public find(id: number) {
    return this.tasks.find((task) => task.id === id);
  }
}

type TaskType = {
  id: number;
  type: string;
  label: string;
  description: string;
};

export class Task {
  id: number;
  type: string;
  label: string;
  description: string;

  constructor({ id, type, label, description }: TaskType) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.description = description;
  }
}
