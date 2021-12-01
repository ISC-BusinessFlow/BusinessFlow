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
    return this.actors.find((actor) => actor.getId() === id);
  }
}

type ActorType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export class Actor {
  private id: number;
  private name: string;
  public taskAggregate: TaskAggregate;
  private createdAt: string;
  private updatedAt: string;

  constructor({ id, name, createdAt, updatedAt }: ActorType) {
    this.id = id;
    this.name = name;
    this.taskAggregate = new TaskAggregate();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public getId() {
    return this.id;
  }
  public getName() {
    return this.name;
  }
  public createTask(task: Task) {
    this.taskAggregate.add(task);
  }
}
