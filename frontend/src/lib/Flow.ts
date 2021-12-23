import { makeAutoObservable } from 'mobx';

import { Actor, ActorAggregate } from './Actor';
import { Path, PathAggregate } from './Path';

export type FlowType = {
  id: string;
  name: string;
};

export class Flow {
  readonly name: FlowType['name'];
  readonly actorAggregate: ActorAggregate;
  readonly pathAggregate: PathAggregate;
  constructor({ name }: FlowType) {
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
