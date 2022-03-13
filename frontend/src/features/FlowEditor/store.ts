import { diagramNode } from '@Diagrams';
import { atom, selector, selectorFamily } from 'recoil';

export type Position = {
  x: number;
  y: number;
};

export type PathPosition = {
  from: Position;
  to: Position;
};

export type Path = {
  id: number;
  label?: string;
  typeId: number;
  fromTaskId: number;
  toTaskId: number;
  flowId: number;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: number;
  name: string;
  label?: string;
  typeId: number;
  flowId: number;
  actorId: number;
  createdAt: string;
  updatedAt: string;
} & Position;

export type Actor = {
  id: number;
  name: string;
  flowId: number;
  createdAt: string;
  updatedAt: string;
};

export type Flow = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const flowState = atom<Flow | null>({
  key: 'flow',
  default: null,
});

const actorsState = atom<Actor[]>({
  key: 'actors',
  default: [],
});

export const actorState = selectorFamily<Actor | undefined, number>({
  key: 'actor',
  get:
    (id) =>
    ({ get }) => {
      const actors = get(actorsState);
      return actors.find((actor) => actor.id === id);
    },
});

export const tasksHasActorState = selectorFamily<Task[], number>({
  key: 'tasksHasActor',
  get:
    (id) =>
    ({ get }) => {
      const actor = get(actorState(id));
      if (!actor) return [];

      const tasks = get(tasksState);
      return tasks.filter((task) => task.actorId === id);
    },
});

const tasksState = atom<Task[]>({
  key: 'tasks',
  default: [],
});

export const taskState = selectorFamily<Task | undefined, number>({
  key: 'task',
  get:
    (id) =>
    ({ get }) => {
      const tasks = get(tasksState);
      return tasks.find((task) => task.id === id);
    },
});

const pathsState = atom<Path[]>({
  key: 'paths',
  default: [],
});

export const pathIdsState = selector<number[]>({
  key: 'pathIds',
  get: ({ get }) => {
    return get(pathsState).map((path) => path.id);
  },
});

export const pathState = selectorFamily<Path | undefined, number>({
  key: 'task',
  get:
    (id) =>
    ({ get }) => {
      const paths = get(pathsState);
      return paths.find((path) => path.id === id);
    },
});

export const pathPositionState = selectorFamily<
  { from: DOMRect; to: DOMRect } | null,
  number
>({
  key: 'task',
  get:
    (id) =>
    ({ get }) => {
      // NOTE: レンダリングがどうなるか注意が必要
      const path = get(pathState(id));
      if (!path) return null;

      const from = path.fromTaskId;
      const to = path.toTaskId;

      const fromTask = get(diagramNode(from));
      const toTask = get(diagramNode(to));
      if (!fromTask || !toTask) return null;

      return {
        from: fromTask,
        to: toTask,
      };
    },
});
