import { makeAutoObservable } from 'mobx';

import { Actor, ActorAggregate } from './Actor';
import { Path, PathAggregate } from './Path';

export type FlowType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export class Flow {
  readonly id: FlowType['id'];
  readonly name: FlowType['name'];
  readonly createdAt: FlowType['createdAt'];
  readonly updatedAt: FlowType['updatedAt'];
  readonly actorAggregate: ActorAggregate;
  readonly pathAggregate: PathAggregate;

  constructor({ id, name, createdAt, updatedAt }: FlowType) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.actorAggregate = new ActorAggregate();
    this.pathAggregate = new PathAggregate();
    makeAutoObservable(this);
  }
  public createActor(actor: Actor) {
    this.actorAggregate.add(actor);
  }
  public createPath(path: Path) {
    this.pathAggregate.add(path);
  }
}
