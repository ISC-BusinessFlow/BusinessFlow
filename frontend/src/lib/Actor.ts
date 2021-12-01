import { Aggregate } from './Aggregate';
import { Task, TaskAggregate } from './Task';

export class ActorAggregate implements Aggregate<Actor> {
  public actors: Actor[];

  constructor() {
    this.actors = [];
  }

  public add(actor: Actor) {
    this.actors.push(actor);
  }
  public find(id: number) {
    return this.actors.find((actor) => actor.id === id);
  }
}

type ActorType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export class Actor {
  readonly id: number;
  readonly name: string;
  readonly taskAggregate: TaskAggregate;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor({ id, name, createdAt, updatedAt }: ActorType) {
    this.id = id;
    this.name = name;
    this.taskAggregate = new TaskAggregate();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public createTask(task: Task) {
    this.taskAggregate.add(task);
  }
}
