import { observer } from 'mobx-react-lite';
import { useRef } from 'react';

import { useRegisterNode } from '@/diagrams';
import { Task as TaskType } from '@/lib/models/Task';

export const Receipt: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const taskRef = useRef<SVGRectElement>(null);
  useRegisterNode(taskRef, task.id);
  const trans = `translate(${task.x}, ${task.y})`;

  return (
    <g ref={taskRef} transform={trans}>
      <circle
        cx="12.5"
        cy="12.5"
        r="12"
        transform="rotate(-180 12.5 12.5)"
        fill="url(#paint0_linear_7_14)"
        stroke="black"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7_14"
          x1="12.5"
          y1="0"
          x2="12.5"
          y2="25"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#616161" />
          <stop offset="1" stopColor="#929292" stopOpacity="0" />
        </linearGradient>
      </defs>
    </g>
  );
});
