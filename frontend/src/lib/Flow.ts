import { Actor, ActorAggregate } from './Actor';
import { Path, PathAggregate } from './Path';

export class Flow {
  public name: string;
  public actorAggregate: ActorAggregate;
  public pathAggregate: PathAggregate;
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
