import { makeAutoObservable } from 'mobx';

import { Aggregate } from './Aggregate';
import { Task, TaskAggregate } from './Task';

export class ActorAggregate implements Aggregate<Actor> {
  public actors: Actor[];

  constructor() {
    this.actors = [];
    makeAutoObservable(this);
  }

  public add(actor: Actor) {
    if (this.find(actor.id)) {
      return;
    }
    this.actors.push(actor);
  }
  public find(id: number) {
    return this.actors.find((actor) => actor.id === id);
  }
}

export type ActorType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export class Actor {
  readonly id: ActorType['id'];
  readonly name: ActorType['name'];
  readonly taskAggregate: TaskAggregate;
  readonly createdAt: ActorType['createdAt'];
  readonly updatedAt: ActorType['updatedAt'];

  constructor({ id, name, createdAt, updatedAt }: ActorType) {
    this.id = id;
    this.name = name;
    this.taskAggregate = new TaskAggregate();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    makeAutoObservable(this);
  }

  public createTask(task: Task) {
    this.taskAggregate.add(task);
  }
}
