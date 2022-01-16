import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import { useRegisterNode } from '@/diagrams';
import { Task as TaskType } from '@/lib/Task';

import { Process } from './process';
import { Trigger } from './trigger';

export const Task: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const taskRef = useRef<SVGRectElement>(null);
  useRegisterNode(taskRef, task.id);

  //toriaezu
  switch (task.type) {
    case 'trigger':
      return <Trigger task={task} />;
    case 'process':
      return <Process task={task} />;
    default:
      return (
        <rect ref={taskRef} x={task.x} y={task.y} width="40" height="40" />
      );
  }
});
