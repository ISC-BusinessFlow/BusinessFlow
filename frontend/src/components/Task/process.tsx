import { observer } from 'mobx-react-lite';

import { Task as TaskType } from '@/lib/models/Task';

import { DisplayText } from './displaytext';
import { useTask } from './useTask';

const size = {
  width: 160,
  height: 100,
};

export const Process: React.VFC<{ task: TaskType }> = observer(({ task }) => {
  const {
    ref,
    translate: { x, y },
  } = useTask(task);

  return (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
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
