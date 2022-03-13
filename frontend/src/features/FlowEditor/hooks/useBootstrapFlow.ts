import {
  actorsState,
  flowState,
  pathsState,
  tasksState,
} from '@FlowEditor/store';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import { api } from '@/api';
import { FlowRepo } from '@/lib/repositories/Flow';
import { flowCacheKey } from '@/utils/cacheKey';

export const useBootstrapFlow = ({ id }: { id: number }) => {
  const flowRepo = new FlowRepo(api);
  const setFlow = useSetRecoilState(flowState);
  const setActors = useSetRecoilState(actorsState);
  const setTasks = useSetRecoilState(tasksState);
  const setPaths = useSetRecoilState(pathsState);

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
        setActors(data);
      },
    }
  );
  const { isLoading: isTasksLoading } = useQuery(
    flowCacheKey.getTasksById(id),
    () => flowRepo.getFlowTasks({ id }),
    {
      onSuccess: (data) => {
        setTasks(data);
      },
    }
  );
  const { isLoading: isPathsLoading } = useQuery(
    flowCacheKey.getPathsById(id),
    () => flowRepo.getFlowPaths({ id }),
    {
      onSuccess: (data) => {
        setPaths(data);
      },
    }
  );

  return {
    loading:
      isFlowLoading && isActorsLoading && isTasksLoading && isPathsLoading,
  };
};
