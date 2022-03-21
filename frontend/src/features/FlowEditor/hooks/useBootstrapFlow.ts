import {
  flowState,
  useSetActorsState,
  useSetPathsState,
  useSetTasksState,
} from '@FlowEditor/store';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { api } from '@/api';
import { Actor } from '@/lib/models/Actor';
import { Path } from '@/lib/models/Path';
import { Task } from '@/lib/models/Task';
import { FlowRepo } from '@/lib/repositories/Flow';
import { flowCacheKey } from '@/utils/cacheKey';

export const useBootstrapFlow = ({ id }: { id: number }) => {
  const flowRepo = new FlowRepo(api);
  const setFlow = useSetRecoilState(flowState);
  const setActors = useSetActorsState();
  const setTasks = useSetTasksState();
  const setPaths = useSetPathsState();

  const { isLoading: isFlowLoading } = useQuery(
    flowCacheKey.getById(id),
    () => flowRepo.getFlowById({ id }),
    {
      onSuccess: (data) => {
        setFlow(data);
      },
    }
  );
  const { isLoading: isActorsLoading } = useQuery(
    flowCacheKey.getActorsById(id),
    () => flowRepo.getFlowActors({ id }),
    {
      onSuccess: (data) => {
        const value: Record<number, Actor> = {};

        data.forEach((actor) => {
          value[actor.id] = actor;
        });

        setActors(value);
      },
    }
  );
  const { isLoading: isTasksLoading } = useQuery(
    flowCacheKey.getTasksById(id),
    () => flowRepo.getFlowTasks({ id }),
    {
      onSuccess: (data) => {
        const value: Record<number, Task> = {};

        data.forEach((task) => {
          value[task.id] = task;
        });

        setTasks(value);
      },
    }
  );
  const { isLoading: isPathsLoading } = useQuery(
    flowCacheKey.getPathsById(id),
    () => flowRepo.getFlowPaths({ id }),
    {
      onSuccess: (data) => {
        const value: Record<number, Path> = {};

        data.forEach((path) => {
          value[path.id] = path;
        });

        setPaths(value);
      },
    }
  );

  return {
    loading:
      isFlowLoading && isActorsLoading && isTasksLoading && isPathsLoading,
  };
};
