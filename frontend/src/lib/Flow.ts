import { makeAutoObservable } from 'mobx';

import { Actor, ActorAggregate } from './Actor';
import { Path, PathAggregate } from './Path';

export type FlowType = {
  id: number;
  name: string;
};

export class Flow {
  readonly id: FlowType['id'];
  readonly name: FlowType['name'];
  readonly actorAggregate: ActorAggregate;
  readonly pathAggregate: PathAggregate;
  constructor({ id, name }: FlowType) {
    this.id = id;
    this.name = name;
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
