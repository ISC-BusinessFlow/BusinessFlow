import { Actor } from './Actor';
import { Flow } from './Flow';
import { Path } from './Path';
import { Task } from './Task';

const mockData = {
  flow: {
    id: 1,
    name: 'sample flow',
    createdAt: '',
    updatedAt: '',
  },
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
      from: 1,
      type: 'sample path type',
    },
    {
      id: 2,
      from: 2,
      type: 'sample path type2',
    },
  ],
  tasks: [
    {
      id: 1,
      type: 'sample type',
      label: 'label',
      description: 'description',
    },
    {
      id: 2,
      type: 'sample type2',
      label: 'label2',
      description: 'description2',
    },
  ],
};

describe('Taskのテスト', () => {
  it('createActorのテスト', () => {
    const flow = new Flow(mockData.flow.name);

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
    const flow = new Flow(mockData.flow.name);
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
