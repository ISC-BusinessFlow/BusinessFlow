import { Task as TaskType, taskState } from '@FlowEditor/store';
import { ForwardRefExoticComponent, RefAttributes, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';

import { DataStore } from './dataStore';
import { SystematizedOutput } from './output';
import { Process } from './process';
import { Receipt } from './receipt';
import { Input } from './systematizedInput';
import { Output } from './systematizedOutput';
import { Trigger } from './trigger';
import { useTask } from './useTask';

export type BaseTaskProps = {
  task?: TaskType;
  translate?: {
    x: number;
    y: number;
  };
};

type TaskComponent = {
  id: number;
  Component: ForwardRefExoticComponent<
    BaseTaskProps & RefAttributes<SVGGElement>
  >;
};

const taskComponents: TaskComponent[] = [
  {
    id: 1,
    Component: Trigger,
  },
  {
    id: 2,
    Component: SystematizedOutput,
  },
  {
    id: 3,
    Component: Input,
  },
  {
    id: 4,
    Component: Output,
  },
  {
    id: 5,
    Component: DataStore,
  },
  {
    id: 6,
    Component: Process,
  },
  {
    id: 7,
    Component: Receipt,
  },
];

export const Task: React.VFC<{ id: number }> = ({ id }) => {
  const setTask = useSetRecoilState(taskState(id));
  const { ref, task, translate } = useTask(id);

  const Component = useMemo(() => {
    if (!task) return null;

    return (
      taskComponents.find((item) => item.id === task.typeId)?.Component ?? null
    );
  }, [id, task?.id]);

  if (!task || !Component) return null;

  return (
    <g
      onClick={() =>
        setTask((cur) => (cur ? { ...cur, name: 'update' } : undefined))
      }
    >
      <Component ref={ref} task={task} translate={translate} />
    </g>
  );
};
