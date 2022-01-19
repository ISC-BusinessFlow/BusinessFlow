import { Actor, ActorType } from './Actor';
import { Flow, FlowType } from './Flow';
import { Path, PathType } from './Path';
import { Task, TaskType } from './Task';

type Mock = {
  flow: FlowType[];
  actors: ActorType[];
  paths: PathType[];
  tasks: TaskType[];
};

const mockData: Mock = {
  flow: [
    {
      id: 1,
      name: 'sample flow',
      createdAt: '',
      updatedAt: '',
    },
  ],
  actors: [
    {
      id: 1,
      name: 'sample actor',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      name: 'sample actor2',
      createdAt: '',
      updatedAt: '',
    },
  ],
  paths: [
    {
      id: 1,
      to: 2,
      from: 1,
      type: 'sample path type',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      to: 3,
      from: 2,
      type: 'sample path type2',
      createdAt: '',
      updatedAt: '',
    },
  ],
  tasks: [
    {
      id: 1,
      type: 'sample type',
      label: 'label',
      x: 0,
      y: 0,
      description: 'description',
      createdAt: '',
      updatedAt: '',
    },
    {
      id: 2,
      type: 'sample type2',
      label: 'label2',
      x: 0,
      y: 0,
      description: 'description2',
      createdAt: '',
      updatedAt: '',
    },
  ],
};

describe('Taskのテスト', () => {
  it('createActorのテスト', () => {
    const flow = new Flow(mockData.flow[0]);

    const actors = mockData.actors.map((actor) => {
      const a = new Actor(actor);
      flow.createActor(a);
      return a;
    });

    expect(flow.actorAggregate.find(1)).toBe(actors[0]);
    expect(flow.actorAggregate.find(2)).toBe(actors[1]);
    expect(flow.actorAggregate.find(-1)).toBeUndefined();
  });

  it('createPathのテスト', () => {
    const flow = new Flow(mockData.flow[0]);
    const paths = mockData.paths.map((path) => {
      const p = new Path(path);
      flow.createPath(p);
      return p;
    });

    expect(flow.pathAggregate.find(1)).toBe(paths[0]);
    expect(flow.pathAggregate.find(2)).toBe(paths[1]);
    expect(flow.pathAggregate.find(-1)).toBeUndefined();
  });

  it('createTaskのテスト', () => {
    const actor = new Actor(mockData.actors[0]);
    const tasks = mockData.tasks.map((task) => {
      const t = new Task(task);
      actor.createTask(t);
      return t;
    });

    expect(actor.taskAggregate.find(1)).toBe(tasks[0]);
    expect(actor.taskAggregate.find(2)).toBe(tasks[1]);
    expect(actor.taskAggregate.find(-1)).toBeUndefined();
  });
});

export {};
