import { Actor, ActorAggregate } from './Actor';
import { Path, PathAggregate } from './Path';

export class Flow {
  readonly name: string;
  readonly actorAggregate: ActorAggregate;
  readonly pathAggregate: PathAggregate;
  constructor(name: string) {
    this.name = name;
    this.actorAggregate = new ActorAggregate();
    this.pathAggregate = new PathAggregate();
  }
  public createActor(actor: Actor) {
    this.actorAggregate.add(actor);
  }
  public createPath(path: Path) {
    this.pathAggregate.add(path);
  }
}
