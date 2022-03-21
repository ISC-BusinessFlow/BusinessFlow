import { diagramNode } from '@Diagrams';
import {
  atom,
  DefaultValue,
  selector,
  selectorFamily,
  useSetRecoilState,
} from 'recoil';

import { Actor } from '@/lib/models/Actor';
import { Flow } from '@/lib/models/Flow';
import { Path } from '@/lib/models/Path';
import { Task } from '@/lib/models/Task';

export type Position = {
  x: number;
  y: number;
};

export const flowState = atom<Flow | null>({
  key: 'flow',
  default: null,
});

export const actorsState = atom<Record<number, Actor>>({
  key: 'actors',
  default: {},
});

export const useSetActorsState = () => {
  return useSetRecoilState(actorsState);
};

export const actorIdsState = selector<number[]>({
  key: 'actorIds',
  get: ({ get }) => {
    const actors = get(actorsState);
    return Object.values(actors).map((actor) => actor.id);
  },
});

export const actorState = selectorFamily<Actor | undefined, number>({
  key: 'actor',
  get:
    (id) =>
    ({ get }) => {
      const actors = get(actorsState);
      return actors[id];
    },
  set:
    (id) =>
    ({ set }, newState) => {
      if (!newState || newState instanceof DefaultValue) return;

      set(actorsState, (cur) => ({
        ...cur,
        [id]: newState,
      }));
    },
});

const tasksState = atom<Record<number, Task>>({
  key: 'tasks',
  default: {},
});

export const useSetTasksState = () => {
  return useSetRecoilState(tasksState);
};

export const tasksPositionState = selector<Position[]>({
  key: 'tasksPosition',
  get: ({ get }) => {
    const tasks = get(tasksState);
    console.log({ tasks });
    return Object.values(tasks).map((task) => ({
      x: task.x,
      y: task.y,
    }));
  },
});

export const taskState = selectorFamily<Task | undefined, number>({
  key: 'task',
  get:
    (id) =>
    ({ get }) => {
      const tasks = get(tasksState);
      return tasks[id];
    },
  set:
    (id) =>
    ({ set }, newValue) => {
      set(tasksState, (cur) =>
        !newValue || newValue instanceof DefaultValue
          ? cur
          : { ...cur, [id]: newValue }
      );
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
      return Object.values(tasks).filter((task) => task.actorId === id);
    },
});

const pathsState = atom<Record<number, Path>>({
  key: 'paths',
  default: [],
});

export const useSetPathsState = () => {
  return useSetRecoilState(pathsState);
};

export const pathIdsState = selector<number[]>({
  key: 'pathIds',
  get: ({ get }) => {
    const paths = get(pathsState);
    return Object.values(paths).map((path) => path.id);
  },
});

export const pathState = selectorFamily<Path | undefined, number>({
  key: 'task',
  get:
    (id) =>
    ({ get }) => {
      const paths = get(pathsState);
      return paths[id];
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
      if (!to) return null;

      const fromTask = get(diagramNode(from));
      const toTask = get(diagramNode(to));
      if (!fromTask || !toTask) return null;

      return {
        from: fromTask,
        to: toTask,
      };
    },
});
