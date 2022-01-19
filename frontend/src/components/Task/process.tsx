import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import { useRegisterNode } from '@/diagrams';
import { Task as TaskType } from '@/lib/models/Task';

import { DisplayText } from './displaytext';

const size = {
  width: 160,
  height: 100,
};

export const Process: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const taskRef = useRef<SVGRectElement>(null);
  useRegisterNode(taskRef, task.id);
  const trans = `translate(${task.x}, ${task.y})`;

  return (
    <g ref={taskRef} transform={trans}>
      <rect
        width={size.width}
        height={size.height}
        fill="#EE8C44"
        stroke="#B36A35"
        strokeWidth="2"
      />
      <DisplayText task={task} width={size.width} height={size.height} />
    </g>
  );
});
