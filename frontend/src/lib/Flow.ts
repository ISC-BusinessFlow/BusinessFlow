import { ActorAggregate } from './Actor';
import { PathAggregate } from './Path';

export class Flow {
  public name: string;
  public actorAggregate: ActorAggregate;
  public pathAggregate: PathAggregate;
  constructor(name: string) {
    this.name = name;
    this.actorAggregate = new ActorAggregate();
    this.pathAggregate = new PathAggregate();
  }
  public createActor(actor: any) {
    this.actorAggregate.add(actor);
  }
  public createPath(path: any) {
    this.pathAggregate.add(path);
  }
}
