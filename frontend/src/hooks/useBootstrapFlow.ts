import groupBy from 'lodash/groupBy';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { api } from '@/api';
import { Actor } from '@/lib/models/Actor';
import { Flow } from '@/lib/models/Flow';
import { Path } from '@/lib/models/Path';
import { Task } from '@/lib/models/Task';
import { FlowRepo } from '@/lib/repositories/Flow';

export const useBootstrapFlow = ({ id }: { id: number }) => {
  const flowRepo = new FlowRepo(api);
  const [flow, setFlow] = useState<Flow | null>(null);
  const [canCreateTask, setCanCreateTask] = useState(false);

  useQuery(['flows', 'detail', id], () => flowRepo.getFlowById({ id }), {
    onSuccess: (data) => {
      setFlow(new Flow(data));
    },
  });

  const { data: actorsData, isLoading: isActorsLoading } = useQuery(
    ['tasks', 'detail', id, 'actors'],
    () => flowRepo.getFlowActors({ id })
  );
  const { data: tasksData, isLoading: isTasksLoading } = useQuery(
    ['tasks', 'detail', id, 'tasks'],
    () => flowRepo.getFlowTasks({ id })
  );
  const { data: pathsData, isLoading: isPathsLoading } = useQuery(
    ['tasks', 'detail', id, 'paths'],
    () => flowRepo.getFlowPaths({ id })
  );

  useEffect(() => {
    if (!flow || !actorsData) return;

    actorsData.map((actor) => {
      flow.createActor(new Actor(actor));
    });
    setCanCreateTask(true);
  }, [flow, actorsData]);

  useEffect(() => {
    if (!flow || !tasksData || !canCreateTask) return;

    const groupedTasks = groupBy(tasksData, (task) => task.actorId);

    Object.keys(groupedTasks).map((actorId) => {
      const parsedActorId = parseInt(actorId);
      if (isNaN(parsedActorId)) return;

      const actor = flow.actorAggregate.find(parsedActorId);
      if (!actor) return;

      groupedTasks[actorId].map((task) => {
        actor.createTask(new Task(task));
      });
    });
  }, [flow, tasksData, canCreateTask]);

  useEffect(() => {
    if (!flow || !pathsData) return;

    pathsData.map((path) => {
      flow.createPath(new Path(path));
    });
  }, [flow, pathsData]);

  return {
    flow,
    loading: isActorsLoading && isTasksLoading && isPathsLoading,
  };
};
